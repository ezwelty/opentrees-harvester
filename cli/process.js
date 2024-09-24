#!/usr/bin/env node
const colors = require('colors')
const commandLineUsage = require('command-line-usage')
const commandLineArgs = require('command-line-args')
const { DEFAULT_OPTIONS } = require('./common')
const { loadSources } = require('../lib/sourceio')
const { interpolateString } = require('../lib/helpers')

const OPTIONS = [
  ...DEFAULT_OPTIONS,
  {
    name: 'file', type: String, defaultValue: 'output/${id}.csv',
    // Escape special characters for chalk. See https://github.com/Polymer/tools/pull/612
    description: "Template for output file path, with source properties referred to by name (default: 'output/${id}.csv').".
      replace(/[{}\\]/g, '\\$&')
  },
  {
    name: 'driver', type: String,
    description: (
      'Name of GDAL driver to use for output (see https://gdal.org/drivers/vector). ' +
      'Guessed from file extension if not provided.'
    )
  },
  {
    name: 'creation', type: String, multiple: true,
    defaultValue: ['GEOMETRY=AS_WKT', 'STRING_QUOTING=IF_NEEDED'],
    description: 'Driver-specific dataset creation options (see https://gdal.org/drivers/vector).'
  },
  {
    name: 'overwrite', type: Boolean, defaultValue: false,
    description: 'Overwrite output file even if it already exists.'
  },
  {
    name: 'centroids', type: Boolean, defaultValue: false,
    description: 'Whether to reduce non-point geometries to centroids.'
  },
  {
    name: 'keep-invalid', type: Boolean, defaultValue: false,
    description: 'Whether to keep features with empty or invalid geometries.'
  },
  {
    name: 'keep-fields', type: Boolean, defaultValue: false,
    description: 'Whether to keep the input feature fields alongside the result of the schema crosswalk.'
  },
  {
    name: 'prefix', type: String, defaultValue: '',
    description: 'String to append to input field names to prevent collisions with output field names. Applies only with `keep-fields`.'
  },
  {
    name: 'bounds', type: Number, multiple: true,
    description: 'Bounding box in the format [xmin, ymin, xmax, ymax] (EPSG:4326). If provided, features outside the bounds are skipped.'
  }
]

const USAGE = [
  {
    header: 'process.js',
    content: (
      'Process sources and save as new vector files.\n' +
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
  console.error(`${'[ERROR]'.red} ${error.message}`)
  console.log(commandLineUsage(USAGE))
  process.exit(1)
}

// Load sources
const filters = {}
const filterKeys = ['id', 'country', 'city', 'state', 'designation', 'scope', 'omit']
filterKeys.forEach(key => filters[key] = options[key])
const sources = loadSources(`${__dirname}/../sources.js`, filters)

// Process sources
const success = []
const failure = []
const skip = []
const processOptions = {
  driver: options.driver,
  creation: options.creation,
  overwrite: options.overwrite,
  centroids: options.centroids,
  keepInvalid: options.keepInvalid,
  keepFields: options.keepFields,
  prefix: options.prefix,
  bounds: options.bounds,
}
async function processSource(source) {
  const file = interpolateString(options.file, source.props)
  try {
    const result = await source.process(file, processOptions)
    if (result) {
      success.push(source.props.id)
    } else {
      skip.push(source.props.id)
    }
  } catch (error) {
    console.error(error.message)
    failure.push(source.props.id)
  }
}
async function processSources() {
  for (const source of sources) {
    await processSource(source)
  }
  if (success.length) {
    console.log(
      `${'[SUCCESS]'.green} Processed ${success.length} sources:\n\n` +
      success.join('\n')
    )
  }
  if (failure.length) {
    console.error(
      `${'[ERROR]'.red} Failed to process ${failure.length} sources:\n\n` +
      failure.join('\n')
    )
  }
  if (skip.length) {
    console.log(
      `${'[SKIPPED]'.dim} ${skip.length} sources already existed:\n\n` +
      skip.join('\n')
    )
  }
}
processSources()
