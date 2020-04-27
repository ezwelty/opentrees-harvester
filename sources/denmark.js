module.exports = [
  {
    id: 'copenhagen',
    country: 'Denmark',
    download: 'http://wfs-kbhkort.kk.dk/k101/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=k101:trae_basis&outputFormat=csv&SRSNAME=EPSG:4326',
    info: 'https://www.opendata.dk/city-of-copenhagen/trae_basis',
    crosswalk: {
      scientific: 'traeart',
      common: 'dansk_navn',
      // Slaegstnavn "family name" has values like Lind
      planted: 'planteaar',
      // Stammeofma "tribal embrace(?)" - crown?,
      health: 'sundhed',
      // TODO sooo many other fields
    },
    short: 'Copenhagen'
  },
  {
    pending: 'Data is empty',
    id: 'ballerup',
    country: 'Denmark',
    short: 'Ballerup',
    long: 'Ballerup Kommune',
    download: 'http://ballerup.mapcentia.com/api/v1/sql/ballerup?q=SELECT%20*%20FROM%20drift.mapgo_punkter%20WHERE%20underelement%20=%20%27Fritvoksende%20tr%C3%A6er%27&lifetime=0&srs=4326&client_encoding=UTF8&format=csv',
    info: 'https://www.opendata.dk/ballerup-kommune/fritvoksende-trae',
    license: {
      name: 'Open Data DK licens',
      url: 'http://portal.opendata.dk/dataset/open-data-dk-licens'
    }
  },
  {
    id: 'vejle',
    country: 'Denmark',
    short: 'Vejle',
    long: 'Vejle Kommune - Vej & Park Drift',
    download: 'http://kortservice.vejle.dk/gis/rest/services/OPENDATA/Vejle/MapServer/12/query?where=OBJECTID%3C%3E0&geometryType=esriGeometryEnvelope&spatialRel=esriSpatialRelIntersects&outFields=*&returnGeometry=true&outSR=4326&returnIdsOnly=false&returnCountOnly=false&returnZ=false&returnM=false&returnDistinctValues=false&f=geojson',
    info: 'https://www.opendata.dk/city-of-vejle/parkdrift-parkpleje-punktdata',
    license: { name: 'Andet (Open)' },
    // Includes all park point features, not just trees and bushes
    delFunc: x => !Boolean(x.ELTTYPE.match(/(træer|træ|buske)/i)),
    crosswalk: {
      ref: 'OBJECTID',
      // PLANTENAVN: Very messy mix of scientific name, common name, and notes
      scientific: 'PLANTENAVN',
      notable: x => ({
        'Historisk træ': 'historic',
      })[x.ELTTYPE],
      location: x => 'park',
      health: x => x.ELTTYPE === 'Træruin' ? 'dead' : null,
      note: 'BESKRIVELSE'
    }
  }
].map(s => ({ ...s, country: 'Denmark' }))
