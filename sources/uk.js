module.exports = [
  {
    id: 'belfast',
    country: 'United Kingdom',
    download: 'https://www.belfastcity.gov.uk/nmsruntime/saveasdialog.aspx?lID=14543&sID=2430',
    info: 'https://www.belfastcity.gov.uk/council/Openandlinkeddata/opendatasets.aspx',
    short: 'Belfast',
    crosswalk: {
      location: 'TYPEOFTREE',
      common: 'SPECIESTYPE',
      scientific: 'SPECIES',
      maturity: 'AGE',
      health: 'CONDITION',
      dbh: 'DIAMETERinCENTIMETRES',
      // TODO SPREADRADIUSinMETRES: -1, 0, impossible values (213, 500).
      crown: x => x['SPREADRADIUSinMETRES'] * 2,
      height: 'TREEHEIGHTinMETRES'
    }
  },
  {
    id: 'london',
    download: 'https://data.london.gov.uk/download/local-authority-maintained-trees/c52e733d-bf7e-44b8-9c97-827cb2bc53be/london_street_trees_gla_20180214.csv',
    short: 'London',
    long: 'Greater London Authority',
    country: 'United Kingdom',
    centre: { lon: -0.1051, lat: 51.5164 },
    // Camden and Lambeth provides more recent and detailed data directly
    delFunc: x => ['Camden', 'Lambeth'].includes(x.borough),
    crosswalk: {
      ref: 'gla_id',
      scientific: 'species_name',
      common: 'common_name',
      description: 'display_name',
      //gla_id,borough,species_name,common_name,display_name,load_date,easting,northing,longitude,latitude
    }
  },
  {
    id: 'camden-uk',
    info: 'https://opendata.camden.gov.uk/Environment/Trees-In-Camden/csqp-kdss',
    download: 'https://opendata.camden.gov.uk/api/views/csqp-kdss/rows.csv?accessType=DOWNLOAD',
    license: { id: 'OGL-UK-3.0' },
    short: 'Camden',
    long: 'London Borough of Camden',
    delFunc: x => x['Number Of Trees'] == 0 || x['Scientific Name'].match(/^vacant /i),
    geometry: { x: 'Longitude', y: 'Latitude' },
    epsg: 'EPSG:4326',
    crosswalk: {
      count: 'Number Of Trees',
      location: x => ({
        'Corporate Landlord': 'corporate',
        'Education': 'school',
        'Highways': 'street',
        'Housing': 'residential',
        'Parks': 'park'
      })[x['Contract Area']],
      // Scientific Name: <Genus> <species> ... (|'|")<(C|c)ultivar>(|'|")
      // Messy specific epithets (e.g. 'Yucca unidentified species')
      scientific: 'Scientific Name',
      // Common Name: <Alder> - <Common>
      common: x => x['Common Name'] ?
        x['Common Name'].replace(/^\s*(.*) - (.*).*/, '$2 $1') : null,
      // Inspection Date: DD/MM/YYYY
      updated: x => x['Inspection Date'] ?
        x['Inspection Date'].replace(/^([0-9]{2})\/([0-9]{2})\/([0-9]{4}).*$/, '$3-$2-$1') : null,
      height: 'Height In Metres',
      crown: 'Spread In Metres',
      dbh: 'Diameter In Centimetres At Breast Height',
      maturity: x => ({
        'Juvenile': 'young',
        'Middle aged': 'semi-mature',
        'Mature': 'mature',
        'Veteran': 'mature',
        'Over Mature': 'over-mature'
      })[x['Maturity']],
      notable: x => ({
        'Veteran': 'veteran'
      })[x['Maturity']],
      health: x => ({
        'Dead': 'dead',
        'Poor': 'poor',
        'Fair': 'fair',
        'Good': 'good',
        'Excellent': 'excellent'
      })[x['Physiological Condition']],
      value: 'Capital Asset Value For Amenity Trees', // GBP
      carbon: 'Carbon Storage In Kilograms',
      carbon_annual: 'Gross Carbon Sequestration Per Year In Kilograms',
      ref: 'Identifier'
    }
  },
  {
    id: 'lambeth',
    short: 'Lambeth',
    long: 'London Borough of Lambeth',
    info: 'http://lambethopenmappingdata-lambethcouncil.opendata.arcgis.com/datasets/4830faac39b44e3da6a18bc70f6ad3b9_0',
    download: 'https://opendata.arcgis.com/datasets/4830faac39b44e3da6a18bc70f6ad3b9_0.csv',
    license: { id: 'OGL-UK-3.0' },
    geometry: { x: 'X', y: 'Y' },
    srs: 'EPSG:4326',
    delFunc: x => x.COMMONNAME === "'Vacant tree pit'" ||
      x.SPECIES.match(/tree removed|^\[/i),
    crosswalk: {
      ref: 'OBJECTID',
      // SPECIES & COMMONNAME: Quoted strings are null (e.g. 'Species unknown')
      scientific: x => x.SPECIES.match(/^'|unknown/i) ? null : x.SPECIES,
      common: x => x.COMMONNAME.match(/^'/) ? null : x.COMMONNAME,
      health: x => x.COMMONNAME === "'Dead Tree'" ? 'dead' : null,
    }
  },
  {
    id: 'birmingham',
    download: 'https://cc-p-birmingham.ckan.io/dataset/e9c314fc-fb6d-4189-a19c-7eec962733a8/resource/4bfd9191-a520-42fb-9ebf-8fefaededf6c/download/trees-dec2016.csv',
    short: 'Birmingham',
    country: 'United Kingdom',
    crosswalk: {
      scientific: 'species',
      maturity: 'age',
      height: 'height',
      location: 'site_name'
    },
    centre: { lon: -1.8673, lat: 52.47 }
  },
  {
    id: 'bristol',
    country: 'United Kingdom',
    download: 'https://opendata.bristol.gov.uk/explore/dataset/trees/download/?format=geojson&timezone=Australia/Sydney&lang=en',
    info: 'https://opendata.bristol.gov.uk/explore/dataset/trees/export/',
    crosswalk: {
      dbh: 'dbh',
      height: 'crown_height',
      common: 'common_name',
      scientific: 'latin_name',
      common: 'full_common_name',
      crown: x => x['crown_width']
    },
    short: 'Bristol'
  },
  {
    id: 'edinburgh',
    country: 'United Kingdom',
    short: 'Edinburgh',
    download: 'https://data.edinburghcouncilmaps.info/datasets/4dfc8f18a40346009b9fc32cbee34039_39.zip',
    info: 'https://data.edinburghcouncilmaps.info/datasets/4dfc8f18a40346009b9fc32cbee34039_39',
    crosswalk: {
      scientific: 'LatinName',
      common: 'CommonName',
      height: 'Height',
      crown: 'Spread',
      maturity: 'AgeGroup',
      dbh: 'DiameterAt'
    }
  },
  {
    id: 'dundee',
    country: 'United Kingdom',
    short: 'Dundee',
    long: 'Dundee City Council',
    download: 'https://data.dundeecity.gov.uk/datastore/dump/e54ef90a-76e5-415e-a272-5e489d9f5c67',
    info: 'https://data.dundeecity.gov.uk/dataset/trees',
    crosswalk: {
      ref: 'TREE_NUMBER',
      height: 'HEIGHT_M',
      // GIRTH: ${min}-${max}cm, ${x}
      circumference_cm_min: x => {
        const match = x['GIRTH'].match(/^([0-9]+)/)
        if (match) return match[1]
      },
      circumference_cm_max: x => {
        const match = x['GIRTH'].match(/^[0-9]+\s*-\s*([0-9]+)|^([0-9]+)$/)
        if (match) return match[1] | match[2]
      },
      maturity: 'AGE_CLASS',
      scientific: 'SCIENTIFIC_NAME',
      common: 'POPULAR_NAME'
    }
  },
  {
    id: 'york',
    country: 'United Kingdom',
    short: 'York',
    long: 'City of York Council',
    download: 'https://opendata.arcgis.com/datasets/30f38f358843467daa2d93074a03b8d5_3.csv',
    info: 'https://data.gov.uk/dataset/12dcc527-a7e2-4b23-a3c5-1501053ff0f5/council-owned-trees',
    crosswalk: {
      ref: 'TREEID',
      scientific: 'BOTANICAL',
      common: 'SPECIES'
    }
  },
  {
    id: 'york-private',
    country: 'United Kingdom',
    short: 'York',
    download: 'https://opendata.arcgis.com/datasets/a602aca10afb49659720b435d3f54023_18.csv',
    info: 'https://data.gov.uk/dataset/c166b067-5a9d-487b-a37d-4d350f8cff51/private-trees',
    geometry: { x: 'X', y: 'Y' },
    crosswalk: {
      owner: 'OWNER',
      common: 'SPECIES',
      scientific: 'BOTANICAL'
    },
    primary: 'york'
  },
  {
    id: 'craigynos_uk',
    short: 'Craig-y-Nos',
    long: 'Craig-y-Nos Country Park',
    download: 'https://gis.beacons-npa.gov.uk/geoserver/inspire/ows?service=WFS&version=2.0.0&request=GetFeature&typeName=inspire:cyn_tree_survey',
    info: 'https://data.gov.uk/dataset/35853f97-5cb9-4779-89aa-87fd4d657595/craig-y-nos-tree-survey',
    crosswalk: {
      updated: 'survey_date'
    },
    centre: { lon: -3.684357, lat: 51.826852 }
  }
].map(s => ({ ...s, country: 'United Kingdom' }))
