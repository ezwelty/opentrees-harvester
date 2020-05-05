unit_conversions = {
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

field_conversions = {
  circumference: {
    dbh: 0.5
  }
}

get_units = () => {
  const units = new Set()
  for (const key in unit_conversions) {
    units.add(key)
    Object.keys(unit_conversions[key]).forEach(x => units.add(x))
  }
  return [...units]
}

parse_field_name = (name) => {
  let base, range, unit, matches
  // Extract range tag (min, max)
  matches = [...name.matchAll(/_(min|max)(?=$|_)/g)]
  if (matches.length == 1) {
    range = matches[0][1]
    name = name.replace(`_${range}`, '')
  } else if (matches.length > 1) {
    throw new Error(`Invalid field name - multiple range tags: ${name}`)
  }
  // Extract unit tag (m, cm, ft, in, ...)
  matches = [...name.matchAll(
    new RegExp(`_(${get_units().join('|')})(?=$|_)`, 'g'))]
  if (matches.length == 1) {
    unit = matches[0][1]
    name = name.replace(`_${unit}`, '')
  } else if (matches.length > 1) {
    throw new Error(`Invalid field name - multiple unit tags: ${name}`)
  }
  // Parse basename
  base = name
  return { base: base, range: range, unit: unit }
}

get_field_conversion = (name) => {
  let { base, range, unit } = parse_field_name(name)
  let multiplier = 1
  // units
  if (unit) {
    // NOTE: Taking first target
    const target = Object.keys(unit_conversions[unit] || {})[0]
    if (target) {
      multiplier *= unit_conversions[unit][target]
      unit = target
    }
  }
  if (base) {
    // NOTE: Taking first target
    const target = Object.keys(field_conversions[base] || {})[0]
    if (target) {
      multiplier *= field_conversions[base][target]
      base = target
    }
  }
  const rename = `${base}${unit ? `_${unit}` : ''}${range ? `_${range}` : ''}`
  if (name !== rename) {
    return {
      from: name,
      to: rename,
      by: multiplier === 1 ? undefined : eval(`x => x * ${multiplier}`)
    }
  }
}

exports.modify_crosswalk = (crosswalk) => {
  const target = {}
  for (const key in crosswalk) {
    const conversion = get_field_conversion(key)
    if (conversion) {
      if (Object.keys(crosswalk).includes(conversion.to)) {
        throw new Error(`Target field name already exists: ${conversion.to}`)
      }
      if (typeof conversion.by === 'function') {
        if (typeof crosswalk[key] === 'function') {
          target[conversion.to] = x => conversion.by(crosswalk[key](x))
        } else {
          target[conversion.to] = x => conversion.by(x[crosswalk[key]])
        }
      } else {
        target[conversion.to] = crosswalk[key]
      }
    } else {
      target[key] = crosswalk[key]
    }
  }
  return target
}
