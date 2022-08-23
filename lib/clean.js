/**
 * Helper functions for data cleaning.
 *
 * @module
 * @private
 */

/**
 * Build regular expression.
 *
 * @param {object} obj
 * @param {string[]} obj.values - Values (joined with '|')
 * @param {string} obj.prefix - Prefix for each value (e.g. '^')
 * @param {string} obj.suffix - Suffix for each value (e.g. '$')
 * @param {string} flags - Search flags (e.g. 'i')
 * @return {RegExp}
 */
function buildPattern({ values, prefix = '', suffix = '', flags = '' }) {
  const pattern = values.map(value => `${prefix}${value}${suffix}`).join('|')
  return new RegExp(pattern, flags)
}

/**
 * Strings representing null values.
 */
const NULL = {
  prefix: '^', suffix: '$', flags: 'i',
  values: [
    'null', 'n/a', 'na', 'unknown', 'unidentified', 'tba', 'ikke registreret',
    'não identificada', 'to define', 'not specified', 'not listed',
    'not assessed', 'not'
  ]
}
NULL.pattern = buildPattern(NULL)

/**
 * Clean a string.
 *
 * Steps performed, in order:
 * - Remove trailing whitespace
 * - Replace whitespace sequences with a single space
 * - Clear ('') if recognized as representing a null value
 *
 * @param {string} value
 * @return {string}
 * @example
 * cleanString(' Malus\tpumila \n')
 * cleanString(' null ')
 */
function cleanString(value) {
  return value.replace(/\s+/g, ' ').trim().replace(NULL.pattern, '')
}

/**
 * Clean a feature field.
 *
 * Steps performed, in order:
 * - string: {@link cleanString}
 *
 * @param {string} value
 * @return {string}
 * @example
 * cleanString(' Malus\tpumila \n')
 */
function cleanFeatureField(value) {
  return typeof value === 'string' ? cleanString(value) : value
}

/**
 * Criteria for deleting a feature.
 */
const DELETE = {
  prefix: '\\b', suffix: '\\b', flags: 'i',
  values: ['vacant', 'no tree', 'removed', 'destroyed', 'proposed', 'planting site'],
  fields: ['scientific', 'common', 'genus', 'species', 'description', 'health']
}
DELETE.pattern = buildPattern(DELETE)

/**
 * Determine whether feature should be deleted.
 *
 * @param {object} obj
 * @return {str} Name of first field name triggering deletion (or `undefined`)
 * @example
 * deleteFeature({ scientific: 'vacant planting', common: 'Apple' })
 * deleteFeature({ scientific: 'Malus pumila', common: 'apple' })
 */
function deleteFeature(obj) {
  return DELETE.fields.find(key => obj[key] && obj[key].match(DELETE.pattern))
}

module.exports = {
  cleanString,
  cleanFeatureField,
  deleteFeature
}
