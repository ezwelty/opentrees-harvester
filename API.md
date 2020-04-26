## Classes

<dl>
<dt><a href="#Source">Source</a></dt>
<dd><p>Class representing a source dataset.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#SourceProperties">SourceProperties</a> : <code>object</code></dt>
<dd><p>Properties used by <a href="#Source">Source</a> for data processing.</p>
</dd>
<dt><a href="#SourcePropertiesExtended">SourcePropertiesExtended</a> : <code><a href="#SourceProperties">SourceProperties</a></code></dt>
<dd><p>Additional properties not used by <a href="#Source">Source</a> but used downstream.</p>
</dd>
</dl>

<a name="Source"></a>

## Source
Class representing a source dataset.

**Kind**: global class  

* [Source](#Source)
    * [new Source(props, dir, [options])](#new_Source_new)
    * [.validate([error])](#Source+validate) ⇒ <code>Array.&lt;Array.&lt;string, \*&gt;&gt;</code>
    * [.get([overwrite])](#Source+get) ⇒ <code>Promise</code>
    * [.process(file, [options])](#Source+process)
    * [.sample([options])](#Source+sample) ⇒ <code>object.&lt;string, Array&gt;</code>
    * [.glimpse([options])](#Source+glimpse)
    * [.empty()](#Source+empty)
    * [.is_empty()](#Source+is_empty) ⇒ <code>boolean</code>
    * [.download_file(url)](#Source+download_file) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.unpack_file(file, [rm])](#Source+unpack_file) ⇒ <code>Promise.&lt;Array.&lt;string&gt;&gt;</code>
    * [.get_file(url)](#Source+get_file) ⇒ <code>Promise.&lt;Array.&lt;sring&gt;&gt;</code>
    * [.get_files([overwrite])](#Source+get_files) ⇒ <code>Promise.&lt;Array.&lt;string&gt;&gt;</code>
    * [.execute()](#Source+execute) ⇒ <code>Promise</code>
    * [.find()](#Source+find) ⇒ <code>string</code>
    * [.open()](#Source+open) ⇒ <code>gdal.Dataset</code>
    * [.close()](#Source+close)
    * [.open_vrt([keep_geometry_fields])](#Source+open_vrt) ⇒ <code>gdal.Dataset</code>
    * [.close_vrt()](#Source+close_vrt)
    * [.get_srs_string()](#Source+get_srs_string) ⇒ <code>string</code>
    * [.get_srs()](#Source+get_srs) ⇒ <code>gdal.SpatialReference</code>
    * [.get_geometry()](#Source+get_geometry) ⇒ <code>Object</code> \| <code>undefined</code>
    * [.get_vrt([keep_geometry_fields])](#Source+get_vrt) ⇒ <code>string</code>
    * [.success(msg, ...objects)](#Source+success)
    * [.log(msg, ...objects)](#Source+log)
    * [.warn(msg, ...objects)](#Source+warn)
    * [.error(msg, ...objects)](#Source+error)


* * *

<a name="new_Source_new"></a>

### new Source(props, dir, [options])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| props | [<code>SourceProperties</code>](#SourceProperties) |  | Source properties. |
| dir | <code>string</code> |  | Local directory to which remote files are downloaded and where local files are searched for. |
| [options] | <code>object</code> |  |  |
| [options.exit] | <code>boolean</code> | <code>true</code> | Whether to throw errors or print them to the console. |
| [options.default_srs] | <code>string</code> | <code>&quot;EPSG:4326&quot;</code> | Spatial reference system to assume if none is defined in `props.srs` and none can be read from the input files. |


* * *

<a name="Source+validate"></a>

### source.validate([error]) ⇒ <code>Array.&lt;Array.&lt;string, \*&gt;&gt;</code>
Validate source properties.

**Kind**: instance method of [<code>Source</code>](#Source)  
**Returns**: <code>Array.&lt;Array.&lt;string, \*&gt;&gt;</code> - Errors in the format [message, value].  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [error] | <code>boolean</code> | <code>false</code> | Whether to raise errors. |


* * *

<a name="Source+get"></a>

### source.get([overwrite]) ⇒ <code>Promise</code>
Prepare remote source data for processing.

Downloads remote files (`this.props.download`), unpacks compressed or
archive files, and executes shell commands (`this.props.execute`).

**Kind**: instance method of [<code>Source</code>](#Source)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [overwrite] | <code>boolean</code> | <code>false</code> | Whether to proceed if working directory is not empty (see [is_empty](#Source+is_empty)). |


* * *

<a name="Source+process"></a>

### source.process(file, [options])
Process input and write to output.

Reading, writing, and coordinate transformations are performed by
[GDAL](https://gdal.org) via the
[node-gdal-next](https://www.npmjs.com/package/gdal-next) bindings.

Processing steps include a schema crosswalk (`this.props.crosswalk`),
skipping features by field values (`this.props.delFunc`), reducing complex
geometries to centroid points (`options.centroids`), and skipping features
outside a bounding box (`options.bounds`). For files without explicit
geometries, a temporary [VRT](https://gdal.org/drivers/vector/vrt.html)
file is created (see [get_vrt](#Source+get_vrt)).

**Kind**: instance method of [<code>Source</code>](#Source)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| file | <code>string</code> |  | Output file path. |
| [options] | <code>object</code> |  | Output options. |
| [options.driver] | <code>string</code> |  | Name of GDAL driver to use to write to the output file (see https://gdal.org/drivers/vector). Guessed from file extension if not provided. |
| [options.creation] | <code>Array.&lt;string&gt;</code> \| <code>object</code> |  | Driver-specific dataset creation options (see https://gdal.org/drivers/vector). Only default, for 'CSV', is `['GEOMETRY=AS_WKT']` to include feature geometry in output. |
| [options.overwrite] | <code>boolean</code> | <code>false</code> | Whether to proceed if `file` already exists. |
| [options.srs] | <code>string</code> | <code>&quot;+init&#x3D;epsg:4326&quot;</code> | Output spatial reference system in any format supported by [OGRSpatialReference.SetFromUserInput()](https://gdal.org/api/ogrspatialref.html#classOGRSpatialReference_1aec3c6a49533fe457ddc763d699ff8796). Use 'EPSG:*' for (latitude, longitude) and '+init=epsg:*' (PROJ<6 behavior) for (longitude, latitude). If it is the same as the input SRS, axis order will remain unchanged regardless. |
| [options.centroids] | <code>boolean</code> | <code>false</code> | Whether to reduce non-point geometries to centroids. |
| [options.keep_invalid] | <code>boolean</code> | <code>false</code> | Whether to keep features with empty or invalid geometries. |
| [options.keep_fields] | <code>boolean</code> | <code>false</code> | Whether to keep the input feature fields alongside the result of the schema crosswalk (`this.props.crosswalk`). |
| [options.keep_geometry_fields] | <code>boolean</code> | <code>false</code> | Whether to keep the input feature geometry fields. Applies only to inputs for which a VRT file is written (see [get_vrt](#Source+get_vrt)) and if `options.keep_fields` is also `true`. |
| [options.prefix] | <code>string</code> | <code>&quot;_&quot;</code> | String to append to input field names to prevent collisions with output field names. Applies only if `options.keep_fields` is `true`. |
| [options.bounds] | <code>Array.&lt;number&gt;</code> |  | Bounding box in output SRS (`options.srs`) in the format [xmin, ymin, xmax, ymax]. If provided, features outside the bounds are skipped. |


* * *

<a name="Source+sample"></a>

### source.sample([options]) ⇒ <code>object.&lt;string, Array&gt;</code>
Sample unique field values from input.

**Kind**: instance method of [<code>Source</code>](#Source)  
**Returns**: <code>object.&lt;string, Array&gt;</code> - Object of unique field values with field
names as keys.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>object</code> |  |  |
| [options.n] | <code>number</code> | <code>1000</code> | Maximum number of features to sample. |
| [options.max] | <code>number</code> | <code>100</code> | Maximum number of unique values to collect for each field. |
| [options.sort] | <code>boolean</code> | <code>true</code> | Whether to sort values. |


* * *

<a name="Source+glimpse"></a>

### source.glimpse([options])
Print table of input field names, types, and unique values.

**Kind**: instance method of [<code>Source</code>](#Source)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>object</code> |  | Options to pass to [sample](#Source+sample), plus: |
| [options.sample] | <code>object.&lt;string, Array&gt;</code> |  | Result of [sample](#Source+sample). |
| [options.truncate] | <code>number</code> | <code>1280</code> | Maximum number of characters to print per field. |
| [options.widths] | <code>Array.&lt;number&gt;</code> | <code>[20, 10, 130]</code> | Column widths for field names, types, and unique values, respectively. |
| [options.sep] | <code>string</code> | <code>&quot;·&quot;</code> | Separator between unique values. |


* * *

<a name="Source+empty"></a>

### source.empty()
Empty and remove the source directory.

**Kind**: instance method of [<code>Source</code>](#Source)  

* * *

<a name="Source+is_empty"></a>

### source.is\_empty() ⇒ <code>boolean</code>
Check whether the source directory is missing or empty of files.

Checks any child directories recursively and ignores dotfiles (.*).

**Kind**: instance method of [<code>Source</code>](#Source)  
**Returns**: <code>boolean</code> - Whether source directory is empty.  

* * *

<a name="Source+download_file"></a>

### source.download\_file(url) ⇒ <code>Promise.&lt;string&gt;</code>
Download a remote file to the source directory.

**Kind**: instance method of [<code>Source</code>](#Source)  
**Returns**: <code>Promise.&lt;string&gt;</code> - Resolves to the path of the downloaded file.  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | Path to the remote file. |


* * *

<a name="Source+unpack_file"></a>

### source.unpack\_file(file, [rm]) ⇒ <code>Promise.&lt;Array.&lt;string&gt;&gt;</code>
Unpack a compressed or archive local file to the source directory.

Currently supports zip, tar, tar.bz2, and tar.gz via
[decompress](https://www.npmjs.com/package/decompress). Support can be
added for bz2 and gz by adding the corresponding
[plugins](https://www.npmjs.com/search?q=keywords:decompressplugin) to the
dependencies.

**Kind**: instance method of [<code>Source</code>](#Source)  
**Returns**: <code>Promise.&lt;Array.&lt;string&gt;&gt;</code> - Resolves to the paths of the unpacked files (if
any) or the path of the original file.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| file | <code>string</code> |  | Path to the local file. |
| [rm] | <code>boolean</code> | <code>true</code> | Whether to remove the original file if unpacked successfully. |


* * *

<a name="Source+get_file"></a>

### source.get\_file(url) ⇒ <code>Promise.&lt;Array.&lt;sring&gt;&gt;</code>
Download and unpack a remote file to the source directory.

**Kind**: instance method of [<code>Source</code>](#Source)  
**Returns**: <code>Promise.&lt;Array.&lt;sring&gt;&gt;</code> - Resolves to the paths of the unpacked files (if
any) or the local path of the downloaded file.  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | Path to the remote file. |


* * *

<a name="Source+get_files"></a>

### source.get\_files([overwrite]) ⇒ <code>Promise.&lt;Array.&lt;string&gt;&gt;</code>
Download and unpack remote files to the source directory.

Downloads all file paths in `this.props.download` and unpacks any
compressed or archive files.

**Kind**: instance method of [<code>Source</code>](#Source)  
**Returns**: <code>Promise.&lt;Array.&lt;string&gt;&gt;</code> - Resolves to the paths of the downloaded and
unpacked local files.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [overwrite] | <code>boolean</code> | <code>false</code> | Whether to proceed if working directory is not empty (see [is_empty](#Source+is_empty)). |


* * *

<a name="Source+execute"></a>

### source.execute() ⇒ <code>Promise</code>
Execute shell commands from the source directory.

Executes all shell commands in `this.props.execute` from the source
directory (`this.dir`).

**Kind**: instance method of [<code>Source</code>](#Source)  

* * *

<a name="Source+find"></a>

### source.find() ⇒ <code>string</code>
Find path to input file.

Searches for all non-dotfiles in the source directory recursively and
attempts to guess which file to pass to GDAL based on file extensions.
Throws an error if no file is found or if multiple candidate files are
found.

**Kind**: instance method of [<code>Source</code>](#Source)  
**Returns**: <code>string</code> - File path.  

* * *

<a name="Source+open"></a>

### source.open() ⇒ <code>gdal.Dataset</code>
Open input file with GDAL.

**Kind**: instance method of [<code>Source</code>](#Source)  
**Returns**: <code>gdal.Dataset</code> - See the documentation for
[node-gdal-next](https://contra.io/node-gdal-next/classes/gdal.Dataset.html).
Result is cached until closed with [close](#Source+close).  

* * *

<a name="Source+close"></a>

### source.close()
Close input file if open with GDAL.

**Kind**: instance method of [<code>Source</code>](#Source)  

* * *

<a name="Source+open_vrt"></a>

### source.open\_vrt([keep_geometry_fields]) ⇒ <code>gdal.Dataset</code>
Open input file with GDAL via a VRT file.

Opens the input file via a virtual format (VRT) file written to the dotfile
`.vrt`. The contents of the file is built by [get_vrt](#Source+get_vrt).

**Kind**: instance method of [<code>Source</code>](#Source)  
**Returns**: <code>gdal.Dataset</code> - See the documentation for
[node-gdal-next](https://contra.io/node-gdal-next/classes/gdal.Dataset.html).
The result is cached until closed with [close_vrt](#Source+close_vrt).  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [keep_geometry_fields] | <code>boolean</code> | <code>false</code> | Whether the VRT file should return geometry fields as regular feature fields. |


* * *

<a name="Source+close_vrt"></a>

### source.close\_vrt()
Close input file if open with GDAL via a VRT file.

**Kind**: instance method of [<code>Source</code>](#Source)  

* * *

<a name="Source+get_srs_string"></a>

### source.get\_srs\_string() ⇒ <code>string</code>
Get spatial reference system (SRS) of input as a string.

**Kind**: instance method of [<code>Source</code>](#Source)  
**Returns**: <code>string</code> - Either the provided SRS (`this.props.srs`), the SRS read
from the input file (as well-known-text), or the default SRS
(`this.options.default_srs`).  

* * *

<a name="Source+get_srs"></a>

### source.get\_srs() ⇒ <code>gdal.SpatialReference</code>
Get spatial reference system (SRS) of input.

**Kind**: instance method of [<code>Source</code>](#Source)  
**Returns**: <code>gdal.SpatialReference</code> - SRS object initialized by
`gdal.SpatialReference.fromUserInput()` from the result of
[get_srs_string](#Source+get_srs_string). See the documentation for
[node-gdal-next](https://contra.io/node-gdal-next/classes/gdal.SpatialReference.html#method-fromUserInput).  

* * *

<a name="Source+get_geometry"></a>

### source.get\_geometry() ⇒ <code>Object</code> \| <code>undefined</code>
Get geometry field name(s) of input.

**Kind**: instance method of [<code>Source</code>](#Source)  
**Returns**: <code>Object</code> \| <code>undefined</code> - Names of geometry fields either provided (`this.props.srs`) or guessed from field names, or `undefined` if the input already has explicit geometries.  

* * *

<a name="Source+get_vrt"></a>

### source.get\_vrt([keep_geometry_fields]) ⇒ <code>string</code>
Get VRT (OGR Virtual Format) file content.

For files without explicit geometries (e.g. tabular text files), a temporary
[VRT file](https://gdal.org/drivers/vector/vrt.html) can be created listing
the spatial reference system (see [get_srs_string](#Source+get_srs_string)) and
geometry field names (see [get_geometry](#Source+get_geometry)) for GDAL to use.

**Kind**: instance method of [<code>Source</code>](#Source)  
**Returns**: <code>string</code> - VRT file content.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [keep_geometry_fields] | <code>boolean</code> | <code>false</code> | Whether VRT file should return geometry fields as regular feature fields. |


* * *

<a name="Source+success"></a>

### source.success(msg, ...objects)
Print success message to console (green).

**Kind**: instance method of [<code>Source</code>](#Source)  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>string</code> | Message prepended with green tag (`[props.id]`). |
| ...objects | <code>\*</code> | Additional objects passed to `console.log()`. |


* * *

<a name="Source+log"></a>

### source.log(msg, ...objects)
Print message to console (cyan).

**Kind**: instance method of [<code>Source</code>](#Source)  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>string</code> | Message prepended with cyan tag (`[props.id]`). |
| ...objects | <code>\*</code> | Additional objects passed to `console.log()`. |


* * *

<a name="Source+warn"></a>

### source.warn(msg, ...objects)
Print warning to console (yellow).

**Kind**: instance method of [<code>Source</code>](#Source)  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>string</code> | Message prepended with yellow tag (`[props.id]`). |
| ...objects | <code>\*</code> | Additional objects passed to `console.log()`. |


* * *

<a name="Source+error"></a>

### source.error(msg, ...objects)
Throw or print error to console (red).

**Kind**: instance method of [<code>Source</code>](#Source)  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>string</code> | Message prepended with red tag (`[props.id]`). |
| ...objects | <code>\*</code> | Additional objects passed directly to `console.error()` or appended to error via `util.inspect()`. |


* * *

<a name="SourceProperties"></a>

## SourceProperties : <code>object</code>
Properties used by [Source](#Source) for data processing.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Identifier prepended to console output. |
| download | <code>string</code> \| <code>Array.&lt;string&gt;</code> | Path to remote files to download and unpack. |
| execute | <code>string</code> \| <code>Array.&lt;string&gt;</code> | Shell commands executed from working directory (`Source.dir`) after file download and unpack. In `npm run` commands, prepend the `INIT_CWD` variable to paths to the files (https://docs.npmjs.com/cli/run-script). |
| srs | <code>string</code> | Spatial reference system in any format supported by [OGRSpatialReference.SetFromUserInput()](https://gdal.org/api/ogrspatialref.html#classOGRSpatialReference_1aec3c6a49533fe457ddc763d699ff8796). |
| geometry | <code>object</code> | Geometry field names for formats without explicit geometries (e.g. tabular text files like CSV). If not provided, will attempt to guess from field names. |
| geometry.wkt | <code>string</code> | Name of field with well-known-text (wkt) geometry. If provided, takes precedence over x, y. |
| geometry.x | <code>string</code> | Name of field with x coordinate (longitude, easting). |
| geometry.y | <code>string</code> | Name of field with y coordinate (latitude, northing). |
| crosswalk | <code>Object.&lt;string, (string\|function())&gt;</code> | Crosswalk mapping to a target schema. For each `key: value` pair, `key` is the new field name and `value` is either the old field name (e.g. `height: 'HEIGHT'`) or a function that takes an object (of feature field values) and returns a value (e.g. `height: obj => obj.HEIGHT / 100`). |
| delFunc | <code>function</code> | Function that takes an object (of feature field values before the crosswalk) and returns a value (e.g. `obj => obj.HEALTH === 'dead'`). The feature is excluded from the output if the returned value evaluates to `true`. |
| coordsFunc | <code>function</code> | Function that takes an object (of feature field values before the crosswalk) and returns a number array of point coordinates `[x, y]`. This is a useful alternative to `geometry` if the coordinates need to be extracted from field values (e.g. `obj => obj.XY.split(';').map(Number)`). |


* * *

<a name="SourcePropertiesExtended"></a>

## SourcePropertiesExtended : [<code>SourceProperties</code>](#SourceProperties)
Additional properties not used by [Source](#Source) but used downstream.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| pending | <code>string</code> | Pending issues preventing processing. |
| primary | <code>string</code> | `id` of the primary source (for grouping sources together). |
| long | <code>string</code> | Full name of the government body, university, or other institution (e.g. `City of Melbourne`). |
| short | <code>string</code> | Short name (e.g. `Melbourne`). |
| country | <code>string</code> | Country name in English (e.g. `Australia`). |
| centre | <code>object</code> | Centre point (for map label placement). |
| centre.lon | <code>number</code> | Longitude in decimal degrees (EPSG:4326). |
| centre.lat | <code>number</code> | Latitude in decimal degrees (EPSG:4326). |
| info | <code>string</code> | Path to page with more information. |
| language | <code>string</code> | Language of contents as an [ISO 639-1](https://en.wikipedia.org/wiki/ISO_639-1) code (e.g. `en`) and an optional [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) region code (e.g. `en-AU`). |
| license | <code>object</code> | Data license. |
| license.id | <code>string</code> | License identifier from the Software Package Data Exchange (SPDX) [license list](https://spdx.org/licenses/) (e.g. `CC-BY-4.0`). |
| license.name | <code>string</code> | License name (e.g. `Creative Commons Attribution 4.0 International`). |
| license.url | <code>string</code> | Path to page with license text (e.g. `https://creativecommons.org/licenses/by/4.0`). |


* * *

