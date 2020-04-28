const util = require('util')
const path = require('path')
const gdal = require('gdal-next')

/**
 * Format gdal.OFTDate field as string.
 * 
 * Formats a date as 'YYYY-MM-DD'.
 * See https://en.wikipedia.org/wiki/ISO_8601.
 * 
 * @param {object} obj - Date object {year, month, day, ...}
 * @return {string} ISO 8601 date
 */
exports.gdal_date_to_string = (obj) => {
  if (!obj) return ''
  const year = obj.year.toString().padStart(4, '0')
  const month = obj.month.toString().padStart(2, '0')
  const day = obj.day.toString().padStart(2, '0')
  return `${year}-${month}-${day}`
}

/**
 * Format gdal.OFTTime field as string.
 * 
 * Formats a time as 'hh:mm:ss'.
 * See https://en.wikipedia.org/wiki/ISO_8601.
 * 
 * @param {object} obj - Time object {hour, minute, second, ...}
 * @return {string} ISO 8601 time
 */
exports.gdal_time_to_string = (obj) => {
  if (!obj) return ''
  const hour = obj.hour ? obj.hour.toString().padStart(2, '0') : '00'
  const minute = obj.minute ? obj.minute.toString().padStart(2, '0') : '00'
  const second = obj.second ? obj.second.toString().padStart(2, '0') : '00'
  return `${hour}:${minute}:${second}`
}

/**
 * Format gdal.OFTDateTime timezone flag as string.
 * 
 * Formats a timezone as '' (unknown), 'Z' (UTC), or '[+-]hh:mm'.
 * See https://en.wikipedia.org/wiki/ISO_8601.
 * 
 * @param {object} obj - Datetime object {timezone, ...}
 * @return {string} ISO 8601 timezone
 */
exports.gdal_timezone_to_string = (obj) => {
  if (!obj) return ''
  // TZFlag: 0=unknown, 1=localtime(ambiguous), 100=GMT, 104=GMT+1, 80=GMT-5, etc
  // See https://gdal.org/development/rfc/rfc56_millisecond_precision.html
  const delta = obj.timezone > 1 ? (obj.timezone - 100) * 15 : null // minutes
  const hours = Math.floor(Math.abs(delta) / 60).toString().padStart(2, '0')
  const minutes = (Math.abs(delta) % 60).toString().padStart(2, '0')
  return timezone = delta ? `${delta > 0 ? '+' : '-'}${hours}:${minutes}` : (delta == 0 ? 'Z' : '')
}

/**
 * Format gdal.OFTDateTime field as string.
 * 
 * Formats a date as 'YYYY-MM-DDThh:mm:ss' and appropriate timezone tag.
 * See https://en.wikipedia.org/wiki/ISO_8601.
 * 
 * @param {object} obj - Datetime object {year, month, day, ...}
 * @return {string} ISO 8601 datetime
 */
exports.gdal_datetime_to_string = (obj) => {
  if (!obj) return ''
  const date = exports.gdal_date_to_string(obj)
  const time = exports.gdal_time_to_string(obj)
  const timezone = exports.gdal_timezone_to_string(obj)
  return `${date}T${time}${timezone}`
}

exports.gdal_string_formatters = {
  [gdal.OFTDate]: exports.gdal_date_to_string,
  [gdal.OFTTime]: exports.gdal_time_to_string,
  [gdal.OFTDateTime]: exports.gdal_datetime_to_string
}

/**
 * Map object properties to a schema.
 * 
 * @param {object} obj - Object
 * @param {object} crosswalk - Schema crosswalk:
 *  Each key is a new property name and each value is either
 *  the original property name (string) or a function called as f(obj).
 * @param {boolean} [keep=false] - Whether to keep original object properties
 * @param {string} [prefix='_'] - String to append to original property names
 * @return {object} Mapped object
 */
exports.map_object = (obj, crosswalk, keep = false, prefix = '_') => {
  var new_obj = {}
  if (keep) {
    for (const key in obj) {
      new_obj[`${prefix}${key}`] = obj[key]
    }
  }
  for (const key in crosswalk) {
    new_obj[key] = (typeof crosswalk[key] === 'function') ?
      crosswalk[key](obj) : obj[crosswalk[key]]
  }
  return new_obj
}

/**
 * Common geometry field names.
 * 
 * @property {string[]} wkt - Field name for well-known text (WKT)
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
 * Get list of vector file extensions supported by GDAL.
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
 * Get list of GDAL driver names by file extension.
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
 * @param {string} file - Local or remote file path
 * @return {string} File extension
 */
exports.get_file_extension = (file) => {
  const matches = file.match(/\.([^\.\/\?\#]+)(?:$|\?|\#)/)
  if (matches) {
    return matches[1]
  }
}

/**
 * Common file extensions for vector datasets.
 *
 * @property {string[]} 1 - Primary format file extensions (take
 * precedence).
 * @property {string[]} 2 - Secondary format file extensions (only take
 * precedence if no primary extension present).
 */
exports.file_extensions = {
  1: ['geojson', 'topojson', 'shp', 'vrt', 'gml', 'kml'],
  2: ['csv', 'json']
}

/**
 * Regular expressions matching vector file extensions supported by GDAL.
 * @property {RegExp} any - Matches any supported file extension
 * @property {RegExp} primary - Matches primary formats
 * @property {RegExp} secondary - Matches secondary formats
 */
exports.gdal_patterns = {
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
 *  or undefined if the two SRS are equal.
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
  if (same) {
    return
  } else {
    return new gdal.CoordinateTransformation(source, target)
  }
}

/**
 * Build the GDAL polygon corresponding to a bounding box.
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
