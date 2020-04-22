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
    centre: { lon: -70.877, lat: -29.859 }
  },
  {
    id: 'providencia',
    country: 'Chile',
    short: 'Providencia',
    long: 'Commune de Providencia',
    download: 'http://datos.gob.cl/datastore/dump/c4a710d5-c221-4da6-8a91-c0d8c9500164',
    info: 'http://datos.gob.cl/dataset/catrastro_de_arboles_en_la_comuna_de_providencia/resource/c4a710d5-c221-4da6-8a91-c0d8c9500164',
    srs: 'EPSG:32719',
    license: { id: 'PDDL-1.0' },
    crosswalk: {
      ref: '_id',
      scientific: 'NOMB_CIENT',
      common: 'SP',
      height: 'H_MTS'
      // TODO: FECHA = updated ?
    }
  }
].map(s => ({ ...s, country: 'Chile', language: 'es-CL' }))
