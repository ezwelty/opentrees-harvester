#!/usr/bin/env node
const colors = require('colors')
const commandLineUsage = require('command-line-usage')
const commandLineArgs = require('command-line-args')
const { loadSources, interpolateString, DEFAULT_OPTIONS } = require('./load')
const { modifyCrosswalk } = require('../lib/convert')

const OPTIONS = [
  ...DEFAULT_OPTIONS,
  {
    name: 'out', alias: 'o', type: String, defaultValue: 'data/${id}/output/output.csv',
    // Escape special characters for chalk. See https://github.com/Polymer/tools/pull/612
    description: "Template for output file, with source properties referred to by name (default: 'data/${id}/output/output.csv').".
      replace(/[{}\\]/g, '\\$&')
  },
  {
    name: 'centroids', type: Boolean, defaultValue: false,
    description: 'Whether to reduce non-point geometries to centroids.'
  },
  {
    name: 'keepInvalid', type: Boolean, defaultValue: false,
    description: 'Whether to keep features with empty or invalid geometries.'
  },
  {
    name: 'keepFields', type: Boolean, defaultValue: false,
    description: 'Whether to keep the input feature fields alongside the result of the schema crosswalk.'
  },
  {
    name: 'prefix', type: String, defaultValue: '',
    description: 'String to append to input field names to prevent collisions with output field names. Applies only with `keepFields`.'
  },
  {
    name: 'bounds', type: Number, multiple: true,
    description: 'Bounding box in the format [xmin, ymin, xmax, ymax] (EPSG:4326). If provided, features outside the bounds are skipped.'
  },
  {
    name: 'force', alias: 'f', type: Boolean, defaultValue: false,
    description: 'Overwrite output file even if it already exists.'
  }
]

const USAGE = [
  {
    header: 'example/process.js',
    content: 'Process sources and save as new vector files.',
  },
  {
    header: 'Options',
    optionList: OPTIONS
  }
]

// Parse command line arguments
let options
try {
  options = commandLineArgs(OPTIONS)
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
const sources = loadSources(options.ids, options.countries, options.dir)

// Process sources
const success = []
const failure = []
const skip = []
const processOptions = {
  overwrite: options.force,
  centroids: options.centroids,
  keepInvalid: options.keepInvalid,
  keepFields: options.keepFields,
  prefix: options.prefix,
  bounds: options.bounds
}
sources.forEach(source => {
  const file = interpolateString(options.out, source.props)
  // Modify crosswalk for unit conversions and range parsing
  source.props.crosswalk = modifyCrosswalk(source.props.crosswalk)
  try {
    const result = source.process(file, processOptions)
    if (result) success.push(source.props.id)
    else skip.push(source.props.id)
  } catch (error) {
    console.error(error.message)
    failure.push(source.props.id)
  }
})

if (success.length) {
  console.log(
    `${'[SUCCESS]'.green} Processed ${success.length} sources:`,
    success.join(', ')
  )
}
if (failure.length) {
  console.error(
    `${'[ERROR]'.red} Failed to process ${failure.length} sources:`,
    failure.join(', ')
  )
}
if (skip.length) {
  console.log(
    `${'[SKIPPED]'.dim} Skipped ${skip.length} sources:`,
    skip.join(', ')
  )
}
