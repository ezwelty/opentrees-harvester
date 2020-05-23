const fs = require('fs')
const path = require('path')
const util = require('util')
const exec = util.promisify(require('child_process').exec)
const colors = require('colors')
const glob = require('glob')
const gdal = require('gdal-next')
const { DownloaderHelper } = require('node-downloader-helper')
const decompress = require('decompress')
const { table } = require('table')
const helpers = require('./helpers')

/**
 * Properties used by {@link Source} for data processing.
 *
 * @typedef {object} SourceProperties
 * @property {string} id - Identifier prepended to console output.
 * @property {string|string[]} download - Path to remote files to download and
 * unpack.
 * @property {string|string[]} execute - Shell commands executed from working
 * directory (`Source.dir`) after file download and unpack. In `npm run`
 * commands, prepend the `INIT_CWD` variable to paths to the files
 * (https://docs.npmjs.com/cli/run-script).
 * @property {string} filename - Glob pattern (relative to working directory)
 * used to find the file to read. Only needed when there are multiple files and
 * either none or multiple have extensions recognized by GDAL.
 * @property {string} srs - Spatial reference system in any format supported by
 * [OGRSpatialReference.SetFromUserInput()](https://gdal.org/api/ogrspatialref.html#classOGRSpatialReference_1aec3c6a49533fe457ddc763d699ff8796).
 * @property {object} geometry - Geometry field names for formats without
 * explicit geometries (e.g. tabular text files like CSV). If not provided, will
 * attempt to guess from field names.
 * @property {string} geometry.wkt - Name of field with well-known-text (wkt)
 * geometry. If provided, takes precedence over x, y.
 * @property {string} geometry.x - Name of field with x coordinate (longitude,
 * easting).
 * @property {string} geometry.y - Name of field with y coordinate (latitude,
 * northing).
 * @property {Object.<string, string|function>} crosswalk - Crosswalk mapping to
 * a target schema. For each `key: value` pair, `key` is the new field name and
 * `value` is either the old field name (e.g. `height: 'HEIGHT'`) or a function
 * that takes an object (of feature field values) and returns a value (e.g.
 * `height: obj => obj.HEIGHT / 100`).
 * @property {function} delFunc - Function that takes an object (of feature
 * field values before the crosswalk) and returns a value (e.g. `obj =>
 * obj.HEALTH === 'dead'`). The feature is excluded from the output if the
 * returned value evaluates to `true`.
 * @property {function} coordsFunc - Function that takes an object (of feature
 * field values before the crosswalk) and returns a number array of point
 * coordinates `[x, y]`. This is a useful alternative to `geometry` if the
 * coordinates need to be extracted from field values (e.g. `obj =>
 * obj.XY.split(';').map(Number)`).
 */

/**
 * Additional properties not used by {@link Source} but used downstream.
 *
 * @typedef {SourceProperties} SourcePropertiesExtended
 * @property {string} pending - Pending issues preventing processing.
 * @property {string} primary - `id` of the primary source (for grouping sources
 * together).
 * @property {string} long - Full name of the government body, university, or
 * other institution (e.g. `City of Melbourne`).
 * @property {string} short - Short name (e.g. `Melbourne`).
 * @property {string} country - Country name in English (e.g. `Australia`).
 * @property {object} centre - Centre point (for map label placement).
 * @property {number} centre.lon - Longitude in decimal degrees (EPSG:4326).
 * @property {number} centre.lat - Latitude in decimal degrees (EPSG:4326).
 * @property {string} info - Path to page with more information.
 * @property {string} language - Language of contents as an [ISO
 * 639-1](https://en.wikipedia.org/wiki/ISO_639-1) code (e.g. `en`) and an
 * optional [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)
 * region code (e.g. `en-AU`).
 * @property {object} license - Data license.
 * @property {string} license.id - License identifier from the Software Package
 * Data Exchange (SPDX) [license list](https://spdx.org/licenses/) (e.g.
 * `CC-BY-4.0`).
 * @property {string} license.name - License name (e.g. `Creative Commons
 * Attribution 4.0 International`).
 * @property {string} license.url - Path to page with license text (e.g.
 * `https://creativecommons.org/licenses/by/4.0`).
 */

/**
 * Class representing a source dataset.
 *
 * @param {SourceProperties} props - Source properties.
 * @param {string} dir - Local directory to which remote files are downloaded
 * and where local files are searched for.
 * @param {object} [options]
 * @param {boolean} [options.exit=true] - Whether to throw errors or print them
 * to the console.
 * @param {string} [options.srs=EPSG:4326] - Spatial reference system to
 * assume if none is defined in `props.srs` and none can be read from the input
 * files.
 */
class Source {

  constructor(props, dir, options = {}) {
    this.props = props
    this.dir = dir
    this.options = {
      ...{
        exit: true,
        srs: 'EPSG:4326'
      },
      ...options
    }
    // Validate
    this.validate(true)
    // Cache
    this.__dataset = null
    this.__vrt = null
  }

  /**
   * Validate source properties.
   * 
   * @param {boolean} [error=false] - Whether to raise errors.
   * @return {Array.<Array<string, *>>} Errors in the format [message, value].
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
      if (!(typeof props.download === 'string' ||
        (Array.isArray(props.download) && typeof props.download[0] === 'string'))) {
        errors.push(['Invalid download', props.download])
      }
    }
    // execute
    if (props.execute) {
      if (!(typeof props.execute === 'string' ||
        (Array.isArray(props.execute) && typeof props.execute[0] === 'string'))) {
        errors.push(['Invalid execute', props.execute])
      }
    }
    // filename
    if (props.filename && typeof props.filename !== 'string') {
      errors.push(['Invalid filename', props.filename])
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
    if (error && errors.length) {
      this.error('Validation failed:', errors)
    } else {
      return errors
    }
  }

  /**
   * Prepare remote source data for processing.
   *
   * Downloads remote files (`this.props.download`), unpacks compressed or
   * archive files, and executes shell commands (`this.props.execute`).
   *
   * @param {boolean} [overwrite=false] - Whether to proceed if working
   * directory is not empty (see {@link Source#isEmpty}).
   * @return {Promise<string[]>} Resolves to the paths of the downloaded and
   * unpacked local files (if any).
   */
  async get(overwrite = false) {
    try {
      const paths = await this.getFiles(overwrite)
      if (paths.length) {
        await this.execute()
        this.success('Ready to process')
      }
      return paths
    } catch (error) {
      throw error
    }
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
   * @return {boolean} Whether processed file (true) or skipped (false).
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
        delFunc: null
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
    if (!inputLayer.features.first().getGeometry() && !this.props.coordsFunc) {
      // Write (and then read) VRT file with geometry definition
      this.log('Writing and reading VRT file')
      input = this.openVrt(options.keepGeometryFields)
      inputLayer = input.layers.get(0)
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
    const srs = this.getSrs(inputLayer)
    const transform = helpers.getTransform(srs, options.srs)
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
    // Populate output
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
      let inputGeometry
      if (this.props.coordsFunc) {
        const coords = this.props.coordsFunc(inputFields)
        if (Array.isArray(coords) && coords.length == 2) {
          inputGeometry = new gdal.Point(coords[0], coords[1])
          inputGeometry.srs = srs
        } else {
          this.warn(
            `Invalid parsed coordinates at ${inputFeature.fid}:`, coords)
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
          const msg = `Invalid ${inputGeometry.name} at ${inputFeature.fid}`
          if (isPoint) {
            this.warn(msg, (({ x, y }) => ({ x, y }))(inputGeometry))
          } else {
            this.warn(msg)
          }
          if (!options.keepInvalid) continue
        }
        if (options.bounds && isValid) {
          if (!inputGeometry.within(options.bounds)) {
            this.warn(`Out of bounds ${inputGeometry.name} at ${inputFeature.fid}`)
            continue
          }
        }
        outputFeature.setGeometry(inputGeometry)
      } else {
        this.warn(`Empty geometry at ${inputFeature.fid}`)
        if (!options.keepInvalid) continue
      }
      // TODO: flush after each n features
      outputLayer.features.add(outputFeature)
    }
    // Write
    output.close()
    this.success('Wrote output:', file)
    return true
  }

  /**
   * Get layer field names and GDAL data types.
   * @return {object} Field names (keys) and GDAL data types (values)
   */
  getFields() {
    const layer = this.open().layers.get(0)
    const fields = {}
    layer.fields.forEach(field => {
      fields[field.name] = field.type
    })
    return fields
  }

  /**
   * Sample unique field values from input.
   *
   * @param {object} [options]
   * @param {number} [options.n=1000] - Maximum number of features to sample.
   * @param {number} [options.max=100] - Maximum number of unique values to
   * collect for each field.
   * @param {boolean} [options.sort=true] - Whether to sort values.
   * @return {object.<string, Array>} Object of unique field values with field
   * names as keys.
   */
  sample(options = {}) {
    options = {
      n: 1000,
      max: 100,
      sort: true,
      ...options
    }
    const types = this.getFields()
    const values = {}
    for (const key in types) {
      values[key] = new Set()
    }
    const layer = this.open().layers.get(0)
    let f
    let i = 1
    for (f = layer.features.first();
      f && i <= options.n; f = layer.features.next()) {
      for (let [key, value] of Object.entries(f.fields.toObject())) {
        const formatter = helpers.gdalStringFormatters[types[key]]
        value = formatter ? formatter(value) : value
        if (values[key].size < options.max) {
          values[key].add(value)
        }
      }
      i++
    }
    // Convert sets to arrays
    for (const key in values) {
      values[key] = [...values[key]]
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
   * @return {boolean} Whether source directory is empty.
   */
  isEmpty() {
    const files = glob.sync('**/*',
      { nocase: true, nodir: true, dot: false, cwd: this.dir })
    return files.length == 0
  }

  /**
   * Download a remote file to the source directory.
   *
   * @param {string} url - Path to the remote file.
   * @return {Promise<string>} Resolves to the path of the downloaded file.
   */
  async downloadFile(url) {
    // Ensure that target directory exists
    fs.mkdirSync(this.dir, { recursive: true })
    const options = { override: true, retry: { maxRetries: 1, delay: 3000 } }
    const downloader = new DownloaderHelper(url, this.dir, options)
    let failure
    downloader.
      on('download', info => this.log(`Downloading ${info.fileName}`)).
      on('end', info => this.success(
        `Downloaded ${info.fileName} (${(info.downloadedSize / 1e6).toFixed()} MB)`)).
      on('error', error => {
        const attempt = downloader.__retryCount + 1
        const attempts = options.retry.maxRetries + 1
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
      this.error(`Download failed for ${url}: ${failure.message}`)
    } else {
      return downloader.getDownloadPath()
    }
  }

  /**
   * Unpack a compressed or archive local file to the source directory.
   *
   * Currently supports zip, tar, tar.bz2, and tar.gz via
   * [decompress](https://www.npmjs.com/package/decompress). Support can be
   * added for bz2 and gz by adding the corresponding
   * [plugins](https://www.npmjs.com/search?q=keywords:decompressplugin) to the
   * dependencies.
   *
   * @param {string} file - Path to the local file.
   * @param {boolean} [rm=true] - Whether to remove the original file if
   * unpacked successfully.
   * @return {Promise<string[]>} Resolves to the paths of the unpacked files (if
   * any) or the path of the original file.
   */
  async unpackFile(file, rm = true) {
    const filename = path.relative(this.dir, file)
    try {
      const files = await decompress(file, this.dir)
      if (files.length) {
        this.success(`Unpacked ${filename}:`, files.map(file => file.path))
        if (rm) fs.unlinkSync(file)
        return files.map(file => path.join(this.dir, file.path))
      } else {
        return [file]
      }
    } catch (error) {
      this.error(`Unpack failed for ${filename}:`, error.message)
    }
  }

  /**
   * Download and unpack a remote file to the source directory.
   * 
   * @param {string} url - Path to the remote file.
   * @return {Promise<sring[]>} Resolves to the paths of the unpacked files (if
   * any) or the local path of the downloaded file.
   */
  async getFile(url) {
    try {
      const file = await this.downloadFile(url)
      return await this.unpackFile(file)
    } catch (error) {
      throw error
    }
  }

  /**
   * Download and unpack remote files to the source directory.
   *
   * Downloads all file paths in `this.props.download` and unpacks any
   * compressed or archive files.
   *
   * @param {boolean} [overwrite=false] - Whether to proceed if working
   * directory is not empty (see {@link Source#isEmpty}).
   * @return {Promise<string[]>} Resolves to the paths of the downloaded and
   * unpacked local files.
   */
  async getFiles(overwrite = false) {
    if (!this.props.download || (!overwrite && !this.isEmpty())) {
      return []
    }
    let urls = this.props.download
    if (typeof urls === 'string') {
      urls = [urls]
    }
    try {
      const paths = await Promise.all(urls.map(url => this.getFile(url)))
      return paths.flat()
    } catch (error) {
      throw error
    }
  }

  /**
   * Execute shell commands from the source directory.
   *
   * Executes all shell commands in `this.props.execute` from the source
   * directory (`this.dir`).
   *
   * @return {Promise}
   */
  async execute() {
    if (this.props.execute) {
      const cmd = typeof this.props.execute === 'string' ?
        this.props.execute : this.props.execute.join(' && ')
      this.log('Executing:', this.props.execute)
      try {
        exec(`cd '${this.dir}' && ${cmd}`)
      } catch (error) {
        this.error('Execution failed:', error.message)
      }
    }
  }

  /**
   * Find path to input file.
   *
   * Searches for all non-dotfiles in the source directory recursively and
   * attempts to guess which file to pass to GDAL based on file extensions.
   * Throws an error if no file is found or if multiple candidate files are
   * found.
   *
   * @return {string} File path.
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
   * Open input file with GDAL.
   *
   * @return {gdal.Dataset} See the documentation for
   * [node-gdal-next](https://contra.io/node-gdal-next/classes/gdal.Dataset.html).
   * Result is cached until closed with {@link Source#close}.
   */
  open() {
    // Clear if already destroyed
    try {
      // Choice of property is arbitrary
      this.__dataset.description
    } catch {
      this.__dataset = null
    }
    if (!this.__dataset) {
      this.__dataset = gdal.open(this.find())
    }
    return this.__dataset
  }

  /**
   * Close input file if open with GDAL.
   */
  close() {
    try {
      this.__dataset.close()
    } catch {
    } finally {
      this.__dataset = null
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
   * @return {gdal.Dataset} See the documentation for
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
   * @return {string} Either the provided SRS (`this.props.srs`), the SRS read
   * from the input file (as well-known-text), or the default SRS
   * (`this.options.srs`).
   */
  getSrsString(layer) {
    let srs = this.props.srs
    if (!srs) {
      if (!layer) {
        layer = this.open().layers.get(0)
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
   * @return {gdal.SpatialReference} SRS object initialized by
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
   * @return {{?wkt: string, ?x: string, ?y: string}|undefined} Names of
   * geometry fields either provided (`this.props.srs`) or guessed from field
   * names, or `undefined` if the input already has explicit geometries.
   */
  getGeometry() {
    let geometry = this.props.geometry
    if (!geometry) {
      geometry = {}
      const layer = this.open().layers.get(0)
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
  * @return {string} VRT file content.
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
    const layer = this.open().layers.get(0)
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
