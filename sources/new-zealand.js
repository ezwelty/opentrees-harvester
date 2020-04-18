module.exports = [
  {
    id: 'palmerston_north',
    country: 'New Zealand',
    short: 'Palmerston North',
    download: 'https://opendata.arcgis.com/datasets/077787e2299541bc8d2c2dbf8d7dc4e4_18.zip?outSR=%7B%22latestWkid%22%3A2193%2C%22wkid%22%3A2193%7D',
    info: 'http://data-pncc.opendata.arcgis.com/datasets/077787e2299541bc8d2c2dbf8d7dc4e4_18/data',
    crosswalk: {
      scientific: 'botanical_',
      common: 'species'
    }
  }
].map(s => ({ ...s, country: 'New Zealand' }))
