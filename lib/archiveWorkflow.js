const axios = require('axios')
const archive = require('./archive')
const helpers = require('./helpers')
const wfs = require('./wfs')
const fs = require('fs')
const os = require('os')
const puppeteer = require('puppeteer')
const {ArchiveEntry, BrowserFormat} = require('./types')

let BROWSER = null
const PAGE_FORMAT_FUNCTIONS = {
  mhtml: archive.readPageMhtml,
  html: archive.readPageHtml,
  png: archive.readPagePng,
  pdf: archive.readPagePdf,
}

/**
 * Get cached browser instance.
 *
 * @returns {Promise<puppeteer.Browser>}
 */
async function getBrowser() {
  return BROWSER || await puppeteer.launch({
    headless: true,
    defaultViewport: {
      width: 1440,
      height: 900
    }
  })
}

/**
 * Download file from URL and log result.
 *
 * @param {object} params - Parameters
 * @param {string} params.url - URL to download
 * @param {number} params.maxDays - Maximum age of existing result in days that
 * would prevent downloading again
 * @param {object} [params.props] - Additional properties to log
 * @returns {Promise<ArchiveEntry>} Log entry
 */
async function downloadFile({url, maxDays, props } = {}) {
  // Check that we have not recently downloaded this URL
  if (maxDays !== 0) {
    const existing = archive.search({url}, {maxDays})
    if (existing.length > 0) {
      console.log(`[${url}] Already downloaded`)
      return true
    }
  }

  // Download file to temporary directory
  const date = new Date()
  const tempdir = fs.mkdtempSync(`${os.tmpdir()}${path.sep}`)
  const {file, checksum} = await archive.downloadFile(url, tempdir)
  // if (!file || !fs.existsSync(file)) {
  //   console.error(`[${url}] Download failed to ${file}`)
  //   return false
  // }

  // Compare checksum
  const entry = { url, method: 'file', date, checksum }
  const match = archive.search({ checksum })[0]
  if (match) {
    // Reuse path of existing file
    entry.path = match.path
    entry.existed = true
    // Remove temporary directory
    fs.rmSync(tempdir, { recursive: true })
  } else {
    // Move file to archive path
    const dir = archive.buildPath({url, date})
    fs.mkdirSync(dir, { recursive: true })
    entry.path = path.join(dir, path.basename(file))
    fs.renameSync(file, entry.path)
  }

  // Log file
  if (props && Object.keys(props).length > 0) {
    entry.props = props
  }
  return archive.log(entry)
}

/**
 * Download features from ArcGIS Feature Layer and log result.
 *
 * @param {object} params - Parameters
 * @param {string} params.url - Feature layer URL
 * @param {number} params.maxDays - Maximum age of existing result in days that
 * would prevent downloading again
 * @param {object} [params.props] - Additional properties to log
 * @returns {Promise<ArchiveEntry>} Log entry
 */
async function downloadArcgisFeatureLayer({url, maxDays, props} = {}) {
  // Check that we have not recently downloaded this URL
  if (maxDays !== 0) {
    const existing = archive.search({url}, {maxDays})
    if (existing.length > 0) {
      console.log(`[${url}] Already downloaded`)
      return true
    }
  }

  // Get features
  const date = new Date()
  const result = await helpers.getLayerFeatures(url)
  const txt = JSON.stringify(result)
  const checksum = archive.md5(Buffer.from(txt).toString('base64'))
  const entry = { url, method: 'arcgis', date, checksum }

  // Compare checksum
  const match = archive.search({ checksum })[0]
  if (match) {
    // Reuse path of most recent entry with matching checksum
    entry.path = match.path
    entry.existed = true
  } else {
    // Write file to archive
    const dir = archive.buildPath({url, date})
    fs.mkdirSync(dir, { recursive: true })
    entry.path = path.join(dir, 'features.json')
    const megabytes = (Buffer.byteLength(txt, 'utf8') / (1024**2)).toFixed(3)
    console.log(`[${url}] Written to ${entry.path} (${megabytes} MB)`)
    fs.writeFileSync(entry.path, txt, {encoding: 'utf-8'})
  }

  // Log file
  if (props && Object.keys(props).length > 0) {
    entry.props = props
  }
  return archive.log(entry)
}

/**
 * Register existing file in archive log.
 *
 * @param {object} params - Parameters
 * @param {string} params.file - Path to file
 * @param {string} params.date - Date of file
 * @param {string} params.url - URL of original file download
 * @param {string} params.method - Method used to download file from URL
 * @param {number} params.maxDays - Maximum age of existing result in days that
 * would prevent downloading again
 * @param {object} [params.props] - Additional properties to log
 * @returns {Promise<ArchiveEntry>} Log entry
 */
async function registerFile({file, date, url, method, maxDays, props} = {}) {
  // Check that we have not recently downloaded this URL
  if (url && maxDays !== 0) {
    const existing = archive.search({url}, {maxDays})
    if (existing.length > 0) {
      console.log(`[${url}] Already downloaded`)
      return true
    }
  }

  // Get date from file creation time
  if (!date) {
    const stats = fs.statSync(file)
    date = new Date(stats.ctime)
  }

  // Compare checksum
  const checksum = await archive.hashFile(file)
  const entry = {
    ...url && {url},
    ...method && {method},
    date,
    dateAdded: new Date(),
    checksum
  }
  const match = archive.search({ checksum })[0]
  if (match) {
    console.log(`[${file}] Already exists`)
    return true
  } else {
    // Move file to archive path
    const dir = archive.buildPath({ url, checksum, date })
    fs.mkdirSync(dir, { recursive: true })
    entry.path = path.join(dir, path.basename(file))
    fs.renameSync(file, entry.path)
  }

  // Log file
  if (props && Object.keys(props).length > 0) {
    entry.props = props
  }
  return archive.log(entry)
}

/**
 * Build WFS GetFeature URL.
 *
 * @param {string} url - WFS server URL (ideally with typeName parameter)
 * @returns {object} URL (url) and server capabilities (capabilities)
 */
async function buildWfsDownloadUrl(url) {
  const capabilitiesURL = wfs.buildGetCapabilitiesUrl(url)
  const response = await axios.get(capabilitiesURL)
  const capabilities = wfs.parseCapabilities(response.data)
  const featureURL = wfs.buildGetFeatureUrl(url, capabilities)
  return {url: featureURL, capabilities}
}

/**
 * Download web page as MHTML and log result.
 *
 * Page is rendered in a headless browser (puppeteer) and saved as MHTML.
 *
 * @param {object} params - Parameters
 * @param {string} params.url - URL to download
 * @param {BrowserFormat} params.format - Format to save page as
 * @param {number} params.maxDays - Maximum age of existing result in days that
 * would prevent downloading again
 * @param {object} [params.props] - Additional properties to log
 * @returns {Promise<ArchiveEntry>} Log entry
 */
async function downloadPage({url, format, maxDays, props} = {}) {
  const readFunction = PAGE_FORMAT_FUNCTIONS[format]
  if (!readFunction) {
    throw new Error(`Unknown format: ${format}`)
  }

  // Check that we have not recently downloaded this URL
  if (maxDays !== 0) {
    const existing = archive.search({url, format}, {maxDays})
    if (existing.length > 0) {
      return existing[0]
    }
  }

  // Load page in browser
  const browser = await getBrowser()
  const page = await browser.newPage()
  // Set user agent to avoid bot detection
  // https://stackoverflow.com/a/55684016
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Brave Chrome/84.0.4147.89 Safari/537.36'
  )
  const date = new Date()
  const response = await archive.loadPage(url, page)
  const status = response.status()
  if (status >= 300 && status != 304) {
    await page.close()
    throw new Error(`[${url}] Failed to open: HTTP ${response.status()}`)
  }

  // Save page
  const data = await readFunction(page)
  const isBuffer = Buffer.isBuffer(data)
  await page.close()

  // Compare checksum
  const buffer = isBuffer ? data : Buffer.from(data)
  const checksum = archive.md5(buffer.toString('base64'))
  const entry = { url, method: 'browser', format, date, checksum }
  const matching = archive.search({ checksum: entry.checksum })
  if (matching.length > 0) {
    // Reuse path of most recent entry with matching checksum
    entry.path = matching[0].path
    entry.existed = true
  } else {
    const dir = archive.buildPath({url, date})
    fs.mkdirSync(dir, { recursive: true })
    entry.path = path.join(dir, `response.${format}`)
    const megabytes = (buffer.byteLength / (1024**2)).toFixed(3)
    fs.writeFileSync(entry.path, data, isBuffer ? {} : {encoding: 'utf-8'})
    console.log(`[${url}] Written to ${entry.path} (${megabytes} MB)`)
  }

  // Log file
  if (props && Object.keys(props).length > 0) {
    entry.props = props
  }
  return archive.log(entry)
}

module.exports = {
  getBrowser,
  downloadFile,
  downloadArcgisFeatureLayer,
  registerFile,
  buildWfsDownloadUrl,
  downloadPage,
}
