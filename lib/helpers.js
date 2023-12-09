/**
 * Helper functions.
 *
 * @module
 * @private
 */

const gdal = require('gdal-async')
const fs = require('fs')
const { DownloaderHelper } = require('node-downloader-helper')
const csv = require('csv-parser')
const arcgis = require('@esri/arcgis-rest-feature-service')
const path = require('path')
const crypto = require('crypto')
const XLSX = require('xlsx')
const AdmZip = require('adm-zip')
const xpath = require('xpath')
const xmldom = require('xmldom')

/**
 * Common geometry field names.
 *
 * @property {string[]} wkt - Field names for well-known-text (WKT)
 * @property {string[]} lon - Field names for longitude
 * @property {string[]} lat - Field names for latitude
 * @property {string[]} x - Field names for x (longitude, easting)
 * @property {string[]} y - Field names for y (latitude, northing)
 */
const GEOMETRY_FIELDS = {
  wkt: [
    'geom', 'the_geom', 'wkb_geometry', 'shape', 'geo_shape', 'geometrie',
    'geometry'
  ],
  lon: [
    'longitude', 'lon', 'lng', 'long', 'x_long', 'coord long'
  ],
  lat: [
    'latitude', 'lat', 'y_lat', 'coord lat'
  ],
  x: [
    'x', 'x_koordina', 'x-koordinate', 'x_coord', 'coordenada x', 'xcoord',
    'easting', 'east', 'e', 'point_x'
  ],
  y: [
    'y', 'y_koordina', 'y-koordinate', 'y_coord', 'coordenada y', 'ycoord',
    'northing', 'north', 'n', 'point_y'
  ]
}

/**
 * Common file extensions for vector datasets.
 *
 * @property {string[]} 1 - Primary file extensions (take precedence)
 * @property {string[]} 2 - Secondary file extensions
 */
const FILE_EXTENSIONS = {
  1: ['geojson', 'geojsonl', 'topojson', 'shp', 'vrt', 'gml', 'kml'],
  2: ['csv', 'json']
}

/**
 * Regular expressions matching vector file extensions supported by GDAL.
 *
 * @property {RegExp} any - Matches any supported file extension
 * @property {RegExp} primary - Matches primary file extensions
 * @property {RegExp} secondary - Matches secondary file extensions
 */
const gdalFilePatterns = {
  any: new RegExp(`\\.(${getGdalExtensions().join('|')})$`, 'i'),
  primary: new RegExp(`\\.(${FILE_EXTENSIONS[1].join('|')})$`, 'i'),
  secondary: new RegExp(`\\.(${FILE_EXTENSIONS[2].join('|')})$`, 'i')
}

/**
 * String formatters by GDAL field type.
 */
const gdalStringFormatters = {
  [gdal.OFTDate]: dateToString,
  [gdal.OFTTime]: timeToString,
  [gdal.OFTDateTime]: datetimeToString
}

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
 * @returns {string} ISO 8601 date
 */
function dateToString(obj) {
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
 * @returns {string} ISO 8601 time
 */
function timeToString(obj) {
  if (!obj) return ''
  const hh = (obj.hour || 0).toString().padStart(2, '0')
  const mm = (obj.minute || 0).toString().padStart(2, '0')
  const ssms = (obj.second || 0).toString().split('.')
  const ss = ssms[0].padStart(2, '0')
  const ms = ssms[1] ? `.${ssms[1]}` : ''
  return `${hh}:${mm}:${ss}${ms}`
}

/**
 * Format a GDAL timezone flag as a string.
 *
 * Formats a GDAL timezone flag as `''` (unknown), `Z` (UTC), or `[+-]hh:mm`.
 * See https://en.wikipedia.org/wiki/ISO_8601.
 *
 * @param {integer} [timezone=0] - GDAL timezone flag
 * @returns {string} ISO 8601 timezone
 */
function gdalTimezoneToString(timezone = 0) {
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
 * @param {integer} [obj.timezone=0] - Timezone flag
 * @param {boolean} [truncate=false] - Whether to return only date when hour,
 * minute, and second are all zero.
 * @param {boolean} [gdalTimezone=true] - Whether `obj.timezone` is a GDAL
 * timezone flag (see {@link gdalTimezoneToString}) or already formatted as
 * an ISO 8601 timezone.
 * @returns {string} ISO 8601 datetime
 */
function datetimeToString(obj, truncate = false, gdalTimezone = true) {
  if (!obj) return ''
  const date = dateToString(obj)
  if (truncate && !(obj.hour || obj.minute || obj.second)) {
    return date
  }
  const time = timeToString(obj)
  let timezone
  if (gdalTimezone) {
    timezone = gdalTimezoneToString(obj.timezone)
  } else {
    timezone = obj.timezone || ''
  }
  return `${date}T${time}${timezone}`
}

/**
 * Reformat a datetime string as an ISO 8601 string.
 *
 * Reformats a datetime string as `YYYY-MM-DDThh:mm:ss.*` and the appropriate
 * timezone. See https://en.wikipedia.org/wiki/ISO_8601.
 *
 * @param {string} x - Datetime string
 * @param {RegExp[]} patterns - Regular expressions with capture groups
 * with names from the following list: `year`, `month`, `day`, `hour`, `minute`,
 * `second`, `timezone`. Returns result from first matching pattern.
 * @returns {string} ISO 8601 datetime
 */
function reformatDatetime(x, patterns) {
  // Skip if already parsed to object by gdal
  if (!x || typeof x === 'object') return x
  x = x.trim()
  for (const pattern of patterns) {
    const matches = x.match(pattern)
    if (matches) {
      return datetimeToString(
        matches.groups, truncate = true, gdalTimezone = false)
    }
  }
  console.warn('Failed to parse datetime:', x)
  return x
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
 * @returns {object} Mapped object
 */
function mapObject(obj, mapping) {
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
 * Guess feature layer geometry fields based on their name.
 *
 * @param {gdal.Layer} layer - Feature layer
 * @returns {object[]} Names of fields with potential WKT geometry (wkt),
 * geographic coordinates (lon, lat), or geographic or projected coordinates (x,
 * y).
 */
function guessGeometryFields(layer) {
  const geometry = {}
  const names = layer.fields.getNames()
  Object.keys(GEOMETRY_FIELDS).forEach(key => {
    geometry[key] = names.filter(x =>
      GEOMETRY_FIELDS[key].includes(x.toLowerCase()))
  })
  return geometry
}

/**
 * Get the list of vector file extensions supported by GDAL.
 *
 * @returns {string[]} File extensions
 */
function getGdalExtensions() {
  const extensions = []
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
 * @returns {object} GDAL driver names by file extension
 */
function getGdalDrivers() {
  const drivers = {}
  getGdalExtensions().forEach(extension => drivers[extension] = [])
  gdal.drivers.forEach(driver => {
    const meta = driver.getMetadata()
    if (meta.DCAP_VECTOR === 'YES') {
      const extensions = []
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
 * @returns {string} File extension
 */
function getFileExtension(file) {
  const matches = file.match(/\.([^\.\/\?\#]+)(?:$|\?|\#)/)
  return matches ? matches[1] : ''
}

/**
 * Get the transformation between two spatial reference systems (SRS).
 *
 * @param {string|gdal.SpatialReference} source - Source SRS
 * @param {string|gdal.SpatialReference} target - Target SRS
 * @returns {gdal.CoordinateTransformation|undefined} Coordinate transformation,
 * or undefined if the two SRS are equal.
 */
function getTransform(source, target) {
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
function boundsToPolygon(bounds, srs) {
  if (typeof srs === 'string') {
    srs = gdal.SpatialReference.fromUserInput(srs)
  }
  const polygon = new gdal.Polygon()
  const ring = new gdal.LinearRing()
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
function isAxesXY(srs) {
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

/**
 * Download a remote file to a directory.
 *
 * @param {string} url - Path to the remote file.
 * @param {string} dir - Local directory to download the file to.
 * @param {object} options - Downloader Helper constructor options (see
 * https://github.com/hgouveia/node-downloader-helper#options.
 * @param {object} listeners - Downloader Helper event listeners (see
 * https://github.com/hgouveia/node-downloader-helper#events).
 * @returns {Promise<string>} Resolves to the path of the downloaded file.
 */
async function downloadFile(url, dir, options = {}, listeners = {}) {
  fs.mkdirSync(dir, { recursive: true })
  const downloader = new DownloaderHelper(url, dir, options)
  let failure
  listeners = {
    download: info => console.log(`Downloading ${info.fileName}`),
    end: info => console.log(
      `Downloaded ${info.fileName} (${(info.downloadedSize / 1e6).toFixed()} MB)`
    ),
    error: error => console.error(`Download failed for ${url}: ${error.message}`),
    ...listeners
  }
  for (const key in listeners) {
    if (key != 'error') {
      downloader.on(key, listeners[key])
    }
  }
  downloader.on('error', error => {
    const attempt = downloader.__retryCount + 1
    const attempts = options.retry ? options.retry.maxRetries + 1 : 1
    if (attempt === attempts) {
      failure = error
    }
  })
  try {
    await downloader.start()
  } catch (error) {
    failure = error
  }
  if (failure) {
    listeners.error(failure)
  } else {
    return downloader.getDownloadPath()
  }
}

/**
 * Read a CSV file.
 *
 * Uses `csv-parser`, which is faster than GDAL.
 *
 * @param {string} file - Path to file.
 * @param {object} options - Parse options
 * (https://www.npmjs.com/package/csv-parser#options).
 * @returns {Promise<object[]>}
 */
function readCSV(file, options) {
  return new Promise((resolve, reject) => {
    const rows = []
    fs.createReadStream(file).
      pipe(csv(options)).
      on('data', (row) => {
        rows.push(row)
      }).
      on('end', () => {
        console.log(`${file} successfully parsed`)
        resolve(rows)
      }).
      on('error', reject)
  })
}

/**
 * Write a CSV file.
 *
 * Converts values to string and wraps strings containing commas in quotes.
 * Objects need not contain the same properties, nor in the same order.
 *
 * @param {object[]} objects – Objects to write to a CSV file.
 * @param {string} [file=null] – Path to file.
 * @returns {string|null} CSV as a string (if `file` is `null`).
 * @example
 * objects = [ { x: 1 }, { y: 2 }, { x: 3, y: 3, z: 'foo,bar' } ]
 * writeCSV(objects)
 * // 'x,y,z\n1,,\n,2,\n3,3,"foo,bar"'
 */
function writeCSV(objects, file = null) {
  const columnSet = new Set()
  // Load unique column names
  objects.forEach(obj => {
    Object.keys(obj).forEach(columnSet.add, columnSet)
  })
  const columns = [...columnSet]
  // Generate header
  const header = columns.map(x => {
    return (typeof (x) === 'string' && x.includes(',')) ? `"${x}"` : String(x)
  }).join(',')
  // Generate rows
  const rows = objects.map(obj => {
    return columns.map(key => {
      const x = obj[key]
      if (obj[key]) {
        return (typeof (x) === 'string' && x.includes(',')) ? `"${x}"` : String(x)
      }
      return ''
    }).join(',')
  })
  // Combine
  const txt = [header, ...rows].join('\n')
  if (file) {
    fs.mkdirSync(path.dirname(file), { recursive: true })
    fs.writeFileSync(file, [header, ...rows].join('\n'))
  } else {
    return txt
  }
}

/**
 * Convert string to sentence case.
 *
 * Capitalizes the first character and converts the rest to lower case.
 *
 * @param {string} s
 * @returns {string}
 * @example
 * toSentenceCase('') // ''
 * toSentenceCase('m') // 'M'
 * toSentenceCase('malus') // 'Malus'
 * toSentenceCase('malus pumila') // 'Malus pumila'
 */
function toSentenceCase(s) {
  return s.slice(0, 1).toUpperCase() + s.slice(1).toLowerCase()
}

/**
 * Convert string to title case.
 *
 * Capitalizes the first character of every word and converts the rest to lower case.
 *
 * @param {*} s
 * @example
 * toTitleCase('') // ''
 * toTitleCase('m') // 'M'
 * toTitleCase('malus') // 'Malus'
 * toTitleCase('GOLDEN DELICIOUS') // 'Golden Delicious'
 */
function toTitleCase(s) {
  return s.replace(
    /(\w)(\w*)/g,
    (_, firstChar, remainder) => firstChar.toUpperCase() + remainder.toLowerCase()
  )
}

const ASCII = {
  A: 'AⒶＡÀÁÂẦẤẪẨÃĀĂẰẮẴẲȦǠÄǞẢÅǺǍȀȂẠẬẶḀĄȺⱯ',
  AA: 'Ꜳ',
  AE: 'ÆǼǢ',
  AO: 'Ꜵ',
  AU: 'Ꜷ',
  AV: 'ꜸꜺ',
  AY: 'Ꜽ',
  B: 'BⒷＢḂḄḆɃƂƁ',
  C: 'CⒸＣĆĈĊČÇḈƇȻ',
  D: 'DⒹＤḊĎḌḐḒḎĐƋƊƉ',
  DZ: 'ǱǄ',
  Dz: 'ǲǅ',
  E: 'EⒺＥÈÉÊỀẾỄỂẼĒḔḖĔĖËẺĚȄȆẸỆȨḜĘḘḚƐƎ',
  F: 'FⒻＦḞƑ',
  G: 'GⒼＧǴĜḠĞĠǦĢǤƓꞠ',
  H: 'HⒽＨĤḢḦȞḤḨḪĦⱧ',
  I: 'IⒾＩÌÍÎĨĪĬİÏḮỈǏȈȊỊĮḬƗ',
  J: 'JⒿＪĴ',
  K: 'KⓀＫḰǨḲĶḴƘⱩꝀꝂꝄꞢ',
  L: 'LⓁＬĿĹĽḶḸĻḼḺŁȽⱢⱠꝈ',
  LJ: 'Ǉ',
  Lj: 'ǈ',
  M: 'MⓂＭḾṀṂƜ',
  N: 'NⓃＮǸŃÑṄŇṆŅṊṈȠƝꞐꞤ',
  NJ: 'Ǌ',
  Nj: 'ǋ',
  O: 'OⓄＯÒÓÔỒỐỖỔÕṌȬṎŌṐṒŎȮȰÖȪỎŐǑȌȎƠỜỚỠỞỢỌỘǪǬØǾƆƟꝊꝌ',
  OE: 'Œ',
  OI: 'Ƣ',
  OO: 'Ꝏ',
  OU: 'Ȣ',
  P: 'PⓅＰṔṖƤⱣꝐꝒꝔ',
  Q: 'QⓆＱꝖꝘ',
  R: 'RⓇＲŔṘŘȐȒṚṜŖṞɌⱤꝚꞦ',
  S: 'SⓈＳẞŚṤŜṠŠṦṢṨȘŞⱾꞨ',
  T: 'TⓉＴṪŤṬȚŢṰṮŦƬƮȾ',
  TZ: 'Ꜩ',
  U: 'UⓊＵÙÚÛŨṸŪṺŬÜǛǗǕǙỦŮŰǓȔȖƯỪỨỮỬỰỤṲŲṶṴɄ',
  V: 'VⓋＶṼṾƲꝞɅ',
  VY: 'Ꝡ',
  W: 'WⓌＷẀẂŴẆẄẈⱲ',
  X: 'XⓍＸẊẌ',
  Y: 'YⓎＹỲÝŶỸȲẎŸỶỴƳɎỾ',
  Z: 'ZⓏＺŹẐŻŽẒẔƵȤⱿⱫꝢ',
  a: 'aⓐａẚàáâầấẫẩãāăằắẵẳȧǡäǟảåǻǎȁȃạậặḁąⱥɐꜳ',
  ae: 'æǽǣ',
  ao: 'ꜵ',
  au: 'ꜷ',
  av: 'ꜹꜻ',
  ay: 'ꜽ',
  b: 'bⓑｂḃḅḇƀƃɓ',
  c: 'cⓒｃćĉċčçḉƈȼ',
  d: 'dⓓｄḋďḍḑḓḏđƌɖɗꝺð',
  dz: 'ǳǆ',
  e: 'eⓔｅèéêềếễểẽēḕḗĕėëẻěȅȇẹệȩḝęḙḛɇɛǝ',
  f: 'fⓕｆḟƒ',
  g: 'gⓖｇǵĝḡğġǧģǥɠꞡᵹ',
  h: 'hⓗｈĥḣḧȟḥḩḫẖħⱨɥ',
  hv: 'ƕ',
  i: 'iⓘｉìíîĩīĭïḯỉǐȉȋịįḭɨı',
  j: 'jⓙｊĵǰɉ',
  k: 'kⓚｋḱǩḳķḵƙⱪꝁꝃꝅꞣ',
  l: 'lⓛｌŀĺľḷḹļḽḻłƚɫ',
  lj: 'ǉ',
  m: 'mⓜｍḿṁṃɱɯᶆ',
  n: 'nⓝｎǹńñṅňṇņṋṉƞɲŉꞑꞥ',
  nj: 'ǌ',
  o: 'oⓞｏòóôồốỗổõṍȭṏōṑṓŏȯȱöȫỏőǒȍȏơờớỡởợọộǫǭøǿɔꝋꝍɵ',
  oe: 'œ',
  oi: 'ƣ',
  ou: 'ȣ',
  oo: 'ꝏ',
  p: 'pⓟｐṕṗƥᵽꝑꝓꝕ',
  q: 'qⓠｑɋꝗꝙ',
  r: 'rⓡｒŕṙřȑȓṛṝŗṟɍɽ',
  s: 'sⓢｓśṥŝṡšṧṣṩșşȿꞩẛſß',
  t: 'tⓣｔṫẗťṭțţṱṯŧƭʈⱦ',
  tz: 'ꜩ',
  u: 'uⓤｕùúûũṹūṻŭüǜǘǖǚủůűǔȕȗưừứữửựụṳųṷṵʉ',
  v: 'vⓥｖṽṿʋꝟʌ',
  w: 'wⓦｗẁẃŵẇẅẘẉⱳ',
  x: 'xⓧẋẍxᶍｘ',
  y: 'yⓨｙỳýŷỹȳẏÿỷẙỵƴɏỿ',
  z: 'zⓩｚźẑżžẓẕƶȥɀⱬ'
}

const ASCII_MAP = {}
for (const key in ASCII) {
  for (const letter of ASCII[key]) {
    ASCII_MAP[letter] = key
  }
}

/**
 * Latinize a string.
 *
 * Converts accents (diacritics, etc) to latin characters.
 *
 * @param {string} s - String.
 * @param {string} keep - Characters to preserve.
 * @returns {string}
 * @example
 * latinize('Leœptura') // 'Leoeptura'
 * latinize('Ærenea') // 'AErenea'
 * latinize('Fallén') // 'Fallen'
 * latinize('Choriozopella') // 'Choriozopella'
 * latinize('trägårdhi') // 'tragardhi'
 * latinize('rosa-sinensis') // 'rosa-sinensis'
 * latinize('ỆᶍǍᶆṔƚÉ áéíóúýčďěňřšťžů') // 'ExAmPlE aeiouycdenrstzu'
 */
function latinize(s, keep = 'ｘ') {
  return s.replace(/[^\u0000-\u007E]/g, x => keep.includes(x) ? x : ASCII_MAP[x] || x)
}

/**
 * Interpolate string as template with values from object.
 *
 * @param {string} x - String to interpolate
 * @param {object} obj - Object with properties to use for interpolation
 * @example
 * interpolateString('data/${id}/${id}/input', {id: 'melbourne'})
 * interpolateString('data/${ids}/input', {id: 'melbourne'})
 */
function interpolateString(x, obj) {
  let ix = x
  let match
  while ((match = ix.match(/\$\{([^\}]*)\}/))) {
    ix = ix.replace(match[0], obj[match[1]])
  }
  return ix
}

/**
 * Convert string to lowercase and remove whitespace.
 *
 * @param {string} x - String to reduce
 * @example
 * reduceString('United Kingdom')
 */
function reduceString(x) {
  return x.toLowerCase().replace(/\s/, '')
}

/**
 * Pause code execution.
 *
 * @param {number} ms - Number of milliseconds to pause.
 * @returns {Promise}
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Get features from ArcGIS Feature Server layer.
 *
 * Features are queried as EPSG:4326 EsriJSON sorted by object ID.
 *
 * @see https://developers.arcgis.com/rest/services-reference/query-feature-service-layer-.htm
 *
 * @param {string} url - URL of ArcGIS Feature Server layer.
 * @returns {Promise<object>} Layer features.
 */
async function getLayerFeatures(url) {
  // Get layer metadata
  const layer = await arcgis.getLayer({url: url, f: 'json'})
  // Verify that layer can be queried
  const capabilities = layer.capabilities.toLowerCase().split(/,\s?/)
  if (!capabilities.includes('query')) {
    throw new Error('Layer does not support queries')
  }
  const queryFormats = layer.supportedQueryFormats.toLowerCase().split(/,\s?/)
  if (!queryFormats.includes('json')) {
    throw new Error('Layer does not support JSON queries')
  }
  // Whether layer supports pagination
  const pagination = layer.advancedQueryCapabilities?.supportsPagination === true
  // Whether layer supports 'standard' result type
  const standard = (
    layer.advancedQueryCapabilities?.supportsQueryWithResultType === true &&
    layer.standardMaxRecordCount > layer.maxRecordCount
  )
  // Cap record count to a reasonable maximum
  const count = Math.min(
    (standard ? layer.standardMaxRecordCount : layer.maxRecordCount), 20000
  )
  // Order by object ID field
  let orderByField = layer.objectIdField
  if (!orderByField) {
    for (const field of layer.fields) {
      if (field.type.toLowerCase() === 'esrifieldtypeoid') {
        orderByField = field.name
        break
      }
    }
  }
  if (!orderByField) {
    throw new Error('Layer does not have an object ID field')
  }
  // Get layer features
  let exceededTransferLimit = true
  let offset = 0
  let result
  while (exceededTransferLimit) {
    console.log(`Downloading features (${url}): ${offset} – ...`)
    const response = await arcgis.queryFeatures({
      // HACK: For servers requring a where clause
      where: '1=1',
      url: url,
      f: 'json',
      outFields: '*',
      orderByFields: orderByField,
      outSR: { wkid: 4326 },
      resultType: standard ? 'standard' : 'none',
      ...(pagination ? {resultOffset: offset, resultRecordCount: count} : {}),
    })
    if (result) {
      result.features.push(...response.features)
    } else {
      result = response
    }
    exceededTransferLimit = (
      response.exceededTransferLimit === true ||
      response.properties?.exceededTransferLimit === true
    )
    if (exceededTransferLimit) {
      if (pagination) {
        offset += response.features.length
        await sleep(2000)
      } else {
        throw new Error('Layer transfer limit exceeded')
      }
    }
  }
  return result
}

/**
 * Write values as newline-delimited JSON.
 *
 * References:
 * - https://www.interline.io/blog/geojsonl-extracts
 * - https://jsonlines.org
 * - https://stevage.github.io/ndgeojson
 *
 * @param {Array} values Values to independently write as JSON.
 * @param {string} [file=null] Path to file.
 * @returns {string|null} JSON Lines as a string (if `file` is `null`).
 * @example
 * values = [ 1, ['b'], { x: null } ]
 * writeJSONL(values) // '1\n["b"]\n{"x":null}'
 */
function writeJSONL(values, file = null) {
  const txt = values.map(JSON.stringify).join('\n')
  if (file) {
    fs.mkdirSync(path.dirname(file), { recursive: true })
    fs.writeFileSync(file, txt)
  } else {
    return txt
  }
}

/**
 * Read JSON lines file line by line.
 *
 * @param {string} file - Path to file.
 * @yields {object}
 */
async function* iterateJSONL(file) {
  const readInterface = readline.createInterface({
    input: fs.createReadStream(file),
  })
  for await (const line of readInterface) {
    if (line.trim() === '') {
      continue
    }
    try {
      yield JSON.parse(line)
    } catch (error) {
      console.error(`Error parsing as JSON: '${line}'\n${error.message}`)
    }
  }
}

/**
 * Read file from ZIP archive.
 *
 * @param {string} zipfile - Path to zip file.
 * @param {string} file - Path to file inside zip file.
 * @returns {Buffer}
 */
function readFileInZip(zipfile, file) {
  const zip = new AdmZip(zipfile)
  return zip.readFile(file)
}

/**
 * Open Excel-compatible file with GDAL.
 *
 * Uses `xlsx` because bundled GDAL (gdal-async) does not support
 * XLS, XLSX, and CSV with custom separator.
 *
 * @param {Buffer|string} data – File data.
 * @param {object} options
 * @param {string} [options.type] – File type (buffer, file).
 * @param {integer} [options.sheet=0] – Sheet index or name.
 * @returns {gdal.Dataset}
 */
function openExcelWithGdal(data, {type, sheet = 0} = {}) {
  const book = XLSX.read(data, {type, sheets: sheet})
  const txt = XLSX.utils.sheet_to_csv(book.Sheets[book.SheetNames[sheet]])
  const buffer = Buffer.from(txt)
  const name = crypto.randomBytes(6).toString('hex')
  gdal.vsimem.set(buffer, `/vsimem/${name}.csv`)
  return gdal.open(`/vsimem/${name}.csv`)
}

/**
 * Read all files in a RAR archive to GDAL VSIMEM.
 *
 * @param {string} rarfile - Path to RAR file.
 * @returns {string[]} Paths to files in GDAL VSIMEM.
 */
async function readFilesInRarToVsimem(file) {
  // HACK: Import unrar here to prevent it from making program exit on error
  const unrar = require('node-unrar-js')
  const buffer = Uint8Array.from(fs.readFileSync(file)).buffer
  const extractor = await unrar.createExtractorFromData({data: buffer})
  const extracted = extractor.extract()
  const rarFiles = [...extracted.files]
  const vsiFiles = []
  for (const rarFile of rarFiles) {
    if (rarFile.extraction) {
      const vsiFile = path.join('/vsimem/', file, rarFile.fileHeader.name)
      gdal.vsimem.set(Buffer.from(rarFile.extraction), vsiFile)
      vsiFiles.push(vsiFile)
    }
  }
  return vsiFiles
}

/**
 * Open files in GDAL as a single layer (using VRT union).
 *
 * @param {string[]} files - Paths to files.
 * @returns {gdal.Dataset}
 */
function openFileUnionWithGdal(files) {
  let vrt = '<OGRVRTDataSource><OGRVRTUnionLayer name="union">'
  for (const file of files) {
    vrt += `<OGRVRTLayer name="${path.parse(file).name}">
      <SrcDataSource>${file}</SrcDataSource>
    </OGRVRTLayer>`
  }
  vrt += '</OGRVRTUnionLayer></OGRVRTDataSource>'
  const name = crypto.randomBytes(6).toString('hex')
  gdal.vsimem.set(Buffer.from(vrt, 'utf8'), `/vsimem/${name}.vrt`)
  return gdal.open(`/vsimem/${name}.vrt`)
}

/**
 * Open a KISSB XML file with GDAL.
 *
 * See https://www.carneios.de/kissb/pdf/Spezifikation_Katasteraustauschformat.pdf
 * Fields with objects as values are flattened using dot notation.
 *
 * @param {string|Buffer} file - Path to file or buffer.
 * @param {object} params
 * @param {string} [params.type=file] - File type (file, buffer).
 * @returns {gdal.Dataset}
 */
function openKissbXmlWithGdal(file, {type = 'file'} = {}) {
  // Read from file or buffer
  let xml
  if (type === 'buffer') {
    xml = file.toString('utf8')
  } else {
    xml = fs.readFileSync(file, 'utf8')
  }
  const parser = new xmldom.DOMParser()
  const tree = parser.parseFromString(xml)
  // Extract field (property) names by id
  const fieldNames = {}
  const properties = xpath.select(
    "//*[name()='configuration']//*[name()='property']",
    tree
  )
  properties.forEach(property => {
    const id = xpath.select("*[name()='id']", property)?.[0].firstChild.data
    const name = xpath.select("*[name()='name']", property)?.[0].firstChild.data
    if (id && name) {
      fieldNames[id] = name
    }
  })
  // Extract features (protocols)
  const protocols = xpath.select("//*[name()='data']/*[name()='protocol']", tree)
  const features = protocols.map(protocol => {
    const fields = xpath.select("*/*", protocol)
    const feature = {}
    for (const field of fields) {
      const fieldName = fieldNames[field.nodeName]
      const children = field.childNodes
      if (children.length === 0) {
        // Empty: <field/>
        continue
      } else if (children.length === 1) {
        // Text value: <field>Berlin</field>
        const value = children[0].data
        if (value) {
          feature[fieldName] = value
        }
      } else {
        // Children: <field><genus>Salix</genus><type>alba</type></field>
        for (const child of Object.values(children)) {
          const name = child.nodeName
          if (name !== '#text') {
            const value = child.firstChild?.data
            if (value) {
              feature[`${fieldName}.${name}`] = value
            }
          }
        }
      }
    }
    return feature
  })
  // HACK: Write features as CSV and open with GDAL
  const txt = writeCSV(features)
  const name = crypto.randomBytes(6).toString('hex')
  gdal.vsimem.set(Buffer.from(txt, 'utf8'), `/vsimem/${name}.csv`)
  return gdal.open(`/vsimem/${name}.csv`)
}

/**
 * Read ESRI Feature Collection to GDAL VSIMEM as ESRIJSON.
 *
 * @param {string} file - Path to file.
 * @param {object} params
 * @param {string} [params.layerName] - Layer name.
 * @returns {string} Path to VSIMEM file.
 */
function readEsriFeatureCollectionToVsimem(file, {layerName} = {}) {
  const data = JSON.parse(fs.readFileSync(file, 'utf8'))
  let layerNames
  let layers
  // Find layers
  if (data.operationalLayers) {
    layers = data.operationalLayers
    layerNames = data.operationalLayers.map(x => x.id)
  } else if (data.layers) {
    layers = data.layers
    layerNames = layers.map(x => x.layerDefinition?.name)
  } else {
    throw new Error('No layers or operationalLayers property')
  }
  // Select layer
  let layerIndex
  if (layers.length == 0) {
    throw new Error('Empty (operational)layers property')
  }
  if (layers.length == 1) {
    layerIndex = 0
  } else {
    if (!layerName) {
      throw new Error(`Multiple layers found: ${layerNames}`)
    }
    if (!layerNames.includes(layerName)) {
      throw new Error(`Layer '${layerName}' not found in ${layerNames}`)
    }
    layerIndex = layerNames.indexOf(layerName)
  }
  // Load layer
  let layer
  if (data.operationalLayers) {
    layers = data.operationalLayers[layerIndex].featureCollection?.layers
    if (!layers) {
      throw new Error('No layers found inside operational layer')
    }
    if (layers.length > 1) {
      layerNames = layers.map(x => x.layerDefinition?.name)
      throw new Error(`Multiple layers inside operational layer: ${layerNames}`)
    }
    layer = layers[0]
  } else {
    layer = data.layers[layerIndex]
  }
  // Verify layer
  if (!layer.featureSet?.features) {
    throw new Error('No features found')
  }
  if (!layer.layerDefinition) {
    throw new Error('No layer definition found')
  }
  const esrijson = {
    objectIdFieldName: layer.layerDefinition.objectIdField,
    geometryType: layer.layerDefinition.geometryType || layer.featureSet.geometryType,
    spatialReference: layer.layerDefinition.spatialReference,
    fields: layer.layerDefinition.fields,
    features: layer.featureSet.features,
  }
  // HACK: Write features as ESRIJSON
  const txt = JSON.stringify(esrijson)
  const name = crypto.randomBytes(6).toString('hex')
  const vsimem = `/vsimem/${name}.json`
  gdal.vsimem.set(Buffer.from(txt, 'utf8'), vsimem)
  return vsimem
}

/**
 * Open ESRI Feature Collection with GDAL.
 *
 * @param {string} file - Path to file.
 * @param {object} params
 * @param {string} [params.layerName] - Layer name.
 * @returns {gdal.Dataset}
 */
function openEsriFeatureCollectionWithGdal(file, {layerName} = {}) {
  vsimem = readEsriFeatureCollectionToVsimem(file, {layerName})
  return gdal.open(`ESRIJSON:${vsimem}`)
}

/**
 * Parse decimal degrees from degrees, minutes, seconds.
 *
 * @param {string} dms - Degrees, minutes, seconds.
 * @param {RegExp} pattern - Regular expression with named capture groups deg,
 * min, sec.
 * @returns {number} Decimal degrees.
 */
function parseDecimalFromDMS(dms, pattern) {
  const match = dms.match(pattern)
  if (!match) {
    console.warn(`Failed to parse DMS: ${dms}`)
    return null
  }
  return (
    Number(match.groups.deg) +
    Number(match.groups.min) / 60 +
    Number(match.groups.sec) / 3600
  )
}

module.exports = {
  gdalFilePatterns,
  gdalStringFormatters,
  reformatDatetime,
  mapObject,
  guessGeometryFields,
  getGdalDrivers,
  getFileExtension,
  getTransform,
  boundsToPolygon,
  isAxesXY,
  downloadFile,
  readCSV,
  writeCSV,
  toSentenceCase,
  toTitleCase,
  latinize,
  interpolateString,
  reduceString,
  getLayerFeatures,
  writeJSONL,
  iterateJSONL,
  readFileInZip,
  openExcelWithGdal,
  readFilesInRarToVsimem,
  openFileUnionWithGdal,
  openKissbXmlWithGdal,
  readEsriFeatureCollectionToVsimem,
  openEsriFeatureCollectionWithGdal,
  parseDecimalFromDMS
}
