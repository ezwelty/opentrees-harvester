# Opentrees harvester

Authors: Ethan Welty ([fallingfruit.org](https://fallingfruit.org)), Steve Bennett ([opentrees.org](https://opentrees.org))

Scripts that fetch and process data about inventoried trees and other plants from government and university open data sources. The result is used, among other things, to populate [opentrees.org](https://opentrees.org).

- [Installation](#installation)
- [Overview](#overview)
- [Usage](#usage)
- [Target schema](#target-schema)
- [Development](#development)

## Installation

```bash
git clone https://github.com/ezwelty/opentrees-harvester.git
cd opentrees-harvester
yarn
```

Copy `.env.example` to `.env` and set the environment variables as needed.

```bash
cp .env.example .env
```

- `DATA_ARCHIVE` (default `archive/data`): Directory of the data archive. See [Caching](#caching).
- `DATA_ARCHIVE_LOG` (default `archive/data.jsonl`): Log file of the data archive. See [Caching](#caching).
- `GEOCODE_ARCHIVE` (default `archive/geocode`): Directory of the geocode archive. Address geocode results are stored as JSON in files with paths of the form `{address_hash}.json`.
- `GOOGLE_MAPS_API_KEY`: Google Maps API key for geocoding addresses.

## Overview

### Sources ([`sources.js`](sources.js))

Each source dataset is described as a Javascript object (see [`SourceProperties`](API.md#module_types..SourceProperties)) in a single giant array sorted nominally by `country`, `state`, `city`, `designation`, and `scope`. A schema `crosswalk` strives to map the source dataset to our [target schema](#target-schema).

### Downloading

The harvester downloads source `data`, `metadata`, and `license` from URLs using the specified [`DownloadMethod`](API.md#module_types..DownloadMethod), which includes file-based download, querying the ArcGIS Feature Layer API, or rendering the URL in a web browser.

### Caching

The harvester aggressively caches source data and metadata in order to avoid re-downloading files, track changes of files over time, and protect against the inevitable link rot. Files are stored in the archive (`DATA_ARCHIVE` environment variable) with paths of the form `{hash}/{timestamp}/{filename}`, where `hash` is either the checksum of the source URL (if downloaded from a URL) or the checksum of the file content (if not). Archived files are described in the log file (`DATA_ARCHIVE_LOG` environment variable), a [JSON Lines](http://jsonlines.org) file that records file path, content checksum, date, and other file properties (see [`ArchiveEntry`](API.md#module_types..ArchiveEntry)).

### Processing

Downloading, caching, and finally data processing are typically executed via the [`Source`](API.md#module_source..Source) class, which wraps source properties and provides methods for each step in the pipeline. Processing includes reading the source data with [GDAL](https://gdal.org), applying the schema crosswalk, and writing the result to a new file.

## Usage

### Command line interface ([`cli/*.js`](cli))

The command line interface provides a quick way to download and process all or a subset of the source datasets. See each command's help message:

```bash
yarn get --help
yarn process --help
```

### Source class ([`lib/source.js`](lib/source.js))

The [`Source`](API.md#module_source..Source) class wraps source properties to facilitate data processing.

Here is a simple example using the included [`tests/simple.csv`](tests/simple.csv):

```js
const Source = require('./lib/source')

const source = new Source(
  props = { 
    id: 'test',
    data: 'https://raw.githubusercontent.com/ezwelty/opentrees-harvester/main/tests/simple.csv',
    geometry: { x: 'LON', y: 'LAT' },
    srs: 'EPSG:4326',
    crosswalk: {
      ref: 'ID',
      common: x => x['NAME'].toLowerCase(),
      height_cm: 'HEIGHT_CM'
    }
  }
)
```

Use [`Source.findFiles()`](API.md#module_source..Source+findFiles) to download the remote data file (`source.props.data`) to the archive.

```js
await source.fetchFiles('data')  // 'data' (default), 'metadata', or 'license'
// [
//   {
//     date: 2024-09-24T20:41:22.507Z,
//     url: 'https://raw.githubusercontent.com/ezwelty/opentrees-harvester/main/tests/simple.csv',
//     method: 'file',
//     checksum: '7303b0bda0ca68c7db73922af340e4aa',
//     path: 'archive/data/d60579b4f36793bb54f6f4790bd683a2/2024-09-24T204122.507Z/simple.csv.txt',
//     props: { type: 'data' }
//   }
// ]
```

Optionally, use [`Source.findFiles()`](API.md#module_source..Source+findFiles) to retrieve them from the archive without downloading them. The output would be the same as above.

We can now open the dataset with GDAL, then use one of the many methods to inspect it ([`Source.getRows()`](API.md#module_source..Source+getRows), [`Source.glimpse()`](API.md#module_source..Source+glimpse), etc).

```js
// Note: We need to set the GDAL driver exlicitly because the data was downloaded as
// '.csv.txt' instead of '.csv'.
source.props.driver = 'CSV'
await source.open()
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

Use [`Source.process()`](API.md/#module_source..Source+process) to process the input and write the result to a new file. In this case, this includes applying our schema crosswalk (`source.props.crosswalk`).

```js
await source.process('output/test.csv', { overwrite: true })
// [test] Processing CSV:archive/data/d60579b4f36793bb54f6f4790bd683a2/2024-09-24T204122.507Z/simple.csv.txt
// [test] Wrote output: output/test.csv
```

We can modify the crosswalk following our conventions to apply unit conversions and other cleaning steps (see [`lib/convert.js`](lib/convert.js)). In this case, `height_cm` (in centimeters) is automatically converted to standard `height` (in meters).

```js
const { modifyCrosswalk } = require('./lib/convert.js')
source.props.crosswalk = modifyCrosswalk(source.props.crosswalk)
await source.process('output/test.csv', { overwrite: true })
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

The source code is documented using inline [JSDoc 3](https://jsdoc.app) comments. Update the API documentation ([API.md](API.md)) from the source code by running:

```bash
yarn test
yarn docs
```
