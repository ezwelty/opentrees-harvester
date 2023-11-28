var axios = require('axios')
var archive = require('./archive')
var helpers = require('../lib/helpers')
var wfs = require('./wfs')
var fs = require('fs')
var os = require('os')

/**
 * Download file from URL and log result.
 *
 * @param {object} params - Parameters
 * @param {string} params.url - URL to download
 * @param {string} params.maxDays - Maximum age of existing result in days that
 * would prevent downloading again
 * @param {string} [params.type='data'] - Type of data being downloaded (e.g.
 * 'data', 'metadata')
 * @returns {object} Log entry
 */
async function downloadFile({url, maxDays, type = 'data'} = {}) {
  // Check that we have not recently downloaded this URL
  const existing = await archive.search({url}, {maxDays})
  if (existing.length > 0) {
    console.log(`[${url}] Already downloaded`)
    return true
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
  const entry = {
    url,
    date,
    type,
    checksum: checksum
  }
  const matching = await archive.search({ checksum: entry.checksum })
  if (matching.length > 0) {
    // Reuse path of most recent entry with matching checksum
    entry.path = matching.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    )[0].path
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
  return archive.log(entry)
}

/**
 * Download features from ArcGIS Feature Layer and log result.
 *
 * @param {object} params - Parameters
 * @param {string} params.url - Feature layer URL
 * @param {string} params.maxDays - Maximum age of existing result in days that
 * would prevent downloading again
 * @returns {object} Log entry
 */
async function downloadArcgisFeatureLayer({url, maxDays} = {}) {
  // Check that we have not recently downloaded this URL
  const existing = await archive.search({url}, {maxDays})
  if (existing.length > 0) {
    console.log(`[${url}] Already downloaded`)
    return true
  }

  // Get features
  const date = new Date()
  const result = await helpers.getLayerFeatures(url)
  const txt = JSON.stringify(result)
  const entry = {
    url,
    date,
    type: 'data',
    api: 'arcgis',
    checksum: archive.md5(Buffer.from(txt).toString('base64'))
  }

  // Compare checksum
  const matching = await archive.search({ checksum: entry.checksum })
  if (matching.length > 0) {
    // Reuse path of most recent entry with matching checksum
    entry.path = matching.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    )[0].path
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
  return archive.log(entry)
}

/**
 * Register existing file in archive log.
 *
 * @param {object} params - Parameters
 * @param {string} params.file - Path to file
 * @param {string} params.date - Date of file
 * @param {string} params.url - URL of original file download
 * @param {string} params.api - API used to download file from URL (e.g. 'wfs',
 * 'arcgis', 'manual')
 * @param {string} params.maxDays - Maximum age of existing result in days that
 * would prevent downloading again
 * @param {string} [params.type='data'] - Type of data (e.g. 'data', 'metadata')
 * @param {object} [params.props] - Additional properties to log
 * @returns {object} Log entry
 */
async function registerFile({file, date, url, maxDays, api, type = 'data', props} = {}) {
  // Check that we have not recently downloaded this URL
  if (url) {
    const existing = await archive.search({url}, {maxDays})
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
  const entry = {}
  if (url) {
    entry.url = url
    if (api) {
      entry.api = api
    }
  }
  entry.date = date
  entry.dateAdded = new Date()
  entry.type = type
  entry.checksum = await archive.hashFile(file)
  const matching = await archive.search({ checksum: entry.checksum })
  if (matching.length > 0) {
    console.log(`[${file}] Already exists`)
    return true
  } else {
    // Move file to archive path
    const dir = archive.buildPath({
      url: entry.url,
      checksum: entry.checksum,
      date: entry.date
    })
    fs.mkdirSync(dir, { recursive: true })
    entry.path = path.join(dir, path.basename(file))
    fs.renameSync(file, entry.path)
  }

  // Log file
  if (props && Object.values(props).length > 0) {
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

module.exports = {
  downloadFile,
  downloadArcgisFeatureLayer,
  registerFile,
  buildWfsDownloadUrl
}
