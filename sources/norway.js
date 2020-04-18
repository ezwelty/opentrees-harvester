module.exports = [
  {
    id: 'oslo',
    country: 'Norway',
    short: 'Oslo',
    download: 'https://opendata.arcgis.com/datasets/f256d2d837554edab8b53bb6af90bc8d_19.zip',
    info: 'https://hub.arcgis.com/datasets/f256d2d837554edab8b53bb6af90bc8d_19?geometry=10.516%2C59.709%2C10.873%2C59.884',
    crosswalk: {
      updated: 'last_edi_1',
      scientific: 'BotNavn',
      common: 'Artsnavn',
      // lots of others...
    }
  }
].map(s => ({ ...s, country: 'Norway' }))
