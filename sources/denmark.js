module.exports = [
  {
    id: 'copenhagen',
    country: 'Denmark',
    download: 'http://wfs-kbhkort.kk.dk/k101/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=k101:trae_basis&outputFormat=csv&SRSNAME=EPSG:4326',
    info: 'https://www.opendata.dk/city-of-copenhagen/trae_basis',
    format: 'csv',
    crosswalk: {
        scientific: 'traeart',
        common: 'dansk_navn',
        // Slaegstnavn "family name" has values like Lind
        planted: 'planteaar',
        // Stammeofma "tribal embrace(?)" - crown?,
        health: 'sundhed',
        // TODO sooo many other fields
    },
    short: 'Copenhagen',
  },
  {
    // eww, this is not GeoJSON, and doesn't actually contain data.
    pending: true,
    id: 'ballerup',
    country: 'Denmark',
    short: 'Ballerup',
    long: 'Ballerup Kommune',
    download: 'http://ballerup.mapcentia.com/api/v1/sql/ballerup?q=SELECT%20*%20FROM%20drift.mapgo_punkter%20WHERE%20underelement%20=%20%27Fritvoksende%20tr%C3%A6er%27&lifetime=0&srs=4326&client_encoding=UTF8',
    info: 'https://www.opendata.dk/ballerup-kommune/fritvoksende-trae',
    format: 'geojson'
  },
  {
    // This is not geojson. TODO: construct a GeoJSON endpoint from the WFS one:
    // http://kortservice.vejle.dk/gis/services/OPENDATA/Vejle/MapServer/WFSServer?request=GetCapabilities&service=WFS
    pending: true,
    id: 'vejle',
    country: 'Denmark',
    short: 'Vejle',
    long: 'Vejle Kommune',
    download: 'http://kortservice.vejle.dk/gis/rest/services/OPENDATA/Vejle/MapServer/12/query?where=OBJECTID%3C%3E0&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&maxAllowableOffset=&geometryPrecision=&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&f=pjson',
    info: 'https://www.opendata.dk/city-of-vejle/parkdrift-parkpleje-punktdata',
    format: 'geojson'
  }
].map(s => ({...s, country: 'Denmark'}))
