const gdal = require('gdal-next')

/**
 * Format a date object as a string.
 * 
 * Formats a date as `YYYY-MM-DD`, `YYYY-MM`, or `YYYY`.
 * See https://en.wikipedia.org/wiki/ISO_8601.
 * 
 * @param {object} obj - Date
 * @param {integer} obj.year - Year (e.g. `2020`)
 * @param {integer} [obj.month] - Month (`1`-`12`)
 * @param {integer} [obj.day] - Day of the month (`1`-`31`)
 * @return {string} ISO 8601 date
 */
exports.date_to_string = (obj) => {
  if (!obj) return ''
  const yyyy = obj.year.toString().padStart(4, '0')
  if (!obj.month) return `${yyyy}`
  const mm = obj.month.toString().padStart(2, '0')
  if (!obj.day) return `${yyyy}-${mm}`
  const dd = obj.day.toString().padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}

/**
 * Format a time object as string.
 * 
 * Formats a time as `hh:mm:ss.*`.
 * See https://en.wikipedia.org/wiki/ISO_8601.
 * 
 * @param {object} obj - Time
 * @param {integer} [obj.hour=0] - Hour (`0` - `23`)
 * @param {integer} [obj.minute=0] - Minute (`0` - `59`)
 * @param {number} [obj.second=0] - Second (`0` - `59.*`)
 * @return {string} ISO 8601 time
 */
exports.time_to_string = (obj) => {
  if (!obj) return ''
  const hh = (obj.hour || 0).toString().padStart(2, '0')
  const mm = (obj.minute || 0).toString().padStart(2, '0')
  const ss_ms = (obj.second || 0).toString().split('.')
  const ss = ss_ms[0].padStart(2, '0')
  const ms = ss_ms[1] ? `.${ss_ms[1]}` : ''
  return `${hh}:${mm}:${ss}${ms}`
}

/**
 * Format a GDAL timezone flag as a string.
 * 
 * Formats a GDAL timezone flag as `''` (unknown), `Z` (UTC), or `[+-]hh:mm`.
 * See https://en.wikipedia.org/wiki/ISO_8601.
 * 
 * @param {integer} [timezone=0] - GDAL timezone flag
 * @return {string} ISO 8601 timezone
 */
exports.timezone_to_string = (timezone = 0) => {
  // TZFlag: 0=unknown, 1=ambiguous, 100=GMT, 104=GMT+1, 80=GMT-5
  // See https://gdal.org/development/rfc/rfc56_millisecond_precision.html
  const min = timezone > 1 ? (timezone - 100) * 15 : null
  const hh = Math.floor(Math.abs(min) / 60).toString().padStart(2, '0')
  const mm = (Math.abs(min) % 60).toString().padStart(2, '0')
  return min ? `${min > 0 ? '+' : '-'}${hh}:${mm}` : (min == 0 ? 'Z' : '')
}

/**
 * Format a datetime object as a string.
 *
 * Formats a datetime as `YYYY-MM-DDThh:mm:ss.*` and the appropriate timezone.
 * See https://en.wikipedia.org/wiki/ISO_8601.
 *
 * @param {object} obj - Datetime
 * @param {integer} obj.year - Year (e.g. `2020`)
 * @param {integer} obj.month - Month (`1`-`12`)
 * @param {integer} obj.day - Day of the month (`1`-`31`)
 * @param {integer} [obj.hour=0] - Hour (`0` - `23`)
 * @param {integer} [obj.minute=0] - Minute (`0` - `59`)
 * @param {number} [obj.second=0] - Second (`0` - `59.*`)
 * @param {integer} [obj.timezone=0] - GDAL timezone flag
 * @param {boolean} [truncate=false] - Whether to return only date when hour,
 * minute, and second are all zero.
 * @return {string} ISO 8601 datetime
 */
exports.datetime_to_string = (obj, truncate = false) => {
  if (!obj) return ''
  const date = exports.date_to_string(obj)
  if (truncate && !(obj.hour || obj.minute || obj.second)) {
    return date
  }
  const time = exports.time_to_string(obj)
  const timezone = exports.timezone_to_string(obj.timezone)
  return `${date}T${time}${timezone}`
}

/**
 * String formatters by GDAL field type.
 */
exports.gdal_string_formatters = {
  [gdal.OFTDate]: exports.date_to_string,
  [gdal.OFTTime]: exports.time_to_string,
  [gdal.OFTDateTime]: exports.datetime_to_string
}

/**
 * Map object properties to a schema iteratively.
 *
 * @param {object} obj - Object
 * @param {object|object[]} mapping - Either a single mapping or an array
 * of mappings applied iteratively.
 * @param {object} [mapping.crosswalk={}] - Schema crosswalk. Each key is a new
 * property name and each value is either the original property name (string) or
 * a function called as f(obj).
 * @param {boolean} [mapping.keep=false] - Whether to keep original object
 * properties
 * @param {string} [mapping.prefix=''] - String to append to original property
 * names
 * @return {object} Mapped object
 */
exports.map_object = (obj, mapping) => {
  let final = obj
  if (!Array.isArray(mapping)) mapping = [mapping]
  for (const { crosswalk = {}, keep, prefix = '' } of mapping) {
    const current = {}
    if (keep) {
      for (const key in final) {
        current[`${prefix}${key}`] = final[key]
      }
    }
    for (const key in crosswalk) {
      current[key] = (typeof crosswalk[key] === 'function') ?
        crosswalk[key](final) : final[crosswalk[key]]
    }
    final = current
  }
  return final
}

/**
 * Common geometry field names.
 * 
 * @property {string[]} wkt - Field names for well-known-text (WKT)
 * @property {string[]} x - Field names for x (longitude, easting)
 * @property {string[]} y - Field names for y (latitude, northing)
 */
exports.geometry_fields = {
  wkt: [
    'geom', 'the_geom', 'wkb_geometry', 'shape', 'geo_shape', 'geometrie',
    'geometry'
  ],
  x: [
    'longitude', 'lon', 'lng', 'long', 'x', 'x_long', 'x_koordina',
    'x-koordinate', 'coord long', 'x_coord', 'coordenada x'
  ],
  y: [
    'latitude', 'lat', 'y', 'y_lat', 'y_koordina', 'y-koordinate',
    'coord lat', 'y_coord', 'coordenada y'
  ]
}

/**
 * Guess feature layer geometry fields based on their name.
 * 
 * @param {gdal.Layer} layer - Feature layer
 * @return {object[]} Names of fields with potential WKT geometry (wkt) or
 *  x and y coordinates (x, y).
 */
exports.guess_geometry_fields = (layer) => {
  var geometry = {}
  const names = layer.fields.getNames()
  Object.keys(exports.geometry_fields).forEach(key => {
    geometry[key] = names.filter(x =>
      exports.geometry_fields[key].includes(x.toLowerCase()))
  })
  return geometry
}

/**
 * Get the list of vector file extensions supported by GDAL.
 * 
 * @return {string[]} File extensions
 */
exports.get_gdal_extensions = () => {
  var extensions = []
  gdal.drivers.forEach(driver => {
    const meta = driver.getMetadata()
    if (meta.DCAP_VECTOR === 'YES') {
      if (meta.DMD_EXTENSION) extensions.push(meta.DMD_EXTENSION)
      if (meta.DMD_EXTENSIONS) extensions.push(...meta.DMD_EXTENSIONS.split(' '))
    }
  })
  return [...new Set(extensions.sort())]
}

/**
 * Get the list of GDAL driver names assigned to each file extension.
 * 
 * @return {object} GDAL driver names by file extension
 */
exports.get_gdal_drivers = () => {
  var drivers = {}
  exports.get_gdal_extensions().forEach(extension => drivers[extension] = [])
  gdal.drivers.forEach(driver => {
    const meta = driver.getMetadata()
    if (meta.DCAP_VECTOR === 'YES') {
      var extensions = []
      if (meta.DMD_EXTENSION) {
        extensions.push(meta.DMD_EXTENSION)
      }
      if (meta.DMD_EXTENSIONS) {
        extensions.push(...meta.DMD_EXTENSIONS.split(' '))
      }
      [...new Set(extensions)].forEach(extension =>
        drivers[extension].push(driver.description.toLowerCase()))
    }
  })
  return drivers
}

/**
 * Get the file extension from a local or remote file path.
 * 
 * @param {string} file - Local or remote file path
 * @return {string} File extension
 */
exports.get_file_extension = (file) => {
  const matches = file.match(/\.([^\.\/\?\#]+)(?:$|\?|\#)/)
  return matches ? matches[1] : ''
}

/**
 * Common file extensions for vector datasets.
 *
 * @property {string[]} 1 - Primary file extensions (take precedence)
 * @property {string[]} 2 - Secondary file extensions
 */
exports.file_extensions = {
  1: ['geojson', 'topojson', 'shp', 'vrt', 'gml', 'kml'],
  2: ['csv', 'json']
}

/**
 * Regular expressions matching vector file extensions supported by GDAL.
 * 
 * @property {RegExp} any - Matches any supported file extension
 * @property {RegExp} primary - Matches primary file extensions
 * @property {RegExp} secondary - Matches secondary file extensions
 */
exports.gdal_file_patterns = {
  any: new RegExp(`\\.(${exports.get_gdal_extensions().join('|')})$`, 'i'),
  primary: new RegExp(`\\.(${exports.file_extensions[1].join('|')})$`, 'i'),
  secondary: new RegExp(`\\.(${exports.file_extensions[2].join('|')})$`, 'i')
}

/**
 * Get the transformation between two spatial reference systems (SRS).
 *
 * @param {string|gdal.SpatialReference} source - Source SRS
 * @param {string|gdal.SpatialReference} target - Target SRS
 * @return {gdal.CoordinateTransformation|undefined} Coordinate transformation,
 * or undefined if the two SRS are equal.
 */
exports.get_srs_transform = (source, target) => {
  if (typeof source === 'string') {
    source = gdal.SpatialReference.fromUserInput(source)
  }
  if (typeof target === 'string') {
    target = gdal.SpatialReference.fromUserInput(target)
  }
  // NOTE: Only sure way to test for equality is to test the transformation
  const same = source.isSame(target) ||
    (source.isSameGeogCS(target) && !source.isProjected() && !target.isProjected())
  if (!same) {
    return new gdal.CoordinateTransformation(source, target)
  }
}

/**
 * Build the GDAL polygon corresponding to a bounding box.
 * 
 * @param {number[]} bounds - Bounding box [xmin, ymin, xmax, ymax]
 * @param {string|gdal.SpatialReference} [srs] - Spatial reference system
 * @returns {gdal.Polygon}
 */
exports.bounds_to_polygon = (bounds, srs) => {
  if (typeof srs === 'string') {
    srs = gdal.SpatialReference.fromUserInput(srs)
  }
  var polygon = new gdal.Polygon()
  var ring = new gdal.LinearRing()
  ring.points.add(new gdal.Point(bounds[0], bounds[1]))
  ring.points.add(new gdal.Point(bounds[0], bounds[3]))
  ring.points.add(new gdal.Point(bounds[2], bounds[3]))
  ring.points.add(new gdal.Point(bounds[2], bounds[1]))
  ring.points.add(new gdal.Point(bounds[0], bounds[1]))
  polygon.rings.add(ring)
  polygon.srs = srs
  return polygon
}

/**
 * Check whether spatial reference system has x (east), y (north) axis order.
 * 
 * @param {string|gdal.SpatialReference} srs - Spatial reference system
 */
exports.is_srs_xy = (srs) => {
  if (typeof srs === 'string') {
    srs = gdal.SpatialReference.fromUserInput(srs)
  }
  wkt = srs.toWKT()
  xi = wkt.match(/AXIS\[[^\]]*(EAST|WEST)\]/)
  yi = wkt.match(/AXIS\[[^\]]*(NORTH|SOUTH)\]/)
  if (xi && xi) {
    return xi.index < yi.index
  } else {
    // NOTE: Assumes x, y axis order if axes not defined
    return true
  }
}
