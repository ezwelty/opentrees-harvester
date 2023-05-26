# Archiver (draft)

[`archive.js`](/archive.js) contains a set of functions that together implement a basic versioned data archive. The sections below provide simple usage examples.

## Archive a web page

Uses [Puppeteer](https://pptr.dev) to render web pages with a headless brower (Chromium).

```js
const puppeteer = require('puppeteer')
const archive = require('./archive')

URL = 'https://data.sa.gov.au/data/dataset/street-trees'
DATE = new Date()
BASENAME = 'response'

// Open a new browser page
browser = await puppeteer.launch()
page = await browser.newPage()

// Navigate the page to a URL
response = await archive.loadPage(URL, page)

if (response.status() < 300) {
  // Save and log HTML
  html = await archive.readPageHtml(page)
  archive.logData({
    data: html,
    filename: `${BASENAME}.html`,
    url: URL,
    date: DATE,
    type: 'page',
    format: 'html',
    status: response.status(),
    headers: response.headers(),
  })
  // Save and log MHTML
  mhtml = await archive.readPageMhtml(page)
  archive.logData({
    data: mhtml,
    filename: `${BASENAME}.mhtml`,
    url: URL,
    date: DATE,
    type: 'page',
    format: 'mhtml',
    status: response.status(),
    headers: response.headers(),
  })
} else {
  // Log error
  archive.log({
    url: URL,
    date: DATE,
    type: 'page',
    status: response.status(),
    headers: response.headers(),
  })
}

// Close browser
await browser.close()
```

## Archive a file

```js
var { downloadFile } = require('../lib/helpers')
const archive = require('./archive')

URL =
  'https://s3.ap-southeast-2.amazonaws.com/dmzweb.adelaidecitycouncil.com/OpenData/Street_Trees/Street_Trees.csv'
DATE = new Date()

// Check that we have not already downloaded this URL
results = await archive.search({ url: URL })
assert(results.length == 0)

// Build archive directory for file
dir = archive.buildPath(URL, DATE)

// Download file to directory
path = await downloadFile(URL, dir, {
  override: { skip: true, skipSmaller: true },
})

if (path) {
  // Log file
  archive.log({
    url: URL,
    path: path,
    date: DATE,
    type: 'data',
  })
}
```
