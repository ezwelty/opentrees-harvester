/**
 * Load the provided source datasets.
 *
 * @module
 */

const { resolve } = require('path')
const glob = require('glob')
const colors = require('colors')
const Source = require('./source')
const { interpolateString, reduceString } = require('./helpers')
const { modifyCrosswalk } = require('./convert')

/**
 * Load sources from source properties.
 *
 * @param {string} path - Directory of JS files containing source properties.
 * @param {object} [filters={}]
 * @param {string[]} filters.ids - Return only sources with these identifiers.
 * @param {string[]} filters.countries - Return only source with these countries.
 * @param {string} [dir=data/${id}/input] - Source input directory (template
 * interpolated on source properties).
 * @returns {Source[]}
 */
function loadSources(path, filters = {}, dir = 'data/${id}/input') {
  // Load source properties
  const globOptions = { absolute: true, nodir: true, cwd: resolve(path) }
  var sourceProps = glob.sync('**/*.js', globOptions).
    map(file => require(file)).
    flat()
  // Ensure that source identifiers are unique
  const all = sourceProps.map(props => props.id)
  const duplicated = all.filter((item, index) => all.indexOf(item) != index)
  if (duplicated.length) {
    throw new Error(
      `Duplicate source identifiers: ${[...new Set(duplicated)].join(', ')}`)
  }
  // Filter source properties
  sourceProps = sourceProps.filter(props => {
    return (
      (
        !filters.ids ||
        filters.ids.map(x => reduceString(x)).includes(reduceString(props.id))
      ) &&
      (
        !filters.countries ||
        filters.countries.map(x => reduceString(x)).includes(reduceString(props.country))
      )
    )
  })
  const sources = []
  const invalid = []
  for (const props of sourceProps) {
    let input
    let source
    try {
      // Modify crosswalk for unit conversions and range parsing
      props.crosswalk = modifyCrosswalk(props.crosswalk)
      input = interpolateString(dir, props)
    } catch (error) {
      const tag = `[${props.id}]`.red
      console.error(`${tag} ${error.message}`)
      invalid.push(props.id)
      continue
    }
    try {
      // Convert to Source class
      source = new Source(props, input)
    } catch (error) {
      console.error(error.message)
      invalid.push(props.id)
      continue
    }
    sources.push(source)
  }
  // Report failures
  if (invalid.length) {
    console.error(
      `${'[ERROR]'.red} Skipped ${invalid.length} invalid source(s):`,
      invalid.join(', ')
    )
  }
  return sources
}

module.exports = {
  loadSources
}
