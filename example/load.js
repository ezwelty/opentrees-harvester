const glob = require('glob')
const colors = require('colors')
const Source = require('../source')

const DEFAULT_OPTIONS = [
  {
    name: 'help', alias: 'h', type: Boolean, defaultValue: false
  },
  {
    name: 'ids', alias: 'i', type: String, multiple: true, defaultOption: true,
    description: 'Restrict to these source identifiers.'
  },
  {
    name: 'countries', alias: 'c', type: String, multiple: true,
    description: 'Restrict to these source countries (case and whitespace insensitive).'
  },
  {
    name: 'dir', alias: 'd', type: String, defaultValue: 'data/${s.id}/input',
    // Escape special characters for chalk. See https://github.com/Polymer/tools/pull/612
    description: "Template for input directory, where source properties are represented by 's' (default: 'data/${s.id}/input').".
      replace(/[{}\\]/g, '\\$&')
  }
]

/**
 * Interpolate string as template with values from object.
 * 
 * @param {string} x - String to interpolate
 * @param {object} s - Object with properties to use for interpolation
 * @example
 * interpolateString('data/${s.id}/input', {id: 'melbourne'})
 */
function interpolateString(x, s) {
  return eval(`\`${x.replace(/`/g, '\\`')}\``)
}

/**
 * Convert string to lowercase and remove whitespace.
 * 
 * @param {string} x - String to reduce
 * @example
 * reduceString('United Kingdom')
 */
function reduceString(x) {
  return x.toLowerCase().replace(/\s/, '')
}

/**
 * Load sources from source properties.
 *
 * @param {string[]} ids - Return only sources with these identifiers
 * @param {string[]} countries - Return only source with these countries
 * @param {string} [dir=data/${s.id}/input] - Working directory path (template
 * to interpolate)
 * @return {Source[]}
 */
function loadSources(ids, countries, dir = 'data/${s.id}/input') {
  // Load source properties
  const sourceProps = glob.sync(`${__dirname}/../sources/**/*.js`).
    map(file => require(file)).
    flat()
  // Ensure that source identifiers are unique
  const all = sourceProps.map(props => props.id)
  const duplicated = all.filter((item, index) => all.indexOf(item) != index)
  if (duplicated.length) {
    throw new Error(
      `Duplicate source identifiers: ${[...new Set(duplicated)].join(', ')}`)
  }
  // Filter and load sources
  if (countries) {
    countries = countries.map(x => reduceString(x))
  }
  const sources = []
  const invalid = []
  for (const props of sourceProps) {
    if (
      (!ids || ids.includes(props.id)) &&
      (!countries || countries.includes(reduceString(props.country)))
    ) {
      try {
        sources.push(new Source(props, interpolateString(dir, props)))
      } catch (error) {
        console.error(error.message)
        invalid.push(props.id)
      }
    }
  }
  if (invalid.length) {
    console.error(
      `${'[ERROR]'.red} Skipped ${invalid.length} invalid source(s):`,
      invalid.join(', ')
    )
  }
  return sources
}

module.exports = {
  loadSources,
  interpolateString,
  DEFAULT_OPTIONS
}
