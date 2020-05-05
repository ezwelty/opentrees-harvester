module.exports = [
  {
    id: 'madison',
    info: 'https://data-cityofmadison.opendata.arcgis.com/datasets/street-trees',
    download: 'https://opendata.arcgis.com/datasets/b700541a20e446839b18d62426c266a3_0.zip',
    short: 'Madison',
    country: 'United States',
    crosswalk: {
      ref: 'OBJECTID',
      // SPECIES: Code only, even though preview shows values
      // common: 'SPECIES',
      dbh_in: 'DIAMETER' // max: 78, assuming inches
    }
  },
  {
    id: 'pdx-street',
    info: 'http://gis-pdx.opendata.arcgis.com/datasets/street-trees',
    download: 'https://opendata.arcgis.com/datasets/eb67a0ad684d4bb6afda51dc065d1664_25.zip?outSR=%7B%22latestWkid%22%3A3857%2C%22wkid%22%3A102100%7D',
    short: 'Portland',
    long: 'City of Portland',
    country: 'United States',
    crosswalk: {
      ref: 'OBJECTID',
      updated: 'Date_Inven', // Date_Inventoried
      planted: 'Plant_Date',
      scientific: 'Scientific',
      genus: 'Genus',
      family: 'Family',
      common: 'Common',
      health: 'Condition',
      dbh_in: 'DBH', // max: 86.5, assuming inches
      note: 'Notes',
      edible: x => ({
        'no': 'false',
        'fruit': 'fruit',
        'nut': 'nut'
      })[x['Edible']],
      location: x => 'street'
    }
  },
  {
    id: 'pdx-park',
    info: 'http://gis-pdx.opendata.arcgis.com/datasets/parks-tree-inventory',
    download: 'https://opendata.arcgis.com/datasets/83a7e3f6a1d94db09f24849ee90f4be2_220.zip?outSR=%7B%22latestWkid%22%3A3857%2C%22wkid%22%3A102100%7D',
    short: 'Portland, Oregon',
    long: 'City of Portland',
    country: 'United States',
    crosswalk: {
      ref: 'OBJECTID',
      updated: 'Inventory_', // Inventory_Date
      dbh_in: 'DBH', // max: 99, assume inches
      height_ft: 'TreeHeight', // "Tree Height (feet)"
      // CrownWidthNS, CrownWidthEW: Crown width N-S and E-W (feet)
      crown_ft: x => (x['CrownWidth'] + x['CrownWid_1']) / 2,
      carbon_lb: 'Carbon_Sto', // Carbon_Storage_lb
      carbon_annual_lb: 'Carbon_Seq', // 	Carbon_Sequestration_lb
      health: 'Condition',
      family: 'Family',
      genus: 'Genus',
      scientific: 'Genus_spec', // Genus_species
      common: 'Common_nam', // Common_name
      description: 'Species_fa',
      origin: x => ({
        'Yes': 'native'
      })[x['Native']],
      edible: x => ({
        'Yes': 'true',
        'Yes - fruit': 'fruit',
        'Yes - nuts': 'nut',
        'No': 'false'
      })[x['Edible']]
    },
    primary: 'pdx-street'
  },
  {
    id: 'nyc',
    info: 'https://data.cityofnewyork.us/Environment/2015-Street-Tree-Census-Tree-Data/uvpi-gqnh',
    download: 'https://data.cityofnewyork.us/api/views/uvpi-gqnh/rows.csv?accessType=DOWNLOAD',
    srs: 'EPSG:4326',
    geometry: { x: 'longitude', y: 'latitude' },
    short: 'New York',
    long: 'New York City',
    country: 'United States',
    // TODO: Add 'stump' to health ?
    delFunc: x => x['status'] === 'Stump',
    crosswalk: {
      ref: 'tree_id',
      // tree_dbh: "rounded to nearest whole inch"
      dbh_in: 'tree_dbh',
      scientific: 'spc_latin',
      common: 'spc_common',
      health: x => x['status'] === 'Dead' ? x['health'] : 'dead'
    }
  },
  {
    id: 'providence',
    info: 'https://data.providenceri.gov/Neighborhoods/Providence-Tree-Inventory/uv9w-h8i4',
    download: 'https://data.providenceri.gov/api/views/uv9w-h8i4/rows.csv?accessType=DOWNLOAD',
    short: 'Providence',
    long: 'Providence, Rhode Island',
    coordsFunc: x => x['Property Address'].split('\n').reverse()[0].split(/[(), ]/).filter(Number).map(Number).reverse(),
    crosswalk: {
      scientific: 'Species',
      dbh_in: 'Diameter in Inches'
    },
    centre: { lon: -71.43, lat: 41.83 }
  },
  {
    id: 'washington-dc',
    info: 'http://opendata.dc.gov/datasets/urban-forestry-street-trees',
    download: 'https://opendata.arcgis.com/datasets/f6c3c04113944f23a7993f2e603abaf2_23.zip',
    short: 'Washington DC',
    long: 'Washington DC',
    country: 'United States',
    centre: { lon: -77, lat: 38.92 },
    crosswalk: {
      dbh_in: 'DBH',
      common: 'COMMON.NAME',
      scientific: 'SCI_NM',
      planted: 'DATE_PLANT',
      family: 'FAM_NAME',
      note: 'TREE_NOTES',
      health: 'CONDITION'
      // maybe ref: 'FACILITYID'
    }
  },
  {
    id: 'buffalo-ny',
    info: 'https://data.buffalony.gov/Quality-of-Life/Tree-Inventory/n4ni-uuec',
    download: 'https://data.buffalony.gov/api/views/n4ni-uuec/rows.csv?accessType=DOWNLOAD',
    short: 'Buffalo',
    long: 'City of Buffalo, NY',
    country: 'United States',
    crosswalk: {
      scientific: 'Botanical Name',
      common: 'Common Name',
      dbh_in: 'DBH', // "in inches"
      ref: 'Site ID'
    }
  },
  {
    id: 'san_francisco',
    info: 'https://data.sfgov.org/City-Infrastructure/Street-Tree-List/tkzw-k3nq',
    download: 'https://data.sfgov.org/api/views/tkzw-k3nq/rows.csv?accessType=DOWNLOAD',
    short: 'San Francisco',
    long: 'City of San Francisco',
    country: 'United States',
    geometry: {x: 'Longitude', y: 'Latitude'},
    crosswalk: {
      ref: 'TreeID',
      scientific: x => String(x.qSpecies).split(' :: ')[0],
      common: x => String(x.qSpecies).split(' :: ')[1],
      description: 'qSiteInfo',
      dbh_in: 'DBH', // assuming inches
      planted: 'PlantDate',
      // also qLegalStatus (private/DPW), qCaretaker, PlantType
    },
    centre: { lon: -122.435, lat: 37.77 }
  },
  {
    id: 'philadelphia',
    info: 'https://www.opendataphilly.org/dataset/philadelphia-street-tree-inventory',
    download: 'http://data.phl.opendata.arcgis.com/datasets/957f032f9c874327a1ad800abd887d17_0.csv',
    short: 'Philadelphia',
    long: 'City of Philadelphia',
    country: 'United States',
    crosswalk: {
      // Species, Status, DBH fields but they are all blank. bleh.
    }
  },
  {
    id: 'denver',
    info: 'https://www.denvergov.org/opendata/dataset/city-and-county-of-denver-tree-inventory',
    download: 'https://www.denvergov.org/media/gis/DataCatalog/tree_inventory/csv/tree_inventory.csv',
    short: 'Denver',
    country: 'United States',
    crosswalk: {
      ref: 'SITE_ID',
      scientific: 'SPECIES_BOTANIC',
      common: 'SPECIES_COMMON',
      dbh_in: 'DIAMETER', // assuming inches
      location: 'LOCATION_NAME'
    },
    centre: { lon: -104.9454, lat: 39.7273 }
  },
  {
    id: 'boulder',
    country: 'United States',
    download: 'https://opendata.arcgis.com/datasets/dbbae8bdb0a44d17934243b88e85ef2b_0.zip',
    info: 'https://data-boulder.opendata.arcgis.com/datasets/dbbae8bdb0a44d17934243b88e85ef2b_0',
    short: 'Boulder',
    long: 'City of Boulder, Colorado',
    crosswalk: {
      scientific: 'LATINNAME',
      common: 'COMMONNAME',
      cultivar: 'CULTIVAR',
      dbh_in: 'DBHINT', // "integer in inches"
      location: 'LOCTYPE'
      // also interesting attributes on deciduous, broadlaved etc.
    }
  },
  {
    id: 'cambridge',
    country: 'United States',
    download: 'https://gis.cambridgema.gov/download/shp/ENVIRONMENTAL_StreetTrees.shp.zip',
    info: 'https://www.cambridgema.gov/GIS/gisdatadictionary/Environmental/ENVIRONMENTAL_StreetTrees',
    delFunc: x => x['SiteType'] !== 'Tree',
    crosswalk: {
      common: 'CommonName',
      scientific: 'Scientific',
      ref: 'TreeID',
      dbh_in: 'diameter', // Tree diameter in inches
      updated: 'modified',
      planted: 'PlantDate',
      stems: 'trunks',
      notable: x => ({'Y': 'memorial'})[x['MemTree']],
      // TODO Location: 'Street Tree', 'Park Tree', 'Public School', ...
      location: 'Location',
      owner: 'Ownership',
      health: x => String(x.TreeCondit).replace(/ \(.*/, '') // strings like "Good (EW 2013)"
    },
    short: 'Cambridge'
  },
  {
    id: 'berkeley',
    country: 'United States',
    download: 'https://data.cityofberkeley.info/api/views/x39z-ushg/rows.csv?accessType=DOWNLOAD',
    info: 'https://data.cityofberkeley.info/Natural-Resources/City-Trees/9t35-jmin',
    crosswalk: {
      scientific: 'SPECIES',
      common: 'Common_Nam',
      height_ft: 'HEIGHT_FT',
      dbh_in: 'DBH_IN',
      health: 'CONDITION', // numeric...
      note: 'note'
    },
    short: 'Berkeley'
  },
  {
    id: 'pittsburgh',
    country: 'United States',
    download: 'https://data.wprdc.org/dataset/9ce31f01-1dfa-4a14-9969-a5c5507a4b40/resource/d876927a-d3da-44d1-82e1-24310cdb7baf/download/trees_img.geojson',
    info: 'https://data.wprdc.org/dataset/city-trees',
    centre: { lon: -80, lat: 40.436 },
    short: 'Pittsburgh',
    crosswalk: {
      common: 'common_name',
      ref: 'id',
      scientific: 'scientific_name',
      height_ft: 'height', // max: 158, assuming feet
      health: 'condition'
    }
  },
  {
    id: 'colombus',
    country: 'United States',
    download: 'https://opendata.arcgis.com/datasets/674e4a358e8042f69a734f229a93823c_1.zip?outSR=%7B%22wkt%22%3A%22PROJCS%5B%5C%22Ohio%203402%2C%20Southern%20Zone%20(1983%2C%20US%20Survey%20feet)%5C%22%2CGEOGCS%5B%5C%22NAD%2083%20(Continental%20US)%5C%22%2CDATUM%5B%5C%22NAD%2083%20(Continental%20US)%5C%22%2CSPHEROID%5B%5C%22GRS%2080%5C%22%2C6378137.0%2C298.257222101%5D%5D%2CPRIMEM%5B%5C%22Greenwich%5C%22%2C0.0%5D%2CUNIT%5B%5C%22Degree%5C%22%2C0.0174532925199433%5D%5D%2CPROJECTION%5B%5C%22Lambert_Conformal_Conic%5C%22%5D%2CPARAMETER%5B%5C%22False_Easting%5C%22%2C1968500.0%5D%2CPARAMETER%5B%5C%22Central_Meridian%5C%22%2C-82.5%5D%2CPARAMETER%5B%5C%22Standard_Parallel_1%5C%22%2C38.7333333333%5D%2CPARAMETER%5B%5C%22Standard_Parallel_2%5C%22%2C40.0333333333%5D%2CPARAMETER%5B%5C%22Latitude_Of_Origin%5C%22%2C38.0%5D%2CUNIT%5B%5C%22U.S.%20Foot%5C%22%2C0.3048006096012%5D%5D%22%7D',
    info: 'http://opendata.columbus.gov/datasets/public-owned-trees',
    short: 'Colombus',
    crosswalk: {
      ref: 'OBJECTID',
      // DIAM_BREAST_HEIGHT: "Measurement in inches"
      dbh_in: 'DIAM_BREAS',
      // HEIGHT: "Height of tree top above ground in feet."
      height_ft: 'HEIGHT',
      updated: 'INSPECTION',
      health: 'CONDITION1',
      maturity: 'LIFE_STAGE',
      // TODO SP_CODE: e.g. 'Maple, Sugar'
      common: 'SP_CODE',
      description: 'STR_NAME'
    }
  },
  {
    id: 'austin',
    country: 'United States',
    short: 'Austin',
    download: 'https://data.austintexas.gov/api/views/7aq7-a66u/rows.csv?accessType=DOWNLOAD',
    info: 'https://catalog.data.gov/dataset/downtown-tree-inventory-2013',
    crosswalk: {
      scientific: 'SPECIES',
      common: 'COM_NAME',
      dbh_in: 'DBH',
      height_ft: 'HEIGHT',
      health: 'CONDITION',
      location: 'LAND_TYPE'
    }
  },
  {
    id: 'cornell',
    country: 'United States',
    short: 'Cornell University',
    download: 'https://cugir-data.s3.amazonaws.com/00/80/25/cugir-008025.zip',
    info: 'https://cugir.library.cornell.edu/catalog/cugir-008025',
    crosswalk: {
      scientific: 'Botanic',
      common: 'Common',
      dbh_in: 'DBH',
      note: 'Comment',
      updated: 'SurveyDate'
    }
  },
  {
    id: 'cary',
    country: 'United States',
    short: 'Cary',
    download: 'https://data.townofcary.org/explore/dataset/cary-trees/download/?format=geojson',
    info: 'https://data.townofcary.org/explore/dataset/cary-trees',
    crosswalk: {
      updated: 'editdate',
      common: 'name',
      description: 'description'
    }
  },
  {
    pending: 'Download no longer available',
    id: 'rochester',
    country: 'United States',
    short: 'Rochester',
    download: 'https://opendata.arcgis.com/datasets/4c209944e2984b4a908a14b0cbe48075_0.zip',
    info: 'http://hub.arcgis.com/datasets/RochesterNY::trees-open-data',
    crosswalk: {
      description: 'TREE_NAME',
      health: 'COND',
      dbh_in: x => String(x.DBH).replace('"', ''),
      ref: 'TREE_NUMBE',
      note: 'NOTES'
    }
  },
  {
    id: 'seattle',
    country: 'United States',
    short: 'Seattle',
    download: 'https://opendata.arcgis.com/datasets/0b8c124ace214943ab0379623937eccb_6.zip',
    info: 'http://hub.arcgis.com/datasets/SeattleCityGIS::trees',
    crosswalk: {
      ref: 'UNITID',
      health: 'CONDITION',
      owner: 'OWNERSHIP',
      updated: 'LAST_VERIF',
      planted: 'PLANTED_DA',
      scientific: 'SCIENTIFIC',
      common: 'COMMON_NAM',
      height_ft: 'TREEHEIGHT',
      dbh_in: 'DIAM',
      health: x => ['Very poor', 'Poor', 'Fair', 'Good', 'Excellent'][x.CONDITIO_3 - 1],
      // lots more https://www.seattle.gov/Documents/Departments/SDOT/GIS/Trees_OD.pdf
    }
  },
  {
    id: 'cupertino',
    country: 'United States',
    short: 'Cupertino',
    download: 'https://opendata.arcgis.com/datasets/caa50a924b7d4b5ba8e8a4cbfd0d7f13_29.csv',
    info: 'http://hub.arcgis.com/datasets/Cupertino::trees',
    geometry: { x: 'LONG', y: 'LAT' },
    crosswalk: {
      ref: 'AssetID',
      updated: 'UpdateDate',
      scientific: 'Species',
      common: 'SpeciesCommonName',
      dbh_in: 'DiameterBreastHeight',
      height_ft: 'Height',
      location: 'LocationType',
      health: 'Condition'
    },
    centre: { lon: -122.03987, lat: 37.31706 }
  },
  {
    id: 'oxnard',
    country: 'United States',
    short: 'Oxnard',
    long: 'City of Oxnard',
    download: 'https://opendata.arcgis.com/datasets/a5aa2d1dfd344ef79d61507d33cdbc02_1.csv',
    info: 'http://hub.arcgis.com/datasets/a5aa2d1dfd344ef79d61507d33cdbc02_1',
    crosswalk: {
      // FICTITIOUS?
      scientific: 'BOTANICALN',
      common: 'COMMONNAME',
      dbh_in: 'DBH',
      height_ft: 'HEIGHT'
    }
  },
  {
    id: 'wake_forest',
    country: 'United States',
    short: 'Wake Forest',
    long: 'Town of Wake Forest',
    download: 'https://opendata.arcgis.com/datasets/ba930858554a43cca1be2f06a44d2449_0.csv',
    info: 'http://hub.arcgis.com/datasets/wakeforestnc::trees',
    crosswalk: {
      scientific: 'SPECIES_LA',
      common: 'SPECIES_CO',
      health: 'STATUS', // alive / not
    }
  },
  {
    id: 'aurora',
    country: 'United States',
    short: 'Aurora',
    download: 'https://opendata.arcgis.com/datasets/1dbb32bf07ca421db4f01dac6beb812d_85.csv',
    info: 'http://hub.arcgis.com/datasets/AuroraCo::trees-city',
    crosswalk: {
      ref: 'TREE_ID_NO',
      common: 'SPECIES',
      dbh_in: 'DIAMETER',
      health: 'CONDITION', // what, there is "CONDITION_RATING_NUMERIC" which has "Good" twhereas condition is "Fair"...
      updated: 'ACTIVITY_DATE',
      // genus: 'GENUS', // "Pine" is not a genus...
    }
  },
  {
    id: 'bakersfield',
    short: 'Bakersfield',
    download: 'https://opendata.arcgis.com/datasets/b7a17f7ecb564be4b26ced85016ed1da_0.csv',
    info: 'http://hub.arcgis.com/datasets/cob::city-trees?geometry=-129.468%2C33.767%2C-108.539%2C36.903',
    crosswalk: {
      updated: 'DATE_',
      scientific: 'BOTANICAL_',
      common: 'COMMON_N',
      dbh_in: 'DIAMETER',
      height_ft: 'HEIGHT',
      crown_ft: x => x['CROWN_RADI'] * 2,
      health: 'RATING', // out of 10?
      note: 'COMMENT',
      ref: 'TREE_ID'
    }
  },
  {
    id: 'las_vegas',
    short: 'Las Vegas',
    download: 'https://opendata.arcgis.com/datasets/23364bb40f2640ff841ba4a8680b6421_0.csv?outSR=%7B%22latestWkid%22%3A3421%2C%22wkid%22%3A102707%7D',
    info: 'http://geocommons-lasvegas.opendata.arcgis.com/datasets/trees',
    srs: 'EPSG:3421',
    crosswalk: {
      location: 'LOC_TYPE',
      scientific: 'BOTANICAL',
      common: 'COMMON',
      // water_use!
      stems: 'STEMS',
      dbh_in_range: 'DBH',
      crown_ft_range: 'WIDTH',
      height_ft_range: 'HEIGHT',
      health: 'COND',
      note: 'NOTES'
    }
  },
  {
    id: 'mountain_view',
    short: 'Mountain View',
    long: 'City of Mountain View',
    download: 'https://opendata.arcgis.com/datasets/72667718eb9b427d95b6eb55e25c36a7_0.csv',
    info: 'http://hub.arcgis.com/datasets/MountainView::trees',
    crosswalk: {
      scientific: 'SPECIES',
      common: 'NAME',
      ref: 'FACILITYID',
      age: 'TREEAGE',
      dbh_in: 'DIAMETER', // TRUNKDIAM?
      height_ft: 'HEIGHT',
      planted: 'INSTALLDATE',
      health: 'CONDITION',
      updated: 'LASTUPDATE',
      // TROUPGROUP: deciduous/evergreen
    }
  },
  {
    id: 'three_rivers',
    short: 'Three Rivers',
    long: 'Three Rivers Park District',
    download: 'https://opendata.arcgis.com/datasets/ffbb9401412141a79c7164ade8d2ee2d_0.csv',
    info: 'http://hub.arcgis.com/datasets/trpd::managed-trees-open-data?geometry=-96.405%2C44.562%2C-90.563%2C45.243',
    crosswalk: {
      common: 'CommonName',
      scientific: 'ScientificName',
      planted: 'YearPlanted',
      ref: 'CartedID', //?
    }
  },
  {
    id: 'richardson',
    short: 'Richardson',
    download: 'https://opendata.arcgis.com/datasets/cd10a9e85354488dbdb697ce97ccb064_0.csv',
    info: 'http://hub.arcgis.com/datasets/richardson::trees',
    crosswalk: {
      common: 'NAME',
      genus: 'GENUS',
      species: 'SPECIES',
      age: 'TREEAGE',
      dbh_in: 'DIAMETER', // also TRUNKDIAM
      height_ft: 'HEIGHT',
      owner: 'OWNEDBY',
      structure: 'TRUNKSTRCT', // also BRANCHSTRCT
      note: 'COMMENTS',
      updated: 'last_edited_date'
    }
  },
  {
    id: 'allentown',
    short: 'Allentown',
    long: 'City of Allentown',
    download: 'https://opendata.arcgis.com/datasets/4383052db35e4f93bbd83e5bde468a00_0.csv',
    info: 'http://hub.arcgis.com/datasets/AllentownPA::city-trees',
    crosswalk: {
      common: 'TR_COMMON',
      scientific: 'TR_GENUS',
      dbh_in: 'TR_DIA',
      health: 'CONDITION',
      // lots of others
      updated: 'INPUT_DATE'
    }
  },
  {
    id: 'sioux_falls',
    short: 'Sioux Falls',
    download: 'https://opendata.arcgis.com/datasets/c880d62ae5fb4652b1f8e6cbca244107_10.csv',
    info: 'http://hub.arcgis.com/datasets/cityofsfgis::trees',
    crosswalk: {
      ref: 'AssetID',
      location: 'Location',
      common: 'FullName',
      scientific: 'Species',
      family: 'Family',
      //TreeType: Deciduous
      crown_ft: 'Spread',
      height_ft: 'Height',
      dbh_in: 'Diameter',
      health: 'Condition', // /100,
      note: 'SpecialComments',
      updated: 'last_edited_date'
    }
  },
  {
    id: 'amherst',
    short: 'Amherst',
    download: 'https://opendata.arcgis.com/datasets/b4a74ab24f114f22b438a19e589f6f76_0.zip',
    info: 'http://hub.arcgis.com/datasets/AmherstMA::street-trees',
    crosswalk: {
      ref: 'TreeID',
      updated: 'LastEdit',
      common: 'Species',
      note: 'Notes',
      // TreeSize?
    },
    centre: { lon: -72.49307, lat: 42.3818 }
  },
  {
    id: 'colorado_springs',
    short: 'Colorado Springs',
    download: 'https://opendata.arcgis.com/datasets/91758518026d4b1089f2180602399d73_0.csv',
    info: 'http://hub.arcgis.com/datasets/coloradosprings::trees/data?geometry=-106.259%2C38.699%2C-103.338%2C39.073',
    crosswalk: {
      common: 'Common_Name',
      dbh_in: 'DBH'
    }
  },
  {
    id: 'marysville_oh',
    short: 'Marysville',
    long: 'City of Marysville',
    download: 'https://opendata.arcgis.com/datasets/44b6c7a1307d48ff99d2034b5695c149_0.csv',
    info: 'http://hub.arcgis.com/datasets/Marysville::individual-trees-sites',
    delFunc: x => x.status === 'Site - Vacant',
    crosswalk: {
      ref: 'treeid',
      common: 'common',
      genus: 'genus',
      species: 'sp_epith',
      cultivar: 'variety',
      location: 'type',
      dbh_in: 'dbh',
      height_ft: 'height',
      health: 'trcond',
      updated: 'last_edited_date'
    }
  },
  {
    id: 'springfield_mo',
    short: 'Springfield',
    long: 'City of Springfield',
    download: 'https://opendata.arcgis.com/datasets/7a890a7b54d6438f80bd60e5e34c8e62_34.csv',
    info: 'http://hub.arcgis.com/datasets/COSMO::tree-inventory',
    crosswalk: {
      health: 'Condition',
      common: 'TreeType',
      scientific: 'SciName',
      height_ft_range: 'Height',
      dbh_in: 'Diameter',
      crown_ft_range: 'Spread'
    }
  },
  {
    id: 'anaheim_ca',
    short: 'Anaheim',
    download: 'https://opendata.arcgis.com/datasets/0f96c6cf73904424bc9ce14197990201_41.csv',
    info: 'https://data-anaheim.opendata.arcgis.com/datasets/city-trees',
    crosswalk: {
      common: 'COMMONNAME',
      scientific: 'BOTANICALNAME',
      dbh_in_range: 'DBH',
      height_ft_range: 'HEIGHT',
      // FICTITIOUS?
    },
    centre: { lon: -117.86, lat: 33.83 }
  },
  {
    id: 'charlottesville_nc',
    short: 'Charlottesville',
    download: 'https://opendata.arcgis.com/datasets/e7c856379492408e9543a25d684b8311_79.csv',
    info: 'http://hub.arcgis.com/datasets/charlottesville::tree-inventory-point',
    delFunc: x => x.Removal_Date,
    crosswalk: {
      planted: 'Install_Date',
      common: 'Common_Name',
      owner: 'Agency',
      genus: 'Genus',
      species: 'Species',
      updated: 'last_edited_date',
      //Removal_Date?
    }
  },
  {
    id: 'west_chester_pa',
    short: 'West Chester',
    long: 'West Chester Borough',
    download: 'https://opendata.arcgis.com/datasets/7fdf2b5d2b674e99b33e8d77d052e30c_0.csv',
    info: 'http://hub.arcgis.com/datasets/WCUPAGIS::borotrees-1?geometry=-87.273%2C38.460%2C-63.905%2C41.408',
    crosswalk: {
      dbh_in: 'DBH',
      ref: 'ID_1',
      genus: 'Genus',
      species: 'Species_1',
      common: 'CommonName',
      health: 'Condition_1'
    }
  },
  {
    id: 'durango_co',
    short: 'Durango',
    download: 'https://opendata.arcgis.com/datasets/3e3e00d6224b43ee9acc514244fffdb9_0.csv',
    info: 'http://hub.arcgis.com/datasets/CityOfDurango::city-trees',
    crosswalk: {
      planted: 'DATEID', //?
      ref: 'ID',
      //type: 'Deciduous',
      common: 'COMMON',
      genus: 'GENUS',
      species: 'SPECIES',
      cultivar: 'CULTIVAR',
      dbh_in: 'DBH',
      health: 'CONDITION',
      updated: 'LASTMODDATE'
    }
  },
  {
    id: 'washington_me',
    short: 'Washington',
    long: 'Washington County',
    download: 'https://opendata.arcgis.com/datasets/ae14fc063c1e44a995e750805b1c864b_0.csv',
    info: 'http://hub.arcgis.com/datasets/WCMN::tree-inventory',
    crosswalk: {
      common: 'Tree_Type',
      health: 'Health',
      note: 'Comments',
      ref: 'OBJECTID'
    }
  },
  {
    pending: 'Broken download link',
    id: 'westerville_oh',
    short: 'Westerville',
    download: 'https://opendata.arcgis.com/datasets/137785bc78da47b4a2159f9c76218d55_0.csv',
    info: 'http://hub.arcgis.com/datasets/Westerville::comm-parks-rec-trees',
    crosswalk: {
      dbh_in: 'DBH',
      common: 'COMMON_NAME',
      //class: deciduous
      location: 'TREE_TYPE',
      health: 'CONDITION',
      scientific: 'SCIENTIFIC'
    }
  },
  {
    id: 'st_augustine_fl',
    short: 'St Augustine',
    download: 'https://opendata.arcgis.com/datasets/8372c7d0f5a24764bd10f62f0b2f1b65_0.csv',
    info: 'http://hub.arcgis.com/datasets/STAUG::trees?geometry=-93.005%2C28.223%2C-69.637%2C31.556',
    crosswalk: {
      updated: 'INSPECT_DT',
      note: 'NOTES',
      scientific: 'SPP', // often "Palm" though
      dbh_in_range: 'DBH',
    }
  },
  {
    id: 'weston_fl',
    short: 'Weston',
    download: 'https://opendata.arcgis.com/datasets/c95f89a4db39414a89f5c29bcb6fb48d_6.csv',
    info: 'http://hub.arcgis.com/datasets/westonfl::trees',
    crosswalk: {
      common: 'NAME',
      genus: 'GENUS',
      species: 'SPECIES',
      age: 'TREEAGE',
      dbh_in: 'TRUNKDIAM',
      height_ft: 'HEIGHT',
      health: 'CONDITION',
      owner: 'OWNEDBY',
      updated: 'LASTUPDATE',
      scientific: 'BOTNAME',
      family: 'FAMILY'
    }
  },
  {
    pending: 'Broken download link',
    id: 'minneapolis_mn',
    short: 'Minneapolis',
    long: 'City of Minneapolis',
    download: 'https://opendata.arcgis.com/datasets/5c607cf94314467f87e285526b72e4d6_0.csv',
    info: 'http://opendata.minneapolismn.gov/datasets/tree-inventory',
    license: { id: 'CC-BY-SA-4.0' }
  },
  {
    id: 'pacific_grove_ca',
    short: 'Pacific Grove',
    download: 'https://opendata.arcgis.com/datasets/87bcc6e824214422be859b3251350829_3.csv',
    info: 'http://hub.arcgis.com/datasets/CityPacificGrove::trees',
    crosswalk: {
      common: 'Type',
      scientific: 'BOTANICAL',
      cultivar: 'CULTIVAR',
      dbh_in: 'DBH',
      health: x => String(x.CONDITION).split(' - ')[0],
      note: 'NOTES',
      // DATE_1 - 2015-ish. planted? updated?
    }
  },
  {
    id: 'bozeman_mt',
    short: 'Bozeman',
    long: 'City of Bozeman',
    download: 'https://opendata.arcgis.com/datasets/ba0dea7927184014a8b84e64af5c7684_0.csv',
    info: 'http://hub.arcgis.com/datasets/bozeman::trees',
    crosswalk: {
      genus: 'Genus',
      species: 'Species',
      cultivar: 'Cultivar',
      dbh_in: 'DBH',
      health: 'Condition',
      updated: 'last_edited_date',
      common: 'Common_Name',
      ref: 'FacilityID'
    }
  },
  {
    id: 'champaign_il',
    short: 'Champaign',
    download: 'https://opendata.arcgis.com/datasets/979bbeefffea408e8f1cb7a397196c64_22.csv',
    info: 'http://hub.arcgis.com/datasets/cityofchampaign::city-owned-trees',
    crosswalk: {
      ref: 'ID',
      scientific: 'SPP',
      common: 'COMMON',
      dbh_in: 'DBH',
      health: 'COND',
      updated: 'INSPECT_DT',
      note: 'NOTES',
      family: 'FAMILY'
    }
  },
  {
    id: 'placentia_ca',
    short: 'Placentia',
    download: 'https://opendata.arcgis.com/datasets/8efcbe9c80ed42a29e6ad5483bd01c32_0.csv',
    info: 'http://hub.arcgis.com/datasets/placentia::city-trees',
    crosswalk: {
      ref: 'INVENTORYI',
      scientific: 'BOTANICALN',
      common: 'COMMONNAME',
      dbh_in_range: 'DBH',
      height_ft_range: 'HEIGHT',
      updated: 'EditDate'
    }
  },
  {
    pending: 'Broken download link',
    id: 'ucsb',
    short: 'UC Santa Barbara',
    long: 'University of California, Santa Barbara',
    download: 'https://opendata.arcgis.com/datasets/c6eb1b782f674be082f9eb764314dda5_0.csv',
    info: 'http://spatialdiscovery-ucsb.opendata.arcgis.com/datasets/treekeeper-012116',
    license: { name: 'No license specified' }
  },
  {
    id: 'sarasota_fl',
    short: 'Sarasota',
    download: 'https://opendata.arcgis.com/datasets/4deeb30f44bc4b60847cf43aed1a4670_0.csv',
    info: 'http://hub.arcgis.com/datasets/sarasota::tree-inventory',
    crosswalk: {
      scientific: 'Species', // often common names like "Laurel Oak',
      dbh_in: 'DBH_1_99_',
      height_ft: 'Height_1_1',
      health: 'Condition',
      owner: 'Ownership',
      note: 'Notes',
      updated: 'last_edited_date'
    }
  },
  {
    id: 'nichols_arboretum',
    short: 'Nichols Arboretum',
    download: 'https://opendata.arcgis.com/datasets/febee55e7dac43298952af77c8f8d809_0.csv',
    info: 'http://hub.arcgis.com/datasets/umich::nichols-arboretum-inventory-survey',
    crosswalk: {
      common: 'COMMON',
      scientific: 'BOTANICAL',
      // CULTIVAR: Contains variety names (only mandshurica, pubens).
      infraspecies: 'CULTIVAR',
      dbh_in: 'DBH',
      health: 'COND',
      note: 'NOTES',
      updated: 'DATE', // EDITTIME?
    }
  },
  {
    id: 'unt',
    short: 'UNT',
    long: 'University of North Texas',
    download: 'https://opendata.arcgis.com/datasets/ee33bf4535cd47bbb1c5661d2333d834_0.csv',
    info: 'http://hub.arcgis.com/datasets/untgis::tree',
    crosswalk: {
      note: 'NOTES',
      common: 'NAME_COMN',
      ref: 'UNT_ID'
    }
  },
  {
    id: 'escondido_ca',
    short: 'Escondido',
    long: 'City of Escondido',
    download: 'https://opendata.arcgis.com/datasets/ac9caf3c7a9847b78100cc8860ddf51a_0.csv',
    info: 'http://hub.arcgis.com/datasets/CityofEscondido::tree-inventory?geometry=-122.895%2C32.313%2C-111.211%2C33.923',
    crosswalk: {
      ref: 'TREEID',
      // FICTITIOUS ??
      scientific: 'BOTANICAL',
      common: 'COMMON',
      dbh_in_range: 'DBH_RANGE',
      height_ft_range: 'HEIGHT_RAN',
      health: 'CONDITION',
      updated: 'LAST_EDITED_DATE'
    }
  },
  {
    id: 'wylie_tx',
    short: 'Wylie',
    long: 'City of Wylie',
    download: 'https://opendata.arcgis.com/datasets/82060fffb84045fdafbe2a56c989b353_0.csv',
    info: 'http://hub.arcgis.com/datasets/WylieTX::treesurvey',
    geometry: { x: 'X', y: 'Y' },
    crosswalk: {
      ref: 'TK_ID',
      common: 'COMMON',
      dbh_in: 'DBH',
      health: 'CONDITION',
      updated: 'INSPECT_DT'
    }
  },
  {
    id: 'auburn_me',
    short: 'Auburn',
    download: 'https://opendata.arcgis.com/datasets/91bffc476216422481b511a48796a327_0.csv',
    info: 'http://hub.arcgis.com/datasets/AuburnME::treeinventory?geometry=-81.930%2C42.701%2C-58.562%2C45.462',
    crosswalk: {
      ref: 'ID',
      common: 'COMMON',
      scientific: 'BOTANICAL',
      dbh_in: 'DBH',
      health: 'COND',
      note: 'NOTES'
    }
  },
  {
    id: 'uc_davis',
    short: 'UC Davis',
    long: 'University of California, Davis',
    info: 'https://data-ucda.opendata.arcgis.com/datasets/uc-davis-tree-database',
    download: 'https://opendata.arcgis.com/datasets/07939ef894984a95b58098315f80c046_0.csv',
    license: { name: 'No license specified' },
    geometry: { x: 'X', y: 'Y' },
    srs: 'EPSG:2226',
    crosswalk: {
      ref: 'TreeID',
      // TODO PlantingDate: MM/YYYY, DD/MM/YYYY, YYYY, or text (e.g. 'early 1980s')
      planted: 'PlantingDate',
      updated: 'InventoryDate',
      genus: 'Genus',
      species: 'SpecificEpithet',
      cultivar: 'CultivarName',
      scientific: 'ScientificName',
      common: 'CommonName',
      origin: x => ({
        'Introduced': 'introduced',
        'Native': 'native',
        'Naturalized': 'naturalized'
      })[x.Origin],
      dbh_cm: 'DBH', // centimeters (confirmed by DBH_in)
      height_m_min: x => ({
        '0': 0, '< 5 meters': 0, '5 - 10 meters': 5, '11 - 15 meters': 11,
        '16 - 20 meters': 16, '20 - 25 meters': 20, '> 25 meters': 25
      })[x.Height],
      height_m_max: x => ({
        '0': 0, '< 5 meters': 5, '5 - 10 meters': 10, '11 - 15 meters': 15,
        '16 - 20 meters': 20, '20 - 25 meters': 25
      })[x.Height],
      stems_range: 'Stems',
      health: x => ({
        'very poor': 'poor',
        'poor': 'poor',
        'fair': 'fair',
        'good': 'good',
        'excellent': 'excellent'
      })[x.Condition_Rating],
      notable: x => ({
        'Yes': 'memorial'
      })[x.MemorialTree],
      edible: x => x.edible ? String(x.edible === 'Yes') : null,
      harvest: 'Harvest_Window'
    }
  },
  {
    id: 'hudson_river_park',
    short: 'Hudson River Park',
    long: 'Hudson River Park Trust',
    download: 'https://opendata.arcgis.com/datasets/51b5e5da030f4331af48cb052f2d2d5e_1.csv',
    info: 'http://hub.arcgis.com/datasets/SustainableMSU::tree',
    crosswalk: {
      scientific: 'Species_Latin_Name',
      common: 'Species_Common_Name',
      height_ft: 'Height',
      dbh_in: 'DBH',
      structure: 'Structural_Value',
      ref: 'HRPT_Numbering_1'
    }
  },
  {
    id: 'cape_coral_fl',
    short: 'Cape Coral',
    download: 'https://opendata.arcgis.com/datasets/e988fe06668e44ea996a53c4365531b9_0.csv',
    info: 'http://hub.arcgis.com/datasets/CapeGIS::tree-inventory',
    crosswalk: {
      common: 'SPECIES',
      dbh_in_range: 'DBH',
      crown_ft: 'CANOPY',
      location: 'SITE',
      health: 'CONDITION',
      updated: 'last_edited_date',
      height_ft_range: 'HEIGHT',
      note: 'COMMENTS'
    }
  },
  {
    id: 'naperville_il',
    short: 'Naperville',
    download: 'https://opendata.arcgis.com/datasets/51d4726531cd4ef99bfa24b99ae3ba24_0.csv',
    info: 'http://hub.arcgis.com/datasets/naperville::right-of-way-tree-inventory',
    crosswalk: {
      common: 'ROWTREE_TYPE',
      ref: 'FACILITYID',
      health: 'CONDITION_CLASS',
      updated: 'DATE_CHANGED',
      planted: 'DatePlanted',
      dbh_in: 'EST_DBH',
      family: 'FAMILY',
      cultivar: 'CULTIVAR',
      genus: 'GENUS', // no species?
    }
  },
  {
    pending: 'Unstable download link',
    id: 'san_jose_ca1',
    short: 'San Jose',
    long: 'City of San Jose – Medians and Backups',
    download: 'http://gisdata-csjdotgis.opendata.arcgis.com/datasets/0b0ad30145394b1588ff09ef1a7c9225_1.csv',
    info: 'http://gisdata-csjdotgis.opendata.arcgis.com/datasets/0b0ad30145394b1588ff09ef1a7c9225_1',
    crosswalk: {
      scientific: 'NAMESCIENTIFIC',
      age: 'TREEAGE',
      dbh_in: 'TRUNKDIAM',
      height_ft: 'HEIGHT',
      crown_ft: 'DIAMETER',
      health: x => String(x.CONDITION).split(' ')[0],
      note: 'NOTES',
      updated: 'EditDate',
      owner: 'OWNEDBY'
    }
  },
  {
    pending: 'Unstable download link',
    id: 'san_jose_ca2',
    short: 'San Jose',
    long: 'City of San Jose – Special Districts',
    download: 'http://gisdata-csjdotgis.opendata.arcgis.com/datasets/0b0ad30145394b1588ff09ef1a7c9225_0.csv',
    info: 'http://gisdata-csjdotgis.opendata.arcgis.com/datasets/0b0ad30145394b1588ff09ef1a7c9225_0',
    crosswalk: {
      scientific: 'NAMESCIENTIFIC',
      age: 'TREEAGE',
      dbh_in: 'TRUNKDIAM',
      height_ft: 'HEIGHT',
      crown_ft: 'DIAMETER',
      health: x => String(x.CONDITION).split(' ')[0],
      note: 'NOTES',
      updated: 'EditDate',
      owner: 'OWNEDBY'
    },
    primary: 'san_jose_ca1'
  },
  {
    pending: 'Unstable download link',
    id: 'san_jose_ca3',
    short: 'San Jose',
    long: 'City of San Jose – General Fund',
    download: 'http://gisdata-csjdotgis.opendata.arcgis.com/datasets/0b0ad30145394b1588ff09ef1a7c9225_2.csv',
    info: 'http://gisdata-csjdotgis.opendata.arcgis.com/datasets/0b0ad30145394b1588ff09ef1a7c9225_2',
    crosswalk: {
      scientific: 'NAMESCIENTIFIC',
      age: 'TREEAGE',
      dbh_in: 'TRUNKDIAM',
      height_ft: 'HEIGHT',
      crown_ft: 'DIAMETER',
      health: x => String(x.CONDITION).split(' ')[0],
      note: 'NOTES',
      updated: 'EditDate',
      owner: 'OWNEDBY'
    },
    primary: 'san_jose_ca1'
  }
].map(s => ({ ...s, country: 'United States' }))
