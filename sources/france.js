module.exports = [
  {
    id: 'paris',
    download: 'https://opendata.paris.fr/explore/dataset/les-arbres/download/?format=geojson',
    info: 'https://opendata.paris.fr/explore/dataset/les-arbres',
    short: 'Paris',
    country: 'France',
    crosswalk: {
      ref: 'idemplacement',
      common: 'libellefrancais',
      genus: 'genre',
      species: 'espece',
      cultivar: 'varieteoucultivar',
      dbh: x => (Number(x['circonferenceencm']) / 3.14159) * 2,
      maturity: 'stadedeveloppement', // A, J, JA, M. Maybe 'Jeune, jeune adulte, adulte, mûr/mature'?
    }
  },
  {
    id: 'lyon',
    // download: 'https://transcode.geo.data.gouv.fr/services/5e2a1e77fa4268bc255379c2/feature-types/ms:abr_arbres_alignement.abrarbre?format=GeoJSON&projection=WGS84',
    download: 'https://download.data.grandlyon.com/ws/grandlyon/abr_arbres_alignement.abrarbre.shp?srsname=EPSG:4326',
    crosswalk: {
      scientific: 'essence',
      // TODO: Cultivar with single exception (laricio).
      infraspecies: 'variete',
      genus: 'genre',
      species: 'espece',
      location: 'localisati',
      planted: 'anneeplant',
      ref: 'identifian',
      common: 'essencefra'
    },
    short: 'Lyon',
    country: 'France'
  },
  {
    id: 'bordeaux',
    info: 'https://opendata.bordeaux-metropole.fr/explore/dataset/bor_arbres/information/',
    download: 'https://opendata.bordeaux-metropole.fr/explore/dataset/bor_arbres/download/?format=geojson&lang=en',
    crosswalk: {
      scientific: 'nom',
      updated: 'mdate',
      dbh: 'diametre',
      height: 'hauteur',
      family: 'famille',
      // TODO variete: Full name with cultivar. Seems to supersede nom when available.
      cultivar: 'variete',
      location: 'typo_espace',
      health: 'statut',
      planted: 'tranche_age', // not a date but a range, 42 - 63
      // age_tranche_basse
    },
    short: 'Bordeaux',
    country: 'France'
  },
  {
    id: 'nice',
    download: 'http://opendata.nicecotedazur.org/data/storage/f/2019-07-22T07%3A41%3A29.958Z/ev-arbre-opendata-2019.geojson',
    info: 'https://trouver.datasud.fr/dataset/sync149f50a-cartographie-des-arbres-communaux',
    crosswalk: {
      ref: 'idENT'
    },
    short: 'Nice',
    country: 'France'
  },
  {
    id: 'grenoble',
    download: 'http://entrepot.metropolegrenoble.fr/opendata/38185-GRE/EspacePublic/json/ARBRES_TERRITOIRE_VDG_EPSG4326.json',
    info: 'http://data.metropolegrenoble.fr/ckan/dataset/les-arbres-de-grenoble',
    crosswalk: {
      ref: 'BIEN_REFERENCE', // asset id?
      genus: 'GENRE_BOTA',
      species: 'ESPECE',
      cultivar: 'VARIETE',
      maturity: 'STADEDEDEVELOPPEMENT',
      description: 'REMARQUES',
      planted: 'ANNEDEPLANTATION'
    },
    short: 'Grenoble',
    country: 'France'
  },
  {
    id: 'montpellier',
    country: 'France',
    download: 'https://data.montpellier3m.fr/sites/default/files/ressources/MMM_MTP_ArbresAlign.zip',
    info: 'https://data.montpellier3m.fr/dataset/arbres-dalignement-de-montpellier',
    crosswalk: {
      ref: 'idarbre',
      scientific: 'nom_latin',
      common: 'nom_commun',
      planted: 'plantation',
      updated: 'releva',
      crown: 'couronnem',
      height: 'hauteurm'
    },
    short: 'Montpellier',
    country: 'France'
  },

  {
    id: 'grand_paris_seine_ouest',
    country: 'France',
    info: 'https://www.data.gouv.fr/fr/datasets/arbres-2/',
    download: 'https://www.data.gouv.fr/fr/datasets/r/a10c7776-afa5-4b8a-8050-081788818b55',
    short: 'Grand Paris Seine Ouest',
    crosswalk: {
      scientific: 'genespvar',
      height: 'hauteur',
      planted: 'an_plant',
      ref: 'id_plant'
    }
  },
  {
    id: 'agen',
    country: 'France',
    download: 'https://www.data.gouv.fr/fr/datasets/r/fededc1c-6e42-4a6d-9469-849fd956fbfe',
    crosswalk: {
      ref: 'id_ponctue',
      common: 'espece_arb',
      scientific: 'nom_latin'
    },
    short: 'Agen'
  },
  {
    id: 'saint_quentinois',
    country: 'France',
    download: 'https://www.data.gouv.fr/fr/datasets/r/c6000378-1f3c-4c0c-8f62-9a5b72dc7a85',
    short: 'Saint Quentinois',
    long: 'Agglomération du Saint Quentinois',
    crosswalk: {
      scientific: 'nomlatin',
      common: 'nomfrancai',
      updated: 'EditDate',
      maturity: 'fk_stadede',
      dbh: 'tronc_diam',
      height: 'haut_tot',
      ref: 'id_arbre'
    }
  },
  {
    id: 'metz',
    country: 'France',
    download: 'https://www.data.gouv.fr/fr/datasets/r/3aa28eaa-9ee4-49ff-bb73-74c21d14268d',
    short: 'Metz',
    crosswalk: {
      dbh: 'diametre',
      scientific: 'nom_espece', // a species code
      note: 'observatio'
    }
  },
  {
    id: 'seine_saint_denis',
    country: 'France',
    download: 'https://www.data.gouv.fr/fr/datasets/r/c631e78d-4d15-44eb-a40d-cd593f0e1bed',
    short: 'Seine-Saint-Denis',
    crosswalk: {
      height: 'hauteur',
      scientific: 'essence',
      maturity: 'stade_dvlp',
      circumference_cm_min: x => ({
        '<50cm': 0,
        '50-100cm': 50,
        '>100cm': 100
      })[x['circonfere']],
      circumference_cm_max: x => ({
        '<50cm': 50,
        '50-100cm': 100
      })[x['circonfere']]
    }
  },
  {
    id: 'versailles',
    country: 'France',
    download: 'https://www.data.gouv.fr/fr/datasets/r/4b9d9fe4-f8da-4db1-8057-9e83b2abf5d2',
    short: 'Versailles',
    crosswalk: {
      scientific: 'ESPECE', // watch out for 'VIDE' TODO
      common: 'FRANCAIS'
    }
  },
  {
    id: 'nevers',
    country: 'France',
    download: 'https://www.data.gouv.fr/fr/datasets/r/dbdc2068-ee22-474d-8a42-261554482a4f',
    short: 'Nevers',
    long: 'Ville de Nevers',
    crosswalk: {
      scientific: 'espece'
    }
  },
  {
    // TODO fix bad geometry
    id: 'toulouse',
    country: 'France',
    short: 'Toulouse',
    long: 'Toulouse Métropole',
    download: 'https://www.data.gouv.fr/fr/datasets/r/b5b275e5-ef20-43c4-ad3f-5604c67a75a3',
    info: 'https://www.data.gouv.fr/fr/datasets/arbres-dalignement-toulouse/',
    centre: { lon: 1.44, lat: 43.6 },
    // dear god, linestring geometries...
    crosswalk: {
      ref: 'id',
      common: 'patrimoine', // the horror..."44 PIN PARASOL,15 CHENE LIEGE,45 MICOCOULIER"
    }
  },
  {
    id: 'orleans',
    country: 'France',
    short: 'Orléans',
    long: "Ville d'Orléans",
    download: 'https://www.data.gouv.fr/fr/datasets/r/804b8b61-9f8f-4a0d-8524-35ea5d6e265f',
    info: 'https://www.data.gouv.fr/fr/datasets/arbres-ville-dorleans/',
    crosswalk: {
      ref: 'id_arbre',
      genus: x => String(x.genre).replace(/ \?/, ''),
      species: x => String(x.species).replace(/ \?/, ''),
      infraspecies: 'variete',
      planted: 'date_plant'
    }
  },
  {
    id: 'saint_egreve',
    country: 'France',
    short: 'Saint-Egrève',
    long: 'Ville de Saint-Egrève',
    download: 'https://www.data.gouv.fr/fr/datasets/r/2bda9508-27e5-4de6-aba3-fdb0d9059a22',
    info: 'https://www.data.gouv.fr/fr/datasets/les-arbres-de-saint-egreve/',
    crosswalk: {
      genus: 'genre',
      species: 'espece',
      planted: 'anne_plan',
      common: 'essence'
    }
  },
  {
    id: 'bayonne',
    country: 'France',
    short: 'Bayonne',
    long: 'Ville de Bayonne',
    download: 'https://www.data.gouv.fr/fr/datasets/r/407fde2b-b415-4491-a41f-0b9cc861512c',
    info: 'https://www.data.gouv.fr/fr/datasets/arbres-dalignement-bayonne/',
    license: { id: 'etalab-2.0' },
    crosswalk: {
      genus: 'genre',
      species: 'espece',
      height: 'hauteur',
      common: 'vernaculai',
      cultivar: 'variete',
      planted: 'anne_plan',
      scientific: 'gev', // genus espece variete?
      circumference_cm: 'circonf', // values > 100, assuming [cm]
      age: 'agechrono', // also agephysio??
    }
  },
  {
    id: 'issy',
    country: 'France',
    short: 'Issy-les-Moulineaux',
    long: "Ville d'Issy-les-Moulineaux",
    download: 'https://www.data.gouv.fr/fr/datasets/r/578636b3-e9ca-4aa7-b298-e69fd0f3acc9',
    info: 'https://www.data.gouv.fr/fr/datasets/r/578636b3-e9ca-4aa7-b298-e69fd0f3acc9',
    crosswalk: {
      scientific: 'essence_sci',
      common: 'essence_com',
      circumference_cm: 'circonferen', // values > 100, assuming [cm]
      height: 'hauteur',
      maturity: 'classe_age',
      health: 'statut_emp',
      updated: 'date_maj', // mise-a-jour
    }
  },
  {
    id: 'rennes1',
    country: 'France',
    short: 'Rennes',
    long: 'Rennes Métropole',
    download: 'https://www.data.gouv.fr/fr/datasets/r/85d25eb0-b34e-4559-884d-ac052e62c620',
    info: 'https://www.data.gouv.fr/fr/datasets/arbres-dornement-des-espaces-verts-de-la-ville-de-rennes-1/',
    crosswalk: {
      genus: 'genre',
      species: 'espece',
      planted: 'date_plant',
      cultivar: 'variete',
      circumference_cm: 'circonfere' // values > 100, assuming [cm]
    }
  },
  {
    id: 'rennes2',
    country: 'France',
    short: 'Rennes',
    long: 'Rennes Métropole',
    download: 'https://www.data.gouv.fr/fr/datasets/r/c9cf6518-267c-4aa4-bdbe-d1602f78b07f',
    info: 'https://www.data.gouv.fr/fr/datasets/arbres-dalignement-en-accompagnement-de-voirie-sur-la-ville-de-rennes-1/',
    primary: 'rennes1',
    crosswalk: {
      ref: 'numero',
      planted: 'date_plant',
      health: 'etat',
      genus: 'genre',
      species: 'espece',
      cultivar: 'variete',
      circumference_cm: 'circonfere', // values > 100, assuming [cm]
      height: 'hauteur'
    }
  },
  {
    id: 'mulhouse',
    country: 'France',
    short: 'Mulhouse',
    long: 'Mulhouse Alsace Agglomération',
    download: 'https://www.data.gouv.fr/fr/datasets/r/3c47ef6b-10ea-4723-81b9-a3c0b99e9550',
    info: 'https://www.data.gouv.fr/fr/datasets/caracteristiques-des-arbres-dalignements-geres-par-la-ville-de-mulhouse/',
    crosswalk: {
      scientific: 'libelle_es',
      planted: 'date_plant',
      common: 'com_nom',
      ref: 'obj_ident'
    }
  },
  {
    pending: 'Requires manual regeneration of link',
    id: 'divonne_les_bains_fr',
    short: 'Divonne-les-Bains',
    download: 'https://telecarto.datara.gouv.fr/DOWNLOAD/Telechargement_1587948363_5423.zip',
    info: 'https://www.datara.gouv.fr/geonetwork/srv/fre/catalog.search#/metadata/b18070b7-4349-4fd5-8e56-1dc48c3eb03a',
    // limited scope? only collected for battle against one pest
    // check for date_abatt?
    // sigh, multipoint
    crosswalk: {
      genus: x => x.genre.replace('spp.', ''),
      species: 'espece',
      height: 'classe_hau',
      circumference_cm_min: x => ({
        '0-50cm': 0,
        '50-150cm': 50,
        '>150cm': 150
      })[x['classe_cir']],
      circumference_cm_max: x => ({
        '0-50cm': 50,
        '50-150cm': 150
      })[x['classe_cir']],
      // cepee?
    }
  },
  {
    id: 'bretagne_fr',
    short: 'Bretagne',
    long: 'La Région Bretagne',
    download: 'https://data.bretagne.bzh/explore/dataset/patrimoine-arbore-ponctuel-des-voies-navigables-appartenant-a-la-region-bretagne/download/?format=shp&timezone=Australia/Sydney&lang=fr',
    info: 'https://data.bretagne.bzh/explore/dataset/patrimoine-arbore-ponctuel-des-voies-navigables-appartenant-a-la-region-bretagne/export/',
    crosswalk: {
      ref: 'gml_id',
      common: 'essence',
      height: 'hauteur',
      dbh: 'diametre',
      health: 'etat_genera',
      note: 'remarque'
    },
    centre: { lon: 6.14941, lat: 46.35697 }
  },
  {
    id: 'guingamp_fr',
    short: 'Guingamp',
    long: 'Ville de Guingamp',
    download: 'https://datarmor.cotesdarmor.fr:443/dataserver/cg22/data/Arbres_Guingamp?&$format=csv',
    info: 'https://datarmor.cotesdarmor.fr/data-presentation-ux/#/cg22/datasets/Arbres_Guingamp/views/grid?primary-bg-color=@046D8B&primary-font-color=@fff',
    crosswalk: {
      genus: 'Genre',
      species: 'Espce',
      cultivar: 'Varit'
    }
  },
  {
    id: 'paris_sud_fr',
    short: 'Grand Paris Sud', // Seine - Essonne - Sénart
    download: 'https://data.grandparissud.fr/explore/dataset/patrimoine-arbore/download/?format=shp&timezone=Australia/Sydney&lang=fr',
    info: 'https://data.grandparissud.fr/explore/dataset/patrimoine-arbore/export/',
    crosswalk: {
      location: 'categorie',
      owner: 'gestionnai',
      common: x => x.ess_fcais + ' ' + x.espe_fcais,
      scientific: 'ess_latin',
      age: 'classe_age',
      health: 'vigeur_cr', // or etat_sanit?
      updated: 'anne_expe', // ?
      ref: 'identifian'
    }
  }
].map(s => ({ ...s, country: 'France' }))
