/**
 * @module types
 */

/**
 * File download method.
 *
 * - manual: Download manually (e.g. clicking on a button in the browser)
 * - file: Download directly
 * - arcgis: Download with the ArcGIS Feature Layer API with paginated requests
 * - browser: Render in a browser and save the resulting webpage
 *
 * @typedef {'manual'|'file'|'arcgis'|'browser'} DownloadMethod
 */

/**
 * Browser webpage export format.
 *
 * - mhtml: Webpage with resources saved in a single file
 * - html: Webpage HTML only
 * - png: Screenshot as PNG image
 * - pdf: Webpage as PDF document
 *
 * @typedef {'mhtml'|'html'|'png'|'pdf'} BrowserFormat
 */

/**
 * File type.
 *
 * - data: Data file (Source.props.data)
 * - metadata: Metadata file (Source.props.metadata)
 * - license: License file (Source.props.license)
 *
 * @typedef {'data'|'metadata'|'license'} FileType
 */

/**
 * Checksum file descriptor.
 *
 * @typedef {object} ChecksumFile
 * @property {string} checksum - File checksum (base-64 md5 hash).
 */

/**
 * URL file descriptor.
 *
 * @typedef {object} UrlFile
 * @property {string} url - File URL.
 * @property {DownloadMethod} method
 * @property {BrowserFormat} [format]
 */

/**
 * Archive file descriptor.
 *
 * @typedef {ChecksumFile|UrlFile} ArchiveFile
 */

/**
 * Source file descriptor.
 *
 * @typedef {string|{manual: string}|{file: string}|{browser: string}|{arcgis: string}} SourceFile
 */

/**
 * Archive entry.
 *
 * @typedef {object} ArchiveEntry
 * @property {string} path - File path.
 * @property {string} checksum - File checksum (base-64 md5 hash).
 * @property {Date} date - Date of acquisition.
 * @property {boolean} [maxDate] - Whether `date` is a maximum-possible date.
 * @property {Date} [dateAdded] - Date added to archive, if not `date`
 * (if file was registered manually rather than downloaded).
 * @property {string} [url] - File URL.
 * @property {DownloadMethod} [method] - File download method.
 * @property {BrowserFormat} [format] - Browser webpage export format
 * (if `method` is `browser`).
 * @property {boolean} [existed] - Whether file already existed in archive, in
 * which case `path` is the path of the existing file.
 * @property {object} [props] - Additional properties.
 */

/**
 * Properties used by {@link Source} for data processing.
 *
 * @typedef {object} SourceProperties
 * @property {string} id - Identifier prepended to console output.
 * @property {SourceFile|SourceFile[]} data - Data file(s).
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
 * @property {function} addressFunc - Function that takes an object (of feature
 * field values before the crosswalk) and returns an address string for
 * geocoding.
 * @property {function} deleteFunc - Function that takes an object (of feature
 * field values before the crosswalk) and returns a value (e.g. `x =>
 * x['HEALTH'] === 'dead'`). The feature is excluded from the output if the
 * returned value evaluates to `true`.
 * @property {SourceFile|SourceFile[]} metadata - Metadata webpage(s) or
 * file(s).
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
 * @property {string} scope - Scope or type of the inventory
 * (e.g. `tree`, `tree-street`, `tree-street-main`, `tree-park`, `tree-notable`).
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
 * Infraspecies epithet.
 *
 * @typedef {object} Infraspecies
 * @property {string} rank - Rank (`subsp.`, `var.`, `f.`, `subvar.`, `subf.`).
 * @property {string} epithet - Epithet (lowercase: e.g. `pontica`).
 */

/**
 * Hybrid name.
 *
 * Represents a secondary scientific name in a hybrid formula.
 *
 * @typedef {object} Hybrid
 * @property {string} genus - Genus (capitalized: e.g. `Malus`).
 * @property {string} subgenus - Subgenus (capitalized: e.g. `Malus`).
 * @property {string} species - Specific epithet (lowercase: e.g. `pumila`).
 * @property {Infraspecies[]} infraspecies - Infraspecific epithets.
 * @property {string} cultivar - Cultivar (title case: e.g. `Golden Delicious`).
 */

/**
 * Scientific name.
 *
 * @typedef {object} ParsedScientificName
 * @property {string} head - Unparsed head.
 * @property {string} uninomial – Uninomial name (maybe `genus`).
 * @property {string} genus - Genus (capitalized: e.g. `Malus`).
 * @property {string} subgenus - Subgenus (capitalized: e.g. `Malus`).
 * @property {string} species - Specific epithet (lowercase: e.g. `pumila`).
 * @property {Infraspecies[]} infraspecies - Infraspecific epithets.
 * @property {string} cultivar - Cultivar (title case: e.g. `Golden Delicious`).
 * @property {boolean} hybrid - Whether this is a hybrid.
 * @property {boolean} hybridGenus – Whether `genus` is a nothogenus (e.g. `× Sorbopyrus`).
 * @property {Hybrid[]} hybrids – Secondary names in a hybrid formula.
 * @property {string} tail - Unparsed tail.
 */

exports.unused = {}
