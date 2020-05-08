UNIT_MULTIPLIERS = {
  in: {
    m: 0.0254
  },
  ft: {
    m: 0.3048
  },
  cm: {
    m: 0.01
  },
  lb: {
    kg: 0.453592
  }
}

FIELD_MULTIPLIERS = {
  circumference: {
    dbh: 0.5
  }
}

/**
 * Return all supported unit names.
 * @return {string[]}
 */
getUnits = () => {
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
 */
parseFieldName = (name) => {
  let base, range, unit, matches
  // Extract unit tag (m, cm, ft, in, ...)
  matches = [...name.matchAll(
    new RegExp(`_(${getUnits().join('|')})(?=$|_)`, 'g'))]
  if (matches.length == 1) {
    unit = matches[0][1]
    name = name.replace(`_${unit}`, '')
  } else if (matches.length > 1) {
    throw new Error(`Invalid field name - multiple unit tags: ${name}`)
  }
  // Extract range tag (min, max, range)
  matches = [...name.matchAll(/_(min|max|range)(?=$|_)/g)]
  if (matches.length == 1) {
    range = matches[0][1]
    name = name.replace(`_${range}`, '')
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
parseRange = (x) => {
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
 */
getFieldCrosswalk = (name) => {
  let { base, range, unit } = parseFieldName(name)
  let multiplier = 1
  // units
  if (unit) {
    // NOTE: Taking first target
    const target = Object.keys(UNIT_MULTIPLIERS[unit] || {})[0]
    if (target) {
      multiplier *= UNIT_MULTIPLIERS[unit][target]
      unit = target
    }
  }
  if (base) {
    // NOTE: Taking first target
    const target = Object.keys(FIELD_MULTIPLIERS[base] || {})[0]
    if (target) {
      multiplier *= FIELD_MULTIPLIERS[base][target]
      base = target
    }
  }
  const basename = `${base}${unit ? `_${unit}` : ''}`
  if (range === 'range') {
    // Parse into min, max
    return {
      [`${basename}_min`]: multiplier === 1 ?
        eval(`x => parseRange(x).min`) :
        eval(`x => parseRange(x).min * ${multiplier}`),
      [`${basename}_max`]: multiplier === 1 ?
        eval(`x => parseRange(x).max`) :
        eval(`x => parseRange(x).max * ${multiplier}`),
    }
  }
  const rename = `${basename}${range ? `_${range}` : ''}`
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
 * - Converts fields to standard units
 * 
 * @param {object} crosswalk
 * @return {object} Modified crosswalk
 */
exports.modifyCrosswalk = (crosswalk) => {
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
