const fs = require('fs')
const mime = require('mime-types')
const puppeteer = require('puppeteer')

ARCHIVE_PATH = 'archive'
LOG_PATH = 'archive.jsonl'

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
 * Build archive path.
 *
 * @param {string} url – Represented with MD5 hash
 * @param {Date} date – Represented with ISO 8601 string with colons (:)
 * replaced with dashes (-)
 * @returns {string}
 */
function buildPath(url, date = new Date()) {
  const hash = md5(url)
  return `${ARCHIVE_PATH}/${hash}/${date.toISOString().replace(/:/g, '-')}`
}

/**
 * Add an entry to the archive log.
 *
 * @param {object} params
 * @param {Date} params.date
 * @returns {object}
 */
function log({ date = new Date(), ...props } = {}) {
  const entry = { date, ...props }
  fs.writeFileSync(LOG_PATH, JSON.stringify(entry) + '\n', { flag: 'a' })
  return entry
}

/**
 * Guess filename from HTTP response headers.
 *
 * @param {object} headers
 * @param {string} extension - Default extension
 * @param {string} basename - Default basename
 * @returns {string}
 */
function guessFilename(headers = {}, extension = '', basename = 'response') {
  if (headers['content-disposition']) {
    const match = headers['content-disposition'].match(
      /filename[^;=\n]*=\s*(UTF-\d['"]*)?((['"]).*?[.]$\2|[^;\n]*)?/i
    )
    if (match) {
      basename = match[2]
    }
  }
  extension = mime.extension(headers['content-type']) || extension
  if (extension && !basename.toLowerCase().endsWith(`.${extension}`)) {
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
  const path = `${dir}/${filename}`
  // Write file to path
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path, data)
  // Log file
  return log({ url, path, date, ...props })
}

/**
 * Search log for matching entries.
 *
 * @param {object} params - Search criteria as key-value pairs that must match
 * @param {int} limit
 * @return {object[]} Log entries that match search criteria
 */
async function search(params, limit) {
  const readInterface = readline.createInterface({
    input: fs.createReadStream(LOG_PATH),
  })
  const criterias = Object.entries(params || {})
  const entries = []
  for await (const line of readInterface) {
    if (!line.trim()) {
      continue
    }
    if (limit && entries.length === limit) {
      return entries
    }
    const log = JSON.parse(line)
    if (criterias.map(([key, value]) => log[key] === value).every(Boolean)) {
      entries.push(log)
    }
  }
  return entries
}

module.exports = {
  loadPage,
  readPageHtml,
  readPageMhtml,
  buildPath,
  guessFilename,
  log,
  logData,
  search,
}
