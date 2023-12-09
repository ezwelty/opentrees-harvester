/**
 * Describe a source dataset.
 *
 * @module
 */

const fs = require('fs')
const path = require('path')
const util = require('util')
const colors = require('colors')
const glob = require('glob')
const gdal = require('gdal-async')
const { table } = require('table')
const helpers = require('./helpers')
const archive = require('./archive')
const workflow = require('./workflow')
const LICENSES = require('./licenses')

/**
 * Archived file checksum.
 *
 * @typedef {object} Link
 * @property {string} checksum - File checksum (base-64 md5 hash).
 */

/**
 * Properties used by {@link Source} for data processing.
 *
 * @typedef {object} SourceProperties
 * @property {string} id - Identifier prepended to console output.
 * @property {string|string[]|object|object[]} download - Links to the
 * data file(s) as one or more:
 * - string: Plain URL to download
 * - { checksum: 'checksum'} : Archive file checksum
 * - { arcgis: 'url' } : ArcGIS Feature Layer downloaded with paginated requests
 * - { manual: 'url' } : File to download manually
 * @property {string} vfs - GDAL virtual file system type (`/vsizip/`).
 * @property {string} filename - Relative path to the file to open with GDAL
 * within an archive file.
 * @property {string} layer - Layer name to open with GDAL within a file. Only
 * relevant for files with multiple layers.
 * @property {function} openFunc - Function that takes a file path (or array)
 * and returns a GDAL dataset. If provided, takes precedence over `vfs` and
 * `filename`.
 * @property {object} geometry - Geometry field names for formats without
 * explicit geometries (e.g. CSV). If not provided, will
 * attempt to guess from field names.
 * @property {string} geometry.wkt - Name of field with well-known-text (wkt)
 * geometry. If provided, takes precedence over `x` and `y`.
 * @property {string} geometry.x - Name of field with x coordinate (longitude,
 * easting).
 * @property {string} geometry.y - Name of field with y coordinate (latitude,
 * northing).
 * @property {string} srs - Spatial reference system in any format supported by
 * [OGRSpatialReference.SetFromUserInput()](https://gdal.org/api/ogrspatialref.html#classOGRSpatialReference_1aec3c6a49533fe457ddc763d699ff8796).
 * @property {Object.<string, string|function>} crosswalk - Crosswalk mapping to
 * a target schema. For each `key: value` pair, `key` is the new field name and
 * `value` is either the old field name (e.g. `height: 'HEIGHT'`) or a function
 * that takes an object (of feature field values) and returns a value (e.g.
 * `height: x => x['HEIGHT'] / 100`).
 * @property {function} coordsFunc - Function that takes an object (of feature
 * field values before the crosswalk) and returns a number array of point
 * coordinates `[x, y]`. This is a useful alternative to `geometry` if the
 * coordinates need to be extracted from field values (e.g. `obj =>
 * obj.XY.split(';').map(Number)`).
 * @property {function} delFunc - Function that takes an object (of feature
 * field values before the crosswalk) and returns a value (e.g. `x =>
 * x['HEALTH'] === 'dead'`). The feature is excluded from the output if the
 * returned value evaluates to `true`.
 * @property {string|string[]|object|object[]} info - Links to webpages or files
 * as one or more:
 * - string: URL of webpage to save as MHTML
 * - { checksum: 'checksum'} : Archive file checksum
 * - { file: 'url' } : URL to download (as with `download`)
 * - { manual: 'url' } : URL to download manually
 * @property {object} license - Data license.
 * @property {string} license.id - License identifier (see `./lib/licenses.js`).
 * @property {string} license.name - License name. Only provide if `id` is not.
 * @property {string} license.url - License URL. Only provide if `id` is not.
 */

/**
 * Additional properties not used by {@link Source} but used elsewhere.
 *
 * @typedef {SourceProperties} SourcePropertiesExtended
 * @property {string} pending - Pending issues preventing processing.
 * @property {string} omit – Reason for omitting from processing.
 * @property {string} country - Country name in English (e.g. `Spain`).
 * @property {string} state - Local name of first-level administrative division
 * (see https://en.wikipedia.org/wiki/List_of_administrative_divisions_by_country)
 * with the exception of:
 * - Ireland: NUTS 3 Region (https://en.wikipedia.org/wiki/NUTS_statistical_regions_of_Ireland)
 * - Japan: Region (https://en.wikipedia.org/wiki/List_of_regions_of_Japan)
 * - Netherlands: Province (https://en.wikipedia.org/wiki/Provinces_of_the_Netherlands)
 * - New Zealand: Region (https://en.wikipedia.org/wiki/Regions_of_New_Zealand)
 * - United Kingdom (England): Region (https://en.wikipedia.org/wiki/Regions_of_England)
 * - United Kingdom (other): Country
 * @property {string} city - Local name of city or municipality.
 * @property {string} designation - Local name of `city` subset, administrative
 * unit, university, or other institution if not `country`, `state`, or `city`.
 * @property {string} language - Language of contents as an [ISO
 * 639-1](https://en.wikipedia.org/wiki/ISO_639-1) code (e.g. `en`) and an
 * optional [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)
 * region code (e.g. `en-AU`).
 * @property {string} primary - `id` of the primary source (for grouping sources
 * together).
 * @property {string} long - Full name of the government body, university, or
 * other institution (e.g. `City of Melbourne`).
 * @property {string} short - Short name (e.g. `Melbourne`).
 * @property {object} centre - Centre point (for map label placement).
 * @property {number} centre.lon - Longitude in decimal degrees (EPSG:4326).
 * @property {number} centre.lat - Latitude in decimal degrees (EPSG:4326).
 */

/**
 * Class representing a source dataset.
 *
 * @param {SourceProperties} props - Source properties.
 * @param {object} [options]
 * @param {boolean} [options.exit=true] - Whether to throw errors or print them
 * to the console.
 * @param {string} [options.srs=EPSG:4326] - Spatial reference system to
 * assume if none is defined in `props.srs` and none can be read from the input
 * files.
 */
class Source {

  constructor(props, {exit = true, srs = 'EPSG:4326' } = {}) {
    this.props = props
    this.options = { exit, srs }
    // Validate
    this.validate(true)
    // Cache
    this.__layer = null
    this.__vrt = null
  }

  /**
   * Validate source properties.
   *
   * @param {boolean} [error=false] - Whether to raise errors.
   * @returns {Array.<Array<string, *>>} Errors in the format [message, value].
   * @private
   */
  validate(error = false) {
    let errors = []
    const props = this.props
    // id
    if (props.id) {
      if (typeof props.id !== 'string') {
        errors.push(['Invalid id', props.id])
      }
    } else {
      errors.push(['Missing id'])
    }
    // download
    if (props.download) {
      const download = Array.isArray(props.download) ? props.download : [props.download]
      if (!download.every(link => typeof link === 'string' || (
        typeof link === 'object' &&
        Object.keys(link).length == 1 &&
        ['checksum', 'manual', 'arcgis'].includes(Object.keys(link)[0])
      ))) {
        errors.push(['Invalid download', props.download])
      }
    }
    // vfs
    if (props.vfs) {
      if (
        typeof props.vfs !== 'string' ||
        !['/vsizip/', '/vsigzip/', '/vsitar/'].includes(props.vfs)
      ) {
        errors.push(['Invalid vfs', props.vfs])
      }
    }
    // filename
    if (props.filename && typeof props.filename !== 'string') {
      errors.push(['Invalid filename', props.filename])
    }
    // openFunc
    if (props.openFunc && typeof props.openFunc !== 'function') {
      errors.push(['Invalid openFunc', props.openFunc])
    }
    // geometry
    if (props.geometry) {
      if (!(typeof (props.geometry) === 'object' &&
        (typeof (props.geometry.wkt) === 'string' ||
          (typeof (props.geometry.x) === 'string' &&
            typeof (props.geometry.y) === 'string')))) {
        errors.push(['Invalid geometry', props.geometry])
      }
    }
    // srs
    if (props.srs) {
      try {
        gdal.SpatialReference.fromUserInput(props.srs)
      } catch (err) {
        errors.push(['Invalid srs', props.srs])
      }
    }
    // coordsFunc
    if (props.coordsFunc && typeof props.coordsFunc !== 'function') {
      errors.push(['Invalid coordsFunc', props.coordsFunc])
    }
    // delFunc
    if (props.delFunc && typeof props.delFunc !== 'function') {
      errors.push(['Invalid delFunc', props.delFunc])
    }
    // crosswalk
    if (props.crosswalk) {
      Object.keys(props.crosswalk).forEach(key => {
        const value = props.crosswalk[key]
        if (!['string', 'function'].includes(typeof (value))) {
          errors.push([`Invalid type for crosswalk.${key}`, typeof value])
        }
      })
    }
    // info
    if (props.info) {
      const info = Array.isArray(props.info) ? props.info : [props.info]
      if (!info.every(link => typeof link === 'string' || (
        typeof link === 'object' &&
        Object.keys(link).length == 1 &&
        ['checksum', 'file', 'manual'].includes(Object.keys(link)[0])
      ))) {
        errors.push(['Invalid info', props.info])
      }
    }
    // license
    if (props.license) {
      if (typeof props.license !== 'object') {
        errors.push(['Invalid license', props.license])
      } else {
        if (props.license.id) {
          if (!LICENSES[props.license.id]) {
            errors.push(['Unknown license.id', props.license.id])
          }
          if (Object.keys(props.license).length > 1) {
            errors.push(['license.id is not the only property', props.license])
          }
        } else if (!props.license.name) {
          errors.push(['Missing license.id and license.name', props.license])
        }
      }
    }
    if (error && errors.length) {
      this.error('Validation failed:', errors)
    } else {
      return errors
    }
  }

  /**
   * Get source data files.
   *
   * See `this.props.download`.
   * Downloads and archives data or fetches it from the local archive.
   *
   * @param {object} [options]
   * @param {number} [options.maxDays] - Maximum age of existing result in days
   * that would prevent downloading again. Default is `null` (no limit).
   * @param {boolean} [options.download=true] - Whether to download files
   * if missing from the archive.
   * @returns {Promise<string[]>} Resolves to the paths of the downloaded local
   * files (if any).
   */
  async getData({maxDays, download = true} = {}) {
    const links = this.formatLinks(this.props.download, { type: 'data' })
    if (!links.length) {
      return []
    }
    return await Promise.all(
      links.map(async link => {
        let file
        // Retrieve local file from archive
        file = await this.retrieveFileFromArchive(
          { ...link, type: 'data', maxDays }
        )
        if (file) {
          return file
        }
        if (!download || ['checksum', 'manual'].includes(link.api)) {
          this.error('File not found in archive:', link)
        }
        // Download file
        try {
          file = await this.downloadFile({ ...link, type: 'data'})
        } catch (error) {
          this.error(`Download failed (${error.message}):`, link)
        }
        this.success(`Download complete (${file}):`, link)
        return file
      })
    )
  }

  /**
   * Get source metadata files.
   *
   * See `this.props.info`.
   * Downloads and archives metadata or fetches it from the local archive.
   *
   * @param {object} [options]
   * @param {number} [options.maxDays] - Maximum age of existing result in days
   * that would prevent downloading again. Default is `null` (no limit).
   * @param {'mhtml'|'html'|'png'|'pdf'} [options.format='mhtml'] - Format to
   * save weg pages as.
   * @param {boolean} [options.download=true] - Whether to download files
   * if missing from the archive.
   * @returns {Promise<string[]>} Resolves to the paths of the downloaded local
   * files (if any).
   */
  async getMetadata({maxDays, format = 'mhtml', download = true} = {}) {
    const links = this.formatLinks(this.props.info, { type: 'metadata' })
    if (this.props.license?.url) {
      links.push(this.formatLink(this.props.license.url, { type: 'metadata' }))
    }
    if (!links.length) {
      return []
    }
    return await Promise.all(
      links.map(async link => {
        let file
        // Retrieve local file from archive
        file = await this.retrieveFileFromArchive(
          { ...link, type: 'metadata', format, maxDays }
        )
        if (file) {
          return file
        }
        if (!download || ['checksum', 'manual'].includes(link.api)) {
          this.error('File not found in archive:', link)
        }
        // Download file
        try {
          file = await this.downloadFile({ ...link, format, type: 'metadata' })
        } catch (error) {
          this.error(`Download failed (${error.message}):`, link)
        }
        this.success(`Download complete (${file}):`, link)
        return file
      })
    )
  }

  /**
   * Format file link.
   *
   * @param {object|string} link - Link to file as either a string or an
   * object with a single key-value pair.
   * @param {object} [options]
   * @param {'data'|'metadata'} [options.type='data'] - Type of file being
   * linked to.
   * @returns {object} Link to file with `url` and `api` properties. Default api
   * for data is `file` and for metadata is `browser`.
   * @private
   */
  formatLink(link, { type = 'data' } = {}) {
    const defaultApi = type === 'data' ? 'file' : 'browser'
    if (typeof link === 'string') {
      return { url: link, api: defaultApi }
    }
    return { url: Object.values(link)[0], api: Object.keys(link)[0] }
  }

  /**
   * Format file links.
   *
   * @param {object|string|object[]|string[]} links - Links to files as either a
   * string or an object with a single key-value pair.
   * @param {object} [options]
   * @param {'data'|'metadata'} [params.type='data'] - Type of files being
   * linked to.
   * @returns {object[]} Links to files with `url` and `api` properties. Default
   * api for data is `file` and for metadata is `browser`.
   * @private
   */
  formatLinks(links, { type = 'data' } = {}) {
    if (!links) {
      return []
    }
    if (!Array.isArray(links)) {
      links = [links]
    }
    return links.map(link => this.formatLink(link, { type }))
  }

  /**
   * Retrieve file from archive.
   *
   * @param {object} params
   * @param {string} params.url - URL or checksum of file to retrieve.
   * @param {string} [params.api] - API used to download file from URL. If
   * `checksum`, `url` is expected to be a checksum.
   * @param {'data'|'metadata'} [params.type] - Type of file being retrieved.
   * @param {'mhtml'|'html'|'png'|'pdf'} [params.format] - File format. Relevant
   * only if `type` is `metadata`.
   * @param {number} [params.maxDays] - Maximum age in days to consider.
   * @returns {string} Path to file in archive or `null` if not found.
   * @private
   */
  async retrieveFileFromArchive({ url, api, type, format, maxDays } = {}) {
    let entries
    if (api === 'checksum') {
      entries = await archive.search({ checksum: url })
    } else {
      const filters = {
        url, ...type && {type}, ...format && api === 'browser' && {format}
      }
      entries = await archive.search(filters, { maxDays })
    }
    return entries?.[0]?.path || null
  }

  /**
   * Download file.
   *
   * @param {object} params
   * @param {string} params.url - URL of file to download.
   * @param {string} [params.api] - API used to download file from URL.
   * @param {'data'|'metadata'} [params.type] - Type of file being downloaded.
   * @param {'mhtml'|'html'|'png'|'pdf'} [params.format] - File format. Relevant
   * only if `type` is `metadata`.
   * @returns {string} Path to downloaded file.
   * @private
   */
  async downloadFile({ url, api, type, format } = {}) {
    let entry
    // HACK: Disable check of presence in archive since already checked
    const maxDays = 0
    if (api === 'arcgis') {
      entry = await workflow.downloadArcgisFeatureLayer({url, type, maxDays})
    } else if (api === 'browser') {
      entry = await workflow.downloadPage({url, format, maxDays})
    } else {
      entry = await workflow.downloadFile({url, type, maxDays})
    }
    return entry.path
  }

  /**
   * Process input and write to output.
   *
   * Reading, writing, and coordinate transformations are performed by
   * [GDAL](https://gdal.org) via the
   * [node-gdal-next](https://www.npmjs.com/package/gdal-next) bindings.
   *
   * Processing steps include a schema crosswalk (`this.props.crosswalk`),
   * skipping features by field values (`this.props.delFunc`), reducing complex
   * geometries to centroid points (`options.centroids`), and skipping features
   * outside a bounding box (`options.bounds`). For files without explicit
   * geometries, a temporary [VRT](https://gdal.org/drivers/vector/vrt.html)
   * file is created (see {@link Source#getVrt}).
   *
   * @param {string} file - Output file path.
   * @param {object} [options] - Output options.
   * @param {string} [options.driver] - Name of GDAL driver to use to write to
   * the output file (see https://gdal.org/drivers/vector). Guessed from file
   * extension if not provided.
   * @param {string[]|object} [options.creation] - Driver-specific dataset
   * creation options (see https://gdal.org/drivers/vector). Only default, for
   * 'CSV', is `['GEOMETRY=AS_WKT']` to include feature geometry in output.
   * @param {boolean} [options.overwrite=false] - Whether to proceed if `file`
   * already exists.
   * @param {string} [options.srs=+init=epsg:4326] - Output spatial reference
   * system in any format supported by
   * [OGRSpatialReference.SetFromUserInput()](https://gdal.org/api/ogrspatialref.html#classOGRSpatialReference_1aec3c6a49533fe457ddc763d699ff8796).
   * Use 'EPSG:*' for (latitude, longitude) and '+init=epsg:*' (PROJ<6 behavior)
   * for (longitude, latitude). If it is the same as the input SRS, axis order
   * will remain unchanged regardless.
   * @param {boolean} [options.centroids=false] - Whether to reduce non-point
   * geometries to centroids.
   * @param {boolean} [options.keepInvalid=false] - Whether to keep features
   * with empty or invalid geometries.
   * @param {boolean} [options.keepFields=false] - Whether to keep the input
   * feature fields alongside the result of the schema crosswalk
   * (`this.props.crosswalk`).
   * @param {boolean} [options.keepGeometryFields=false] - Whether to keep the
   * input feature geometry fields. Applies only to inputs for which a VRT file
   * is written (see {@link Source#getVrt}) and if `options.keepFields` is
   * also `true`.
   * @param {string} [options.prefix=] - String to append to input field names
   * to prevent collisions with output field names. Applies only if
   * `options.keepFields` is `true`.
   * @param {number[]} [options.bounds] - Bounding box in output SRS
   * (`options.srs`) in the format [xmin, ymin, xmax, ymax]. If provided,
   * features outside the bounds are skipped.
   * @param {function} [options.delFunc] - Function that takes an object (of
   * feature field values after the crosswalk) and returns a value (e.g. `obj =>
   * obj.description === 'vacant site'`). The feature is excluded from the
   * output if the returned value evaluates to `true`.
   * @param {boolean} [options.allowEmptyGeometry=false] - Whether to allow
   * feature layer with empty geometry.
   * @returns {boolean} Whether processed file (true) or skipped (false).
   */
  process(file, options = {}) {
    if (!options.overwrite && fs.existsSync(file)) {
      return false
    }
    options = {
      ...{
        driver: null,
        creation: null,
        overwrite: false,
        srs: '+init=epsg:4326',
        centroids: false,
        keepInvalid: false,
        keepFields: false,
        keepGeometryFields: false,
        prefix: '',
        bounds: null,
        delFunc: null,
        allowEmptyGeometry: false
      },
      ...options
    }
    if (!options.driver) {
      const extension = helpers.getFileExtension(file.toLowerCase())
      const drivers = helpers.getGdalDrivers()[extension]
      if (drivers && drivers.length == 1) {
        options.driver = drivers[0]
      } else {
        this.error(`Failed to guess driver for *.${extension}:`, drivers)
      }
    } else {
      options.driver = options.driver.toLowerCase()
    }
    if (!options.creation) {
      options.creation = ({
        csv: { GEOMETRY: 'AS_WKT' }
      })[options.driver]
    }
    options.srs = gdal.SpatialReference.fromUserInput(options.srs)
    // Read input
    let input = this.open()
    this.log(`Processing ${input.description}`)
    if (input.layers.count() > 1) {
      this.warn(`Using first of ${input.layers.count()} layers`)
    }
    let inputLayer = input.layers.get(0)
    if (!inputLayer.features.count()) {
      this.warn('Skipping: Layer has no features')
      return
    }
    let emptyGeometry = false
    if (!inputLayer.features.first().getGeometry() && !this.props.coordsFunc) {
      if (options.allowEmptyGeometry) {
        emptyGeometry = true
      } else {
        // Write (and then read) VRT file with geometry definition
        this.log('Writing and reading VRT file')
        input = this.openVrt(options.keepGeometryFields)
        inputLayer = input.layers.get(0)
      }
    }
    // Prepare input schema
    let inputSchema = inputLayer.fields.map(field => field)
    /*
     * NOTE: Confusing gdal bindings handling of date/time fields
     * - Fields detected as date/time are read as objects, not strings
     * - Cannot yet set date/time field with date/time object, only strings
     * (see https://github.com/naturalatlas/node-gdal/issues/144)
     * HACK:
     * - Set output date/time fields as string
     * - Convert input date/time fields to string
     */
    const stringCrosswalk = {}
    inputSchema = inputSchema.map(field => {
      const formatter = helpers.gdalStringFormatters[field.type]
      if (formatter) {
        stringCrosswalk[field.name] = x => formatter(x[field.name])
        field.type = gdal.OFTString
      }
      return field
    })
    // Prepare crosswalks
    const crosswalks = [
      {
        crosswalk: stringCrosswalk,
        keep: true,
        prefix: ''
      },
      {
        crosswalk: this.props.crosswalk,
        keep: options.keepFields,
        prefix: options.prefix
      }
    ]
    // Prepare output schema
    const outputSchema = []
    if (this.props.crosswalk) {
      for (const key in this.props.crosswalk) {
        // NOTE: Output as string to preserve malformed values
        outputSchema.push(new gdal.FieldDefn(key, gdal.OFTString))
      }
    }
    if (options.keepFields) {
      inputSchema.forEach(field => {
        field.name = `${options.prefix}${field.name}`
        outputSchema.push(field)
      })
    }
    // Prepare output
    const driver = gdal.drivers.get(options.driver)
    if (!driver) {
      this.error('Unrecognized GDAL driver:', options.driver)
    }
    fs.mkdirSync(path.dirname(file), { recursive: true })
    const output = driver.create(file, 0, 0, 0, gdal.GDT_Byte, options.creation)
    let outputType
    if (options.centroids || inputLayer.geomType == gdal.wkbNone) {
      outputType = gdal.wkbPoint
    } else {
      outputType = inputLayer.geomType
    }
    const outputLayer = output.layers.create(inputLayer.name, options.srs,
      outputType)
    outputLayer.fields.add(outputSchema)
    let transform
    if (!emptyGeometry) {
      const srs = this.getSrs(inputLayer)
      transform = helpers.getTransform(srs, options.srs)
      if (options.bounds) {
        if (transform && !helpers.isAxesXY(options.srs)) {
          // Swap x, y
          options.bounds = [
            options.bounds[1], options.bounds[0],
            options.bounds[3], options.bounds[2]
          ]
        }
        options.bounds = helpers.boundsToPolygon(options.bounds)
      }
    }
    // Populate output
    const counts = {
      invalidParsedCoordinates: 0,
      invalidGeometries: 0,
      emptyGeometries: 0,
      outOfBoundGeometries: 0
    }
    let inputFeature
    for (
      inputFeature = inputLayer.features.first();
      inputFeature;
      inputFeature = inputLayer.features.next()) {
      // Fields
      const inputFields = inputFeature.fields.toObject()
      if (this.props.delFunc && this.props.delFunc(inputFields)) {
        continue
      }
      const outputFeature = new gdal.Feature(outputLayer)
      const outputFields = helpers.mapObject(inputFields, crosswalks)
      if (options.delFunc && options.delFunc(outputFields)) {
        continue
      }
      outputFeature.fields.set(outputFields)
      // Geometry
      if (!emptyGeometry) {
        let inputGeometry
        if (this.props.coordsFunc) {
          const coords = this.props.coordsFunc(inputFields)
          if (Array.isArray(coords) && coords.length == 2) {
            inputGeometry = new gdal.Point(coords[0], coords[1])
            inputGeometry.srs = srs
          } else {
            counts.invalidParsedCoordinates++
            // this.warn(`Invalid parsed coordinates at ${inputFeature.fid}:`, coords)
            if (!options.keepInvalid) continue
          }
        } else {
          inputGeometry = inputFeature.getGeometry()
        }
        if (inputGeometry) {
          if (options.centroids && inputGeometry.wkbType != gdal.wkbPoint) {
            inputGeometry = inputGeometry.centroid()
          }
          let isValid = true
          let isPoint = inputGeometry.wkbType == gdal.wkbPoint
          if (transform) {
            try {
              inputGeometry.transform(transform)
            } catch (error) {
              isValid = false
            }
          } else {
            isValid = inputGeometry.isValid()
            if (isPoint) {
              isValid = isValid && inputGeometry.x && inputGeometry.y &&
                isFinite(inputGeometry.x) && isFinite(inputGeometry.y)
            }
          }
          if (!isValid) {
            counts.invalidGeometries++
            // const msg = `Invalid ${inputGeometry.name} at ${inputFeature.fid}`
            // if (isPoint) {
            //   this.warn(msg, (({ x, y }) => ({ x, y }))(inputGeometry))
            // } else {
            //   this.warn(msg)
            // }
            if (!options.keepInvalid) continue
          }
          if (options.bounds && isValid) {
            if (!inputGeometry.within(options.bounds)) {
              counts.outOfBoundGeometries++
              // this.warn(`Out of bounds ${inputGeometry.name} at ${inputFeature.fid}`)
              continue
            }
          }
          outputFeature.setGeometry(inputGeometry)
        } else {
          counts.emptyGeometries++
          // this.warn(`Empty geometry at ${inputFeature.fid}`)
          if (!options.keepInvalid) continue
        }
      }
      // TODO: flush after each n features
      outputLayer.features.add(outputFeature)
    }
    // Print warnings
    const nonZeroCounts = Object.fromEntries(
      Object.entries(counts).filter(([_, v]) => v > 0)
    )
    if (Object.keys(nonZeroCounts).length) {
      this.warn('Warnings (by number of features):', nonZeroCounts)
    }
    // Write
    output.close()
    this.success('Wrote output:', file)
    return true
  }

  /**
   * Get layer field names and GDAL data types.
   * @returns {object} Field names (keys) and GDAL data types (values)
   */
  getFields() {
    const layer = this.open()
    const fields = {}
    layer.fields.forEach(field => {
      fields[field.name] = field.type
    })
    return fields
  }

  /**
   * Get feature fields.
   * @param {integer} [n=Infinity] - Maximum number of features to read.
   * @returns {object[]}
   */
  getRows(n = Infinity) {
    const rows = []
    const layer = this.open()
    let f
    let i = 0
    for (f = layer.features.first(); f && i < n; f = layer.features.next()) {
      rows.push(f.fields.toObject())
      i++
    }
    return rows
  }

  /**
   * Sample field values from input.
   *
   * @param {object} [options]
   * @param {number} [options.n=1000] - Maximum number of features to sample.
   * @param {number} [options.max=100] - Maximum number of values to collect for each
   * field.
   * @param {boolean} [options.sort=true] - Whether to sort values.
   * @param {boolean} [options.unique=true] - Whether to only save unique values.
   * @returns {object.<string, Array>} Object of field values with field names as keys.
   */
  sample(options = {}) {
    options = {
      n: 1000,
      max: 100,
      sort: true,
      unique: true,
      ...options
    }
    const types = this.getFields()
    const values = {}
    for (const key in types) {
      values[key] = options.unique ? new Set() : []
    }
    const layer = this.open()
    let f
    let i = 1
    for (f = layer.features.first();
      f && i <= options.n; f = layer.features.next()) {
      for (let [key, value] of Object.entries(f.fields.toObject())) {
        const formatter = helpers.gdalStringFormatters[types[key]]
        value = formatter ? formatter(value) : value
        if ((options.unique ? values[key].size : values[key].length) < options.max) {
          if (options.unique) {
            values[key].add(value)
          } else {
            values[key].push(value)
          }
        }
      }
      i++
    }
    // Convert sets to arrays
    for (const key in values) {
      if (options.unique) {
        values[key] = [...values[key]]
      }
      if (options.sort) {
        values[key].sort()
      }
    }
    return values
  }

  /**
   * Print table of input field names, types, and unique values.
   *
   * @param {object} [options] - Options to pass to {@link Source#sample}, plus:
   * @param {object.<string, Array>} [options.sample] - Result of
   * {@link Source#sample}.
   * @param {number} [options.truncate=1280] - Maximum number of characters to
   * print per field.
   * @param {number[]} [options.widths=[20, 10, 130]] - Column widths for field
   * names, types, and unique values, respectively.
   * @param {string} [options.sep= · ] - Separator between unique values.
   */
  glimpse(options = {}) {
    options = {
      truncate: 1280,
      widths: [20, 10, 130],
      sep: ' · ',
      ...options
    }
    if (!options.sample) {
      options.sample = this.sample(options)
    }
    const tableOptions = {
      columnDefault: {
        wrapWord: true,
        truncate: options.truncate
      },
      columns: {
        0: { width: options.widths[0] },
        1: { width: options.widths[1] },
        2: { width: options.widths[2] }
      }
    }
    const types = this.getFields()
    // Print
    const data = [
      ['name'.bold, 'type'.bold, 'values'.bold],
      ...Object.keys(options.sample).map(key =>
        [key, types[key], options.sample[key].join(options.sep)])
    ]
    console.log(table(data, tableOptions))
  }

  /**
   * Empty and remove the source directory.
   */
  empty() {
    fs.rmdirSync(this.dir, { recursive: true })
  }

  /**
   * Check whether the source directory is missing or empty of files.
   *
   * Checks any child directories recursively and ignores dotfiles (.*).
   *
   * @returns {boolean} Whether source directory is empty.
   */
  isEmpty() {
    const files = glob.sync('**/*',
      { nocase: true, nodir: true, dot: false, cwd: this.dir })
    return files.length == 0
  }

  /**
   * Find path to input file.
   *
   * Searches for all non-dotfiles in the source directory recursively and
   * attempts to guess which file to pass to GDAL based on file extensions.
   * Throws an error if no file is found or if multiple candidate files are
   * found.
   *
   * @returns {string} File path.
   */
  find() {
    let paths
    if (this.props.filename) {
      paths = glob.sync(this.props.filename, { nodir: true, cwd: this.dir })
    } else {
      paths = glob.sync(`**/*`,
        { nocase: true, nodir: true, dot: false, cwd: this.dir })
    }
    if (!this.props.filename) {
      if (paths.length) {
        const primaries = paths.filter(s =>
          s.match(helpers.gdalFilePatterns.primary))
        const secondaries = paths.filter(s =>
          s.match(helpers.gdalFilePatterns.secondary))
        if (primaries.length) {
          paths = primaries
        } else if (secondaries.length) {
          paths = secondaries
        } else {
          this.warn('Found files with exotic or missing extensions:', paths)
        }
      }
    }
    if (paths.length) {
      if (paths.length == 1) {
        return path.join(this.dir, paths[0])
      } else {
        this.error(`Found ${paths.length} possible inputs:`, paths)
      }
    } else {
      this.error('No inputs found')
    }
  }

  /**
   * Open data file(s) with GDAL.
   *
   * If the dataset has a single layer, the layer is returned. Otherwise, and
   * `props.layer` or `props.openFunc` is not provided, an error is thrown.
   *
   * @returns {Promise<gdal.Layer>} See the documentation for
   * [node-gdal-async](https://mmomtchev.github.io/node-gdal-async).
   * Result is cached until closed with {@link Source#close}.
   */
  async open() {
    // Clear if already destroyed
    try {
      this.__layer.ds
    } catch {
      this.__layer = null
    }
    if (this.__layer) {
      return this.__layer
    }
    const files = await this.getData({ download: false })
    let file
    if (!files.length) {
      this.error('No input files found')
    }
    if (files.length == 1) {
      file = files[0]
    } else if (!this.props.openFunc) {
      this.error('Opening multiple files requires openFunc:', files)
    }
    if (!this.props.openFunc) {
      if (this.props.vfs) {
        file = path.join(this.props.vfs, file)
      }
      if (this.props.filename) {
        file = path.join(file, this.props.filename)
      }
      if (this.props.driver) {
        file = `${this.props.driver}:${file}`
      }
    }
    let opened
    try {
      opened = this.props.openFunc ?
        (await this.props.openFunc(file || files)) :
        gdal.open(file, 'r')
    } catch (error) {
      this.error(`Failed to open with GDAL (${error.message}):`, file || files)
    }
    if (opened.constructor.name === 'Dataset') {
      const layerNames = opened.layers.map(layer => layer.name)
      if (this.props.layer) {
        if (!layerNames.includes(this.props.layer)) {
          this.error(`Layer not found (${this.props.layer}):`, layerNames)
        }
        this.__layer = opened.layers.get(this.props.layer)
      } else if (layerNames.length > 1) {
        this.error(`Multiple layers found:`, layerNames)
      } else {
        this.__layer = opened.layers.get(0)
      }
    } else {
      this.__layer = opened
    }
    return this.__layer
  }

  /**
   * Close input file if open with GDAL.
   */
  close() {
    try {
      this.__layer.ds.close()
    } catch {
    } finally {
      this.__layer = null
    }
  }

  /**
   * Open input file with GDAL via a VRT file.
   *
   * Opens the input file via a virtual format (VRT) file written to the dotfile
   * `.vrt`. The contents of the file is built by {@link Source#getVrt}.
   *
   * @param {boolean} [keepGeometryFields=false] - Whether the VRT file should
   * return geometry fields as regular feature fields.
   * @returns {gdal.Dataset} See the documentation for
   * [node-gdal-next](https://contra.io/node-gdal-next/classes/gdal.Dataset.html).
   * The result is cached until closed with {@link Source#closeVrt}.
   */
  openVrt(keepGeometryFields = false) {
    // Clear if already destroyed
    try {
      // Choice of property is arbitrary
      this.__vrt.description
    } catch {
      this.__vrt = null
    }
    if (!this.__vrt) {
      // HACK: Writes to local dotfile to hide from find()
      const vrtPath = path.join(this.dir, '.vrt')
      fs.writeFileSync(vrtPath, this.getVrt(keepGeometryFields))
      this.__vrt = gdal.open(vrtPath)
    }
    return this.__vrt
  }

  /**
   * Close input file if open with GDAL via a VRT file.
   */
  closeVrt() {
    try {
      this.__vrt.close()
    } catch {
    } finally {
      this.__vrt = null
    }
  }

  /**
   * Get spatial reference system (SRS) of input as a string.
   *
   * @param {gdal.Layer} [layer] - Feature layer from which to read SRS. If not
   * provided, defaults to the first layer of the input file (see @link
   * Source#open).
   * @returns {string} Either the provided SRS (`this.props.srs`), the SRS read
   * from the input file (as well-known-text), or the default SRS
   * (`this.options.srs`).
   */
  getSrsString(layer) {
    let srs = this.props.srs
    if (!srs) {
      if (!layer) {
        layer = this.open()
      }
      if (layer.srs) {
        srs = layer.srs.toWKT()
      }
    }
    if (!srs) {
      srs = this.options.srs
      this.warn('Assuming default SRS:', srs)
    }
    return srs
  }

  /**
   * Get spatial reference system (SRS) of input.
   *
   * @param {gdal.Layer} [layer] - Feature layer from which to read SRS. If not
   * provided, defaults to the first layer of the input file (see @link
   * Source#open).
   * @returns {gdal.SpatialReference} SRS object initialized by
   * `gdal.SpatialReference.fromUserInput()` from the result of
   * {@link Source#getSrsString}. See the documentation for
   * [node-gdal-next](https://contra.io/node-gdal-next/classes/gdal.SpatialReference.html#method-fromUserInput).
   */
  getSrs(layer) {
    const srs = this.getSrsString(layer)
    return gdal.SpatialReference.fromUserInput(srs)
  }

  /**
   * Get geometry field name(s) of input.
   *
   * @returns {{?wkt: string, ?x: string, ?y: string}|undefined} Names of
   * geometry fields either provided (`this.props.srs`) or guessed from field
   * names, or `undefined` if the input already has explicit geometries.
   */
  getGeometry() {
    let geometry = this.props.geometry
    if (!geometry) {
      geometry = {}
      const layer = this.open()
      if (layer.geomType != gdal.wkbNone) {
        return
      }
      const matches = helpers.guessGeometryFields(layer)
      // Prioritize geographic (vs projected) coordinate fields
      if (matches.lon.length) matches.x = matches.lon
      if (matches.lat.length) matches.y = matches.lat
      if (matches.wkt.length) {
        if (matches.wkt.length > 1) {
          this.warn('Using first of matching WKT fields:', matches.wkt)
        }
        geometry = { wkt: matches.wkt[0] }
      } else if (matches.x.length && matches.y.length) {
        if (matches.x.length > 1) {
          this.warn('Using first of matching X fields:', matches.x)
        }
        if (matches.y.length > 1) {
          this.warn('Using first of matching Y fields:', matches.y)
        }
        geometry = { x: matches.x[0], y: matches.y[0] }
      } else {
        this.error('Failed to guess geometry fields:', matches)
      }
    }
    return geometry
  }

  /**
  * Get VRT (OGR Virtual Format) file content.
  *
  * For files without explicit geometries (e.g. tabular text files), a temporary
  * [VRT file](https://gdal.org/drivers/vector/vrt.html) can be created listing
  * the spatial reference system (see {@link Source#getSrsString}) and
  * geometry field names (see {@link Source#getGeometry}) for GDAL to use.
  *
  * @param {boolean} [keepGeometryFields=false] - Whether VRT file should
  * return geometry fields as regular feature fields.
  * @returns {string} VRT file content.
  */
  getVrt(keepGeometryFields = false) {
    const srs = this.getSrsString()
    const geometry = this.getGeometry()
    // Build <GeometryField> attributes
    let attributes
    if (geometry.wkt && typeof geometry.wkt === 'string') {
      attributes = `encoding="WKT" field="${geometry.wkt}"`
    } else if (
      geometry.x && typeof geometry.x === 'string' &&
      geometry.y && typeof geometry.y === 'string') {
      attributes =
        `encoding="PointFromColumns" x="${geometry.x}" y="${geometry.y}"`
    } else {
      this.error('Invalid geometry:', geometry)
    }
    // Build VRT
    const layer = this.open()
    const layerPath = path.resolve(layer.ds.description)
    return (
      `<OGRVRTDataSource>
        <OGRVRTLayer name="${layer.name}">
          <SrcDataSource relativeToVRT="0">${layerPath}</SrcDataSource>
          <GeometryType>wkbPoint</GeometryType>
          <LayerSRS>${srs}</LayerSRS>
          <GeometryField ${attributes} reportSrcColumn="${keepGeometryFields}" />
        </OGRVRTLayer>
      </OGRVRTDataSource>`.replace(/^[ ]{6}/gm, ''))
  }

  /**
   * Print success message to console (green).
   *
   * @param {string} msg - Message prepended with green tag (`[props.id]`).
   * @param {...*} objects - Additional objects passed to `console.log()`.
   */
  success(msg, ...objects) {
    const tag = `[${this.props.id}]`.green
    console.log(`${tag} ${msg}`, ...objects)
  }

  /**
   * Print message to console (cyan).
   *
   * @param {string} msg - Message prepended with cyan tag (`[props.id]`).
   * @param {...*} objects - Additional objects passed to `console.log()`.
   */
  log(msg, ...objects) {
    const tag = `[${this.props.id}]`.cyan
    console.log(`${tag} ${msg}`, ...objects)
  }

  /**
   * Print warning to console (yellow).
   *
   * @param {string} msg - Message prepended with yellow tag (`[props.id]`).
   * @param {...*} objects - Additional objects passed to `console.log()`.
   */
  warn(msg, ...objects) {
    const tag = `[${this.props.id}]`.yellow
    console.log(`${tag} ${msg}`, ...objects)
  }

  /**
   * Throw or print error to console (red).
   *
   * @param {string} msg - Message prepended with red tag (`[props.id]`).
   * @param {...*} objects - Additional objects passed directly to
   * `console.error()` or appended to error via `util.inspect()`.
   */
  error(msg, ...objects) {
    const tag = colors.red(`[${this.props.id}]`)
    if (this.options.exit) {
      throw new Error(`${tag} ${msg} ${objects.map(util.inspect).join(' ')}`)
    } else {
      console.error(`${tag} ${msg}`, ...objects)
    }
  }
}

module.exports = Source
