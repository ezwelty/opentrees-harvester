/**
 * Read and write source properties.
 *
 * @module
 */

/**
 * Read source properties from a file.
 *
 * @param {string} file - Path to source properties file.
 * @returns {object[]} Source properties.
 */
function readSourceProperties(file) {
  const absolutePath = require.resolve(path.resolve(file))
  delete require.cache[absolutePath]
  return require(absolutePath)
}

/**
 * Write source properties to a file.
 *
 * @param {object[]} sources - Source properties.
 * @param {string} file - Path to new source properties file.
 * @param {string} currentFile - Path to current source properties file (
 * defaults to `file`). Used to replicate the header
 * (everything before `module.exports`).
 */
function writeSourceProperties(sources, file, currentFile) {
  if (!currentFile) {
    currentFile = file
  }
  // const copies = structuredClone(sources)
  copies = sources
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
  const header = sourceCode.match(/^([\s\S]*)?module\.exports/m)[1]
  fs.writeFileSync(file, `${header}module.exports = ${txt}\n`)
}

module.exports = {
  readSourceProperties,
  writeSourceProperties
}
