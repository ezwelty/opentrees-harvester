module.exports = [
  {
    id: 'buenos_aires',
    country: 'Argentina',
    short: 'Buenos Aires',
    // shapefile was incomplete?
    download: 'http://cdn.buenosaires.gob.ar/datosabiertos/datasets/arbolado-en-espacios-verdes/arbolado-en-espacios-verdes.csv',
    info: 'https://data.buenosaires.gob.ar/dataset/arbolado-espacios-verdes',
    format: 'csv',
    crosswalk: {
      ref: 'id_arbol',
      height: 'altura_tot',
      dbh: 'diametre',
      common: 'nombre_com',
      scientific: 'nombre_cie',
      family: 'nombre_fam',
      // genus: 'nombre_gen', // not good to include without species
    }
  },
  {
    // maybe more datasets
    id: 'buenos_aires2',
    country: 'Argentina',
    short: 'Buenos Aires',
    download: 'http://cdn.buenosaires.gob.ar/datosabiertos/datasets/arbolado-publico-lineal/arbolado-publico-lineal-2017-2018.geojson',
    info: 'https://data.buenosaires.gob.ar/dataset/arbolado-publico-lineal',
    format: 'geojson',
    crosswalk: {
        ref: 'nro_registro',
        scientific: 'nombre_cientifico',
        // ancho_acera?
        dbh: 'diametro_altura_pecho',
        height: 'altura_arbol'
    },
    primary: 'buenos_aires'
  }
].map(s => ({...s, country: 'Argentina'}))
