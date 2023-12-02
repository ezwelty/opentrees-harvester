# Archiver (draft)

[`lib/archive.js`](/lib/archive.js) contains a set of functions that together implement a basic versioned data archive. The sections below provide simple usage examples.

## Archive a web page

Uses [Puppeteer](https://pptr.dev) to render web pages with a headless brower (Chromium).

```js
const puppeteer = require('puppeteer')
const archive = require('./lib/archive')

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

See the functions in [`lib/workflow.js`](/lib/workflow.js).

```js
const workflow = require('./lib/workflow')

// Download a remote file
await workflow.downloadFile({
  url: 'https://path/to/remote/file',
})

// Register an existing local file
await workflow.registerFile({
  file: '/path/to/local/file',
  url: 'https://original/path/to/remote/file',
  type: 'data'
})
```
