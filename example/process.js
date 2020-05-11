#!/usr/bin/env node
const colors = require('colors')
const commandLineUsage = require('command-line-usage')
const commandLineArgs = require('command-line-args')
let sources = require('./load.js')

const OPTIONS = [
  {
    name: 'help', alias: 'h', type: Boolean, defaultValue: false
  },
  {
    name: 'ids', alias: 'i', type: String, multiple: true, defaultOption: true,
    description: 'Restrict processing to these source identifiers.'
  },
  {
    name: 'countries', alias: 'c', type: String, multiple: true,
    description: 'Restrict processing to these countries (case and whitespace insensitive).'
  },
  {
    name: 'out', alias: 'o', type: String,
    defaultValue: 'data/${source.props.id}/output/output.csv',
    description: "Template for output file path (default: 'data/${source.props.id}/output/output.csv')."
  },
  {
    name: 'force', alias: 'f', type: Boolean,
    description: 'Overwrite existing output files.'
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
  console.error(`${'[Error]'.red}`, error)
  console.log(commandLineUsage(USAGE))
  process.exit(1)
}
if (options.contries) {
  options.contries = options.countries.map(x =>
    x.toLowerCase().replace('\s*', ''))
}

// Filter sources
sources = sources.
  filter(source => !options.ids || options.ids.includes(source.props.id)).
  filter(source => !options.countries ||
    options.countries.includes(
      source.props.country.toLowerCase().replace('\s*', '')
    )
  )

// Process sources
const success = []
const failure = []
const skip = []
sources.forEach(source => {
  const file = eval(`\`${options.out}\``)
  try {
    const result = source.process(file, { overwrite: options.force })
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
