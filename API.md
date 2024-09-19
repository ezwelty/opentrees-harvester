## Modules

<dl>
<dt><a href="#module_load">load</a></dt>
<dd><p>Load the provided source datasets.</p>
</dd>
<dt><a href="#module_names">names</a></dt>
<dd><p>Parse scientific names.</p>
</dd>
<dt><a href="#module_source">source</a></dt>
<dd><p>Describe a source dataset.</p>
</dd>
<dt><a href="#module_sourceio">sourceio</a></dt>
<dd><p>Read and write source properties.</p>
</dd>
<dt><a href="#module_taxamatch">taxamatch</a></dt>
<dd><p>Match scientific names.</p>
</dd>
<dt><a href="#module_types">types</a></dt>
<dd></dd>
</dl>

## Constants

<dl>
<dt><a href="#LICENSES">LICENSES</a> : <code>Object</code></dt>
<dd><p>Common data licenses.</p>
<p>Each property is a license identifier. The value is an object with the
following properties:</p>
<ul>
<li>spdx: Whether the license is in the Software Package Data Exchange (SPDX)
<a href="https://spdx.org/licenses/">license list</a>.</li>
<li>name: License name.</li>
<li>url: License URL.</li>
</ul>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#downloadFile">downloadFile(url, dir)</a> ⇒ <code>object</code> | <code>null</code></dt>
<dd><p>Download file and compute MD5 hash of the stream.</p>
</dd>
<dt><a href="#loadPage">loadPage(url, page)</a> ⇒ <code>Promise.&lt;puppeteer.HTTPResponse&gt;</code></dt>
<dd><p>Load URL in browser page.</p>
</dd>
<dt><a href="#readPageHtml">readPageHtml(page)</a> ⇒ <code>Promise.&lt;string&gt;</code></dt>
<dd><p>Read browser page as HTML.</p>
</dd>
<dt><a href="#readPageMhtml">readPageMhtml(page)</a> ⇒ <code>Promise.&lt;string&gt;</code></dt>
<dd><p>Read browser page as MHTML.</p>
</dd>
<dt><a href="#readPagePng">readPagePng(page)</a> ⇒ <code>Promise.&lt;Buffer&gt;</code></dt>
<dd><p>Read browser page as PNG.</p>
</dd>
<dt><a href="#readPagePdf">readPagePdf(page)</a> ⇒ <code>Promise.&lt;Buffer&gt;</code></dt>
<dd><p>Read browser page as PDF.</p>
</dd>
<dt><a href="#md5">md5(x)</a> ⇒ <code>string</code></dt>
<dd><p>Compute MD5 hash.</p>
</dd>
<dt><a href="#hashFile">hashFile(file)</a> ⇒ <code>Promise.&lt;string&gt;</code></dt>
<dd><p>Compute MD5 hash of a file read as a stream.</p>
<p>Uses base64 encoding by default as it was found to be much faster for large
binary files and same as UTF-8 for text.</p>
</dd>
<dt><a href="#buildPath">buildPath(url, checksum, date)</a> ⇒ <code>string</code></dt>
<dd><p>Build archive path.</p>
</dd>
<dt><a href="#log">log(params)</a> ⇒ <code>Promise.&lt;ArchiveEntry&gt;</code></dt>
<dd><p>Add an entry to the archive log.</p>
</dd>
<dt><a href="#guessFilename">guessFilename(headers, defaultBasename, url)</a> ⇒ <code>string</code></dt>
<dd><p>Guess filename from HTTP response headers.</p>
</dd>
<dt><a href="#logData">logData(params)</a> ⇒ <code>ArchiveEntry</code></dt>
<dd><p>Write data to file and add to log.</p>
</dd>
<dt><a href="#search">search(params, options)</a> ⇒ <code>Array.&lt;ArchiveEntry&gt;</code></dt>
<dd><p>Search log for matching entries.</p>
</dd>
<dt><a href="#geocode">geocode(address)</a> ⇒ <code>Promise.&lt;object&gt;</code></dt>
<dd><p>Geocode address.</p>
</dd>
<dt><a href="#geocodeCached">geocodeCached(address)</a> ⇒ <code>Promise.&lt;object&gt;</code></dt>
<dd><p>Geocode address with caching.</p>
</dd>
<dt><a href="#buildMapFromCrosswalks">buildMapFromCrosswalks(crosswalks)</a> ⇒ <code>Array.&lt;Object.&lt;string, Array.&lt;string&gt;&gt;&gt;</code></dt>
<dd><p>Build source-target field name map from crosswalks.</p>
</dd>
<dt><a href="#matchFieldName">matchFieldName(name, map)</a> ⇒ <code>Array.&lt;Object&gt;</code></dt>
<dd><p>Find potential target field names matching a source field name.</p>
</dd>
<dt><a href="#buildGetCapabilitiesUrl">buildGetCapabilitiesUrl(url)</a> ⇒ <code>string</code></dt>
<dd><p>Build WFS GetCapabilities URL.</p>
</dd>
<dt><a href="#parseCapabilities">parseCapabilities(xml)</a> ⇒ <code>object</code></dt>
<dd><p>Parse WFS GetCapabilities response.</p>
</dd>
<dt><a href="#chooseOutputFormat">chooseOutputFormat(formats)</a> ⇒ <code>string</code> | <code>null</code></dt>
<dd><p>Choose the output format.</p>
</dd>
<dt><a href="#buildGetFeatureUrl">buildGetFeatureUrl(url, capabilities, paging)</a> ⇒ <code>string</code></dt>
<dd><p>Build WFS GetFeature URL.</p>
</dd>
<dt><a href="#getBrowser">getBrowser()</a> ⇒ <code>Promise.&lt;puppeteer.Browser&gt;</code></dt>
<dd><p>Get cached browser instance.</p>
</dd>
<dt><a href="#downloadFile">downloadFile(params)</a> ⇒ <code>Promise.&lt;ArchiveEntry&gt;</code></dt>
<dd><p>Download file from URL and log result.</p>
</dd>
<dt><a href="#downloadArcgisFeatureLayer">downloadArcgisFeatureLayer(params)</a> ⇒ <code>Promise.&lt;ArchiveEntry&gt;</code></dt>
<dd><p>Download features from ArcGIS Feature Layer and log result.</p>
</dd>
<dt><a href="#registerFile">registerFile(params)</a> ⇒ <code>Promise.&lt;ArchiveEntry&gt;</code></dt>
<dd><p>Register existing file in archive log.</p>
</dd>
<dt><a href="#buildWfsDownloadUrl">buildWfsDownloadUrl(url)</a> ⇒ <code>object</code></dt>
<dd><p>Build WFS GetFeature URL.</p>
</dd>
<dt><a href="#downloadPage">downloadPage(params)</a> ⇒ <code>Promise.&lt;ArchiveEntry&gt;</code></dt>
<dd><p>Download web page as MHTML and log result.</p>
<p>Page is rendered in a headless browser (puppeteer) and saved as MHTML.</p>
</dd>
</dl>

<a name="module_load"></a>

## load
Load the provided source datasets.


* * *

<a name="module_load..loadSources"></a>

### load~loadSources(path, [filters], [dir]) ⇒ <code>Array.&lt;Source&gt;</code>
Load sources from source properties.

**Kind**: inner method of [<code>load</code>](#module_load)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| path | <code>string</code> |  | Directory of JS files containing source properties. |
| [filters] | <code>object</code> | <code>{}</code> |  |
| filters.ids | <code>Array.&lt;string&gt;</code> |  | Return only sources with these identifiers. |
| filters.countries | <code>Array.&lt;string&gt;</code> |  | Return only source with these countries. |
| [dir] | <code>string</code> | <code>&quot;data/${id}/input&quot;</code> | Source input directory (template interpolated on source properties). |


* * *

<a name="module_names"></a>

## names
Parse scientific names.


* [names](#module_names)
    * [~ScientificName](#module_names..ScientificName)
        * [new ScientificName(obj)](#new_module_names..ScientificName_new)
        * _instance_
            * [.toString(options)](#module_names..ScientificName+toString) ⇒ <code>string</code>
            * [.warnings()](#module_names..ScientificName+warnings) ⇒ <code>Array.&lt;string&gt;</code>
            * [.errors()](#module_names..ScientificName+errors) ⇒ <code>Array.&lt;string&gt;</code>
            * [.report()](#module_names..ScientificName+report) ⇒ <code>object</code>
        * _static_
            * [.fromString(str)](#module_names..ScientificName.fromString) ⇒ <code>ScientificName</code>
            * [.fromFields(fields)](#module_names..ScientificName.fromFields) ⇒ <code>ScientificName</code>
            * [.compareStrings(options)](#module_names..ScientificName.compareStrings) ⇒ <code>function</code>
    * [~GENERIC](#module_names..GENERIC)
    * [~SPECIFIC](#module_names..SPECIFIC)
    * [~SUBG](#module_names..SUBG)
    * [~SP](#module_names..SP)
    * [~RANKS](#module_names..RANKS)
    * [~RANK](#module_names..RANK)
    * [~HEAD](#module_names..HEAD)
    * [~UNINOMIAL](#module_names..UNINOMIAL)
    * [~GENUS](#module_names..GENUS)
    * [~HYBRID_GENUS](#module_names..HYBRID_GENUS)
    * [~SUBGENUS](#module_names..SUBGENUS)
    * [~SPECIES](#module_names..SPECIES)
    * [~INFRASPECIES](#module_names..INFRASPECIES)
    * [~RANK_EPITHET](#module_names..RANK_EPITHET)
    * [~CULTIVAR](#module_names..CULTIVAR)
    * [~FIRST](#module_names..FIRST)
    * [~HYBRID](#module_names..HYBRID)
    * [~cleanName(s)](#module_names..cleanName) ⇒ <code>string</code>
    * [~parseInfraspecies(s)](#module_names..parseInfraspecies) ⇒ <code>Array.&lt;Infraspecies&gt;</code>
    * [~printInfraspecies(infraspecies, options)](#module_names..printInfraspecies) ⇒ <code>string</code>
    * [~printScientificName(name, [options])](#module_names..printScientificName) ⇒ <code>string</code>
    * [~formatScientificName(name, defaultGenus)](#module_names..formatScientificName) ⇒ <code>ParsedScientificName</code>
    * [~parseScientificName(name)](#module_names..parseScientificName) ⇒ <code>ParsedScientificName</code>


* * *

<a name="module_names..ScientificName"></a>

### names~ScientificName
Class representing a scientific name.

**Kind**: inner class of [<code>names</code>](#module_names)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| parsed | <code>ParsedScientificName</code> | Parsed scientific name. |
| [input] | <code>string</code> \| <code>object</code> | Input from which `parsed` was derived. |
| [matches] | <code>Array.&lt;object&gt;</code> | Matches from a taxonomic database. |


* [~ScientificName](#module_names..ScientificName)
    * [new ScientificName(obj)](#new_module_names..ScientificName_new)
    * _instance_
        * [.toString(options)](#module_names..ScientificName+toString) ⇒ <code>string</code>
        * [.warnings()](#module_names..ScientificName+warnings) ⇒ <code>Array.&lt;string&gt;</code>
        * [.errors()](#module_names..ScientificName+errors) ⇒ <code>Array.&lt;string&gt;</code>
        * [.report()](#module_names..ScientificName+report) ⇒ <code>object</code>
    * _static_
        * [.fromString(str)](#module_names..ScientificName.fromString) ⇒ <code>ScientificName</code>
        * [.fromFields(fields)](#module_names..ScientificName.fromFields) ⇒ <code>ScientificName</code>
        * [.compareStrings(options)](#module_names..ScientificName.compareStrings) ⇒ <code>function</code>


* * *

<a name="new_module_names..ScientificName_new"></a>

#### new ScientificName(obj)

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>ParsedScientificName</code> | Parsed scientific name. |


* * *

<a name="module_names..ScientificName+toString"></a>

#### scientificName.toString(options) ⇒ <code>string</code>
Print scientific name to string.

**Kind**: instance method of [<code>ScientificName</code>](#module_names..ScientificName)  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Print options (see [printScientificName](printScientificName)). |

**Example**  
```js
ScientificName.fromString(`Malus pumila var. asiatica 'Gala'`).toString()
// "Malus pumila var. asiatica 'Gala'"
```

* * *

<a name="module_names..ScientificName+warnings"></a>

#### scientificName.warnings() ⇒ <code>Array.&lt;string&gt;</code>
Get warnings.

**Kind**: instance method of [<code>ScientificName</code>](#module_names..ScientificName)  
**Example**  
```js
ScientificName.fromString('... Malus x pumila ...').warnings()
// [ 'Unparsed head', 'Unparsed tail', 'Hybrid' ]
ScientificName.fromFields({genus: 'Malus', species: 'pumila', scientific: 'Pyrus communis'}).warnings()
// [ 'Inconsistent secondary fields: genus, species' ]
```

* * *

<a name="module_names..ScientificName+errors"></a>

#### scientificName.errors() ⇒ <code>Array.&lt;string&gt;</code>
Get errors.

**Kind**: instance method of [<code>ScientificName</code>](#module_names..ScientificName)  
**Example**  
```js
(new ScientificName({species: 'pumila'})).errors()
// [ 'Missing genus' ]
```

* * *

<a name="module_names..ScientificName+report"></a>

#### scientificName.report() ⇒ <code>object</code>
Get full report.

**Kind**: instance method of [<code>ScientificName</code>](#module_names..ScientificName)  
**Example**  
```js
ScientificName.fromString('... Malus x pumila ...').report()
// {
//    input: '... Malus x pumila ...',
//    parsed: {
//      head: '... ',
//      genus: 'Malus',
//      species: 'pumila',
//      hybrid: true,
//      tail: '...'
//    },
//    warnings: [ 'Unparsed head', 'Unparsed tail', 'Hybrid' ]
// }
```

* * *

<a name="module_names..ScientificName.fromString"></a>

#### ScientificName.fromString(str) ⇒ <code>ScientificName</code>
Build scientific name from string.

**Kind**: static method of [<code>ScientificName</code>](#module_names..ScientificName)  

| Param | Type |
| --- | --- |
| str | <code>string</code> | 

**Example**  
```js
ScientificName.fromString('Malus pumila')
// ScientificName {
//   parsed: { genus: 'Malus', species: 'pumila' },
//   input: 'Malus pumila'
// }
```

* * *

<a name="module_names..ScientificName.fromFields"></a>

#### ScientificName.fromFields(fields) ⇒ <code>ScientificName</code>
Build scientific name from feature fields.

**Kind**: static method of [<code>ScientificName</code>](#module_names..ScientificName)  

| Param | Type |
| --- | --- |
| fields | <code>object</code> | 

**Example**  
```js
ScientificName.fromFields({ scientific: 'Malus pumila', other: 'Bloop' })
// ScientificName {
//   parsed: { genus: 'Malus', species: 'pumila' },
//   input: { scientific: 'Malus pumila' }
// }
ScientificName.fromFields({ genus: 'malus', species: 'PLATANOÏDES' })
// ScientificName {
//   parsed: { genus: 'Malus', species: 'platanoides' },
//   input: { genus: 'malus', species: 'PLATANOÏDES'}
// }
```

* * *

<a name="module_names..ScientificName.compareStrings"></a>

#### ScientificName.compareStrings(options) ⇒ <code>function</code>
Generate compare function for sorting by string representation.

**Kind**: static method of [<code>ScientificName</code>](#module_names..ScientificName)  
**Returns**: <code>function</code> - Compare function (a, b).  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Print options (see [printScientificName](printScientificName)). |

**Example**  
```js
l = [new ScientificName({genus: 'Prunus'}), new ScientificName({genus: 'Malus'})]
l.sort(ScientificName.compareStrings())
// [
//   ScientificName { parsed: { genus: 'Malus' } },
//   ScientificName { parsed: { genus: 'Prunus' } }
// ]
```

* * *

<a name="module_names..GENERIC"></a>

### names~GENERIC
Generic epithet.

Minimum two letters.
Dash can be within three letters of end (e.g. 'Uva-ursi', 'Filix-mas').

**Kind**: inner constant of [<code>names</code>](#module_names)  

* * *

<a name="module_names..SPECIFIC"></a>

### names~SPECIFIC
Specifc epithet.

Minimum two letters.
Dashes can be within one letter of end (e.g. 's-stylata', 'laurel-y').

**Kind**: inner constant of [<code>names</code>](#module_names)  

* * *

<a name="module_names..SUBG"></a>

### names~SUBG
Subgenus rank.

subg: subg(.) | subgen(.) | subgenus

**Kind**: inner constant of [<code>names</code>](#module_names)  

* * *

<a name="module_names..SP"></a>

### names~SP
Species rank.

sp: sp(.), spp(.), species

**Kind**: inner constant of [<code>names</code>](#module_names)  

* * *

<a name="module_names..RANKS"></a>

### names~RANKS
Infraspecific ranks.

subsp: subsp(.) | subspp(.) | ssp(.) | sspp(.) | subspecies
var: var(.) | variety | varietas
subvar: subvar(.), subvariety, subvarietas
f: f(.) | form | forma
subf: subf(.) | subform | subforma

**Kind**: inner constant of [<code>names</code>](#module_names)  

* * *

<a name="module_names..RANK"></a>

### names~RANK
Any infraspecific rank.

**Kind**: inner constant of [<code>names</code>](#module_names)  

* * *

<a name="module_names..HEAD"></a>

### names~HEAD
Everything before the first (latin) letter or hybrid symbol.

**Kind**: inner constant of [<code>names</code>](#module_names)  

* * *

<a name="module_names..UNINOMIAL"></a>

### names~UNINOMIAL
Uninomial.

**Kind**: inner constant of [<code>names</code>](#module_names)  

* * *

<a name="module_names..GENUS"></a>

### names~GENUS
Genus.

Identical to uninomial, but inferred to be a genus based on context.

**Kind**: inner constant of [<code>names</code>](#module_names)  

* * *

<a name="module_names..HYBRID_GENUS"></a>

### names~HYBRID\_GENUS
Secondary genus in hybrid formula.

May be abbreviated down to a single letter.

**Kind**: inner constant of [<code>names</code>](#module_names)  

* * *

<a name="module_names..SUBGENUS"></a>

### names~SUBGENUS
Subgenus.

**Kind**: inner constant of [<code>names</code>](#module_names)  

* * *

<a name="module_names..SPECIES"></a>

### names~SPECIES
Species.

**Kind**: inner constant of [<code>names</code>](#module_names)  

* * *

<a name="module_names..INFRASPECIES"></a>

### names~INFRASPECIES
One or more infraspecific epithets, each preceded by an optional rank.

**Kind**: inner constant of [<code>names</code>](#module_names)  

* * *

<a name="module_names..RANK_EPITHET"></a>

### names~RANK\_EPITHET
Single infraspecific epithet preceded by an optional rank.

**Kind**: inner constant of [<code>names</code>](#module_names)  

* * *

<a name="module_names..CULTIVAR"></a>

### names~CULTIVAR
Cultivar.

Must be wrapped in quotes and not include certain characters.

**Kind**: inner constant of [<code>names</code>](#module_names)  

* * *

<a name="module_names..FIRST"></a>

### names~FIRST
Parse a scientific name (or the first name in a hybrid formula).

Each key is a regular expression with named capture groups. Try each in
order. As soon as a match is found, proceed to the children keys and repeat
until `null` or no more children are found. Any `tags`, if encountered, are
added to the result.

**Kind**: inner constant of [<code>names</code>](#module_names)  

* * *

<a name="module_names..HYBRID"></a>

### names~HYBRID
Parse a secondary name in a hybrid formula.

**Kind**: inner constant of [<code>names</code>](#module_names)  

* * *

<a name="module_names..cleanName"></a>

### names~cleanName(s) ⇒ <code>string</code>
Clean name string.

- Latinizes characters.
- Replaces whitespace sequences with a single space.
- Removes leading and trailing whitespace.

**Kind**: inner method of [<code>names</code>](#module_names)  

| Param | Type |
| --- | --- |
| s | <code>string</code> | 

**Example**  
```js
cleanName(' Acer  platanoïdes ') // 'Acer platanoides'
```

* * *

<a name="module_names..parseInfraspecies"></a>

### names~parseInfraspecies(s) ⇒ <code>Array.&lt;Infraspecies&gt;</code>
Parse infraspecific ranks and epithets.

**Kind**: inner method of [<code>names</code>](#module_names)  

| Param | Type |
| --- | --- |
| s | <code>string</code> | 

**Example**  
```js
parseInfraspecies('foo f bar') // [{epithet: 'foo'}, {rank: 'f.', epithet: 'bar'}]
```

* * *

<a name="module_names..printInfraspecies"></a>

### names~printInfraspecies(infraspecies, options) ⇒ <code>string</code>
Print infraspecific ranks and epithets.

**Kind**: inner method of [<code>names</code>](#module_names)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| infraspecies | <code>Array.&lt;Infraspecies&gt;</code> |  |  |
| options | <code>object</code> |  |  |
| [options.n] | <code>object</code> | <code>Infinity</code> | – Number of infraspecies. |
| [options.rank] | <code>object</code> | <code>true</code> | – Print infraspecies rank. |

**Example**  
```js
printInfraspecies([ { rank: 'f.', epithet: 'mora' } ])
// 'f. mora'
printInfraspecies([ { rank: 'f.', epithet: 'mora' } ], { rank: false })
// 'mora'
```

* * *

<a name="module_names..printScientificName"></a>

### names~printScientificName(name, [options]) ⇒ <code>string</code>
Print scientific name.

**Kind**: inner method of [<code>names</code>](#module_names)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| name | <code>ParsedScientificName</code> |  | Scientific name. |
| [options] | <code>object</code> |  | Printing options. |
| [options.infraspecies] | <code>number</code> | <code>Infinity</code> | Number of infraspecies. |
| [options.hybrid] | <code>boolean</code> | <code>true</code> | Print hybrid symbol and formulas. |
| [options.rank] | <code>boolean</code> | <code>true</code> | Print infraspecies rank. |
| [options.cultivar] | <code>boolean</code> | <code>true</code> | Print cultivar. |

**Example**  
```js
name = {
  genus: 'Genus',
  species: 'speciosa',
  infraspecies: [{ rank: 'f.', epithet: 'formosa' }],
  cultivar: 'Gala',
  hybrid: true,
  hybrids: [{ genus: 'Genus', species: 'pendula' }]
}
printScientificName(name)
// "Genus speciosa f. formosa 'Gala' × Genus pendula'"
printScientificName(name, {cultivar: false})
// "Genus speciosa f. formosa × Genus pendula'"
printScientificName(name, {infraspecies: 0, cultivar: false})
// 'Genus speciosa × Genus pendula'
printScientificName(name, {hybrid: false, infraspecies: 0, cultivar: false})
// 'Genus speciosa'
```

* * *

<a name="module_names..formatScientificName"></a>

### names~formatScientificName(name, defaultGenus) ⇒ <code>ParsedScientificName</code>
Format scientific name.

**Kind**: inner method of [<code>names</code>](#module_names)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| name | <code>ParsedScientificName</code> |  | – Scientific name. |
| defaultGenus | <code>string</code> \| <code>boolean</code> | <code>null</code> | – Genus to assume if hybrid genus is blank or an abbreviation of `defaultGenus`. Defaults to `genus` if `null`, or skipped if `false`. |

**Example**  
```js
name = {
  genus: ' GENUS',
  species: 'SPECIOSA ',
  infraspecies: [ { rank: 'VAR', epithet: 'FORMOSA' } ],
  cultivar: 'CULTI VAR',
  hybrids: [ {genus: 'G', species: 'spéciosa' } ],
  hybrid: true
}
formatScientificName(name)
// {
//   genus: 'Genus',
//   species: 'speciosa',
//   infraspecies: [ { rank: 'var.', epithet: 'formosa' } ],
//   cultivar: 'Culti Var',
//   hybrids: [ { genus: 'Genus', species: 'speciosa' } ],
//   hybrid: true
// }
```

* * *

<a name="module_names..parseScientificName"></a>

### names~parseScientificName(name) ⇒ <code>ParsedScientificName</code>
Parse scientific name.

**Kind**: inner method of [<code>names</code>](#module_names)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name to parse as a scientific name. |

**Example**  
```js
parseScientificName(`Genus`)
// { uninomial: 'Genus' }
parseScientificName(`Genus speciosa var. segunda 'Cultivar' x Genus hybrida`)
// {
//   genus: 'Genus',
//   species: 'speciosa',
//   infraspecies: [ { rank: 'var.', epithet: 'segunda' } ],
//   cultivar: 'Cultivar',
//   hybrids: [ { genus: 'Genus', species: 'hybrida' } ],
//   hybrid: true
// }
```

* * *

<a name="module_source"></a>

## source
Describe a source dataset.


* [source](#module_source)
    * [~Source](#module_source..Source)
        * [new Source(props, [options])](#new_module_source..Source_new)
        * [.findFiles([type], [options])](#module_source..Source+findFiles) ⇒ <code>Array.&lt;ArchiveEntry&gt;</code>
        * [.fetchFiles([type], [options])](#module_source..Source+fetchFiles) ⇒ <code>Promise.&lt;Array.&lt;ArchiveEntry&gt;&gt;</code>
        * [.process(file, [options])](#module_source..Source+process) ⇒ <code>boolean</code>
        * [.getFields()](#module_source..Source+getFields) ⇒ <code>object</code>
        * [.getRows([n])](#module_source..Source+getRows) ⇒ <code>Array.&lt;object&gt;</code>
        * [.sample([options])](#module_source..Source+sample) ⇒ <code>object.&lt;string, Array&gt;</code>
        * [.glimpse([options])](#module_source..Source+glimpse)
        * [.open()](#module_source..Source+open) ⇒ <code>Promise.&lt;gdal.Layer&gt;</code>
        * [.close()](#module_source..Source+close)
        * [.getSrs()](#module_source..Source+getSrs) ⇒ <code>gdal.SpatialReference</code>
        * [.getFeatureGeometry(feature, [options])](#module_source..Source+getFeatureGeometry) ⇒ <code>gdal.Geometry</code>
        * [.success(msg, ...objects)](#module_source..Source+success)
        * [.log(msg, ...objects)](#module_source..Source+log)
        * [.warn(msg, ...objects)](#module_source..Source+warn)
        * [.error(msg, ...objects)](#module_source..Source+error)


* * *

<a name="module_source..Source"></a>

### source~Source
Class representing a source dataset.

**Kind**: inner class of [<code>source</code>](#module_source)  

* [~Source](#module_source..Source)
    * [new Source(props, [options])](#new_module_source..Source_new)
    * [.findFiles([type], [options])](#module_source..Source+findFiles) ⇒ <code>Array.&lt;ArchiveEntry&gt;</code>
    * [.fetchFiles([type], [options])](#module_source..Source+fetchFiles) ⇒ <code>Promise.&lt;Array.&lt;ArchiveEntry&gt;&gt;</code>
    * [.process(file, [options])](#module_source..Source+process) ⇒ <code>boolean</code>
    * [.getFields()](#module_source..Source+getFields) ⇒ <code>object</code>
    * [.getRows([n])](#module_source..Source+getRows) ⇒ <code>Array.&lt;object&gt;</code>
    * [.sample([options])](#module_source..Source+sample) ⇒ <code>object.&lt;string, Array&gt;</code>
    * [.glimpse([options])](#module_source..Source+glimpse)
    * [.open()](#module_source..Source+open) ⇒ <code>Promise.&lt;gdal.Layer&gt;</code>
    * [.close()](#module_source..Source+close)
    * [.getSrs()](#module_source..Source+getSrs) ⇒ <code>gdal.SpatialReference</code>
    * [.getFeatureGeometry(feature, [options])](#module_source..Source+getFeatureGeometry) ⇒ <code>gdal.Geometry</code>
    * [.success(msg, ...objects)](#module_source..Source+success)
    * [.log(msg, ...objects)](#module_source..Source+log)
    * [.warn(msg, ...objects)](#module_source..Source+warn)
    * [.error(msg, ...objects)](#module_source..Source+error)


* * *

<a name="new_module_source..Source_new"></a>

#### new Source(props, [options])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| props | <code>SourceProperties</code> |  | Source properties. |
| [options] | <code>object</code> |  |  |
| [options.exit] | <code>boolean</code> | <code>true</code> | Whether to throw errors or print them to the console. |
| [options.srs] | <code>string</code> | <code>&quot;EPSG:4326&quot;</code> | Spatial reference system to assume if none is defined in `props.srs` and none can be read from the input files. |


* * *

<a name="module_source..Source+findFiles"></a>

#### source.findFiles([type], [options]) ⇒ <code>Array.&lt;ArchiveEntry&gt;</code>
Find files in archive (by type).

Retuns the most recent match for each file if multiple are found.

**Kind**: instance method of [<code>Source</code>](#module_source..Source)  
**Returns**: <code>Array.&lt;ArchiveEntry&gt;</code> - Archive entries.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [type] | <code>FileType</code> | <code>&#x27;data&#x27;</code> | – File type. |
| [options] | <code>object</code> |  |  |
| [options.format] | <code>BrowserFormat</code> |  | Browser wepbage export format. |
| [options.maxDays] | <code>number</code> |  | Maximum age of archive result in days. |


* * *

<a name="module_source..Source+fetchFiles"></a>

#### source.fetchFiles([type], [options]) ⇒ <code>Promise.&lt;Array.&lt;ArchiveEntry&gt;&gt;</code>
Find files in archive (and download if missing).

**Kind**: instance method of [<code>Source</code>](#module_source..Source)  
**Returns**: <code>Promise.&lt;Array.&lt;ArchiveEntry&gt;&gt;</code> - Archive entries.  
**Throws**:

- <code>Error</code> If (checksum or manual-download) file not found in archive.
- <code>Error</code> If download fails.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [type] | <code>FileType</code> | <code>&#x27;data&#x27;</code> | – File type. |
| [options] | <code>object</code> |  |  |
| [options.format] | <code>BrowserFormat</code> | <code>&#x27;mhtml&#x27;</code> | Browser webpage export format. |
| [options.maxDays] | <code>number</code> |  | Maximum age of search result in days. |


* * *

<a name="module_source..Source+process"></a>

#### source.process(file, [options]) ⇒ <code>boolean</code>
Process input and write to output.

Reading, writing, and coordinate transformations are performed by
[GDAL](https://gdal.org) via the
[node-gdal-async](https://www.npmjs.com/package/gdal-async) bindings.

Processing steps include a schema crosswalk (`this.props.crosswalk`),
skipping features by field values (`this.props.deleteFunc`), reducing complex
geometries to centroid points (`options.centroids`), and skipping features
outside a bounding box (`options.bounds`).

Quirks
- GDAL date/time fields: Read as objects but written as ISO8601 strings
- GDAL list fields: Read as arrays and written as pipe-separated strings

**Kind**: instance method of [<code>Source</code>](#module_source..Source)  
**Returns**: <code>boolean</code> - Whether processed file (true) or skipped (false).  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| file | <code>string</code> |  | Output file path. |
| [options] | <code>object</code> |  | Output options. |
| [options.driver] | <code>string</code> |  | Name of GDAL driver to use to write to the output file (see https://gdal.org/drivers/vector). Guessed from file extension if not provided. |
| [options.creation] | <code>Array.&lt;string&gt;</code> \| <code>object</code> |  | Driver-specific dataset creation options (see https://gdal.org/drivers/vector). |
| [options.overwrite] | <code>boolean</code> | <code>false</code> | Whether to proceed if `file` already exists. |
| [options.srs] | <code>string</code> | <code>&quot;EPSG:4326&quot;</code> | Output spatial reference system in any format supported by [OGRSpatialReference.SetFromUserInput()](https://gdal.org/api/ogrspatialref.html#classOGRSpatialReference_1aec3c6a49533fe457ddc763d699ff8796). Use 'EPSG:*' for (latitude, longitude) and '+init=EPSG:*' (PROJ<6 behavior) for (longitude, latitude). |
| [options.centroids] | <code>boolean</code> | <code>false</code> | Whether to reduce non-point geometries to centroids. |
| [options.keepInvalid] | <code>boolean</code> | <code>false</code> | Whether to keep features with empty or invalid geometries. |
| [options.keepFields] | <code>boolean</code> | <code>false</code> | Whether to keep the input feature fields alongside the result of the schema crosswalk (`this.props.crosswalk`). |
| [options.prefix=] | <code>string</code> |  | String to append to input field names to prevent collisions with output field names. Applies only if `options.keepFields` is `true`. |
| [options.bounds] | <code>Array.&lt;number&gt;</code> |  | Bounding box in output SRS (`options.srs`) in the format [xmin, ymin, xmax, ymax]. If provided, features outside the bounds are skipped. |


* * *

<a name="module_source..Source+getFields"></a>

#### source.getFields() ⇒ <code>object</code>
Get layer field names and GDAL data types.

**Kind**: instance method of [<code>Source</code>](#module_source..Source)  
**Returns**: <code>object</code> - Field names (keys) and GDAL data types (values)  

* * *

<a name="module_source..Source+getRows"></a>

#### source.getRows([n]) ⇒ <code>Array.&lt;object&gt;</code>
Get feature fields.

**Kind**: instance method of [<code>Source</code>](#module_source..Source)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [n] | <code>integer</code> | <code>Infinity</code> | Maximum number of features to read. |


* * *

<a name="module_source..Source+sample"></a>

#### source.sample([options]) ⇒ <code>object.&lt;string, Array&gt;</code>
Sample field values from input.

**Kind**: instance method of [<code>Source</code>](#module_source..Source)  
**Returns**: <code>object.&lt;string, Array&gt;</code> - Object of field values with field names as keys.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>object</code> |  |  |
| [options.n] | <code>number</code> | <code>1000</code> | Maximum number of features to sample. |
| [options.max] | <code>number</code> | <code>100</code> | Maximum number of values to collect for each field. |
| [options.sort] | <code>boolean</code> | <code>true</code> | Whether to sort values. |
| [options.unique] | <code>boolean</code> | <code>true</code> | Whether to only save unique values. |


* * *

<a name="module_source..Source+glimpse"></a>

#### source.glimpse([options])
Print table of input field names, types, and unique values.

**Kind**: instance method of [<code>Source</code>](#module_source..Source)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>object</code> |  | Options to pass to [Source#sample](Source#sample), plus: |
| [options.sample] | <code>object.&lt;string, Array&gt;</code> |  | Result of [Source#sample](Source#sample). |
| [options.truncate] | <code>number</code> | <code>1280</code> | Maximum number of characters to print per field. |
| [options.widths] | <code>Array.&lt;number&gt;</code> | <code>[20, 10, 130]</code> | Column widths for field names, types, and unique values, respectively. |
| [options.sep] | <code>string</code> | <code>&quot;·&quot;</code> | Separator between unique values. |


* * *

<a name="module_source..Source+open"></a>

#### source.open() ⇒ <code>Promise.&lt;gdal.Layer&gt;</code>
Open data file(s) with GDAL.

If the dataset has a single layer, the layer is returned. Otherwise, and
`props.layer` or `props.openFunc` is not provided, an error is thrown.

**Kind**: instance method of [<code>Source</code>](#module_source..Source)  
**Returns**: <code>Promise.&lt;gdal.Layer&gt;</code> - See the documentation for
[node-gdal-async](https://mmomtchev.github.io/node-gdal-async).
Result is cached until closed with [Source#close](Source#close).  

* * *

<a name="module_source..Source+close"></a>

#### source.close()
Close input file if open with GDAL.

**Kind**: instance method of [<code>Source</code>](#module_source..Source)  

* * *

<a name="module_source..Source+getSrs"></a>

#### source.getSrs() ⇒ <code>gdal.SpatialReference</code>
Get spatial reference system (SRS) of input.

**Kind**: instance method of [<code>Source</code>](#module_source..Source)  
**Returns**: <code>gdal.SpatialReference</code> - The provided SRS (`this.props.srs`),
the SRS read from the input file, or the default SRS (`this.options.srs`).  

* * *

<a name="module_source..Source+getFeatureGeometry"></a>

#### source.getFeatureGeometry(feature, [options]) ⇒ <code>gdal.Geometry</code>
Get feature geometry.

**Kind**: instance method of [<code>Source</code>](#module_source..Source)  
**Returns**: <code>gdal.Geometry</code> - The feature geometry.  

| Param | Type | Description |
| --- | --- | --- |
| feature | <code>gdal.Feature</code> | Input feature. |
| [options] | <code>object</code> | Additional options. |
| [options.fields] | <code>object</code> | Field values of the feature. |
| [options.srs] | <code>object</code> | Spatial reference system. |
| [options.isXY] | <code>boolean</code> | Whether the input coordinates are in (longitude/east, latitude/north) order. |


* * *

<a name="module_source..Source+success"></a>

#### source.success(msg, ...objects)
Print success message to console (green).

**Kind**: instance method of [<code>Source</code>](#module_source..Source)  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>string</code> | Message prepended with green tag (`[props.id]`). |
| ...objects | <code>\*</code> | Additional objects passed to `console.log()`. |


* * *

<a name="module_source..Source+log"></a>

#### source.log(msg, ...objects)
Print message to console (cyan).

**Kind**: instance method of [<code>Source</code>](#module_source..Source)  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>string</code> | Message prepended with cyan tag (`[props.id]`). |
| ...objects | <code>\*</code> | Additional objects passed to `console.log()`. |


* * *

<a name="module_source..Source+warn"></a>

#### source.warn(msg, ...objects)
Print warning to console (yellow).

**Kind**: instance method of [<code>Source</code>](#module_source..Source)  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>string</code> | Message prepended with yellow tag (`[props.id]`). |
| ...objects | <code>\*</code> | Additional objects passed to `console.log()`. |


* * *

<a name="module_source..Source+error"></a>

#### source.error(msg, ...objects)
Throw or print error to console (red).

**Kind**: instance method of [<code>Source</code>](#module_source..Source)  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>string</code> | Message prepended with red tag (`[props.id]`). |
| ...objects | <code>\*</code> | Additional objects passed directly to `console.error()` or appended to error via `util.inspect()`. |


* * *

<a name="module_sourceio"></a>

## sourceio
Read and write source properties.


* [sourceio](#module_sourceio)
    * [~readSourceProperties(file)](#module_sourceio..readSourceProperties) ⇒ <code>Array.&lt;SourceProperties&gt;</code>
    * [~writeSourceProperties(sources, file, currentFile)](#module_sourceio..writeSourceProperties)


* * *

<a name="module_sourceio..readSourceProperties"></a>

### sourceio~readSourceProperties(file) ⇒ <code>Array.&lt;SourceProperties&gt;</code>
Read source properties from a file.

**Kind**: inner method of [<code>sourceio</code>](#module_sourceio)  
**Returns**: <code>Array.&lt;SourceProperties&gt;</code> - Source properties.  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>string</code> | Path to source properties file. |


* * *

<a name="module_sourceio..writeSourceProperties"></a>

### sourceio~writeSourceProperties(sources, file, currentFile)
Write source properties to a file.

**Kind**: inner method of [<code>sourceio</code>](#module_sourceio)  

| Param | Type | Description |
| --- | --- | --- |
| sources | <code>Array.&lt;SourceProperties&gt;</code> | Source properties. |
| file | <code>string</code> | Path to new source properties file. |
| currentFile | <code>string</code> | Path to current source properties file ( defaults to `file`). Used to replicate the header (everything before `module.exports`). |


* * *

<a name="module_taxamatch"></a>

## taxamatch
Match scientific names.


* [taxamatch](#module_taxamatch)
    * [~Matcher](#module_taxamatch..Matcher)
        * [new Matcher(taxa, [id])](#new_module_taxamatch..Matcher_new)
        * [.match(name)](#module_taxamatch..Matcher+match) ⇒ <code>Array.&lt;object&gt;</code>


* * *

<a name="module_taxamatch..Matcher"></a>

### taxamatch~Matcher
Class for matching scientific names to a taxonomic dictionary.

Currently supports exact, fuzzy, and phonetic matching on:
- genus
- species
- first infraspecies epithet and rank

**Kind**: inner class of [<code>taxamatch</code>](#module_taxamatch)  

* [~Matcher](#module_taxamatch..Matcher)
    * [new Matcher(taxa, [id])](#new_module_taxamatch..Matcher_new)
    * [.match(name)](#module_taxamatch..Matcher+match) ⇒ <code>Array.&lt;object&gt;</code>


* * *

<a name="new_module_taxamatch..Matcher_new"></a>

#### new Matcher(taxa, [id])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| taxa | <code>Array.&lt;object&gt;</code> |  | Taxonomic dictionary. Each taxon must have a unique id and `genus`, and may have `species` and `infraspecies` [{ rank, epithet }, ...]. |
| [id] | <code>string</code> | <code>&quot;&#x27;id&#x27;&quot;</code> | Key in `taxa` to use as unique object identifier. |

**Example**  
```js
taxa = [
 { id: 0, genus: 'Malus' },
 { id: 1, genus: 'Malus', species: 'pumila' },
 { id: 2, genus: 'Malus', species: 'pumila', infraspecies: [{ rank: 'var.', epithet: 'asiatica' }] }
]
matcher = new Matcher(taxa)
matcher.match({ genus: 'Malus' })
matcher.match({ genus: 'Malis' })
matcher.match({ genus: 'Malus', species: 'pumila' })
matcher.match({ genus: 'Malus', species: 'pimila' })
matcher.match({ genus: 'Mala', species: 'pimila' })
matcher.match({ genus: 'Malus', species: 'pumila', infraspecies: [{ epithet: 'asiatica'}] })
matcher.match({ genus: 'Malus', species: 'pumila', infraspecies: [{ rank: 'f.', epithet: 'asiatica'}] })
matcher.match({ genus: 'Malus', species: 'pumila', infraspecies: [{ rank: 'var.', epithet: 'asiatica'}] })
matcher.match({ genus: 'Malis', species: 'pimila', infraspecies: [{ rank: 'var.', epithet: 'asiatica'}] })
matcher.match({ genus: 'malus', species: 'pu-mila' })
```

* * *

<a name="module_taxamatch..Matcher+match"></a>

#### matcher.match(name) ⇒ <code>Array.&lt;object&gt;</code>
Match scientific name to taxa.

**Kind**: instance method of [<code>Matcher</code>](#module_taxamatch..Matcher)  
**Returns**: <code>Array.&lt;object&gt;</code> - Taxon match(es) in the following order:
- exact and complete match, or
- complete phonetic match or fuzzy match(es)
- incomplete exact, phonetic, or fuzzy match(es)
Each match is in the following format:
- {boolean} incomplete - Whether match is of a higher rank than the provided name.
- {number[]} fuzzy - Similarity score (0-1) for each matched name component
(in the order genus, species, infraspecies), if fuzzy.
- {boolean} phonetic - Whether match is phonetic.
- {object} taxon - Matched taxon.  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>names.ParsedScientificName</code> | Scientific name. |


* * *

<a name="module_types"></a>

## types

* [types](#module_types)
    * [~DownloadMethod](#module_types..DownloadMethod) : <code>&#x27;manual&#x27;</code> \| <code>&#x27;file&#x27;</code> \| <code>&#x27;arcgis&#x27;</code> \| <code>&#x27;browser&#x27;</code>
    * [~BrowserFormat](#module_types..BrowserFormat) : <code>&#x27;mhtml&#x27;</code> \| <code>&#x27;html&#x27;</code> \| <code>&#x27;png&#x27;</code> \| <code>&#x27;pdf&#x27;</code>
    * [~FileType](#module_types..FileType) : <code>&#x27;data&#x27;</code> \| <code>&#x27;metadata&#x27;</code> \| <code>&#x27;license&#x27;</code>
    * [~ChecksumFile](#module_types..ChecksumFile) : <code>object</code>
    * [~UrlFile](#module_types..UrlFile) : <code>object</code>
    * [~ArchiveFile](#module_types..ArchiveFile) : <code>ChecksumFile</code> \| <code>UrlFile</code>
    * [~SourceFile](#module_types..SourceFile) : <code>string</code> \| <code>Object</code> \| <code>Object</code> \| <code>Object</code> \| <code>Object</code>
    * [~ArchiveEntry](#module_types..ArchiveEntry) : <code>object</code>
    * [~SourceProperties](#module_types..SourceProperties) : <code>object</code>
    * [~SourcePropertiesExtended](#module_types..SourcePropertiesExtended) : <code>SourceProperties</code>
    * [~Infraspecies](#module_types..Infraspecies) : <code>object</code>
    * [~Hybrid](#module_types..Hybrid) : <code>object</code>
    * [~ParsedScientificName](#module_types..ParsedScientificName) : <code>object</code>


* * *

<a name="module_types..DownloadMethod"></a>

### types~DownloadMethod : <code>&#x27;manual&#x27;</code> \| <code>&#x27;file&#x27;</code> \| <code>&#x27;arcgis&#x27;</code> \| <code>&#x27;browser&#x27;</code>
File download method.

- manual: Download manually (e.g. clicking on a button in the browser)
- file: Download directly
- arcgis: Download with the ArcGIS Feature Layer API with paginated requests
- browser: Render in a browser and save the resulting webpage

**Kind**: inner typedef of [<code>types</code>](#module_types)  

* * *

<a name="module_types..BrowserFormat"></a>

### types~BrowserFormat : <code>&#x27;mhtml&#x27;</code> \| <code>&#x27;html&#x27;</code> \| <code>&#x27;png&#x27;</code> \| <code>&#x27;pdf&#x27;</code>
Browser webpage export format.

- mhtml: Webpage with resources saved in a single file
- html: Webpage HTML only
- png: Screenshot as PNG image
- pdf: Webpage as PDF document

**Kind**: inner typedef of [<code>types</code>](#module_types)  

* * *

<a name="module_types..FileType"></a>

### types~FileType : <code>&#x27;data&#x27;</code> \| <code>&#x27;metadata&#x27;</code> \| <code>&#x27;license&#x27;</code>
File type.

- data: Data file (Source.props.data)
- metadata: Metadata file (Source.props.metadata)
- license: License file (Source.props.license)

**Kind**: inner typedef of [<code>types</code>](#module_types)  

* * *

<a name="module_types..ChecksumFile"></a>

### types~ChecksumFile : <code>object</code>
Checksum file descriptor.

**Kind**: inner typedef of [<code>types</code>](#module_types)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| checksum | <code>string</code> | File checksum (base-64 md5 hash). |


* * *

<a name="module_types..UrlFile"></a>

### types~UrlFile : <code>object</code>
URL file descriptor.

**Kind**: inner typedef of [<code>types</code>](#module_types)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | File URL. |
| method | <code>DownloadMethod</code> |  |
| [format] | <code>BrowserFormat</code> |  |


* * *

<a name="module_types..ArchiveFile"></a>

### types~ArchiveFile : <code>ChecksumFile</code> \| <code>UrlFile</code>
Archive file descriptor.

**Kind**: inner typedef of [<code>types</code>](#module_types)  

* * *

<a name="module_types..SourceFile"></a>

### types~SourceFile : <code>string</code> \| <code>Object</code> \| <code>Object</code> \| <code>Object</code> \| <code>Object</code>
Source file descriptor.

**Kind**: inner typedef of [<code>types</code>](#module_types)  

* * *

<a name="module_types..ArchiveEntry"></a>

### types~ArchiveEntry : <code>object</code>
Archive entry.

**Kind**: inner typedef of [<code>types</code>](#module_types)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | File path. |
| checksum | <code>string</code> | File checksum (base-64 md5 hash). |
| date | <code>Date</code> | Date of acquisition. |
| [maxDate] | <code>boolean</code> | Whether `date` is a maximum-possible date. |
| [dateAdded] | <code>Date</code> | Date added to archive, if not `date` (if file was registered manually rather than downloaded). |
| [url] | <code>string</code> | File URL. |
| [method] | <code>DownloadMethod</code> | File download method. |
| [format] | <code>BrowserFormat</code> | Browser webpage export format (if `method` is `browser`). |
| [existed] | <code>boolean</code> | Whether file already existed in archive, in which case `path` is the path of the existing file. |
| [props] | <code>object</code> | Additional properties. |


* * *

<a name="module_types..SourceProperties"></a>

### types~SourceProperties : <code>object</code>
Properties used by [Source](Source) for data processing.

**Kind**: inner typedef of [<code>types</code>](#module_types)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Identifier prepended to console output. |
| data | <code>SourceFile</code> \| <code>Array.&lt;SourceFile&gt;</code> | Data file(s). |
| vfs | <code>string</code> | GDAL virtual file system type (`/vsizip/`). |
| filename | <code>string</code> | Relative path to the file to open with GDAL within an archive file. |
| layer | <code>string</code> | Layer name to open with GDAL within a file. Only relevant for files with multiple layers. |
| openFunc | <code>function</code> | Function that takes a file path (or array) and returns a GDAL dataset. If provided, takes precedence over `vfs` and `filename`. |
| geometry | <code>object</code> | Geometry field names for formats without explicit geometries (e.g. CSV). If not provided, will attempt to guess from field names. |
| geometry.wkt | <code>string</code> | Name of field with well-known-text (wkt) geometry. If provided, takes precedence over `x` and `y`. |
| geometry.x | <code>string</code> | Name of field with x coordinate (longitude, easting). |
| geometry.y | <code>string</code> | Name of field with y coordinate (latitude, northing). |
| srs | <code>string</code> | Spatial reference system in any format supported by [OGRSpatialReference.SetFromUserInput()](https://gdal.org/api/ogrspatialref.html#classOGRSpatialReference_1aec3c6a49533fe457ddc763d699ff8796). |
| crosswalk | <code>Object.&lt;string, (string\|function())&gt;</code> | Crosswalk mapping to a target schema. For each `key: value` pair, `key` is the new field name and `value` is either the old field name (e.g. `height: 'HEIGHT'`) or a function that takes an object (of feature field values) and returns a value (e.g. `height: x => x['HEIGHT'] / 100`). |
| coordsFunc | <code>function</code> | Function that takes an object (of feature field values before the crosswalk) and returns a number array of point coordinates `[x, y]`. This is a useful alternative to `geometry` if the coordinates need to be extracted from field values (e.g. `obj => obj.XY.split(';').map(Number)`). |
| addressFunc | <code>function</code> | Function that takes an object (of feature field values before the crosswalk) and returns an address string for geocoding. |
| deleteFunc | <code>function</code> | Function that takes an object (of feature field values before the crosswalk) and returns a value (e.g. `x => x['HEALTH'] === 'dead'`). The feature is excluded from the output if the returned value evaluates to `true`. |
| metadata | <code>SourceFile</code> \| <code>Array.&lt;SourceFile&gt;</code> | Metadata webpage(s) or file(s). |
| license | <code>object</code> | Data license. |
| license.id | <code>string</code> | License identifier (see `./lib/licenses.js`). |
| license.name | <code>string</code> | License name. Only provide if `id` is not. |
| license.url | <code>string</code> | License URL. Only provide if `id` is not. |


* * *

<a name="module_types..SourcePropertiesExtended"></a>

### types~SourcePropertiesExtended : <code>SourceProperties</code>
Additional properties not used by [Source](Source) but used elsewhere.

**Kind**: inner typedef of [<code>types</code>](#module_types)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| pending | <code>string</code> | Pending issues preventing processing. |
| omit | <code>string</code> | – Reason for omitting from processing. |
| country | <code>string</code> | Country name in English (e.g. `Spain`). |
| state | <code>string</code> | Local name of first-level administrative division (see https://en.wikipedia.org/wiki/List_of_administrative_divisions_by_country) with the exception of: - Ireland: NUTS 3 Region (https://en.wikipedia.org/wiki/NUTS_statistical_regions_of_Ireland) - Japan: Region (https://en.wikipedia.org/wiki/List_of_regions_of_Japan) - Netherlands: Province (https://en.wikipedia.org/wiki/Provinces_of_the_Netherlands) - New Zealand: Region (https://en.wikipedia.org/wiki/Regions_of_New_Zealand) - United Kingdom (England): Region (https://en.wikipedia.org/wiki/Regions_of_England) - United Kingdom (other): Country |
| city | <code>string</code> | Local name of city or municipality. |
| designation | <code>string</code> | Local name of `city` subset, administrative unit, university, or other institution if not `country`, `state`, or `city`. |
| language | <code>string</code> | Language of contents as an [ISO 639-1](https://en.wikipedia.org/wiki/ISO_639-1) code (e.g. `en`) and an optional [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) region code (e.g. `en-AU`). |
| primary | <code>string</code> | `id` of the primary source (for grouping sources together). |
| long | <code>string</code> | Full name of the government body, university, or other institution (e.g. `City of Melbourne`). |
| short | <code>string</code> | Short name (e.g. `Melbourne`). |
| centre | <code>object</code> | Centre point (for map label placement). |
| centre.lon | <code>number</code> | Longitude in decimal degrees (EPSG:4326). |
| centre.lat | <code>number</code> | Latitude in decimal degrees (EPSG:4326). |


* * *

<a name="module_types..Infraspecies"></a>

### types~Infraspecies : <code>object</code>
Infraspecies epithet.

**Kind**: inner typedef of [<code>types</code>](#module_types)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| rank | <code>string</code> | Rank (`subsp.`, `var.`, `f.`, `subvar.`, `subf.`). |
| epithet | <code>string</code> | Epithet (lowercase: e.g. `pontica`). |


* * *

<a name="module_types..Hybrid"></a>

### types~Hybrid : <code>object</code>
Hybrid name.

Represents a secondary scientific name in a hybrid formula.

**Kind**: inner typedef of [<code>types</code>](#module_types)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| genus | <code>string</code> | Genus (capitalized: e.g. `Malus`). |
| subgenus | <code>string</code> | Subgenus (capitalized: e.g. `Malus`). |
| species | <code>string</code> | Specific epithet (lowercase: e.g. `pumila`). |
| infraspecies | <code>Array.&lt;Infraspecies&gt;</code> | Infraspecific epithets. |
| cultivar | <code>string</code> | Cultivar (title case: e.g. `Golden Delicious`). |


* * *

<a name="module_types..ParsedScientificName"></a>

### types~ParsedScientificName : <code>object</code>
Scientific name.

**Kind**: inner typedef of [<code>types</code>](#module_types)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| head | <code>string</code> | Unparsed head. |
| uninomial | <code>string</code> | – Uninomial name (maybe `genus`). |
| genus | <code>string</code> | Genus (capitalized: e.g. `Malus`). |
| subgenus | <code>string</code> | Subgenus (capitalized: e.g. `Malus`). |
| species | <code>string</code> | Specific epithet (lowercase: e.g. `pumila`). |
| infraspecies | <code>Array.&lt;Infraspecies&gt;</code> | Infraspecific epithets. |
| cultivar | <code>string</code> | Cultivar (title case: e.g. `Golden Delicious`). |
| hybrid | <code>boolean</code> | Whether this is a hybrid. |
| hybridGenus | <code>boolean</code> | – Whether `genus` is a nothogenus (e.g. `× Sorbopyrus`). |
| hybrids | <code>Array.&lt;Hybrid&gt;</code> | – Secondary names in a hybrid formula. |
| tail | <code>string</code> | Unparsed tail. |


* * *

<a name="LICENSES"></a>

## LICENSES : <code>Object</code>
Common data licenses.

Each property is a license identifier. The value is an object with the
following properties:
- spdx: Whether the license is in the Software Package Data Exchange (SPDX)
  [license list](https://spdx.org/licenses/).
- name: License name.
- url: License URL.

**Kind**: global constant  

* * *

<a name="downloadFile"></a>

## downloadFile(url, dir) ⇒ <code>object</code> \| <code>null</code>
Download file and compute MD5 hash of the stream.

**Kind**: global function  
**Returns**: <code>object</code> \| <code>null</code> - File path (file) and md5-base64 checksum (checksum)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| url | <code>string</code> |  | – URL to download |
| dir | <code>string</code> | <code>&quot;.&quot;</code> | – Directory to save file to |


* * *

<a name="loadPage"></a>

## loadPage(url, page) ⇒ <code>Promise.&lt;puppeteer.HTTPResponse&gt;</code>
Load URL in browser page.

**Kind**: global function  

| Param | Type |
| --- | --- |
| url | <code>string</code> | 
| page | <code>puppeteer.Page</code> | 


* * *

<a name="readPageHtml"></a>

## readPageHtml(page) ⇒ <code>Promise.&lt;string&gt;</code>
Read browser page as HTML.

**Kind**: global function  
**Returns**: <code>Promise.&lt;string&gt;</code> - HTML  

| Param | Type |
| --- | --- |
| page | <code>puppeteer.Page</code> | 


* * *

<a name="readPageMhtml"></a>

## readPageMhtml(page) ⇒ <code>Promise.&lt;string&gt;</code>
Read browser page as MHTML.

**Kind**: global function  
**Returns**: <code>Promise.&lt;string&gt;</code> - MHTML  

| Param | Type |
| --- | --- |
| page | <code>puppeteer.Page</code> | 


* * *

<a name="readPagePng"></a>

## readPagePng(page) ⇒ <code>Promise.&lt;Buffer&gt;</code>
Read browser page as PNG.

**Kind**: global function  
**Returns**: <code>Promise.&lt;Buffer&gt;</code> - PNG  

| Param | Type |
| --- | --- |
| page | <code>puppeteer.Page</code> | 


* * *

<a name="readPagePdf"></a>

## readPagePdf(page) ⇒ <code>Promise.&lt;Buffer&gt;</code>
Read browser page as PDF.

**Kind**: global function  
**Returns**: <code>Promise.&lt;Buffer&gt;</code> - PDF  

| Param | Type |
| --- | --- |
| page | <code>puppeteer.Page</code> | 


* * *

<a name="md5"></a>

## md5(x) ⇒ <code>string</code>
Compute MD5 hash.

**Kind**: global function  
**Returns**: <code>string</code> - MD5 hash  

| Param | Type |
| --- | --- |
| x | <code>string</code> | 


* * *

<a name="hashFile"></a>

## hashFile(file) ⇒ <code>Promise.&lt;string&gt;</code>
Compute MD5 hash of a file read as a stream.

Uses base64 encoding by default as it was found to be much faster for large
binary files and same as UTF-8 for text.

**Kind**: global function  
**Returns**: <code>Promise.&lt;string&gt;</code> - MD5 hash  

| Param | Type |
| --- | --- |
| file | <code>string</code> | 


* * *

<a name="buildPath"></a>

## buildPath(url, checksum, date) ⇒ <code>string</code>
Build archive path.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | – Represented with MD5 hash |
| checksum | <code>string</code> | File hash. Used as the hash if no url |
| date | <code>Date</code> | – Represented with ISO 8601 string with no colons (:) |


* * *

<a name="log"></a>

## log(params) ⇒ <code>Promise.&lt;ArchiveEntry&gt;</code>
Add an entry to the archive log.

**Kind**: global function  

| Param | Type |
| --- | --- |
| params | <code>object</code> | 
| params.date | <code>Date</code> | 


* * *

<a name="guessFilename"></a>

## guessFilename(headers, defaultBasename, url) ⇒ <code>string</code>
Guess filename from HTTP response headers.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| headers | <code>object</code> | – HTTP response headers |
| defaultBasename | <code>string</code> | Basename to use if none is found |
| url | <code>string</code> | HTTP request URL |


* * *

<a name="logData"></a>

## logData(params) ⇒ <code>ArchiveEntry</code>
Write data to file and add to log.

**Kind**: global function  

| Param | Type |
| --- | --- |
| params | <code>object</code> | 
| params.data | <code>string</code> | 
| params.filename | <code>string</code> | 
| params.url | <code>string</code> | 
| params.date | <code>Date</code> | 


* * *

<a name="search"></a>

## search(params, options) ⇒ <code>Array.&lt;ArchiveEntry&gt;</code>
Search log for matching entries.

**Kind**: global function  
**Returns**: <code>Array.&lt;ArchiveEntry&gt;</code> - Entries that match search criteria, sorted by date
descending.  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Search criteria as key-value pairs that must match |
| options | <code>object</code> |  |
| [options.limit] | <code>int</code> | Maximum number of results to return |
| [options.maxDays] | <code>int</code> | Maximum age of result in days |


* * *

<a name="geocode"></a>

## geocode(address) ⇒ <code>Promise.&lt;object&gt;</code>
Geocode address.

**Kind**: global function  
**Returns**: <code>Promise.&lt;object&gt;</code> - Geocode results.  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | Address to geocode. |


* * *

<a name="geocodeCached"></a>

## geocodeCached(address) ⇒ <code>Promise.&lt;object&gt;</code>
Geocode address with caching.

**Kind**: global function  
**Returns**: <code>Promise.&lt;object&gt;</code> - Geocode results.  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | Address to geocode. |


* * *

<a name="buildMapFromCrosswalks"></a>

## buildMapFromCrosswalks(crosswalks) ⇒ <code>Array.&lt;Object.&lt;string, Array.&lt;string&gt;&gt;&gt;</code>
Build source-target field name map from crosswalks.

**Kind**: global function  
**Returns**: <code>Array.&lt;Object.&lt;string, Array.&lt;string&gt;&gt;&gt;</code> - Lowercased source field names
mapped to each target field name.  

| Param | Type | Description |
| --- | --- | --- |
| crosswalks | <code>Array.&lt;Object.&lt;string, (string\|function())&gt;&gt;</code> | Source crosswalks. |


* * *

<a name="matchFieldName"></a>

## matchFieldName(name, map) ⇒ <code>Array.&lt;Object&gt;</code>
Find potential target field names matching a source field name.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Source field name. |
| map | <code>Object.&lt;string, Array.&lt;string&gt;&gt;</code> | Target-source field name map. |


* * *

<a name="buildGetCapabilitiesUrl"></a>

## buildGetCapabilitiesUrl(url) ⇒ <code>string</code>
Build WFS GetCapabilities URL.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | WFS server URL |


* * *

<a name="parseCapabilities"></a>

## parseCapabilities(xml) ⇒ <code>object</code>
Parse WFS GetCapabilities response.

**Kind**: global function  
**Returns**: <code>object</code> - Parsed capabilities (version, outputFormats, typeNames,
resultTypes, resultPaging).  

| Param | Type | Description |
| --- | --- | --- |
| xml | <code>string</code> | – XML string |


* * *

<a name="chooseOutputFormat"></a>

## chooseOutputFormat(formats) ⇒ <code>string</code> \| <code>null</code>
Choose the output format.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| formats | <code>Array.&lt;string&gt;</code> | List of output formats |


* * *

<a name="buildGetFeatureUrl"></a>

## buildGetFeatureUrl(url, capabilities, paging) ⇒ <code>string</code>
Build WFS GetFeature URL.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| url | <code>string</code> |  | WFS server URL (ideally with typeName parameter) |
| capabilities | <code>object</code> |  | Server capabilities |
| paging | <code>boolean</code> | <code>false</code> | Whether to set a start index and max feature count |


* * *

<a name="getBrowser"></a>

## getBrowser() ⇒ <code>Promise.&lt;puppeteer.Browser&gt;</code>
Get cached browser instance.

**Kind**: global function  

* * *

<a name="downloadFile"></a>

## downloadFile(params) ⇒ <code>Promise.&lt;ArchiveEntry&gt;</code>
Download file from URL and log result.

**Kind**: global function  
**Returns**: <code>Promise.&lt;ArchiveEntry&gt;</code> - Log entry  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Parameters |
| params.url | <code>string</code> | URL to download |
| params.maxDays | <code>number</code> | Maximum age of existing result in days that would prevent downloading again |
| [params.props] | <code>object</code> | Additional properties to log |


* * *

<a name="downloadArcgisFeatureLayer"></a>

## downloadArcgisFeatureLayer(params) ⇒ <code>Promise.&lt;ArchiveEntry&gt;</code>
Download features from ArcGIS Feature Layer and log result.

**Kind**: global function  
**Returns**: <code>Promise.&lt;ArchiveEntry&gt;</code> - Log entry  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Parameters |
| params.url | <code>string</code> | Feature layer URL |
| params.maxDays | <code>number</code> | Maximum age of existing result in days that would prevent downloading again |
| [params.props] | <code>object</code> | Additional properties to log |


* * *

<a name="registerFile"></a>

## registerFile(params) ⇒ <code>Promise.&lt;ArchiveEntry&gt;</code>
Register existing file in archive log.

**Kind**: global function  
**Returns**: <code>Promise.&lt;ArchiveEntry&gt;</code> - Log entry  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Parameters |
| params.file | <code>string</code> | Path to file |
| params.date | <code>string</code> | Date of file |
| params.url | <code>string</code> | URL of original file download |
| params.method | <code>string</code> | Method used to download file from URL |
| params.maxDays | <code>number</code> | Maximum age of existing result in days that would prevent downloading again |
| [params.props] | <code>object</code> | Additional properties to log |


* * *

<a name="buildWfsDownloadUrl"></a>

## buildWfsDownloadUrl(url) ⇒ <code>object</code>
Build WFS GetFeature URL.

**Kind**: global function  
**Returns**: <code>object</code> - URL (url) and server capabilities (capabilities)  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | WFS server URL (ideally with typeName parameter) |


* * *

<a name="downloadPage"></a>

## downloadPage(params) ⇒ <code>Promise.&lt;ArchiveEntry&gt;</code>
Download web page as MHTML and log result.

Page is rendered in a headless browser (puppeteer) and saved as MHTML.

**Kind**: global function  
**Returns**: <code>Promise.&lt;ArchiveEntry&gt;</code> - Log entry  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Parameters |
| params.url | <code>string</code> | URL to download |
| params.format | <code>BrowserFormat</code> | Format to save page as |
| params.maxDays | <code>number</code> | Maximum age of existing result in days that would prevent downloading again |
| [params.props] | <code>object</code> | Additional properties to log |


* * *

