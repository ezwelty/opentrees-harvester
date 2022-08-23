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
<dt><a href="#module_taxamatch">taxamatch</a></dt>
<dd><p>Match scientific names.</p>
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
    * [~Infraspecies](#module_names..Infraspecies) : <code>object</code>
    * [~ParsedScientificName](#module_names..ParsedScientificName) : <code>object</code>


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
//   parsed: { scientific: 'Malus pumila', genus: 'Malus', species: 'pumila' },
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

<a name="module_names..Infraspecies"></a>

### names~Infraspecies : <code>object</code>
Infraspecies.

**Kind**: inner typedef of [<code>names</code>](#module_names)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| rank | <code>string</code> | Rank (`subsp.`, `var.`, `f.`, `subvar.`, `subf.`). |
| epithet | <code>string</code> | Epithet (lowercase: e.g. `pontica`). |


* * *

<a name="module_names..ParsedScientificName"></a>

### names~ParsedScientificName : <code>object</code>
Scientific name.

**Kind**: inner typedef of [<code>names</code>](#module_names)  
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

<a name="module_source"></a>

## source
Describe a source dataset.


* [source](#module_source)
    * [~Source](#module_source..Source)
        * [new Source(props, dir, [options])](#new_module_source..Source_new)
        * [.get([overwrite])](#module_source..Source+get) ⇒ <code>Promise.&lt;Array.&lt;string&gt;&gt;</code>
        * [.process(file, [options])](#module_source..Source+process) ⇒ <code>boolean</code>
        * [.getFields()](#module_source..Source+getFields) ⇒ <code>object</code>
        * [.getRows([n])](#module_source..Source+getRows) ⇒ <code>Array.&lt;object&gt;</code>
        * [.sample([options])](#module_source..Source+sample) ⇒ <code>object.&lt;string, Array&gt;</code>
        * [.glimpse([options])](#module_source..Source+glimpse)
        * [.empty()](#module_source..Source+empty)
        * [.isEmpty()](#module_source..Source+isEmpty) ⇒ <code>boolean</code>
        * [.find()](#module_source..Source+find) ⇒ <code>string</code>
        * [.open()](#module_source..Source+open) ⇒ <code>gdal.Dataset</code>
        * [.close()](#module_source..Source+close)
        * [.openVrt([keepGeometryFields])](#module_source..Source+openVrt) ⇒ <code>gdal.Dataset</code>
        * [.closeVrt()](#module_source..Source+closeVrt)
        * [.getSrsString([layer])](#module_source..Source+getSrsString) ⇒ <code>string</code>
        * [.getSrs([layer])](#module_source..Source+getSrs) ⇒ <code>gdal.SpatialReference</code>
        * [.getGeometry()](#module_source..Source+getGeometry) ⇒ <code>Object</code> \| <code>undefined</code>
        * [.getVrt([keepGeometryFields])](#module_source..Source+getVrt) ⇒ <code>string</code>
        * [.success(msg, ...objects)](#module_source..Source+success)
        * [.log(msg, ...objects)](#module_source..Source+log)
        * [.warn(msg, ...objects)](#module_source..Source+warn)
        * [.error(msg, ...objects)](#module_source..Source+error)
    * [~SourceProperties](#module_source..SourceProperties) : <code>object</code>
    * [~SourcePropertiesExtended](#module_source..SourcePropertiesExtended) : <code>SourceProperties</code>


* * *

<a name="module_source..Source"></a>

### source~Source
Class representing a source dataset.

**Kind**: inner class of [<code>source</code>](#module_source)  

* [~Source](#module_source..Source)
    * [new Source(props, dir, [options])](#new_module_source..Source_new)
    * [.get([overwrite])](#module_source..Source+get) ⇒ <code>Promise.&lt;Array.&lt;string&gt;&gt;</code>
    * [.process(file, [options])](#module_source..Source+process) ⇒ <code>boolean</code>
    * [.getFields()](#module_source..Source+getFields) ⇒ <code>object</code>
    * [.getRows([n])](#module_source..Source+getRows) ⇒ <code>Array.&lt;object&gt;</code>
    * [.sample([options])](#module_source..Source+sample) ⇒ <code>object.&lt;string, Array&gt;</code>
    * [.glimpse([options])](#module_source..Source+glimpse)
    * [.empty()](#module_source..Source+empty)
    * [.isEmpty()](#module_source..Source+isEmpty) ⇒ <code>boolean</code>
    * [.find()](#module_source..Source+find) ⇒ <code>string</code>
    * [.open()](#module_source..Source+open) ⇒ <code>gdal.Dataset</code>
    * [.close()](#module_source..Source+close)
    * [.openVrt([keepGeometryFields])](#module_source..Source+openVrt) ⇒ <code>gdal.Dataset</code>
    * [.closeVrt()](#module_source..Source+closeVrt)
    * [.getSrsString([layer])](#module_source..Source+getSrsString) ⇒ <code>string</code>
    * [.getSrs([layer])](#module_source..Source+getSrs) ⇒ <code>gdal.SpatialReference</code>
    * [.getGeometry()](#module_source..Source+getGeometry) ⇒ <code>Object</code> \| <code>undefined</code>
    * [.getVrt([keepGeometryFields])](#module_source..Source+getVrt) ⇒ <code>string</code>
    * [.success(msg, ...objects)](#module_source..Source+success)
    * [.log(msg, ...objects)](#module_source..Source+log)
    * [.warn(msg, ...objects)](#module_source..Source+warn)
    * [.error(msg, ...objects)](#module_source..Source+error)


* * *

<a name="new_module_source..Source_new"></a>

#### new Source(props, dir, [options])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| props | <code>SourceProperties</code> |  | Source properties. |
| dir | <code>string</code> |  | Local directory to which remote files are downloaded and where local files are searched for. |
| [options] | <code>object</code> |  |  |
| [options.exit] | <code>boolean</code> | <code>true</code> | Whether to throw errors or print them to the console. |
| [options.srs] | <code>string</code> | <code>&quot;EPSG:4326&quot;</code> | Spatial reference system to assume if none is defined in `props.srs` and none can be read from the input files. |


* * *

<a name="module_source..Source+get"></a>

#### source.get([overwrite]) ⇒ <code>Promise.&lt;Array.&lt;string&gt;&gt;</code>
Prepare remote source data for processing.

Downloads remote files (`this.props.download`), unpacks compressed or
archive files, and executes shell commands (`this.props.execute`).

**Kind**: instance method of [<code>Source</code>](#module_source..Source)  
**Returns**: <code>Promise.&lt;Array.&lt;string&gt;&gt;</code> - Resolves to the paths of the downloaded and
unpacked local files (if any).  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [overwrite] | <code>boolean</code> | <code>false</code> | Whether to proceed if working directory is not empty (see [Source#isEmpty](Source#isEmpty)). |


* * *

<a name="module_source..Source+process"></a>

#### source.process(file, [options]) ⇒ <code>boolean</code>
Process input and write to output.

Reading, writing, and coordinate transformations are performed by
[GDAL](https://gdal.org) via the
[node-gdal-next](https://www.npmjs.com/package/gdal-next) bindings.

Processing steps include a schema crosswalk (`this.props.crosswalk`),
skipping features by field values (`this.props.delFunc`), reducing complex
geometries to centroid points (`options.centroids`), and skipping features
outside a bounding box (`options.bounds`). For files without explicit
geometries, a temporary [VRT](https://gdal.org/drivers/vector/vrt.html)
file is created (see [Source#getVrt](Source#getVrt)).

**Kind**: instance method of [<code>Source</code>](#module_source..Source)  
**Returns**: <code>boolean</code> - Whether processed file (true) or skipped (false).  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| file | <code>string</code> |  | Output file path. |
| [options] | <code>object</code> |  | Output options. |
| [options.driver] | <code>string</code> |  | Name of GDAL driver to use to write to the output file (see https://gdal.org/drivers/vector). Guessed from file extension if not provided. |
| [options.creation] | <code>Array.&lt;string&gt;</code> \| <code>object</code> |  | Driver-specific dataset creation options (see https://gdal.org/drivers/vector). Only default, for 'CSV', is `['GEOMETRY=AS_WKT']` to include feature geometry in output. |
| [options.overwrite] | <code>boolean</code> | <code>false</code> | Whether to proceed if `file` already exists. |
| [options.srs] | <code>string</code> | <code>&quot;+init&#x3D;epsg:4326&quot;</code> | Output spatial reference system in any format supported by [OGRSpatialReference.SetFromUserInput()](https://gdal.org/api/ogrspatialref.html#classOGRSpatialReference_1aec3c6a49533fe457ddc763d699ff8796). Use 'EPSG:*' for (latitude, longitude) and '+init=epsg:*' (PROJ<6 behavior) for (longitude, latitude). If it is the same as the input SRS, axis order will remain unchanged regardless. |
| [options.centroids] | <code>boolean</code> | <code>false</code> | Whether to reduce non-point geometries to centroids. |
| [options.keepInvalid] | <code>boolean</code> | <code>false</code> | Whether to keep features with empty or invalid geometries. |
| [options.keepFields] | <code>boolean</code> | <code>false</code> | Whether to keep the input feature fields alongside the result of the schema crosswalk (`this.props.crosswalk`). |
| [options.keepGeometryFields] | <code>boolean</code> | <code>false</code> | Whether to keep the input feature geometry fields. Applies only to inputs for which a VRT file is written (see [Source#getVrt](Source#getVrt)) and if `options.keepFields` is also `true`. |
| [options.prefix=] | <code>string</code> |  | String to append to input field names to prevent collisions with output field names. Applies only if `options.keepFields` is `true`. |
| [options.bounds] | <code>Array.&lt;number&gt;</code> |  | Bounding box in output SRS (`options.srs`) in the format [xmin, ymin, xmax, ymax]. If provided, features outside the bounds are skipped. |
| [options.delFunc] | <code>function</code> |  | Function that takes an object (of feature field values after the crosswalk) and returns a value (e.g. `obj => obj.description === 'vacant site'`). The feature is excluded from the output if the returned value evaluates to `true`. |
| [options.allowEmptyGeometry] | <code>boolean</code> | <code>false</code> | Whether to allow feature layer with empty geometry. |


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

<a name="module_source..Source+empty"></a>

#### source.empty()
Empty and remove the source directory.

**Kind**: instance method of [<code>Source</code>](#module_source..Source)  

* * *

<a name="module_source..Source+isEmpty"></a>

#### source.isEmpty() ⇒ <code>boolean</code>
Check whether the source directory is missing or empty of files.

Checks any child directories recursively and ignores dotfiles (.*).

**Kind**: instance method of [<code>Source</code>](#module_source..Source)  
**Returns**: <code>boolean</code> - Whether source directory is empty.  

* * *

<a name="module_source..Source+find"></a>

#### source.find() ⇒ <code>string</code>
Find path to input file.

Searches for all non-dotfiles in the source directory recursively and
attempts to guess which file to pass to GDAL based on file extensions.
Throws an error if no file is found or if multiple candidate files are
found.

**Kind**: instance method of [<code>Source</code>](#module_source..Source)  
**Returns**: <code>string</code> - File path.  

* * *

<a name="module_source..Source+open"></a>

#### source.open() ⇒ <code>gdal.Dataset</code>
Open input file with GDAL.

**Kind**: instance method of [<code>Source</code>](#module_source..Source)  
**Returns**: <code>gdal.Dataset</code> - See the documentation for
[node-gdal-next](https://contra.io/node-gdal-next/classes/gdal.Dataset.html).
Result is cached until closed with [Source#close](Source#close).  

* * *

<a name="module_source..Source+close"></a>

#### source.close()
Close input file if open with GDAL.

**Kind**: instance method of [<code>Source</code>](#module_source..Source)  

* * *

<a name="module_source..Source+openVrt"></a>

#### source.openVrt([keepGeometryFields]) ⇒ <code>gdal.Dataset</code>
Open input file with GDAL via a VRT file.

Opens the input file via a virtual format (VRT) file written to the dotfile
`.vrt`. The contents of the file is built by [Source#getVrt](Source#getVrt).

**Kind**: instance method of [<code>Source</code>](#module_source..Source)  
**Returns**: <code>gdal.Dataset</code> - See the documentation for
[node-gdal-next](https://contra.io/node-gdal-next/classes/gdal.Dataset.html).
The result is cached until closed with [Source#closeVrt](Source#closeVrt).  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [keepGeometryFields] | <code>boolean</code> | <code>false</code> | Whether the VRT file should return geometry fields as regular feature fields. |


* * *

<a name="module_source..Source+closeVrt"></a>

#### source.closeVrt()
Close input file if open with GDAL via a VRT file.

**Kind**: instance method of [<code>Source</code>](#module_source..Source)  

* * *

<a name="module_source..Source+getSrsString"></a>

#### source.getSrsString([layer]) ⇒ <code>string</code>
Get spatial reference system (SRS) of input as a string.

**Kind**: instance method of [<code>Source</code>](#module_source..Source)  
**Returns**: <code>string</code> - Either the provided SRS (`this.props.srs`), the SRS read
from the input file (as well-known-text), or the default SRS
(`this.options.srs`).  

| Param | Type | Description |
| --- | --- | --- |
| [layer] | <code>gdal.Layer</code> | Feature layer from which to read SRS. If not provided, defaults to the first layer of the input file (see @link Source#open). |


* * *

<a name="module_source..Source+getSrs"></a>

#### source.getSrs([layer]) ⇒ <code>gdal.SpatialReference</code>
Get spatial reference system (SRS) of input.

**Kind**: instance method of [<code>Source</code>](#module_source..Source)  
**Returns**: <code>gdal.SpatialReference</code> - SRS object initialized by
`gdal.SpatialReference.fromUserInput()` from the result of
[Source#getSrsString](Source#getSrsString). See the documentation for
[node-gdal-next](https://contra.io/node-gdal-next/classes/gdal.SpatialReference.html#method-fromUserInput).  

| Param | Type | Description |
| --- | --- | --- |
| [layer] | <code>gdal.Layer</code> | Feature layer from which to read SRS. If not provided, defaults to the first layer of the input file (see @link Source#open). |


* * *

<a name="module_source..Source+getGeometry"></a>

#### source.getGeometry() ⇒ <code>Object</code> \| <code>undefined</code>
Get geometry field name(s) of input.

**Kind**: instance method of [<code>Source</code>](#module_source..Source)  
**Returns**: <code>Object</code> \| <code>undefined</code> - Names of
geometry fields either provided (`this.props.srs`) or guessed from field
names, or `undefined` if the input already has explicit geometries.  

* * *

<a name="module_source..Source+getVrt"></a>

#### source.getVrt([keepGeometryFields]) ⇒ <code>string</code>
Get VRT (OGR Virtual Format) file content.

For files without explicit geometries (e.g. tabular text files), a temporary
[VRT file](https://gdal.org/drivers/vector/vrt.html) can be created listing
the spatial reference system (see [Source#getSrsString](Source#getSrsString)) and
geometry field names (see [Source#getGeometry](Source#getGeometry)) for GDAL to use.

**Kind**: instance method of [<code>Source</code>](#module_source..Source)  
**Returns**: <code>string</code> - VRT file content.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [keepGeometryFields] | <code>boolean</code> | <code>false</code> | Whether VRT file should return geometry fields as regular feature fields. |


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

<a name="module_source..SourceProperties"></a>

### source~SourceProperties : <code>object</code>
Properties used by [Source](Source) for data processing.

**Kind**: inner typedef of [<code>source</code>](#module_source)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Identifier prepended to console output. |
| download | <code>string</code> \| <code>Array.&lt;string&gt;</code> | Path to remote files to download and unpack. |
| execute | <code>string</code> \| <code>Array.&lt;string&gt;</code> | Shell commands executed from working directory (`Source.dir`) after file download and unpack. In `npm run` commands, prepend the `INIT_CWD` variable to paths to the files (https://docs.npmjs.com/cli/run-script). |
| filename | <code>string</code> | Glob pattern (relative to working directory) used to find the file to read. Only needed when there are multiple files and either none or multiple have extensions recognized by GDAL. |
| srs | <code>string</code> | Spatial reference system in any format supported by [OGRSpatialReference.SetFromUserInput()](https://gdal.org/api/ogrspatialref.html#classOGRSpatialReference_1aec3c6a49533fe457ddc763d699ff8796). |
| geometry | <code>object</code> | Geometry field names for formats without explicit geometries (e.g. tabular text files like CSV). If not provided, will attempt to guess from field names. |
| geometry.wkt | <code>string</code> | Name of field with well-known-text (wkt) geometry. If provided, takes precedence over x, y. |
| geometry.x | <code>string</code> | Name of field with x coordinate (longitude, easting). |
| geometry.y | <code>string</code> | Name of field with y coordinate (latitude, northing). |
| crosswalk | <code>Object.&lt;string, (string\|function())&gt;</code> | Crosswalk mapping to a target schema. For each `key: value` pair, `key` is the new field name and `value` is either the old field name (e.g. `height: 'HEIGHT'`) or a function that takes an object (of feature field values) and returns a value (e.g. `height: obj => obj.HEIGHT / 100`). |
| delFunc | <code>function</code> | Function that takes an object (of feature field values before the crosswalk) and returns a value (e.g. `obj => obj.HEALTH === 'dead'`). The feature is excluded from the output if the returned value evaluates to `true`. |
| coordsFunc | <code>function</code> | Function that takes an object (of feature field values before the crosswalk) and returns a number array of point coordinates `[x, y]`. This is a useful alternative to `geometry` if the coordinates need to be extracted from field values (e.g. `obj => obj.XY.split(';').map(Number)`). |


* * *

<a name="module_source..SourcePropertiesExtended"></a>

### source~SourcePropertiesExtended : <code>SourceProperties</code>
Additional properties not used by [Source](Source) but used downstream.

**Kind**: inner typedef of [<code>source</code>](#module_source)  
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

