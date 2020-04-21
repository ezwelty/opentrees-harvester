const fs = require('fs')
const path = require('path')
const util = require('util')
const colors = require('colors')
const glob = require('glob')
const gdal = require('gdal-next')
const { DownloaderHelper } = require('node-downloader-helper')
const decompress = require('decompress')
const helpers = require('./helpers')

const CROSSWALK_FIELDS = {
  // Identification
  ref: {
    description: 'Feature identifier in source',
    type: gdal.OFTString
  },
  // Names
  scientific: {
    description: 'Scientific name (e.g. "Malus pumila")',
    type: gdal.OFTString
  },
  family: {
    description: 'Family (e.g. "Rosaceae")',
    type: gdal.OFTString
  },
  genus: {
    description: 'Genus (e.g. "Malus")',
    type: gdal.OFTString
  },
  species: {
    description: 'Species (e.g. "pumila")',
    type: gdal.OFTString
  },
  // TODO: Better distinguish between subspecies epithets and cultivar
  variety: {
    description: 'Subspecies, variety, form, cultivar, etc. (e.g. "asiatica")',
    type: gdal.OFTString
  },
  cultivar: {
    description: 'Cultivar (e.g. "Gala")',
    type: gdal.OFTString
  },
  common: {
    description: 'Common name (e.g. "Apple")',
    type: gdal.OFTString
  },
  description: {
    description: 'Any other name information not covered by other fields',
    type: gdal.OFTString
  },
  // Dimensions
  height: {
    description: 'Height',
    unit: 'meter',
    type: gdal.OFTReal
  },
  dbh: {
    description: 'Diameter at breast height',
    unit: 'centimetre',
    type: gdal.OFTReal,
  },
  crown: {
    description: 'Diameter of crown',
    unit: 'meter',
    type: gdal.OFTReal
  },
  // TODO: May be the same as crown
  spread: {
    description: 'Crown spread',
    unit: 'meter',
    type: gdal.OFTReal
  },
  // TODO: Clarify whether circumference of trunk or crown, convert to diameter
  circumference: {
    description: 'Circumference',
    type: gdal.OFTReal
  },
  // TODO: Clarify whether diameter of trunk or crown
  diameter: {
    description: 'Diameter',
    type: gdal.OFTReal
  },
  trunks: {
    description: 'Number of trunks',
    type: gdal.OFTInteger
  },
  // Condition
  health: {
    description: 'Health rating',
    type: gdal.OFTString,
    constraints: {
      enum: ['dead', 'poor', 'fair', 'good', 'very good', 'excellent']
    }
  },
  maturity: {
    description: 'Maturity',
    type: gdal.OFTString,
    constraints: {
      enum: ['young', 'semi-mature', 'mature', 'over-mature']
    }
  },
  structure: {
    description: 'Solidity, unlikelihood of falling',
    type: gdal.OFTString,
    constraints: {
      enum: ['failed', 'poor', 'fair', 'good']
    }
  },
  // Place
  location: {
    description: 'Where the tree is located',
    type: gdal.OFTString,
    constraints: {
      // TODO: Replace 'council' with more global term?
      enum: ['park', 'street', 'council']
    }
  },
  // Time
  planted: {
    description: 'Date of planting (or ideally, start from seed)',
    type: gdal.OFTString,
    constraints: {
      pattern: /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/
    }
  },
  // TODO: Distinguish between different kinds of updates
  updated: {
    description: 'Date that data was last updated',
    type: gdal.OFTString,
    constraints: {
      pattern: /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/
    }
  },
  // TODO: Only used by sources in Netherlands. Meaning unclear.
  installed: {
    description: 'Year installed',
    type: gdal.OFTInteger
  },
  age: {
    description: 'Age',
    unit: 'year',
    type: gdal.OFTInteger
  },
  // TODO: Convert to absolute years
  ule: {
    description: 'Useful life expectancy',
    unit: 'year',
    type: gdal.OFTInteger
  },
  ule_min: {
    description: 'Minimum useful life expectancy',
    unit: 'year',
    type: gdal.OFTInteger
  },
  ule_max: {
    description: 'Maximum useful life expectancy',
    unit: 'year',
    type: gdal.OFTInteger
  },
  // Other
  // TODO: Merge with description?
  note: {
    description: 'Notes',
    type: gdal.OFTString
  },
  owner: {
    description: 'Name of owner or ownership description',
    type: gdal.OFTString
  },
  // NOTE: Only Canada.regina
  value: {
    description: 'Monetary value',
    type: gdal.OFTReal
  }
}

/**
 * Class representing a source dataset.
 *
 * The data can be in either a remote or local file.
 * Compressed or archive files are unpacked as needed.
 */
class Source {

  /**
   * Source properties
   * @typedef {object} DatasetProperties
   * @property {string} id - Unique identifer
   * @property {string} primary - Identifier of primary dataset (in cases where 2+ datasets constitute the inventory)
   * @property {string} long - Full name for the government body (e.g. City of Melbourne)
   * @property {string} short - Display name for the government body
   * @property {string} country - Country name (in English)
   * @property {object} centre - Centre point (in case automatic placement is bad)
   * @property {number} centre.lon - Longitude in decimal degrees (EPSG:4326)
   * @property {number} centre.lat - Latitude in decimal degrees (EPSG:4326)
   * @property {string|string[]} download - Remote file path(s)
   * @property {string} info - Page with more information
   * @property {string} language - Language tag (e.g. "en", "en-US") of data contents, especially of common names
   * @property {object} license - License
   * @property {string} license.id - SPDX identifier: https://spdx.org/licenses (e.g. CC-BY-4.0)
   * @property {string} license.name - Name (e.g. Creative Commons Attribution 4.0 International)
   * @property {string} license.url - Page with full text of license text (e.g. https://creativecommons.org/licenses/by/4.0)
   * @property {string} format - Data file format (e.g. "geojson", "csv", "shp")
   * @property {string} compression - Compression or archive file format (e.g. "zip", "tar")
   * @property {string} srs - Spatial reference system in any format supported by OGRSpatialReference.SetFromUserInput().
   *  See https://gdal.org/api/ogrspatialref.html?highlight=setfromuserinput#_CPPv4N19OGRSpatialReference16SetFromUserInputEPKc.
   * @property {object} geometry - Geometry field (for non-spatial data like CSV).
   * @property {string} geometry.wkt - Name of field with WKT geometry (takes precedence)
   * @property {string} geometry.x - Name of field with x coordinate (longitude, easting)
   * @property {string} geometry.y - Name of field with y coordinate (latitude, northing)
   * @property {object} crosswalk - Crosswalk mapping to the opentrees schema.
   *  For each <key>: <value>, <key> is the new field name and <value> is either
   *  the old field name (string) or a function called as f(feature.properties).
   * @property {function} delFunc - Function called as f(feature.properties) for each feature (before crosswalk).
   *  Feature is excluded from output if function returns true.
   * @property {function} coordsFunc - Function called as f(features.properties) for each feature (before crosswalk).
   *  Returns an array of feature coordinates [x, y].
   */

  /**
   * Create a dataset.
   * @param {DatasetProperties} props - Dataset properties
   * @param {string} dir - Working directory
   * @param {object} options
   * @param {boolean} [options.exit=true] - Whether to throw (exit on) or print
   *  errors
   * @param {string} [options.default_srs='EPSG:4326'] -
   *  Spatial reference to assume if not defined in dataset. Passed
   *  to gdal.SpatialReference.fromUserInput().
   * @param {string} [options.default_name='input'] - Basename to use for
   *  downloaded file if no name is available from response header.
   */
  constructor(props, dir, options = {}) {
    this.props = props
    this.dir = dir
    options = {
      ...{
        overwrite: false,
        exit: true,
        default_srs: 'EPSG:4326',
        default_name: 'input'
      },
      ...options
    }
    this.exit = options.exit
    this.default_srs = options.default_srs
    this.default_name = options.default_name
    // Cache
    this.__dataset = null
  }

  /**
   * Validate source properties.
   * @param {boolean} error - Whether to raise errors
   * @return {string[]} Errors
   */
  validate(error = false) {
    var errors = []
    const props = this.props
    // Required fields
    if (!props.id || typeof props.id !== 'string') {
      errors.push(`Invalid or missing id: ${props.id}`)
    }
    // download
    if (props.download) {
      if (!(typeof props.download === 'string' ||
        (Array.isArray(props.download) && typeof props.download[1] === 'string'))) {
        errors.push(`Invalid download: ${props.download}`)
      }
    }
    // format
    if (props.format) {
      if (!(typeof props.format === 'string' &&
        helpers.get_gdal_extensions().includes(props.format.toLowerCase()))) {
        errors.push(`Unsupported format: ${props.format}`)
      }
    }
    // crosswalk
    if (props.crosswalk) {
      Object.keys(props.crosswalk).forEach(key => {
        if (!Object.keys(CROSSWALK_FIELDS).includes(key)) {
          errors.push(`Unsupported crosswalk property: ${key}`)
        }
        const value = props.crosswalk[key]
        if (!['string', 'function'].includes(typeof (value))) {
          errors.push(`Invalid type for crosswalk.${key}: ${typeof (value)}`)
        }
      })
    }
    // geometry
    if (props.geometry) {
      if (!(typeof (props.geometry) === 'object' &&
        (typeof (props.geometry.wkt) === 'string' ||
          (typeof (props.geometry.x) === 'string' && typeof (props.geometry.y) === 'string')))) {
        errors.push(`Invalid geometry: ${JSON.stringify(props.geometry)}`)
      }
    }
    // srs
    if (props.srs) {
      try {
        gdal.SpatialReference.fromUserInput(props.srs)
      } catch (err) {
        errors.push(`Invalid srs: ${props.srs}`)
      }
    }
    if (error) {
      errors.forEach(msg => this.error(msg))
    } else {
      return errors
    }
  }

  /**
   * Print message to console.
   * @param {string} msg - Message
   */
  log(msg) {
    const tag = colors.cyan(`[${this.props.id}]`)
    console.log(`${tag} ${msg}`)
  }

  /**
   * Print warning to console.
   * @param {string} msg - Message
   */
  warn(msg) {
    const tag = colors.yellow(`[${this.props.id}]`)
    console.log(`${tag} ${msg}`)
  }

  /**
   * Throw or print error to console.
   * @param {string} msg - Message
   * @param {boolean} exit - Whether to throw or print the error
   */
  error(msg, exit = this.exit) {
    const tag = colors.red(`[${this.props.id}]`)
    if (exit) {
      throw new Error(`${tag} ${msg}`)
    } else {
      console.error(`${tag} ${msg}`)
    }
  }

  /**
   * Empty and remove the working directory.
   */
  empty() {
    fs.rmdirSync(this.dir, { recursive: true })
  }

  /**
   * Check whether the working directory is missing or empty of files.
   * @return {boolean} Whether working directory is empty
   */
  is_empty() {
    const files = glob.sync(path.join(this.dir, '**', '*.*'))
    return files.length == 0
  }

  /**
   * Download and unpack files.
   * @param {boolean} [overwrite=false] - Whether to proceed even if working
   *  directory is not empty.
   * @return {Promise}
   */
  get(overwrite = false) {
    if (!overwrite && !this.is_empty()) {
      return Promise.resolve()
    }
    var urls = this.props.download
    if (typeof urls === 'string') {
      urls = [urls]
    }
    return Promise.all(urls.map(url => this.get_file(url))).
      then(() => this.log('Ready to process'.green))
  }

  /**
   * Download and unpack file.
   * @param {string} url - Path to remote file
   * @return {Promise}
   */
  get_file(url) {
    fs.mkdirSync(this.dir, { recursive: true })
    const options = { override: true, retry: { maxRetries: 3, delay: 3000 } }
    const downloader = new DownloaderHelper(url, this.dir, options)
    downloader.
      on('download', info => this.log(`Downloading ${info.fileName}`)).
      on('end', info => this.log(`Downloaded ${info.fileName} (${(info.downloadedSize / 1e6).toFixed()} MB)`)).
      on('error', error => this.error(`Download failed for ${url}`)).
      on('retry', (attempt, opts) => this.warn(`Download attempt ${attempt} of ${opts.maxRetries} in ${opts.delay / 1e3} s`))
    return downloader.start().
      then(() => downloader.getDownloadPath()).
      then(file => {
        return decompress(file, this.dir).
          then(files => {
            if (files.length) {
              this.log(`Unpacked ${path.relative(this.dir, file)}: ${util.inspect(files.map(x => x.path))}`)
              fs.unlinkSync(file)
            }
          })
      })
  }

  /**
   * Find path of input file.
   * @return {string} File path (if found) or error if not found
   */
  find() {
    const extension = this.props.format ? this.props.format : '*'
    var paths = glob.sync(
      path.join(this.dir, '**', `*.${extension}`), { nocase: true })
    if (!this.props.format) {
      paths = paths.filter(s => s.match(helpers.gdal_patterns.all))
      if (paths.length > 1) {
        const primaries = paths.filter(s =>
          s.match(helpers.gdal_patterns.primary))
        const secondaries = paths.filter(s =>
          s.match(helpers.gdal_patterns.secondary))
        if (primaries.length) {
          paths = primaries
        } else if (secondaries.length) {
          paths = secondaries
        } else {
          this.warn(`Found exotic input formats: ${util.inspect(paths)}`)
        }
      }
    }
    if (paths.length) {
      if (paths.length == 1) {
        return paths[0]
      } else {
        this.error(
          `Found ${paths.length} possible inputs: ${util.inspect(paths)}`)
      }
    } else {
      this.error(`No supported inputs found: ${util.inspect(paths)}`)
    }
  }

  /**
   * Open input as GDAL dataset.
   * 
   * Result is cached until closed with close().
   * 
   * @return {gdal.Dataset} GDAL dataset
   */
  open() {
    if (!this.__dataset) {
      this.__dataset = gdal.open(this.find())
    }
    return this.__dataset
  }

  /**
   * Close input if open as GDAL Dataset.
   */
  close() {
    if (this.__dataset) {
      this.__dataset.close()
    }
    this.__dataset = null
  }

  /**
   * Get input spatial reference system (SRS) as a string.
   *
   * Either the provided SRS, the SRS of the layer (as well-known-text),
   * or the default SRS.
   *
   * @return {string} Input SRS
   */
  get_srs_string() {
    var srs = this.props.srs
    if (!srs) {
      const layer = this.open().layers.get(0)
      if (layer.srs) {
        srs = layer.srs.toWKT()
      }
    }
    if (!srs) {
      srs = this.default_srs
      this.warn(`Assuming default SRS: ${srs}`)
    }
    return srs
  }

  /**
   * Get input spatial reference system (SRS).
   *
   * Either the provided SRS (passed to gdal.SpatialReference.fromUserInput),
   * the SRS of the layer, or the default SRS.
   * 
   * @return {gdal.SpatialReference} Input SRS
   */
  get_srs() {
    const srs = this.get_srs_string()
    return gdal.SpatialReference.fromUserInput(srs)
  }

  /**
   * Get input geometry definition.
   * 
   * Either the provided geometry definition or guessed from layer field names.
   * 
   * @return {object} Geometry definition, empty object if failed, or undefined
   *  if input already has geometry defined.
   */
  get_geometry() {
    var geometry = this.props.geometry
    if (!geometry) {
      geometry = {}
      const layer = this.open().layers.get(0)
      if (layer.geomType != gdal.wkbNone) {
        return
      }
      const matches = helpers.guess_geometry_fields(layer)
      if (matches.wkt.length) {
        if (matches.wkt.length > 1) {
          this.warn(`Using first of many WKT fields: ${matches.wkt.join(', ')}`)
        }
        geometry = { wkt: matches.wkt[0] }
      } else if (matches.x.length && matches.y.length) {
        if (matches.x.length > 1) {
          this.warn(`Using first of many X fields: ${matches.x.join(', ')}`)
        }
        if (matches.y.length > 1) {
          this.warn(`Using first of many Y fields: ${matches.y.join(', ')}`)
        }
        geometry = { x: matches.x[0], y: matches.y[0] }
      } else {
        this.error(`Failed to guess geometry fields: ${util.inspect(matches)}`)
      }
    }
    return geometry
  }

  /**
  * Write VRT (OGR Virtual Format) for input.
  *
  * Relevant only for tabular data with feature geometry in fields.
  * Writes the file to the input path with '.vrt' added.
  *
  * See https://gdal.org/drivers/vector/vrt.html
  *
  * @param {boolean} [keep_geometry_fields=false] - Whether VRT file should
  *   return geometry fields as regular feature fields
  * @return {string} Path to VRT file.
  */
  write_vrt(keep_geometry_fields = false) {
    const srs = this.get_srs_string()
    const geometry = this.get_geometry()
    // Build <GeometryField> attributes
    var attributes
    if (geometry.wkt && typeof geometry.wkt === 'string') {
      attributes = `encoding="WKT" field="${geometry.wkt}"`
    } else if (
      geometry.x && typeof geometry.x === 'string' &&
      geometry.y && typeof geometry.y === 'string') {
      attributes = `encoding="PointFromColumns" x="${geometry.x}" y="${geometry.y}"`
    } else {
      this.error(`Invalid geometry: ${util.inspect(geometry)}`)
    }
    // Build VRT
    const layer = this.open().layers.get(0)
    var layer_path = layer.ds.description
    const basename = path.parse(layer_path).base
    const vrt =
      `<OGRVRTDataSource>
       <OGRVRTLayer name="${layer.name}">
           <SrcDataSource relativeToVRT="1">${basename}</SrcDataSource>
           <GeometryType>wkbPoint</GeometryType>
           <LayerSRS>${srs}</LayerSRS>
           <GeometryField ${attributes} reportSrcColumn="${keep_geometry_fields}"/>
       </OGRVRTLayer>
     </OGRVRTDataSource>`
    // Write VRT
    const vrt_path = `${layer_path}.vrt`
    fs.writeFileSync(vrt_path, vrt)
    return vrt_path
  }

  /**
   * Process input file and write to output.
   * 
   * @param {string} file - Output file path
   * @param {object} options
   * @param {string} [options.driver] - Name of GDAL driver
   *  (e.g. 'csv', 'geojsonseq'). Guessed from file extension if not provided.
   * @param {string[]|object} [options.creation] - Driver-specific dataset
   *  creation options. See https://gdal.org/drivers/vector.
   *  Only default, for 'csv': ['GEOMETRY=AS_WKT'].
   * @param {boolean} [options.overwrite=false] - Whether to overwrite an
   *  existing file.
   * @param {string} [options.srs='EPSG:4326'] - Output spatial reference.
   *  Passed to gdal.SpatialReference.fromUserInput().
   *  Use 'EPSG:*' for (latitude, longitude) and '+init=epsg:4326' (PROJ<6
   *  behavior) for (longitude, latitude).
   * @param {boolean} [options.centroids=false] - Whether to reduce non-point
   *  geometries to centroids
   * @param {boolean} [options.keep_invalid=false] - Whether to keep features
   *  with empty or invalid geometries
   * @param {boolean} [options.keep_fields=false] - Whether to keep original
   *  feature fields
   * @param {boolean} [options.keep_geometry_fields=false] - Whether to keep
   *  original feature fields reporting geometry. Applies only to layers for
   *  which a VRT file had to be written.
   * @param {string} [options.prefix='_'] - String to append to original
   *  field names (if kept)
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
        srs: 'EPSG:4326',
        centroids: false,
        keep_invalid: false,
        keep_fields: false,
        keep_geometry_fields: false,
        prefix: '_'
      },
      ...options
    }
    if (!options.driver) {
      const extension = helpers.get_file_extension(file.toLowerCase())
      const drivers = helpers.get_gdal_drivers()[extension]
      if (drivers && drivers.length == 1) {
        options.driver = drivers[0]
      } else {
        this.error(`Failed to guess driver for *.${extension}: ${drivers}`)
      }
    } else {
      options.driver = options.driver.toLowerCase()
    }
    if (!options.creation && options.driver === 'csv') {
      options.creation = { GEOMETRY: 'AS_WKT' }
    }
    options.srs = gdal.SpatialReference.fromUserInput(options.srs)
    // Read input
    var input = this.open()
    this.log(`Processing ${input.description}`)
    if (input.layers.count() > 1) {
      this.warn(`Using first of ${input.layers.count()} layers`)
    }
    var input_layer = input.layers.get(0)
    if (!input_layer.features.count()) {
      this.warn(`Skipping: Layer has no features`)
      return
    }
    if (!input_layer.features.first().getGeometry() && !this.props.coordsFunc) {
      // Write (and then read) VRT file with geometry definition
      this.log(`Writing VRT file`)
      this.write_vrt(options.keep_geometry_fields)
      // Destroy link to original input and link to VRT file
      this.close()
      input = this.open()
      input_layer = input.layers.get(0)
    }
    // Prepare input schema
    var input_schema = input_layer.fields.map(field => field)
    /**
     * NOTE: Confusing gdal bindings handling of date/time fields
     * - Fields detected as date/time are read as objects, not strings
     * - Cannot yet set date/time field from date/time object, only strings
     * (see https://github.com/naturalatlas/node-gdal/issues/144)
     * HACK:
     * - Set output date/time fields as string
     * - Convert input date/time fields to string
     */
    var string_crosswalk = {}
    input_schema = input_schema.map(field => {
      const formatter = helpers.gdal_string_formatters[field.type]
      if (formatter) {
        string_crosswalk[field.name] =
          eval(`x => helpers.${formatter.name}(x['${field.name}'])`)
        field.type = gdal.OFTString
      }
      return field
    })
    // Prepare output schema
    var output_schema = []
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
      this.error(`Unrecognized GDAL driver: ${options.driver}`)
    }
    fs.mkdirSync(path.dirname(file), { recursive: true })
    const output = driver.create(file, 0, 0, 0, gdal.GDT_Byte, options.creation)
    var output_type
    if (options.centroids || input_layer.geomType == gdal.wkbNone) {
      output_type = gdal.wkbPoint
    } else {
      output_type = input_layer.geomType
    }
    const output_layer = output.layers.create(input_layer.name, options.srs,
      output_type)
    output_layer.fields.add(output_schema)
    const input_srs = this.get_srs()
    const transform = helpers.get_srs_transform(input_srs, options.srs)
    // Populate output
    var input_feature = input_layer.features.first()
    for (
      var input_feature = input_layer.features.first();
      input_feature;
      input_feature = input_layer.features.next()) {
      // Fields
      const input_fields = input_feature.fields.toObject()
      if (this.props.delFunc && this.props.delFunc(input_fields)) {
        continue
      }
      const output_feature = new gdal.Feature(output_layer)
      var output_fields = helpers.map_object(input_fields, string_crosswalk,
        true, '')
      output_fields = helpers.map_object(
        output_fields,
        this.props.crosswalk ? this.props.crosswalk : {},
        options.keep_fields, options.prefix)
      output_feature.fields.set(output_fields)
      // Geometry
      var input_geometry
      if (this.props.coordsFunc) {
        const coords = this.props.coordsFunc(input_fields)
        if (Array.isArray(coords) && coords.length == 2) {
          input_geometry = new gdal.Point(coords[0], coords[1])
          input_geometry.srs = input_srs
        } else {
          this.warn(`Invalid parsed coordinates at ${input_feature.fid}: ${util.inspect(coords)}`)
          if (!options.keep_invalid) continue
        }
      } else {
        input_geometry = input_feature.getGeometry()
      }
      if (input_geometry) {
        if (options.centroids && input_geometry.wkbType != gdal.wkbPoint) {
          input_geometry = input_geometry.centroid()
        }
        if (input_geometry.isValid() &&
          input_geometry.x && input_geometry.y &&
          isFinite(input_geometry.x) && isFinite(input_geometry.y)) {
          if (transform) {
            try {
              input_geometry.transform(transform)
            } catch (error) {
              this.warn(`Invalid geometry at ${input_feature.fid}: ${input_geometry.x}, ${input_geometry.y} (x, y)`)
              if (!options.keep_invalid) continue
            }
          }
        } else {
          this.warn(`Invalid geometry at ${input_feature.fid}: ${input_geometry.x}, ${input_geometry.y} (x, y)`)
          if (!options.keep_invalid) continue
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
    this.log(`Wrote output to ${file}`.green)
  }
}

module.exports = Source
