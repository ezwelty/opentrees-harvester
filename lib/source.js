/**
 * Describe a source dataset.
 *
 * @module
 */

const fs = require('fs')
const path = require('path')
const util = require('util')
const colors = require('colors')
const gdal = require('gdal-async')
const { table } = require('table')
const helpers = require('./helpers')
const archive = require('./archive')
const workflow = require('./archiveWorkflow')
const LICENSES = require('./licenses')
const {ArchiveFile, ArchiveEntry, SourceProperties, BrowserFormat, FileType, SourceFile} = require('./types')

const LINK_TYPES = ['checksum', 'manual', 'file', 'arcgis', 'browser']
const VSI_FORMATS = ['/vsizip/', '/vsigzip/', '/vsitar/']
const SOURCE_ARCHIVE_PROPS = ['id', 'country', 'state', 'city', 'designation', 'notes']

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
    // data
    if (props.data) {
      const data = Array.isArray(props.data) ? props.data : [props.data]
      if (!data.every(link => typeof link === 'string' || (
        typeof link === 'object' &&
        Object.keys(link).length == 1 &&
        LINK_TYPES.includes(Object.keys(link)[0])
      ))) {
        errors.push(['Invalid data', props.data])
      }
    }
    // vfs
    if (props.vfs) {
      if (typeof props.vfs !== 'string' || !VSI_FORMATS.includes(props.vfs)) {
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
    // addressFunc
    if (props.addressFunc && typeof props.addressFunc !== 'function') {
      errors.push(['Invalid addressFunc', props.addressFunc])
    }
    // deleteFunc
    if (props.deleteFunc && typeof props.deleteFunc !== 'function') {
      errors.push(['Invalid deleteFunc', props.deleteFunc])
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
    // metadata
    if (props.metadata) {
      const metadata = Array.isArray(props.metadata) ? props.metadata : [props.metadata]
      if (!metadata.every(link => typeof link === 'string' || (
        typeof link === 'object' &&
        Object.keys(link).length == 1 &&
        LINK_TYPES.includes(Object.keys(link)[0])
      ))) {
        errors.push(['Invalid metadata', props.metadata])
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
   * Format file links.
   *
   * Converts short SourceFile format to the more explicit ArchiveFile format.
   * The `method` defaults to `file` for `data` files, and `browser` otherwise.
   *
   * @param {SourceFile|SourceFile[]} links - File links.
   * @param {object} [options]
   * @param {FileType} [options.type='data']
   * @param {BrowserFormat} [options.format]
   * @returns {ArchiveFile[]}
   * @private
   */
  formatLinks(links, { type = 'data', format } = {}) {
    if (!links) {
      return []
    }
    if (!Array.isArray(links)) {
      links = [links]
    }
    const defaultMethod = type === 'data' ? 'file' : 'browser'
    return links.map(link => {
      if (typeof link === 'object' && 'checksum' in link) {
        return { checksum: link.checksum }
      }
      let result
      if (typeof link === 'string') {
        result = { url: link, method: defaultMethod }
      } else {
        result = { url: Object.values(link)[0], method: Object.keys(link)[0] }
      }
      if (result.method === 'browser' && format) {
        result.format = format
      }
      return result
    })
  }

  /**
   * List file links by type.
   *
   * @param {FileType} [type='data']
   * @param {object} [options]
   * @param {BrowserFormat} [options.format]
   * @returns {ArchiveFile[]}
   * @private
   */
  listFiles(type = 'data', { format } = {}) {
    let links
    if (type === 'data' ) {
      links = this.props.data
    } else if (type === 'metadata') {
      links = this.props.metadata
    } else if (type === 'license') {
      if (this.props.license?.url) {
        links = this.props.license.url
      } else if (this.props.license?.id) {
        links = LICENSES[this.props.license.id].url
      }
    }
    return this.formatLinks(links, { type, format })
  }

  /**
   * Find file in archive.
   *
   * @param {ArchiveFile} link
   * @param {object} [options]
   * @param {number} [options.maxDays]
   * @returns {ArchiveEntry|undefined}
   * @private
   */
  findFile(link, { maxDays } = {}) {
    const entries = archive.search(link, { maxDays })
    return entries[0]
  }

  /**
   * Find files in archive (by type).
   *
   * Retuns the most recent match for each file if multiple are found.
   *
   * @param {FileType} [type='data'] – File type.
   * @param {object} [options]
   * @param {BrowserFormat} [options.format] - Browser wepbage export format.
   * @param {number} [options.maxDays] - Maximum age of archive result in days.
   * @returns {ArchiveEntry[]} Archive entries.
   */
  findFiles(type = 'data', { format, maxDays } = {}) {
    const links = this.listFiles(type, { format })
    const entries = []
    const notFound = []
    links.forEach(link => {
      const entry = this.findFile(link, { maxDays })
      entries.push(entry)
      if (!entry) {
        notFound.push(link)
      }
    })
    if (notFound.length) {
      this.error('Files not found in archive:', notFound)
    }
    return entries
  }

  /**
   * Download file.
   *
   * @param {object} params
   * @param {string} params.url
   * @param {'file'|'browser'|'arcgis'} [params.method='file']
   * @param {BrowserFormat} [params.format]
   * @param {object} [params.props] - Additional properties to log
   * @returns {Promise<ArchiveEntry>}
   * @private
   */
  async downloadFile({ url, method = 'file', format, props } = {}) {
    let entry
    // HACK: Disable check of presence in archive since already checked
    const maxDays = 0
    if (method === 'arcgis') {
      entry = await workflow.downloadArcgisFeatureLayer({url, maxDays, props})
    } else if (method === 'browser') {
      entry = await workflow.downloadPage({url, format, maxDays, props})
    } else {
      entry = await workflow.downloadFile({url, maxDays, props})
    }
    return entry
  }

  /**
   * Source properties to store in data archive.
   *
   * @type {object}
   * @private
   */
  get archiveProps() {
    const props = {}
    for (const key in SOURCE_ARCHIVE_PROPS) {
      if (this.props[key]) {
        props[key] = this.props[key]
      }
    }
    return props
  }

  /**
   * Find file in archive (and download if missing).
   *
   * @param {ArchiveFile} link
   * @param {object} [options]
   * @param {number} [params.maxDays]
   * @param {FileType} [params.type]
   * @returns {Promise<ArchiveEntry>}
   * @private
   */
  async fetchFile(link, { maxDays, type } = {}) {
    let entry
    // Find file in archive
    entry = this.findFile(link, { maxDays })
    if (entry) {
      return entry
    }
    if ('checksum' in link || link.method === 'manual') {
      this.error('File not found in archive:', link)
    }
    // Download file
    try {
      entry = await this.downloadFile({ ...link, props: {type, ...this.archiveProps }})
    } catch (error) {
      this.error(`Download failed (${error.message}):`, link)
    }
    this.success(`Download complete (${entry.path}):`, link)
    return entry
  }

  /**
   * Find files in archive (and download if missing).
   *
   * @param {FileType} [type='data'] – File type.
   * @param {object} [options]
   * @param {BrowserFormat} [options.format='mhtml'] - Browser webpage export
   * format.
   * @param {number} [options.maxDays] - Maximum age of search result in days.
   * @returns {Promise<ArchiveEntry[]>} Archive entries.
   * @throws {Error} If (checksum or manual-download) file not found in archive.
   * @throws {Error} If download fails.
   */
  async fetchFiles(type = 'data', { format = 'mhtml', maxDays } = {}) {
    const links = this.listFiles(type, { format })
    return await Promise.all(
      links.map(link => this.fetchFile(link, { maxDays, type }))
    )
  }

  /**
   * Process input and write to output.
   *
   * Reading, writing, and coordinate transformations are performed by
   * [GDAL](https://gdal.org) via the
   * [node-gdal-async](https://www.npmjs.com/package/gdal-async) bindings.
   *
   * Processing steps include a schema crosswalk (`this.props.crosswalk`),
   * skipping features by field values (`this.props.deleteFunc`), reducing complex
   * geometries to centroid points (`options.centroids`), and skipping features
   * outside a bounding box (`options.bounds`).
   *
   * Quirks
   * - GDAL date/time fields: Read as objects but written as ISO8601 strings
   * - GDAL list fields: Read as arrays and written as pipe-separated strings
   *
   * @param {string} file - Output file path.
   * @param {object} [options] - Output options.
   * @param {string} [options.driver] - Name of GDAL driver to use to write to
   * the output file (see https://gdal.org/drivers/vector). Guessed from file
   * extension if not provided.
   * @param {string[]|object} [options.creation] - Driver-specific dataset
   * creation options (see https://gdal.org/drivers/vector).
   * @param {boolean} [options.overwrite=false] - Whether to proceed if `file`
   * already exists.
   * @param {string} [options.srs=EPSG:4326] - Output spatial reference
   * system in any format supported by
   * [OGRSpatialReference.SetFromUserInput()](https://gdal.org/api/ogrspatialref.html#classOGRSpatialReference_1aec3c6a49533fe457ddc763d699ff8796).
   * Use 'EPSG:*' for (latitude, longitude) and '+init=EPSG:*' (PROJ<6 behavior)
   * for (longitude, latitude).
   * @param {boolean} [options.centroids=false] - Whether to reduce non-point
   * geometries to centroids.
   * @param {boolean} [options.keepInvalid=false] - Whether to keep features
   * with empty or invalid geometries.
   * @param {boolean} [options.keepFields=false] - Whether to keep the input
   * feature fields alongside the result of the schema crosswalk
   * (`this.props.crosswalk`).
   * @param {string} [options.prefix=] - String to append to input field names
   * to prevent collisions with output field names. Applies only if
   * `options.keepFields` is `true`.
   * @param {number[]} [options.bounds] - Bounding box in output SRS
   * (`options.srs`) in the format [xmin, ymin, xmax, ymax]. If provided,
   * features outside the bounds are skipped.
   * @returns {boolean} Whether processed file (true) or skipped (false).
   */
  async process(file, options = {}) {
    // Enforce option defaults
    options = {
      driver: null,
      creation: null,
      overwrite: false,
      srs: 'EPSG:4326',
      centroids: false,
      keepInvalid: false,
      keepFields: false,
      prefix: '',
      bounds: null,
      deleteFunc: null,
      ...options
    }
    // Prepare output GDAL driver
    if (!options.driver) {
      // Guess driver from file extension
      const extension = helpers.getFileExtension(file).toLowerCase()
      const drivers = helpers.getGdalDrivers()[extension]
      if (drivers && drivers.length == 1) {
        options.driver = drivers[0]
      } else {
        this.error(`Failed to guess driver for *.${extension}:`, drivers)
      }
    } else {
      options.driver = options.driver.toLowerCase()
    }
    const driver = gdal.drivers.get(options.driver)
    if (!driver) {
      this.error('Unrecognized GDAL driver:', options.driver)
    }
    // Prepare output SRS
    options.srs = gdal.SpatialReference.fromUserInput(options.srs)
    // Skip: Output file exists
    if (!options.overwrite && fs.existsSync(file)) {
      return false
    }
    // Read input layer
    const inputLayer = await this.open()
    this.log(`Processing ${inputLayer.ds.description}`)
    // Skip: No features
    if (!inputLayer.features.count()) {
      this.warn('Skipping: Layer has no features')
      return false
    }
    // Skip: No geometry
    if (
      inputLayer.geomType == gdal.wkbNone &&
      !this.props.geometry &&
      !this.props.coordsFunc &&
      !this.props.addressFunc
    ) {
      this.warn('Skipping: Layer has no features')
      return false
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
      }
      return field
    })
    // Replace coded fields with their labels
    const codeCrosswalk = {}
    if (this.props.codes) {
      for (const fieldName in this.props.codes) {
        const codes = this.props.codes[fieldName]
        // Scan all values and if all objects, extract all unique keys
        let keys = new Set()
        for (const value of Object.values(codes)) {
          // If not an object, assume all values are scalar
          if (typeof value !== 'object') {
            keys = false
            break
          }
          // If null, skip
          if (value === null) {
            continue
          }
          // Otherwise, add all keys to set
          for (const key in value) {
            keys.add(key)
          }
        }
        if (keys) {
          for (const key of keys) {
            codeCrosswalk[`${fieldName}.${key}`] = x => codes[x[fieldName]?.toString()]?.[key.toString()]
            // Add new field to input schema
            const newField = new gdal.FieldDefn(`${fieldName}.${key}`, gdal.OFTString)
            inputSchema.push(newField)
          }
        } else {
          codeCrosswalk[fieldName] = x => codes[x[fieldName]?.toString()] || x[fieldName]
        }
      }
    }
    // Prepare crosswalks
    const crosswalks = [
      {
        crosswalk: stringCrosswalk,
        keep: true,
        prefix: ''
      },
      {
        crosswalk: codeCrosswalk,
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
    const forcedRenames = {}
    if (options.keepFields) {
      // GDAL requires column names to be unique (ignoring case)
      // Append __${index} to duplicate names
      const inputNames = inputSchema.map(field => field.name.toLowerCase())
      inputSchema.forEach((field, index) => {
        let name = `${options.prefix}${field.name}`
        if (inputNames.indexOf(field.name.toLowerCase()) < index) {
          name = `${name}__${index}`
          forcedRenames[field.name] = name
        }
        // Copy field object and rename
        const outputField = new gdal.FieldDefn(field.name, field.type)
        Object.assign(outputField, field)
        // Rename field
        outputField.name = name
        // Cast to string in some cases
        if (field.name in stringCrosswalk || field.name in codeCrosswalk) {
          outputField.type = gdal.OFTString
        }
        outputSchema.push(outputField)
      })
    }
    // Prepare output file
    fs.mkdirSync(path.dirname(file), { recursive: true })
    if (fs.existsSync(file)) {
      fs.unlinkSync(file)
    }
    // Determine output geometry type
    let outputType = inputLayer.geomType
    if (options.centroids || inputLayer.geomType == gdal.wkbNone) {
      outputType = gdal.wkbPoint
    }
    // Create output layer
    const output = driver.create(file)
    const outputLayer = output.layers.create(
      inputLayer.name, options.srs, outputType, options.creation
    )
    outputLayer.fields.add(outputSchema)
    // Prepare coordinate systems
    const srs = this.getSrs()
    const transform = helpers.getTransform(srs, options.srs)
    const isXY = helpers.isAxesXY(srs)
    // Prepare bounds
    if (options.bounds) {
      if (!isXY) {
        // Swap x, y
        options.bounds = [
          options.bounds[1], options.bounds[0],
          options.bounds[3], options.bounds[2]
        ]
      }
      options.bounds = helpers.boundsToPolygon(options.bounds)
    }
    // Populate output
    const counts = {
      invalidGeometries: 0,
      outOfBoundGeometries: 0
    }
    let inputFeature
    for (
      inputFeature = inputLayer.features.first();
      inputFeature;
      inputFeature = inputLayer.features.next()) {
      // Fields
      const inputFields = inputFeature.fields.toObject()
      if (this.props.deleteFunc && this.props.deleteFunc(inputFields)) {
        continue
      }
      const outputFeature = new gdal.Feature(outputLayer)
      const outputFields = helpers.mapObject(inputFields, crosswalks)
      for (const key in forcedRenames) {
        outputFields[forcedRenames[key]] = outputFields[key]
        delete outputFields[key]
      }
      outputFeature.fields.set(outputFields)
      // Geometry
      if (outputLayer.geomType != gdal.wkbNone) {
        let inputGeometry = this.getFeatureGeometry(
          inputFeature, { fields: inputFields, srs, isXY }
        )
        let isValid = false
        if (inputGeometry) {
          // Reduce to centroid if needed
          if (options.centroids && inputGeometry.wkbType != gdal.wkbPoint) {
            inputGeometry = inputGeometry.centroid()
            // HACK: Centroid sometimes loses SRS
            inputGeometry.srs = srs
          }
          // Check if geometry is valid
          isValid = inputGeometry.isValid()
          const isPoint = inputGeometry.wkbType == gdal.wkbPoint
          if (isPoint) {
            isValid = Boolean(
              isValid &&
              inputGeometry.x &&
              inputGeometry.y &&
              isFinite(inputGeometry.x) &&
              isFinite(inputGeometry.y)
            )
          }
          // Transform geometry
          if (isValid && transform) {
            try {
              inputGeometry.transform(transform)
            } catch (error) {
              isValid = false
            }
          }
          if (isValid && options.bounds) {
            if (!inputGeometry.within(options.bounds)) {
              counts.outOfBoundGeometries++
              continue
            }
          }
        }
        if (!isValid) {
          counts.invalidGeometries++
          if (!options.keepInvalid) {
            continue
          }
          inputGeometry = null
        }
        if (inputGeometry) {
          // Flatten 3D geometries to 2D
          inputGeometry.flattenTo2D()
          outputFeature.setGeometry(inputGeometry)
        }
      }
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
    const layer = this.getLayer()
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
    const layer = this.getLayer()
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
    const layer = this.getLayer()
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
    const files = this.findFiles('data').map(entry => entry.path)
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
   * @private
   */
  getLayer() {
    if (this.__layer) {
      return this.__layer
    }
    this.error('Dataset must be open with source.open()')
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
   * Get spatial reference system (SRS) of input.
   *
   * @returns {gdal.SpatialReference} The provided SRS (`this.props.srs`),
   * the SRS read from the input file, or the default SRS (`this.options.srs`).
   */
  getSrs() {
    if (this.props.srs) {
      return gdal.SpatialReference.fromUserInput(this.props.srs)
    }
    const layer = this.getLayer()
    if (layer.srs) {
      return layer.srs
    }
    this.warn('Assuming default SRS:', this.options.srs)
    return gdal.SpatialReference.fromUserInput(this.options.srs)
  }

  /**
   * Get feature geometry.
   *
   * @param {gdal.Feature} feature - Input feature.
   * @param {object} [options] - Additional options.
   * @param {object} [options.fields] - Field values of the feature.
   * @param {object} [options.srs] - Spatial reference system.
   * @param {boolean} [options.isXY] - Whether the input coordinates are
   * in (longitude/east, latitude/north) order.
   * @returns {gdal.Geometry} The feature geometry.
   */
  getFeatureGeometry(feature, { fields, srs, isXY } = {}) {
    fields = fields || feature.fields.toObject()
    srs = srs || this.getSrs()
    isXY = typeof isXY === 'boolean' ? isXY : helpers.isAxesXY(srs)
    if (this.props.coordsFunc) {
      const coords = this.props.coordsFunc(fields)
      if (Array.isArray(coords) && coords.length == 2) {
        const geometry = new gdal.Point(coords[0], coords[1])
        geometry.srs = srs
        if (!isXY) {
          geometry.swapXY()
        }
        return geometry
      } else {
        this.error(`Invalid coordsFunc result:`, coords, fields)
      }
    }
    if (this.props.geometry?.wkt) {
      const geometry = gdal.Geometry.fromWKT(fields[this.props.geometry.wkt])
      geometry.srs = srs
      return geometry
    }
    if (this.props.geometry?.x && this.props.geometry?.y) {
      const geometry = new gdal.Point(
        Number(fields[this.props.geometry.x]),
        Number(fields[this.props.geometry.y])
      )
      geometry.srs = srs
      if (!isXY) {
        geometry.swapXY()
      }
      return geometry
    }
    const geometry = feature.getGeometry()
    if (geometry && srs) {
      geometry.srs = srs
    }
    return geometry
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
