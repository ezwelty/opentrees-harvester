module.exports = [
  {
    id: 'basel',
    country: 'Switzerland',
    short: 'Basel',
    download: 'https://data.bs.ch/explore/dataset/100052/download/?format=shp&timezone=Australia/Sydney&lang=en',
    info: 'https://data.bs.ch/explore/dataset/100052/information/',
    crosswalk: {
      scientific: x => String(x.art).replace(/ \(.*/, ''),
      common: x => (String(x.art).match(/\((.*)\)/) || ['', ''])[1],
      planted: 'pflanzdatu',
      age: 'baumalter',
      // STANDJAHR?
    }
  },
  {
    id: 'zurich',
    country: 'Switzerland',
    short: 'Zurich',
    language: 'de-CH',
    long: 'Stadt Zürich',
    info: 'https://data.stadt-zuerich.ch/dataset/geo_baumkataster',
    // Link to csv, may expire
    download: 'https://www.ogd.stadt-zuerich.ch/geoportal_download/5472ea30-8570-11ea-86f7-001dd8b73e63.zip',
    srs: 'EPSG:2056',
    license: { id: 'CC0-1.0' },
    crosswalk: {
      ref: 'baumnummer',
      // baumnamelat: <Genus> <species> ... (<gender>) (...) '<cultivar>'
      scientific: x => {
        const match = x.baumnamelat.match(/^\s*([^\(\')]+)(?:$|\s+)/)
        if (match) return match[1]
      },
      cultivar: x => {
        const match = x.baumnamelat.match(/'+(.+)'/)
        if (match) return match[1]
      },
      gender: x => {
        const match = x.baumnamelat.match(/\((m|w)\)/)
        if (match) return ({ 'm': 'male', 'w': 'female' })[match[1]]
      },
      common: 'baumnamedeu',
      height_min: x => ({ 1: 20, 2: 20, 3: 10, 4: 10, 5: 0 })[x.baumtyp],
      height_max: x => ({ 3: 20, 4: 20, 5: 10 })[x.baumtyp],
      crown_min: x => ({ 1: 10, 2: 0, 3: 10, 4: 0, 5: 0 })[x.baumtyp],
      crown_max: x => ({ 2: 10, 4: 10, 5: 10 })[x.baumtyp],
      planted: 'pflanzjahr', // year
      location: x => ({
        'Strassenbaum': 'street', 'Strassenbaum (A)': 'street',
        'Grünanlage': 'park',
        'Schulen': 'school',
        'Kanton': 'canton',
        'Bund': 'federal',
        'Wohnsiedlungen': 'residential'
      })[x.status],
      private: x => x.status === 'Privat' ? 1 : null,
      edible: x => x.status === 'Obst' ? 'fruit' : null
    }
  },
  {
    id: 'geneva',
    long: 'Canton de Genève',
    info: 'https://ge.ch/sitg/fiche/4571',
    download: 'https://ge.ch/sitg/geodata/SITG/OPENDATA/4571/CSV_SIPV_ICA_ARBRE_ISOLE.zip',
    license: {
      url: 'https://ge.ch/sitg/media/sitg/files/documents/conditions_generales_dutilisation_des_donnees_et_produits_du_sitg_en_libre_acces.pdf'
    },
    geometry: { x: 'E', y: 'N' },
    srs: 'EPSG:2056',
    language: 'fr-CH',
    crosswalk: {
      scientific: 'NOM_COMPLET',
      notable: x => x['REMARQUABLE'] ? 'remarquable' : null,
      // TODO TYPE_PLANTATION: Bocage, Alignement, Verger, ...
      location: 'TYPE_PLANTATION',
      stems_range: x => x['NOMBRE_TRONCS'] == -9999 ? null : x['NOMBRE_TRONCS'],
      // ID_ARBRE: e.g. '1373.0'
      ref: x => x['ID_ARBRE'] ? Math.round(x['ID_ARBRE']) : null,
      dbh_cm: 'DIAMETRE_1M',
      height_m: 'HAUTEUR_TOTALE',
      crown_m: 'DIAMETRE_COURONNE',
      maturity: x => ({
        'Jeune': 'young',
        'Adulte': 'mature',
        'S�n�scent': 'over-mature' // Sénescent
      })[x['STADE_DEVELOPPEMENT']],
      health: x => x['STADE_DEVELOPPEMENT'] === 'Mort' ? 'dead' : ({
        'Tr�s mauvais': 'poor', // Très mauvais
        'Mauvais': 'fair',
        'M�diocre': 'good', // Médiocre
        'Bon': 'very good',
        'Excellent': 'excellent'
      })[x['VITALITE']],
      // ESPERANCE_VIE: e.g. '2030.0'
      dead: x => x['ESPERANCE_VIE'] ? Math.round(x['ESPERANCE_VIE']) : null,
      planted: 'DATE_PLANTATION',
      updated: 'DATE_OBSERVATION'
    }
  }
].map(s => ({ ...s, country: 'Switzerland' }))
