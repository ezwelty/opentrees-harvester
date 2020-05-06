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
 * @param {string} [options.default_srs=EPSG:4326] - Spatial reference system to
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
        default_srs: 'EPSG:4326'
      },
      ...options
    }
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
        errors.push(['Invalid id:', props.id])
      }
    }
    // download
    if (props.download) {
      if (!(typeof props.download === 'string' ||
        (Array.isArray(props.download) && typeof props.download[0] === 'string'))) {
        errors.push(['Invalid download:', props.download])
      }
    }
    // execute
    if (props.execute) {
      if (!(typeof props.execute === 'string' ||
        (Array.isArray(props.execute) && typeof props.execute[0] === 'string'))) {
        errors.push(['Invalid execute:', props.execute])
      }
    }
    // format
    if (props.format) {
      if (!(typeof props.format === 'string' &&
        helpers.get_gdal_extensions().includes(props.format.toLowerCase()))) {
        errors.push(['Unsupported format:', props.format])
      }
    }
    // crosswalk
    if (props.crosswalk) {
      Object.keys(props.crosswalk).forEach(key => {
        const value = props.crosswalk[key]
        if (!['string', 'function'].includes(typeof (value))) {
          errors.push([`Invalid type for crosswalk.${key}:`, typeof value])
        }
      })
    }
    // geometry
    if (props.geometry) {
      if (!(typeof (props.geometry) === 'object' &&
        (typeof (props.geometry.wkt) === 'string' ||
          (typeof (props.geometry.x) === 'string' &&
            typeof (props.geometry.y) === 'string')))) {
        errors.push(['Invalid geometry:', props.geometry])
      }
    }
    // srs
    if (props.srs) {
      try {
        gdal.SpatialReference.fromUserInput(props.srs)
      } catch (err) {
        errors.push(['Invalid srs:', props.srs])
      }
    }
    if (error) {
      errors.forEach(objects => this.error(...objects))
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
   * directory is not empty (see {@link Source#is_empty}).
   * @return {Promise}
   */
  get(overwrite = false) {
    return this.get_files(overwrite).
      then(paths => {
        if (paths.length) this.execute()
        return paths
      }).
      then(paths => {
        if (paths.length) this.success('Ready to process')
      })
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
   * file is created (see {@link Source#get_vrt}).
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
   * @param {boolean} [options.keep_invalid=false] - Whether to keep features
   * with empty or invalid geometries.
   * @param {boolean} [options.keep_fields=false] - Whether to keep the input
   * feature fields alongside the result of the schema crosswalk
   * (`this.props.crosswalk`).
   * @param {boolean} [options.keep_geometry_fields=false] - Whether to keep the
   * input feature geometry fields. Applies only to inputs for which a VRT file
   * is written (see {@link Source#get_vrt}) and if `options.keep_fields` is
   * also `true`.
   * @param {string} [options.prefix=] - String to append to input field names
   * to prevent collisions with output field names. Applies only if
   * `options.keep_fields` is `true`.
   * @param {number[]} [options.bounds] - Bounding box in output SRS
   * (`options.srs`) in the format [xmin, ymin, xmax, ymax]. If provided,
   * features outside the bounds are skipped.
   */
  process(file, options = {}) {
    if (!options.overwrite && fs.existsSync(file)) {
      return
    }
    options = {
      ...{
        driver: null,
        creation: null,
        overwrite: false,
        srs: '+init=epsg:4326',
        centroids: false,
        keep_invalid: false,
        keep_fields: false,
        keep_geometry_fields: false,
        prefix: '_',
        bounds: null
      },
      ...options
    }
    if (!options.driver) {
      const extension = helpers.get_file_extension(file.toLowerCase())
      const drivers = helpers.get_gdal_drivers()[extension]
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
    let input_layer = input.layers.get(0)
    if (!input_layer.features.count()) {
      this.warn('Skipping: Layer has no features')
      return
    }
    if (!input_layer.features.first().getGeometry() && !this.props.coordsFunc) {
      // Write (and then read) VRT file with geometry definition
      this.log('Writing and reading VRT file')
      input = this.open_vrt(options.keep_geometry_fields)
      input_layer = input.layers.get(0)
    }
    // Prepare input schema
    let input_schema = input_layer.fields.map(field => field)
    /*
     * NOTE: Confusing gdal bindings handling of date/time fields
     * - Fields detected as date/time are read as objects, not strings
     * - Cannot yet set date/time field from date/time object, only strings
     * (see https://github.com/naturalatlas/node-gdal/issues/144)
     * HACK:
     * - Set output date/time fields as string
     * - Convert input date/time fields to string
     */
    const string_crosswalk = {}
    input_schema = input_schema.map(field => {
      const formatter = helpers.gdal_string_formatters[field.type]
      if (formatter) {
        string_crosswalk[field.name] =
          eval(`x => helpers.gdal_string_formatters.${field.type}(x['${field.name}'])`)
        field.type = gdal.OFTString
      }
      return field
    })
    // Prepare crosswalks
    const crosswalks = [
      {
        crosswalk: string_crosswalk,
        keep: true,
        prefix: ''
      },
      {
        crosswalk: this.props.crosswalk,
        keep: options.keep_fields,
        prefix: options.prefix
      }
    ]
    // Prepare output schema
    const output_schema = []
    if (this.props.crosswalk) {
      for (const key in this.props.crosswalk) {
        // NOTE: Output as string to preserve malformed values
        output_schema.push(new gdal.FieldDefn(key, gdal.OFTString))
      }
    }
    if (options.keep_fields) {
      input_schema.forEach(field => {
        field.name = `${options.prefix}${field.name}`
        output_schema.push(field)
      })
    }
    // Prepare output
    const driver = gdal.drivers.get(options.driver)
    if (!driver) {
      this.error('Unrecognized GDAL driver:', options.driver)
    }
    fs.mkdirSync(path.dirname(file), { recursive: true })
    const output = driver.create(file, 0, 0, 0, gdal.GDT_Byte, options.creation)
    let output_type
    if (options.centroids || input_layer.geomType == gdal.wkbNone) {
      output_type = gdal.wkbPoint
    } else {
      output_type = input_layer.geomType
    }
    const output_layer = output.layers.create(input_layer.name, options.srs,
      output_type)
    output_layer.fields.add(output_schema)
    const input_srs = this.get_srs(input_layer)
    const transform = helpers.get_srs_transform(input_srs, options.srs)
    if (options.bounds) {
      if (transform && !helpers.is_srs_xy(options.srs)) {
        // Swap x, y
        options.bounds = [
          options.bounds[1], options.bounds[0],
          options.bounds[3], options.bounds[2]
        ]
      }
      options.bounds = helpers.bounds_to_polygon(options.bounds)
    }
    // Populate output
    let input_feature
    for (
      input_feature = input_layer.features.first();
      input_feature;
      input_feature = input_layer.features.next()) {
      // Fields
      const input_fields = input_feature.fields.toObject()
      if (this.props.delFunc && this.props.delFunc(input_fields)) {
        continue
      }
      const output_feature = new gdal.Feature(output_layer)
      const output_fields = helpers.map_object(input_fields, crosswalks)
      output_feature.fields.set(output_fields)
      // Geometry
      let input_geometry
      if (this.props.coordsFunc) {
        const coords = this.props.coordsFunc(input_fields)
        if (Array.isArray(coords) && coords.length == 2) {
          input_geometry = new gdal.Point(coords[0], coords[1])
          input_geometry.srs = input_srs
        } else {
          this.warn(
            `Invalid parsed coordinates at ${input_feature.fid}:`, coords)
          if (!options.keep_invalid) continue
        }
      } else {
        input_geometry = input_feature.getGeometry()
      }
      if (input_geometry) {
        if (options.centroids && input_geometry.wkbType != gdal.wkbPoint) {
          input_geometry = input_geometry.centroid()
        }
        let is_valid = true
        let is_point = input_geometry.wkbType == gdal.wkbPoint
        if (transform) {
          try {
            input_geometry.transform(transform)
          } catch (error) {
            is_valid = false
          }
        } else {
          is_valid = input_geometry.isValid()
          if (is_point) {
            is_valid = is_valid && input_geometry.x && input_geometry.y &&
              isFinite(input_geometry.x) && isFinite(input_geometry.y)
          }
        }
        if (!is_valid) {
          const msg = `Invalid ${input_geometry.name} at ${input_feature.fid}`
          if (is_point) {
            this.warn(msg, (({ x, y }) => ({ x, y }))(input_geometry))
          } else {
            this.warn(msg)
          }
          if (!options.keep_invalid) continue
        }
        if (options.bounds && is_valid) {
          if (!input_geometry.within(options.bounds)) {
            this.warn(`Out of bounds ${input_geometry.name} at ${input_feature.fid}`)
            continue
          }
        }
        output_feature.setGeometry(input_geometry)
      } else {
        this.warn(`Empty geometry at ${input_feature.fid}`)
        if (!options.keep_invalid) continue
      }
      // TODO: flush after each n features
      output_layer.features.add(output_feature)
    }
    // Write
    output.close()
    this.success('Wrote output:', file)
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
    const types = {}
    const values = {}
    const layer = this.open().layers.get(0)
    layer.fields.forEach(field => {
      types[field.name] = field.type
      values[field.name] = new Set()
    })
    let f
    let i = 1
    for (f = layer.features.first();
      f && i <= options.n; f = layer.features.next()) {
      for (let [key, value] of Object.entries(f.fields.toObject())) {
        const formatter = helpers.gdal_string_formatters[types[key]]
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
    const table_options = {
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
    const types = {}
    const layer = this.open().layers.get(0)
    layer.fields.forEach(field => {
      types[field.name] = field.type
    })
    // Print
    const data = [
      ['name'.bold, 'type'.bold, 'values'.bold],
      ...Object.keys(options.sample).map(key =>
        [key, types[key], options.sample[key].join(options.sep)])
    ]
    console.log(table(data, table_options))
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
  is_empty() {
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
  download_file(url) {
    // Ensure that target directory exists
    fs.mkdirSync(this.dir, { recursive: true })
    const options = { override: true, retry: { maxRetries: 3, delay: 3000 } }
    const downloader = new DownloaderHelper(url, this.dir, options)
    downloader.
      on('download', info => this.log(`Downloading ${info.fileName}`)).
      on('end', info => this.success(
        `Downloaded ${info.fileName} (${(info.downloadedSize / 1e6).toFixed()} MB)`)).
      on('error', error => this.error(
        `Download failed for ${url}:`, error.message)).
      on('retry', (attempt, opts) => this.warn(
        `Download attempt ${attempt} of ${opts.maxRetries} in ${opts.delay / 1e3} s`))
    return downloader.start().
      then(() => downloader.getDownloadPath())
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
  unpack_file(file, rm = true) {
    const filename = path.relative(this.dir, file)
    return decompress(file, this.dir).
      then(files => {
        const filenames = files.map(x => x.path)
        if (files.length) {
          this.success(`Unpacked ${filename}:`, filenames)
          if (rm) fs.unlinkSync(file)
          return files.map(x => path.join(this.dir, x.path))
        } else {
          return [file]
        }
      }).
      catch(error =>
        this.error(`Unpack failed for ${filename}:`, error.message))
  }

  /**
   * Download and unpack a remote file to the source directory.
   * 
   * @param {string} url - Path to the remote file.
   * @return {Promise<sring[]>} Resolves to the paths of the unpacked files (if
   * any) or the local path of the downloaded file.
   */
  get_file(url) {
    return this.download_file(url).
      then(file => this.unpack_file(file))
  }

  /**
   * Download and unpack remote files to the source directory.
   *
   * Downloads all file paths in `this.props.download` and unpacks any
   * compressed or archive files.
   *
   * @param {boolean} [overwrite=false] - Whether to proceed if working
   * directory is not empty (see {@link Source#is_empty}).
   * @return {Promise<string[]>} Resolves to the paths of the downloaded and
   * unpacked local files.
   */
  get_files(overwrite = false) {
    if (!this.props.download || (!overwrite && !this.is_empty())) {
      return Promise.resolve([])
    }
    let urls = this.props.download
    if (typeof urls === 'string') {
      urls = [urls]
    }
    return Promise.
      all(urls.map(url => this.get_file(url))).
      then(paths => paths.flat())
  }

  /**
   * Execute shell commands from the source directory.
   *
   * Executes all shell commands in `this.props.execute` from the source
   * directory (`this.dir`).
   *
   * @return {Promise}
   */
  execute() {
    if (!this.props.execute) {
      return Promise.resolve()
    }
    const cmd = typeof this.props.execute === 'string' ?
      this.props.execute : this.props.execute.join(' && ')
    this.log('Executing:', this.props.execute)
    return exec(`cd '${this.dir}' && ${cmd}`).
      catch(error => this.error('Execution failed:', error.message))
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
    const extension = this.props.format ? `.${this.props.format}` : ''
    let paths = glob.sync(`**/*${extension}`,
      { nocase: true, nodir: true, dot: false, cwd: this.dir })
    if (!this.props.format) {
      if (paths.length) {
        const primaries = paths.filter(s =>
          s.match(helpers.gdal_file_patterns.primary))
        const secondaries = paths.filter(s =>
          s.match(helpers.gdal_file_patterns.secondary))
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
   * `.vrt`. The contents of the file is built by {@link Source#get_vrt}.
   *
   * @param {boolean} [keep_geometry_fields=false] - Whether the VRT file should
   * return geometry fields as regular feature fields.
   * @return {gdal.Dataset} See the documentation for
   * [node-gdal-next](https://contra.io/node-gdal-next/classes/gdal.Dataset.html).
   * The result is cached until closed with {@link Source#close_vrt}.
   */
  open_vrt(keep_geometry_fields = false) {
    // Clear if already destroyed
    try {
      // Choice of property is arbitrary
      this.__vrt.description
    } catch {
      this.__vrt = null
    }
    if (!this.__vrt) {
      // HACK: Writes to local dotfile to hide from find()
      const vrt_path = path.join(this.dir, '.vrt')
      fs.writeFileSync(vrt_path, this.get_vrt(keep_geometry_fields))
      this.__vrt = gdal.open(vrt_path)
    }
    return this.__vrt
  }

  /**
   * Close input file if open with GDAL via a VRT file.
   */
  close_vrt() {
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
   * (`this.options.default_srs`).
   */
  get_srs_string(layer) {
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
      srs = this.options.default_srs
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
   * {@link Source#get_srs_string}. See the documentation for
   * [node-gdal-next](https://contra.io/node-gdal-next/classes/gdal.SpatialReference.html#method-fromUserInput).
   */
  get_srs(layer) {
    const srs = this.get_srs_string(layer)
    return gdal.SpatialReference.fromUserInput(srs)
  }

  /**
   * Get geometry field name(s) of input.
   *
   * @return {{?wkt: string, ?x: string, ?y: string}|undefined} Names of
   * geometry fields either provided (`this.props.srs`) or guessed from field
   * names, or `undefined` if the input already has explicit geometries.
   */
  get_geometry() {
    let geometry = this.props.geometry
    if (!geometry) {
      geometry = {}
      const layer = this.open().layers.get(0)
      if (layer.geomType != gdal.wkbNone) {
        return
      }
      const matches = helpers.guess_geometry_fields(layer)
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
  * the spatial reference system (see {@link Source#get_srs_string}) and
  * geometry field names (see {@link Source#get_geometry}) for GDAL to use.
  *
  * @param {boolean} [keep_geometry_fields=false] - Whether VRT file should
  * return geometry fields as regular feature fields.
  * @return {string} VRT file content.
  */
  get_vrt(keep_geometry_fields = false) {
    const srs = this.get_srs_string()
    const geometry = this.get_geometry()
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
    const layer_path = path.resolve(layer.ds.description)
    return (
      `<OGRVRTDataSource>
        <OGRVRTLayer name="${layer.name}">
          <SrcDataSource relativeToVRT="0">${layer_path}</SrcDataSource>
          <GeometryType>wkbPoint</GeometryType>
          <LayerSRS>${srs}</LayerSRS>
          <GeometryField ${attributes} reportSrcColumn="${keep_geometry_fields}" />
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
