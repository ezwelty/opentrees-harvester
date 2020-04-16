module.exports = [
  {
    id: 'chile-osm',
    country: 'Chile',
    short: 'Chile (OSM)',
    download: 'https://emscycletours.site44.com/opentrees-data/chile.geojson',
    crosswalk: {
      common: 'name',
      // leaf_cycle, leaf_type
    },
    centre: {lon: -70.877, lat: -29.859}
  },
  {
    pending: true,
    id: 'providencia',
    country: 'Chile',
    short: 'Providencia',
    long: 'Commune de Providencia',
    download: 'http://datos.providencia.cl/datastreams/92199-catrastro-de-arboles-en-la-comuna-de-providencia.csv',
    info: 'http://datos.gob.cl/dataset/catrastro_de_arboles_en_la_comuna_de_providencia/resource/c4a710d5-c221-4da6-8a91-c0d8c9500164',
    format: 'csv',
    srs: 'EPSG:32719', // guessed by WhatTheProj
  },
].map(s => ({...s, country: 'Chile'}))
