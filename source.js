const fs = require('fs')
const download = require('download')
const path = require('path')
const colors = require('colors')
const glob = require('glob')
const unzipper = require('unzipper')
const gdal = require('gdal-next')

const WKT_FIELDS = [
  'geom', 'the_geom', 'wkb_geometry', 'shape', 'geo_shape', 'geometrie'
]
const X_FIELDS = [
  'longitude', 'long', 'lon', 'lng', 'x', 'x_long', 'x_koordina',
  'x-koordinate', 'coord long', 'x_coord', 'coordenada x'
]
const Y_FIELDS = [
  'latitude', 'lat', 'y', 'y_lat', 'y_koordina', 'y-koordinate', 'coord lat',
  'y_coord', 'coordenada y'
]
const DEFAULT_SRS_STRING = 'EPSG:4326'
const DEFAULT_SRS = gdal.SpatialReference.fromEPSG(4326)
const GDAL_DRIVERS = {
  csv: 'CSV',
  geojson: 'GeoJSONSeq',
  shp: 'ESRI Shapefile',
  sqlite: 'SQLite'
}
const INPUT_NAME = 'input'
const OUTPUT_NAME = 'output'
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
  genus: {
    description: 'Genus (e.g. "Malus")',
    type: gdal.OFTString
  },
  species: {
    description: 'Species (e.g. "pumila")',
    type: gdal.OFTString
  },
  subspecies: {
    description: 'Subspecies, variety, form, etc. (e.g. "asiatica")',
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
    type: gdal.OFTDate
  },
  // TODO: Distinguish between different kinds of updates
  updated: {
    description: 'Date that data was last updated',
    type: gdal.OFTDate
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
  description: {
    description: 'Any other information not covered by other fields',
    type: gdal.OFTString
  }
}

/**
 * Download file.
 * @param {string} url Remote path to download
 * @param {string} file Local path to write
 */
async function download_file(url, file) {
  fs.mkdirSync(path.dirname(file), {recursive: true});
  fs.writeFileSync(file, await download(url));
}

/**
 * Unpack compressed or archive file to a directory.
 * @param {string} file Path of file to unpack
 * @param {string} dir Target directory
 * @param {string} format Compression or archive file format
 */
function unpack_file(file, dir, format = 'zip') {
  fs.mkdirSync(dir, {recursive: true})
  switch (format) {
    case 'zip':
      fs.createReadStream(file).pipe(unzipper.Extract({path: dir}))
      break
    default:
      throw `Format ${format} not supported`
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
   * @property {string} primary_id - Identifier of primary dataset (in cases where 2+ datasets constitute the inventory)
   * @property {string} name - Full name for the government body (e.g. City of Melbourne)
   * @property {string} short_name - Display name for the government body
   * @property {string} country - Country name (in English)
   * @property {object} centre - Centre point (in case automatic placement is bad)
   * @property {number} centre.lon - Longitude in decimal degrees (EPSG:4326)
   * @property {number} centre.lat - Latitude in decimal degrees (EPSG:4326)
   * @property {string} download - Remote file path
   * @property {string} info - Page with more information
   * @property {string} language - Language tag (e.g. "en", "en-US") of data contents, especially of common names
   * @property {object} license - License
   * @property {string} license.id - SPDX identifier: https://spdx.org/licenses (e.g. CC-BY-4.0)
   * @property {string} license.name - Name (e.g. Creative Commons Attribution 4.0 International)
   * @property {string} license.url - Page with full text of license text (e.g. https://creativecommons.org/licenses/by/4.0)
   * @property {string} format - Data file format (e.g. "geojson", "csv", "shp")
   * @property {string} compression - Compression or archive file format (e.g. "zip", "tar")
   * @property {object} srs - Spatial reference system
   * @property {number} srs.epsg - EPSG code (takes precedence)
   * @property {string} srs.proj4 - Proj4 string
   * @property {object} geometry - Geometry field (for non-spatial data like CSV).
   * @property {string} geometry.wkt - Name of field with WKT geometry (takes precedence)
   * @property {string} geometry.x - Name of field with x coordinate (longitude, easting)
   * @property {string} geometry.y - Name of field with y coordinate (latitude, northing)
   * @property {object} crosswalk - Crosswalk mapping to the opentrees schema.
   *   For each <key>: <value>, <key> is the new field name and <value> is either
   *   the old field name (string) or a function called as f(feature.properties).
   * @property {function} skip_function - Function called as f(feature.properties) for each feature (before crosswalk).
   *   Feature is excluded from output if function returns true.
   */

   /**
    * Create a dataset.
    * @param {DatasetProperties} props - Dataset properties
    * @param {string} dir - Working directory
    * @param {boolean} overwrite - Whether to overwrite existing files
    * @param {boolean} exit - Whether to throw (exit on) or print errors
    */
   constructor(props, dir, overwrite = false, exit = false) {
     this.props = props
     this.dir = dir
     this.overwrite = overwrite
     this.exit = exit
     // Apply defaults
     // NOTE: Alternatively, call get_* in methods
     this.props.compression = this.get_compression()
     this.props.format = this.get_format()
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
     if (!props.id || typeof(props.id) !== 'string') {
       errors.push(`Invalid id: ${props.id}`)
     }
     if (!props.download || typeof(props.download) !== 'string') {
       errors.push(`Invalid download: ${props.download}`)
     }
     // format
     if (props.format && !['csv', 'geojson', 'shp'].includes(props.format)) {
       errors.push(`Invalid format: ${props.format}`)
     }
     // compression
     if (props.compression && !['zip'].includes(props.compression)) {
       errors.push(`Invalid compression: ${props.compression}`)
     }
     // crosswalk
     if (props.crosswalk) {
       Object.keys(props.crosswalk).forEach(key => {
         if (!Object.keys(CROSSWALK_FIELDS).includes(key)) {
           errors.push(`Unsupported crosswalk property: ${key}`)
         }
         const value = props.crosswalk[key]
         if (!['string', 'function'].includes(typeof(value))) {
           errors.push(`Invalid type for crosswalk.${key}: ${typeof(value)}`)
         }
       })
     }
     // geometry
     if (props.geometry) {
       if (!(typeof(props.geometry) === 'object' &&
       (typeof(props.geometry.wkt) === 'string' ||
       (typeof(props.geometry.x) === 'string' && typeof(props.geometry.y) === 'string')))) {
         errors.push(`Invalid geometry: ${JSON.stringify(props.geometry)}`)
       }
     }
     // srs
     if (props.srs) {
       if (!(typeof(props.srs) === 'object' &&
       (typeof(props.srs.epsg) === 'number' || typeof(props.srs.proj4) === 'string'))) {
         errors.push(`Invalid srs: ${JSON.stringify(props.srs)}`)
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
     * Get format of remote file (unpacked).
     *
     * Either the provided format or guessed from the download url (file
     * extension, parameters) if these give a unique solution.
     *
     * @return {string} Compression format
     */
    get_format() {
      var format = this.props.format
      if (!format) {
        if (this.props.compression) {
          const format = 'shp'
          this.warn(`Assuming format ${format} for compression ${this.props.compression}`)
          return format
        }
        if (this.props.download) {
          const url = this.props.download.toLowerCase()
          const matches = [
            // file extension
            url.match(/\.([^\.\/\?\#]+)(?:$|\?|\#)/),
            // parameters
            url.match(/[\?\&\#](?:f|format|outputformat)=([^\&\s\#]+)/)]
          const formats = matches.filter(x => x != null && !['zip'].includes(x)).
            map(x => x[1]).
            filter((v, i, x) => x.indexOf(v) === i)
          if (formats.length == 1) {
            format = formats[0]
          }
          if (formats.length != 1) {
            // TODO: Move compression formats to constant
            this.error(`Failed to determine format from url: ${this.props.download}`)
          }
          if (format === 'json') {
            format = 'geojson'
          }
        }
      }
      return format
    }

    /**
     * Get compression format of remote file.
     *
     * Either the provided compression format or the file extension of the
     * download url, if it is a recognized compression format.
     *
     * @return {string} Compression format
     */
    get_compression() {
      var compression = this.props.compression
      if (!compression) {
        const url = this.props.download.toLowerCase()
        const matches = url.match(/\.([^\.\/\?\#]+)(?:$|\?|\#)/)
        if (matches && matches.length && matches[1] === 'zip') {
          // TODO: Move compression formats to constant
          compression = matches[1]
        }
      }
      return compression
    }

   /**
    * Get local path for remote file.
    * @return {string} File path
    */
   get_download_path() {
     const format = this.props.compression ? this.props.compression : this.props.format
     return path.join(this.dir, INPUT_NAME, `${INPUT_NAME}.${this.props.format}`)
   }

   /**
    * Find path of input file.
    * @param {boolean} error - Whether to raise error if no input found
    * @return {string} File path (if found) or undefined
    */
   find_input_path(error = true) {
     var input_path = null
     if (this.props.compression) {
       const pattern = path.join(this.dir, INPUT_NAME, `**/*.${this.props.format}`)
       const files = glob.sync(pattern)
       if (files.length <= 1) {
         input_path = files[0]
       } else {
         this.error(`${pattern} matches ${files.length} files`);
       }
     } else {
       input_path = this.get_download_path()
       if (!fs.existsSync(input_path)) {
         input_path = null
       }
     }
     if (!input_path && error) {
       this.error(`No input found`)
     } else {
       return input_path
     }
   }

   /**
    * Download and unpack file.
    * @param {boolean} rm - Whether to remove pack file after unpacking
    */
   get(rm = true) {
     this.download().then(this.unpack(rm))
   }

   /**
    * Download remote file.
    * @return {Promise} Promise that resolves once file is downloaded.
    */
   download() {
     if (this.props.download && (this.overwrite || !this.find_input_path())) {
       this.log(`Downloading ${this.props.download}`)
       return download_file(this.props.download, this.get_download_path())
     } else {
       return Promise.resolve()
     }
   }

   /**
    * Unpack file.
    * @param {boolean} rm - Whether to remove pack file after unpacking
    */
   unpack(rm = true) {
     if (this.props.compression && (this.overwrite || !this.find_input_path(false))) {
       const unpack_path = this.get_download_path()
       this.log(`Unpacking ${unpack_path}`)
       unpack_file(unpack_path, path.join(this.dir, INPUT_NAME), this.props.compression)
       if (rm) {
        fs.unlinkSync(unpack_path)
       }
     }
   }

   /**
    * Get input spatial reference system (SRS).
    *
    * Either the provided SRS, the SRS of the input, or the default SRS.
    *
    * @return {gdal.SpatialReference} Input SRS
    */
   get_srs() {
     var srs = this.props.srs
     if (srs) {
       if (srs.epsg) {
         srs = gdal.SpatialReference.fromEPSG(srs.epsg)
       } else if (srs.proj4) {
         srs = gdal.SpatialReference.fromProj4(srs.proj4)
       } else {
         this.error(`Unsupported srs properties: [${Object.keys(srs).join(', ')}]`)
       }
     }
     if (!srs) {
       // NOTE: Uses first layer
       // TODO: Pass pre-loaded layer
       const input = gdal.open(this.find_input_path())
       srs = input.layers.get(0).srs
       input.close()
     }
     if (!srs) {
       // Apply default
       srs = DEFAULT_SRS
       this.warn(`Using default SRS: ${DEFAULT_SRS_STRING}`)
     }
     return srs
   }

   /**
    * Get input geometry.
    *
    * Either the provided geometry or the geometry guessed from input field names.
    *
    * @return {object} Name of field(s) with WKT geometry (wkt) or x and y coordinates (x, y).
    */
   get_geometry() {
     var geom = this.props.geometry
     if (!geom) {
       // Read field names from file
       // NOTE: Uses first layer
       const input = gdal.open(this.find_input_path())
       const names = input.layers.get(0).fields.getNames()
       input.close()
       // Guess wkt field
       const matches = names.filter(x => WKT_FIELDS.includes(x.toLowerCase()))
       if (matches.length) {
         geom = matches[0]
         if (matches.length > 1) {
           this.warn(`Using first matching WKT field: ${matches.join(', ')}`)
         }
       }
     }
     if (!geom) {
       // Guess x, y fields
       const x_matches = names.filter(x => X_FIELDS.includes(x.toLowerCase()))
       const y_matches = names.filter(y => Y_FIELDS.includes(y.toLowerCase()))
       if (x_matches.length && y_matches.length) {
         geom = {x: x_matches[0], y: y_matches[0]}
         if (x_matches.length > 1) {
           this.warn(`Using first matching X field: ${x_matches.join(', ')}`)
         }
         if (y_matches.length > 1) {
           this.warn(`Using first matching Y field: ${y_matches.join(', ')}`)
         }
       }
     }
     if (!geom) {
       this.error(`Failed to guess geometry fields`)
     }
     return geom
   }

   /**
    * Write VRT (OGR Virtual Format) for input file.
    *
    * Applies only to tabular data with feature geometry in fields.
    * If not provided, attempts to guess the geometry field(s).
    * Writes to the same path as the input file, but with the added file extension 'vrt'.
    *
    * See https://gdal.org/drivers/vector/vrt.html
    *
    * @return {string} Path to VRT file.
    */
   write_vrt() {
     var srs = this.props.srs
     if (!srs) {
       srs = DEFAULT_SRS_STRING
       this.warn(`Using default SRS: (${srs})`)
     }
     const geom = this.get_geometry()
     // Build <GeometryField> arguments
     if (geom.wkt) {
       geomfield = `encoding="WKT" field="${geom.wkt}"`
     } else if (geom.x && geom.y) {
       geomfield = `encoding="PointFromColumns" x="${geom.x}" y="${geom.y}"`
     } else {
       this.error(`Invalid geometry properties: ${Object.keys(geom).join(', ')}`)
     }
     // Build VRT
     const parts = path.parse(input_path)
     const vrt =
     `<OGRVRTDataSource>
       <OGRVRTLayer name="${parts.name}">
           <SrcDataSource relativeToVRT="1">${parts.base}</SrcDataSource>
           <GeometryType>wkbPoint</GeometryType>
           <LayerSRS>${srs}</LayerSRS>
           <GeometryField ${geomfield} reportSrcColumn="FALSE"/>
       </OGRVRTLayer>
     </OGRVRTDataSource>`
     // NOTE: Always overwrites
     const vrt_path = path.join(parts.dir, `${parts.base}.vrt`)
     fs.writeFileSync(vrt_path, vrt)
     return vrt_path
   }

   /**
    * Get output field definitions.
    *
    * Output fields are either the result of the crosswalk (if provided) or
    * the same as the input fields.
    *
    * @return {gdal.FieldDefn[]} Output field definitions
    */
   get_field_definitions() {
     if (this.props.crosswalk) {
         // NOTE: Input fields are removed
         const fields = Object.keys(this.props.crosswalk).map(
           key => new gdal.FieldDefn(key, CROSSWALK_FIELDS[key].type))
     } else {
       // NOTE: Uses first layer
       // TODO: Pass pre-loaded layer
       const input = gdal.open(this.find_input_path())
       const fields = input.layers.get(0).fields.map(field => field)
       input.close()
     }
     return fields
   }

   /**
    * Map feature fields to output schema.
    * @param {object} fields - Input feature fields.
    * @return {object} Output feature fields with crosswalk applied.
    */
   map_fields(fields) {
     var output_fields = {}
     for (key in this.props.crosswalk) {
         new_fields[key] = (typeof crosswalk[key] === 'function') ?
           crosswalk[key](fields) : fields[crosswalk[key]];
     };
     return output_fields
   }

   /**
    * Process input file and write to output.
    * @param {string} format - Output format (e.g. "csv", "geojson").
    * @param {string} name - Output basename
    * @return {string} Path to output file.
    */
   process(format, name = OUTPUT_NAME) {
     const output_path = path.join(dir, `${name}.${format}`)
     if (fs.existsSync(output_path)) {
       return
     }
     var input_path = this.find_input_path()
     this.log(`Processing ${input_path}`)
     // Write VRT file for datasets without explicit geometries
     if (['csv'].includes(this.format)) {
       input_path = this.write_vrt()
     }
     // Read input
     const input = gdal.open(input_path)
     if (input.layers.count() > 1) {
       this.warn(`Using first of ${input.layers.count()} layers`)
     }
     const fields = this.get_field_definitions()
     // Prepare output
     if (format === 'csv') {
       // GEOMETRY=AS_WKT writes WKT geometry to 'WKT' field
       // GEOMETRY=AS_XY, CREATE_CSVT=YES, OGR_WKT_PRECISION=6 not supported
       // TODO: Write VRT (if needed)
       const output = gdal.drivers.get('CSV').create(
         output_path, 0, 0, 0, gdal.GDT_Byte, ['GEOMETRY=AS_WKT'])
     } else {
       const driver = GDAL_DRIVERS[format]
       if (driver) {
         const output = gdal.drivers.get(driver).create(output_path)
       } else {
         this.error(`Unsupported output format: ${format}`)
       }
     }
     const output_layer = output.layers.create(name, DEFAULT_SRS, gdal.wkbPoint)
     output_layer.fields.add(fields)
     const input_srs = this.get_srs()
     // Determine if a coordinate transformation is needed
     // TODO: Make and test transform, check whether points are unchanged?
     if (input_srs.isSame(DEFAULT_SRS) ||
       (input_srs.isSameGeogCS(DEFAULT_SRS) &&
       (input_srs.isProjected() == DEFAULT_SRS.isProjected()))) {
       const transform = null
     } else {
       const transform = new gdal.CoordinateTransformation(input_srs, DEFAULT_SRS)
     }
     // Populate output
     input.layers.get(0).features.forEach(function(input_feature) {
       const input_fields = input_feature.fields.toObject()
       if (this.skip_function && this.skip_function(input_fields)) {
          continue
       }
       const output_feature = new gdal.Feature(output_layer)
       if (this.props.crosswalk) {
         const output_fields = this.map_fields(input_fields)
         output_feature.fields.set(Object.values(output_fields))
         if (!transform) {
           output_feature.setGeometry(input_feature.getGeometry())
         }
       } else {
         output_feature.setFrom(input_feature)
       }
       if (transform) {
         const point = input_feature.getGeometry()
         point.transform(transform)
         output_feature.setGeometry(point)
       }
       // TODO: flush?
       output_layer.features.add(output_feature)
     })
     // Write
     output.close()
     input.close()
     return output_path
   }
 }

module.exports = Source
