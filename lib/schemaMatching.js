const { parseFieldName } = require('./convert.js')

/**
 * Extract field names from crosswalk function.
 *
 * Assumes that the function accesses properties of an object named `x`.
 *
 * @param {*} func - Function whose source to extract field names from.
 * @returns {string[]} Field names accessed by the function.
 * @private
 * @example
 * extractFieldNamesFromFunction(x => x['foo'] + x.bar)  // ['foo', 'bar']
 * extractFieldNamesFromFunction(x => x)  // []
 * extractFieldNamesFromFunction(x => 'street')  // []
 */
function extractFieldNamesFromFunction(func) {
  const string = func.toString()
  const regex = /x\['([^']+)'\]|x\["([^"]+)"\]|x\.([a-zA-Z0-9_]+)/g
  const matches = Array.from(string.matchAll(regex))
  return matches.map(match => match.slice(1, 4).find(Boolean))
}

/**
 * Build source-target field name map from crosswalk.
 *
 * @param {Object.<string, string|function>} crosswalk - Source crosswalk.
 * @returns {Object.<string, string[]>} Unique, lowercased source field names
 * mapped to each target field name.
 * @private
 * @example
 * buildMapFromCrosswalk({foo: 'BAR', baz: 'qux'})  // {foo: ['bar'], baz: ['qux']}
 * buildMapFromCrosswalk({foo: x => x.bar + x.bar + x.baz})  // {foo: ['bar', 'baz']}
 */
function buildMapFromCrosswalk(crosswalk) {
  const map = {}
  for (const [key, value] of Object.entries(crosswalk)) {
    const target = parseFieldName(key).base
    if (!(target in map)) {
      map[target] = []
    }
    let names
    if (typeof value === 'function') {
      names = extractFieldNamesFromFunction(value)
    } else {
      names = [value]
    }
    map[target].push(...names.map(name => name.toLowerCase()))
  }
  // Count each source-target pair only once per crosswalk
  for (const key in map) {
    map[key] = [...new Set(map[key])]
  }
  return map
}

/**
 * Build source-target field name map from crosswalks.
 *
 * Duplicate mappings across sources are retained in output in order to weigh results
 * by the number of sources that agree on a mapping.
 *
 * @param {Array<Object<string, string|function>>} crosswalks - Source crosswalks.
 * @returns {Array<Object<string, string[]>>} Lowercased source field names
 * mapped to each target field name.
 * @example
 * // {foo: ['bar', 'bar'], baz: ['qux']}
 * buildMapFromCrosswalks([{foo: 'bar', baz: 'qux'}, {foo: x => x.bar}])
 */
function buildMapFromCrosswalks(crosswalks) {
  const maps = crosswalks.map(buildMapFromCrosswalk)
  return maps.reduce((merge, map) => {
    for (const [key, value] of Object.entries(map)) {
      if (key in merge) {
        merge[key].push(...value)
      } else {
        merge[key] = value
      }
    }
    return merge
  }, {})
}

/**
 * Find potential target field names matching a source field name.
 *
 * @param {string} name - Source field name (case-insensitive).
 * @param {Object.<string, string[]>} map - Target-source field name map.
 * @return {Object[]} Target field name `key` and `count` of source field name matches.
 * @example
 * matchFieldName('FOO', {bar: ['foo', 'foo']})  // [{key: 'bar', count: 2}]
 */
function matchFieldName(name, map) {
  name = name.toLowerCase()
  const matches = []
  for (const [key, values] of Object.entries(map)) {
    // Count instances of name in value
    const count = values.filter(value => value === name).length
    if (count) {
      matches.push({key, count})
    }
  }
  return matches.sort((a, b) => b.count - a.count)
}

/**
 * Guess crosswalk from source field names.
 *
 * @param {string[]} names - Source field names.
 * @param {Object.<string, string[]>} map - Target-source field name map.
 * @returns {Array[Object.<string, Object[]>, string[]]} Target field names mapped to
 * source field `name`, result `count`, and number of target field name `matches`
 * (if greater  than 1), followed by unmatched source field names.
 * @example
 * // [{
 * //   bar: [{name: 'foo', count: 2, matches: 2}, {name: 'foz', count: 1}],
 * //   baz: [{name: 'foo', count: 1, matches: 2}]
 * // ]},
 * //   ['zzz']
 * // ]
 * guessCrosswalk(['foz', 'foo', 'zzz'], {bar: ['foo', 'foo', 'foz'], baz: ['foo']})
 */
function guessCrosswalk(names, map) {
  // Match each name.
  const fieldMatches = names.reduce((acc, name) => {
    acc[name] = matchFieldName(name, map)
    return acc
  }, {})
  // Invert to crosswalk format (target: source)
  // If multiple source match the same target, list by descending count
  // If source matches multiple targets, keep all but sort by count
  const unmatched = []
  const crosswalk = {}
  for (const [name, matches] of Object.entries(fieldMatches)) {
    if (!matches.length) {
      unmatched.push(name)
      continue
    }
    for (const match of matches) {
      if (!(match.key in crosswalk)) {
        crosswalk[match.key] = []
      }
      const result = {name, count: match.count}
      if (matches.length > 1) {
        result.matches = matches.length
      }
      crosswalk[match.key].push(result)
    }
  }
  // Sort matches by count
  for (const key in crosswalk) {
    crosswalk[key] = crosswalk[key].sort((a, b) => b.count - a.count)
  }
  return [crosswalk, unmatched]
}

/**
 * Print crosswalk guess to console.
 *
 * @param {Array[Object.<string, Object[]>, string[]]} guess - Crosswalk guess.
 * @example
 * guess = guessCrosswalk(['foz', 'foo', 'zzz'], {bar: ['foo', 'foo', 'foz'], baz: ['foo']})
 * printCrosswalkGuess(guess)
 * // {
 * //  // bar: 'foo'  // sources: 2
 * //  // bar: 'foz'  // sources: 1
 * //  // baz: 'foo'  // sources: 1
 * // }
 * // // Unmatched columns: zzz
 * guess = guessCrosswalk(['foo'], {bar: ['foo', 'foo']})
 * printCrosswalkGuess(guess)
 * // {
 * //   bar: 'foo'  // sources: 2
 * // }
 */
function printCrosswalkGuess(guess) {
  // Print crosswalk as Javascript object
  // If target field name has multiple or non-unique matches, print with comment
  const texts = []
  for (const [key, matches] of Object.entries(guess[0])) {
    for (const match of matches) {
      let text = `${key}: '${match.name}'  // sources: ${match.count}`
      const exact = matches.length === 1 && (match.matches || 1) === 1
      if (exact) {
        text = `  ${text}`
      } else {
        text = `  // ${text}`
      }
      texts.push(text)
    }
  }
  console.log(`{\n${texts.join('\n')}\n}`)
  if (guess[1].length) {
    console.log('// Unmatched columns: ' + guess[1].join(', '))
  }
}

module.exports = {
    buildMapFromCrosswalks,
    matchFieldName,
    guessCrosswalk,
    printCrosswalkGuess
}
