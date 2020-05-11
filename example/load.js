const glob = require('glob')
const path = require('path')
const colors = require('colors')
const Source = require(`../source`)

// Load sources
let sources = glob.sync(`${__dirname}/../sources/**/*.js`)
  .map(file => require(file))
  .flat()
  .map(props => new Source(props, path.join('data', props.id, 'input')))

// Ensure that source ids are unique
const ids = sources.map(source => source.props.id)
const duplicated = ids.filter((item, index) => ids.indexOf(item) != index)
if (duplicated.length) {
  throw new Error(
    `Duplicate source identifiers: ${[...new Set(duplicated)].join(', ')}`)
}

// Skip invalid sources
const invalid = []
sources = sources.filter(source => {
  const errors = source.validate()
  if (errors.length) {
    source.warn('Validation failed:', errors)
    invalid.push(source.props.id)
  }
  return !errors.length
})
if (invalid.length) {
  console.error(
    `${'[WARNING]'.yellow} Skipped ${invalid.length} invalid source(s):`,
    invalid
  )
}

module.exports = sources
