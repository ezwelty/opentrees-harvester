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
    description: 'Restrict to these source identifiers.'
  },
  {
    name: 'countries', alias: 'c', type: String, multiple: true,
    description: 'Restrict to these countries (case and whitespace insensitive).'
  },
  {
    name: 'force', alias: 'f', type: Boolean, defaultValue: false,
    description: 'Overwrite the target directory even if it is not empty.'
  }
]

const USAGE = [
  {
    header: 'example/get.js',
    content: 'Download remote files, unpack compressed or archive files, and execute shell commands to prepare source files for processing. By default, each source is assigned to the directory `data/${source.props.id}/input` (see `example/load.js`).'
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

// Get sources
const success = []
const failure = []
const skip = []
async function getSource(source) {
  try {
    const paths = await source.get(overwrite = options.force)
    if (paths.length) {
      success.push(source.props.id)
    } else {
      skip.push(source.props.id)
    }
  } catch (error) {
    console.error(error.message)
    failure.push(source.props.id)
  }
}
async function get() {
  await Promise.all(sources.map(source => getSource(source)))
  if (success.length) {
    console.log(
      `${'[SUCCESS]'.green} Got ${success.length} sources:`,
      success.join(', ')
    )
  }
  if (failure.length) {
    console.error(
      `${'[ERROR]'.red} Failed to get ${failure.length} sources:`,
      failure.join(', ')
    )
  }
  if (skip.length) {
    console.log(
      `${'[SKIPPED]'.dim} Skipped ${skip.length} sources:`,
      skip.join(', ')
    )
  }
}
get()
