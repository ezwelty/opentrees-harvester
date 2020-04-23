module.exports = [
  {
    id: 'santiago',
    country: 'Spain',
    short: 'Santiago de Compostela',
    long: 'Concello de Santiago de Compostela',
    download: 'https://datos.santiagodecompostela.gal/catalogo/dataset/60b1928e-32a9-442a-8f69-0215ba0862a4/resource/fab2344b-3c5c-466b-9e63-2e05e11fd9ce/download/arboredo_points.zip',
    info: 'https://datos.santiagodecompostela.gal/catalogo/gl/dataset/arboredo',
    crosswalk: {
      location: 'tipolexia'
    }
  },
  {
    id: 'barcelona',
    download: 'https://opendata-ajuntament.barcelona.cat/data/dataset/27b3f8a7-e536-4eea-b025-ce094817b2bd/resource/28034af4-b636-48e7-b3df-fa1c422e6287/download',
    short: 'Barcelona',
    long: 'City of Barcelona',
    geometry: { x: 'LONGITUD_WGS84', y: 'LATITUD_WGS84' },
    country: 'Spain',
    crosswalk: {
      common: 'NOM_CASTELLA', // there's also NOM_CATALA.
      scientific: 'NOM_CIENTIFIC',
      planted: 'DATA_PLANTACIO',
      ref: 'CODI',
      crown: x =>
        ({ PETITA: 'small', MITJANA: 'average', GRAN: 'large' }[
          x.ALCADA
        ] || x.ALCADA),
      // dbh: 'MIDA_ESCOCELL', // this is the size of the tree pit
      // ALCADA (reach): PETITA (small), MITJANA (average), GRAN (big)
    }
  },
  {
    id: 'valencia_es',
    short: 'Valencia',
    download: 'http://mapas.valencia.es/lanzadera/opendata/arboles/JSON',
    info: 'https://github.com/stevage/OpenTrees/issues/29',
    crosswalk: {
      scientific: 'planta',
      common: 'castellano',
      //grupo?
    },
    license: { id: 'CC-BY-4.0' },
    centre: { lon: -0.38564, lat: 39.46454 }
  },
  {
    id: 'sevilla_es',
    short: 'Sevilla',
    download: 'https://sevilla-idesevilla.opendata.arcgis.com/datasets/f3393590cea54e3da883f30a27e8a1fd_0.zip',
    info: 'https://sevilla-idesevilla.opendata.arcgis.com/datasets/f3393590cea54e3da883f30a27e8a1fd_0',
    crosswalk: {
      scientific: 'Nombre',
      height: 'Altura',
      // Perimetro?
      maturity: 'Observ',
      // aux_arbol?
    }
  },
  {
    id: 'manlleu_es',
    short: 'Manlleu',
    download: 'https://opendata.arcgis.com/datasets/7255e3ea9235496fbd5f6ee244f21015_0.zip?outSR=%7B%22latestWkid%22%3A25831%2C%22wkid%22%3A25831%7D',
    info: 'https://dadesobertes-situam.opendata.arcgis.com/datasets/arbrat-del-nucli-urb%C3%A0',
    crosswalk: {
      common: 'NCOMU',
      scientific: 'NCIENTIFIC',
      note: 'OBSERVACIO'
    }
  },
  {
    id: 'arganda-del-rey',
    long: 'Ayuntamiento de Arganda del Rey',
    short: 'Arganda del Rey',
    download: 'https://datosabiertos.ayto-arganda.es/dataset/bc20e1e3-0c6c-4f0e-817b-c95f052e3783/resource/f41cfeb0-6d98-48c1-b8be-fa50c3b958aa/download/arbolado.csv',
    execute: [
      // CSV uses ',' as decimal separator and 'sp,' (and ';' as delimiter)
      "npm run replace ',' '.' '$INIT_CWD/arbolado.csv' -- --silent=true",
      // Strangely, GDAL needs the field names COORDENADA (X|Y) quoted
      `npm run replace '(COORDENADA [A-Z])' '"\\$1"' '$INIT_CWD/arbolado.csv' -- --silent=true`
    ],
    srs: 'EPSG:32630', // WGS84 UTM Zone 30N
    info: 'https://datosabiertos.ayto-arganda.es/dataset/bc20e1e3-0c6c-4f0e-817b-c95f052e3783',
    license: { id: 'CC-BY-4.0' },
    delFunc: x => x['ESTADO'] === 'ALCORQUE VACIO',
    crosswalk: {
      ref: 'REFERENCIA',
      scientific: 'EMPLAZAMIENTO',
      common: 'NOMBRE COMUN',
      height: 'ALTURA', // 0-60: meter
      dbh: 'DIAMETRO', // 0-200: centimer trunk
      circumference: 'PERIMETRO', // 0-400: centimeter trunk
      age: 'EDAD', // 0-100: year
      location: x => ({ 'ZONA VERDE': 'park', VIARIO: 'street' })[x.ZONA],
      health: x => ({ 'ARBOL SECO': 'dead', ENFERMO: 'poor', DUDOSO: 'fair', REGULAR: 'good', BUENO: 'very good' })[x.ESTADO]
    }
  },
  {
    id: 'torrent_es',
    short: 'Torrent',
    download: 'http://datosabiertos.torrent.es/dataset/b372b8dd-07fb-4973-a2af-cb9a7c8de9bb/resource/dbae0e9d-c48b-4185-8a51-2599b093fdba/download/ODMAArbolAislado.csv',
    info: 'https://datos.gob.es/es/catalogo/l01462444-arbres-de-torrent-arboles-de-torrent',
    crosswalk: {
      scientific: 'ESPECIE'
    }
  },
  {
    id: 'arganda_es',
    short: 'Arganda del Rey',
    long: 'Ayuntamiento de Arganda del Rey',
    download: 'https://datosabiertos.ayto-arganda.es/dataset/bc20e1e3-0c6c-4f0e-817b-c95f052e3783/resource/f41cfeb0-6d98-48c1-b8be-fa50c3b958aa/download/arbolado.csv',
    info: 'https://datos.gob.es/es/catalogo/l01280148-inventario-arboles-casco-urbano-20151',
    srs: 'EPSG:28992',
    delFunc: x => x.ESTADO === 'ALCORQUE VACIO', // empty land
    crosswalk: {
      ref: 'REFERENCIA',
      scientific: 'EMPLAZAMIENTO',
      common: 'NOMBRE COMUN',
      height: 'ALTURA',
      diameter: 'DIAMETRO', // 15? 30?
      age: 'EDAD',
      health: 'ESTADO',
      // others...
    }
  },
  {
    id: 'caceres_es',
    short: 'Cáceres',
    long: 'Ayuntamiento de Cáceres',
    download: 'http://opendata.caceres.es/GetData/GetData?dataset=om:Arbol&format=geojson&geojson=Point',
    info: 'https://datos.gob.es/es/catalogo/l01100377-arboles-caceres',
    crosswalk: {
      ref: 'uri', // whoa. someone is really into linked open data
      scientific: x =>
        String(x.dbpedia_owl_species)
          .replace(/.*\//, '')
          .replace(/_/g, ' '),
      family: x =>
        String(x.dbpedia_owl_family)
          .replace(/.*\//, '')
          .replace(/_/g, ' '),
      height: 'om_altura'
    }
  },
].map(s => ({ ...s, country: 'Portugal' }))
