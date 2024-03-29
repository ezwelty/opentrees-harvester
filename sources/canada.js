module.exports = [
  {
    id: 'montreal',
    info: 'http://donnees.ville.montreal.qc.ca/dataset/arbres',
    download: 'http://donnees.ville.montreal.qc.ca/dataset/3e3efad6-9f2f-4cc0-8f1b-92de1ccdb282/resource/c6c5afe8-10be-4539-8eae-93918ea9866e/download/arbres-publics.csv',
    crosswalk: {
      scientific: 'Essence_latin',
      common: 'ESSENCE_ANG',
      dbh: 'DHP', // diametre hauteur poitrine
      updated: 'Date_releve',
      planted: 'Date_plantation',
      ref: 'EMP_NO',
      // location could be INV_TYPE
    },
    short: 'Montreal',
    country: 'Canada',
    centre: { lon: -73.56, lat: 45.56 }
    // more csvs here - do they overlap?
  },
  {
    id: 'quebec',
    download: 'https://www.donneesquebec.ca/recherche/fr/dataset/34103a43-3712-4a29-92e1-039e9188e915/resource/de031174-cbdf-4d69-869c-21cca8036279/download/vdq-arbrerepertorie.geojson',
    info: 'https://www.donneesquebec.ca/recherche/fr/dataset/vque_26',
    crosswalk: {
      scientific: 'NOM_LATIN',
      common: 'NOM_FRANCAIS',
      dbh: 'DIAMETRE',
      planted: 'DATE_PLANTE',
      location: 'NOM_TOPOGRAPHIE'
    },
    short: 'Quebec City',
    country: 'Canada'
  },
  {
    id: 'longueuil', // Canada
    info: 'https://www.longueuil.quebec/fr/donnees-ouvertes/arbres',
    download: 'https://www.longueuil.quebec/sites/longueuil/files/donnees_ouvertes/arbres.zip',
    short: 'Longueuil',
    long: 'Ville de Longueuil',
    country: 'Canada',
    crosswalk: {
      scientific: x => String(x.Espece).split(' - ')[0],
      common: x => String(x.Espece).split(' - ')[1],
      dbh: 'DiamTronc'
    }
  },
  {
    id: 'calgary',
    download: 'https://data.calgary.ca/api/views/tfs4-3wwa/rows.csv?accessType=DOWNLOAD',
    short: 'Calgary',
    long: 'City of Calgary',
    country: 'Canada',
    crosswalk: {
      // DECIDUOUS_EVERGREEN...
      common: 'COMMON_NAME',
      genus: 'GENUS',
      species: 'SPECIES',
      cultivar: 'CULTIVAR',
      dbh: 'DBH_CM',
      health: x => {
        if (x.TREE_CONDITION_RATING_PERC >= 70) return 'Good';
        else if (x.TREE_CONDITION_RATING_PERC >= 50) return 'Fair';
        else return 'Poor';
        // I have no idea
      },
      ref: 'WAM_ID'
    }
  },
  {
    id: 'edmonton',
    download: 'https://data.edmonton.ca/api/views/eecg-fc54/rows.csv?accessType=DOWNLOAD',
    short: 'Edmonton',
    long: 'City of Edmonton',
    country: 'Canada',
    crosswalk: {
      dbh: 'DIAMETER_BREAST_HEIGHT',
      scientific: 'SPECIES_BOTANICAL',
      common: 'SPECIES_COMMON',
      // GENUS, SPECIES, CULTIVAR
      health: 'CONDITION_PERCENT', // let the front end worry about this
      // health: x => {
      //   if (x.CONDITION_PERCENT >= 70)
      //     return 'Good';
      //   else if (x.CONDITION_PERCENT >= 50)
      //     return 'Fair';
      //   else
      //     return 'Poor';
      //   // I have no idea
      // },
      planted: 'PLANTED_DATE',
      location: 'LOCATION_TYPE',
      ref: 'id'
    }
  },
  {
    id: 'ottawa',
    info: 'https://ouverte.ottawa.ca/datasets/inventaire-des-arbres',
    download: 'https://opendata.arcgis.com/datasets/451e904e2753453eb699b2e853ab5857_1.csv',
    crosswalk: {
      scientific: 'SPECIES',
      ref: 'SAP_ID'
    },
    short: 'Ottawa',
    country: 'Canada'
  },
  {
    id: 'moncton',
    info: 'http://ouvert.moncton.ca/datasets/arbres',
    download: 'https://opendata.arcgis.com/datasets/60d5b564e732444b81a650c7c4aa548a_0.csv?outSR=%7B%22latestWkid%22%3A2953%2C%22wkid%22%3A2036%7D',
    country: 'Canada',
    srs: 'EPSG:2953',
    crosswalk: {
      common: 'BOTNAME',
      dbh: 'DIAM',
      height: 'HT',
      updated: 'edited_date'
    },
    short: 'Moncton',
    country: 'Canada',
    centre: { lon: -64.81577, lat: 46.10613 }
  },
  {
    id: 'waterloo',
    country: 'Canada',
    info: 'http://data.waterloo.ca/datasets/2447415303e74bb9acdf0f43c2236b72_0',
    download: 'https://opendata.arcgis.com/datasets/2447415303e74bb9acdf0f43c2236b72_0.zip',
    short: 'Waterloo',
    crosswalk: {
      common: 'COM_NAME',
      scientific: 'LATIN_NAME',
      location: 'TREE_TYPE',
      dbh: 'DBH_CM',
      ref: 'OBJECTID'
    }
  },
  {
    id: 'winnipeg',
    country: 'Canada',
    download: 'https://data.winnipeg.ca/api/views/h923-dxid/rows.csv?accessType=DOWNLOAD',
    info: 'https://data.winnipeg.ca/Parks/Tree-Inventory-Map/xyma-gm38',
    short: 'Winnipeg',
    crosswalk: {
      ref: 'tree_id',
      scientific: 'botanical',
      common: 'common',
      dbh: 'dbh'
    }
  },
  {
    id: 'vancouver',
    download: 'https://opendata.vancouver.ca/explore/dataset/street-trees/download/?format=geojson&lang=en',
    short: 'Vancouver',
    country: 'Canada',
    crosswalk: {
      ref: 'tree_id',
      genus: 'genus_name',
      species: 'species_name',
      cultivar: 'cultivar_name',
      common: 'common_name',
      height: 'height_range_id', // this is in feet? urgh
      dbh: x => Number(x.diameter) * 2.54, // seriouosly, inches
      planted: 'date_planted'
    }
  },
  {
    // TODO https://data.surrey.ca/dataset/important-trees
    // TODO https://data.surrey.ca/dataset/park-screen-trees
    id: 'surrey',
    short: 'Surrey',
    long: 'City of Surrey',
    country: 'Canada',
    download: 'http://data.surrey.ca/dataset/634d2f06-2214-49b3-9309-4baa51b61ec4/resource/86625e14-8d09-45e8-9b91-9d301d32b10e/download/parkspecimentrees.csv',
    info: 'https://data.surrey.ca/dataset/park-specimen-trees',
    crosswalk: {
      // scientific: 'DESCRIPTION', // breakdown fields available too
      genus: 'TREE_GENUS',
      species: 'TREE_SPECIES',
      cultivar: 'TREE_VARIETY',
      ule: 'YRS_LIFE_EXPECTANCY',
      // health: 'CONDITION', // blank
      // updated: 'CONDITIONDATE'
    }
  },
  {
    id: 'toronto',
    short: 'Toronto',
    country: 'Canada',
    download: 'https://ckan0.cf.opendata.inter.prod-toronto.ca/download_resource/c1229af1-8ab6-4c71-b131-8be12da59c8e',
    info: 'https://open.toronto.ca/dataset/street-tree-data/',
    gdalOptions: '-skipfailures',
    crosswalk: {
      dbh: 'DBH_TRUNK',
      common: 'COMMON_NAM',
      scientific: 'BOTANICAL_'
    }
  },
  {
    // probably duplicated by Edmonton anyway?
    id: 'strathcona',
    country: 'Canada',
    short: 'Strathcona',
    download: 'https://data.strathcona.ca/api/views/v78i-7ntw/rows.csv?accessType=DOWNLOAD',
    info: 'https://data.strathcona.ca/Environment/Tree/v78i-7ntw',
    // Location: "(lat, lon)"
    coordsFunc: x =>
      x.Location.replace(/[()]/g, '')
        .split(', ')
        .map(Number)
        .reverse(),
    crosswalk: {
      ref: 'TreeSiteID',
      common: 'Name'
    },
    centre: { lon: -113.54, lat: 53.477 }
  },
  {
    id: 'regina',
    country: 'Canada',
    short: 'Regina',
    download: 'https://ckanprodstorage.blob.core.windows.net/opendata/Tree/SHP_ZIP/shp.Tree.zip',
    info: 'http://open.regina.ca/dataset/city-of-regina-tree-inventory',
    crosswalk: {
      common: 'Species',
      owner: 'Ownership',
      planted: 'Year_Plant',
      dbh: 'Diameter',
      value: 'Tree_Value'
    }
  },
  {
    id: 'north_vancouver',
    country: 'Canada',
    short: 'North Vancouver',
    download: 'http://geoweb.dnv.org/Products/Data/SHP/EnvStreetTree_shp.zip',
    info: 'http://geoweb.dnv.org/data/index.php',
    crosswalk: {
      common: 'COMMONNAME',
      genus: 'GENUS',
      species: 'SPECIES',
      dbh: 'DBH_CM',
      height: 'HEIGHT_M',
      health: 'CONDITION', // see also CONDITION_ which has text
      ref: 'TAGNUMBER',
      location: 'AM_TYPE_RE'
    }
  },
  {
    id: 'white_rock',
    country: 'Canada',
    short: 'White Rock',
    long: 'City of White Rock',
    download: 'http://wroms.whiterockcity.ca/opendata/GIS/Data/Spatial/Parks/SHP/Tree.zip',
    filename: '**/Tree.shp',
    info: 'http://data.whiterockcity.ca/dataset/tree',
    crosswalk: {
      scientific: 'SpeciesNam',
      ref: 'Tree_ID',
      // look at Removed
    }
  },
  {
    id: 'kelowna',
    country: 'Canada',
    short: 'Kelowna',
    download: 'https://opendata.arcgis.com/datasets/39d13a47b8f94cce82a9b4c86efc8ee7_114.zip?outSR=26911',
    info: 'http://opendata.kelowna.ca/datasets/39d13a47b8f94cce82a9b4c86efc8ee7/data?geometry=-119.693%2C49.577%2C-119.178%2C49.887',
    crosswalk: {
      genus: 'GENUS',
      species: 'species',
      common: 'species_co',
      dbh: 'DBH',
      ref: 'SITE_ID'
    },
    centre: { lon: -119.46786, lat: 49.89029 }
  },
  {
    id: 'welland',
    country: 'Canada',
    short: 'Welland',
    download: 'https://opendata.arcgis.com/datasets/4357fb7835fe49b39197a9440b2e868b_0.zip',
    info: 'http://hub.arcgis.com/datasets/welland::welland-trees',
    crosswalk: {
      description: 'Genus',
      dbh: 'DiamDBH',
      planted: 'DatePlant',
      location: 'PlantArea'
    }
  },
  {
    id: 'ajax',
    country: 'Canada',
    short: 'Ajax',
    download: 'https://opendata.arcgis.com/datasets/c5d5ff5351a54fdb8d3934abbb5cda9a_8.zip',
    info: 'http://hub.arcgis.com/datasets/TownofAjax::town-trees',
    delFunc: x => x.STATUS === 'REMOVED', /// TODO implement
    crosswalk: {
      dbh: 'DBH',
      common: 'TYPE',
      updated: 'LAST_EDI_1',
      note: 'COMMENTS'
    }
  },
  {
    id: 'prince_george',
    country: 'Canada',
    short: 'Prince George',
    download: 'https://opendata.arcgis.com/datasets/054e46bee4594eb787d574266c832430_3.zip',
    info: 'http://hub.arcgis.com/datasets/CityofPG::trees',
    crosswalk: {
      planted: 'TreePlantD',
      common: 'CommonName',
      genus: 'GenusName',
      species: 'SpeciesNam',
      cultivar: 'VarietyNam',
      age: 'TreeAge',
      height: 'TreeHeight',
      dbh: 'DBH',
      crown: 'TreeCrownA',
      health: 'ConditionD',
      location: 'TreeClassi'
    }
  },
  {
    id: 'oakville',
    country: 'Canada',
    short: 'Oakville',
    download: 'https://opendata.arcgis.com/datasets/66e3b95688394391a433fd29873aff20_10.zip',
    info: 'http://hub.arcgis.com/datasets/ExploreOakville::trees',
    crosswalk: {
      scientific: x => String(x.SPECIES).split(' - ')[1],
      common: x => String(x.SPECIES).split(' - ')[0],
      dbh: 'DBH',
      height: 'HEIGHT',
      crown: 'CROWN_WIDT'
    }
  },
  {
    // see also http://hub.arcgis.com/datasets/VicMap::surveyed-trees
    id: 'victoria_bc',
    country: 'Canada',
    short: 'Victoria',
    download: 'https://opendata.arcgis.com/datasets/36e90771770542baaa89afddce69195a_15.zip',
    info: 'http://hub.arcgis.com/datasets/VicMap::tree-species',
    crosswalk: {
      scientific: 'Species',
      dbh: 'DiameterAt',
      height: 'Height',
      age: 'PlantingDa',
      planted: 'YearPlante',
      updated: 'InventoryD'
    }
  },
  {
    id: 'kamloops',
    country: 'Canada',
    short: 'Kamloops',
    long: 'City of Kamloops',
    // Shapefile has truncated field names
    download: 'https://opendata.arcgis.com/datasets/e14c04be6c6c4692b70147edb937088c_25.csv',
    info: 'http://hub.arcgis.com/datasets/kamloops::trees',
    crosswalk: {
      common: 'SPECIES', // TODO mapl,amur
      crown: 'SPREAD',
      planted: 'PLANTEDYEAR',
      ref: 'FACILITYID',
      edible: x => {
        if (x['EDIBLEFRUITTREEFLAG'] === 'Yes') return 'fruit'
        if (x['EDIBLENUTTREEFLAG'] === 'Yes') return 'nut'
        if (x['EDIBLEFRUITTREEFLAG'] === 'No' && x['EDIBLENUTTREEFLAG'] === 'No') return 'false'
      }
    }
  },
  {
    id: 'chestermere',
    country: 'Canada',
    short: 'Chestermere',
    download: 'https://opendata.arcgis.com/datasets/72e47f7c7b194047936ebb0ce3c4d32e_0.zip',
    info: 'http://hub.arcgis.com/datasets/Chestermere::tree-points',
    crosswalk: {
      common: 'Species',
      scientific: 'Species_Sc', // null?
      planted: 'Date_Plant',
      height: 'Height__me',
      health: 'Condition'
    }
  },
  {
    id: 'new_west_west',
    country: 'Canada',
    short: 'New West',
    download: 'http://opendata.newwestcity.ca/downloads/tree-inventory-west/TREES_WEST.zip',
    info: 'http://opendata.newwestcity.ca/datasets/tree-inventory-west',
    crosswalk: {
      scientific: 'Scientific',
      common: 'Common_Nam',
      cultivar: 'Cultivar'
    }
  },
  {
    id: 'new_west_east',
    country: 'Canada',
    short: 'New West',
    download: 'http://opendata.newwestcity.ca/downloads/tree-inventory-east/TREES_EAST.ZIP',
    info: 'http://opendata.newwestcity.ca/datasets/tree-inventory-east',
    crosswalk: {
      scientific: 'Scientific',
      common: 'Common_Nam',
      cultivar: 'Cultivar'
    },
    primary: 'new_west_west'
  },
  {
    id: 'maple_ridge',
    country: 'Canada',
    short: 'Maple Ridge',
    download: 'https://opendata.arcgis.com/datasets/290505c676d64cf09989eca1320aedd3_5.zip',
    info: 'http://hub.arcgis.com/datasets/mapleridge::street-tree',
    crosswalk: {
      common: 'CommonName',
      infraspecies: 'Variety',
      genus: 'Genus',
      species: 'Species',
      // stuff about refunds?
    }
  },
  {
    id: 'barrie',
    short: 'Barrie',
    download: 'https://opendata.arcgis.com/datasets/16123463ba3d48859a83f4883a414a45_7.zip',
    info: 'http://hub.arcgis.com/datasets/barrie::tree-location',
    crosswalk: {
      ref: 'ASSETID',
      location: 'TREETYPE'
    }
  },
  {
    id: 'langley',
    country: 'Canada',
    short: 'Langley',
    long: 'Township of Langley',
    download: 'https://opendata.arcgis.com/datasets/1971f19fc28c489b908eab199a5d2e72_85.geojson',
    info: 'https://hub.arcgis.com/datasets/1971f19fc28c489b908eab199a5d2e72_85',
    crosswalk: {
      ref: 'TreeID',
      updated: 'last_edited_date', // datetime
      // TODO: ReplantedDate = planted ?
      // CommonName_txt: <Genus> <species|sp.> '<cultivar>' (<common>)
      // TreeName: Equal (?) to CommonName_txt but some characters are corrupt
      scientific: x => {
        // TODO: 'unknown', 'sp./spp', 'x.' 
        const match = x['CommonName_txt'].match(/^\s*([^\(\'\"\‘]+)(?:$|\s+)/)
        if (match) return match[1]
      },
      cultivar: x => {
        const match = x['CommonName_txt'].
          replace(/"|‘/, '\'').match(/'\s*([^\(]+)\s*'/)
        if (match) return match[1]
      },
      common: x => {
        const match = x['CommonName_txt'].match(/\(\s*([^\)]+)\s*\)$/)
        if (match) return match[1]
      },
      // TODO: TreeType = Park Tree, Street Tree, Heritage Tree, ..., Other
      location: 'TreeType',
      notable: x => ({
        'Heritage Tree': 'heritage',
        'Memorial Tree': 'memorial'
      })[x.TreeType]
    }
  },
  {
    id: 'victoriaville',
    short: 'Victoriaville',
    download: 'https://opendata.arcgis.com/datasets/ae1c4b5613334d8a823359565fafb911_12.zip',
    info: 'http://hub.arcgis.com/datasets/victoriaville::tree',
    crosswalk: {
      // angle??
      // TYPE, SIZE, ANGLE, LANGUAGE,...what do we do with any of this??
    }
  },
  {
    id: 'lethbridge_ca',
    short: 'Lethbridge',
    download: 'https://opendata.arcgis.com/datasets/82841132047d47659508f60c52f6346a_0.zip',
    info: 'http://opendata.lethbridge.ca/datasets/82841132047d47659508f60c52f6346a_0',
    crosswalk: {
      common: 'species',
      dbh: 'diameter',
      height: 'height',
      crown: 'spread',
      stems: 'trunks',
      planted: 'planted',
      ref: 'AssetID'
    },
    license: {
      name: 'City of Lethbridge​ - Open Data License',
      url: 'https://www.lethbridge.ca/Pages/OpenDataLicense.aspx'
    }
  },
  {
    // No exact license url
    id: 'kitchener_ca',
    short: 'Kitchener',
    download: 'https://opendata.arcgis.com/datasets/e42a9601b87a4417b3d3d15a0f596f64_0.zip',
    info: 'https://open-kitchenergis.opendata.arcgis.com/datasets/e42a9601b87a4417b3d3d15a0f596f64_0',
    crosswalk: {
      ref: 'TREEID',
      common: 'SPECIES_NA',
      scientific: 'SPECIES_LA',
      planted: 'YEAR_PLANT',
      updated: 'UPDATE_DAT',
      dbh: 'DBH',
      note: 'NOTES'
    }
  },
  {
    id: 'mississauga_ca',
    short: 'Missisauga',
    download: 'https://opendata.arcgis.com/datasets/b3f7ee3952094b87b4a1d82d5f19dc0e_0.zip?outSR=%7B%22latestWkid%22%3A3857%2C%22wkid%22%3A102100%7D',
    info: 'http://data.mississauga.ca/datasets/city-owned-tree-inventory',
    crosswalk: {
      dbh: 'DIAM',
      planted: 'INSTDATE',
      common: 'CBOTDESC',
      // scientific code: BOTNAME
      updated: 'MODDTTM'
    },
    license: {
      name: 'City of Mississauga - Terms of Use',
      url: 'http://www5.mississauga.ca/research_catalogue/CityofMississauga_TermsofUse.pdf'
    }
  },
  {
    id: 'st_catharines_ca',
    short: 'St Catharines',
    download: 'https://niagaraopendata.ca/dataset/06257b18-da24-424e-a609-48d6f3d4f018/resource/c549fce9-f032-48f9-9c0a-2adc9d1e0a40/download/trees.csv',
    info: 'https://niagaraopendata.ca/dataset/st-catharines-trees',
    srs: 'EPSG:26917',
    crosswalk: {
      scientific: 'BOTANICAL',
      common: 'COMMON',
      dbh: 'DBH',
      stems: 'STEMS'
    }
  },
  {
    id: 'york_ca',
    short: 'York',
    download: 'https://opendata.arcgis.com/datasets/293d80c24bf54a4f8ab66bddaeaab184_0.zip',
    info: 'https://insights-york.opendata.arcgis.com/datasets/street-trees',
    crosswalk: {
      ref: 'TREEID',
      scientific: 'SPECIES',
      common: 'COMMONNAME',
      planted: 'YEARPLANTE',
      dbh: 'CURRENTDBH',
      height: 'TREEHEIGHT',
      owner: 'OWNERSHIP'
    }
  },
  {
    id: 'repentigny_ca',
    short: 'Repentigny',
    download: 'https://www.donneesquebec.ca/recherche/dataset/d65f10dd-9948-4b52-bc4c-b40261e2c593/resource/850da247-cf55-45fd-82e7-bcc9693a7e9e/download/arbres.zip',
    info: 'https://www.donneesquebec.ca/recherche/fr/dataset/vrep-arbres',
    crosswalk: {
      common: 'ESSENCE_FR',
      // genus: 'GENRELATIN',
      // species
      scientific: 'ESSENCE_LA',
      dbh: 'DHP',
      health: 'ETAT',
      owner: 'PROPRIETE',
      planted: 'DATE_PLANT',
      updated: 'DATE_RELEV'
    },
    language: 'fr',
    license: { id: 'CC-BY-4.0' }
  },
].map(s => ({ ...s, country: 'Canada' }))
