# Opentrees harvester

Authors: Ethan Welty ([fallingfruit.org](https://fallingfruit.org)), Steve Bennett ([opentrees.org](https://opentrees.org))

Scripts that fetch and process data about inventoried trees and other plants from government and university open data sources. The result is used, among other things, to populate [opentrees.org](https://opentrees.org).

- [Installation](#installation)
- [Usage](#usage)
- [Target Schema](#target-schema)
- [Development](#development)

## Installation

```bash
git clone https://github.com/ezwelty/opentrees-harvester.git
cd opentrees-harvester
yarn
```

## Usage

### Source properties ([`sources/*.js`](sources))

Each source dataset is described as a Javascript `object` following the format described at [`API.md#SourceProperties`](API.md#SourceProperties). They are sorted into modules organized by country. The schema crosswalks (`crosswalk` properties) strive to map each source dataset to our [target schema](#target-schema).

### Command line interface ([`cli/*.js`](cli))

The command line interface provides a quick way to process all or a subset of the source datasets. See each command's help message:

```bash
yarn get -h
yarn process -h
```

### Source class ([`lib/source.js`](lib/source.js))

The `Source` class wraps source properties to facilitate data processing. All methods are documented at [`API.md`](API.md#module_source..Source).

Here is a simple example using the included [`tests/simple.csv`](tests/simple.csv):

```js
const Source = require('./lib/source')

const source = new Source(
  props = { 
    id: 'test',
    download: 'https://raw.githubusercontent.com/ezwelty/opentrees-harvester/main/tests/simple.csv',
    geometry: { x: 'LON', y: 'LAT' },
    srs: 'EPSG:4326',
    crosswalk: {
      ref: 'ID',
      common: x => x['NAME'].toLowerCase(),
      height_cm: 'HEIGHT_CM'
    }
  },
  dir = 'test/input'
)
```

Use [`Source.get()`](API.md/#module_source..Source+get) to download remote files (`source.props.download`) to the source directory (`source.dir`) and prepare them for processing.

```js
source.get()
// Promise { <pending> }
// [test] Downloading simple.csv
// [test] Downloaded simple.csv (0 MB)
// [test] Ready to process
```

Optionally, use [`Source.find()`](API.md/#module_source..Source+find) to check that we downloaded a file recognized by GDAL, then [`Source.getRows()`](API.md/#module_source..Source+getRows) (or `Source.getFields()`, `Source.sample()`, `Source.glimpse()`, etc) to read content from the file with GDAL.

```js
source.find()
// 'test/input/simple.csv'
source.getRows(1)
// [
//   {
//     ID: '1',
//     LON: '145',
//     LAT: '-37.8',
//     NAME: 'Loquat',
//     HEIGHT_CM: '1200'
//   }
// ]
```

Use [`Source.process()`](API.md/#module_source..Source+process) to process the input and write the result to a new file. In this case, this includes (1) writing a [VRT file](https://gdal.org/drivers/vector/vrt.html) to tell [GDAL](https://gdal.org) which spatial reference system and geometry field names to use when reading the input and (2) applying our schema crosswalk (`source.props.crosswalk`).

```js
source.process('test/output/output.csv')
// [test] Processing test/input/simple.csv
// [test] Writing and reading VRT file
// [test] Wrote output: test/output/output.csv
```

We can modify the crosswalk following our conventions to apply unit conversions and other cleaning steps (see [`lib/convert.js`](lib/convert.js)). In this case, `height_cm` (in centimeters) is automatically converted to standard `height` (in meters).

```js
const { modifyCrosswalk } = require('./lib/convert.js')
source.props.crosswalk = modifyCrosswalk(source.props.crosswalk)
// { ref: 'ID', common: [Function], height: [Function] }
source.process('test/output/output.csv', {overwrite: true})
```

Finally, the result can also be inspected using the `Source` class.

```js
const out = new Source({id: 'out'}, 'test/output')
out.find()
// 'test/output/output.csv'
out.getRows(1)
// [ { ref: '1', common: 'loquat', height: '12' } ]
```

### Scientific name matching

Plant scientific names in our input datasets are frequently misspelled or deprecated synonyms of accepted names.
Modules [`lib/names.js`](lib/names.js) and [`lib/taxamatch.js`](lib/taxamatch.js) incude tools to parse scientific names and match them to a reference taxonomy using exact, phonetic, and fuzzy matching.

The example below loads a trivial taxonomy for speed. In practice, the taxonomy of all vascular plants in the [Catalogue of Life](https://www.catalogueoflife.org) is used as the reference (see [`lib/col.js`](lib/col.js)).

```js
const taxamatch = require('./lib/taxamatch')
const { ScientificName } = require('./lib/names')

const taxa = [
  { id: 0, genus: 'Malus' },
  { id: 1, genus: 'Malus', species: 'pumila' }
]
const matcher = new taxamatch.Matcher(taxa, 'id')
sciname = ScientificName.fromFields({ scientific: 'Malus punila' })
// ScientificName {
//   parsed: { genus: 'Malus', species: 'punila' },
//   input: { scientific: 'Malus punila' }
// }
sciname.matches = matcher.match(sciname.parsed)
console.log(JSON.stringify(sciname.report(), null, 2))
// {
//   "input": {
//     "scientific": "Malus punila"
//   },
//   "parsed": {
//     "genus": "Malus",
//     "species": "punila"
//   },
//   "matches": [
//     {
//       "fuzzy": [
//         1,
//         0.8333333333333334
//       ],
//       "taxon": {
//         "id": 1,
//         "genus": "Malus",
//         "species": "pumila"
//       }
//     }
//   ],
//   "warnings": [
//     "Fuzzy match"
//   ]
// }
```

## Target schema

- [Conventions](#conventions)
- [Links](#links)
- [Name & Gender](#name-&-gender)
- [Dimension](#dimension)
- [Condition](#condition)
- [Time](#time)
- [Other](#other)

The ultimate goal is to harmonize the many disparate source datasets to a common schema, described below.

### Conventions

Spatial coordinates use WGS84 (EPSG:4326) decimal degrees.

Date fields follow the [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format `YYYY-MM-DDThh:mm:ss(Z|±hh:mm)` or a subset thereof (e.g. `YYYY-MM-DD`, `YYYY`).

Numeric fields use SI units: meters for length and kilograms for mass. In schema crosswalks, the original unit (if known) is appended to the field name for downstream unit conversion (e.g. `height_cm` in centimeters -> `height` in standard unit):

- Length
  - `_m`: meters (standard)
  - `_cm`: centimeters
  - `_in`: inches
  - `_ft`: feet
- Mass
  - `_kg`: kilograms (standard)
  - `_lb`: pounds

Numeric and date ranges use the field name suffixes `_min` and `_max`. For example, "planted in the 1950s" becomes `planted_min`: `50`, `planted_max`: `59`. A missing `_min` or `_max` indicates an unbounded range. For example, "height > 5 m" becomes `height_min`: `5`, `height_max`: `null`. In schema crosswalks, the `_range` suffix is added to fields representing a range as a string for downstream parsing (e.g. `height_m_range`: `0-1m` -> `height_min`: `0`, `height_max`: `1`).

### Links

| name | description |
| -- | -- |
`ref` | Original feature identifier.

### Name & Gender

| name | description |
| -- | -- |
| *Primary* | |
`scientific` | Scientific name, including infraspecific epithets, hybrids, and cultivar (e.g. `Malus`, `Malus pumila`, `Malus pumila var. asiatica`, `Malus x asiatica`, `Malus pumila 'Gala'`).
`common` | Common name (e.g. `apple`, `live oak`, `California poppy`).
`gender` | Gender, applicable to dioecious plants: [`male`, `female`].
| *Secondary* | |
`family` | Family (e.g. `Rosaceae`).
`genus` | Genus (e.g. `Malus`).
`species` | Species (e.g. `pumila`).
`infraspecies` | Any infraspecific epithets (subspecies, variety, form) or cultivars (e.g. `asiatica`, `Gala`, `var. asiatica 'Gala'`).
`cultivar` | Cultivar (e.g. `Gala`).
`description` | Other name information not covered by other fields.

### Dimension

| name | description |
| -- | -- |
`count` | Number of individuals, if more than `1` (the default).
`height` | Height.
`dbh` | Diameter of trunk at breast height.
`crown` | Crown spread (average diameter of crown).
`stems` | Number of stems.
| *Secondary* | |
`circumference` | Circumference of trunk (converted to `dbh` downstream).

### Condition

| name | description |
| -- | -- |
`health` | Health: [`dead`, `poor`, `fair`, `good`, `very good`, `excellent`].
`maturity` | Maturity: [`young`, `semi-mature`, `mature`, `over-mature`].
`solidity` | Solidity (unlikelihood of falling): [`failed`, `poor`, `fair`, `good`].

### Time

| name | description |
| -- | -- |
`planted` | Date of planting.
`born` | Date of birth.
`dead` | Date of death (expected or actual).
`updated` | Date that data was last updated.
| *Secondary* | |
`age` | Age in years.
`ule` | Useful life expectancy in years.
| *Disputed* | |
`installed` | Date installed (*meaning unclear*).

### Other

| name | description |
| -- | -- |
`note` | Notes.
`location` | Geopolitical setting: [`park`, `street`, `council` (Australia), `canton` (Switzerland), `school`, `federal`, `corporate`, `residential`].
`owner` | Name or description of owner.
`manager` | Name or description of manager or maintainer.
`value` | Monetary value in the local currency.
`carbon` | Carbon storage (mass).
`carbon_annual` | Carbon storage (mass) per year.
`edible` | Edible flag: [`true`, `false`, `fruit`, `nut`].
`harvest` | Notes about when or how to harvest.
`notable` | Designation as notable: [`champion`, `heritage`, `memorial`, `veteran`, `historic`, `remarquable` (fr)].
`origin` | Biogeographic origin: [`endemic`, `native`, `introduced`, `naturalized`, `invasive`].

## Development

The source code is documented using inline [JSDoc 3](https://jsdoc.app/) comments. Update the API documentation ([API.md](API.md)) from the source code by running:

```bash
yarn docs
```
