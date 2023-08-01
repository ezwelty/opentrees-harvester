const fs = require('fs')
const path = require('path');
const mime = require('mime-types')
const puppeteer = require('puppeteer')
const readline = require('readline');
const crypto = require('crypto');
var { doesArchiverContainHash } = require('../lib/helpers')



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
async function log({ date = new Date(), ...props } = {}) {
  let entry = { date, ...props }
  // add the hash for the data to the archiver entry
  if (entry.path) {
    const hash = hashData(entry.path)
    const hashEntry = {data_hash: hash}
    entry = { ...entry, ...hashEntry};
  }

  if (entry.type && entry.type === "data") {
    console.log("checking if the data file is the same as the one in the archiver already...")
    if (entry.data_hash) {
      const archiverInfo = await doesArchiverContainHash(entry.data_hash);
      const hashesEqual = archiverInfo[0];
      const entryWithExistingHash = archiverInfo[1];
      // If they are equal, record this to the registry by reusing the path of the previous version.
      if (hashesEqual) {
        console.log("Data hashes are equal...")
        entry.path = entryWithExistingHash.path;
      }
      // If the hashes are not equal, add the newly downloaded file to the archive/registry
    }
  }
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
 * @param {int} minAge  number that represents to only download the data if the most recent version is older than X hours. Default behavior (null) will return a result if a version exists in the archiver at all. 
 * @return {object[]} Log entries that match search criteria
 */
async function search(params, limit = null, minAge = null) {
  const readInterface = readline.createInterface({
    input: fs.createReadStream(LOG_PATH),
  })
  dateToCheck = new Date();
  if (minAge !== null) {
    // Here, we just set the hours based on the minAge. If we want to go by a different timeunit, we will need to change .setHours to the specified time unit.
    dateToCheck.setHours(dateToCheck.getHours() - minAge);
  } 
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
      if (minAge === null) {
        // if user does not specify a minAge, then we should not further filter based on the log.date and just return if the url exists in the archiver at all
        entries.push(log);
      }
      else if (minAge && minAge === 0) {
        // if user DOES specify a minAge but the minAge is 0, this means we should always download for the data, regardless of the age of the data in the archiver.
        return [];
      }
      else if (minAge && new Date(log.date) > dateToCheck) {
        // lastly, if the user does specify a minAge that isn't 0, we should filter to see if the log.date is minAge hours old. If it is minAge hours old, we should still download.
        entries.push(log)
      }
    }
  }
  return entries
}


/**
 * Use this function to read in data from local url and then hash the data
 * @param {string} dataFileUrl points to the data file such as archive\cfe690c9ecadb70910fa8ea57f6aa8a7\2023-06-25T23-54-52.993Z\Street_Trees.csv
 */
function hashData(dataFileUrl) {
  let bytesDataFile = "";
  try {
    const absoluteFilePath = path.resolve(dataFileUrl);
    bytesDataFile = fs.readFileSync(absoluteFilePath, 'utf8');
  } catch (err) {
    console.error("Error reading datafile: ", dataFileUrl);
    throw err.message;
  }
  return md5(bytesDataFile);
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
  hashData
}
