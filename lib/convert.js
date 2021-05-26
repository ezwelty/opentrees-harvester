const { cleanFeatureField } = require('./clean')

module.exports = {
  modifyCrosswalk
}

/**
 * Unit conversions.
 *
 * Each key is the original unit and each value is the multiplication factor to
 * convert it to the corresponding standard unit.
 */
const UNIT_MULTIPLIERS = {
  // Length
  in: { m: 0.0254 },
  ft: { m: 0.3048 },
  cm: { m: 0.01 },
  // Mass
  lb: { kg: 0.453592 }
}

/**
 * Field conversions.
 * 
 * Each key is the original field and each value is the multiplication factor to
 * convert it to the corresponding standard field.
 */
const FIELD_MULTIPLIERS = {
  circumference: { dbh: 0.5 }
}

/**
 * Return all supported unit names.
 * @return {string[]}
 */
function getUnits() {
  const units = new Set()
  for (const key in UNIT_MULTIPLIERS) {
    units.add(key)
    Object.keys(UNIT_MULTIPLIERS[key]).forEach(x => units.add(x))
  }
  return [...units]
}

/**
 * Parse field name.
 * @return {object} name
 * @return {string} name.base - Variable (e.g. 'height')
 * @return {string} name.unit - Unit (e.g. 'm')
 * @return {string} name.range - Range type ('min', 'max', or 'range')
 * @example
 * parseFieldName('height_m_min')
 * parseFieldName('height_min_m')
 * parseFieldName('height_range')
 */
function parseFieldName(name) {
  let base, range, unit, matches
  // Extract unit tag (m, cm, ft, in, ...)
  matches = [...name.matchAll(
    new RegExp(`_(${getUnits().join('|')})(?=$|_)`, 'g'))]
  if (matches.length == 1) {
    unit = matches[0][1]
    name = name.replace(new RegExp(`_${unit}(?=$|_)`), '')
  } else if (matches.length > 1) {
    throw new Error(`Invalid field name - multiple unit tags: ${name}`)
  }
  // Extract range tag (min, max, range)
  matches = [...name.matchAll(/_(min|max|range)(?=$|_)/g)]
  if (matches.length == 1) {
    range = matches[0][1]
    name = name.replace(new RegExp(`_${range}(?=$|_)`), '')
  } else if (matches.length > 1) {
    throw new Error(`Invalid field name - multiple range tags: ${name}`)
  }
  // Parse basename
  base = name
  return { base: base, unit: unit, range: range }
}

/**
 * Parse numeric range from string.
 * 
 * Assumes positive numbers.
 * If two numbers are present, assumes the smallest is min, the largest max.
 * If one number is present, assumes:
 * - it is min if a "less than" tag is present
 * - it is max if a "greater than" tag is present
 * - it is both min and max if no such tags are present
 * 
 * @param {string} x - String
 * @return {object} range
 * @return {string} range.min - Range minimum
 * @return {string} range.max - Range maximum
 * @example
 * parseRange('0')
 * parseRange('0-1m')
 * parseRange('1-0m')
 * parseRange('<1m')
 * parseRange('>0m')
 * parseRange('Greater than 0 but less than 1m')
 */
function parseRange(x) {
  if (!x) {
    return {}
  }
  x = x.trim()
  // ...${min}...${max}...
  matches = x.match(/^[^0-9\.]*([0-9\.]+)[^0-9\.]+([0-9\.]+)[^0-9\.]*$/)
  if (matches) {
    if (matches[1] < matches[2]) return { min: matches[1], max: matches[2] }
    else return { min: matches[2], max: matches[1] }
  }
  // ...${min/max}...
  matches = x.match(/([0-9\.]+)/)
  if (matches) {
    // < ${max}
    if (x.match(/<|less than/i)) return { min: '0', max: matches[1] }
    // > ${min}
    else if (x.match(/>|greater than|\+/i)) return { min: matches[1] }
    // ${value}
    else return { min: matches[1], max: matches[1] }
  }
  console.warn(`Failed to parse range:`, x)
  return {}
}

/**
 * Whether value is '', undefined, or null.
 * 
 * @param {*} x
 * @return {boolean}
 * @example
 * isBlank('')
 * isBlank(null)
 * isBlank(undefined)
 */
function isBlank(x) {
  return [undefined, null, ''].includes(x)
}

/**
 * Compute crosswalk for field based on its name.
 *
 * @param {string} name - Field name
 * @return {object} Crosswalk, where keys are new field names and values are
 * either null (no change) or a function called as f(x), where x is the value of
 * the field.
 * @example
 * // Unit conversions
 * getFieldCrosswalk('height')
 * getFieldCrosswalk('height_m')
 * getFieldCrosswalk('height_cm').height.toString()
 * // Range parsing
 * getFieldCrosswalk('height_range').height_min.toString()
 * getFieldCrosswalk('height_cm_range').height_min.toString()
 * // Custom field units
 * getFieldCrosswalk('dbh_m').dbh.toString()
 * // Field conversions
 * getFieldCrosswalk('circumference').dbh.toString()
 */
function getFieldCrosswalk(name) {
  let { base, range, unit } = parseFieldName(name)
  let multiplier = 1
  if (base) {
    const target = Object.keys(FIELD_MULTIPLIERS[base] || {})[0]
    if (target) {
      multiplier *= FIELD_MULTIPLIERS[base][target]
      base = target
    }
  }
  if (unit) {
    // Convert to standard unit
    const target = Object.keys(UNIT_MULTIPLIERS[unit] || {})[0]
    if (target) {
      multiplier *= UNIT_MULTIPLIERS[unit][target]
      unit = target
    }
  }
  if (range === 'range') {
    // Parse into min, max
    return {
      [`${base}_min`]: multiplier === 1 ?
        x => parseRange(x).min :
        x => parseRange(x).min * multiplier,
      [`${base}_max`]: multiplier === 1 ?
        x => parseRange(x).max :
        x => parseRange(x).max * multiplier
    }
  }
  const rename = `${base}${range ? `_${range}` : ''}`
  if (name !== rename) {
    return {
      // Avoid spurious '0' (''/null) or 'NaN' (undefined)
      [rename]: multiplier === 1 ? null :
        x => isBlank(x) ? '' : x * multiplier
    }
  }
}

/**
 * Modify crosswalk based on field names.
 *
 * Performs the following modifications:
 * - Applies standard cleaning function to all fields
 * - Expands ranges to min, max
 * - Converts fields to standard or custom units
 * - Converts fields to standard fields (e.g. circumference to diameter)
 * 
 * @param {object} crosswalk
 * @return {object} Modified crosswalk
 * @example
 * obj = { HEIGHT: 100, DBH: '10-20cm', COMMON: ' Apple\n' }
 * crosswalk = { height_cm: 'HEIGHT', dbh_cm_range: 'DBH', common: 'COMMON' }
 * crosswalk = modifyCrosswalk(crosswalk)
 * crosswalk.common(obj) // 'Apple'
 * crosswalk.height(obj) // 1
 * crosswalk.dbh_min(obj) // '10'
 * crosswalk.dbh_max(obj) // '20'
 * obj = { DBH: '>20cm' }
 * crosswalk.dbh_min(obj) // '20'
 * crosswalk.dbh_max(obj) // undefined
 * obj = { HEIGHT: 'n/a' }
 * crosswalk.height(obj) // ''
 */
function modifyCrosswalk(crosswalk) {
  const target = {}
  for (const old in crosswalk) {
    const conversions = getFieldCrosswalk(old)
    const baseFunction = typeof crosswalk[old] === 'string' ?
      x => cleanFeatureField(x[crosswalk[old]]) :
      x => cleanFeatureField(crosswalk[old](x))
    if (conversions) {
      for (const name in conversions) {
        if (Object.keys(crosswalk).includes(name)) {
          throw new Error(`Target field name already exists: ${name}`)
        }
        if (typeof conversions[name] === 'function') {
          // Rename and modify field
          target[name] = x => conversions[name](baseFunction(x))
        } else {
          // Rename field
          target[name] = baseFunction
        }
      }
    } else {
      target[old] = baseFunction
    }
  }
  return target
}
