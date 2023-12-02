const fs = require('fs')
const mime = require('mime-types')
const puppeteer = require('puppeteer')
const crypto = require('crypto')
const axios = require('axios')
const util = require('util')
const stream = require('stream')
const streamPipeline = util.promisify(stream.pipeline)

const helpers = require('./helpers')

ARCHIVE_PATH = path.resolve(__dirname, '../archive')
LOG_PATH = path.resolve(__dirname, '../archive.jsonl')

/**
 * Download file and compute MD5 hash of the stream.
 *
 * @param {string} url – URL to download
 * @param {string} dir – Directory to save file to
 * @returns {object|null} File path (file) and md5-base64 checksum (checksum)
 */
async function downloadFile(url, dir = '.') {
  try {
    const response = await axios.get(url, {responseType: 'stream'})
    const filename = guessFilename({headers: response.headers, url: url})
    const file = path.join(dir, filename)
    fs.mkdirSync(dir, { recursive: true })
    const hasher = crypto.createHash('md5')
    const base64 = new stream.PassThrough({encoding: 'base64'})
    await Promise.all([
      streamPipeline(response.data, fs.createWriteStream(file)),
      streamPipeline(response.data, base64),
      streamPipeline(base64, hasher)
    ])
    const checksum = hasher.digest('hex')
    const megabytes = (fs.statSync(file).size / (1024**2)).toFixed(3)
    console.log(`Downloaded ${url} to ${file} (${megabytes} MB)`)
    return {file, checksum}
  } catch (error) {
    throw new Error(`Download of ${url} failed: ${error.message}}`)
  }
}

/**
 * Load URL in browser page.
 *
 * @param {string} url
 * @param {puppeteer.Page} page
 * @returns {puppeteer.HTTPResponse}
 */
async function loadPage(url, page) {
  return await page.goto(url, { waitUntil: 'networkidle0' })
}

/**
 * Read browser page as HTML.
 *
 * @param {puppeteer.Page} page
 * @returns {string} HTML
 */
async function readPageHtml(page) {
  return await page.content()
}

/**
 * Read browser page as MHTML.
 *
 * @param {puppeteer.Page} page
 * @return {string} MHTML
 */
async function readPageMhtml(page) {
  const cdp = await page.target().createCDPSession()
  const result = await cdp.send('Page.captureSnapshot', { format: 'mhtml' })
  return result.data
}

/**
 * Compute MD5 hash.
 *
 * @param {string} x
 * @returns {string} MD5 hash
 */
function md5(x) {
  return crypto.createHash('md5').update(x).digest('hex')
}

/**
 * Compute MD5 hash of a file read as a stream.
 *
 * Uses base64 encoding by default as it was found to be much faster for large
 * binary files and same as UTF-8 for text.
 *
 * @param {string} file
 * @returns {string} MD5 hash
 */
async function hashFile(file, options = {encoding: 'base64'}) {
  const hash = crypto.createHash('md5')
  const stream = fs.createReadStream(file, options)
  for await (const chunk of stream) {
    hash.update(chunk.toString())
  }
  return hash.digest('hex')
}

/**
 * Build archive path.
 *
 * @param {string} url – Represented with MD5 hash
 * @param {string} checksum - File hash. Used as the hash if no url
 * @param {Date} date – Represented with ISO 8601 string with no colons (:)
 * @returns {string}
 */
function buildPath({url, checksum, date = new Date()} = {}) {
  const hash = url ? md5(url) : checksum
  date = date.toISOString().replace(/:/g, '')
  return path.join(ARCHIVE_PATH, hash, date)
}

/**
 * Add an entry to the archive log.
 *
 * @param {object} params
 * @param {Date} params.date
 * @returns {object}
 */
async function log({ date = new Date(), ...props } = {}) {
  let entry = { date, ...props }
  if (entry.path && !entry.checksum) {
    entry.checksum = await hashFile(entry.path)
  }
  if (entry.checksum) {
    const entries = await search({ checksum: entry.checksum })
    if (entries.length > 0) {
      // Reuse path of most recent entry with same checksum
      const existingEntry = entries.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      )[0]
      entry.path = existingEntry.path
    }
  }
  fs.appendFileSync(LOG_PATH, JSON.stringify(entry) + '\n')
  return entry
}

/**
 * Guess filename from HTTP response headers.
 *
 * @param {object} headers – HTTP response headers
 * @param {string} defaultBasename - Basename to use if none is found
 * @param {string} url - HTTP request URL
 * @returns {string}
 */
function guessFilename({headers = {}, defaultBasename = 'response', url = null} = {}) {
  const basenames = []
  if (headers['content-disposition']) {
    const match = headers['content-disposition'].match(
      /filename[^;=\n]*=\s*(UTF-\d['"]*)?((['"]).*?[.]$\2|[^;\n]*)?/i
    )
    if (match) {
      // Remove begin or end quotes
      basenames.push(match[2].replace(/^['"]|['"]$/g, ''))
    }
  }
  if (url) {
    const u = new URL(url)
    const filename = path.basename(u.pathname)
    if (path.extname(filename)) {
      basenames.push(filename)
    }
  }
  basenames.push(defaultBasename)
  ADDITIONAL_MIME_TYPES = {
    // https://mimetype.io/application/x-zip-compressed
    'application/zip-compressed': 'zip',
    'application/x-zip-compressed': 'zip',
    'multipart/x-zip': 'zip'
  }
  const extension = (
    mime.extension(headers['content-type']) ||
    ADDITIONAL_MIME_TYPES[headers['content-type']]
  )
  const basename = basenames.filter(x => x)[0].replace(/\.$/, '')
  if (extension && path.extname(basename) !== `.${extension}`) {
    return `${basename}.${extension}`
  }
  return basename
}

/**
 * Write data to file and add to log.
 *
 * @param {object} params
 * @param {string} params.data
 * @param {string} params.filename
 * @param {string} params.url
 * @param {Date} params.date
 * @return {object}
 */
function logData({ data, filename, url, date = new Date(), ...props } = {}) {
  const dir = buildPath(url, date)
  const file = `${dir}/${filename}`
  // Write file
  fs.mkdirSync(file, { recursive: true })
  fs.writeFileSync(file, data)
  // Log file
  return log({ url, file, date, ...props })
}

/**
 * Search log for matching entries.
 *
 * @param {object} params - Search criteria as key-value pairs that must match
 * @param {object} options
 * @param {int} [options.limit] - Maximum number of results to return
 * @param {int} [options.maxDays] - Maximum age of result in days
 * @return {Promise<object[]>} Entries that match search criteria, sorted by date
 * descending.
 */
async function search(params, {limit, maxDays} = {}) {
  let maxDate
  if (typeof maxDays === 'number' && isFinite(maxDays)) {
    maxDate = new Date()
    maxDate.setSeconds(maxDate.getSeconds() - maxDays * 24 * 3600)
  }
  const criterias = Object.entries(params || {})
  const entries = []
  for await (const log of helpers.iterateJSONL(LOG_PATH)) {
    if (limit && entries.length === limit) {
      return entries
    }
    if (criterias.map(([key, value]) => log[key] === value).every(Boolean)) {
      if (!maxDate || new Date(log.date) > maxDate) {
        entries.push(log)
      }
    }
  }
  // Sort entries by date descending
  entries.sort((a, b) => new Date(b.date) - new Date(a.date))
  return entries
}

module.exports = {
  ARCHIVE_PATH,
  LOG_PATH,
  md5,
  loadPage,
  readPageHtml,
  readPageMhtml,
  buildPath,
  guessFilename,
  log,
  logData,
  search,
  hashFile,
  downloadFile
}
