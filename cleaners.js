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
  // Weight
  lb: { kg: 0.453592 }
}

/**
 * Custom field units.
 * 
 * Units for fields that do not use a standard unit.
 */
const CUSTOM_FIELD_UNITS = {
  dbh: 'cm'
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
    const custom_unit = CUSTOM_FIELD_UNITS[base]
    if (custom_unit && unit !== custom_unit) {
      // Convert from standard unit to custom unit
      multiplier /= UNIT_MULTIPLIERS[custom_unit][unit]
    }
  }
  if (range === 'range') {
    // Parse into min, max
    return {
      [`${base}_min`]: multiplier === 1 ?
        eval(`x => parseRange(x).min`) :
        eval(`x => parseRange(x).min * ${multiplier}`),
      [`${base}_max`]: multiplier === 1 ?
        eval(`x => parseRange(x).max`) :
        eval(`x => parseRange(x).max * ${multiplier}`),
    }
  }
  const rename = `${base}${range ? `_${range}` : ''}`
  if (name !== rename) {
    return {
      [rename]: multiplier === 1 ? null : eval(`x => x * ${multiplier}`)
    }
  }
}

/**
 * Modify crosswalk based on field names.
 *
 * Performs the following modifications:
 * - Expands ranges to min, max
 * - Converts fields to standard or custom units
 * - Converts fields to standard fields (e.g. circumference to diameter)
 * 
 * @param {object} crosswalk
 * @return {object} Modified crosswalk
 * @example
 * obj = { HEIGHT: 100, DBH: '10-20cm' }
 * crosswalk = modifyCrosswalk({ height_cm: 'HEIGHT', dbh_cm_range: 'DBH' })
 * crosswalk.height(obj)
 * crosswalk.dbh_min(obj)
 * crosswalk.dbh_max(obj)
 */
function modifyCrosswalk(crosswalk) {
  const target = {}
  for (const old in crosswalk) {
    const conversions = getFieldCrosswalk(old)
    if (conversions) {
      for (const name in conversions) {
        if (Object.keys(crosswalk).includes(name)) {
          throw new Error(`Target field name already exists: ${name}`)
        }
        if (typeof conversions[name] === 'function') {
          // Rename and modify field
          if (typeof crosswalk[old] === 'function') {
            target[name] = x => conversions[name](crosswalk[old](x))
          } else {
            target[name] = x => conversions[name](x[crosswalk[old]])
          }
        } else {
          // Rename field
          target[name] = crosswalk[old]
        }
      }
    } else {
      // No change
      target[old] = crosswalk[old]
    }
  }
  return target
}
