#!/usr/bin/env node
const commandLineUsage = require('command-line-usage')
const commandLineArgs = require('command-line-args')
const { DEFAULT_OPTIONS } = require('./common')
const { loadSources } = require('../lib/sourceio')

const OPTIONS = [
  ...DEFAULT_OPTIONS,
  {
    name: 'max-days', type: Number, defaultValue: null,
    description: 'Maximum age (in days) of archived file (if older, re-download).'
  },
  {
    name: 'type', type: String, defaultValue: 'data',
    description: 'Type of file to download (data, metadata, license).'
  },
  {
    name: 'format', type: String, defaultValue: 'pdf',
    description: 'Format of browser download (pdf, png, mhtml, html).'
  }
]

const USAGE = [
  {
    header: 'get.js',
    content: (
      'Download files if missing or older than a maximum age in the archive.\n' +
      'Source filters are case and whitespace insensitive.'
    )
  },
  {
    header: 'Options',
    optionList: OPTIONS
  }
]

// Parse command line arguments
let options
try {
  options = commandLineArgs(OPTIONS, { camelCase: true })
  if (options.help) {
    console.log(commandLineUsage(USAGE))
    process.exit(0)
  }
} catch (error) {
  console.error(`${'[Error]'.red}`, error)
  console.log(commandLineUsage(USAGE))
  process.exit(1)
}

// Load sources
const filters = {}
const filterKeys = ['id', 'country', 'city', 'state', 'designation', 'scope', 'omit']
filterKeys.forEach(key => filters[key] = options[key])
const sources = loadSources(`${__dirname}/../sources.js`, filters)

// Get sources
const success = []
const failure = []
const skip = []
async function getSource(source) {
  const searchOptions = { format: options.format, maxDays: options.maxDays }
  // Check if all files already exist
  try {
    await source.findFiles(options.type, searchOptions)
    skip.push(source.props.id)
    return
  } catch (error) {
    // Download files
    try {
      await source.fetchFiles(options.type, searchOptions)
      success.push(source.props.id)
    } catch (error) {
      console.error(error.message)
      failure.push(source.props.id)
    }
  }
}
async function getSources() {
  console.log(`Found ${sources.length} sources`)
  await Promise.all(sources.map(source => getSource(source)))
  if (success.length) {
    console.log(
      `${'[SUCCESS]'.green} Downloaded ${success.length} sources:\n\n` +
      success.join('\n')
    )
  }
  if (failure.length) {
    console.error(
      `${'[ERROR]'.red} Failed to download ${failure.length} sources:\n\n` +
      `${failure.join('\n')}`
    )
  }
  if (skip.length) {
    console.log(
      `${'[SKIPPED]'.dim} ${skip.length} sources already in the archive (or empty):\n\n` +
      skip.join('\n')
    )
  }
}
getSources()
