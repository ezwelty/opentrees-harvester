/**
 * Read and write sources and source properties.
 *
 * @module
 */
const path = require('path')
const util = require('util')
const fs = require('fs')
const Source = require('./source')
const { reduceString } = require('./helpers')
const { modifyCrosswalk } = require('./convert')
const {SourceProperties} = require('./types')

/**
 * Read source properties from a file.
 *
 * @param {string} file - Path to source properties file.
 * @returns {SourceProperties[]} Source properties.
 */
function readSourceProperties(file) {
  const absolutePath = require.resolve(path.resolve(file))
  delete require.cache[absolutePath]
  return require(absolutePath)
}

/**
 * Write source properties to a file.
 *
 * @param {SourceProperties[]} sourceProps - Source properties.
 * @param {string} file - Path to new source properties file.
 * @param {string} currentFile - Path to current source properties file (
 * defaults to `file`). Used to replicate the header
 * (everything before `module.exports`).
 */
function writeSourceProperties(sourceProps, file, currentFile) {
  if (!currentFile) {
    currentFile = file
  }
  // const copies = structuredClone(sourceProps)
  const copies = sourceProps
  // Define custom inspection for functions
  function inspectFunction() {
    const txt = this.toString()
    // Remove extra indentation
    const lines = txt.split('\n')
    if (lines.length == 1) {
      return txt
    }
    if (lines.length == 2) {
      return txt.replace(/\n +/g, '\n  ')
    }
    const lastIndent = lines.slice(-1)[0].match(/^ +/)
    if (lastIndent) {
      return txt.replace(new RegExp(`\n${lastIndent[0]}`, 'g'), '\n')
    }
    return txt
  }
  // Assign function to all functions recursively
  function assignFunction(obj) {
    if (typeof obj == 'function') {
      obj[util.inspect.custom] = inspectFunction
    } else if (typeof obj == 'object') {
      for (const key of Object.keys(obj)) {
        assignFunction(obj[key])
      }
    }
  }
  assignFunction(copies)
  // Render as text
  const txt = util.inspect(
    copies, {depth: null, maxStringLength: null, maxArrayLength: null}
  )
  // Extract imports from current file
  const sourceCode = fs.readFileSync(currentFile, 'utf8')
  const headerMatch = sourceCode.match(/^([\s\S]*)?module\.exports/m)
  if (!headerMatch) {
    throw new Error('Could not parse header')
  }
  fs.writeFileSync(file, `${headerMatch[1]}module.exports = ${txt}\n`)
}


/**
 * Build unique source ids from source properties.
 *
 * @param {SourceProperties[]} sourceProps - Source properties.
 * @returns {string[]} Source ids.
 * @private
 */
function buildSourceIds(sourceProps) {
  const ids = sourceProps.map(props =>
    [props.country, props.state, props.city, props.designation]
    .filter(Boolean).join(' > ')
  )
  // Append scope to duplicate ids if scope not same for all duplicates
  let duplicates = ids.filter(id => ids.filter(x => x == id).length > 1)
  duplicates.forEach(duplicate => {
    // Get scopes for id
    let scopes = []
    ids.forEach((id, index) => {
      if (id == duplicate) {
        scopes.push(sourceProps[index].scope)
      }
    })
    // If scopes not all equal, append scope to id
    if (scopes.some(scope => scope != scopes[0])) {
      ids.forEach((id, index) => {
        if (id == duplicate) {
          ids[index] = `${id} > ${sourceProps[index].scope}`
        }
      })
    }
  })
  // Append integer to duplicate ids
  duplicates = ids.filter(id => ids.filter(x => x == id).length > 1)
  duplicates.forEach(duplicate => {
    let counter = 1
    ids.forEach((id, index) => {
      if (id == duplicate) {
        ids[index] = `${id} > ${counter++}`
      }
    })
  })
  return ids
}

/**
 * Load sources from source properties.
 *
 * Crosswalks are modified for unit conversions and range parsing.
 *
 * @param {string} file - Path to file containing source properties.
 * @param {object} [filters={}]
 * @param {string[]} filters.id - Filter by id.
 * @param {string[]} filters.country - Filter by country.
 * @param {string[]} filters.state - Filter by state.
 * @param {string[]} filters.city - Filter by city.
 * @param {string[]} filters.designation - Filter by designation.
 * @param {string[]} filters.scope - Filter by scope.
 * @param {boolean} filters.omit - Whether to include sources flagged as `omit: true`.
 * @returns {Source[]}
 */
function loadSources(file, filters = {}) {
  // Load source properties
  var sourceProps = readSourceProperties(file)
  // Assign unique ids
  const ids = buildSourceIds(sourceProps)
  sourceProps.forEach((props, index) => {
    props.id = ids[index]
  })
  // Filter source properties
  if (filters.omit !== true) {
    sourceProps = sourceProps.filter(props => !props.omit)
  }
  const filteredProps = []
  for (const props of sourceProps) {
    var include = true
    for (const key in filters) {
      if (key == 'omit') {
        continue
      }
      const filter = filters[key]
      if (!filter || !filter.length) {
        continue
      }
      const value = props[key] ? reduceString(props[key]) : null
      if (!filter.map(reduceString).includes(value)) {
        include = false
        break
      }
    }
    if (include) {
      filteredProps.push(props)
    }
  }
  // Load sources
  const sources = []
  const invalid = []
  for (const props of filteredProps) {
    let source
    if (props.crosswalk) {
      try {
        // Modify crosswalk for unit conversions and range parsing
        props.crosswalk = modifyCrosswalk(props.crosswalk)
      } catch (error) {
        const tag = `[${props.id}]`.red
        console.error(`${tag} ${error.message}`)
        invalid.push(props.id)
        continue
      }
    }
    try {
      // Convert to Source class
      source = new Source(props)
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
      `${'[ERROR]'.red} Skipped ${invalid.length} invalid source(s):\n\n` +
      invalid.join('\n')
    )
  }
  return sources
}

module.exports = {
  readSourceProperties,
  writeSourceProperties,
  loadSources,
  buildSourceIds
}
