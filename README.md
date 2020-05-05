# OpenTrees data

Authors: Steve Bennett (opentrees.org), Ethan Welty (fallingfruit.org)

Scripts that fetch and process data about inventoried trees and other plants from government and university open data sources. The result is used to generate vector tiles for display on opentrees.org.

- [Installation](#installation)
- [Usage](#usage)
- [Target Schema](#target-schema)
- [Development](#development)

## Installation

```bash
git clone https://github.com/ezwelty/opentrees-data.git
cd opentrees-data
npm install
```

## Usage

### Source properties ([`sources/*.js`](sources))

Each source dataset is described as a Javascript `object` following the format described at [`API.md#SourceProperties`](API.md#SourceProperties). They are sorted into modules organized by country. The schema crosswalks (`crosswalk` properties) strive to map each source dataset to our [target schema](#target-schema).

### Source class ([`source.js`](source.js))

The `Source` class wraps source properties to facilitate data processing. All methods are documented at [`API.md#Source`](API.md#Source).

Here is a simple example using the included [`tests/simple.csv`](tests/simple.csv):

```js
const Source = require('./source')

const source = new Source(
  props = { 
    id: 'test',
    download: 'https://raw.githubusercontent.com/ezwelty/opentrees-data/rewrite/tests/simple.csv',
    geometry: { x: 'LON', y: 'LAT' },
    srs: 'EPSG:4326',
    crosswalk: {
      ref: 'ID',
      common: 'NAME',
      height: x => x.HEIGHT_CM / 100
    }
  },
  dir = 'test/input'
)
```

Use [`Source.get()`](API.md/#Source+get) to download remote files (`source.props.download`) to the source directory (`source.dir`) and prepare them for processing.

```js
source.get()
// Promise { <pending> }
// [test] Downloading simple.csv
// [test] Downloaded simple.csv (0 MB)
// [test] Ready to process
```

Use [`Source.process()`](API.md/#Source+process) to process the input and write the result to a new file. In this case, this includes (1) writing a [VRT file](https://gdal.org/drivers/vector/vrt.html) to tell [GDAL](https://gdal.org) which spatial reference system and geometry field names to use when reading the input and (2) applying our schema crosswalk (`source.props.crosswalk`).

```js
source.process('test/output/output.csv')
// [test] Processing test/input/simple.csv
// [test] Writing and reading VRT file
// [test] Wrote output: test/output/output.csv
```

## Target schema

- [Links](#links)
- [Name & Gender](#name-&-gender)
- [Dimension](#dimension)
- [Condition](#condition)
- [Time](#time)
- [Other](#other)

The ultimate goal is to harmonize the many disparate source datasets to a common schema, described below.

### General recommendations

Date fields should follow the [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format `YYYY-MM-DDThh:mm:ss(Z|±hh:mm)` or a subset thereof (e.g. `YYYY-MM-DD`, `YYYY`).

Numeric and date ranges can be expressed by appending `_min` and `_max` to the field name. For example, "planted in the 1950s" becomes `planted_min`: `1950`, `planted_max`: `1959`. Unbounded ranges leave out either `_min` or `_max`. For example, "height > 5 m" becomes `height_min`: `5`. For fields representing a range as a string, append `_range` to the field name for automatic parsing of the range downstream (e.g. `height_range` to `height_min`, `height_max`).

Numeric fields should be tagged with a unit (if known) for automatic unit conversion downstream (e.g. `height_m`, `height_m_min`):

- Length
  - `_cm`: centimeters
  - `_m`: meters
  - `_in`: inches
  - `_ft`: feet
- Mass
  - `_kg`: kilograms
  - `_lb`: pounds

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
`height` | Height in meters.
`dbh` | Diameter of trunk at breast height in centimeters.
`crown` | Crown spread (average diameter of crown) in meters.
`stems` | Number of stems.
| *Secondary* | |
`circumference` | Circumference of trunk in centimeters.

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
`carbon` | Carbon storage in kilograms.
`carbon_annual` | Carbon storage in kilograms per year.
`edible` | Edible flag: [`true`, `false`, `fruit`, `nut`].
`harvest` | Notes about when or how to harvest.
`notable` | Designation as notable: [`champion`, `heritage`, `memorial`, `veteran`, `historic`, `remarquable` (fr)].
`origin` | Biogeographic origin: [`endemic`, `native`, `introduced`, `naturalized`, `invasive`].

## Development

The source code is documented using inline [JSDoc 3](https://jsdoc.app/) comments. Update the API documentation ([API.md](API.md)) from the source code by running:

```bash
npm run apidoc
```
