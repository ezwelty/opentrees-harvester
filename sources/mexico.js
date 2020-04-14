module.exports = [
  {
    id: 'monterrey_mx',
    short: 'Monterrey',
    long: 'Zona Metropolitana de Monterrey',
    download: 'http://datamx.io/dataset/9ad2f30b-4be9-4abe-beac-aec73ecc9cba/resource/6f1f1fe9-40c7-4527-8e2e-78b0f0c86a40/download/bumfiltercsv.csv',
    info: 'http://datamx.io/dataset/arboles-registrados-en-la-zona-metropolitana-de-monterrey',
    crosswalk: {
      ref: 'Arbol_id',
      planted: x => x.Fecha_plantado !== '0000-00-00' ? x.Fecha_plantado : null,
      common: 'Especie', // mostly in Spanish,
      updated: 'Fecha_registro'
    },
    centre: {lon: -100.3071, lat: 25.6801}
  }
].map(s => ({...s, country: 'Mexico'}))
