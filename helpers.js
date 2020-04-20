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
function gdal_date_to_string(obj) {
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
function gdal_time_to_string(obj) {
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
function gdal_timezone_to_string(obj) {
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
function gdal_datetime_to_string(obj) {
  if (!obj) return
  const date = gdal_date_to_string(obj)
  const time = gdal_time_to_string(obj)
  const timezone = gdal_timezone_to_string(obj)
  return `${date}T${time}${timezone}`
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
function map_object(obj, crosswalk, keep = false, prefix = '_') {
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
 * Common names for geometry fields.
 * 
 * @property {string[]} wkt - Field name for well-known text (WKT)
 * @property {string[]} x - Field names for x (longitude, easting)
 * @property {string[]} y - Field names for y (latitude, northing)
 */
const geometry_fields = {
  wkt: [
    'geom', 'the_geom', 'wkb_geometry', 'shape', 'geo_shape', 'geometrie'
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
function guess_geometry_fields(layer) {
  var geometry = {}
  const names = layer.fields.getNames()
  Object.keys(geometry_fields).forEach(key => {
    geometry[key] = names.filter(x =>
      geometry_fields[key].includes(x.toLowerCase()))
  })
  return geometry
}

/**
 * Write VRT (OGR Virtual Format) for feature layer.
 *
 * Relevant only for tabular data with feature geometry in fields.
 * Writes the file to the path of the layer with '.vrt' added.
 *
 * See https://gdal.org/drivers/vector/vrt.html
 * 
 * @param {gdal.Layer} layer - Feature layer
 * @param {object} options
 * @param {string} options.srs - Spatial reference system in any format
 *  supported by OGRSpatialReference.SetFromUserInput()
 * @param {object} options.geometry - Fields with feature geometry.
 *  If not provided, attempts to guess from field names.
 * @param {string} options.geometry.wkt - Field with WKT (takes precedence)
 * @param {string} options.geometry.x - Field with x (longitude, easting)
 * @param {string} options.geometry.y - Field with y (latitude, northing)
 * @return {string} Path to VRT file.
 */
function write_vrt(layer, options = {}) {
  // Determine SRS
  var srs = options.srs
  if (!srs) {
    srs = layer.srs
  }
  // Determine geometry fields
  var geometry = options.geometry
  if (!geometry) {
    matches = guess_geometry_fields(layer)
    if (matches.wkt.length) {
      geometry = { wkt: matches.wkt[0] }
    } else if (matches.x.length && matches.y.length) {
      geometry = { x: matches.x[0], y: matches.y[0] }
    } else {
      throw new Error(
        `Failed to guess geometry fields: ${util.inspect(matches)}`)
    }
  }
  // Build <GeometryField> attributes
  var attributes
  if (geometry.wkt && typeof geometry.wkt === 'string') {
    attributes = `encoding="WKT" field="${geometry.wkt}"`
  } else if (
    geometry.x && typeof geometry.x === 'string' &&
    geometry.y && typeof geometry.y === 'string') {
    attributes = `encoding="PointFromColumns" x="${geometry.x}" y="${geometry.y}"`
  } else {
    throw new Error(`Invalid geometry: ${util.inspect(geometry)}`)
  }
  // Build VRT
  var layer_path = layer.ds.description
  const basename = path.parse(layer_path).base
  const vrt =
    `<OGRVRTDataSource>
       <OGRVRTLayer name="${layer.name}">
           <SrcDataSource relativeToVRT="1">${basename}</SrcDataSource>
           <GeometryType>wkbPoint</GeometryType>
           <LayerSRS>${options.srs}</LayerSRS>
           <GeometryField ${attributes} reportSrcColumn="FALSE"/>
       </OGRVRTLayer>
     </OGRVRTDataSource>`
  // Write VRT
  const vrt_path = `${layer_path}.vrt`
  fs.writeFileSync(vrt_path, vrt)
  return vrt_path
}

/**
 * Get list of vector file extensions supported by GDAL.
 * @return {string[]} File extensions
 */
function get_gdal_extensions() {
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
 * Regular expressions matching vector file extensions supported by GDAL.
 * @property {RegExp} any - Matches any supported file extension
 * @property {RegExp} primary - Matches primary formats
 * @property {RegExp} secondary - Matches secondary formats
 */
const gdal_patterns = {
  any: new RegExp(`\\.(${get_gdal_extensions().join('|')})$`, 'i'),
  primary: /\.(geojson|topojson|shp|vrt|gml|kml)$/i,
  secondary: /\.(csv|json)$/i
}

/**
 * Download file.
 * @param {string} url Remote path to download
 * @param {string} file Local path to write
 */
async function download_file(url, file) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, await download(url));
}

/**
 * Unpack compressed or archive file to a directory.
 * @param {string} file Path of file to unpack
 * @param {string} dir Target directory
 * @param {string} format Compression or archive file format
 */
function unpack_file(file, dir, format = 'zip') {
  fs.mkdirSync(dir, { recursive: true })
  switch (format) {
    case 'zip':
      fs.createReadStream(file).pipe(unzipper.Extract({ path: dir }))
      break
    default:
      throw `Format ${format} not supported`
  }
}

/**
 * Get the transformation between two spatial reference systems (SRS).
 * 
 * @param {string|gdal.SpatialReference} source - Source SRS
 * @param {string|gdal.SpatialReference} target - Target SRS
 * @return {gdal.CoordinateTransformation|undefined} Coordinate transformation,
 *  or undefined if the two SRS are equal.
 */
function get_srs_transform(source, target) {
  if (typeof source === 'string') {
    source = gdal.SpatialReference.fromUserInput(source)
  }
  if (typeof target === 'string') {
    target = gdal.SpatialReference.fromUserInput(target)
  }
  // NOTE: Only sure way to test for equality is to test the transformation
  const same = source.isSame(target) ||
    source.toProj4() === target.toProj4() ||
    (source.isSameGeogCS(target) && (source.isProjected() == target.isProjected()))
  if (same) {
    return
  } else {
    return new gdal.CoordinateTransformation(source, target)
  }
}

module.exports = {
  gdal_date_to_string,
  gdal_time_to_string,
  gdal_datetime_to_string,
  gdal_string_formatters: {
    [gdal.OFTDate]: gdal_date_to_string,
    [gdal.OFTTime]: gdal_time_to_string,
    [gdal.OFTDateTime]: gdal_datetime_to_string
  },
  map_object,
  guess_geometry_fields,
  write_vrt,
  gdal_patterns,
  download_file,
  unpack_file,
  get_srs_transform
}
