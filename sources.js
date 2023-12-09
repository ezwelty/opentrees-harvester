const gdal = require('gdal-async')
const helpers = require('./lib/helpers')

module.exports = [
  {
    country: 'Argentina',
    state: 'Buenos Aires',
    city: 'Buenos Aires',
    scope: 'Tree: park',
    info: 'https://data.buenosaires.gob.ar/dataset/arbolado-espacios-verdes',
    download: 'https://cdn.buenosaires.gob.ar/datosabiertos/datasets/ministerio-de-espacio-publico-e-higiene-urbana/arbolado-espacios-verdes/arbolado-en-espacios-verdes.csv',
    geometry: { x: 'long', y: 'lat' },
    srs: 'EPSG:4326',
    crosswalk: {
      ref: 'id_arbol',
      height: 'altura_tot',
      dbh: 'diametre',
      common: 'nombre_com',
      scientific: 'nombre_cie',
      family: 'nombre_fam'
    },
    license: { id: 'CC-BY-2.5-AR' },
    opentrees_id: 'buenos_aires'
  },
  {
    country: 'Argentina',
    state: 'Buenos Aires',
    city: 'Buenos Aires',
    scope: 'Tree: street',
    info: 'https://data.buenosaires.gob.ar/dataset/arbolado-publico-lineal',
    download: 'https://cdn.buenosaires.gob.ar/datosabiertos/datasets/atencion-ciudadana/arbolado-publico-lineal/arbolado-publico-lineal-2017-2018.csv',
    geometry: { x: 'long', y: 'lat' },
    srs: 'EPSG:4326',
    crosswalk: {
      ref: 'nro_registro',
      scientific: 'nombre_cientifico',
      dbh: 'diametro_altura_pecho',
      height: 'altura_arbol'
    },
    license: { id: 'CC-BY-2.5-AR' },
    opentrees_id: 'buenos_aires2'
  },
  {
    country: 'Argentina',
    state: 'Córdoba',
    city: 'Villa Maria',
    scope: 'Tree',
    info: 'https://datos.villamaria.gob.ar/dataset/relevamiento-de-arbolado',
    download: 'https://datos.villamaria.gob.ar/dataset/relevamiento-de-arbolado/relevamiento-arbolado-2021/download',
    license: { id: 'ODbL-1.0' }
  },
  {
    country: 'Australia',
    state: 'Australian Capital Territory',
    city: 'Canberra',
    designation: 'University of Canberra > Bruce Campus',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=cb635cadf24e45c7a4d40e75892f2b88',
    download: {
      arcgis: 'https://services3.arcgis.com/iR1gOFe0FlzMQ2yd/arcgis/rest/services/Trees/FeatureServer/4'
    }
  },
  {
    country: 'Australia',
    state: 'Australian Capital Territory',
    city: 'Canberra',
    designation: 'University of Canberra > Bruce Campus',
    scope: 'Plant',
    info: 'https://www.arcgis.com/home/item.html?id=cb635cadf24e45c7a4d40e75892f2b88',
    download: {
      arcgis: 'https://services3.arcgis.com/iR1gOFe0FlzMQ2yd/arcgis/rest/services/Trees/FeatureServer/3'
    }
  },
  {
    country: 'Australia',
    state: 'Australian Capital Territory',
    city: 'Canberra',
    designation: 'University of Canberra > Bruce Campus > Arscott House',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=cb635cadf24e45c7a4d40e75892f2b88',
    download: {
      arcgis: 'https://services3.arcgis.com/iR1gOFe0FlzMQ2yd/arcgis/rest/services/Trees/FeatureServer/2'
    }
  },
  {
    country: 'Australia',
    state: 'Australian Capital Territory',
    city: 'Canberra',
    designation: 'University of Canberra > Bruce Campus > Building 18',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=cb635cadf24e45c7a4d40e75892f2b88',
    download: {
      arcgis: 'https://services3.arcgis.com/iR1gOFe0FlzMQ2yd/arcgis/rest/services/Trees/FeatureServer/0'
    }
  },
  {
    country: 'Australia',
    state: 'Australian Capital Territory',
    city: 'Canberra',
    scope: 'Tree: notable',
    info: 'https://www.arcgis.com/home/item.html?id=b0cfb6e7767940e7ad381f318377854c',
    download: {
      arcgis: 'https://services1.arcgis.com/E5n4f1VY84i0xSjy/arcgis/rest/services/Urban_Tree_Planting_V2_2020_Public_Facing_V2/FeatureServer/0'
    }
  },
  {
    country: 'Australia',
    state: 'New South Wales',
    city: 'Armidale',
    designation: 'University of New England',
    info: 'https://www.arcgis.com/home/item.html?id=ecc21d05a0874c35af213d09112f7f4b',
    download: {
      arcgis: 'https://services8.arcgis.com/gigBJvypnoBXUXfx/arcgis/rest/services/UNE_Tree_Map_WFL1/FeatureServer/0'
    }
  },
  {
    omit: 'No species',
    country: 'Australia',
    state: 'New South Wales',
    city: 'Ryde',
    scope: 'Tree',
    info: 'https://data.nsw.gov.au/data/dataset/public-trees-2013',
    download: [
      'https://data.nsw.gov.au/data/dataset/f7cd2071-642e-4cac-9d28-d7ddf5635c39/resource/47843888-f9b6-4ae3-ba80-9318ff60a120/download/public-trees-2013.dbf',
      'https://data.nsw.gov.au/data/dataset/f7cd2071-642e-4cac-9d28-d7ddf5635c39/resource/1372b28f-4201-46ab-9099-be0458a317bb/download/public-trees-2013.prj',
      'https://data.nsw.gov.au/data/dataset/f7cd2071-642e-4cac-9d28-d7ddf5635c39/resource/00e339ad-e411-48b2-8cfa-ed3dfa8209ca/download/public-trees-2013.shp',
      'https://data.nsw.gov.au/data/dataset/f7cd2071-642e-4cac-9d28-d7ddf5635c39/resource/3f4f3346-52d5-4084-94fc-877bf70c0a76/download/public-trees-2013.shx'
    ],
    openFunc: files => {
      const prefix = crypto.randomBytes(6).toString('hex')
      // Place all files into /vsimem
      const vsimemFiles = files.map(file => {
        const buffer = fs.readFileSync(file)
        const filename = path.basename(file)
        const filepath = path.join('/vsimem/', prefix, filename)
        gdal.vsimem.set(buffer, filepath)
        return filepath
      })
      // Open shp file with gdal.open
      const shapefile = vsimemFiles.find(x => x.endsWith('.shp'))
      return gdal.open(shapefile)
    },
    crosswalk: { height: 'Height' },
    license: { id: 'CC-BY-4.0' },
    opentrees_id: 'ryde'
  },
  {
    country: 'Australia',
    state: 'New South Wales',
    city: 'Sydney',
    scope: 'Tree',
    info: 'https://data.cityofsydney.nsw.gov.au/datasets/cityofsydney::trees/about',
    download: {
      arcgis: 'https://services1.arcgis.com/cNVyNtjGVZybOQWZ/arcgis/rest/services/Trees/FeatureServer/0'
    },
    license: { id: 'CC-BY-4.0' }
  },
  {
    country: 'Australia',
    state: 'Queensland',
    designation: 'Sunshine Coast',
    scope: 'Tree',
    info: 'https://data.sunshinecoast.qld.gov.au/datasets/scrcpublic::trees-planted/about',
    download: {
      arcgis: 'https://gislegacy.scc.qld.gov.au/arcgis/rest/services/Environment/ParksandGardensContracts_SCRC/MapServer/21'
    },
    license: { id: 'CC-BY-3.0' }
  },
  {
    country: 'Australia',
    state: 'Queensland',
    city: 'Moreton Bay',
    scope: 'Tree: notable',
    info: 'https://datahub.moretonbay.qld.gov.au/datasets/moretonbay::mbrc-planning-scheme-heritage-landscape-significant-trees/about',
    download: {
      arcgis: 'https://services-ap1.arcgis.com/152ojN3Ts9H3cdtl/arcgis/rest/services/MBRC_PlanningScheme_HeritageLandscape_SignificantTree/FeatureServer/0'
    },
    license: { id: 'CC-BY-4.0' }
  },
  {
    country: 'Australia',
    state: 'Queensland',
    city: 'Noosa Shire',
    scope: 'Tree',
    info: 'https://data.gov.au/data/dataset/tree-register',
    download: 'https://data.gov.au/geoserver/tree-register/wfs?service=WFS&version=2.0.0&request=GetFeature&typeNames=tree-register:TreeRegister_point19&srsName=EPSG:4326&outputFormat=application/json',
    license: { id: 'CC-BY-2.5-AU' }
  },
  {
    country: 'Australia',
    state: 'Queensland',
    city: 'Sherwood',
    designation: 'Sherwood Arboretum',
    scope: 'Tree',
    info: 'https://www.data.brisbane.qld.gov.au/data/dataset/botanic-collection-sherwood-arboretum',
    download: {
      arcgis: 'https://services2.arcgis.com/dEKgZETqwmDAh1rP/arcgis/rest/services/Botanic_collection_%E2%80%94_Sherwood_Arboretum/FeatureServer/0'
    },
    crosswalk: {
      common: 'Common_Name',
      scientific: 'Scientific_Name',
      family: 'Family',
      height: 'Height',
      crown: 'Crown_width',
      dbh: x => x.DBH / 10 || undefined,
      ref: 'ObjectId'
    },
    license: { id: 'CC-BY-4.0' },
    opentrees_id: 'sherwood_arboretum'
  },
  {
    country: 'Australia',
    state: 'South Australia',
    city: 'Adelaide',
    designation: 'Waite Arboretum',
    scope: 'Tree',
    info: 'https://data.sa.gov.au/data/dataset/waite-arboretum-spatial-data',
    download: 'https://data.sa.gov.au/data/dataset/dfdf19f5-a6c4-4192-9c97-21b445407d83/resource/45dc6b32-3423-4478-9452-75628c92ff1c/download/waitetreeid-2014-app-joined-19062014.zip',
    vfs: '/vsizip/',
    crosswalk: { ref: 'tree_id', scientific: 'scientific', common: 'commonname' },
    license: { id: 'CC-BY-4.0' },
    opentrees_id: 'waite'
  },
  {
    country: 'Australia',
    state: 'South Australia',
    city: 'Adelaide',
    scope: 'Tree',
    info: 'https://data.sa.gov.au/data/dataset/1a36b15d-7f2a-4ef9-8c71-1f1da954da36',
    download: 'https://s3.ap-southeast-2.amazonaws.com/dmzweb.adelaidecitycouncil.com/OpenData/Street_Trees/Street_Trees.csv',
    driver: 'CSV',
    geometry: {
      x: 'Easting (Location/Map Coordinates)',
      y: 'Northing (Location/Map Coordinates)'
    },
    srs: 'EPSG:28354',
    crosswalk: {
      ref: 'Asset Id (identifier)',
      circumference_m_min: x => ({
        '0m -1m': 0,
        '1m - 2m': 1,
        '2m - 3m': 2,
        '>3m': 3,
      })[x['Circum (Inspection)']],
      circumference_m_max: x => ({
        '0m -1m': 1,
        '1m - 2m': 2,
        '2m - 3m': 3
      })[x['Circum (Inspection)']],
      health: x => 'Vigour (Inspection)',
      height: 'Height (Inspection)',
      structure: 'Structure (Inspection)',
      maturity: 'Age (Inspection)',
      scientific: 'Species Name (Inspection)',
      common: 'Common Name (Inspection)'
    },
    license: { id: 'CC-BY-4.0' },
    opentrees_id: 'adelaide'
  },
  {
    country: 'Australia',
    state: 'South Australia',
    city: 'Burnside',
    scope: 'Tree',
    info: 'https://data.sa.gov.au/data/dataset/burnside-street-trees',
    download: 'https://data.sa.gov.au/data/dataset/b7e1c8f6-169c-41bd-b5d7-140395a41c38/resource/6d1912aa-4775-4f5e-b00d-18456ad872a5/download/burnsidetrees2019.geojson',
    crosswalk: {
      ref: 'TreeID',
      common: 'CommonName',
      height: 'TreeHeight',
      scientific: 'BotanicalN',
      dbh: 'Circumfere'
    },
    license: { id: 'CC-BY-4.0' },
    opentrees_id: 'burnside'
  },
  {
    country: 'Australia',
    state: 'South Australia',
    city: 'Prospect',
    scope: 'Tree',
    info: 'https://data.sa.gov.au/data/dataset/city-of-prospect-street-tree-species',
    download: 'https://data.sa.gov.au/data/dataset/7bf2e4a4-40cc-40fd-83a9-fabb6d854039/resource/3f6be219-d66f-4b40-bfc7-16214fbc0989/download/city-of-prospect-street-trees-2016.csv',
    geometry: { x: 'Longitude', y: 'Latitude' },
    srs: 'EPSG:4326',
    crosswalk: { common: 'Species Name' },
    license: { id: 'CC-BY-4.0' },
    opentrees_id: 'prospect2'
  },
  {
    country: 'Australia',
    state: 'South Australia',
    city: 'Prospect',
    scope: 'Tree: park',
    info: 'https://data.sa.gov.au/data/dataset/city-of-prospect-tree-species-in-reserves',
    download: 'https://data.sa.gov.au/data/dataset/5d86d41e-b6c6-47d5-9b88-4d95916c5e76/resource/d1e30913-6e91-4a1f-b576-64120cc4b242/download/city-of-prospect-tree-species-in-reserves-2016.csv',
    driver: 'CSV',
    geometry: { x: 'Longitude', y: 'Latitude' },
    srs: 'EPSG:4326',
    crosswalk: {
      species: 'Tree Species',
      maturity: 'Tree Age',
      circumference_m_min: x => ({
        'Less than 2m': 0,
        '2m': 2,
        'Greater than 2m less than 3m': 2,
        'Greater than 3m': 3,
      })[x['Tree Circumference']],
      circumference_m_max: x => ({
        'Less than 2m': 2,
        '2m': 2,
        'Greater than 2m less than 3m': 3
      })[x['Tree Circumference']],
      health: 'Tree Health',
      structure: 'Tree Structure',
      height: 'Tree Height'
    },
    license: { id: 'CC-BY-4.0' },
    opentrees_id: 'prospect1'
  },
  {
    country: 'Australia',
    state: 'South Australia',
    city: 'Unley',
    scope: 'Tree',
    info: 'https://opendata.unley.sa.gov.au/datasets/unley::street-trees/about',
    download: {
      arcgis: 'https://services9.arcgis.com/vsQXCXZ0LMZJANxk/arcgis/rest/services/Trees/FeatureServer/0'
    },
    crosswalk: {
      genus: 'dom_genus_',
      species: 'dom_spcie',
      health: 'health',
      structure: 'structure',
      maturity: 'age',
      ule: 'unel___repl'
    },
    opentrees_id: 'unley'
  },
  {
    country: 'Australia',
    state: 'Tasmania',
    city: 'Hobart',
    scope: 'Tree: notable',
    info: 'https://data-1-hobartcc.opendata.arcgis.com/datasets/hobartcc::significant-tree-point/about',
    download: {
      arcgis: 'https://services1.arcgis.com/NHqdsnvwfSTg42I8/arcgis/rest/services/ENVIRON_Significant_Tree_Locations/FeatureServer/0'
    },
    license: { id: 'CC-BY-4.0' },
    opentrees_id: 'hobart'
  },
  {
    country: 'Australia',
    state: 'Tasmania',
    city: 'Launceston',
    scope: 'Tree',
    info: 'https://opendata.launceston.tas.gov.au/datasets/launceston::trees-4/about',
    download: {
      arcgis: 'https://services.arcgis.com/yeXpdyjk3azbqItW/arcgis/rest/services/ParksAndRecreation/FeatureServer/1'
    },
    crosswalk: {
      ref: 'objectid',
      common: 'name',
      scientific: 'genusspeci',
      maturity: 'age',
      dbh: 'diametr_c',
      height: 'height_m',
      crown: 'horizontal',
      updated: 'auditdate'
    },
    opentrees_id: 'launceston'
  },
  {
    country: 'Australia',
    state: 'Victoria',
    city: 'Ballarat',
    scope: 'Tree',
    info: 'https://data.gov.au/data/dataset/ballarattrees',
    download: 'https://data.gov.au/data/dataset/eabaee3f-a563-449b-a04a-1ec847566ea1/resource/a5906cbb-4b5f-47ad-a86a-fbf0ff1e6be3/download/ballarattrees.csv',
    geometry: { x: 'lon', y: 'lat' },
    srs: 'EPSG:4326',
    crosswalk: {
      scientific: 'species',
      common: 'common',
      species: 'species',
      genus: x => undefined,
      description: 'description',
      dbh: 'dbh',
      crown: 'crown',
      height: 'height',
      maturity: 'maturity',
      health: 'health',
      structure: 'structure',
      location: 'location',
      ref: 'ref',
      planted: 'planted',
      updated: 'updated',
      ule: 'ule',
      ule_min: 'ule_min',
      ule_max: 'ule_max'
    },
    license: { id: 'CC-BY-3.0-AU' },
    opentrees_id: 'ballarat'
  },
  {
    country: 'Australia',
    state: 'Victoria',
    city: 'Ballarat',
    scope: 'Tree: notable',
    info: 'https://data.ballarat.vic.gov.au/explore/dataset/exceptional-tree-register/information/',
    download: 'https://data.ballarat.vic.gov.au/api/explore/v2.1/catalog/datasets/exceptional-tree-register/exports/geojson',
    license: { id: 'CC-BY-3.0-AU' },
    opentrees_id: 'ballarat'
  },
  {
    country: 'Australia',
    state: 'Victoria',
    city: 'Bendigo',
    scope: 'Tree',
    info: 'https://data.gov.au/data/dataset/city-of-greater-bendigo-environment-trees',
    download: 'https://data.gov.au/data/dataset/d17c9e50-fab1-40e6-b91d-6e665faf2656/resource/b3f01081-924c-41b7-989a-cf521ca136ea/download/cogb-environment-trees.shz',
    crosswalk: {
      ref: 'assetid',
      description: 'desc',
      scientific: x => x.species.split(' - ')[0],
      common: x => x.species.split(' - ')[1],
      cultivar: x => x.cultivar !== 'Not Specified' ? x.cultivar : ''
    },
    license: { id: 'CC-BY-2.5-AU' },
    opentrees_id: 'bendigo'
  },
  {
    country: 'Australia',
    state: 'Victoria',
    city: 'Boroondara',
    scope: 'Tree: notable',
    info: 'https://data.gov.au/data/dataset/significant-tree',
    download: 'https://data.gov.au/geoserver/significant-tree/wfs?service=WFS&version=2.0.0&request=GetFeature&typeNames=significant-tree:Significant_Trees_201616&srsName=EPSG:4326&outputFormat=application/json',
    crosswalk: {
      species: 'botanicaln',
      common: 'commonname',
      height: 'height',
      crown: 'canopyspre',
      health: 'health',
      description: 'significan',
      location: 'locality',
      dbh: x => x.girth + ' girth'
    },
    license: { id: 'CC-BY-3.0-AU' },
    opentrees_id: 'boroondara'
  },
  {
    country: 'Australia',
    state: 'Victoria',
    city: 'Brimbank',
    scope: 'Tree',
    notes: 'WFS (https://data.gov.au/geoserver/brimbank-open-space-trees/wfs) is empty',
    info: 'https://data.gov.au/data/dataset/brimbank-open-space-trees',
    download: 'https://data.gov.au/data/dataset/7a57b5a1-2ca3-4171-be91-0d371cefd250/resource/0df2776c-4432-4dcc-9cfd-1ea3efad2cfc/download/brimbank-open-space-trees.zip',
    vfs: '/vsizip/',
    crosswalk: {
      ref: 'central_as',
      location: 'location',
      genus: 'genus',
      species: 'species',
      common: 'common_nam',
      maturity: 'age',
      height: 'height',
      crown: 'spread'
    },
    license: { id: 'CC-BY-2.5-AU' },
    opentrees_id: 'brimbank'
  },
  {
    country: 'Australia',
    state: 'Victoria',
    city: 'Colac Otway Shire',
    scope: 'Tree',
    info: 'https://data.gov.au/data/dataset/colac-otway-shire-trees',
    download: 'https://data.gov.au/geoserver/colac-otway-shire-trees/wfs?service=WFS&version=2.0.0&request=GetFeature&typeNames=colac-otway-shire-trees:COS_Trees_OpenData0&srsName=EPSG:4326&outputFormat=application/json',
    crosswalk: {
      ref: 'tree_id',
      genus: 'genus_desc',
      species: 'spec_desc',
      scientific: x => `${x.genus_desc} ${x.spec_desc}`.trim(),
      common: 'common_nam',
      location: x => x.location_t.split(' ')[1],
      height: 'height_m',
      crown: 'canopy_wid',
      dbh: 'diam_breas',
      maturity: 'life_stage'
    },
    license: { id: 'CC-BY-3.0-AU' },
    opentrees_id: 'colac_otways'
  },
  {
    country: 'Australia',
    state: 'Victoria',
    city: 'Corangamite Shire',
    scope: 'Tree',
    info: 'https://data.gov.au/data/dataset/corangamite-shire-street-and-park-trees',
    download: 'https://data.gov.au/data/dataset/e5ead3cd-5dc9-4ba7-b15c-ec200f3c6c1b/resource/827f4d85-52dd-44fe-85ec-b1edcfe89241/download/corangamite-shire-street-and-park-trees.csv',
    geometry: { x: 'lon', y: 'lat' },
    srs: 'EPSG:4326',
    crosswalk: {
      ref: 'id',
      height: 'height',
      crown: 'width',
      scientific: 'species',
      common: 'name',
      location: x => ({ 'STREET TREE': 'street', 'PARK TREE': 'park' }[x.tree_type] || '')
    },
    license: { id: 'CC-BY-4.0' },
    opentrees_id: 'corangamite'
  },
  {
    country: 'Australia',
    state: 'Victoria',
    city: 'Dookie College',
    designation: 'University of Melbourne',
    info: 'https://www.arcgis.com/home/item.html?id=8fcfd4c7dd524707b97a6797fed8351a',
    download: {
      arcgis: 'https://services6.arcgis.com/wNUCgbZ3TmLukLnT/arcgis/rest/services/Dookie_Tree_Inventory_2022/FeatureServer/0'
    }
  },
  {
    country: 'Australia',
    state: 'Victoria',
    city: 'Glen Eira',
    scope: 'Tree',
    info: 'https://data.gov.au/data/dataset/park-and-street-trees',
    download: 'https://data.gov.au/data/dataset/ed15e3ea-48dc-47d2-afa6-518e6f5276e1/resource/85c2d44c-8ccf-4a32-9881-872f1a511ef7/download/streetandparktrees.json',
    crosswalk: {
      dbh: 'dbh',
      common: 'common_nam',
      scientific: 'botanical',
      height: 'height',
      crown: 'spread',
      location: 'locationty'
    },
    license: { id: 'CC-BY-2.5-AU' },
    opentrees_id: 'glen_eira'
  },
  {
    country: 'Australia',
    state: 'Victoria',
    city: 'Glenelg Shire',
    scope: 'Tree',
    info: 'https://data.gov.au/data/dataset/glenelg-street-and-park-trees',
    download: 'https://data.gov.au/data/dataset/3721ad67-7b5b-4815-96b1-9d8b1a89dbd7/resource/b9ff3d44-17b4-4f87-8a28-2d540fa37d8f/download/glenelg-street-and-park-trees.csv',
    geometry: { x: 'lon', y: 'lat' },
    srs: 'EPSG:4326',
    crosswalk: {
      scientific: 'scientific',
      common: 'common',
      species: 'species',
      genus: 'genus',
      description: 'description',
      dbh: 'dbh',
      crown: 'crown',
      height: 'height',
      maturity: 'maturity',
      health: 'health',
      structure: 'structure',
      location: 'location',
      ref: 'ref',
      planted: 'planted',
      updated: 'updated',
      ule: 'ule',
      ule_min: 'ule_min',
      ule_max: 'ule_max'
    },
    terms: 'Other (Open)',
    opentrees_id: 'glenelg'
  },
  {
    country: 'Australia',
    state: 'Victoria',
    city: 'Greater Geelong',
    scope: 'Tree',
    info: 'https://www.geelongdataexchange.com.au/explore/dataset/plaprodplacestreepoints_prod/information/',
    download: 'https://www.geelongdataexchange.com.au/api/explore/v2.1/catalog/datasets/plaprodplacestreepoints_prod/exports/geojson',
    crosswalk: {
      scientific: x => x.genus + ' ' + (x.species || '').toLowerCase(),
      common: 'common',
      species: 'species',
      genus: 'genus',
      description: 'description',
      dbh: 'dbh',
      crown: 'crown',
      height: 'height',
      maturity: 'maturity',
      health: 'health',
      structure: 'structure',
      location: 'location',
      ref: 'ref',
      planted: 'planted',
      updated: 'updated',
      ule: 'ule',
      ule_min: 'ule_min',
      ule_max: 'ule_max'
    },
    license: { id: 'CC-BY-3.0' },
    opentrees_id: 'geelong'
  },
  {
    country: 'Australia',
    state: 'Victoria',
    city: 'Greater Shepparton',
    scope: 'Tree',
    info: 'https://data.gov.au/data/dataset/greater-shepparton-city-council-street-and-park-trees',
    download: 'https://data.gov.au/geoserver/greater-shepparton-city-council-street-and-park-trees/wfs?service=WFS&version=2.0.0&request=GetFeature&typeNames=greater-shepparton-city-council-street-and-park-trees:Greater_Shepparton_City_Council_Street_and_Pa0&srsName=EPSG:4326&outputFormat=application/json',
    crosswalk: {
      scientific: 'scientific',
      common: 'common',
      species: 'species',
      genus: 'genus',
      description: 'description',
      dbh: 'dbh',
      crown: 'crown',
      height: 'height',
      maturity: 'maturity',
      health: 'health',
      structure: 'structure',
      location: 'location',
      ref: 'ref',
      planted: 'planted',
      updated: 'updated',
      ule: 'ule',
      ule_min: 'ule_min',
      ule_max: 'ule_max'
    },
    license: { id: 'CC-BY-4.0' },
    opentrees_id: 'shepparton'
  },
  {
    country: 'Australia',
    state: 'Victoria',
    city: 'Hobsons Bay',
    scope: 'Tree',
    info: 'https://data.gov.au/data/dataset/hbcc-street-and-park-trees',
    download: 'https://data.gov.au/data/dataset/80051ffe-04d5-4602-b15b-60e0d0e3d153/resource/ea1ec6fc-02bd-4e36-8e43-c990b6a9268d/download/hbcc_street_and_park_trees.json',
    crosswalk: {
      genus: 'Genus',
      species: 'Species',
      dbh: 'DBH',
      location: 'Type'
    },
    license: { id: 'CC-BY-2.5-AU' },
    opentrees_id: 'hobsons_bay'
  },
  {
    country: 'Australia',
    state: 'Victoria',
    city: 'Manningham',
    scope: 'Tree',
    info: 'https://data.gov.au/data/dataset/manningham-streettrees',
    download: 'https://data.gov.au/data/dataset/1aef5123-24ff-4084-a0f1-a52ca71e9e99/resource/4797e8de-9750-4ed7-9d84-ea318302b881/download/manningham_street_trees.csv',
    geometry: { x: 'lon', y: 'lat' },
    srs: 'EPSG:4326',
    crosswalk: {
      ref: 'id',
      updated: 'date1',
      scientific: 'species',
      height_m_range: 'height',
      dbh_mm_range: 'dbh'
    },
    license: { id: 'CC-BY-3.0-AU' },
    opentrees_id: 'manningham'
  },
  {
    country: 'Australia',
    state: 'Victoria',
    city: 'Melbourne',
    scope: 'Tree',
    info: 'https://data.melbourne.vic.gov.au/explore/dataset/trees-with-species-and-dimensions-urban-forest/information/',
    download: 'https://data.melbourne.vic.gov.au/api/explore/v2.1/catalog/datasets/trees-with-species-and-dimensions-urban-forest/exports/geojson',
    geometry: { x: 'Longitude', y: 'Latitude' },
    srs: 'EPSG:4326',
    crosswalk: {
      ref: 'CoM ID',
      common: 'Common Name',
      scientific: 'Scientific Name',
      dbh: 'Diameter Breast Height',
      planted: x => helpers.reformatDatetime(
      x['Date Planted'],
      [/(?<day>[0-9]{2})\/(?<month>[0-9]{2})\/(?<year>[0-9]{4})/]),
      maturity: 'Age Description',
      ule_range: x => x['Useful Life Expectency'].replace(/\s*\(.*\)$/, ''),
      location: 'Located In'
    },
    license: { id: 'CC-BY-4.0' },
    opentrees_id: 'melbourne'
  },
  {
    country: 'Australia',
    state: 'Victoria',
    city: 'Mildura',
    scope: 'Tree: notable',
    info: 'https://data.gov.au/data/dataset/significant-trees',
    download: 'https://data.gov.au/geoserver/significant-trees/wfs?service=WFS&version=2.0.0&request=GetFeature&typeNames=significant-trees:SignificantTrees18&srsName=EPSG:4326&outputFormat=application/json',
    license: { id: 'CC-BY-3.0-AU' }
  },
  {
    country: 'Australia',
    state: 'Victoria',
    city: 'Northern Grampians Shire',
    scope: 'Tree: street',
    info: 'https://data.gov.au/data/dataset/ngsc-street-trees',
    download: 'https://data.gov.au/data/dataset/b69adefd-5b17-47ec-8d81-1b779b6a8b22/resource/628c3532-cc9b-4e42-b171-35fe8a8bd88a/download/streettrees.geojson',
    license: { id: 'CC-BY-2.5-AU' }
  },
  {
    country: 'Australia',
    state: 'Victoria',
    city: 'Port Phillip',
    scope: 'Tree',
    info: 'https://data.gov.au/data/dataset/city-of-port-phillip-trees',
    download: 'https://data.gov.au/data/dataset/6b72d22b-d824-4281-bd08-ab62e3c38415/resource/9b0d7d55-5267-464b-85d7-3d141d779bab/download/city-of-port-phillip-trees.geojson',
    crosswalk: {
      scientific: 'species',
      common: 'common',
      species: 'species',
      genus: 'genus',
      description: 'description',
      dbh: 'dbh',
      crown: 'crown',
      height: 'height',
      maturity: 'maturity',
      health: 'health',
      structure: 'structure',
      location: 'location',
      ref: 'ref',
      planted: 'planted',
      updated: 'updated',
      ule: 'ule',
      ule_min: 'ule_min',
      ule_max: 'ule_max'
    },
    license: { id: 'CC-BY-2.5-AU' },
    opentrees_id: 'port_phillip'
  },
  {
    country: 'Australia',
    state: 'Victoria',
    city: 'Southern Grampians',
    scope: 'Tree',
    info: 'https://data.gov.au/data/dataset/southern-grampians-street-and-park-trees',
    download: 'https://data.gov.au/geoserver/southern-grampians-street-and-park-trees/wfs?service=WFS&version=2.0.0&request=GetFeature&typeNames=southern-grampians-street-and-park-trees:Southern_Grampians_Street_and_Park_Trees49&srsName=EPSG:4326&outputFormat=application/json',
    crosswalk: {
      ref: 'ref',
      scientific: 'species',
      common: 'common',
      location: 'location',
      height: 'height',
      crown: 'crown',
      maturity: 'maturity'
    },
    license: { id: 'CC-BY-3.0-AU' },
    opentrees_id: 'southern_grampians'
  },
  {
    country: 'Australia',
    state: 'Victoria',
    city: 'Strathbogie Shire',
    scope: 'Tree',
    info: 'https://data.gov.au/data/dataset/strathbogie-shire-street-and-park-trees',
    download: 'https://data.gov.au/data/dataset/a1ecaa16-bb0c-49b8-a541-0159bcb14706/resource/0e6832fb-8979-44af-a0ae-5bbc0fa0d246/download/ssc_street_and_park_trees_epsg4326_point.geojson',
    license: { id: 'CC-BY-4.0' }
  },
  {
    country: 'Australia',
    state: 'Victoria',
    city: 'Wodonga',
    scope: 'Tree',
    info: 'https://data.gov.au/data/dataset/tree-city-of-wodonga',
    download: 'https://data.gov.au/data/dataset/e7d6ebd3-04a8-4d73-b8ba-a9b82aa79b16/resource/180ba7ad-7bd7-490b-81f8-79c74ec0a915/download/tree.csv',
    geometry: { x: 'field_5', y: 'field_6' },
    srs: 'EPSG:4326',
    crosswalk: { ref: 'field_1', scientific: 'field_2', common: 'field_3' },
    license: { id: 'CC-BY-3.0-AU' },
    opentrees_id: 'wodonga'
  },
  {
    country: 'Australia',
    state: 'Victoria',
    city: 'Yarra',
    scope: 'Tree: notable',
    info: 'https://data.gov.au/data/dataset/yarra-significant-trees',
    download: 'https://data.gov.au/data/dataset/4b950f69-8816-45a7-8788-951d788287bd/resource/b15b4b1c-969f-4c8c-bb32-be57554eeb79/download/yarra-significant-trees.geojson',
    license: { id: 'CC-BY-4.0' },
    opentrees_id: 'yarra'
  },
  {
    country: 'Australia',
    state: 'Victoria',
    city: 'Yarra',
    scope: 'Tree',
    info: 'https://data.gov.au/data/dataset/yarra-street-park-trees',
    download: 'https://data.gov.au/data/dataset/f3c88ce7-504b-4ef7-907f-686037f7420c/resource/6e4186b0-3e00-48f9-a09c-cb60d1d0d49f/download/yarra-street-and-park-trees.geojson',
    crosswalk: {
      scientific: 'scientific',
      common: 'common',
      species: x => (x.species || '').replace(/^[A-Z]\. /, ''),
      genus: 'genus',
      description: 'description',
      dbh: 'dbh',
      crown: 'crown',
      height: 'height',
      maturity: 'maturity',
      health: 'health',
      structure: 'structure',
      location: 'location',
      ref: 'ref',
      planted: 'planted',
      updated: 'updated',
      ule: 'ule',
      ule_min: 'ule_min',
      ule_max: 'ule_max'
    },
    license: { id: 'CC-BY-4.0' },
    opentrees_id: 'yarra'
  },
  {
    country: 'Australia',
    state: 'Western Australia',
    city: 'Albany',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=68fe20abaf904d9ca8b3a93988a6357b',
    download: {
      arcgis: 'https://services6.arcgis.com/qG6LEFhXeMyvh3U3/arcgis/rest/services/Tree_Inventory_WFL1/FeatureServer/0'
    }
  },
  {
    country: 'Australia',
    state: 'Western Australia',
    city: 'Perth',
    scope: 'Tree',
    info: 'https://geohub-perth.opendata.arcgis.com/datasets/perth::trees-in-the-city-1/about',
    download: {
      arcgis: 'https://services7.arcgis.com/v8XBa2naYNQGOjlG/arcgis/rest/services/PKS_AST_TREESMASTER_PV/FeatureServer/0'
    },
    crosswalk: {
      scientific: 'BOTANICAL_',
      common: 'COMMON_NAM',
      family: 'FAMILY',
      height: 'TREE_HEIGH',
      planted: 'DATE_PLANT',
      ref: 'TREE_ID'
    },
    license: { id: 'CC-BY-4.0' },
    opentrees_id: 'perth'
  },
  {
    country: 'Australia',
    state: 'Western Australia',
    city: 'Wyndham',
    scope: 'Tree',
    info: 'https://data.gov.au/data/dataset/wyndham-city-council-trees',
    download: 'https://data.gov.au/data/dataset/87307c7b-b92c-48f1-841a-b5794dfb5322/resource/cab484b8-e297-4178-81d2-714135dec5d6/download/trees.zip',
    vfs: '/vsizip/',
    crosswalk: {
      ref: 'tree_id',
      common: 'tree_commo',
      height: 'height',
      crown: 'canopy_wid',
      dbh: 'diameter_breast_height',
      maturity: 'tree_age',
      health: 'health',
      ule: 'useful_life_expectancy',
      structure: 'structure'
    },
    license: { id: 'CC-BY-3.0-AU' },
    opentrees_id: 'wyndham'
  },
  {
    country: 'Australia',
    state: 'Western Australia',
    city: 'Wyndham',
    scope: 'Tree',
    info: 'https://data.gov.au/data/dataset/wyndham-tree-and-latest-inpection-data',
    download: 'https://data.gov.au/data/dataset/0254dee0-5b26-484f-a5ae-5ca3cab46601/resource/fb06e7c8-d037-489b-a963-b747271f2e54/download/trees.json',
    license: { id: 'CC-BY-2.5-AU' },
    opentrees_id: 'wyndham'
  },
  {
    country: 'Austria',
    state: 'Oberösterreich',
    city: 'Engerwitzdorf',
    scope: 'Tree',
    info: [
      'https://www.data.gv.at/katalog/dataset/baumkataster-der-gemeinde-engerwitzdorf',
      {file: 'https://www.data.gv.at/katalog/dataset/b40038b4-b4ca-45cf-b587-a063efff109f/resource/c7cdd771-3654-4f14-ab3d-27df980a4227/download/baumkataster-standorte-engerwitzdorf-2019.pdf'}
    ],
    download: 'https://www.data.gv.at/katalog/dataset/b40038b4-b4ca-45cf-b587-a063efff109f/resource/bed4f301-a8be-4262-98e2-bc3b94463679/download/baumkataster.rar',
    openFunc: async file => {
      const files = await helpers.readFilesInRarToVsimem(file)
      const selection = files.filter(x => x.endsWith('V_P.shp'))
      return helpers.openFileUnionWithGdal(selection)
    },
    license: { id: 'CC-BY-4.0' }
  },
  {
    country: 'Austria',
    state: 'Oberösterreich',
    city: 'Linz',
    scope: 'Tree',
    info: 'https://www.data.gv.at/katalog/dataset/f660cf3f-afa9-4816-aafb-0098a36ca57d',
    download: 'https://data.linz.gv.at/katalog/umwelt/baumkataster/Baumkataster.csv',
    geometry: { x: 'lon', y: 'lat' },
    srs: 'EPSG:4326',
    crosswalk: {
      ref: 'BaumNr',
      genus: 'Gattung',
      species: x => x.Art !== '0' ? x.Art : undefined,
      common: 'NameDeutsch',
      height: 'Hoehe',
      crown: 'Schirmdurchmesser',
      dbh: 'Stammumfang'
    },
    license: { id: 'CC-BY-4.0' },
    opentrees_id: 'linz'
  },
  {
    country: 'Austria',
    state: 'Steiermark',
    city: 'Graz',
    scope: 'Tree',
    info: 'https://data.graz.gv.at/daten/package/cb3fb7aa-4b79-41b1-aeb9-cd60d575fe92',
    download: {
      arcgis: 'https://geodaten.graz.at/arcgis/rest/services/OGD/OGD_WFS/MapServer/15'
    },
    license: { id: 'CC-BY-4.0' },
    terms: 'https://data.graz.gv.at/nutzungsbedingungen'
  },
  {
    country: 'Austria',
    state: 'Tirol',
    city: 'Innsbruck',
    scope: 'Tree',
    info: 'https://www.data.gv.at/katalog/dataset/df4cc7ae-ead7-49aa-bcb8-b018f169162d',
    download: 'https://www.data.gv.at/katalog/dataset/df4cc7ae-ead7-49aa-bcb8-b018f169162d/resource/47f9c7ac-13c7-4d68-ab6c-97ed58cd3a65/download/staedtischer_baumkataster.csv',
    geometry: { x: 'Lon', y: 'Lat' },
    srs: 'EPSG:4326',
    license: { id: 'CC-BY-4.0' }
  },
  {
    country: 'Austria',
    state: 'Wien',
    city: 'Wien',
    scope: 'Tree',
    notes: 'Download as CSV to allow download in single transaction',
    info: 'https://www.data.gv.at/katalog/dataset/c91a4635-8b7d-43fe-9b27-d95dec8392a7',
    download: 'https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:BAUMKATOGD&srsName=EPSG:4326&outputFormat=csv',
    geometry: { wkt: 'SHAPE' },
    srs: 'EPSG:4326',
    crosswalk: {
      ref: 'BAUM_ID',
      dbh: x => x.STAMMUNGFANG / 3.14159 * 2,
      height: 'BAUMHOEHE',
      scientific: 'GATTUNG_ART',
      crown: 'KRONENDURCHMESSER'
    },
    license: { id: 'CC-BY-4.0' },
    opentrees_id: 'vienna'
  },
  {
    country: 'Belgium',
    state: 'Antwerp',
    city: 'Mechelen',
    scope: 'Tree',
    info: 'https://hub.arcgis.com/datasets/Mechelen::bomen2/about',
    download: {
      arcgis: 'https://services9.arcgis.com/NQi6fFGrJ3ThImfU/arcgis/rest/services/Bomen2/FeatureServer/0'
    }
  },
  {
    country: 'Belgium',
    state: 'Bruxelles',
    scope: 'Tree: street',
    info: 'https://data.mobility.brussels/fr/info/trees/',
    download: 'https://data.mobility.brussels/geoserver/bm_public_space/wfs?service=WFS&version=2.0.0&request=GetFeature&typeNames=bm_public_space:trees&srsName=EPSG:4326&outputFormat=application/json',
    license: { id: 'CC0-1.0' }
  },
  {
    pending: 'address only',
    country: 'Belgium',
    state: 'Bruxelles',
    city: 'Bruxelles',
    scope: 'Tree: notable',
    notes: 'Subset of regional inventory',
    info: 'https://opendata.bruxelles.be/explore/dataset/bruxelles_arbres_remarquables/information/',
    download: 'https://opendata.bruxelles.be/api/explore/v2.1/catalog/datasets/bruxelles_arbres_remarquables/exports/csv?delimiter=,',
    license: { id: 'etalab-2.0' }
  },
  {
    country: 'Belgium',
    state: 'Bruxelles',
    city: 'Jette',
    scope: 'Tree',
    info: 'https://datastore.brussels/web/data/service/dbb199bc-fc34-4ebf-96e2-f6aad40cb1df',
    download: 'https://geoservices-others.irisnet.be/geoserver/UrbisAasArbre/ows?service=WFS&version=2.0.0&request=GetFeature&typeNames=UrbisAasArbre:arbres_jette_vue&srsName=EPSG:4326&outputFormat=application/json',
    license: { id: 'CC0-1.0' }
  },
  {
    country: 'Belgium',
    state: 'Limburg',
    city: 'Venray',
    scope: 'Tree: notable',
    info: 'https://hub.arcgis.com/datasets/c7d1269ddfe343088c68f52e3478bae1_0/about',
    download: {
      arcgis: 'https://services6.arcgis.com/av36q4cfx52r5s7V/arcgis/rest/services/Monumentale_bomen_Open_Data/FeatureServer/0'
    }
  },
  {
    country: 'Belgium',
    state: 'Vlaams Gewest',
    city: 'Agentschap Wegen en Verkeer',
    scope: 'Tree',
    info: 'https://www.vlaanderen.be/datavindplaats/catalogus/bomen-langs-de-genummerde-wegen-in-beheer-van-awv',
    download: 'https://opendata.apps.mow.vlaanderen.be/opendata-geoserver/awv/wfs?service=WFS&version=2.0.0&request=GetFeature&typeNames=awv:Bomen&srsName=EPSG:4326&outputFormat=application/json'
  },
  {
    country: 'Belgium',
    state: 'Vlaams Gewest',
    city: 'Antwerpen',
    scope: 'Tree',
    info: 'https://portaal-stadantwerpen.opendata.arcgis.com/datasets/boom/about',
    download: {
      arcgis: 'https://geodata.antwerpen.be/arcgissql/rest/services/P_Portal/portal_publiek6/MapServer/676'
    },
    crosswalk: { scientific: 'LATBOOMSOO', dbh: 'STAMOMTREK', ref: 'ANTW_ID' },
    opentrees_id: 'antwerpen_be'
  },
  {
    country: 'Belgium',
    state: 'Vlaams Gewest',
    city: 'Gent',
    scope: 'Tree',
    info: 'https://data.stad.gent/explore/dataset/locaties-bomen-gent/information/',
    download: 'https://data.stad.gent/api/explore/v2.1/catalog/datasets/locaties-bomen-gent/exports/geojson',
    srs: 'EPSG:3857',
    license: {
      name: 'Modellicentie Gratis Hergebruik 1.0',
      url: 'https://www.vlaanderen.be/digitaal-vlaanderen/onze-oplossingen/open-data/voorwaarden-voor-het-hergebruik-van-overheidsinformatie/modellicentie-gratis-hergebruik'
    },
    opentrees_id: 'gent_be'
  },
  {
    country: 'Belgium',
    state: 'Wallonie',
    scope: 'Tree: notable',
    notes: 'Manual download using QGIS | Failed to download features so read the layer using QGIS and exported it to a CSV file with coordinates in columns x and y',
    info: 'http://geoportail.wallonie.be/catalogue/d594f5a3-34ac-4cc2-a357-aae5d5263f35.html',
    download: {
      manual: 'https://geoservices.wallonie.be/arcgis/rest/services/FAUNE_FLORE/AHREM/MapServer/0'
    },
    driver: 'CSV',
    geometry: { x: 'x', y: 'y' },
    srs: 'EPSG:31370'
  },
  {
    country: 'Belgium',
    state: 'Wallonie',
    city: 'Liège',
    scope: 'Tree',
    info: 'https://www.odwb.be/explore/dataset/arbustum/information/',
    download: 'https://www.odwb.be/api/explore/v2.1/catalog/datasets/arbustum/exports/geojson',
    license: { id: 'CC-BY-4.0' },
    opentrees_id: 'wallonie_bruxelles_be'
  },
  {
    omit: 'superseded',
    country: 'Brazil',
    state: 'Minas Gerais',
    city: 'Governador Valadares',
    scope: 'Tree',
    info: [
      'https://github.com/Playzinho/osm_projects/blob/c952ec6e35a1144e7c5540e3eebb289859c91330/Brazil%20Data/MG/Prefeitura%20de%20Governador%20Valadares/Original%20Files/trees.zip',
      {file: 'https://github.com/Playzinho/osm_projects/raw/c952ec6e35a1144e7c5540e3eebb289859c91330/Brazil%20Data/MG/Prefeitura%20de%20Governador%20Valadares/BR-MG-GovernadorValadares-license-2020-11-20.pdf'}
    ],
    download: 'https://github.com/Playzinho/osm_projects/raw/c952ec6e35a1144e7c5540e3eebb289859c91330/Brazil%20Data/MG/Prefeitura%20de%20Governador%20Valadares/Original%20Files/trees.zip',
    vfs: '/vsizip/',
    driver: 'ESRI Shapefile',
    license: { id: 'CC0-1.0' }
  },
  {
    country: 'Brazil',
    state: 'Minas Gerais',
    city: 'Governador Valadares',
    scope: 'Tree',
    info: {file: 'https://github.com/Playzinho/osm_projects/raw/c952ec6e35a1144e7c5540e3eebb289859c91330/Brazil%20Data/MG/Prefeitura%20de%20Governador%20Valadares/BR-MG-GovernadorValadares-license-2020-11-20.pdf'},
    download: 'http://intranet.valadares.mg.gov.br:85/geoserver/gm_governador_valadares/ows?service=WFS&version=2.0.0&request=GetFeature&typeNames=gm_governador_valadares:st_vegetacao&srsName=EPSG:4326&outputFormat=application/json',
    license: { id: 'CC0-1.0' }
  },
  {
    country: 'Brazil',
    state: 'Rio de Janeiro',
    city: 'Niterói',
    scope: 'Tree',
    info: 'https://www.sigeo.niteroi.rj.gov.br/datasets/cadastro-de-%C3%A1rvores-arb%C3%B3ribus-1/about',
    download: {
      arcgis: 'https://geo.niteroi.rj.gov.br/arcgisesri/rest/services/civitas/Dadosabertos_TUR_NITT_SECON_SEDEN/MapServer/25'
    }
  },
  {
    country: 'Brazil',
    state: 'Santa Catarina',
    city: 'Itajaí',
    scope: 'Tree',
    info: 'https://github.com/Playzinho/osm_projects/blob/7ceac479ec489aa5727e65dbe4faaf80ee4dc1f3/Brazil%20Data/SC/Prefeitura%20de%20Itaja%C3%AD/Original%20Files/trees.gpkg',
    download: 'https://github.com/Playzinho/osm_projects/raw/7ceac479ec489aa5727e65dbe4faaf80ee4dc1f3/Brazil%20Data/SC/Prefeitura%20de%20Itaja%C3%AD/Original%20Files/trees.gpkg'
  },
  {
    country: 'Brazil',
    state: 'Santa Catarina',
    city: 'Xanxerê',
    scope: 'Tree',
    info: 'https://github.com/Playzinho/osm_projects/blob/e1a86a725808db946b14c1d77d6c8027ae9bbe33/Brazil%20Data/SC/Prefeitura%20de%20Xanxere/Original%20Files/trees.zip',
    download: 'https://github.com/Playzinho/osm_projects/raw/e1a86a725808db946b14c1d77d6c8027ae9bbe33/Brazil%20Data/SC/Prefeitura%20de%20Xanxere/Original%20Files/trees.zip',
    vfs: '/vsizip/'
  },
  {
    country: 'Brazil',
    state: 'São Paulo',
    city: 'Campinas',
    designation: 'Universidade Estadual de Campinas',
    scope: 'Tree',
    info: 'https://services5.arcgis.com/dFCi4j751Fk5jtHP/ArcGIS/rest/services/%c3%81rvores/FeatureServer',
    download: {
      arcgis: 'https://services5.arcgis.com/dFCi4j751Fk5jtHP/ArcGIS/rest/services/%c3%81rvores/FeatureServer/0'
    }
  },
  {
    country: 'Canada',
    state: 'Alberta',
    designation: 'Strathcona County',
    scope: 'Tree',
    info: 'https://opendata-strathconacounty.hub.arcgis.com/datasets/StrathconaCounty::trees/about',
    download: 'https://services.arcgis.com/B7ZrK1Hv4P1dsm9R/arcgis/rest/services/Trees1/FeatureServer/0',
    crosswalk: {
      ref: 'SiteID',
      common: 'Species',
      dbh_cm: 'Diam_cm',
      height_ft: 'Height_ft'
    },
    license: {
      name: 'Open Government License – Strathcona County 1.0',
      url: 'https://opendata-strathconacounty.hub.arcgis.com/pages/licence'
    },
    opentrees_id: 'strathcona'
  },
  {
    country: 'Canada',
    state: 'Alberta',
    city: 'Beaumont',
    info: 'https://www.arcgis.com/home/item.html?id=d9f4e37abe484234adfdff9631877374',
    download: {
      arcgis: 'https://services.arcgis.com/bXIYJft7hzGvJuKH/arcgis/rest/services/TreeInv_Points_Public_View/FeatureServer/4'
    }
  },
  {
    country: 'Canada',
    state: 'Alberta',
    city: 'Chestermere',
    scope: 'Tree',
    info: 'http://data-chestermere.opendata.arcgis.com/datasets/trees/about',
    download: {
      arcgis: 'https://gis.chestermere.ca/serversite/rest/services/Trees_Open/FeatureServer/0'
    },
    crosswalk: {
      common: 'Species',
      scientific: 'Species_Sc',
      planted: 'Date_Plant',
      height: 'Height__me',
      health: 'Condition'
    },
    opentrees_id: 'chestermere'
  },
  {
    country: 'Canada',
    state: 'Alberta',
    city: 'Edmonton',
    scope: 'Tree',
    notes: 'GeoJSON export yields a broken file',
    info: 'https://data.edmonton.ca/Environmental-Services/Trees/eecg-fc54',
    download: 'https://data.edmonton.ca/api/views/eecg-fc54/rows.csv',
    driver: 'CSV',
    geometry: { x: 'LONGITUDE', y: 'LATITUDE' },
    srs: 'EPSG:4326',
    crosswalk: {
      dbh: 'DIAMETER_BREAST_HEIGHT',
      scientific: 'SPECIES_BOTANICAL',
      common: 'SPECIES_COMMON',
      health: 'CONDITION_PERCENT',
      planted: 'PLANTED_DATE',
      location: 'LOCATION_TYPE',
      ref: 'id'
    },
    license: {
      name: 'Open Government Licence – Edmonton 1.0',
      url: 'https://data.edmonton.ca/stories/s/City-of-Edmonton-Open-Data-Terms-of-Use/msh8-if28/'
    },
    fallingfruit_id: 104,
    opentrees_id: 'edmonton'
  },
  {
    country: 'Canada',
    state: 'Alberta',
    city: 'Grand Praire',
    scope: 'Tree',
    notes: 'geofenced (US)',
    info: 'https://opendata-cityofgp.hub.arcgis.com/datasets/cityofgp::trees-3/about',
    download: {
      arcgis: 'https://services.gpgis.com/server/rest/services/Open_Data/Trees/MapServer/0'
    },
    license: {
      name: 'Open Government License – City of Grande Prairie 1.0',
      url: 'https://www.arcgis.com/home/item.html?id=5710daaf9f674a9784df26dccd664c8f'
    }
  },
  {
    country: 'Canada',
    state: 'Alberta',
    city: 'Lethbridge',
    scope: 'Tree',
    info: 'https://opendata.lethbridge.ca/datasets/82841132047d47659508f60c52f6346a_0/about',
    download: {
      arcgis: 'https://gis.lethbridge.ca/lethwebgisarcgis/rest/services/OpenData/odl_trees/MapServer/0'
    },
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
      name: 'Open Data License – City of Lethbridge 1.0',
      url: 'https://opendata.lethbridge.ca/pages/open-data-license'
    },
    opentrees_id: 'lethbridge_ca'
  },
  {
    country: 'Canada',
    state: 'British Columbia',
    city: 'Burnaby',
    info: 'https://www.arcgis.com/home/item.html?id=2606c3de98244cba8f0debe09248af2c',
    download: {
      arcgis: 'https://services5.arcgis.com/Q4JfC7BraThG8umv/arcgis/rest/services/FORM_BBY_StreetTree_City/FeatureServer/0'
    }
  },
  {
    country: 'Canada',
    state: 'British Columbia',
    city: 'Coquitlam',
    designation: 'Riverview',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=fb89536eebce4f7d820434aa0561ac4f',
    download: {
      arcgis: 'https://services5.arcgis.com/Q4JfC7BraThG8umv/arcgis/rest/services/FORM_Tree_Inventory_Riverview_TreeRanking_view/FeatureServer/0'
    }
  },
  {
    country: 'Canada',
    state: 'British Columbia',
    city: 'Kamloops',
    scope: 'Tree',
    info: 'https://mydata-kamloops.opendata.arcgis.com/datasets/kamloops::test-1/about',
    download: {
      arcgis: 'https://geoprodsvr.kamloops.ca/arcgis3/rest/services/OpenData/OpenDataHydroHypsoParks/MapServer/25'
    },
    crosswalk: {
      common: 'SPECIES',
      crown: 'SPREAD',
      planted: 'PLANTEDYEAR',
      ref: 'FACILITYID',
      edible: x => {
        if (x['EDIBLEFRUITTREEFLAG'] === 'Yes') return 'fruit'
        if (x['EDIBLENUTTREEFLAG'] === 'Yes') return 'nut'
        if (x['EDIBLEFRUITTREEFLAG'] === 'No' && x['EDIBLENUTTREEFLAG'] === 'No') return 'false'
      }
    },
    license: {
      name: 'Open Government Licence – Kamloops 1.0',
      url: 'https://www.kamloops.ca/open-data-catalogue-disclaimer'
    },
    opentrees_id: 'kamloops'
  },
  {
    country: 'Canada',
    state: 'British Columbia',
    city: 'Kelowna',
    scope: 'Tree',
    info: 'https://opendata.kelowna.ca/datasets/kelowna::tree-inventory/about',
    download: {
      arcgis: 'https://geo.kelowna.ca/arcgis/rest/services/OpenData/MapServer/114'
    },
    crosswalk: {
      genus: 'GENUS',
      species: 'species',
      common: 'species_co',
      dbh: 'DBH',
      ref: 'SITE_ID'
    },
    license: {
      name: 'Open Government Licence – City of Kelowna 2.0',
      url: {file: 'https://apps.kelowna.ca/images/opendata/opengovernmentlicence.pdf'}
    },
    opentrees_id: 'kelowna'
  },
  {
    country: 'Canada',
    state: 'British Columbia',
    city: 'Langley',
    scope: 'Tree',
    inactive: true,
    info: 'https://hub.arcgis.com/datasets/1971f19fc28c489b908eab199a5d2e72_85/about',
    download: 'https://opendata.arcgis.com/datasets/1971f19fc28c489b908eab199a5d2e72_85.geojson',
    api: 'arcgis-opendata',
    crosswalk: {
      ref: 'TreeID',
      updated: 'last_edited_date',
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
      location: 'TreeType',
      notable: x => ({
        'Heritage Tree': 'heritage',
        'Memorial Tree': 'memorial'
      })[x.TreeType]
    },
    opentrees_id: 'langley'
  },
  {
    country: 'Canada',
    state: 'British Columbia',
    city: 'Maple Ridge',
    scope: 'Tree',
    info: 'https://opengov.mapleridge.ca/datasets/mapleridge::street-tree/about',
    download: {
      arcgis: 'https://geoservices.mapleridge.ca/server/rest/services/DataCatalog/Environment/MapServer/5'
    },
    crosswalk: {
      common: 'CommonName',
      infraspecies: 'Variety',
      genus: 'Genus',
      species: 'Species'
    },
    license: {
      name: 'Open Government Licence – Maple Ridge 2.0',
      url: 'https://opengov.mapleridge.ca/pages/open-government-licence'
    },
    opentrees_id: 'maple_ridge'
  },
  {
    country: 'Canada',
    state: 'British Columbia',
    city: 'New Westminster',
    scope: 'Tree',
    info: 'https://opendata.newwestcity.ca/datasets/newwestcity::tree-inventory/about',
    download: {
      arcgis: 'https://services3.arcgis.com/A7O8YnTNtzRPIn7T/arcgis/rest/services/Tree_Inventory_(PROD)_4_view/FeatureServer/0'
    },
    crosswalk: {
      scientific: 'Scientific',
      common: 'Common_Nam',
      cultivar: 'Cultivar'
    },
    license: {
      name: 'Open Government Licence – New Westminster 1.0',
      url: 'https://data-60320-newwestcity.opendata.arcgis.com/pages/terms-of-use'
    },
    opentrees_id: 'new_west_west'
  },
  {
    country: 'Canada',
    state: 'British Columbia',
    city: 'North Vancouver',
    scope: 'Tree',
    notes: 'OpenTrees used shapefile, which has truncated column names',
    info: 'http://geoweb.dnv.org/data/metadata.php?dataset=EnvStreetTree',
    download: 'https://geoweb.dnv.org/Products/Data/FGDB/EnvStreetTree_fgdb.zip',
    vfs: '/vsizip/',
    filename: 'EnvStreetTree.gdb',
    crosswalk: {
      common: 'COMMONNAME',
      genus: 'GENUS',
      species: 'SPECIES',
      dbh: 'DBH_CM',
      height: 'HEIGHT_M',
      health: 'CONDITION',
      ref: 'TAGNUMBER',
      location: 'AM_TYPE_RE'
    },
    license: {
      name: 'Open Government Licence - District of North Vancouver 2.0'
    },
    opentrees_id: 'north_vancouver'
  },
  {
    country: 'Canada',
    state: 'British Columbia',
    city: 'Oak Bay',
    designation: 'University of Victoria',
    scope: 'Tree',
    inactive: true,
    notes: 'Outside of ring road',
    download: { checksum: '0fdb6e6aa47b12c56d5c8ef4587efc67' },
    vfs: '/vsizip/'
  },
  {
    country: 'Canada',
    state: 'British Columbia',
    city: 'Oak Bay',
    designation: 'University of Victoria',
    scope: 'Tree',
    inactive: true,
    notes: 'Within ring road',
    info: { checksum: 'a9ad2f9e226c81afd19e45dbfe115947' },
    download: { checksum: '43523e231ff826b5d924630e9a7f2c4c' },
    vfs: '/vsizip/'
  },
  {
    country: 'Canada',
    state: 'British Columbia',
    city: 'Penticton',
    scope: 'Tree',
    info: 'https://open.penticton.ca/datasets/e0905b0677bf4b468b57fb52d2d725db_1355/about',
    download: {
      arcgis: 'https://gis.penticton.ca/external/rest/services/prd/Parks/MapServer/1355'
    },
    license: {
      name: 'Open Government Licence – City of Penticton 2.0',
      url: {file: 'https://www.penticton.ca/sites/default/files/docs/our-community/maps-gis/2020-07-02-PDF-Open%20Data%20Government%20Licence.pdf'}
    }
  },
  {
    country: 'Canada',
    state: 'British Columbia',
    city: 'Prince George',
    scope: 'Tree',
    info: 'https://data-cityofpg.opendata.arcgis.com/datasets/trees/about',
    download: {
      arcgis: 'https://services2.arcgis.com/CnkB6jCzAsyli34z/arcgis/rest/services/OpenData_Parks/FeatureServer/3'
    },
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
    },
    license: {
      name: 'Open Government License – City of Prince George 2.0',
      url: {file: 'https://pgmapinfo.princegeorge.ca/opendata/CityofPrinceGeorge_Open_Government_License_Open_Data.pdf'}
    },
    opentrees_id: 'prince_george'
  },
  {
    country: 'Canada',
    state: 'British Columbia',
    city: 'Surrey',
    scope: 'Tree',
    info: 'http://data.surrey.ca/dataset/park-specimen-trees',
    download: {
      arcgis: 'https://gisservices.surrey.ca/arcgis/rest/services/OpenData/MapServer/257'
    },
    crosswalk: {
      genus: 'TREE_GENUS',
      species: 'TREE_SPECIES',
      cultivar: 'TREE_VARIETY',
      ule: 'YRS_LIFE_EXPECTANCY'
    },
    license: {
      name: 'Open Government Licence – Surrey 1.0',
      url: 'https://data.surrey.ca/pages/open-government-licence-surrey'
    },
    opentrees_id: 'surrey'
  },
  {
    country: 'Canada',
    state: 'British Columbia',
    city: 'Vancouver',
    designation: 'Musqueam',
    info: 'https://www.arcgis.com/home/item.html?id=9da6c58c19574370a5164f82817ad824',
    download: {
      arcgis: 'https://services2.arcgis.com/NlsizNmbMFiinWw4/arcgis/rest/services/FORSITE_Data_Web_Map_WFL1/FeatureServer/1'
    }
  },
  {
    country: 'Canada',
    state: 'British Columbia',
    city: 'Vancouver',
    designation: 'University of British Columbia',
    info: 'https://www.arcgis.com/home/item.html?id=9da6c58c19574370a5164f82817ad824',
    download: {
      arcgis: 'https://services2.arcgis.com/NlsizNmbMFiinWw4/arcgis/rest/services/FORSITE_Data_Web_Map_WFL1/FeatureServer/0'
    }
  },
  {
    country: 'Canada',
    state: 'British Columbia',
    city: 'Vancouver',
    scope: 'Tree',
    info: 'https://opendata.vancouver.ca/explore/dataset/street-trees/information/',
    download: 'https://opendata.vancouver.ca/api/explore/v2.1/catalog/datasets/street-trees/exports/geojson',
    crosswalk: {
      ref: 'tree_id',
      genus: 'genus_name',
      species: 'species_name',
      cultivar: 'cultivar_name',
      common: 'common_name',
      height: 'height_range_id',
      dbh: x => Number(x.diameter) * 2.54,
      planted: 'date_planted'
    },
    license: {
      name: 'Open Government Licence – Vancouver 1.0',
      url: 'https://opendata.vancouver.ca/pages/licence/'
    },
    fallingfruit_id: 102,
    opentrees_id: 'vancouver'
  },
  {
    country: 'Canada',
    state: 'British Columbia',
    city: 'Victoria',
    scope: 'Tree',
    info: 'https://opendata.victoria.ca/datasets/VicMap::tree-species/about',
    download: {
      arcgis: 'https://maps.victoria.ca/server/rest/services/OpenData/OpenData_Parks/MapServer/15'
    },
    crosswalk: {
      scientific: 'Species',
      dbh: 'DiameterAt',
      height: 'Height',
      age: 'PlantingDa',
      planted: 'YearPlante',
      updated: 'InventoryD'
    },
    license: {
      name: 'Open Government Licence – City of Victoria 1.0',
      url: 'http://opendata.victoria.ca/pages/open-data-licence'
    },
    opentrees_id: 'victoria_bc'
  },
  {
    country: 'Canada',
    state: 'British Columbia',
    city: 'White Rock',
    inactive: true,
    info: 'http://data.whiterockcity.ca/dataset/tree',
    download: 'http://wroms.whiterockcity.ca/opendata/GIS/Data/Spatial/Parks/SHP/Tree.zip',
    vfs: '/vsizip/',
    filename: 'Open_data/GIS/Data/Spatial/Parks/SHP/Tree.shp',
    crosswalk: { scientific: 'SpeciesNam', ref: 'Tree_ID' },
    opentrees_id: 'white_rock'
  },
  {
    country: 'Canada',
    state: 'Manitoba',
    city: 'Brandon',
    scope: 'Tree',
    info: 'https://hub.arcgis.com/datasets/29d80f08f64d4ef9a6692b48d84627df_0/about',
    download: {
      arcgis: 'https://services3.arcgis.com/JtdxzXM6C8Uto0D2/arcgis/rest/services/TreeInventory/FeatureServer/0'
    }
  },
  {
    country: 'Canada',
    state: 'Manitoba',
    city: 'Winnipeg',
    designation: 'University of Manitoba',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=d475e8feb6f540858fcff9ca83e056d7',
    download: {
      arcgis: 'https://services7.arcgis.com/qkMZANJ0iIMLiVSJ/arcgis/rest/services/2023_Tree_Inventory__PUBLIC_Database_September_Unfinished/FeatureServer/0'
    }
  },
  {
    country: 'Canada',
    state: 'Manitoba',
    city: 'Winnipeg',
    scope: 'Tree',
    notes: 'GeoJSON export yields a broken file',
    info: 'https://data.winnipeg.ca/Parks/Tree-Inventory/hfwk-jp4h',
    download: 'https://data.winnipeg.ca/api/views/hfwk-jp4h/rows.csv',
    driver: 'CSV',
    geometry: { wkt: 'Point' },
    srs: 'EPSG:4326',
    crosswalk: {
      ref: 'tree_id',
      scientific: 'botanical',
      common: 'common',
      dbh: 'dbh'
    },
    license: {
      name: 'Open Government Licence – Winnipeg 1.0',
      url: 'https://data.winnipeg.ca/open-data-licence'
    },
    opentrees_id: 'winnipeg'
  },
  {
    country: 'Canada',
    state: 'New Brunswick',
    city: 'Fredericton',
    designation: 'University of New Brunswick',
    info: 'https://www.arcgis.com/home/item.html?id=9af723fa32d246d8a36bcbb70d8daad2',
    download: {
      arcgis: 'https://services1.arcgis.com/56dETZIzFXStwLka/arcgis/rest/services/Trees_of_UNB_Campus_WFL1/FeatureServer/0'
    }
  },
  {
    country: 'Canada',
    state: 'New Brunswick',
    city: 'Fredericton',
    scope: 'Tree',
    info: 'https://data-fredericton.opendata.arcgis.com/datasets/Fredericton::tree-inventory-for-public-use/about',
    download: {
      arcgis: 'https://services2.arcgis.com/iLWAxhpxafhOza2U/arcgis/rest/services/Fredericton__FREDERICTON_SCHIFKEE__TreeInventory/FeatureServer/1'
    }
  },
  {
    country: 'Canada',
    state: 'New Brunswick',
    city: 'Moncton',
    scope: 'Tree',
    info: 'https://open.moncton.ca/datasets/moncton::trees/about',
    download: {
      arcgis: 'https://services1.arcgis.com/E26PuSoie2Y7bbyI/arcgis/rest/services/Trees/FeatureServer/0'
    },
    srs: 'EPSG:2953',
    crosswalk: {
      common: 'BOTNAME',
      dbh: 'DIAM',
      height: 'HT',
      updated: 'edited_date'
    },
    license: {
      name: 'Moncton Open Data Terms of Use',
      url: {file: 'https://www5.moncton.ca/docs/Open_Data_Terms_of_Use.pdf'}
    },
    opentrees_id: 'moncton'
  },
  {
    country: 'Canada',
    state: 'New Brunswick',
    city: 'Saint John',
    scope: 'Tree',
    info: 'https://catalogue-saintjohn.opendata.arcgis.com/datasets/SaintJohn::urban-forestry-trees/about',
    download: {
      arcgis: 'https://services.arcgis.com/DLk7hgTJeJILuEBg/arcgis/rest/services/Urban_Forestry_Trees/FeatureServer/0'
    },
    license: {
      name: 'Open Government Licence – City of Saint John 1.0',
      url: 'https://catalogue-saintjohn.opendata.arcgis.com/datasets/SaintJohn::urban-forestry-trees/about'
    }
  },
  {
    country: 'Canada',
    state: 'New Brunswick',
    city: 'Woodstock',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=afd84d53590d4276bbbccd980c386515',
    download: {
      arcgis: 'https://services1.arcgis.com/56dETZIzFXStwLka/arcgis/rest/services/survey123_fecbea9fdbf14a56a3aa229f815555ec_stakeholder/FeatureServer/0'
    }
  },
  {
    country: 'Canada',
    state: 'Nova Scotia',
    city: 'Halifax',
    scope: 'Tree',
    info: 'https://catalogue-hrm.opendata.arcgis.com/datasets/33a4e9b6c7e9439abcd2b20ac50c5a4d_0/about',
    download: {
      arcgis: 'https://services2.arcgis.com/11XBiaBYA9Ep0yNJ/arcgis/rest/services/Public_Trees/FeatureServer/0'
    },
    license: {
      name: 'Open Government Licence – Halifax 1.0',
      url: 'https://data-hrm.hub.arcgis.com/pages/open-data-licence'
    }
  },
  {
    country: 'Canada',
    state: 'Ontario',
    designation: 'Waterloo Region District School Board',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=5fbde30896954305830ff57795ad7e4d',
    download: {
      arcgis: 'https://services1.arcgis.com/xKY66Gy3crN5ZX2F/arcgis/rest/services/Tree_Inventory_with_Pics/FeatureServer/0'
    }
  },
  {
    country: 'Canada',
    state: 'Ontario',
    designation: 'York Region',
    scope: 'Tree',
    info: 'https://insights-york.opendata.arcgis.com/datasets/street-trees/about',
    download: {
      arcgis: 'https://ww8.yorkmaps.ca/arcgis/rest/services/OpenData/Biodiversity/MapServer/0'
    },
    crosswalk: {
      ref: 'TREEID',
      scientific: 'SPECIES',
      common: 'COMMONNAME',
      planted: 'YEARPLANTE',
      dbh: 'CURRENTDBH',
      height: 'TREEHEIGHT',
      owner: 'OWNERSHIP'
    },
    license: {
      name: 'Open Data Licence – York Region 1.0',
      url: {file: 'https://www.arcgis.com/sharing/rest/content/items/78cc02388af248c0b7a30eda6adfade0/data'}
    },
    opentrees_id: 'york_ca'
  },
  {
    country: 'Canada',
    state: 'Ontario',
    city: 'Ajax',
    scope: 'Tree',
    info: 'https://opendata.ajax.ca/datasets/TownofAjax::town-trees/about',
    download: {
      arcgis: 'https://ajaxmaps.ajax.ca/gisernie/rest/services/Public/Ajax_Open_Data/MapServer/8'
    },
    delFunc: x => x.STATUS === 'REMOVED',
    crosswalk: {
      dbh: 'DBH',
      common: 'TYPE',
      updated: 'LAST_EDI_1',
      note: 'COMMENTS'
    },
    license: {
      name: 'Open Data License – Town of Ajax 2.0',
      url: {file: 'http://townofajax.maps.arcgis.com/sharing/rest/content/items/22e2d8e248724d7cb0310dc2db675abd/data'}
    },
    opentrees_id: 'ajax'
  },
  {
    country: 'Canada',
    state: 'Ontario',
    city: 'Barrie',
    scope: 'Tree',
    notes: 'geofenced (US)',
    info: 'https://opendata.barrie.ca/maps/tree/about',
    download: {
      arcgis: 'https://gispublic.barrie.ca/arcgis/rest/services/Open_Data/FacilitiesStreets/MapServer/37'
    },
    crosswalk: { ref: 'ASSETID', location: 'TREETYPE' },
    terms: '© Copyright City of Barrie, The City of Barrie does not warrant the accuracy, completeness, content, or currency of the information provided.',
    opentrees_id: 'barrie'
  },
  {
    country: 'Canada',
    state: 'Ontario',
    city: 'Burlington',
    scope: 'Tree',
    notes: 'geofenced (US)',
    info: 'https://navburl-burlington.opendata.arcgis.com/datasets/city-owned-trees/about',
    download: {
      arcgis: 'https://mapping.burlington.ca/arcgisweb/rest/services/COB/Urban_Forestry/MapServer/0'
    },
    license: {
      name: 'Terms of Use for Open Data Burlington 2011.09.19',
      url: {file: 'https://opendata.burlington.ca/opendata-terms-of-use/City%20of%20Burlington%20-%20Open%20Data%20Terms%20of%20Use.pdf'}
    }
  },
  {
    country: 'Canada',
    state: 'Ontario',
    city: 'Calgary',
    scope: 'Tree',
    info: 'https://data.calgary.ca/Environment/Public-Trees/tfs4-3wwa',
    download: 'https://data.calgary.ca/api/geospatial/tfs4-3wwa?method=export&format=geojson',
    crosswalk: {
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
    },
    license: {
      name: 'Open Government Licence – City of Calgary 2.1',
      url: 'https://data.calgary.ca/d/Open-Data-Terms/u45n-7awa'
    },
    opentrees_id: 'calgary'
  },
  {
    country: 'Canada',
    state: 'Ontario',
    city: 'Cambridge',
    scope: 'Tree',
    info: 'https://geohub.cambridge.ca/datasets/street-trees/about',
    download: {
      arcgis: 'https://maps.cambridge.ca/arcgispub03/rest/services/OpenData1/MapServer/7'
    },
    license: {
      name: 'Open Government Licence – City of Cambridge 2.0',
      url: {file: 'https://maps.cambridge.ca/images/opendata/Open%20data%20licence.pdf'}
    }
  },
  {
    country: 'Canada',
    state: 'Ontario',
    city: 'Centre Wellington',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=2475343bea5d4bdea0a937dea123c8db',
    download: {
      arcgis: 'https://services3.arcgis.com/3YI9BX0c4OLSriOZ/arcgis/rest/services/Tree_Inventory_2_view/FeatureServer/0'
    }
  },
  {
    country: 'Canada',
    state: 'Ontario',
    city: 'Georgina',
    info: 'https://www.arcgis.com/home/item.html?id=4e44559883034b07bb3194921d1ff39c',
    download: {
      arcgis: 'https://services7.arcgis.com/H9DyU85EnErZGhsY/arcgis/rest/services/Tree_Inventory_-_FL_-_File_1_view/FeatureServer/0'
    }
  },
  {
    country: 'Canada',
    state: 'Ontario',
    city: 'Guelph',
    designation: 'University of Guelph',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=76ca11a45db648f595ee3094d6b95d16',
    download: {
      arcgis: 'https://services9.arcgis.com/dzxx4ZRCVMc0u5ro/arcgis/rest/services/University_of_Guelph_Tree_Inventory_view/FeatureServer/0'
    }
  },
  {
    country: 'Canada',
    state: 'Ontario',
    city: 'Guelph',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=c6d45eb84f644550b6c29088361bdc07',
    download: {
      arcgis: 'https://services7.arcgis.com/AHJOWTX3sFcnmA9U/arcgis/rest/services/City_of_Guelph/FeatureServer/0'
    }
  },
  {
    country: 'Canada',
    state: 'Ontario',
    city: 'Kawartha Lakes',
    designation: 'Lindsay',
    scope: 'Tree',
    inactive: true,
    download: { checksum: 'fbd63927c5c75053fcd35e313010d340' },
    driver: 'CSV',
    geometry: { x: 'x', y: 'y' }
  },
  {
    country: 'Canada',
    state: 'Ontario',
    city: 'Kingston',
    scope: 'Tree',
    info: 'https://opendatakingston.cityofkingston.ca/explore/dataset/trees-municipal/information/',
    download: 'https://opendatakingston.cityofkingston.ca/api/explore/v2.1/catalog/datasets/trees-municipal/exports/geojson',
    license: {
      name: 'Open Data Licence – City of Kingston 1.0',
      url: {file: 'https://www.cityofkingston.ca/documents/10180/144997/CityofKingston_OpenDataLicense.pdf'}
    }
  },
  {
    country: 'Canada',
    state: 'Ontario',
    city: 'Kitchener',
    scope: 'Tree',
    info: 'https://open-kitchenergis.opendata.arcgis.com/datasets/e42a9601b87a4417b3d3d15a0f596f64_0/about',
    download: {
      arcgis: 'https://services1.arcgis.com/qAo1OsXi67t7XgmS/arcgis/rest/services/Tree_Inventory/FeatureServer/0'
    },
    crosswalk: {
      ref: 'TREEID',
      common: 'SPECIES_NA',
      scientific: 'SPECIES_LA',
      planted: 'YEAR_PLANT',
      updated: 'UPDATE_DAT',
      dbh: 'DBH',
      note: 'NOTES'
    },
    license: {
      name: 'Open Government Licence – City of Kitchener 1.0',
      url: 'https://www.kitchener.ca/en/council-and-city-administration/open-data-licence.aspx'
    },
    opentrees_id: 'kitchener_ca'
  },
  {
    country: 'Canada',
    state: 'Ontario',
    city: 'London',
    designation: 'Western University',
    info: 'https://www.arcgis.com/home/item.html?id=07f4772f1067428cb69651a0b64cf6de',
    download: {
      arcgis: 'https://services.arcgis.com/rGKxabTU9mcXMw7k/arcgis/rest/services/campus_tree_inventory_2018_View_Layer/FeatureServer/0'
    }
  },
  {
    country: 'Canada',
    state: 'Ontario',
    city: 'London',
    scope: 'Tree',
    inactive: true,
    info: { checksum: '2c4d7cc2d2afb8908e41a3ffcc80b854' },
    download: { checksum: '814e7f95e497097f989fe423c2eee293' },
    vfs: '/vsizip/'
  },
  {
    country: 'Canada',
    state: 'Ontario',
    city: 'London',
    download: {
      arcgis: 'https://services.arcgis.com/rGKxabTU9mcXMw7k/ArcGIS/rest/services/Tree_Inventory_Public_CityLondon/FeatureServer/0'
    }
  },
  {
    country: 'Canada',
    state: 'Ontario',
    city: 'Mississauga',
    scope: 'Tree',
    info: 'https://data.mississauga.ca/datasets/mississauga::2023-city-owned-tree-inventory/about',
    download: {
      arcgis: 'https://services6.arcgis.com/hM5ymMLbxIyWTjn2/arcgis/rest/services/2023_City_Owned_Tree_Inventory/FeatureServer/0'
    },
    crosswalk: {
      dbh: 'DIAM',
      planted: 'INSTDATE',
      common: 'CBOTDESC',
      updated: 'MODDTTM'
    },
    license: {
      name: 'City of Mississauga – Terms of Use ',
      url: {file: 'http://www5.mississauga.ca/research_catalogue/CityofMississauga_TermsofUse.pdf'}
    },
    opentrees_id: 'mississauga_ca'
  },
  {
    country: 'Canada',
    state: 'Ontario',
    city: 'Niagara Falls',
    scope: 'Tree',
    info: 'https://open.niagarafalls.ca/datasets/niagara-falls-trees-inventory/about',
    download: {
      arcgis: 'https://services9.arcgis.com/oMFQlUUrLd1Uh1bd/arcgis/rest/services/Niagara_Falls_Trees_Inventory/FeatureServer/0'
    },
    license: {
      name: 'Open Government Licence – Niagara Falls 1.0',
      url: 'https://open.niagarafalls.ca/pages/terms-of-use'
    }
  },
  {
    country: 'Canada',
    state: 'Ontario',
    city: 'Oakville',
    scope: 'Tree',
    info: 'https://portal-exploreoakville.opendata.arcgis.com/datasets/trees/about',
    download: 'https://opendata.arcgis.com/api/v3/datasets/64fabcdb4feb40139ad20d728bfef2d4_0/downloads/data?format=geojson&spatialRefId=4326&where=1%3D1',
    api: 'arcgis-opendata',
    crosswalk: {
      scientific: x => String(x.SPECIES).split(' - ')[1],
      common: x => String(x.SPECIES).split(' - ')[0],
      dbh: 'DBH',
      height: 'HEIGHT',
      crown: 'CROWN_WIDT'
    },
    terms: 'Internal Use Only',
    opentrees_id: 'oakville'
  },
  {
    country: 'Canada',
    state: 'Ontario',
    city: 'Ottowa',
    scope: 'Tree',
    info: 'https://open.ottawa.ca/datasets/ottawa::tree-inventory/about',
    download: {
      arcgis: 'https://maps.ottawa.ca/arcgis/rest/services/Forestry/MapServer/0'
    },
    crosswalk: { scientific: 'SPECIES', ref: 'SAP_ID' },
    license: {
      name: 'Open Government Licence – City of Ottawa 2.0',
      url: 'https://ottawa.ca/en/city-hall/open-transparent-and-accountable-government/open-data#section-7d58affa-59a3-47f2-932d-ccb75000cefc'
    },
    fallingfruit_id: 128,
    opentrees_id: 'ottawa'
  },
  {
    country: 'Canada',
    state: 'Ontario',
    city: 'Peterborough',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=15070a4a804644969019a08bdb4a7564',
    download: {
      arcgis: 'https://services1.arcgis.com/pMeXRvgWClLJZr3s/arcgis/rest/services/Street_Tree_Inventory/FeatureServer/0'
    }
  },
  {
    country: 'Canada',
    state: 'Ontario',
    city: 'Saint Catharines',
    scope: 'Tree',
    info: 'https://niagaraopendata.ca/dataset/st-catharines-trees',
    download: 'https://niagaraopendata.ca/dataset/06257b18-da24-424e-a609-48d6f3d4f018/resource/c549fce9-f032-48f9-9c0a-2adc9d1e0a40/download/trees.csv',
    geometry: { x: 'X_COORD', y: 'Y_COORD' },
    srs: 'EPSG:26917',
    crosswalk: {
      scientific: 'BOTANICAL',
      common: 'COMMON',
      dbh: 'DBH',
      stems: 'STEMS'
    },
    license: {
      name: 'Open Government Licence – City of St. Catharines 2.0',
      url: 'https://niagaraopendata.ca/pages/open-government-license-2-0-the-corporation-of-the-city-of-st-catharines'
    },
    opentrees_id: 'st_catharines_ca'
  },
  {
    country: 'Canada',
    state: 'Ontario',
    city: 'Toronto',
    designation: 'York University',
    scope: 'Tree',
    info: 'https://yorku.maps.arcgis.com/home/item.html?id=b86c7c68d1a440b8bc83d4962b5d61cc',
    download: {
      arcgis: 'https://services.arcgis.com/4TKcmj8FHh5Vtobt/arcgis/rest/services/KeeleTreeMap/FeatureServer/0'
    }
  },
  {
    country: 'Canada',
    state: 'Ontario',
    city: 'Toronto',
    scope: 'Tree',
    info: 'https://open.toronto.ca/dataset/street-tree-data',
    download: 'https://ckan0.cf.opendata.inter.prod-toronto.ca/dataset/6ac4569e-fd37-4cbc-ac63-db3624c5f6a2/resource/d6089672-bdf7-4857-8ea8-90da826fcfa1/download/Street%20Tree%20Data.geojson',
    crosswalk: {
      dbh: 'DBH_TRUNK',
      common: 'COMMON_NAM',
      scientific: 'BOTANICAL_'
    },
    license: {
      name: 'Open Government Licence – Toronto 1.0',
      url: 'https://open.toronto.ca/open-data-license/'
    },
    fallingfruit_id: 100,
    opentrees_id: 'toronto'
  },
  {
    country: 'Canada',
    state: 'Ontario',
    city: 'Waterloo',
    scope: 'Tree',
    info: 'http://data.waterloo.ca/datasets/street-tree-inventory/about',
    download: {
      arcgis: 'https://services.arcgis.com/ZpeBVw5o1kjit7LT/arcgis/rest/services/Street_Tree_Inventory/FeatureServer/0'
    },
    crosswalk: {
      common: 'COM_NAME',
      scientific: 'LATIN_NAME',
      location: 'TREE_TYPE',
      dbh: 'DBH_CM',
      ref: 'OBJECTID'
    },
    opentrees_id: 'waterloo'
  },
  {
    country: 'Canada',
    state: 'Ontario',
    city: 'Welland',
    scope: 'Tree',
    inactive: true,
    info: 'https://hub.arcgis.com/datasets/welland::welland-trees/about',
    download: 'https://opendata.arcgis.com/datasets/4357fb7835fe49b39197a9440b2e868b_0.zip',
    api: 'arcgis-opendata',
    vfs: '/vsizip/',
    crosswalk: {
      description: 'Genus',
      dbh: 'DiamDBH',
      planted: 'DatePlant',
      location: 'PlantArea'
    },
    opentrees_id: 'welland'
  },
  {
    country: 'Canada',
    state: 'Ontario',
    city: 'Whitby',
    scope: 'Tree',
    info: 'https://geohub-whitby.hub.arcgis.com/datasets/5be6efcf4f264639874bf07009f155d2_0/about',
    download: {
      arcgis: 'https://services5.arcgis.com/ATdLnvuMRJk8AGkQ/arcgis/rest/services/Trees/FeatureServer/0'
    },
    license: {
      name: 'Open Government License – Town of Whitby 1.0',
      url: {file: 'https://whitby.maps.arcgis.com/sharing/rest/content/items/223810efc31c40b3aff99dd74f809a97/data'}
    }
  },
  {
    country: 'Canada',
    state: 'Ontario',
    city: 'Windsor',
    scope: 'Tree: street',
    info: 'https://opendata.citywindsor.ca/details/238',
    download: {
      manual: 'https://opendata.citywindsor.ca/Uploads/Trees%20in%20Right%20of%20Way.csv'
    },
    geometry: { x: 'XCoord', y: 'YCoord' },
    srs: 'EPSG:4326'
  },
  {
    country: 'Canada',
    state: 'Ontario',
    city: 'Windsor',
    scope: 'Tree: park',
    info: 'https://opendata.citywindsor.ca/details/238',
    download: {
      manual: 'https://opendata.citywindsor.ca/Uploads/Trees%20in%20Parks_Facilities.csv'
    },
    geometry: { x: 'XCoord', y: 'YCoord' },
    srs: 'EPSG:4326'
  },
  {
    country: 'Canada',
    state: 'Québec',
    city: 'Longueuil',
    scope: 'Tree',
    info: 'https://geohub.longueuil.quebec/datasets/longueuil::arbres/about',
    download: {
      arcgis: 'https://services2.arcgis.com/h4XWvDXfYYyD6jNu/arcgis/rest/services/DO_Arbres/FeatureServer/0'
    },
    crosswalk: {
      scientific: x => String(x.Espece).split(' - ')[0],
      common: x => String(x.Espece).split(' - ')[1],
      dbh: 'DiamTronc'
    },
    license: { id: 'CC-BY-4.0' },
    opentrees_id: 'longueuil'
  },
  {
    country: 'Canada',
    state: 'Québec',
    city: 'Montréal',
    scope: 'Tree',
    notes: 'Overlaps Falling Fruit Import #89 (Ville Marie)',
    info: 'http://donnees.ville.montreal.qc.ca/dataset/arbres',
    download: 'https://donnees.montreal.ca/dataset/b89fd27d-4b49-461b-8e54-fa2b34a628c4/resource/64e28fe6-ef37-437a-972d-d1d3f1f7d891/download/arbres-publics.csv',
    geometry: { x: 'Longitude', y: 'Latitude' },
    srs: 'EPSG:4326',
    crosswalk: {
      scientific: 'Essence_latin',
      common: 'ESSENCE_ANG',
      dbh: 'DHP',
      updated: 'Date_releve',
      planted: 'Date_plantation',
      ref: 'EMP_NO'
    },
    license: { id: 'CC-BY-4.0' },
    opentrees_id: 'montreal'
  },
  {
    country: 'Canada',
    state: 'Québec',
    city: 'Québec',
    scope: 'Tree',
    info: 'https://www.donneesquebec.ca/recherche/fr/dataset/vque_26',
    download: 'https://www.donneesquebec.ca/recherche/dataset/34103a43-3712-4a29-92e1-039e9188e915/resource/de031174-cbdf-4d69-869c-21cca8036279/download/vdq-arbrerepertorie.geojson',
    crosswalk: {
      scientific: 'NOM_LATIN',
      common: 'NOM_FRANCAIS',
      dbh: 'DIAMETRE',
      planted: 'DATE_PLANTE',
      location: 'NOM_TOPOGRAPHIE'
    },
    license: { id: 'CC-BY-4.0' },
    fallingfruit_id: 433,
    opentrees_id: 'quebec'
  },
  {
    country: 'Canada',
    state: 'Québec',
    city: 'Québec',
    scope: 'Tree: notable',
    info: 'https://www.donneesquebec.ca/recherche/fr/dataset/vque_82',
    download: 'https://www.donneesquebec.ca/recherche/dataset/bc5afddf-9439-4e96-84fb-f91847b722be/resource/bbdca0dd-82df-42f9-845b-32348debf8ab/download/vdq-arbrepotentielremarquable.geojson',
    license: { id: 'CC-BY-4.0' },
    opentrees_id: 'quebec'
  },
  {
    country: 'Canada',
    state: 'Québec',
    city: 'Repentigny',
    scope: 'Tree',
    info: 'https://www.donneesquebec.ca/recherche/fr/dataset/vrep-arbres',
    download: 'https://www.donneesquebec.ca/recherche/dataset/d65f10dd-9948-4b52-bc4c-b40261e2c593/resource/a3e77a08-b88a-4fa5-ae2f-56739f14c58b/download/arbres.geojson',
    crosswalk: {
      common: 'ESSENCE_FR',
      scientific: 'ESSENCE_LA',
      dbh: 'DHP',
      health: 'ETAT',
      owner: 'PROPRIETE',
      planted: 'DATE_PLANT',
      updated: 'DATE_RELEV'
    },
    license: { id: 'CC-BY-4.0' },
    opentrees_id: 'repentigny_ca'
  },
  {
    country: 'Canada',
    state: 'Québec',
    city: 'Saguenay',
    scope: 'Tree',
    info: 'https://www.donneesquebec.ca/recherche/dataset/sag_inventaire-des-arbres-repertories',
    download: 'https://www.donneesquebec.ca/recherche/dataset/9d688a5e-1725-4b7e-ad68-21533d6cb36d/resource/70ebed94-824e-4a72-a9f0-d7d7fa55597e/download/sag_inventairearbres.json',
    license: { id: 'CC-BY-4.0' }
  },
  {
    country: 'Canada',
    state: 'Saskatchewan',
    city: 'Regina',
    scope: 'Tree: street',
    info: 'http://open.regina.ca/dataset/city-of-regina-tree-inventory',
    download: {
      arcgis: 'https://opengis.regina.ca/arcgis/rest/services/CGISViewer/TreeWebApp/MapServer/0'
    },
    crosswalk: {
      common: 'Species',
      owner: 'Ownership',
      planted: 'Year_Plant',
      dbh: 'Diameter',
      value: 'Tree_Value'
    },
    license: {
      name: 'Open Government Licence – City of Regina 2.0',
      url: 'https://www.regina.ca/city-government/open-data/open-government-licence'
    },
    opentrees_id: 'regina'
  },
  {
    country: 'Canada',
    state: 'Saskatchewan',
    city: 'Regina',
    scope: 'Tree: park',
    info: 'http://open.regina.ca/dataset/city-of-regina-tree-inventory',
    download: {
      arcgis: 'https://opengis.regina.ca/arcgis/rest/services/CGISViewer/TreeWebApp/MapServer/2'
    },
    crosswalk: {
      common: 'Species',
      owner: 'Ownership',
      planted: 'Year_Plant',
      dbh: 'Diameter',
      value: 'Tree_Value'
    },
    license: {
      name: 'Open Government Licence – City of Regina 2.0',
      url: 'https://www.regina.ca/city-government/open-data/open-government-licence'
    },
    opentrees_id: 'regina'
  },
  {
    country: 'Chile',
    state: "O'Higgins",
    city: 'Navidad',
    info: 'https://www.arcgis.com/home/item.html?id=0728dc46fc514551b444ca48014b8e95',
    download: {
      arcgis: 'https://services5.arcgis.com/YonhguLn2JSP8h66/arcgis/rest/services/survey123_134e48c9c8ba4d8ea14a7c986dec7660/FeatureServer/0'
    }
  },
  {
    country: 'Chile',
    state: 'Santiago',
    city: 'Las Condes',
    info: 'https://www.arcgis.com/home/item.html?id=451bea94d7ee4d6692fe17b3cfe25e26',
    download: {
      arcgis: 'https://services1.arcgis.com/PRbPsCbRWXrN5OXD/arcgis/rest/services/Arbolado_Urbano_Las_Condes/FeatureServer/0'
    }
  },
  {
    country: 'Chile',
    state: 'Santiago',
    city: 'Providencia',
    scope: 'Tree',
    inactive: true,
    info: 'https://datos.gob.cl/dataset/catrastro_de_arboles_en_la_comuna_de_providencia',
    download: 'http://datos.gob.cl/datastore/dump/c4a710d5-c221-4da6-8a91-c0d8c9500164',
    geometry: { x: 'X', y: 'Y' },
    srs: 'EPSG:32719',
    crosswalk: {
      ref: '_id',
      scientific: 'NOMB_CIENT',
      common: 'SP',
      height: 'H_MTS'
    },
    license: { id: 'PDDL-1.0' },
    opentrees_id: 'providencia'
  },
  {
    country: 'Chile',
    state: 'Santiago',
    city: 'Vitacura',
    info: 'https://www.arcgis.com/home/item.html?id=0b2a3721793047fcaac82490260c70e6',
    download: {
      arcgis: 'https://services3.arcgis.com/5vLt4epekc6aLljO/arcgis/rest/services/ARBOLES_COMUNA_GEO_UTM/FeatureServer/0'
    }
  },
  {
    country: 'China',
    state: 'Hong Kong',
    scope: 'Tree: notable',
    info: 'https://portal.csdi.gov.hk/geoportal/?datasetId=devb_wb_rcd_1629267205229_51162',
    download: 'https://static.csdi.gov.hk/csdi-webpage/download/common/778b948c32d31fadf95f366ffadff4d7b63fe437a11e130c3a30f67ed1780262',
    vfs: '/vsizip/'
  },
  {
    country: 'Colombia',
    state: 'Antioquia',
    city: 'Medellín',
    scope: 'Tree',
    inactive: true,
    download: { checksum: 'fc65cf2ed9b27fb8bc6f806541273453' },
    geometry: { x: 'x', y: 'y' },
    srs: 'EPSG:4326'
  },
  {
    country: 'Colombia',
    state: 'Antioquia',
    city: 'Sabaneta',
    scope: 'Tree',
    info: 'https://www.datos.gov.co/Ambiente-y-Desarrollo-Sostenible/Arbolado-urbano-de-Sabaneta/nwvv-nt5q',
    download: 'https://www.datos.gov.co/api/geospatial/nwvv-nt5q?&method=export&format=geojson'
  },
  {
    country: 'Colombia',
    state: 'Bogotá',
    city: 'Bogotá',
    designation: 'Bosa',
    info: 'https://www.arcgis.com/home/item.html?id=2fbbf07dfd88464fa4aa34fc9a15a5b3',
    download: {
      arcgis: 'https://services8.arcgis.com/XnN79i2zv7tQsjdM/arcgis/rest/services/Arbolado_bosa/FeatureServer/30'
    }
  },
  {
    country: 'Colombia',
    state: 'Bogotá',
    city: 'Bogotá',
    designation: 'Ciudad Bolívar',
    info: 'https://www.arcgis.com/home/item.html?id=83febb831e3546ae93f0e2e1f6f05b46',
    download: {
      arcgis: 'https://services7.arcgis.com/SttFSSHZYXsO8qIk/arcgis/rest/services/arbolado_CB/FeatureServer/0'
    }
  },
  {
    country: 'Colombia',
    state: 'Bogotá',
    city: 'Bogotá',
    scope: 'Tree',
    notes: 'download: https://geoportal.jbb.gov.co/agc/services/SIGAU/CensoArbol/MapServer/WFSServer?request=GetCapabilities&service=WFS&typeName=CensoArbol:Arbolado_Urbano',
    info: 'https://datosabiertos.bogota.gov.co/dataset/censo-arbolado-urbano',
    download: 'https://datosabiertos.bogota.gov.co/dataset/18721a34-0b1c-4399-bf2c-5f03fe5ef21a/resource/a351e008-aeaa-44c3-8920-d038776e9269/download/arbolado_urbano.geojson',
    license: { id: 'CC-BY-4.0' }
  },
  {
    country: 'Colombia',
    state: 'Bogotá',
    city: 'Bogotá',
    scope: 'Tree: notable',
    info: 'https://datosabiertos.bogota.gov.co/dataset/arboles-patrimoniales',
    download: 'https://datosabiertos.bogota.gov.co/dataset/6f24d2f4-7468-42b8-af66-da2a09ff6551/resource/9b880145-7181-45d5-8ba2-bf6d9613bf2a/download/arbol_patrimonial.geojson',
    license: { id: 'CC-BY-4.0' }
  },
  {
    country: 'Colombia',
    state: 'Bogotá',
    city: 'Bogotá',
    notes: 'coarse species',
    info: 'https://www.arcgis.com/home/item.html?id=4872efc685ab4d728247c679dd440a33',
    download: {
      arcgis: 'https://services7.arcgis.com/rxsqAG0ztOQO48WN/arcgis/rest/services/Arbolado_urbano_especies/FeatureServer/0'
    }
  },
  {
    country: 'Colombia',
    state: 'Caldas',
    city: 'La Dorada',
    scope: 'Tree',
    info: 'https://www.datos.gov.co/Ambiente-y-Desarrollo-Sostenible/Arboles-Sembrados-Faja-Rio-Magdalena/9w8h-nex7',
    download: 'https://www.datos.gov.co/api/views/9w8h-nex7/rows.csv',
    driver: 'CSV',
    geometry: { x: 'X', y: 'Y' },
    srs: 'EPSG:4326',
    terms: 'Public Domain'
  },
  {
    country: 'Colombia',
    state: 'Caldas',
    city: 'Manizales',
    scope: 'Tree: street (main)',
    info: 'http://geodata-manizales-sigalcmzl.opendata.arcgis.com/datasets/infraestructura-verde-urbana-%C3%A1rboles/about',
    download: {
      arcgis: 'https://services6.arcgis.com/PtpS85InlUyG2Gqs/arcgis/rest/services/Infraestructura_verde_urbana/FeatureServer/0'
    }
  },
  {
    country: 'Colombia',
    state: 'Cauca',
    city: 'Popayán',
    info: 'https://www.arcgis.com/home/item.html?id=12a70db96ee24b6c92ef4a070443d7de',
    download: {
      arcgis: 'https://services7.arcgis.com/YM8uBt5E8RtU0HOh/arcgis/rest/services/arbol_(ZIP)/FeatureServer/0'
    }
  },
  {
    country: 'Colombia',
    state: 'Cundinamarca',
    city: 'Guatavita',
    scope: 'Tree',
    info: 'https://www.datos.gov.co/Ambiente-y-Desarrollo-Sostenible/CATASTRO-DE-ARBOLES-DEL-MUNICIPIO-DE-GUATAVITA/r4k4-8sux',
    download: 'https://www.datos.gov.co/api/views/r4k4-8sux/rows.csv',
    coordsFunc: x => {
      // LATITUD: 04° 56' 15.1", LONGITUD: 73° 50' 22.6"
      const pattern = /(?<deg>[0-9]+)°\s*(?<min>[0-9]+)'\s*(?<sec>[0-9\.]+)"/
      return [
        - helpers.parseDecimalFromDMS(x['LONGITUD'], pattern),
        helpers.parseDecimalFromDMS(x['LATITUD'], pattern),
      ]
    },
    srs: 'EPSG:4326'
  },
  {
    country: 'Colombia',
    state: 'Cundinamarca',
    city: 'Soacha',
    info: 'https://www.arcgis.com/home/item.html?id=2ec498f597e74a848112988f793605f4',
    download: {
      arcgis: 'https://services6.arcgis.com/nUuopas2GEc7q7Zf/arcgis/rest/services/service_daa98289b5314e7588e75b54201623aa/FeatureServer/0'
    }
  },
  {
    country: 'Colombia',
    state: 'Quindio',
    city: 'Quimbaya',
    scope: 'Tree',
    info: 'https://www.datos.gov.co/Ambiente-y-Desarrollo-Sostenible/Catastro-de-rboles-Quimbaya/bgqg-v25g',
    download: 'https://www.datos.gov.co/api/views/bgqg-v25g/rows.csv',
    coordsFunc: x => {
      // Latitud: Latitud:4°37'47", Longitud: Longitud: 75°45'28"
      const pattern = /(?<deg>[0-9]+)°\s*(?<min>[0-9]+)'\s*(?<sec>[0-9\.]+)"/
      return [
        - helpers.parseDecimalFromDMS(x['Longitud'], pattern),
        helpers.parseDecimalFromDMS(x['Latitud'], pattern)
      ]
    },
    terms: 'Public Domain'
  },
  {
    country: 'Colombia',
    state: 'Risaralda',
    city: 'Dosquebradas',
    designation: 'Acuaseo',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=85a0ed2a968c43f5972654076351319f',
    download: 'https://www.arcgis.com/sharing/rest/content/items/85a0ed2a968c43f5972654076351319f/data',
    api: 'arcgis-sharing',
    openFunc: file => helpers.openEsriFeatureCollectionWithGdal(file)
  },
  {
    country: 'Colombia',
    state: 'Risaralda',
    city: 'Dosquebradas',
    info: 'https://www.arcgis.com/home/item.html?id=18eebe4bdacb40a7b007a35734612e1d',
    download: {
      arcgis: 'https://services8.arcgis.com/ITOb3eSKiN3FTE9b/arcgis/rest/services/arboles2023/FeatureServer/0'
    }
  },
  {
    country: 'Colombia',
    state: 'Risaralda',
    city: 'Pereira',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=cd352c93f38245d6b26bd443e4eaa2c8',
    download: {
      arcgis: 'https://services3.arcgis.com/Zdpg0E6lri7EggIc/arcgis/rest/services/ARBOLADO_PEREIRA_04_2018/FeatureServer/0'
    }
  },
  {
    country: 'Colombia',
    state: 'Risaralda',
    city: 'Pereira',
    info: 'https://www.arcgis.com/home/item.html?id=ee1a7684f67541e190577576942eb64a',
    download: {
      arcgis: 'https://services3.arcgis.com/Zdpg0E6lri7EggIc/arcgis/rest/services/inventario_arboles_2019/FeatureServer/0'
    }
  },
  {
    country: 'Colombia',
    state: 'Santander',
    city: 'Bucaramanga',
    scope: 'Tree',
    info: 'https://www.datos.gov.co/Ambiente-y-Desarrollo-Sostenible/01-BASE-DE-DATOS-CENSO-ARBOREO-BUCARAMANGA-2018/3ah4-2b5a',
    download: 'https://www.datos.gov.co/api/views/3ah4-2b5a/rows.csv',
    geometry: { x: 'long_', y: 'lat' },
    srs: 'EPSG:4326',
    license: { id: 'CC-BY-SA-4.0' }
  },
  {
    country: 'Colombia',
    state: 'Santander',
    city: 'Piedecuesta',
    scope: 'Tree',
    info: 'https://www.datos.gov.co/Ambiente-y-Desarrollo-Sostenible/ARBOLES_PIEDECUESTANA_ESP/dabb-sns7',
    download: 'https://www.datos.gov.co/api/views/dabb-sns7/rows.csv',
    coordsFunc: x => {
      // Coordenada: 73° 3' 15.496" W, Coordena_1: 7° 0' 10.340" N
      const pattern = /(?<deg>[0-9]+)°\s*(?<min>[0-9]+)'\s*(?<sec>[0-9\.]+)"/
      return [
        - helpers.parseDecimalFromDMS(x['Coordenada'], pattern),
        helpers.parseDecimalFromDMS(x['Coordena_1'], pattern)
      ]
    }
  },
  {
    country: 'Colombia',
    state: 'Tolima',
    city: 'Carmen de Apicalá',
    info: 'https://www.arcgis.com/home/item.html?id=390578c1ea674992b89099d4bb88bd07',
    download: {
      arcgis: 'https://services8.arcgis.com/SmipbzmIcghR23t6/arcgis/rest/services/survey123_b0245d166ff74e93acd6841f6023d232/FeatureServer/0'
    }
  },
  {
    country: 'Colombia',
    state: 'Tolima',
    city: 'Ibagué',
    designation: 'Universidad de Ibagué',
    info: 'https://www.arcgis.com/home/item.html?id=332722d336b94c7396c54fecc129bc4e',
    download: {
      arcgis: 'https://services9.arcgis.com/RONz67S5ELf2Xi9H/arcgis/rest/services/INVENTARIO_ARBOLES_UNIBAGUE/FeatureServer/0'
    }
  },
  {
    country: 'Colombia',
    state: 'Tolima',
    city: 'Ibagué',
    scope: 'Tree',
    info: 'https://www.datos.gov.co/Ambiente-y-Desarrollo-Sostenible/Censo-de-Arbolado-urbano-en-Ibagu-Sria-Ambiente-y-/am4p-tz7w',
    download: 'https://www.datos.gov.co/api/views/am4p-tz7w/rows.csv',
    coordsFunc: x => {
      // Coordinates have varying levels of decimal offset
      const X = Number(x['X'])
      const Y = Number(x['Y'])
      const xOffset = X.toString().length - 6
      const yOffset = Y.toString().length - 6
      return [
        X / Math.pow(10, xOffset),
        Y / Math.pow(10, yOffset)
      ]
    },
    srs: 'EPSG:6253',
    license: { id: 'CC-BY-4.0' }
  },
  {
    country: 'Colombia',
    state: 'Valle del Cauca',
    city: 'Cartago',
    info: 'https://www.arcgis.com/home/item.html?id=244a1d242657423486563dd932498a67',
    download: {
      arcgis: 'https://services5.arcgis.com/l23kE3b7uPnZIuaB/arcgis/rest/services/Arbolado_Urbano_WFL1/FeatureServer/0'
    }
  },
  {
    country: 'Colombia',
    state: 'Valle del Cauca',
    city: 'Santiago de Cali',
    scope: 'Tree',
    info: 'https://www.datos.gov.co/dataset/Censo-arb-reo-de-Santiago-de-Cali/nsp8-c6fb',
    download: 'https://datos.cali.gov.co/dataset/3491e6aa-af1b-4d14-839f-cc775d2063a8/resource/73a988ec-24a3-4943-90a7-5fc409fd53f2/download/censo-arboreo-cali-cargue-a-datos-abiertos.csv',
    coordsFunc: x => {
      // Norte: '873683,99', Este: '1057756,06'
      return [
        Number(x['Este'].replace(',', '.')),
        Number(x['Norte'].replace(',', '.'))
      ]
    },
    srs: 'EPSG:6249',
    license: { id: 'CC-BY-SA-4.0' }
  },
  {
    country: 'Colombia',
    state: 'Valle del Cauca',
    city: 'Santiago de Cali',
    scope: 'Tree: notable',
    info: 'https://www.datos.gov.co/dataset/Arboles-notables-en-Santiago-de-Cali/xzni-zp4n',
    download: 'http://datos.cali.gov.co/dataset/f94cbfe0-dee8-4a9b-870c-358bca259d89/resource/ec49483e-c5ca-4f67-a916-865ff1de1d2f/download/arboles_notables.json',
    license: { id: 'CC-BY-SA-4.0' }
  },
  {
    country: 'Czechia',
    scope: 'Tree: notable',
    info: 'https://gis-aopkcr.opendata.arcgis.com/datasets/aopkcr::pam%C3%A1tn%C3%A9-stromy/about',
    download: {
      arcgis: 'https://gis.nature.cz/arcgis/rest/services/Aplikace/Opendata/MapServer/5'
    },
    license: { id: 'CC-BY-4.0' }
  },
  {
    country: 'Denmark',
    state: 'Hovedstaden',
    city: 'København',
    scope: 'Tree',
    info: 'https://www.opendata.dk/city-of-copenhagen/trae-basis-kommunale-traeer',
    download: 'https://wfs-kbhkort.kk.dk/k101/ows?service=WFS&version=2.0.0&request=GetFeature&typeNames=k101:trae_basis&srsName=EPSG:4326&outputFormat=application/json',
    crosswalk: {
      scientific: 'traeart',
      common: 'dansk_navn',
      planted: 'planteaar',
      health: 'sundhed'
    },
    license: { id: 'CC-BY-4.0' },
    opentrees_id: 'copenhagen'
  },
  {
    country: 'Denmark',
    state: 'Hovedstaden',
    city: 'København',
    scope: 'Tree: street',
    info: 'https://www.opendata.dk/city-of-copenhagen/gadetraeer',
    download: 'https://wfs-kbhkort.kk.dk/k101/ows?service=WFS&version=2.0.0&request=GetFeature&typeNames=k101:gadetraer&srsName=EPSG:4326&outputFormat=application/json',
    license: { id: 'CC-BY-4.0' },
    opentrees_id: 'copenhagen'
  },
  {
    country: 'Denmark',
    state: 'Syddanmark',
    city: 'Vejle',
    scope: 'Tree: park',
    info: 'https://www.opendata.dk/city-of-vejle/parkdrift-parkpleje-punktdata',
    download: {
      arcgis: 'https://kortservice.vejle.dk/gis/rest/services/OPENDATA/Vejle/MapServer/12'
    },
    delFunc: x => !Boolean(x.ELTTYPE.match(/(træer|træ|buske)/i)),
    crosswalk: {
      ref: 'OBJECTID',
      scientific: 'PLANTENAVN',
      notable: x => ({
        'Historisk træ': 'historic',
      })[x.ELTTYPE],
      location: x => 'park',
      health: x => x.ELTTYPE === 'Træruin' ? 'dead' : null,
      note: 'BESKRIVELSE'
    },
    license: { id: 'CC-BY-4.0' },
    opentrees_id: 'vejle'
  },
  {
    country: 'Ecuador',
    state: 'Pichincha',
    city: 'Quito',
    scope: 'Tree: notable',
    info: 'https://www.arcgis.com/home/item.html?id=f5cbbafa0a264e54b9b9c48669e63b74',
    download: 'https://www.arcgis.com/sharing/rest/content/items/f5cbbafa0a264e54b9b9c48669e63b74/data',
    api: 'arcgis-sharing',
    openFunc: file => helpers.openEsriFeatureCollectionWithGdal(
      file, {layerName: 'arboles_patrimoniales_6164'}
    )
  },
  {
    country: 'Finland',
    state: 'Uusimaa',
    city: 'Helsinki',
    scope: 'Tree',
    info: 'https://hri.fi/data/fi/dataset/helsingin-kaupungin-puurekisteri',
    download: 'https://kartta.hel.fi/ws/geoserver/avoindata/wfs?service=WFS&version=2.0.0&request=GetFeature&typeNames=avoindata:Puurekisteri_piste&srsName=EPSG:4326&outputFormat=application/json',
    license: { id: 'CC-BY-4.0' }
  },
  {
    country: 'France',
    state: 'Auvergne-Rhône-Alpes',
    city: 'Divonne-les-bains | Grilly | Cessy',
    scope: 'Tree',
    info: 'https://www.datara.gouv.fr/geonetwork/srv/fre/catalog.search#/metadata/b18070b7-4349-4fd5-8e56-1dc48c3eb03a',
    download: 'https://catalogue.datara.gouv.fr/rss/atomfeed/atomdata/b18070b7-4349-4fd5-8e56-1dc48c3eb03a?format=json&srs=4326&emprise=-1&territoire_type=&couchd_emplacement_stockage=arbre_p_r84&bTerritoire=0&couche_type_stockage=1',
    vfs: '/vsizip/',
    filename: 'Telechargement_1681591748_2337/b18070b7-4349-4fd5-8e56-1dc48c3eb03a_1681591748_5553/arbre_p_r84.json',
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
      })[x['classe_cir']]
    },
    notes: 'Path to file inside archive changes on each download',
    opentrees_id: 'divonne_les_bains_fr'
  },
  {
    country: 'France',
    state: 'Auvergne-Rhône-Alpes',
    city: 'Évian-les-Bains',
    scope: 'Tree',
    info: 'https://ville-d-evian-opendata-ville-evian.hub.arcgis.com/datasets/ddfeef65b8b64749ac93038d1d999ebe_7/about',
    download: {
      arcgis: 'https://services.arcgis.com/Hbks8qlTugfLqQka/arcgis/rest/services/arbres/FeatureServer/7'
    },
    license: { id: 'etalab-2.0' }
  },
  {
    country: 'France',
    state: 'Auvergne-Rhône-Alpes',
    designation: 'Grenoble-Alpes Métropole',
    scope: 'Tree: street (main)',
    info: [
      'https://data.metropolegrenoble.fr/visualisation/information/?id=patrimoine_arbore_du_territoire_metropolitain',
      'https://data.metropolegrenoble.fr/visualisation/export/?id=patrimoine_arbore_du_territoire_metropolitain'
    ],
    download: 'https://data.metropolegrenoble.fr/d4c/api/records/2.0/downloadfile/format=geojson&resource_id=05566402-cd0d-4c9b-90b6-4a90e4629e03',
    license: { id: 'ODbL-1.0' }
  },
  {
    country: 'France',
    state: 'Auvergne-Rhône-Alpes',
    city: 'Grenoble',
    scope: 'Tree',
    info: [
      'https://data.metropolegrenoble.fr/visualisation/information/?id=arbres-grenoble',
      'https://data.metropolegrenoble.fr/visualisation/export/?id=arbres-grenoble'
    ],
    download: 'https://data.metropolegrenoble.fr/d4c/api/records/2.0/downloadfile/format=geojson&resource_id=fe91221c-48cd-468e-9adf-0548ab5c5674',
    crosswalk: {
      ref: 'BIEN_REFERENCE',
      genus: 'GENRE_BOTA',
      species: 'ESPECE',
      cultivar: 'VARIETE',
      maturity: 'STADEDEDEVELOPPEMENT',
      description: 'REMARQUES',
      planted: 'ANNEDEPLANTATION'
    },
    license: { id: 'ODbL-1.0' },
    fallingfruit_id: 436,
    opentrees_id: 'grenoble'
  },
  {
    country: 'France',
    state: 'Auvergne-Rhône-Alpes',
    city: 'Lyon',
    scope: 'Tree',
    info: 'https://data.grandlyon.com/jeux-de-donnees/arbres-alignement-metropole-lyon/',
    download: 'https://download.data.grandlyon.com/wfs/grandlyon?service=WFS&version=2.0.0&request=GetFeature&typeNames=metropole-de-lyon:abr_arbres_alignement.abrarbre&srsName=EPSG:4326&outputFormat=application/json',
    crosswalk: {
      scientific: 'essence',
      infraspecies: 'variete',
      genus: 'genre',
      species: 'espece',
      location: 'localisati',
      planted: 'anneeplant',
      ref: 'identifian',
      common: 'essencefra'
    },
    license: { id: 'etalab-2.0' },
    opentrees_id: 'lyon'
  },
  {
    country: 'France',
    state: 'Auvergne-Rhône-Alpes',
    city: 'Meylan',
    scope: 'Tree',
    info: [
      'https://data.metropolegrenoble.fr/visualisation/information/?id=environnement',
      'https://data.metropolegrenoble.fr/visualisation/export/?id=environnement'
    ],
    download: 'https://data.metropolegrenoble.fr/d4c/api/records/2.0/downloadfile/format=geojson&resource_id=d47e904a-00c6-4a68-b7ac-44b5f117555c',
    license: { id: 'ODbL-1.0' }
  },
  {
    country: 'France',
    state: 'Auvergne-Rhône-Alpes',
    city: 'Saint-Égrève',
    scope: 'Tree',
    info: [
      'https://data.metropolegrenoble.fr/visualisation/information/?id=les-arbres-de-saint-egreve',
      'https://data.metropolegrenoble.fr/visualisation/export/?id=les-arbres-de-saint-egreve'
    ],
    download: 'https://data.metropolegrenoble.fr/d4c/api/records/2.0/downloadfile/format=geojson&resource_id=72f33c18-c4d7-42d8-b0cf-b179e9db7ca3',
    crosswalk: {
      genus: 'genre',
      species: 'espece',
      planted: 'anne_plan',
      common: 'essence'
    },
    license: { id: 'ODbL-1.0' },
    opentrees_id: 'saint_egreve'
  },
  {
    country: 'France',
    state: 'Bourgogne-Franche-Comté',
    city: 'Nevers',
    scope: 'Tree: park',
    info: 'https://www.data.gouv.fr/fr/datasets/arbres-dornement/',
    download: 'https://www.data.gouv.fr/fr/datasets/r/956d47c3-d907-43f3-a2ed-d70bb251463f',
    vfs: '/vsizip/',
    license: { id: 'etalab-1.0' },
    opentrees_id: 'nevers'
  },
  {
    country: 'France',
    state: 'Bourgogne-Franche-Comté',
    city: 'Nevers',
    scope: 'Tree: street',
    info: 'http://www.data.gouv.fr/fr/datasets/arbres-dalignement-2/',
    download: 'https://www.data.gouv.fr/fr/datasets/r/dbdc2068-ee22-474d-8a42-261554482a4f',
    vfs: '/vsizip/',
    crosswalk: { scientific: 'espece' },
    license: { id: 'etalab-1.0' },
    opentrees_id: 'nevers'
  },
  {
    country: 'France',
    state: 'Bretagne',
    scope: 'Tree',
    info: 'https://data.bretagne.bzh/explore/dataset/patrimoine-arbore-ponctuel-des-voies-navigables-appartenant-a-la-region-bretagne/information/',
    download: 'https://data.bretagne.bzh/api/explore/v2.1/catalog/datasets/patrimoine-arbore-ponctuel-des-voies-navigables-appartenant-a-la-region-bretagne/exports/geojson',
    crosswalk: {
      ref: 'gml_id',
      common: 'essence',
      height: 'hauteur',
      dbh: 'diametre',
      health: 'etat_genera',
      note: 'remarque'
    },
    license: { id: 'etalab-1.0' },
    opentrees_id: 'bretagne_fr'
  },
  {
    country: 'France',
    state: 'Bretagne',
    city: "Côtes d'Armor",
    scope: 'Tree: notable',
    info: "https://datarmor.cotesdarmor.fr/datasets/arbres-remarquables-des-cotes-d'armor",
    download: "https://koumoul.com/data-fair/api/v1/datasets/arbres-remarquables-des-cotes-d'armor/data-files/Arbres%20remarquables%20des%20C%C3%B4tes%20d'Armor-full.csv",
    geometry: { x: 'lon', y: 'lat' },
    srs: 'EPSG:4326',
    license: { id: 'etalab-2.0' }
  },
  {
    country: 'France',
    state: 'Bretagne',
    city: 'Guingamp',
    scope: 'Tree: planted',
    info: 'https://datarmor.cotesdarmor.fr/datasets/arbres-guingamp',
    download: 'https://datarmor.cotesdarmor.fr/data-fair/api/v1/datasets/arbres-guingamp/lines?size=10000&page=1&format=csv',
    geometry: { x: 'longitude', y: 'latitude' },
    srs: 'EPSG:4326',
    crosswalk: { genus: 'Genre', species: 'Espce', cultivar: 'Varit' },
    license: { id: 'etalab-2.0' },
    opentrees_id: 'guingamp_fr'
  },
  {
    country: 'France',
    state: 'Bretagne',
    city: 'Rennes',
    designation: 'Rennes Métropole',
    scope: 'Tree',
    info: 'https://data.rennesmetropole.fr/explore/dataset/arbre_hors_rennes/information/',
    download: 'https://data.rennesmetropole.fr/api/explore/v2.1/catalog/datasets/arbre_hors_rennes/exports/geojson',
    license: { id: 'ODbL-1.0' }
  },
  {
    country: 'France',
    state: 'Bretagne',
    city: 'Rennes',
    scope: 'Tree: street',
    info: 'https://data.rennesmetropole.fr/explore/dataset/arbres-d-alignement-rennes/information/',
    download: 'https://data.rennesmetropole.fr/api/explore/v2.1/catalog/datasets/arbres-d-alignement-rennes/exports/geojson',
    crosswalk: {
      ref: 'numero',
      planted: 'date_plant',
      health: 'etat',
      genus: 'genre',
      species: 'espece',
      cultivar: 'variete',
      circumference_cm: 'circonfere',
      height: 'hauteur'
    },
    license: { id: 'ODbL-1.0' },
    opentrees_id: 'rennes2'
  },
  {
    country: 'France',
    state: 'Bretagne',
    city: 'Rennes',
    scope: 'Tree: park',
    info: 'https://data.rennesmetropole.fr/explore/dataset/arbres-dornement-rennes/information/',
    download: 'https://data.rennesmetropole.fr/api/explore/v2.1/catalog/datasets/arbres-dornement-rennes/exports/geojson',
    crosswalk: {
      genus: 'genre',
      species: 'espece',
      planted: 'date_plant',
      cultivar: 'variete',
      circumference_cm: 'circonfere'
    },
    license: { id: 'ODbL-1.0' },
    opentrees_id: 'rennes1'
  },
  {
    country: 'France',
    state: 'Centre-Val de Loire',
    city: 'Orléans',
    scope: 'Tree',
    inactive: true,
    info: 'https://www.data.gouv.fr/fr/datasets/arbres-ville-dorleans/',
    download: 'https://www.data.gouv.fr/fr/datasets/r/804b8b61-9f8f-4a0d-8524-35ea5d6e265f',
    vfs: '/vsizip/',
    crosswalk: {
      ref: 'id_arbre',
      genus: x => String(x.genre).replace(/ \?/, ''),
      species: x => String(x.species).replace(/ \?/, ''),
      infraspecies: 'variete',
      planted: 'date_plant'
    },
    license: { id: 'etalab-2.0' },
    opentrees_id: 'orleans'
  },
  {
    country: 'France',
    state: 'Centre-Val de Loire',
    city: 'Tours',
    scope: 'Tree',
    info: 'https://data.tours-metropole.fr/explore/dataset/arbres-tours/information/',
    download: 'https://data.tours-metropole.fr/api/explore/v2.1/catalog/datasets/arbres-tours/exports/geojson',
    license: { id: 'etalab-2.0' }
  },
  {
    country: 'France',
    state: 'Grand Est',
    city: 'Metz',
    scope: 'Tree: street',
    info: 'https://www.data.gouv.fr/fr/datasets/arbres-dalignement/',
    download: 'https://maps.eurometropolemetz.eu/ows?service=WFS&version=2.0.0&request=GetFeature&typeNames=public:vrd_esv_arb&srsName=EPSG:4326&outputFormat=application/json',
    crosswalk: { dbh: 'diametre', scientific: 'nom_espece', note: 'observatio' },
    license: { id: 'ODbL-1.0' },
    opentrees_id: 'metz'
  },
  {
    country: 'France',
    state: 'Grand Est',
    city: 'Metz',
    scope: 'Tree: notable',
    info: 'https://www.data.gouv.fr/fr/datasets/arbres-remarquables-metz/',
    download: 'https://maps.eurometropolemetz.eu/ows?service=WFS&version=2.0.0&request=GetFeature&typeNames=public:vrd_esv_arb_rem&srsName=EPSG:4326&outputFormat=application/json',
    license: { id: 'ODbL-1.0' },
    opentrees_id: 'metz'
  },
  {
    country: 'France',
    state: 'Grand Est',
    city: 'Mulhouse',
    scope: 'Tree',
    info: 'https://data.mulhouse-alsace.fr/explore/dataset/68224_arbres_alignement/information/',
    download: 'https://data.mulhouse-alsace.fr/api/explore/v2.1/catalog/datasets/68224_arbres_alignement/exports/geojson',
    crosswalk: {
      scientific: 'libelle_es',
      planted: 'date_plant',
      common: 'com_nom',
      ref: 'obj_ident'
    },
    license: { id: 'etalab-2.0' },
    opentrees_id: 'mulhouse'
  },
  {
    country: 'France',
    state: 'Grand Est',
    city: 'Strasbourg',
    scope: 'Tree',
    info: 'https://data.strasbourg.eu/explore/dataset/patrimoine_arbore/information/',
    download: 'https://data.strasbourg.eu/api/explore/v2.1/catalog/datasets/patrimoine_arbore/exports/geojson',
    license: { id: 'etalab-2.0' }
  },
  {
    country: 'France',
    state: 'Grand-Est',
    city: 'Épinal',
    scope: 'Tree',
    info: 'https://hub.arcgis.com/datasets/epinal::arbres/about',
    download: {
      arcgis: 'https://services1.arcgis.com/V9xtXbeaozrYojAm/arcgis/rest/services/esv_WFL1/FeatureServer/0'
    }
  },
  {
    country: 'France',
    state: 'Hauts-de-France',
    city: 'Croix',
    scope: 'Tree: notable',
    info: 'https://opendata.lillemetropole.fr/explore/dataset/arbres-remarquables0/information/',
    download: 'https://opendata.lillemetropole.fr/api/explore/v2.1/catalog/datasets/arbres-remarquables0/exports/geojson',
    license: { id: 'etalab-1.0' }
  },
  {
    country: 'France',
    state: 'Hauts-de-France',
    city: 'Dunkerque',
    scope: 'Tree: notable',
    info: 'https://data.dunkerque-agglo.fr/explore/dataset/cadastre-vert-de-la-communaute-urbaine-de-dunkerque-arbres-remarquables/information/',
    download: 'https://data.dunkerque-agglo.fr/api/explore/v2.1/catalog/datasets/cadastre-vert-de-la-communaute-urbaine-de-dunkerque-arbres-remarquables/exports/geojson',
    license: { id: 'ODbL-1.0' }
  },
  {
    country: 'France',
    state: 'Hauts-de-France',
    city: 'Roubaix',
    scope: 'Tree: park',
    info: 'https://opendata.roubaix.fr/explore/dataset/arbres_opendata_cassel_nvmonde_barbieux/information/',
    download: 'https://opendata.roubaix.fr/api/explore/v2.1/catalog/datasets/arbres_opendata_cassel_nvmonde_barbieux/exports/geojson',
    license: { id: 'etalab-1.0' }
  },
  {
    country: 'France',
    state: 'Hauts-de-France',
    city: 'Roubaix',
    scope: 'Tree: notable',
    info: 'https://opendata.roubaix.fr/explore/dataset/les-arbres-remarquables-a-roubaix/information/',
    download: 'https://opendata.roubaix.fr/api/explore/v2.1/catalog/datasets/les-arbres-remarquables-a-roubaix/exports/geojson',
    license: { id: 'etalab-1.0' }
  },
  {
    country: 'France',
    state: 'Hauts-de-France',
    city: 'Saint-Quentin',
    scope: 'Tree',
    info: 'https://hub.arcgis.com/datasets/Saint-Quentin::patrimoine-arbor%C3%A9-ro/about?layer=0',
    download: {
      arcgis: 'https://services1.arcgis.com/5nIW6mZeb2YNJ7np/arcgis/rest/services/PATRIMOINE_ARBOR%C3%89_(RO)/FeatureServer/0'
    },
    crosswalk: {
      scientific: 'nomlatin',
      common: 'nomfrancai',
      updated: 'EditDate',
      maturity: 'fk_stadede',
      dbh: 'tronc_diam',
      height: 'haut_tot',
      ref: 'id_arbre'
    },
    license: { id: 'etalab-2.0' },
    opentrees_id: 'saint_quentinois'
  },
  {
    country: 'France',
    state: 'Hauts-de-France',
    city: 'Tourcoing',
    scope: 'Tree',
    info: 'https://opendata.tourcoing.fr/explore/dataset/tourcoing-arbres-urbains/information/',
    download: 'https://opendata.tourcoing.fr/api/explore/v2.1/catalog/datasets/tourcoing-arbres-urbains/exports/geojson',
    license: { id: 'etalab-1.0' }
  },
  {
    country: 'France',
    state: 'Île-de-France',
    designation: 'Hauts-de-Seine',
    scope: 'Tree: street (main)',
    info: 'https://opendata.hauts-de-seine.fr/explore/dataset/arbres-dalignement-sur-la-voirie-departementale/information/',
    download: 'https://opendata.hauts-de-seine.fr/api/explore/v2.1/catalog/datasets/arbres-dalignement-sur-la-voirie-departementale/exports/geojson',
    license: { id: 'etalab-1.0' }
  },
  {
    country: 'France',
    state: 'Île-de-France',
    designation: 'Hauts-de-Seine',
    scope: 'Tree: notable',
    info: 'https://opendata.hauts-de-seine.fr/explore/dataset/fr-229200506-arbres-remarquables/information',
    download: 'https://opendata.hauts-de-seine.fr/api/explore/v2.1/catalog/datasets/fr-229200506-arbres-remarquables/exports/geojson',
    license: { id: 'etalab-1.0' }
  },
  {
    country: 'France',
    state: 'Île-de-France',
    scope: 'Tree: notable',
    info: 'https://data.iledefrance.fr/explore/dataset/arbre_remarquable/information/',
    download: 'https://data.iledefrance.fr/api/explore/v2.1/catalog/datasets/arbre_remarquable/exports/geojson',
    license: { id: 'ODbL-1.0' }
  },
  {
    country: 'France',
    state: 'Île-de-France',
    scope: 'Tree: notable',
    info: 'https://data.iledefrance.fr/explore/dataset/arbres-remarquables/information/',
    download: 'https://data.iledefrance.fr/api/explore/v2.1/catalog/datasets/arbres-remarquables/exports/geojson',
    license: { id: 'ODbL-1.0' }
  },
  {
    country: 'France',
    state: 'Île-de-France',
    city: 'Argenteuil',
    scope: 'Tree',
    info: 'https://www.data.gouv.fr/fr/datasets/les-arbres-de-lespace-public-a-argenteuil',
    download: {
      arcgis: 'https://services.arcgis.com/r0pok8eBaO080DqT/arcgis/rest/services/ARBRES/FeatureServer/0'
    },
    license: { id: 'etalab-2.0' }
  },
  {
    country: 'France',
    state: 'Île-de-France',
    city: 'Clichy',
    scope: 'Tree',
    info: 'https://opendata.hauts-de-seine.fr/explore/dataset/fr-219200243-arbres/information/',
    download: 'https://opendata.hauts-de-seine.fr/api/explore/v2.1/catalog/datasets/fr-219200243-arbres/exports/geojson',
    license: { id: 'etalab-1.0' }
  },
  {
    country: 'France',
    state: 'Île-de-France',
    city: 'La Défense',
    scope: 'Tree',
    info: 'https://opendata.hauts-de-seine.fr/explore/dataset/fr-833718794-arbres/information/',
    download: 'https://opendata.hauts-de-seine.fr/api/explore/v2.1/catalog/datasets/fr-833718794-arbres/exports/geojson',
    license: { id: 'etalab-1.0' }
  },
  {
    country: 'France',
    state: 'Île-de-France',
    city: 'Montreuil',
    scope: 'Tree: street',
    info: 'https://data.montreuil.fr/explore/dataset/arbres-voirie-communale/information/',
    download: 'https://data.montreuil.fr/api/explore/v2.1/catalog/datasets/arbres-voirie-communale/exports/geojson',
    license: { id: 'etalab-2.0' }
  },
  {
    country: 'France',
    state: 'Île-de-France',
    city: 'Montreuil',
    scope: 'Tree: edible',
    info: 'https://data.montreuil.fr/explore/dataset/montreuil-est-notre-jardin/information/',
    download: 'https://data.montreuil.fr/api/explore/v2.1/catalog/datasets/montreuil-est-notre-jardin/exports/geojson',
    license: { id: 'etalab-2.0' }
  },
  {
    country: 'France',
    state: 'Île-de-France',
    city: 'Montreuil',
    scope: 'Tree: street (main)',
    info: 'https://data.montreuil.fr/explore/dataset/arbres-de-la-voirie-departementale/information/',
    download: 'https://data.montreuil.fr/api/explore/v2.1/catalog/datasets/arbres-de-la-voirie-departementale/exports/geojson',
    license: { id: 'etalab-2.0' }
  },
  {
    country: 'France',
    state: 'Île-de-France',
    city: 'Paris',
    designation: 'Grand Paris Seine Ouest',
    scope: 'Tree',
    info: 'https://data.seineouest.fr/explore/dataset/arbres-v2/information/',
    download: 'https://data.seineouest.fr/api/explore/v2.1/catalog/datasets/arbres-v2/exports/geojson',
    crosswalk: {
      scientific: 'genespvar',
      height: 'hauteur',
      planted: 'an_plant',
      ref: 'id_plant'
    },
    license: { id: 'etalab-1.0' },
    opentrees_id: 'grand_paris_seine_ouest'
  },
  {
    country: 'France',
    state: 'Île-de-France',
    city: 'Paris',
    designation: 'Grand Paris Sud',
    scope: 'Tree',
    info: 'https://data.grandparissud.fr/explore/dataset/patrimoine-arbore/information/',
    download: 'https://data.grandparissud.fr/api/explore/v2.1/catalog/datasets/patrimoine-arbore/exports/geojson',
    crosswalk: {
      location: 'categorie',
      owner: 'gestionnai',
      common: x => x.ess_fcais + ' ' + x.espe_fcais,
      scientific: 'ess_latin',
      age: 'classe_age',
      health: 'vigeur_cr',
      updated: 'anne_expe',
      ref: 'identifian'
    },
    license: { id: 'etalab-1.0' },
    opentrees_id: 'paris_sud_fr'
  },
  {
    country: 'France',
    state: 'Île-de-France',
    city: 'Paris',
    scope: 'Tree',
    info: 'https://opendata.paris.fr/explore/dataset/les-arbres/information/',
    download: 'https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/les-arbres/exports/geojson',
    crosswalk: {
      ref: 'idemplacement',
      common: 'libellefrancais',
      genus: 'genre',
      species: 'espece',
      cultivar: 'varieteoucultivar',
      dbh: x => (Number(x['circonferenceencm']) / 3.14159) * 2,
      maturity: 'stadedeveloppement'
    },
    license: { id: 'ODbL-1.0' },
    fallingfruit_id: 237,
    opentrees_id: 'paris'
  },
  {
    country: 'France',
    state: 'Île-de-France',
    city: 'Paris',
    scope: 'Tree: notable',
    notes: 'partly overlaps https://opendata.paris.fr/explore/dataset/les-arbres/information/',
    info: 'https://opendata.paris.fr/explore/dataset/arbresremarquablesparis/information',
    download: 'https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/arbresremarquablesparis/exports/geojson',
    license: { id: 'ODbL-1.0' },
    fallingfruit_id: 236,
    opentrees_id: 'paris'
  },
  {
    country: 'France',
    state: 'Île-de-France',
    city: 'Saint-Germain-en-Laye',
    scope: 'Tree',
    info: 'https://www.data.gouv.fr/fr/datasets/arbres-urbains',
    download: 'https://www.data.gouv.fr/fr/datasets/r/13add5f3-d3db-407a-8a72-a069379a2e44'
  },
  {
    country: 'France',
    state: 'Île-de-France',
    city: 'Seine-Saint-Denis',
    scope: 'Tree',
    info: 'https://geo.data.gouv.fr/fr/datasets/e9c96b2509f55e859fde03265ed2a6ae7882d44b',
    download: 'https://transcode.geo.data.gouv.fr/services/5e2a1e6cfa4268bc2552fabc/feature-types/fr-dpt93-1646?format=GeoJSON&projection=WGS84',
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
    },
    license: { id: 'etalab-2.0' },
    opentrees_id: 'seine_saint_denis'
  },
  {
    country: 'France',
    state: 'Île-de-France',
    city: 'Vallée-aux-Loups',
    scope: 'Tree',
    info: 'https://opendata.hauts-de-seine.fr/explore/dataset/inventaire-botanique-de-larboretum-du-domaine-departemental-de-la-vallee-aux-lou/information/',
    download: 'https://opendata.hauts-de-seine.fr/api/explore/v2.1/catalog/datasets/inventaire-botanique-de-larboretum-du-domaine-departemental-de-la-vallee-aux-lou/exports/geojson',
    license: { id: 'etalab-1.0' }
  },
  {
    country: 'France',
    state: 'Île-de-France',
    city: 'Versailles',
    scope: 'Tree: street',
    info: 'https://sig-cavgp.opendata.arcgis.com/datasets/cavgp::arbres-dalignements/about',
    download: {
      arcgis: 'https://services2.arcgis.com/YECJCCLQCtaylXWh/arcgis/rest/services/VER_Espaces_verts/FeatureServer/2'
    },
    crosswalk: { scientific: 'ESPECE', common: 'FRANCAIS' },
    license: { id: 'etalab-2.0' },
    opentrees_id: 'versailles'
  },
  {
    country: 'France',
    state: 'Île-de-France',
    city: 'Versailles',
    scope: 'Tree: park',
    info: 'https://sig-cavgp.opendata.arcgis.com/datasets/cavgp::arbres-situ%C3%A9s-dans-les-parcs/about',
    download: {
      arcgis: 'https://services2.arcgis.com/YECJCCLQCtaylXWh/arcgis/rest/services/VER_Espaces_verts/FeatureServer/1'
    },
    license: { id: 'etalab-2.0' },
    opentrees_id: 'versailles'
  },
  {
    country: 'France',
    state: 'Île-de-France',
    city: 'Versailles',
    scope: 'Tree: notable',
    info: 'https://sig-cavgp.opendata.arcgis.com/datasets/cavgp::arbres-remarquables/about',
    download: {
      arcgis: 'https://services2.arcgis.com/YECJCCLQCtaylXWh/arcgis/rest/services/VER_Espaces_verts/FeatureServer/0'
    },
    license: { id: 'etalab-2.0' },
    opentrees_id: 'versailles'
  },
  {
    country: 'France',
    state: 'Normandie',
    city: 'Rouen',
    scope: 'Tree: notable',
    info: 'https://data.metropole-rouen-normandie.fr/explore/dataset/arbres-remarquables-metropole-rouen-normandie-2019/information/',
    download: 'https://data.metropole-rouen-normandie.fr/api/explore/v2.1/catalog/datasets/arbres-remarquables-metropole-rouen-normandie-2019/exports/geojson',
    license: { id: 'etalab-2.0' }
  },
  {
    country: 'France',
    state: 'Nouvelle Calédonie',
    city: 'Nouméa',
    scope: 'Tree: notable',
    info: 'https://data.noumea.nc/datasets/bd092c4a648b4012a28b048affa8ec1c_0/about',
    download: {
      arcgis: 'https://services6.arcgis.com/dIDU3ttIicDWLftk/arcgis/rest/services/PUD_2020_ARBRE/FeatureServer/0'
    }
  },
  {
    country: 'France',
    state: 'Nouvelle-Aquitaine',
    city: 'Agen',
    scope: 'Tree',
    info: 'https://data.agen.fr/explore/dataset/arbres/information/',
    download: 'https://data.agen.fr/api/explore/v2.1/catalog/datasets/arbres/exports/geojson',
    crosswalk: {
      ref: 'id_ponctue',
      common: 'espece_arb',
      scientific: 'nom_latin'
    },
    opentrees_id: 'agen'
  },
  {
    country: 'France',
    state: 'Nouvelle-Aquitaine',
    city: 'Bayonne',
    scope: 'Tree',
    info: 'https://open.isogeo.com/s/dfea79f9daa941fbb7fc9248309dc1c4/THU_tcV6SuOT_DsWqcQNzDenuhTV0/r/d008f16dfca74b2686f1168617cbd63a',
    download: 'https://www.bayonne.fr/fileadmin/open-data/shape/ev_arbres.zip',
    vfs: '/vsizip/',
    crosswalk: {
      genus: 'genre',
      species: 'espece',
      height: 'hauteur',
      common: 'vernaculai',
      cultivar: 'variete',
      planted: 'anne_plan',
      scientific: 'gev',
      circumference_cm: 'circonf',
      age: 'agechrono'
    },
    license: { id: 'etalab-2.0' },
    opentrees_id: 'bayonne'
  },
  {
    country: 'France',
    state: 'Nouvelle-Aquitaine',
    city: 'Bordeaux',
    scope: 'Tree',
    info: 'https://scnbdx.opendatasoft.com/explore/dataset/ec_arbre_p/information/',
    download: 'https://scnbdx.opendatasoft.com/api/explore/v2.1/catalog/datasets/ec_arbre_p/exports/geojson',
    crosswalk: {
      scientific: 'nom',
      updated: 'mdate',
      dbh: 'diametre',
      height: 'hauteur',
      family: 'famille',
      cultivar: 'variete',
      location: 'typo_espace',
      health: 'statut',
      planted: 'tranche_age'
    },
    license: { id: 'etalab-1.0' },
    opentrees_id: 'bordeaux'
  },
  {
    country: 'France',
    state: 'Nouvelle-Aquitaine',
    city: 'Pau',
    scope: 'Tree: street',
    inactive: true,
    notes: "Arbres d'alignement | Originally downloaded as a shapefile",
    download: { checksum: 'e1327d740c0b2b5dc3786f8e5a8897c9' }
  },
  {
    country: 'France',
    state: 'Nouvelle-Aquitaine',
    city: 'Pau',
    scope: 'Tree: park',
    inactive: true,
    notes: "Arbres d'ornement | Originally downloaded as a shapefile",
    download: { checksum: '1b82dd97c0d5249bde9f2725b06d1e87' }
  },
  {
    country: 'France',
    state: 'Occitanie',
    designation: 'Hérault',
    scope: 'Tree: street (main)',
    info: 'https://www.herault-data.fr/explore/dataset/arbres-dalignement-herault/information/',
    download: 'https://www.herault-data.fr/api/explore/v2.1/catalog/datasets/arbres-dalignement-herault/exports/geojson',
    license: { id: 'etalab-2.0' }
  },
  {
    country: 'France',
    state: 'Occitanie',
    city: 'Montpellier',
    scope: 'Tree: street',
    info: 'https://data.montpellier3m.fr/dataset/arbres-dalignement-de-montpellier',
    download: 'https://data.montpellier3m.fr/sites/default/files/ressources/MMM_MTP_Arbres.json',
    crosswalk: {
      ref: 'idarbre',
      scientific: 'nom_latin',
      common: 'nom_commun',
      planted: 'plantation',
      updated: 'releva',
      crown: 'couronnem',
      height: 'hauteurm'
    },
    license: { id: 'ODbL-1.0' },
    opentrees_id: 'montpellier'
  },
  {
    country: 'France',
    state: 'Occitanie',
    city: 'Toulouse',
    scope: 'Tree',
    info: 'https://data.toulouse-metropole.fr/explore/dataset/arbres-urbains/information/',
    download: 'https://data.toulouse-metropole.fr/api/explore/v2.1/catalog/datasets/arbres-urbains/exports/geojson',
    license: { id: 'etalab-2.0' }
  },
  {
    country: 'France',
    state: 'Pays de la Loire',
    city: 'Angers',
    scope: 'Tree: notable',
    info: 'https://data.angers.fr/explore/dataset/arbre-signal-angers/information/',
    download: 'https://data.angers.fr/api/explore/v2.1/catalog/datasets/arbre-signal-angers/exports/geojson',
    license: { id: 'ODbL-1.0' }
  },
  {
    omit: 'no coordinates',
    country: 'France',
    state: 'Pays de la Loire',
    city: 'Baugé-en-Anjou',
    scope: 'Tree',
    info: 'https://www.data.gouv.fr/fr/datasets/attributs-des-arbres-urbains-de-la-ville-de-bauge-en-anjou-2020',
    download: 'https://www.data.gouv.fr/fr/datasets/r/70a1aee0-2075-4568-afd1-d01a0c06462b',
    license: { id: 'etalab-2.0' }
  },
  {
    country: 'France',
    state: "Provence-Alpes-Côte d'Azur",
    city: 'Digne-les-Bains',
    scope: 'Tree: notable',
    info: 'https://trouver.datasud.fr/dataset/arbres-proteges-a-digne-les-bains',
    download: 'https://trouver.datasud.fr/dataset/c1cc1d21-eda1-445d-a47b-8b112ab2940e/resource/c7d1b71c-39c0-4bf9-99f3-06a702115721/download/digne_arbres_proteges_6cibv2q.zip',
    vfs: '/vsizip/',
    license: { id: 'etalab-2.0' }
  },
  {
    country: 'France',
    state: "Provence-Alpes-Côte d'Azur",
    city: 'Antibes',
    scope: 'Tree: notable',
    info: 'https://www.data.gouv.fr/fr/datasets/arbres-sous-protection-ponctuelle-a-antibes-juan-les-pins/',
    download: 'https://www.data.gouv.fr/fr/datasets/r/eeb83dc6-1f98-45f8-8581-21858e5561ee',
    geometry: { x: 'longitude', y: 'latitude' },
    srs: 'EPSG:2154',
    license: { id: 'etalab-2.0' }
  },
  {
    country: 'France',
    state: "Provence-Alpes-Côte d'Azur",
    city: 'Nice',
    scope: 'Tree',
    info: 'http://opendata.nicecotedazur.org/data/dataset/cartographie-des-arbres-communaux',
    download: 'http://opendata.nicecotedazur.org/data/storage/f/2022-11-22T13%3A48%3A46.449Z/ev-arbre-opendata-2022.geojson',
    crosswalk: { ref: 'idENT' },
    license: { id: 'etalab-1.0' },
    opentrees_id: 'nice'
  },
  {
    country: 'Germany',
    designation: 'Bundeseisenbahnvermögen (BEV)',
    scope: 'Tree',
    info: 'https://www.govdata.de/web/guest/suchen/-/details/baumkataster-bundeseisenbahnvermogen-bev',
    download: 'https://www.mcloud.de/downloads/mcloud/691202bd-cb41-47c7-a402-cb1d7fe280d7/Kissb_Export_Aug2022.zip',
    vfs: '/vsizip/',
    openFunc: file => {
      const buffer = helpers.readFileInZip(file, 'Kissb_Export_Aug2022.xml')
      return helpers.openKissbXmlWithGdal(buffer, {type: 'buffer'})
    },
    delFunc: x => {
      // Delete trees with wrong coordinates (east and outside of Germany)
      Number(x['Rechtswert']) > 5e6
    },
    geometry: { x: 'Rechtswert', y: 'Hochwert' },
    srs: 'EPSG:32633',
    license: { id: 'CC-BY-4.0' }
  },
  {
    country: 'Germany',
    city: 'Hamburg',
    designation: 'Hafen Hamburg',
    scope: 'Tree',
    notes: 'versioned about page',
    info: 'https://suche.transparenz.hamburg.de/dataset/strassenbaumkataster-hamburger-hafen17',
    download: 'https://geodienste.hamburg.de/HH_WFS_Strassenbaumkataster?service=WFS&version=2.0.0&request=GetFeature&typeNames=de.hh.up:strassenbaumkataster_hpa&srsName=EPSG:4326',
    crosswalk: {
      scientific: 'art_latein',
      common: 'art_deutsc',
      description: 'sorte',
      planted: 'pflanzjahr',
      crown_m: 'kronendurc',
      circumference_cm: 'stammumfan',
      owner: 'zustaendig'
    },
    license: { id: 'DL-DE-BY-2.0' },
    opentrees_id: 'hamburg_hafen'
  },
  {
    country: 'Germany',
    city: 'Hamburg',
    scope: 'Tree: street',
    notes: 'versioned about page',
    info: 'https://suche.transparenz.hamburg.de/dataset/strassenbaumkataster-hamburg25',
    download: 'https://geodienste.hamburg.de/HH_WFS_Strassenbaumkataster?service=WFS&version=2.0.0&request=GetFeature&typeNames=de.hh.up:strassenbaumkataster&srsName=EPSG:4326',
    crosswalk: {
      ref: 'baumid',
      scientific: 'art_latein',
      common: 'art_deutsch',
      planted: 'pflanzjahr',
      dbh: 'stammumfang'
    },
    license: { id: 'DL-DE-BY-2.0' },
    opentrees_id: 'hamburg'
  },
  {
    country: 'Germany',
    state: 'Baden-Württemberg',
    city: 'Karlsruhe',
    scope: 'Tree',
    info: 'https://transparenz.karlsruhe.de/dataset/fachplane-baumkataster1',
    download: {
      arcgis: 'https://geoportal.karlsruhe.de/server/rest/services/Fachplaene/Baumkataster/MapServer/1'
    },
    crosswalk: { common: 'ARTDEUT', scientific: 'ARTLAT' },
    license: { id: 'CC-BY-4.0' },
    opentrees_id: 'karlsruhe_de'
  },
  {
    country: 'Germany',
    state: 'Baden-Württemberg',
    city: 'Konstanz',
    scope: 'Tree',
    info: 'https://offenedaten-konstanz.de/dataset/baumkataster-konstanz',
    download: {
      arcgis: 'https://services-eu1.arcgis.com/cgMeYTGtzFtnxdsx/arcgis/rest/services/KN_Baumkataster_2020S/FeatureServer/87'
    },
    license: { id: 'CC-BY-4.0' }
  },
  {
    country: 'Germany',
    state: 'Baden-Württemberg',
    city: 'Ulm',
    scope: 'Tree',
    notes: 'partial',
    info: 'https://datenportal.ulm.de/client/?lang=en#/datasets/iso/01b7b3c7dec3c1b06ed8a936b5750eff21f2c9fe',
    download: 'https://datenportal.ulm.de/opendatafiles/Natur_Umwelt/20180921_Baumkataster.xlsx',
    openFunc: file => helpers.openExcelWithGdal(file, {type: 'file'}),
    geometry: { x: 'Koordinaten_X_Y', y: 'Koordinate_Y' },
    srs: 'EPSG:31467',
    crosswalk: {
      scientific: 'Baumart_botanisch',
      common: 'Baumart',
      height: 'Baumhöhe_(aktuell)',
      crown: 'Kronendurchm_(aktuell)',
      dbh: 'Stammdurchm_(aktuell)',
      health: 'Vitalitaetsstatus_(aktuell)',
      planted: 'Pflanzjahr_geschaetzt',
      updated: 'Standortermittlung_am'
    },
    license: { id: 'CC-BY-3.0-DE' },
    opentrees_id: 'ulm'
  },
  {
    country: 'Germany',
    state: 'Baden-Württemberg',
    city: 'Ulm',
    scope: 'Tree: notable',
    notes: 'partial',
    info: 'https://datenportal.ulm.de/client/?lang=en#/datasets/iso/01b7b3c7dec3c1b06ed8a936b5750eff21f2c9fe',
    download: 'https://datenportal.ulm.de/opendatafiles/Natur_Umwelt/20180921_Baumkataster_Naturdenkmal.xlsx',
    openFunc: file => helpers.openExcelWithGdal(file, {type: 'file'}),
    geometry: { x: 'Koordinaten_X_Y', y: 'Koordinate_Y' },
    srs: 'EPSG:31467',
    license: { id: 'CC-BY-3.0-DE' },
    opentrees_id: 'ulm'
  },
  {
    country: 'Germany',
    state: 'Bayern',
    city: 'Würzburg',
    scope: 'Tree',
    info: 'https://opendata.wuerzburg.de/explore/dataset/baumkataster_stadt_wuerzburg/information/',
    download: 'https://opendata.wuerzburg.de/api/explore/v2.1/catalog/datasets/baumkataster_stadt_wuerzburg/exports/geojson',
    license: { id: 'DL-DE-BY-2.0' }
  },
  {
    country: 'Germany',
    state: 'Berlin',
    city: 'Berlin',
    scope: 'Tree: street',
    info: 'https://daten.berlin.de/datensaetze/baumbestand-berlin-stra%C3%9Fenb%C3%A4ume-wfs',
    download: 'https://fbinter.stadt-berlin.de/fb/wfs/data/senstadt/s_baumbestand?service=WFS&version=2.0.0&request=GetFeature&typeNames=fis:s_baumbestand&srsName=EPSG:4326&outputFormat=application/json',
    crosswalk: {
      scientific: 'Art_Bot',
      common: 'Art_Dtsch',
      planted: 'Pflanzjahr',
      height: 'BaumHoehe',
      location: 'Kategorie'
    },
    license: { id: 'DL-DE-BY-2.0' },
    opentrees_id: 'berlin'
  },
  {
    country: 'Germany',
    state: 'Berlin',
    city: 'Berlin',
    scope: 'Tree: park',
    info: 'https://daten.berlin.de/datensaetze/baumbestand-berlin-anlagenb%C3%A4ume-wfs',
    download: 'https://fbinter.stadt-berlin.de/fb/wfs/data/senstadt/s_baumbestand_an?service=WFS&version=2.0.0&request=GetFeature&typeNames=fis:s_baumbestand_an&srsName=EPSG:4326&outputFormat=application/json',
    license: { id: 'DL-DE-BY-2.0' },
    opentrees_id: 'berlin'
  },
  {
    country: 'Germany',
    state: 'Brandenburg',
    city: 'Kloster Lehnin',
    scope: 'Tree',
    info: 'https://data.europa.eu/data/datasets/75fe4dcb-91c5-4251-8f0e-5ac8aa3a6bde',
    download: 'https://www.geoportal-klosterlehnin.de/isk/lehn_baumkataster?service=WFS&version=2.0.0&request=GetFeature&typeNames=ms:baeume&srsName=EPSG:4326'
  },
  {
    country: 'Germany',
    state: 'Hessen',
    city: 'Frankfurt',
    scope: 'Tree',
    notes: 'New download URL added annually',
    info: 'http://www.offenedaten.frankfurt.de/dataset/baumkataster-frankfurt-am-main',
    download: 'https://offenedaten.frankfurt.de/dataset/73c5a6b3-c033-4dad-bb7d-8783427dd233/resource/257690bb-f40a-4e3a-93da-1310214f392f/download/baumauswahl.csv',
    coordsFunc: x => {
      // HOCHWERT: 5549510,9 | RECHTSWERT: 473366,239
      return [
        Number(x['RECHTSWERT'].replace(',', '.')),
        Number(x['HOCHWERT'].replace(',', '.'))
      ]
    },
    srs: 'EPSG:3044',
    crosswalk: {
      scientific: x => String(x.Gattung_Ar).split(', ')[0],
      common: x => String(x.Gattung_Ar).split(', ')[1],
      ref: 'Baumnummer',
      planted: 'Pflanzjahr',
      crown: 'Kronendurc'
    },
    license: { id: 'DL-DE-BY-1.0' },
    opentrees_id: 'frankfurt'
  },
  {
    country: 'Germany',
    state: 'Mecklenburg-Vorpommern',
    city: 'Rostock',
    scope: 'Tree',
    notes: 'Less coverage (city only) but has more structural attributes than https://www.govdata.de/web/guest/suchen/-/details/baume',
    info: 'https://www.opendata-hro.de/dataset/baeume',
    download: 'https://geo.sv.rostock.de/download/opendata/baeume/baeume.json',
    crosswalk: {
      scientific: 'gattung_botanisch',
      common: 'gattung_deutsch',
      height: 'hoehe',
      crown: 'kronendurchmesser',
      dbh: 'stammdurchmesser',
      location: 'allebaum'
    },
    license: { id: 'CC0-1.0' },
    opentrees_id: 'rostock'
  },
  {
    country: 'Germany',
    state: 'Mecklenburg-Vorpommern',
    city: 'Rostock',
    scope: 'Tree',
    notes: 'More coverage (includes university) and has species, but missing structural attributes from https://www.opendata-hro.de/dataset/baeume',
    info: 'https://www.govdata.de/web/guest/suchen/-/details/baume',
    download: 'https://geo.sv.rostock.de/inspire/lcv-trees/download?service=WFS&version=2.0.0&request=GetFeature&typeNames=lcv:LandCoverUnit&srsName=EPSG:4326',
    license: { id: 'CC0-1.0' },
    opentrees_id: 'rostock'
  },
  {
    country: 'Germany',
    state: 'Nordrhein-Westfalen',
    city: 'Bergheim',
    scope: 'Tree',
    notes: 'CSV and XLSX files do not have coordinates',
    info: 'https://offenedaten.kdvz.nrw/dataset/d30-baumkataster-der-kreisstadt-bergheim',
    download: 'https://offenedaten.kdvz.nrw/sites/default/files/Einzelbaumbestand_Bergheim_2021-05-15.zip',
    vfs: '/vsizip/',
    license: { id: 'DL-DE-ZERO-2.0' }
  },
  {
    country: 'Germany',
    state: 'Nordrhein-Westfalen',
    city: 'Bielefeld',
    scope: 'Tree',
    info: 'https://open-data.bielefeld.de/dataset/baumbestand-umweltbetrieb',
    download: 'https://www.bielefeld01.de/md/WFS/baumstandorte/01?service=WFS&version=2.0.0&request=GetFeature&typeNames=ms:einzelbaeume_p&srsName=EPSG:4326&outputFormat=application/json;+subtype=geojson',
    license: { id: 'CC-BY-4.0' }
  },
  {
    country: 'Germany',
    state: 'Nordrhein-Westfalen',
    city: 'Bielefeld',
    scope: 'Tree',
    notes: 'tree groups',
    info: 'https://open-data.bielefeld.de/dataset/baumbestand-umweltbetrieb',
    download: 'https://www.bielefeld01.de/md/WFS/baumstandorte/01?service=WFS&version=2.0.0&request=GetFeature&typeNames=ms:baumgruppe_p&srsName=EPSG:4326&outputFormat=application/json;+subtype=geojson',
    license: { id: 'CC-BY-4.0' }
  },
  {
    country: 'Germany',
    state: 'Nordrhein-Westfalen',
    city: 'Bonn',
    scope: 'Tree',
    info: 'https://opendata.bonn.de/dataset/baumstandorte',
    download: 'https://stadtplan.bonn.de/geojson?Thema=21367',
    crosswalk: { ref: 'baum_id', scientific: 'lateinisch', common: 'deutscher_' },
    license: { id: 'CC0-1.0' },
    opentrees_id: 'bonn'
  },
  {
    country: 'Germany',
    state: 'Nordrhein-Westfalen',
    city: 'Gelsenkirchen',
    scope: 'Tree',
    info: 'https://opendata.ruhr/dataset/baumkataster-gelsenkirchen1',
    download: 'https://opendata.ruhr/dataset/388b1546-ff4d-49b9-8b2d-deee5ed88242/resource/45f439e7-cb44-4a51-8129-b063f2105a09/download/baumkataster-gelsenkirchen1-coe2vtx_.zip',
    vfs: '/vsizip/',
    filename: 'baumkataster-gelsenkirchen.csv',
    coordsFunc: x => {
      // X: 360984,48, Y: 5721009,33
      return [
        Number(x['X'].replace(',', '.')),
        Number(x['Y'].replace(',', '.'))
      ]
    },
    srs: 'EPSG:3044',
    crosswalk: {
      scientific: 'BAUMART',
      planted: 'PFLANZJAHR',
      crown: 'KRONENDURCHMESSER',
      height: 'HOEHE',
      ref: 'BAUMID'
    },
    license: { id: 'DL-DE-BY-2.0' },
    opentrees_id: 'gelsenkirchen_de'
  },
  {
    country: 'Germany',
    state: 'Nordrhein-Westfalen',
    city: 'Köln',
    scope: 'Tree',
    info: 'https://offenedaten-koeln.de/dataset/baumkataster-koeln',
    download: 'https://offenedaten-koeln.de/sites/default/files/20200610_Baumbestan_Koeln.zip',
    vfs: '/vsizip/',
    srs: 'EPSG:3044',
    crosswalk: {
      ref: 'Baum-Nr.',
      crown: 'KRONE',
      height: 'HöHE',
      age: 'AlterSchätzung',
      genus: 'Gattung',
      species: 'Art',
      common: 'DeutscherN'
    },
    license: { id: 'DL-DE-ZERO-2.0' },
    opentrees_id: 'koeln'
  },
  {
    country: 'Germany',
    state: 'Nordrhein-Westfalen',
    city: 'Krefeld',
    scope: 'Tree',
    info: 'https://www.offenesdatenportal.de/dataset/baumstandorte-der-stadt-krefeld',
    download: 'https://gisdata.krzn.de/files/opendatagis/Stadt_Krefeld/Aktueller_Baumbestand.kml',
    license: { id: 'DL-DE-ZERO-2.0' },
    crosswalk: {
      ref: x => x['Description'].match(/<th>BAUMNUMMER<\/th> <td>([^<]+)<\/td>/)?.[1],
      scientific: x => x['Description'].match(/<th>BOTANISCHER_NAME<\/th> <td>([^<]+)<\/td>/)?.[1],
      name: x => x['Description'].match(/<th>BAUMART<\/th> <td>([^<]+)<\/td>/)?.[1],
      planted: x => x['Description'].match(/<th>PFLANZJAHR<\/th> <td>([^<]+)<\/td>/)?.[1]
    },
    notes: 'Using KML as GeoJSON file is truncated',
    opentrees_id: 'krefeld_de'
  },
  {
    country: 'Germany',
    state: 'Nordrhein-Westfalen',
    city: 'Moers',
    scope: 'Tree',
    info: 'https://www.offenesdatenportal.de/dataset/baume-und-straucher-in-bebauten-ortslagen',
    download: 'https://www.offenesdatenportal.de/dataset/cc69db13-f6b9-4319-9ee6-3f385dc7d944/resource/6c36f4a2-560e-4689-93cc-6af845247c38/download/baumstrauch.json',
    crosswalk: {
      description: x => x.ART ? x.ART.replace(/�/, 'ß') : null,
      location: x => x.ART === 'Laubbaum_Stra�enbaum' ? 'street' : null,
      edible: x => x.ART === 'Laubbaum_Obstbaum' ? 'fruit' : null
    },
    license: { id: 'DL-DE-ZERO-2.0' },
    opentrees_id: 'moers_de'
  },
  {
    country: 'Germany',
    state: 'Nordrhein-Westfalen',
    city: 'Münster',
    scope: 'Tree',
    info: 'https://opendata.stadt-muenster.de/dataset/digitales-baumkataster-m%C3%BCnster',
    download: 'https://www.stadt-muenster.de/ows/mapserv706/odgruenserv?service=WFS&version=2.0.0&request=GetFeature&typeNames=ms:Baeume&srsName=EPSG:4326&outputFormat=GEOJSON',
    license: { id: 'DL-DE-BY-2.0' }
  },
  {
    country: 'Germany',
    state: 'Nordrhein-Westfalen',
    city: 'Troisdorf',
    scope: 'Tree',
    info: 'http://www.stadtplan.troisdorf.de/opengeodata/opendata/open_data_baumkataster.html',
    download: 'http://www.stadtplan.troisdorf.de/opengeodata/opendata/data/Troisdorf_Baumkataster.zip',
    vfs: '/vsizip/',
    filename: 'Troisdorf_Baumkataster/Troisdorf_Baumkataster_220909.csv',
    coordsFunc: x => [Number(x['X-Koordinate'].replace(',', '.')), Number(x['Y-Koordinate'].replace(',', '.'))],
    crosswalk: {
      height: 'Baumhoehe',
      scientific: x => x.Baumart.split(', ')[0],
      common: x => x.Baumart.split(', ')[1],
      crown: 'Kronendurchmesser',
      dbh: 'Stammumfang'
    },
    license: { id: 'DL-DE-ZERO-2.0' },
    opentrees_id: 'troisdorf_de'
  },
  {
    country: 'Germany',
    state: 'Nordrhein-Westfalen',
    city: 'Wesel',
    scope: 'Tree',
    info: 'https://www.offenesdatenportal.de/dataset/05170048_0099',
    download: 'https://geoportal.wesel.de/opendata/Baumkataster/Baumkataster.geojson',
    crosswalk: {
      ref: 'ID',
      scientific: x => String(x.GA_LANG).split(', ')[0],
      common: x => String(x.GA_LANG).split(', ')[1],
      crown: 'KR_DURCHM',
      dbh: 'ST_UMFANG',
      height: 'BAUMHOEHE'
    },
    license: { id: 'DL-DE-ZERO-2.0' },
    opentrees_id: 'wesel'
  },
  {
    country: 'Germany',
    state: 'Sachsen',
    city: 'Chemnitz',
    scope: 'Tree',
    info: 'http://portal-chemnitz.opendata.arcgis.com/datasets/baeume/about',
    download: {
      arcgis: 'https://services6.arcgis.com/jiszdsDupTUO3fSM/arcgis/rest/services/Baeume_FL_1/FeatureServer/0'
    },
    crosswalk: {
      ref: 'BaumNummer',
      scientific: x => String(x.BaumArt).split(', ')[0],
      common: x => String(x.BaumArt).split(', ')[1],
      planted: 'PflanzDatu'
    },
    license: { id: 'DL-DE-BY-2.0' },
    opentrees_id: 'chemnitz'
  },
  {
    country: 'Germany',
    state: 'Sachsen',
    city: 'Delitzsch',
    scope: 'Tree',
    inactive: true,
    download: { checksum: '632c9c8f4706a03ee47e1aebfd64bb0a' },
    geometry: { x: 'x', y: 'y' },
    srs: 'EPSG:4326'
  },
  {
    country: 'Germany',
    state: 'Sachsen',
    city: 'Leipzig',
    scope: 'Tree',
    info: [
      'https://opendata.leipzig.de/dataset/baumkataster-stadt-leipzig1',
      'https://opendata.leipzig.de/pages/usage'
    ],
    download: 'https://geodienste.leipzig.de/l3/OpenData/wfs?VERSION=1.3.0&REQUEST=getFeature&typeName=OpenData%3ABaeume&format_options=filename:Baumkataster_Stadt_Leipzig&outputFormat=gpkg',
    vfs: '/vsizip/',
    crosswalk: {
      scientific: 'Baumart_wi',
      common: 'Baumart_de',
      planted: 'Pflanzjahr',
      ref: 'STANDORTNR'
    },
    license: { id: 'DL-DE-BY-2.0' },
    opentrees_id: 'leipzig'
  },
  {
    country: 'Germany',
    state: 'Sachsen-Anhalt',
    city: 'Halle',
    scope: 'Tree',
    info: [
      'https://webapp.halle.de/komgis30.hal.opendata/fa3930b7-b3ed-b3fc-20d9-2fc8fd054b0e.html',
      'https://halle.de/verwaltung-stadtrat/stadtverwaltung/online-angebote/open-data-portal/nutzungsbedingungen-und-lizenzen'
    ],
    download: 'https://geodienste.halle.de/opendata/fa3930b7-b3ed-b3fc-20d9-2fc8fd054b0e?service=WFS&version=1.0.0&request=GetFeature&typeName=fa3930b7-b3ed-b3fc-20d9-2fc8fd054b0e&srsName=EPSG:4326',
    crosswalk: {
      planted: 'pflanzjahr',
      crown: 'krone_m',
      height: 'hoehe_m',
      ref: 'baum_nr',
      scientific: 'art_botan',
      common: 'art_deut'
    },
    license: { id: 'CC-BY-3.0-DE' },
    opentrees_id: 'halle'
  },
  {
    country: 'Germany',
    state: 'Sachsen-Anhalt',
    city: 'Magdeburg',
    scope: 'Tree',
    info: 'https://www.magdeburg.de/Start/B%C3%BCrger-Stadt/Verwaltung-Service/Offene-Verwaltungsdaten/index.php?NavID=37.906&object=tx%7C37.12819.1&La=1&',
    download: 'https://www.magdeburg.de/media/custom/698_16063_1.ZIP?1684231298',
    vfs: '/vsizip/',
    license: { id: 'DL-DE-BY-2.0' }
  },
  {
    country: 'Germany',
    state: 'Schleswig-Holstein',
    city: 'Elmshorn',
    scope: 'Tree: street',
    info: 'https://opendata.schleswig-holstein.de/dataset/strassenbaume-der-stadt-elmshorn-gdimrh',
    download: 'https://opendatarepo.lsh.uni-kiel.de/data/elmshorn/Stra%C3%9Fenbaeume/Stra%C3%9Fenbaeume.zip',
    vfs: '/vsizip/',
    license: { id: 'DL-DE-ZERO-2.0' }
  },
  {
    country: 'Germany',
    state: 'Schleswig-Holstein',
    city: 'Norderstedt',
    scope: 'Tree',
    info: 'https://opendata.schleswig-holstein.de/collection/norderstedt-baumkataster/aktuell',
    download: 'https://opendata.schleswig-holstein.de/dataset/1b8a9db8-430c-45e6-ae7b-e12a6a8fa8d0/resource/07de8283-da37-44c0-9591-6885464c370b/download/07_baume.csv',
    geometry: { x: 'X', y: 'Y' },
    srs: 'EPSG:32632',
    license: { id: 'DL-DE-ZERO-2.0' }
  },
  {
    country: 'Germany',
    state: 'Thüringen',
    city: 'Jena',
    scope: 'Tree',
    info: 'https://opendata.jena.de/dataset/baumkataster',
    download: 'https://opendata.jena.de/dataset/acd67e0c-b597-48c7-b251-1b565c49de90/resource/f245ce6a-71b9-458e-b4e8-dea3fa6c3ab5/download/baumkataster.geojson',
    srs: 'EPSG:3044',
    crosswalk: {
      height: 'baumhoehe',
      ref: 'baumnummer',
      scientific: 'ga_lang',
      dbh: 'st_umfang',
      health: 'vitalitaet'
    },
    license: { id: 'DL-DE-BY-2.0' },
    opentrees_id: 'jena_de'
  },
  {
    country: 'Greece',
    state: 'Makedhonía',
    city: 'Thessaloniki',
    designation: 'A',
    scope: 'Tree',
    info: 'https://opendata.thessaloniki.gr/el/dataset/διαχείριση-αστικού-πρασίνου-δήμου-θεσσαλονίκης',
    download: 'https://opendata.thessaloniki.gr/sites/default/files/add.csv',
    geometry: { x: 'lon', y: 'lat' },
    srs: 'EPSG:4326',
    license: { id: 'ODbL-1.0' }
  },
  {
    country: 'Greece',
    state: 'Makedhonía',
    city: 'Thessaloniki',
    designation: 'B',
    scope: 'Tree',
    info: 'https://opendata.thessaloniki.gr/el/dataset/διαχείριση-αστικού-πρασίνου-δήμου-θεσσαλονίκης',
    download: 'https://opendata.thessaloniki.gr/sites/default/files/bdd_0.csv',
    geometry: { x: 'lon', y: 'lat' },
    srs: 'EPSG:4326',
    license: { id: 'ODbL-1.0' }
  },
  {
    country: 'Greece',
    state: 'Makedhonía',
    city: 'Thessaloniki',
    designation: 'C',
    scope: 'Tree',
    info: 'https://opendata.thessaloniki.gr/el/dataset/διαχείριση-αστικού-πρασίνου-δήμου-θεσσαλονίκης',
    download: 'https://opendata.thessaloniki.gr/sites/default/files/cdd.csv',
    geometry: { x: 'lon', y: 'lat' },
    srs: 'EPSG:4326',
    license: { id: 'ODbL-1.0' }
  },
  {
    country: 'Greece',
    state: 'Makedhonía',
    city: 'Thessaloniki',
    designation: 'D',
    scope: 'Tree',
    info: 'https://opendata.thessaloniki.gr/el/dataset/διαχείριση-αστικού-πρασίνου-δήμου-θεσσαλονίκης',
    download: 'https://opendata.thessaloniki.gr/sites/default/files/ddd.csv',
    geometry: { x: 'lon', y: 'lat' },
    srs: 'EPSG:4326',
    license: { id: 'ODbL-1.0' }
  },
  {
    country: 'Greece',
    state: 'Makedhonía',
    city: 'Thessaloniki',
    designation: 'E',
    scope: 'Tree',
    info: 'https://opendata.thessaloniki.gr/el/dataset/διαχείριση-αστικού-πρασίνου-δήμου-θεσσαλονίκης',
    download: 'https://opendata.thessaloniki.gr/sites/default/files/edd.csv',
    geometry: { x: 'lon', y: 'lat' },
    srs: 'EPSG:4326',
    license: { id: 'ODbL-1.0' }
  },
  {
    country: 'Indonesia',
    state: 'Bali',
    city: 'Denpasar',
    scope: 'Tree: park',
    info: 'https://katalog.data.go.id/dataset/inven-pohon',
    download: 'https://satudata.denpasarkota.go.id/dataset/dea98874-b70b-4c05-a0eb-496af843910b/resource/ebcc9baf-5027-41b4-b84c-99b86e2cdc8d/download/geoportal.zip',
    vfs: '/vsizip/'
  },
  {
    country: 'Ireland',
    scope: 'Tree: notable',
    info: 'https://maps.biodiversityireland.ie/Dataset/27',
    download: 'https://maps.biodiversityireland.ie/Dataset/Download?datasetId=27',
    openFunc: file => {
      buffer = helpers.readFileInZip(file, 'HeritageTreesOfIreland.txt')
      return helpers.openExcelWithGdal(buffer, {type: 'buffer'})
    },
    vfs: '/vsizip/',
    filename: 'HeritageTreesOfIreland.txt',
    geometry: { x: 'East', y: 'North' },
    srs: 'EPSG:29903',
    license: { id: 'CC-BY-4.0' }
  },
  {
    country: 'Ireland',
    state: 'Dublin',
    designation: 'Fingal County',
    scope: 'Tree',
    info: 'https://data.fingal.ie/datasets/FingalCoCo::trees-fcc-1/about',
    download: {
      arcgis: 'https://services5.arcgis.com/CI1e5PKQXvJgmJK8/arcgis/rest/services/Trees_FCC/FeatureServer/0'
    },
    crosswalk: {
      ref: x => Math.round(x.TREE_ID),
      scientific: 'Species_Desc',
      common: 'Common_Name',
      maturity: 'Age_Desc',
      height: 'Height',
      crown: 'Spread',
      dbh: x => (x['Actual_Trunk'] || '').replace('cm', ''),
      health: 'Condition'
    },
    opentrees_id: 'fingal'
  },
  {
    country: 'Ireland',
    state: 'Dublin',
    city: 'Dublin',
    scope: 'Tree: street',
    notes: 'submitted by Tine Ningal | Submitted by Tine Ningal | Limited to public street trees in the city center',
    info: 'https://logmytree.blogspot.com/2012/10/inventory-of-dublins-urban-trees.html',
    download: { checksum: '5fd67920498bb66de0493a6a71195a94' },
    vfs: '/vsizip/',
    license: { id: 'CC-BY-NC-SA-4.0' },
    fallingfruit_id: 265
  },
  {
    country: 'Israel',
    designation: 'Israel Oak Association',
    scope: 'Tree: notable',
    info: 'https://www.arcgis.com/home/item.html?id=d2cd75c9ac4f40748cd3bea0719730ef',
    download: {
      arcgis: 'https://services8.arcgis.com/zQk64pz1ixL4yBfJ/ArcGIS/rest/services/OakSurvey/FeatureServer/0'
    }
  },
  {
    country: 'Israel',
    scope: 'Tree: notable',
    info: 'https://data1-moag.opendata.arcgis.com/datasets/moag::%D7%A2%D7%A6%D7%99-%D7%9E%D7%95%D7%A8%D7%A9%D7%AA-3/about',
    download: {
      arcgis: 'https://services3.arcgis.com/Fqk0gVrfcnumlR5m/arcgis/rest/services/MOAG_Heritage_Trees/FeatureServer/0'
    }
  },
  {
    country: 'Israel',
    state: 'Haifa',
    city: 'Ramat Hanadiv',
    scope: 'Tree: park',
    info: 'https://ramathanadiv.maps.arcgis.com/home/item.html?id=62d2e7f6cd7f486799fc728de48eb1d0',
    download: {
      arcgis: 'https://services1.arcgis.com/8lB32dT1LAPsoSlg/arcgis/rest/services/MemorialGardenTrees/FeatureServer/0'
    }
  },
  {
    country: 'Israel',
    state: 'Haifa',
    city: 'Ramat Hanadiv',
    scope: 'Plant: park',
    info: 'https://ramathanadiv.maps.arcgis.com/home/item.html?id=5d28feec7bc04d8290c6cbef39bbdf42',
    download: {
      arcgis: 'https://services1.arcgis.com/8lB32dT1LAPsoSlg/arcgis/rest/services/Plant_Center__View/FeatureServer/0'
    }
  },
  {
    country: 'Israel',
    state: 'South',
    city: "Be'er Sheva",
    scope: 'Tree',
    info: 'https://data.gov.il/dataset/trees-br7',
    download: 'https://data.gov.il/dataset/trees-br7/resource/d4c483d1-42b7-4540-b434-525197f3e916/download/trees.geojson',
    terms: 'אחר (פתוח)'
  },
  {
    country: 'Italy',
    state: 'Abruzzo',
    scope: 'Tree: notable',
    notes: 'May replace all other regional notable tree lists',
    info: 'https://www.politicheagricole.it/flex/cm/pages/ServeBLOB.php/L/IT/IDPagina/11260#id-bed7384af14fdba2da436d64155c62b1',
    download: 'https://www.politicheagricole.it/flex/cm/pages/ServeAttachment.php/L/IT/D/1%252Ff%252F0%252FD.de8c0df992b975a06b0c/P/BLOB%3AID%3D11260/E/xls?mode=download',
    openFunc: file => helpers.openExcelWithGdal(file, {type: 'file'}),
    coordsFunc: x => {
      // LONGITUDINE SU GIS: 14° 20' 34,97'' | LATITUDINE SU GIS': 42° 05' 14,02''
      const pattern = /(?<deg>[0-9]+)°\s*(?<min>[0-9]+)'\s*(?<sec>[0-9\,]+)''/
      return [
        helpers.parseDecimalFromDMS(x['LONGITUDINE SU GIS'], pattern),
        helpers.parseDecimalFromDMS(x['LATITUDINE SU GIS'], pattern)
      ]
    },
    srs: 'EPSG:4326',
    license: { id: 'CC-BY-4.0' }
  },
  {
    country: 'Italy',
    state: 'Basilicata',
    scope: 'Tree: notable',
    notes: 'May replace all other regional notable tree lists',
    info: 'https://www.politicheagricole.it/flex/cm/pages/ServeBLOB.php/L/IT/IDPagina/11260#id-bed7384af14fdba2da436d64155c62b1',
    download: 'https://www.politicheagricole.it/flex/cm/pages/ServeAttachment.php/L/IT/D/1%252F9%252Fe%252FD.ba0b582ebb6525a4746d/P/BLOB%3AID%3D11260/E/xls?mode=download',
    openFunc: file => helpers.openExcelWithGdal(file, {type: 'file'}),
    coordsFunc: x => {
      // LONGITUDINE SU GIS: 14° 20' 34,97'' | LATITUDINE SU GIS': 42° 05' 14,02''
      const pattern = /(?<deg>[0-9]+)°\s*(?<min>[0-9]+)'\s*(?<sec>[0-9\,]+)''/
      return [
        helpers.parseDecimalFromDMS(x['LONGITUDINE SU GIS'], pattern),
        helpers.parseDecimalFromDMS(x['LATITUDINE SU GIS'], pattern)
      ]
    },
    srs: 'EPSG:4326',
    license: { id: 'CC-BY-4.0' }
  },
  {
    country: 'Italy',
    state: 'Basilicata',
    scope: 'Tree: notable',
    info: 'https://www.dati.gov.it/view-dataset/dataset?id=dd224126-b7fb-4ec1-a985-fd9923c7543c',
    download: 'https://rsdi.regione.basilicata.it/rbgeoserver2016/siti_protetti/beni_paesaggistici_art143_alberi_monumentali/wfs?service=WFS&version=2.0.0&request=GetFeature&typeNames=siti_protetti:beni_paesaggistici_art143_alberi_monumentali&srsName=EPSG:4326&outputFormat=application/json',
    license: { id: 'IODL-2.0' }
  },
  {
    country: 'Italy',
    state: 'Basilicata',
    city: 'Matera',
    scope: 'Tree',
    info: 'http://dati.comune.matera.it/dataset/sistema-informativo-verde-pubblico-alberature-censite-al-28-02-2022',
    download: 'http://dati.comune.matera.it/dataset/c8a8dec9-dbb3-44a1-8949-4fbec59747b6/resource/21e9dd0a-459b-40cf-bc8e-735baa916432/download/alberi_matera.geojson',
    license: { id: 'CC-BY-4.0' }
  },
  {
    country: 'Italy',
    state: 'Bolzano',
    scope: 'Tree: notable',
    notes: 'May replace all other regional notable tree lists',
    info: 'https://www.politicheagricole.it/flex/cm/pages/ServeBLOB.php/L/IT/IDPagina/11260#id-bed7384af14fdba2da436d64155c62b1',
    download: 'https://www.politicheagricole.it/flex/cm/pages/ServeAttachment.php/L/IT/D/1%252F4%252F7%252FD.dbb7d663851165b2c3c6/P/BLOB%3AID%3D11260/E/xls?mode=download',
    openFunc: file => helpers.openExcelWithGdal(file, {type: 'file'}),
    coordsFunc: x => {
      // LONGITUDINE SU GIS: 14° 20' 34,97'' | LATITUDINE SU GIS': 42° 05' 14,02''
      const pattern = /(?<deg>[0-9]+)°\s*(?<min>[0-9]+)'\s*(?<sec>[0-9\,]+)''/
      return [
        helpers.parseDecimalFromDMS(x['LONGITUDINE SU GIS'], pattern),
        helpers.parseDecimalFromDMS(x['LATITUDINE SU GIS'], pattern)
      ]
    },
    srs: 'EPSG:4326',
    license: { id: 'CC-BY-4.0' }
  },
  {
    country: 'Italy',
    state: 'Calabria',
    scope: 'Tree: notable',
    notes: 'May replace all other regional notable tree lists',
    info: 'https://www.politicheagricole.it/flex/cm/pages/ServeBLOB.php/L/IT/IDPagina/11260#id-bed7384af14fdba2da436d64155c62b1',
    download: 'https://www.politicheagricole.it/flex/cm/pages/ServeAttachment.php/L/IT/D/1%252F9%252F0%252FD.041225522ae7e3df696b/P/BLOB%3AID%3D11260/E/xls?mode=download',
    openFunc: file => helpers.openExcelWithGdal(file, {type: 'file'}),
    coordsFunc: x => {
      // LONGITUDINE SU GIS: 14° 20' 34,97'' | LATITUDINE SU GIS': 42° 05' 14,02''
      const pattern = /(?<deg>[0-9]+)°\s*(?<min>[0-9]+)'\s*(?<sec>[0-9\,]+)''/
      return [
        helpers.parseDecimalFromDMS(x['LONGITUDINE SU GIS'], pattern),
        helpers.parseDecimalFromDMS(x['LATITUDINE SU GIS'], pattern)
      ]
    },
    srs: 'EPSG:4326',
    license: { id: 'CC-BY-4.0' }
  },
  {
    country: 'Italy',
    state: 'Campania',
    scope: 'Tree: notable',
    notes: 'May replace all other regional notable tree lists',
    info: 'https://www.politicheagricole.it/flex/cm/pages/ServeBLOB.php/L/IT/IDPagina/11260#id-bed7384af14fdba2da436d64155c62b1',
    download: 'https://www.politicheagricole.it/flex/cm/pages/ServeAttachment.php/L/IT/D/1%252Fc%252Ff%252FD.6805e2b3c602f883f604/P/BLOB%3AID%3D11260/E/xls?mode=download',
    openFunc: file => helpers.openExcelWithGdal(file, {type: 'file'}),
    coordsFunc: x => {
      // LONGITUDINE SU GIS: 14° 20' 34,97'' | LATITUDINE SU GIS': 42° 05' 14,02''
      const pattern = /(?<deg>[0-9]+)°\s*(?<min>[0-9]+)'\s*(?<sec>[0-9\,]+)''/
      return [
        helpers.parseDecimalFromDMS(x['LONGITUDINE SU GIS'], pattern),
        helpers.parseDecimalFromDMS(x['LATITUDINE SU GIS'], pattern)
      ]
    },
    srs: 'EPSG:4326',
    license: { id: 'CC-BY-4.0' }
  },
  {
    country: 'Italy',
    state: 'Campania',
    scope: 'Tree: notable',
    info: 'https://dati.regione.campania.it/catalogo/datasetdetail/9302d9c8-a00b-42a8-be5e-f6f83114803d',
    download: 'https://dati.regione.campania.it/catalogo/resources/Alberi-Monumentali-Della-Campania.geojson',
    license: { id: 'CC-BY-4.0' }
  },
  {
    country: 'Italy',
    state: 'Emilia Romagna',
    scope: 'Tree: notable',
    notes: 'May replace all other regional notable tree lists',
    info: 'https://www.politicheagricole.it/flex/cm/pages/ServeBLOB.php/L/IT/IDPagina/11260#id-bed7384af14fdba2da436d64155c62b1',
    download: 'https://www.politicheagricole.it/flex/cm/pages/ServeAttachment.php/L/IT/D/1%252F2%252F6%252FD.21dda2031bb316631710/P/BLOB%3AID%3D11260/E/xls?mode=download',
    openFunc: file => helpers.openExcelWithGdal(file, {type: 'file'}),
    coordsFunc: x => {
      // LONGITUDINE SU GIS: 14° 20' 34,97'' | LATITUDINE SU GIS': 42° 05' 14,02''
      const pattern = /(?<deg>[0-9]+)°\s*(?<min>[0-9]+)'\s*(?<sec>[0-9\,]+)''/
      return [
        helpers.parseDecimalFromDMS(x['LONGITUDINE SU GIS'], pattern),
        helpers.parseDecimalFromDMS(x['LATITUDINE SU GIS'], pattern)
      ]
    },
    srs: 'EPSG:4326',
    license: { id: 'CC-BY-4.0' }
  },
  {
    country: 'Italy',
    state: 'Emilia-Romagna',
    city: 'Bologna',
    scope: 'Tree',
    info: 'https://opendata.comune.bologna.it/explore/dataset/alberi-manutenzioni/information/',
    download: 'https://opendata.comune.bologna.it/api/explore/v2.1/catalog/datasets/alberi-manutenzioni/exports/geojson',
    crosswalk: {
      scientific: 'decodifi_4',
      circumference_cm_min: x => {
        let match = x['decodifi_2'].match(/^([0-9]+)\s*-\s*[0-9]+|^>\s*([0-9]+)/)
        if (match) return match[1] | match[2]
        else if (x['decodifi_2'].match(/^<\s*[0-9]+/)) return 0
      },
      circumference_cm_max: x => {
        let match = x['decodifi_2'].match(/^[0-9]+\s*-\s*([0-9]+)|^<\s*([0-9]+)/)
        if (match) return match[1] | match[2]
      },
      ref: 'NUM_PT'
    },
    license: { id: 'CC-BY-4.0' },
    opentrees_id: 'bologna_it'
  },
  {
    country: 'Italy',
    state: 'Emilia-Romagna',
    city: 'Ferrara',
    scope: 'Tree',
    info: 'https://dati.comune.fe.it/dataset/rilievo-alberature-ferraratua',
    download: 'https://sit.comune.fe.it/geoserverckan/Ferrara/Rilievo_alberature_FerraraTUA_preview/wfs?service=WFS&version=2.0.0&request=GetFeature&typeNames=Ferrara:Rilievo_alberature_FerraraTUA_preview&srsName=EPSG:4326&outputFormat=application/json',
    license: { id: 'CC-BY-4.0' }
  },
  {
    country: 'Italy',
    state: 'Friuli Venezia Giulia',
    scope: 'Tree: notable',
    notes: 'May replace all other regional notable tree lists',
    info: 'https://www.politicheagricole.it/flex/cm/pages/ServeBLOB.php/L/IT/IDPagina/11260#id-bed7384af14fdba2da436d64155c62b1',
    download: 'https://www.politicheagricole.it/flex/cm/pages/ServeAttachment.php/L/IT/D/1%252F6%252F3%252FD.c2dbeae84478a7d2130b/P/BLOB%3AID%3D11260/E/xls?mode=download',
    openFunc: file => helpers.openExcelWithGdal(file, {type: 'file'}),
    coordsFunc: x => {
      // LONGITUDINE SU GIS: 14° 20' 34,97'' | LATITUDINE SU GIS': 42° 05' 14,02''
      const pattern = /(?<deg>[0-9]+)°\s*(?<min>[0-9]+)'\s*(?<sec>[0-9\,]+)''/
      return [
        helpers.parseDecimalFromDMS(x['LONGITUDINE SU GIS'], pattern),
        helpers.parseDecimalFromDMS(x['LATITUDINE SU GIS'], pattern)
      ]
    },
    srs: 'EPSG:4326',
    license: { id: 'CC-BY-4.0' }
  },
  {
    country: 'Italy',
    state: 'Friuli Venezia Giulia',
    scope: 'Tree: notable',
    info: 'https://geodati.gov.it/resource/id/r_friuve:m10728-cc-i11037',
    download: 'https://irdat.regione.fvg.it/Distributore/download?idDset=11037&idFmt=383&type=wfs&path=PPR:v_alberi_monumentali_e_notevoli',
    vfs: '/vsizip/'
  },
  {
    country: 'Italy',
    state: 'Friuli Venezia Giulia',
    city: 'Villa Manin',
    scope: 'Tree',
    info: 'https://www.dati.friuliveneziagiulia.it/dataset/Alberi-di-Villa-Manin/uqpq-dr8x',
    download: 'https://www.dati.friuliveneziagiulia.it/api/views/uqpq-dr8x/rows.csv',
    geometry: { x: 'coord long', y: 'coord lat' },
    srs: 'EPSG:4326',
    crosswalk: {
      location: 'dove',
      scientific: 'specie',
      family: 'familia',
      updated: 'data rilievo'
    },
    license: { id: 'IODL-2.0' },
    opentrees_id: 'villa_manin_it'
  },
  {
    country: 'Italy',
    state: 'Lazio',
    scope: 'Tree: notable',
    notes: 'May replace all other regional notable tree lists',
    info: 'https://www.politicheagricole.it/flex/cm/pages/ServeBLOB.php/L/IT/IDPagina/11260#id-bed7384af14fdba2da436d64155c62b1',
    download: 'https://www.politicheagricole.it/flex/cm/pages/ServeAttachment.php/L/IT/D/1%252Fd%252F2%252FD.ef535a231096a0e02690/P/BLOB%3AID%3D11260/E/xls?mode=download',
    openFunc: file => helpers.openExcelWithGdal(file, {type: 'file'}),
    coordsFunc: x => {
      // LONGITUDINE SU GIS: 14° 20' 34,97'' | LATITUDINE SU GIS': 42° 05' 14,02''
      const pattern = /(?<deg>[0-9]+)°\s*(?<min>[0-9]+)'\s*(?<sec>[0-9\,]+)''/
      return [
        helpers.parseDecimalFromDMS(x['LONGITUDINE SU GIS'], pattern),
        helpers.parseDecimalFromDMS(x['LATITUDINE SU GIS'], pattern)
      ]
    },
    srs: 'EPSG:4326',
    license: { id: 'CC-BY-4.0' }
  },
  {
    country: 'Italy',
    state: 'Lazio',
    scope: 'Tree: notable',
    info: 'https://geoportale.regione.lazio.it/layers/geosdiownr:geonode:alberi_monumentali',
    download: 'https://geoportale.regione.lazio.it/geoserver/ows?service=WFS&version=2.0.0&request=GetFeature&typeNames=geonode:alberi_monumentali&srsName=EPSG:4326&outputFormat=application/json',
    license: { id: 'CC-BY-4.0' }
  },
  {
    country: 'Italy',
    state: 'Liguria',
    scope: 'Tree: notable',
    notes: 'May replace all other regional notable tree lists',
    info: 'https://www.politicheagricole.it/flex/cm/pages/ServeBLOB.php/L/IT/IDPagina/11260#id-bed7384af14fdba2da436d64155c62b1',
    download: 'https://www.politicheagricole.it/flex/cm/pages/ServeAttachment.php/L/IT/D/1%252Fd%252F5%252FD.17f739bdd7fa7cefda63/P/BLOB%3AID%3D11260/E/xls?mode=download',
    openFunc: file => helpers.openExcelWithGdal(file, {type: 'file'}),
    coordsFunc: x => {
      // LONGITUDINE SU GIS: 14° 20' 34,97'' | LATITUDINE SU GIS': 42° 05' 14,02''
      const pattern = /(?<deg>[0-9]+)°\s*(?<min>[0-9]+)'\s*(?<sec>[0-9\,]+)''/
      return [
        helpers.parseDecimalFromDMS(x['LONGITUDINE SU GIS'], pattern),
        helpers.parseDecimalFromDMS(x['LATITUDINE SU GIS'], pattern)
      ]
    },
    srs: 'EPSG:4326',
    license: { id: 'CC-BY-4.0' }
  },
  {
    country: 'Italy',
    state: 'Lombardia',
    scope: 'Tree: notable',
    notes: 'May replace all other regional notable tree lists',
    info: 'https://www.politicheagricole.it/flex/cm/pages/ServeBLOB.php/L/IT/IDPagina/11260#id-bed7384af14fdba2da436d64155c62b1',
    download: 'https://www.politicheagricole.it/flex/cm/pages/ServeAttachment.php/L/IT/D/1%252F9%252F6%252FD.f96284c9231ed6959e6d/P/BLOB%3AID%3D11260/E/xls?mode=download',
    openFunc: file => helpers.openExcelWithGdal(file, {type: 'file'}),
    coordsFunc: x => {
      // LONGITUDINE SU GIS: 14° 20' 34,97'' | LATITUDINE SU GIS': 42° 05' 14,02''
      const pattern = /(?<deg>[0-9]+)°\s*(?<min>[0-9]+)'\s*(?<sec>[0-9\,]+)''/
      return [
        helpers.parseDecimalFromDMS(x['LONGITUDINE SU GIS'], pattern),
        helpers.parseDecimalFromDMS(x['LATITUDINE SU GIS'], pattern)
      ]
    },
    srs: 'EPSG:4326',
    license: { id: 'CC-BY-4.0' }
  },
  {
    country: 'Italy',
    state: 'Marche',
    scope: 'Tree: notable',
    notes: 'May replace all other regional notable tree lists',
    info: 'https://www.politicheagricole.it/flex/cm/pages/ServeBLOB.php/L/IT/IDPagina/11260#id-bed7384af14fdba2da436d64155c62b1',
    download: 'https://www.politicheagricole.it/flex/cm/pages/ServeAttachment.php/L/IT/D/1%252F4%252Fa%252FD.94c99216e0b679faa676/P/BLOB%3AID%3D11260/E/xls?mode=download',
    openFunc: file => helpers.openExcelWithGdal(file, {type: 'file'}),
    coordsFunc: x => {
      // LONGITUDINE SU GIS: 14° 20' 34,97'' | LATITUDINE SU GIS': 42° 05' 14,02''
      const pattern = /(?<deg>[0-9]+)°\s*(?<min>[0-9]+)'\s*(?<sec>[0-9\,]+)''/
      return [
        helpers.parseDecimalFromDMS(x['LONGITUDINE SU GIS'], pattern),
        helpers.parseDecimalFromDMS(x['LATITUDINE SU GIS'], pattern)
      ]
    },
    srs: 'EPSG:4326',
    license: { id: 'CC-BY-4.0' }
  },
  {
    country: 'Italy',
    state: 'Molise',
    scope: 'Tree: notable',
    notes: 'May replace all other regional notable tree lists',
    info: 'https://www.politicheagricole.it/flex/cm/pages/ServeBLOB.php/L/IT/IDPagina/11260#id-bed7384af14fdba2da436d64155c62b1',
    download: 'https://www.politicheagricole.it/flex/cm/pages/ServeAttachment.php/L/IT/D/1%252F5%252F3%252FD.3edfbba6eba67946411f/P/BLOB%3AID%3D11260/E/xls?mode=download',
    openFunc: file => helpers.openExcelWithGdal(file, {type: 'file'}),
    coordsFunc: x => {
      // LONGITUDINE SU GIS: 14° 20' 34,97'' | LATITUDINE SU GIS': 42° 05' 14,02''
      const pattern = /(?<deg>[0-9]+)°\s*(?<min>[0-9]+)'\s*(?<sec>[0-9\,]+)''/
      return [
        helpers.parseDecimalFromDMS(x['LONGITUDINE SU GIS'], pattern),
        helpers.parseDecimalFromDMS(x['LATITUDINE SU GIS'], pattern)
      ]
    },
    srs: 'EPSG:4326',
    license: { id: 'CC-BY-4.0' }
  },
  {
    country: 'Italy',
    state: 'Piemonte',
    scope: 'Tree: notable',
    notes: 'May replace all other regional notable tree lists',
    info: 'https://www.politicheagricole.it/flex/cm/pages/ServeBLOB.php/L/IT/IDPagina/11260#id-bed7384af14fdba2da436d64155c62b1',
    download: 'https://www.politicheagricole.it/flex/cm/pages/ServeAttachment.php/L/IT/D/1%252F5%252Fe%252FD.e4afb39347883690d4c6/P/BLOB%3AID%3D11260/E/xls?mode=download',
    openFunc: file => helpers.openExcelWithGdal(file, {type: 'file'}),
    coordsFunc: x => {
      // LONGITUDINE SU GIS: 14° 20' 34,97'' | LATITUDINE SU GIS': 42° 05' 14,02''
      const pattern = /(?<deg>[0-9]+)°\s*(?<min>[0-9]+)'\s*(?<sec>[0-9\,]+)''/
      return [
        helpers.parseDecimalFromDMS(x['LONGITUDINE SU GIS'], pattern),
        helpers.parseDecimalFromDMS(x['LATITUDINE SU GIS'], pattern)
      ]
    },
    srs: 'EPSG:4326',
    license: { id: 'CC-BY-4.0' }
  },
  {
    country: 'Italy',
    state: 'Puglia',
    scope: 'Tree: notable',
    notes: 'May replace all other regional notable tree lists',
    info: 'https://www.politicheagricole.it/flex/cm/pages/ServeBLOB.php/L/IT/IDPagina/11260#id-bed7384af14fdba2da436d64155c62b1',
    download: 'https://www.politicheagricole.it/flex/cm/pages/ServeAttachment.php/L/IT/D/1%252F8%252F2%252FD.e0e924c1fb3cdbbdad56/P/BLOB%3AID%3D11260/E/xls?mode=download',
    openFunc: file => helpers.openExcelWithGdal(file, {type: 'file'}),
    coordsFunc: x => {
      // LONGITUDINE SU GIS: 14° 20' 34,97'' | LATITUDINE SU GIS': 42° 05' 14,02''
      const pattern = /(?<deg>[0-9]+)°\s*(?<min>[0-9]+)'\s*(?<sec>[0-9\,]+)''/
      return [
        helpers.parseDecimalFromDMS(x['LONGITUDINE SU GIS'], pattern),
        helpers.parseDecimalFromDMS(x['LATITUDINE SU GIS'], pattern)
      ]
    },
    srs: 'EPSG:4326',
    license: { id: 'CC-BY-4.0' }
  },
  {
    country: 'Italy',
    state: 'Puglia',
    city: 'Copertino',
    scope: 'Tree',
    info: 'http://dati.comune.copertino.le.it/dataset/6da12471-df0f-4bf7-be47-80a0c8a9a0be',
    download: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQMMp8d5WxvRd-bF-usuJumzFrPzbcbMgvPyTuD9qY-a-mdn04UVEitQUg2tuiRQzh-vrFFIVM-1-yd/pub?gid=0&single=true&output=csv',
    geometry: { x: 'lon', y: 'lat' },
    srs: 'EPSG:4326',
    license: { id: 'CC-BY-4.0' }
  },
  {
    country: 'Italy',
    state: 'Sardegna',
    scope: 'Tree: notable',
    notes: 'May replace all other regional notable tree lists',
    info: 'https://www.politicheagricole.it/flex/cm/pages/ServeBLOB.php/L/IT/IDPagina/11260#id-bed7384af14fdba2da436d64155c62b1',
    download: 'https://www.politicheagricole.it/flex/cm/pages/ServeAttachment.php/L/IT/D/1%252F4%252F7%252FD.f5f31ef63c3bfe4c4014/P/BLOB%3AID%3D11260/E/xls?mode=download',
    openFunc: file => helpers.openExcelWithGdal(file, {type: 'file'}),
    coordsFunc: x => {
      // LONGITUDINE SU GIS: 14° 20' 34,97'' | LATITUDINE SU GIS': 42° 05' 14,02''
      const pattern = /(?<deg>[0-9]+)°\s*(?<min>[0-9]+)'\s*(?<sec>[0-9\,]+)''/
      return [
        helpers.parseDecimalFromDMS(x['LONGITUDINE SU GIS'], pattern),
        helpers.parseDecimalFromDMS(x['LATITUDINE SU GIS'], pattern)
      ]
    },
    srs: 'EPSG:4326',
    license: { id: 'CC-BY-4.0' }
  },
  {
    country: 'Italy',
    state: 'Sardinia',
    scope: 'Tree: notable',
    info: 'https://geodati.gov.it/resource/id/R_SARDEG:TJVKU',
    download: 'https://webgis.regione.sardegna.it/scaricocartografiaETL/ppr/alberiMonumentali.zip',
    vfs: '/vsizip/',
    license: { id: 'CC-BY-4.0' }
  },
  {
    country: 'Italy',
    state: 'Sicilia',
    scope: 'Tree: notable',
    notes: 'May replace all other regional notable tree lists',
    info: 'https://www.politicheagricole.it/flex/cm/pages/ServeBLOB.php/L/IT/IDPagina/11260#id-bed7384af14fdba2da436d64155c62b1',
    download: 'https://www.politicheagricole.it/flex/cm/pages/ServeAttachment.php/L/IT/D/1%252Fe%252Fb%252FD.42be802d3ccd795d5e8e/P/BLOB%3AID%3D11260/E/xls?mode=download',
    openFunc: file => helpers.openExcelWithGdal(file, {type: 'file'}),
    coordsFunc: x => {
      // LONGITUDINE SU GIS: 14° 20' 34,97'' | LATITUDINE SU GIS': 42° 05' 14,02''
      const pattern = /(?<deg>[0-9]+)°\s*(?<min>[0-9]+)'\s*(?<sec>[0-9\,]+)''/
      return [
        helpers.parseDecimalFromDMS(x['LONGITUDINE SU GIS'], pattern),
        helpers.parseDecimalFromDMS(x['LATITUDINE SU GIS'], pattern)
      ]
    },
    srs: 'EPSG:4326',
    license: { id: 'CC-BY-4.0' }
  },
  {
    country: 'Italy',
    state: 'Sicilia',
    city: 'Messina',
    scope: 'Tree',
    info: 'http://opendata.comune.messina.it/dataset/0a81090b-0a91-488b-b82a-ccd041a0b26b',
    download: 'https://cloud.comune.messina.it/nextcloud/s/8cxsfND6boa7GFw/download',
    license: { id: 'CC-BY-4.0' }
  },
  {
    country: 'Italy',
    state: 'Toscana',
    scope: 'Tree: notable',
    notes: 'May replace all other regional notable tree lists',
    info: 'https://www.politicheagricole.it/flex/cm/pages/ServeBLOB.php/L/IT/IDPagina/11260#id-bed7384af14fdba2da436d64155c62b1',
    download: 'https://www.politicheagricole.it/flex/cm/pages/ServeAttachment.php/L/IT/D/1%252F3%252Fe%252FD.569f127592dced56007a/P/BLOB%3AID%3D11260/E/xls?mode=download',
    openFunc: file => helpers.openExcelWithGdal(file, {type: 'file'}),
    coordsFunc: x => {
      // LONGITUDINE SU GIS: 14° 20' 34,97'' | LATITUDINE SU GIS': 42° 05' 14,02''
      const pattern = /(?<deg>[0-9]+)°\s*(?<min>[0-9]+)'\s*(?<sec>[0-9\,]+)''/
      return [
        helpers.parseDecimalFromDMS(x['LONGITUDINE SU GIS'], pattern),
        helpers.parseDecimalFromDMS(x['LATITUDINE SU GIS'], pattern)
      ]
    },
    srs: 'EPSG:4326',
    license: { id: 'CC-BY-4.0' }
  },
  {
    country: 'Italy',
    state: 'Toscana',
    scope: 'Tree: notable',
    info: 'https://geodati.gov.it/resource/id/r_toscan:c07bc3ad-73d7-4f6c-9446-68243b699e85',
    download: 'https://www502.regione.toscana.it/geoscopio/download/tematici/aree_protette/alberi_monumentali.zip',
    vfs: '/vsizip/',
    license: { id: 'CC-BY-4.0' }
  },
  {
    country: 'Italy',
    state: 'Toscana',
    city: 'Capannori',
    scope: 'Tree: notable',
    info: 'https://geodati.gov.it/geoportale/visualizzazione-metadati/scheda-metadati/?uuid=c_b648:ows.qdjango.alberi-monumentali-4.11780:20220714:101001',
    download: 'https://g3w-suite.comune.capannori.lu.it/vector/api/shp/qdjango/240/alberi_monumentali_b93aff19_62db_4591_ae0b_ed9337009abc.zip',
    vfs: '/vsizip/'
  },
  {
    country: 'Italy',
    state: 'Toscana',
    city: 'Firenze',
    scope: 'Tree',
    info: 'http://opendata.comune.fi.it/?q=metarepo/datasetinfo&id=42cd1073-521f-4040-9491-e993d03663a4',
    download: 'https://data.comune.fi.it/datastore//download.php?id=6370&type=99&format=url&file_format=shp&file_id=21083',
    vfs: '/vsizip/',
    license: { id: 'CC-BY-4.0' }
  },
  {
    country: 'Italy',
    state: 'Toscana',
    city: 'Firenze',
    scope: 'Tree: fruit',
    info: 'http://opendata.comune.fi.it/?q=metarepo/datasetinfo&id=alberi-da-frutto',
    download: 'https://data.comune.fi.it/datastore//download.php?id=7393&type=99&format=url&file_format=shp&file_id=21936',
    vfs: '/vsizip/',
    license: { id: 'CC-BY-4.0' }
  },
  {
    country: 'Italy',
    state: 'Toscana',
    city: 'Prato',
    scope: 'Tree',
    info: 'http://odn.comune.prato.it/dataset/45b79b35-c142-4b47-9112-f4dbfb15f2de',
    download: 'http://odn.comune.prato.it/dataset/45b79b35-c142-4b47-9112-f4dbfb15f2de/resource/5711cee3-9a18-4379-b5ac-856e8cac0359/download/pratoalberi.csv',
    geometry: { x: 'X', y: 'Y' },
    srs: 'EPSG:4326',
    license: { id: 'CC-BY-SA-4.0' }
  },
  {
    country: 'Italy',
    state: 'Trento',
    scope: 'Tree: notable',
    notes: 'May replace all other regional notable tree lists',
    info: 'https://www.politicheagricole.it/flex/cm/pages/ServeBLOB.php/L/IT/IDPagina/11260#id-bed7384af14fdba2da436d64155c62b1',
    download: 'https://www.politicheagricole.it/flex/cm/pages/ServeAttachment.php/L/IT/D/1%252F4%252Fa%252FD.1f8cf6f797b24f4651dc/P/BLOB%3AID%3D11260/E/xls?mode=download',
    openFunc: file => helpers.openExcelWithGdal(file, {type: 'file'}),
    coordsFunc: x => {
      // LONGITUDINE SU GIS: 14° 20' 34,97'' | LATITUDINE SU GIS': 42° 05' 14,02''
      const pattern = /(?<deg>[0-9]+)°\s*(?<min>[0-9]+)'\s*(?<sec>[0-9\,]+)''/
      return [
        helpers.parseDecimalFromDMS(x['LONGITUDINE SU GIS'], pattern),
        helpers.parseDecimalFromDMS(x['LATITUDINE SU GIS'], pattern)
      ]
    },
    srs: 'EPSG:4326',
    license: { id: 'CC-BY-4.0' }
  },
  {
    country: 'Italy',
    state: 'Umbria',
    scope: 'Tree: notable',
    notes: 'May replace all other regional notable tree lists',
    info: 'https://www.politicheagricole.it/flex/cm/pages/ServeBLOB.php/L/IT/IDPagina/11260#id-bed7384af14fdba2da436d64155c62b1',
    download: 'https://www.politicheagricole.it/flex/cm/pages/ServeAttachment.php/L/IT/D/1%252Fd%252F5%252FD.b4ef4e51643c76aa2abe/P/BLOB%3AID%3D11260/E/xls?mode=download',
    openFunc: file => helpers.openExcelWithGdal(file, {type: 'file'}),
    coordsFunc: x => {
      // LONGITUDINE SU GIS: 14° 20' 34,97'' | LATITUDINE SU GIS': 42° 05' 14,02''
      const pattern = /(?<deg>[0-9]+)°\s*(?<min>[0-9]+)'\s*(?<sec>[0-9\,]+)''/
      return [
        helpers.parseDecimalFromDMS(x['LONGITUDINE SU GIS'], pattern),
        helpers.parseDecimalFromDMS(x['LATITUDINE SU GIS'], pattern)
      ]
    },
    srs: 'EPSG:4326',
    license: { id: 'CC-BY-4.0' }
  },
  {
    country: 'Italy',
    state: "Valle d'Aosta",
    scope: 'Tree: notable',
    notes: 'May replace all other regional notable tree lists',
    info: 'https://www.politicheagricole.it/flex/cm/pages/ServeBLOB.php/L/IT/IDPagina/11260#id-bed7384af14fdba2da436d64155c62b1',
    download: 'https://www.politicheagricole.it/flex/cm/pages/ServeAttachment.php/L/IT/D/1%252F9%252F9%252FD.00655ba7b78d5d6a7a53/P/BLOB%3AID%3D11260/E/xls?mode=download',
    openFunc: file => helpers.openExcelWithGdal(file, {type: 'file'}),
    coordsFunc: x => {
      // LONGITUDINE SU GIS: 14° 20' 34,97'' | LATITUDINE SU GIS': 42° 05' 14,02''
      const pattern = /(?<deg>[0-9]+)°\s*(?<min>[0-9]+)'\s*(?<sec>[0-9\,]+)''/
      return [
        helpers.parseDecimalFromDMS(x['LONGITUDINE SU GIS'], pattern),
        helpers.parseDecimalFromDMS(x['LATITUDINE SU GIS'], pattern)
      ]
    },
    srs: 'EPSG:4326',
    license: { id: 'CC-BY-4.0' }
  },
  {
    country: 'Italy',
    state: 'Veneto',
    scope: 'Tree: notable',
    notes: 'May replace all other regional notable tree lists',
    info: 'https://www.politicheagricole.it/flex/cm/pages/ServeBLOB.php/L/IT/IDPagina/11260#id-bed7384af14fdba2da436d64155c62b1',
    download: 'https://www.politicheagricole.it/flex/cm/pages/ServeAttachment.php/L/IT/D/1%252F5%252Fb%252FD.8136fdc2af834cb940ba/P/BLOB%3AID%3D11260/E/xls?mode=download',
    openFunc: file => helpers.openExcelWithGdal(file, {type: 'file'}),
    coordsFunc: x => {
      // LONGITUDINE SU GIS: 14° 20' 34,97'' | LATITUDINE SU GIS': 42° 05' 14,02''
      const pattern = /(?<deg>[0-9]+)°\s*(?<min>[0-9]+)'\s*(?<sec>[0-9\,]+)''/
      return [
        helpers.parseDecimalFromDMS(x['LONGITUDINE SU GIS'], pattern),
        helpers.parseDecimalFromDMS(x['LATITUDINE SU GIS'], pattern)
      ]
    },
    srs: 'EPSG:4326',
    license: { id: 'CC-BY-4.0' }
  },
  {
    country: 'Italy',
    state: 'Veneto',
    scope: 'Tree: notable',
    info: 'https://geodati.gov.it/resource/id/r_veneto:c1101133_AlbMo',
    download: 'https://idt2-geoserver.regione.veneto.it/geoserver/wfs?service=WFS&version=2.0.0&request=GetFeature&typeNames=rv:c1101133_albmo&srsName=EPSG:4326&outputFormat=application/json',
    license: { id: 'CC-BY-4.0' }
  },
  {
    country: 'Japan',
    state: 'Kantō',
    city: 'Suginami',
    scope: 'Tree: street (main)',
    info: 'https://www2.wagmap.jp/suginami/OpenDataDetail?lid=50&mids=10',
    download: 'https://www2.wagmap.jp/suginami/suginami/OpenDatafile/map_10/CSV/opendata_50.csv',
    geometry: { x: '経度', y: '緯度' },
    srs: 'EPSG:4326',
    license: { id: 'CC-BY-4.0' }
  },
  {
    country: 'Japan',
    state: 'Kantō',
    city: 'Suginami',
    scope: 'Tree: park',
    info: 'https://www2.wagmap.jp/suginami/OpenDataDetail?lid=1500&mids=107',
    download: 'https://www2.wagmap.jp/suginami/suginami/OpenDatafile/map_107/CSV/opendata_1500.csv',
    geometry: { x: '経度', y: '緯度' },
    srs: 'EPSG:4326',
    license: { id: 'CC-BY-4.0' }
  },
  {
    country: 'Kosovo',
    city: 'Prishtina',
    scope: 'Tree',
    info: 'https://prishtinatrees.org/',
    download: 'https://prishtinatrees.org/PrishtinaTrees.org%20Dataset.rar',
    openFunc: async file => {
      const files = await helpers.readFilesInRarToVsimem(file)
      const selection = files.filter(x => x.endsWith('_drunjet.geojson'))
      return helpers.openFileUnionWithGdal(selection)
    },
    terms: 'personal/institutional use'
  },
  {
    country: 'Luxembourg',
    scope: 'Tree: notable',
    info: 'https://data.public.lu/en/datasets/inspire-annex-i-theme-protected-sites-remarkable-trees/',
    download: 'https://data.public.lu/fr/datasets/r/15e30f27-794b-4eb4-baeb-2dadc1e1067a',
    crosswalk: {
      ref: 'localId',
      scientific: x => String(x.text).split(' - ')[0],
      common: x => String(x.text).split(' - ')[1]
    },
    license: { id: 'CC0-1.0' },
    opentrees_id: 'luxembourg'
  },
  {
    country: 'Mexico',
    state: 'Jalisco',
    city: 'Guadalajara',
    scope: 'Tree: street',
    info: 'https://www.arcgis.com/home/item.html?id=eb37f4e0ae0d4d6e96da08deb2603bae',
    download: {
      arcgis: 'https://services7.arcgis.com/ymdxsA0VaxSiZBC4/arcgis/rest/services/Arboles_en_viario_público_vista/FeatureServer/0'
    }
  },
  {
    country: 'Mexico',
    state: 'Jalisco',
    city: 'Guadalajara',
    scope: 'Tree: park',
    info: 'https://www.arcgis.com/home/item.html?id=1df04237abbb4c6d8c1e2c17ab439a83',
    download: {
      arcgis: 'https://services7.arcgis.com/ymdxsA0VaxSiZBC4/arcgis/rest/services/árboles_en_zona_verde_vista/FeatureServer/0'
    }
  },
  {
    pending: 'address only',
    country: 'Mexico',
    state: 'Nuevo León',
    city: 'Monterrey',
    scope: 'Tree',
    info: 'http://datamx.io/dataset/arboles-registrados-en-la-zona-metropolitana-de-monterrey',
    download: 'https://datamx.io/dataset/9ad2f30b-4be9-4abe-beac-aec73ecc9cba/resource/682bc7eb-a115-4545-8257-221e66f9706f/download/bumbusqueda140821v2.csv',
    driver: 'CSV',
    crosswalk: {
      ref: 'Arbol_id',
      planted: x => x.Fecha_plantado !== '0000-00-00' ? x.Fecha_plantado : null,
      common: 'Especie',
      updated: 'Fecha_registro'
    },
    license: { id: 'ODC-By-1.0' },
    opentrees_id: 'monterrey_mx'
  },
  {
    country: 'Netherlands',
    state: 'Drenthe',
    city: 'Assen',
    scope: 'Tree',
    info: 'https://data.overheid.nl/dataset/dataset-bomen-assen',
    download: {
      arcgis: 'https://services1.arcgis.com/p5QhXC0i0sZjprM1/ArcGIS/rest/services/Dataset_Bomen_Assen/FeatureServer/0'
    },
    crosswalk: {
      ref: 'BOOMNUMMER',
      updated: 'DATUM',
      scientific: 'BOOMSOORT',
      planted: 'PLANTJAAR',
      height: 'CODE_HOOGTE',
      health: 'CONDITIE',
      owner: 'EIGENAARSTYPE'
    },
    license: { id: 'CC-BY-4.0' },
    opentrees_id: 'assen_nl'
  },
  {
    country: 'Netherlands',
    state: 'Drenthe',
    city: 'Assen',
    scope: 'Tree: notable',
    info: 'https://data.overheid.nl/dataset/dataset-waardevolle-en-monumentale-bomen-assen',
    download: {
      arcgis: 'https://gis.assen.nl/arcgis/rest/services/BOR/Waardevolle_en_monumentale_bomen/MapServer/0'
    },
    license: { id: 'CC-BY-4.0' },
    opentrees_id: 'assen_nl'
  },
  {
    country: 'Netherlands',
    state: 'Drenthe',
    city: 'Assen',
    scope: 'Tree: notable',
    info: 'https://data.overheid.nl/dataset/dataset-waardevolle-en-monumentale-bomen-assen',
    download: {
      arcgis: 'https://gis.assen.nl/arcgis/rest/services/BOR/Waardevolle_en_monumentale_bomen/MapServer/1'
    },
    license: { id: 'CC-BY-4.0' },
    opentrees_id: 'assen_nl'
  },
  {
    country: 'Netherlands',
    state: 'Drenthe',
    city: 'Assen',
    scope: 'Tree: notable',
    info: 'https://data.overheid.nl/dataset/dataset-waardevolle-en-monumentale-bomen-assen',
    download: {
      arcgis: 'https://gis.assen.nl/arcgis/rest/services/BOR/Waardevolle_en_monumentale_bomen/MapServer/2'
    },
    license: { id: 'CC-BY-4.0' },
    opentrees_id: 'assen_nl'
  },
  {
    country: 'Netherlands',
    state: 'Flevoland',
    city: 'Lelystad',
    scope: 'Tree',
    info: 'https://ckan.dataplatform.nl/dataset/lelystad-bomen',
    download: 'https://ckan.dataplatform.nl/datastore/dump/0e07e166-652b-49e0-9a18-e093a3febd88',
    geometry: { x: 'lon', y: 'lat' },
    srs: 'EPSG:4326',
    crosswalk: {
      common: 'SOORT_NED',
      scientific: 'SOORT_LATIJN',
      height: 'HOOGTE',
      health: 'CONDITIE',
      updated: 'INSPECTIEDATUM'
    },
    license: { id: 'CC-BY-4.0' },
    opentrees_id: 'lelystad_nl'
  },
  {
    country: 'Netherlands',
    state: 'Gelderland',
    scope: 'Tree: notable',
    info: 'https://nationaalgeoregister.nl/geonetwork/srv/dut/catalog.search#/metadata/15607c11-d064-4c2a-bb0c-2a9d9a658645?tab=general',
    download: {
      arcgis: 'https://geoserver.gelderland.nl/geoserver/ngr_bow/wfs?request=GetFeature&service=WFS&version=1.1.0&outputFormat=application%2Fjson&typeName=arcgis_all_boom_punt'
    },
    license: { id: 'CC0-1.0' },
  },
  {
    country: 'Netherlands',
    state: 'Gelderland',
    city: 'Arnhem',
    scope: 'Tree',
    info: 'https://opendata.arnhem.nl/datasets/bomenkaart/about',
    download: {
      arcgis: 'https://geo.arnhem.nl/arcgis/rest/services/OpenData/Bomenkaart/MapServer/0'
    },
    crosswalk: {
      ref: 'BEHEERCODE',
      scientific: 'BOOMSOORT',
      common: 'NEDERLANDSE_NAAM',
      planted: 'PLANTJAAR',
      owner: 'EIGENAAR'
    },
    license: { id: 'CC-BY-4.0' },
    opentrees_id: 'arnhem_nl'
  },
  {
    country: 'Netherlands',
    state: 'Gelderland',
    city: 'Nijmegen',
    scope: 'Tree',
    info: 'https://opendata.nijmegen.nl/dataset/bomen',
    download: 'https://services.nijmegen.nl/geoservices/extern_BOR_Groen/ows?service=WFS&version=2.0.0&request=GetFeature&typeNames=extern_BOR_Groen:GRN_BOMEN&srsName=EPSG:4326&outputFormat=application/json',
    srs: 'EPSG:28992',
    crosswalk: {
      ref: 'ID',
      planted: 'PLANTJAAR',
      scientific: 'BOOMSOORT',
      updated: 'DATUM_BIJGEWERKT'
    },
    license: { id: 'CC0-1.0' },
    opentrees_id: 'nijmegen_nl'
  },
  {
    country: 'Netherlands',
    state: 'Gelderland',
    city: 'Rheden',
    scope: 'Tree',
    info: 'https://hub.arcgis.com/datasets/rheden::gb-boom/about',
    download: {
      arcgis: 'https://services3.arcgis.com/zi6uvGhzrY8amIBi/arcgis/rest/services/GB_Boom/FeatureServer/0'
    }
  },
  {
    country: 'Netherlands',
    state: 'Groningen',
    city: 'Groningen',
    scope: 'Tree',
    info: 'https://data.groningen.nl/dataset/bomen-gemeente-groningen',
    download: 'https://maps.groningen.nl/geoserver/geo-data/ows?service=WFS&version=2.0.0&request=GetFeature&typeNames=geo-data:Bomen+gemeente+Groningen&srsName=EPSG:4326&outputFormat=application/json',
    srs: 'EPSG:28992',
    crosswalk: { common: 'NEDNAAM', scientific: 'LATNAAM', owner: 'OMSCHRIJVP' },
    license: { id: 'CC-BY-4.0' },
    opentrees_id: 'groningen_nl'
  },
  {
    country: 'Netherlands',
    state: 'Noord-Brabant',
    city: "'s-Hertogenbosch",
    scope: 'Tree: notable',
    info: 'https://geoportaal2-s-hertogenbosch.opendata.arcgis.com/datasets/s-hertogenbosch::monumentale-bomen/about',
    download: {
      arcgis: 'https://geoproxy.s-hertogenbosch.nl/ags_extern/rest/services/Externvrij/monumentale_bomen/MapServer/0'
    },
    license: { id: 'CC-BY-SA-4.0' }
  },
  {
    country: 'Netherlands',
    state: 'Noord-Brabant',
    city: 'Eindhoven',
    scope: 'Tree',
    info: 'https://data.eindhoven.nl/explore/dataset/bomen/information/',
    download: 'https://data.eindhoven.nl/api/explore/v2.1/catalog/datasets/bomen/exports/geojson',
    crosswalk: {
      scientific: 'LATIJNSENA',
      common: 'BOOMSOORT',
      planted: 'PLANTJAAR',
      height: 'HOOGTE',
      dbh: 'DIAMETER',
      health: 'VITALITEIT'
    },
    license: { id: 'CC-BY-4.0' },
    opentrees_id: 'eindhoven_nl'
  },
  {
    country: 'Netherlands',
    state: 'Noord-Brabant',
    city: 'Roosendaal',
    scope: 'Tree',
    info: 'https://opendata.roosendaal.nl/datasets/roosendaal::bomen-open-data/about',
    download: {
      arcgis: 'https://services8.arcgis.com/6UYedLDVU0fKJbOA/arcgis/rest/services/GBI_BOOM_PUBLIC/FeatureServer/0'
    },
    opentrees_id: 'roosendaal_be'
  },
  {
    country: 'Netherlands',
    state: 'Noord-Brabant',
    city: 'Tilburg',
    scope: 'Tree',
    info: 'https://ckan.dataplatform.nl/dataset/bomen-tilburg',
    download: 'https://ckan.dataplatform.nl/dataset/96b46ab5-7638-46bb-b416-c480170b9a84/resource/6f639eb1-7497-4fc7-831b-d24e077bfe45/download/bomen.csv',
    geometry: { x: 'longitude', y: 'latitude' },
    srs: 'EPSG:4326',
    crosswalk: {
      updated: 'datum_gemeten',
      ref: 'boomnummer',
      scientific: 'latijnse_boomnaam',
      common: 'nederlandse_boomnaam',
      planted: 'plantjaar',
      dbh: 'diameter_in_cm',
      height: 'boomhoogte'
    },
    license: { id: 'CC0-1.0' },
    opentrees_id: 'tilburg_nl'
  },
  {
    country: 'Netherlands',
    state: 'Noord-Brabant',
    city: 'Tilburg',
    scope: 'Tree: notable',
    info: 'https://ckan.dataplatform.nl/dataset/monumentale-bomen-tilburg',
    download: 'https://ckan.dataplatform.nl/dataset/e28e4e50-4f91-4e07-8335-11a47e0824ac/resource/9e288b9c-70cd-4ca1-bb13-1c4a72a13f6e/download/monumentale_bomen.csv',
    geometry: { x: 'longitude', y: 'latitude' },
    srs: 'EPSG:4326',
    license: { id: 'CC0-1.0' },
    opentrees_id: 'tilburg_nl'
  },
  {
    country: 'Netherlands',
    state: 'Noord-Holland',
    city: 'Amsterdam',
    scope: 'Tree',
    info: 'https://maps.amsterdam.nl/open_geodata/?k=505',
    download: 'https://maps.amsterdam.nl/open_geodata/excel.php?KAARTLAAG=BOMEN_DATA&THEMA=bomen',
    geometry: { x: 'LNG', y: 'LAT' },
    srs: 'EPSG:4326',
    crosswalk: {
      common: 'Soortnaam_NL',
      scientific: 'Soortnaam_WTS',
      location: 'Boomtype',
      height: 'Boomhoogte',
      planted: 'Plantjaar',
      owner: 'Eigenaar'
    },
    terms: 'https://maps.amsterdam.nl/open_geodata/terms.php',
    opentrees_id: 'amsterdam1'
  },
  {
    country: 'Netherlands',
    state: 'Noord-Holland',
    city: 'Bloemendaal',
    scope: 'Tree',
    info: 'https://gemeente-bloemendaal.opendata.arcgis.com/datasets/Bloemendaal::bomen/about',
    download: {
      arcgis: 'https://gis.bloemendaal.nl/server/rest/services/OpenData/Bomen/FeatureServer/0'
    },
    license: { id: 'CC-BY-3.0' }
  },
  {
    country: 'Netherlands',
    state: 'Noord-Holland',
    city: 'Haarlem',
    scope: 'Tree',
    info: 'https://haarlem.nl/open-data',
    download: 'https://data.haarlem.nl/geoserver/wfs?service=WFS&version=2.0.0&request=GetFeature&typeNames=gemeentehaarlem:bor_bomen&srsName=EPSG:4326&outputFormat=geopackage',
    crosswalk: {
      ref: 'boomnummer',
      scientific: 'name',
      age: 'leeftijd',
      crown: 'kroondiameter',
      owner: 'beheerder'
    },
    terms: 'Deze informatie is rechtenvrij en beschikbaar voor iedereen',
    opentrees_id: 'haarlem_nl'
  },
  {
    country: 'Netherlands',
    state: 'Noord-Holland',
    city: 'Hilversum',
    scope: 'Tree',
    info: 'https://open-hilversum.hub.arcgis.com/datasets/hilversum-hub::bomen/about',
    download: {
      arcgis: 'https://services-eu1.arcgis.com/zc5my8Mf0GNBBZN4/arcgis/rest/services/Bomen/FeatureServer/0'
    },
    crosswalk: {
      scientific: 'BOOMSOORT_WETENSCHAPPELIJK',
      common: 'BOOMSOORT_NEDERLANDS',
      height: 'BOOMHOOGTE',
      planted: 'PLANTSEIZOEN'
    },
    license: { id: 'CC0-1.0' },
    opentrees_id: 'hilversum'
  },
  {
    country: 'Netherlands',
    state: 'Noord-Holland',
    city: 'Hilversum',
    scope: 'Tree: notable',
    info: 'https://open-hilversum.hub.arcgis.com/datasets/hilversum-hub::beschermde-bomen/about',
    download: {
      arcgis: 'https://services-eu1.arcgis.com/zc5my8Mf0GNBBZN4/arcgis/rest/services/Beschermde_bomen/FeatureServer/0'
    },
    license: { id: 'CC0-1.0' },
    opentrees_id: 'hilversum'
  },
  {
    country: 'Netherlands',
    state: 'Noord-Holland',
    city: 'Zaanstad',
    scope: 'Tree',
    info: 'https://ckan.dataplatform.nl/dataset/znstdor15o',
    download: 'https://ckan.dataplatform.nl/datastore/dump/96c805d4-fd3c-41ce-8e35-c98b30513819?bom=True',
    geometry: { x: 'longitude', y: 'latitude' },
    srs: 'EPSG:4326',
    crosswalk: { scientific: 'soortnaam_bomen' },
    license: { id: 'CC0-1.0' },
    opentrees_id: 'zaanstad_nl'
  },
  {
    country: 'Netherlands',
    state: 'Overijssel',
    city: 'Velsen',
    scope: 'Tree',
    info: 'https://data.overheid.nl/dataset/bomen-gemeente-velsen',
    download: 'https://raw.githubusercontent.com/IenS-Velsen/Bomen/main/Bomen.geojson',
    license: { id: 'CC0-1.0' }
  },
  {
    country: 'Netherlands',
    state: 'Overijssel',
    city: 'Zwartewaterland',
    scope: 'Tree',
    info: [
      'https://data.overheid.nl/dataset/bomen-zwartewaterland',
      'https://data.overheid.nl/dataset/bomen-zwartewaterland#panel-resources'
    ],
    download: {
      arcgis: 'https://services-eu1.arcgis.com/1AeFYBQaTUAzKcJu/arcgis/rest/services/Bomen/FeatureServer/0'
    },
    crosswalk: {
      common: 'NEDBOOMSOORT',
      scientific: 'LATBOOMSOORT',
      installed: 'AANLEGJAAR'
    },
    license: { id: 'CC-BY-4.0' },
    opentrees_id: 'zvartewaterland_nl'
  },
  {
    country: 'Netherlands',
    state: 'Overijssel',
    city: 'Zwartewaterland',
    scope: 'Tree: notable',
    info: [
      'https://data.overheid.nl/dataset/bijzondere-bomen-zwartewaterland',
      'https://data.overheid.nl/dataset/bijzondere-bomen-zwartewaterland#panel-resources'
    ],
    download: {
      arcgis: 'https://services-eu1.arcgis.com/1AeFYBQaTUAzKcJu/arcgis/rest/services/Bijzondere_bomen/FeatureServer/0'
    },
    license: { id: 'CC-BY-4.0' },
    opentrees_id: 'zvartewaterland_nl'
  },
  {
    country: 'Netherlands',
    state: 'Overijssel',
    city: 'Zwolle',
    scope: 'Tree',
    info: 'https://smart-zwolle.opendata.arcgis.com/datasets/zwolle::bomen/about',
    download: {
      arcgis: 'https://gisservices.zwolle.nl/ArcGIS/rest/services/BOR_groen_wegen/MapServer/2'
    },
    license: { id: 'CC-PDM-1.0' }
  },
  {
    country: 'Netherlands',
    state: 'Utrecht',
    city: 'Amersfoort',
    scope: 'Tree',
    info: 'https://ckan.dataplatform.nl/dataset/amersfoort-gemeentelijke_bomen',
    download: 'https://ckan.dataplatform.nl/dataset/7832e2c3-8365-4c03-820b-d0b0ec5c9718/resource/7794f7e2-8bb9-45ba-9a9f-df910b09c40f/download/amersfoort-gemeentelijke_bomen.csv',
    geometry: { x: 'LONGITUDE', y: 'LATITUDE' },
    srs: 'EPSG:4326',
    crosswalk: {
      location: 'BOOMKLASSE',
      height: 'BOOMHOOGTE',
      owner: 'BEHEERDER',
      crown: 'KROONDIAMETER',
      dbh: 'STAMDIAMETER',
      ref: 'ID',
      common: 'NEDERLANDSE_NAAM',
      scientific: 'BOOMSOORT',
      planted: 'PLANTJAAR',
      ule: 'LEVENSVERW'
    },

    opentrees_id: 'amersfoot_nl'
  },
  {
    country: 'Netherlands',
    state: 'Utrecht',
    city: 'Amersfoort',
    scope: 'Tree: notable',
    info: 'https://amersfoort.dataplatform.nl/#/data/44d004a7-0324-4584-9a9d-3c4169f29038',
    download: 'https://ckan.dataplatform.nl/dataset/44d004a7-0324-4584-9a9d-3c4169f29038/resource/f18cfa1e-3937-4ca6-ac75-b1cbd1e146e3/download/amersfoort-monumentale_bomen.csv',
    geometry: { x: 'LONGITUDE', y: 'LATITUDE' },
    srs: 'EPSG:4326',
    opentrees_id: 'amersfoot_nl'
  },
  {
    country: 'Netherlands',
    state: 'Utrecht',
    city: 'Amersfoort',
    scope: 'Tree: notable',
    info: 'https://amersfoort.dataplatform.nl/#/data/ae4fdb18-ca6c-4c18-a690-b520234009bb',
    download: 'https://ckan.dataplatform.nl/dataset/ae4fdb18-ca6c-4c18-a690-b520234009bb/resource/268e80a2-0273-42ef-a0e0-a29e79b4a075/download/amersfoort-bijzondere_bomen.csv',
    geometry: { x: 'LONGITUDE', y: 'LATITUDE' },
    srs: 'EPSG:4326',
    opentrees_id: 'amersfoot_nl'
  },
  {
    country: 'Netherlands',
    state: 'Utrecht',
    city: 'Utrecht',
    scope: 'Tree',
    info: 'https://data.utrecht.nl/dataset/bomen',
    download: 'https://data.utrecht.nl/sites/default/files/open-data/20201123bomen.csv',
    geometry: { x: 'Long', y: 'Lat' },
    srs: 'EPSG:4326',
    crosswalk: {
      scientific: 'Naam_Wet',
      common: 'Naam_NL',
      planted: 'Plantjaar',
      ref: 'Boomnr',
      owner: 'Eigenaar'
    },
    license: { id: 'CC0-1.0' },
    opentrees_id: 'utrecht'
  },
  {
    country: 'Netherlands',
    state: 'Utrecht',
    city: 'Woerden',
    scope: 'Tree',
    info: 'https://hub.arcgis.com/datasets/Woerden::bomen-1/about',
    download: {
      arcgis: 'https://services.arcgis.com/KTAv9h3GdyXXT8eV/arcgis/rest/services/open_data_groenbeheer/FeatureServer/1'
    }
  },
  {
    country: 'Netherlands',
    state: 'Utrecht',
    city: 'Zeist',
    scope: 'Tree',
    info: 'https://gemeente-zeist.opendata.arcgis.com/datasets/21ffcc96238e47a28ea4e7727692840a_0/about',
    download: {
      arcgis: 'https://services1.arcgis.com/vxtcdWjsjPHYpR1J/arcgis/rest/services/Zeist_Bomen/FeatureServer/0'
    },
    license: { id: 'CC0-1.0' }
  },
  {
    country: 'Netherlands',
    state: 'Zeeland',
    scope: 'Tree: street (main)',
    info: 'https://nationaalgeoregister.nl/geonetwork/srv/dut/catalog.search#/metadata/07885bed-2cf7-4399-9ae6-548e8c1d3dd7',
    download: 'https://opengeodata.zeeland.nl/geoserver/chs/wfs?service=WFS&version=2.0.0&request=GetFeature&typeNames=geocmd_chsgbmvpn&srsName=EPSG:4326&outputFormat=json',
    license: { id: 'CC-BY-SA-3.0' }
  },
  {
    country: 'Netherlands',
    state: 'Zuid-Holland',
    designation: 'Waterschap Hollandse Delta',
    scope: 'Tree: street (main)',
    info: 'https://hub.arcgis.com/datasets/WSHD::wshd-bomen-1/about',
    download: {
      arcgis: 'https://services1.arcgis.com/kuOZuNSbAumsw8wc/arcgis/rest/services/Wshd_Bomenwacht/FeatureServer/0'
    },
    license: { id: 'CC-BY-4.0' }
  },
  {
    country: 'Netherlands',
    state: 'Zuid-Holland',
    city: 'Alblasserdam',
    scope: 'Tree',
    info: 'https://ckan.dataplatform.nl/dataset/bomen-alblasserdam',
    download: 'https://ckan.dataplatform.nl/datastore/dump/5bc33717-ff42-4aab-8bed-5ed0f618b1f8?bom=True',
    coordsFunc: x => [
      Number(x['X'].replace(',', '.')),
      Number(x['Y'].replace(',', '.'))
    ],
    srs: 'EPSG:28992',
    crosswalk: { scientific: 'Boomsoort', common: 'Boomsoort Nederlands' },
    license: { id: 'CC0-1.0' },
    opentrees_id: 'alblasserdam_nl'
  },
  {
    country: 'Netherlands',
    state: 'Zuid-Holland',
    city: 'Albrandswaard',
    scope: 'Tree',
    info: 'https://nationaalgeoregister.nl/geonetwork/srv/dut/catalog.search#/metadata/e896eabc-0324-48d9-838c-d26d6dda67cf',
    download: {
      arcgis: 'https://maps.bar-organisatie.nl/arcgis/rest/services/OpenDataPortaal/Bomen_AW/MapServer/0'
    },
    license: { id: 'CC0-1.0' }
  },
  {
    country: 'Netherlands',
    state: 'Zuid-Holland',
    city: 'Barendrecht',
    scope: 'Tree',
    info: 'https://nationaalgeoregister.nl/geonetwork/srv/dut/catalog.search#/metadata/5da10ecc-2d3d-44ef-be82-1f33ea305fd7',
    download: {
      arcgis: 'https://maps.bar-organisatie.nl/arcgis/rest/services/OpenDataPortaal/Bomen_BD/MapServer/0'
    },
    srs: 'EPSG:28992',
    crosswalk: {
      owner: 'BEHEERDER',
      common: 'NEDBOOMSOORT',
      scientific: 'LATBOOMSOORT',
      dbh: 'DIAMETER',
      installed: 'AANLEGJAAR',
      updated: 'INSPECTIEDATUM'
    },
    license: { id: 'CC0-1.0' },
    opentrees_id: 'barendrecht_nl'
  },
  {
    country: 'Netherlands',
    state: 'Zuid-Holland',
    city: 'Delft',
    scope: 'Tree',
    info: 'https://data-delft.opendata.arcgis.com/datasets/Delft::bomen-in-beheer-door-gemeente-delft-1/about',
    download: {
      arcgis: 'https://services3.arcgis.com/j07voPd56xoB4c87/arcgis/rest/services/Bomen%20in%20beheer%20door%20gemeente%20Delft/FeatureServer/0'
    },
    crosswalk: {
      ref: 'ID_VELD',
      scientific: 'BOOMSOORT_',
      height: 'BOOMHOOGTE',
      health: 'CONDITIE_K'
    },
    opentrees_id: 'delft_nl'
  },
  {
    country: 'Netherlands',
    state: 'Zuid-Holland',
    city: 'Den Haag',
    scope: 'Tree',
    info: 'https://denhaag.dataplatform.nl/#/data/d604d9bb-8c2f-4e7d-a69c-ee6102890baf',
    download: 'https://ckan.dataplatform.nl/dataset/d604d9bb-8c2f-4e7d-a69c-ee6102890baf/resource/85327fde-9e76-40f3-a8d4-25970896fd8f/download/bomen-json.zip',
    vfs: '/vsizip/',
    geometry: { x: 'LONG', y: 'LAT' },
    crosswalk: {
      ref: 'BOOMNUMMER',
      scientific: 'BOOMSOORT_WETENSCHAPPELIJ',
      dbh: 'STAMDIAMETERKLASSE',
      maturity: 'LEEFTIJDSKLASSE',
      age: 'LEEFTIJD',
      owner: 'EIGENAAR'
    },
    opentrees_id: 'haag'
  },
  {
    country: 'Netherlands',
    state: 'Zuid-Holland',
    city: 'Dordrecht',
    scope: 'Tree',
    info: [
      'https://ckan.dataplatform.nl/dataset/bomen-dordrecht',
      {file: 'https://ckan.dataplatform.nl/dataset/88e31108-d6ae-4307-a331-2069894b4b62/resource/b46681f1-e9b6-47b8-bfa5-80ede63299b5/download/definitie-bomen-dordrecht.txt'}
    ],
    download: 'https://ckan.dataplatform.nl/datastore/dump/684ee3f2-333c-4b07-bbb5-d08a393d6ed1?bom=True',
    coordsFunc: x => [
      Number(x['X-coordinaat'].replace(',', '.')),
      Number(x['Y-coordinaat'].replace(',', '.'))
    ],
    srs: 'EPSG:28992',
    crosswalk: {
      ref: 'ELEMENTNUMMER',
      scientific: 'SRT_NAAM',
      common: 'Nederlandse naam',
      height: 'HOOGTE',
      dbh: 'DIAMETER',
      installed: 'AANLEGJAAR',
      owner: 'EIGENDOM'
    },
    license: { id: 'CC0-1.0' },
    opentrees_id: 'dordrecht_nl'
  },
  {
    country: 'Netherlands',
    state: 'Zuid-Holland',
    city: 'Gouda',
    scope: 'Tree',
    download: 'https://gis.gouda.nl/geoserver/BOR/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=BOR:V_BOMEN_ALLES&srsName=EPSG:4326&outputFormat=application/json'
  },
  {
    country: 'Netherlands',
    state: 'Zuid-Holland',
    city: 'Papendrecht',
    scope: 'Tree: notable',
    info: 'https://www.dataplatform.nl/#/data/d4c63e10-2239-45c8-a584-804530ded1ea?totalViews=63',
    download: 'https://ckan.dataplatform.nl/dataset/d4c63e10-2239-45c8-a584-804530ded1ea/resource/c394e815-3a64-45fe-9d58-c5e7e1334e2e/download/groene-kaart-papendrecht-2016-09-14.csv',
    geometry: { x: 'longitude', y: 'latitude' },
    srs: 'EPSG:4326'
  },
  {
    country: 'Netherlands',
    state: 'Zuid-Holland',
    city: 'Ridderkerk',
    scope: 'Tree',
    info: 'https://nationaalgeoregister.nl/geonetwork/srv/dut/catalog.search#/metadata/9c8ca958-66c4-4cfc-90b8-73011fa732c8',
    download: {
      arcgis: 'https://maps.bar-organisatie.nl/arcgis/rest/services/OpenDataPortaal/Bomen_RK/MapServer/0'
    },
    license: { id: 'CC0-1.0' }
  },
  {
    country: 'Netherlands',
    state: 'Zuid-Holland',
    city: 'Sliedrecht',
    scope: 'Tree',
    info: 'https://ckan.dataplatform.nl/dataset/bomen-sliedrecht',
    download: 'https://ckan.dataplatform.nl/datastore/dump/fc898475-4fa6-47f3-9a9a-8e85acb7b6a4?bom=True',
    coordsFunc: x => [
      Number(x['X'].replace(',', '.')),
      Number(x['Y'].replace(',', '.'))
    ],
    srs: 'EPSG:28992',
    crosswalk: {
      installed: 'Aanlegjaar',
      common: 'Naam_NL',
      ref: 'Objectcode',
      scientific: 'Boomsort'
    },
    license: { id: 'CC0-1.0' },
    opentrees_id: 'sliedrecht_nl'
  },
  {
    country: 'Netherlands',
    state: 'Zuid-Holland',
    city: 'Zoetermeer',
    scope: 'Tree',
    info: 'https://hub.arcgis.com/datasets/stadsatlas::bomen-2/about',
    download: {
      arcgis: 'https://gis.zoetermeer.nl/arcgis/rest/services/Public/Bomen/MapServer/0'
    },
    license: { id: 'CC0-1.0' }
  },
  {
    country: 'New Zealand',
    state: 'Auckland',
    city: 'Auckland',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=bc3ee65c591d425cbaf90fc85cf5adef',
    download: {
      arcgis: 'https://services1.arcgis.com/n4yPwebTjJCmXB6W/arcgis/rest/services/TreeRegisterPoints/FeatureServer/0'
    }
  },
  {
    country: 'New Zealand',
    state: 'Manawatū-Whanganui',
    city: 'Palmerston North',
    scope: 'Tree',
    info: 'https://data-pncc.opendata.arcgis.com/datasets/077787e2299541bc8d2c2dbf8d7dc4e4_18/about',
    download: {
      arcgis: 'https://geosite.pncc.govt.nz/arcgis/rest/services/Public/WEB_Open_Data/MapServer/18'
    },
    crosswalk: { scientific: 'botanical_', common: 'species' },
    opentrees_id: 'palmerston_north'
  },
  {
    country: 'New Zealand',
    state: 'Manawatū-Whanganui',
    city: 'Palmerston North',
    scope: 'Tree: notable',
    info: 'https://data-pncc.opendata.arcgis.com/datasets/PNCC::pncc-notable-trees/about',
    download: {
      arcgis: 'https://geosite.pncc.govt.nz/arcgis/rest/services/Public/WEB_Planning/MapServer/4'
    },
    license: { id: 'CC-BY-4.0' },
    opentrees_id: 'palmerston_north'
  },
  {
    country: 'New Zealand',
    state: 'Marlborough',
    designation: 'Marlborough District',
    scope: 'Tree: notable',
    info: 'https://data-marlborough.opendata.arcgis.com/datasets/bbd06eb0f4fb4f1d8c8d56a3213ecc0b_21/about',
    download: {
      arcgis: 'https://gis.marlborough.govt.nz/server/rest/services/OpenData/OpenData5/MapServer/21'
    },
    license: { id: 'CC-BY-4.0' }
  },
  {
    country: 'New Zealand',
    state: 'Waikato',
    designation: 'Waikato District',
    scope: 'Tree: notable',
    info: 'https://data-waikatolass.opendata.arcgis.com/datasets/f627e48928b24266a9da8c042a77a2cc_0/about',
    download: {
      arcgis: 'https://services9.arcgis.com/hFOIM3RwvlDTA5Jf/arcgis/rest/services/District_Plan_Overlay/FeatureServer/0'
    }
  },
  {
    country: 'New Zealand',
    state: 'Wellington',
    city: 'Wellington',
    scope: 'Tree: notable',
    info: 'https://data-wcc.opendata.arcgis.com/datasets/aed53628016540388abfbe018da439b6_29/about',
    download: {
      arcgis: 'https://gis.wcc.govt.nz/arcgis/rest/services/DistrictPlan/DistrictPlan_RuBRIC/MapServer/29'
    },
    license: { id: 'CC-BY-3.0-NZ' }
  },
  {
    country: 'New Zealand',
    state: 'Wellington',
    city: 'Wellington',
    scope: 'Tree',
    info: 'https://data-wcc.opendata.arcgis.com/datasets/WCC::wcc-trees/about',
    download: {
      arcgis: 'https://gis.wcc.govt.nz/arcgis/rest/services/Parks/Parks/MapServer/53'
    }
  },
  {
    country: 'Norway',
    state: 'Østlandet',
    city: 'Oslo',
    scope: 'Tree',
    info: 'https://hub.arcgis.com/datasets/f256d2d837554edab8b53bb6af90bc8d_19/about',
    download: {
      arcgis: 'https://geodata.bymoslo.no/arcgis/rest/services/geodata/Temadata_Publikum/MapServer/19'
    },
    crosswalk: {
      updated: 'last_edi_1',
      scientific: 'BotNavn',
      common: 'Artsnavn'
    },
    opentrees_id: 'oslo'
  },
  {
    country: 'Panama',
    state: 'Panamá',
    city: 'Bella Vista',
    scope: 'Tree',
    info: 'https://datos-geomupa.opendata.arcgis.com/datasets/arborizaci%C3%B3n-bella-vista-p/about',
    download: {
      arcgis: 'https://services7.arcgis.com/1QmlDrAfwWWhhk9p/arcgis/rest/services/Arborizaci%C3%B3n_Bella_Vista_(P)/FeatureServer/0'
    },
    terms: 'Uso público.'
  },
  {
    country: 'Panama',
    state: 'Panamá',
    city: 'Betania',
    scope: 'Tree',
    info: 'https://datos-geomupa.opendata.arcgis.com/datasets/arborizaci%C3%B3n-betania-p/about',
    download: {
      arcgis: 'https://services7.arcgis.com/1QmlDrAfwWWhhk9p/arcgis/rest/services/Arborizaci%C3%B3n_Betania_(P)/FeatureServer/0'
    },
    terms: 'Uso público.'
  },
  {
    country: 'Panama',
    state: 'Panamá',
    city: 'Calidonia',
    scope: 'Tree',
    info: 'https://datos-geomupa.opendata.arcgis.com/datasets/arborizaci%C3%B3n-calidonia-p/about',
    download: {
      arcgis: 'https://services7.arcgis.com/1QmlDrAfwWWhhk9p/arcgis/rest/services/Arborizaci%C3%B3n_Calidonia_(P)/FeatureServer/0'
    },
    terms: 'Uso público.'
  },
  {
    country: 'Panama',
    state: 'Panamá',
    city: 'Panamá',
    designation: 'Cinta Costera',
    scope: 'Tree: park',
    info: 'https://www.arcgis.com/home/item.html?id=821e104cb34b46a0a4123643dc22a675',
    download: {
      arcgis: 'https://services3.arcgis.com/fa6CZoHjgtjaj3J6/arcgis/rest/services/Inventario_Arboles_Cinta_Costera/FeatureServer/0'
    }
  },
  {
    country: 'Panama',
    state: 'Panamá',
    city: 'San Felipe',
    scope: 'Tree',
    info: 'https://datos-geomupa.opendata.arcgis.com/datasets/arborizaci%C3%B3n-san-felipe-p/about',
    download: {
      arcgis: 'https://services7.arcgis.com/1QmlDrAfwWWhhk9p/arcgis/rest/services/Arborizaci%C3%B3n_San_Felipe_(P)/FeatureServer/0'
    },
    terms: 'Uso público.'
  },
  {
    country: 'Panama',
    state: 'Panamá',
    city: 'Santa Ana',
    scope: 'Tree',
    info: 'https://datos-geomupa.opendata.arcgis.com/datasets/arborizacion-santa-ana-p/about',
    download: {
      arcgis: 'https://services7.arcgis.com/1QmlDrAfwWWhhk9p/arcgis/rest/services/Arborizacion_Santa_Ana_(P)/FeatureServer/0'
    },
    terms: 'Uso público.'
  },
  {
    country: 'Poland',
    state: 'Masovian',
    city: 'Warszawa',
    scope: 'Tree',
    inactive: true,
    notes: 'Single trees',
    info: 'https://api.um.warszawa.pl',
    download: 'https://api.um.warszawa.pl/api/3/action/datastore_search?resource_id=ed6217dd-c8d0-4f7b-8bed-3b7eb81a95ba',
    geometry: { x: 'x_wgs84', y: 'y_wgs84' },
    srs: 'EPSG:4326',
    license: { id: 'CC0-1.0' },
    fallingfruit_id: 422
  },
  {
    country: 'Poland',
    state: 'Masovian',
    city: 'Warszawa',
    scope: 'Tree',
    inactive: true,
    notes: 'tree groups | Tree groups',
    info: 'https://api.um.warszawa.pl',
    download: 'https://api.um.warszawa.pl/api/3/action/datastore_search?resource_id=913856f7-f71b-4638-abe2-12df14334e1a',
    geometry: { x: 'x_wgs84', y: 'y_wgs84' },
    srs: 'EPSG:4326',
    license: { id: 'CC0-1.0' },
    fallingfruit_id: 416
  },
  {
    country: 'Poland',
    state: 'Masovian',
    city: 'Warszawa',
    scope: 'Plant',
    inactive: true,
    notes: 'Single shrubs',
    info: 'https://api.um.warszawa.pl',
    download: 'https://api.um.warszawa.pl/api/3/action/datastore_search?resource_id=0b1af81f-247d-4266-9823-693858ad5b5d',
    geometry: { x: 'x_wgs84', y: 'y_wgs84' },
    srs: 'EPSG:4326',
    license: { id: 'CC0-1.0' },
    fallingfruit_id: 419
  },
  {
    country: 'Poland',
    state: 'Masovian',
    city: 'Warszawa',
    scope: 'Plant',
    inactive: true,
    notes: 'plant groups | Shrub groups',
    info: 'https://api.um.warszawa.pl',
    download: 'https://api.um.warszawa.pl/api/3/action/datastore_search?resource_id=4b792a76-5349-4aad-aa16-dadaf0a74be3',
    geometry: { x: 'x_wgs84', y: 'y_wgs84' },
    srs: 'EPSG:4326',
    license: { id: 'CC0-1.0' },
    fallingfruit_id: 420
  },
  {
    country: 'Poland',
    state: 'West Pomeranian',
    city: 'Kołobrzeg',
    scope: 'Tree',
    info: 'https://dane.gov.pl/pl/dataset/2523/resource/33827,drzewa-miasta-koobrzeg',
    download: 'https://api.dane.gov.pl/media/resources/20211018/drzewa_ok.csv',
    openFunc: file => {
      // Convert UTF-16 BE to UTF-8
      const string = fs.readFileSync(file).swap16().toString('utf16le')
      const buffer = Buffer.from(string, 'utf8')
      const name = crypto.randomBytes(6).toString('hex')
      gdal.vsimem.set(buffer, `/vsimem/${name}.csv`)
      return gdal.open(`CSV:/vsimem/${name}.csv`)
    },
    geometry: { x: 'y', y: 'x' },
    srs: 'EPSG:4326',
    license: { id: 'CC-BY-4.0' }
  },
  {
    country: 'Portugal',
    state: 'Aveiro',
    city: 'Águeda',
    scope: 'Tree: notable',
    notes: 'Contains only one tree',
    info: 'https://ckan.sig.cm-agueda.pt/dataset/arvores-notaveis',
    download: 'https://ckan.sig.cm-agueda.pt/dataset/59f9bac6-b199-4766-8aaa-3cd60a29b280/resource/fe4fd727-9d6f-4657-9204-33b99721b8bc/download/arvoresnotaveis.geojson',
    license: { id: 'CC-BY-4.0' }
  },
  {
    country: 'Portugal',
    state: 'Lisboa',
    city: 'Cascais',
    scope: 'Tree',
    info: 'http://dadosabertos.cascais.pt/dataset/arvores-em-espaco-publico',
    download: 'https://dadosabertos.cascais.pt/dataset/5ae9100a-01ea-45da-bb02-e033aa5ebe90/resource/9a3f0648-de96-4075-88d5-f0e15ded4d2a/download/mnarvore.geojson',
    openFunc: file => {
      txt = fs.readFileSync(file, 'utf8').
        replace(/\}\s*(,\s*)*\{/gm, '},\n{').
        replace(/\}\s*(,\s*)*\]/gm, '}]')
      buffer = new Buffer.from(txt)
      return gdal.open(buffer)
    },
    delFunc: x => x['Geometry name'] === 'Localização Abate',
    crosswalk: {
      ref: 'Número de Registo',
      common: 'Espécie',
      scientific: 'Nome Científico',
      maturity: x => ({ Jovem: 'young', Adulto: 'mature', Velho: 'over-mature' })[x.Estado],
      location: x => ({ Arruamento: 'street', 'Espaço Verde': 'park' })[x.Implantação],
      manager: 'Gestor',
      updated: x => x['Data de actualização'] ?
        x['Data de actualização'].replace(/^([0-9]{2})\/([0-9]{2})\/([0-9]{4}).*$/, '$3-$2-$1') : null,
      planted: x => x['Data de Plantação'] ?
        x['Data de Plantação'].replace(/^([0-9]{2})\/([0-9]{2})\/([0-9]{4}).*$/, '$3-$2-$1') : null
    },
    license: { id: 'CC0-1.0' },
    fallingfruit_id: 449,
    opentrees_id: 'cascais_pt'
  },
  {
    country: 'Portugal',
    state: 'Lisboa',
    city: 'Lisboa',
    scope: 'Tree',
    info: 'https://geodados-cml.hub.arcgis.com/datasets/arvoredo/about',
    download: {
      arcgis: 'https://services.arcgis.com/1dSrzEWVQn5kHHyK/arcgis/rest/services/Ambiente_DMEVAE/FeatureServer/0'
    },
    crosswalk: { scientific: 'ESPECIE_VA', location: 'LOCAL' },
    license: { id: 'CC0-1.0' },
    fallingfruit_id: 450,
    opentrees_id: 'lisbon'
  },
  {
    country: 'Portugal',
    state: 'Lisboa',
    city: 'Oeiras',
    scope: 'Tree',
    info: 'https://oeirasinterativa.oeiras.pt/dadosabertos/dataset/biodiversidade-patrimonio-arboreo',
    download: 'https://oeirasinterativa.oeiras.pt/dadosabertos/dataset/415e3f04-1ee3-4fff-ab49-6d323db420db/resource/b41fe0e3-5153-4734-a5ee-5cd518c64d2f/download/patrimonio_arboreo.geojson',
    license: { id: 'CC-BY-4.0' }
  },
  {
    country: 'Saudi Arabia',
    state: 'Riyadh',
    city: 'Riyadh',
    designation: 'Al Safarat (Diplomatic Quarter)',
    info: 'https://www.arcgis.com/home/item.html?id=e87ac8ba79a74258afbe6efb7fbd5201',
    download: {
      arcgis: 'https://services7.arcgis.com/VPnUdZ9GD3BHF2nT/arcgis/rest/services/a31787ce163bd25c/FeatureServer/0'
    }
  },
  {
    country: 'Singapore',
    scope: 'Tree: notable',
    info: 'https://beta.data.gov.sg/datasets/d_644ff187b6d14d6316f47284a4a6c81f/view',
    download: {
      manual: 'https://beta.data.gov.sg/datasets/d_644ff187b6d14d6316f47284a4a6c81f/view'
    },
    license: {
      name: 'Singapore Open Data License 1.0',
      url: 'https://beta.data.gov.sg/open-data-license'
    }
  },
  {
    country: 'Spain',
    state: 'Andalucía',
    city: 'Sevilla',
    scope: 'Tree: street',
    info: 'https://cda-idesevilla.opendata.arcgis.com/datasets/parques-y-jardines-arbol-viario/about',
    download: {
      arcgis: 'https://services1.arcgis.com/hcmP7kr0Cx3AcTJk/arcgis/rest/services/Parques_y_Jardines_Arbol_Viario/FeatureServer/0'
    },
    crosswalk: { scientific: 'Nombre', height: 'Altura', maturity: 'Observ' },
    license: { id: 'CC-BY-NC-4.0' },
    opentrees_id: 'sevilla_es'
  },
  {
    country: 'Spain',
    state: 'Andalucía',
    city: 'Sevilla',
    scope: 'Tree: park',
    info: 'https://cda-idesevilla.opendata.arcgis.com/datasets/parques-y-jardines-arbol-zona-verde/about',
    download: {
      arcgis: 'https://services1.arcgis.com/hcmP7kr0Cx3AcTJk/arcgis/rest/services/Parques_y_Jardines_Arbol_ZonaVerde/FeatureServer/0'
    },
    license: { id: 'CC-BY-NC-4.0' },
    opentrees_id: 'sevilla_es'
  },
  {
    country: 'Spain',
    state: 'Andalucía',
    city: 'Sevilla',
    scope: 'Tree: park',
    info: 'https://cda-idesevilla.opendata.arcgis.com/datasets/ideSEVILLA::parques-y-jardines-palmera-zona-verde/about',
    download: {
      arcgis: 'https://services1.arcgis.com/hcmP7kr0Cx3AcTJk/arcgis/rest/services/Parques_y_Jardines_Palmera_ZonaVerde/FeatureServer/0'
    },
    license: { id: 'CC-BY-NC-4.0' },
    opentrees_id: 'sevilla_es'
  },
  {
    country: 'Spain',
    state: 'Asturias',
    city: 'Gijón / Xixón',
    scope: 'Tree: park',
    info: 'https://observa.gijon.es/explore/dataset/arbolado-municipal-parques-y-jardines/information/',
    download: 'https://observa.gijon.es/api/explore/v2.1/catalog/datasets/arbolado-municipal-parques-y-jardines/exports/geojson',
    license: { id: 'CC-BY-4.0' }
  },
  {
    country: 'Spain',
    state: 'Castilla y Léon',
    scope: 'Tree: notable',
    info: [
      'https://datosabiertos.jcyl.es/web/jcyl/set/es/medio-ambiente/arboles_singulares/1284378127197',
      {file: 'https://datosabiertos.jcyl.es/web/jcyl/binarios/806/840/Diccionario%20de%20entidades.pdf'}
    ],
    download: 'https://datosabiertos.jcyl.es/web/jcyl/risp/es/medio-ambiente/arboles_singulares/1284378127197.gml32',
    license: { id: 'CC-BY-4.0' }
  },
  {
    country: 'Spain',
    state: 'Castilla y Léon',
    scope: 'Tree: notable',
    info: 'https://datosabiertos.jcyl.es/web/jcyl/set/es/medio-ambiente/arboles-singulares-cyl/1284687288895',
    download: 'https://datosabiertos.jcyl.es/web/jcyl/risp/es/medio-ambiente/arboles-singulares-cyl/1284687288895.shp',
    vfs: '/vsizip/',
    license: { id: 'IGCYL-NC' }
  },
  {
    country: 'Spain',
    state: 'Catalunya',
    city: 'Barcelona',
    scope: 'Tree: park',
    info: 'https://opendata-ajuntament.barcelona.cat/data/ca/dataset/arbrat-zona',
    download: 'https://opendata-ajuntament.barcelona.cat/data/dataset/9b525e1d-13b8-48f1-abf6-f5cd03baa1dd/resource/29cd5c1f-11b1-404b-b3a5-ae29940b8c55/download',
    geometry: { x: 'longitud', y: 'latitud' },
    srs: 'EPSG:4326',
    license: { id: 'CC-BY-4.0' },
    opentrees_id: 'barcelona'
  },
  {
    country: 'Spain',
    state: 'Catalunya',
    city: 'Barcelona',
    scope: 'Tree: street',
    info: 'https://opendata-ajuntament.barcelona.cat/data/ca/dataset/arbrat-viari',
    download: 'https://opendata-ajuntament.barcelona.cat/data/dataset/27b3f8a7-e536-4eea-b025-ce094817b2bd/resource/23124fd5-521f-40f8-85b8-efb1e71c2ec8/download',
    geometry: { x: 'longitud', y: 'latitud' },
    srs: 'EPSG:4326',
    crosswalk: {
      common: 'NOM_CASTELLA',
      scientific: 'NOM_CIENTIFIC',
      planted: 'DATA_PLANTACIO',
      ref: 'CODI',
      crown: x =>
      ({ PETITA: 'small', MITJANA: 'average', GRAN: 'large' }[
        x.ALCADA
      ] || x.ALCADA)
    },
    license: { id: 'CC-BY-4.0' },
    opentrees_id: 'barcelona'
  },
  {
    country: 'Spain',
    state: 'Catalunya',
    city: 'Barcelona',
    scope: 'Tree: park',
    info: 'https://opendata-ajuntament.barcelona.cat/data/ca/dataset/arbrat-parcs',
    download: 'https://opendata-ajuntament.barcelona.cat/data/dataset/99ce00b1-36ab-4e06-b1bc-c60c5f7a811d/resource/23076aaa-4f0e-4045-b4e5-61d5e651b5a6/download',
    geometry: { x: 'longitud', y: 'latitud' },
    srs: 'EPSG:4326',
    license: { id: 'CC-BY-4.0' },
    opentrees_id: 'barcelona'
  },
  {
    country: 'Spain',
    state: 'Catalunya',
    city: 'Girona',
    scope: 'Tree',
    info: 'https://www.girona.cat/opendata/dataset/arbrat',
    download: 'https://terra.girona.cat/opendata/storage/f/2023-01-12T10%3A33%3A55.643Z/arbrat2022.csv',
    coordsFunc: x => [
      Number(x['x'].replace(',', '.')),
      Number(x['y'].replace(',', '.'))
    ],
    srs: 'EPSG:25831',
    license: {
      name: 'Ajuntament de Girona Condicions de Reproducció',
      url: 'https://umat.girona.cat/legal.html'
    }
  },
  {
    country: 'Spain',
    state: 'Catalunya',
    city: 'Manlleu',
    scope: 'Tree',
    info: 'https://dadesobertes-situam.opendata.arcgis.com/datasets/arbrat-del-nucli-urb%C3%A0/about',
    download: {
      arcgis: 'https://services.arcgis.com/WNsrZDHEJ88NE4N8/arcgis/rest/services/Arbrat_del_nucli_urb%C3%A0/FeatureServer/0'
    },
    crosswalk: { common: 'NCOMU', scientific: 'NCIENTIFIC', note: 'OBSERVACIO' },
    license: { id: 'CC-BY-4.0' },
    opentrees_id: 'manlleu_es'
  },
  {
    country: 'Spain',
    state: 'Comunidad de Madrid',
    city: 'Alcobendas',
    scope: 'Tree',
    info: 'https://datos.alcobendas.org/dataset/arbolado-de-alcobendas',
    download: 'https://datos.alcobendas.org/dataset/6eb910fa-ce25-4d35-8344-f15a278665b7/resource/de7d9c20-dec6-4fb2-86ef-0215fc55465d/download/jararb.geojson',
    license: { id: 'CC-BY-4.0' }
  },
  {
    country: 'Spain',
    state: 'Comunidad de Madrid',
    city: 'Aranjuez',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=07d25d0bbbfd4666968e35bd19be4cdf',
    download: {
      arcgis: 'https://services-eu1.arcgis.com/cinoPLPBK4W8ptpL/arcgis/rest/services/Inventario_final_gdb_vista/FeatureServer/1'
    }
  },
  {
    country: 'Spain',
    state: 'Comunidad de Madrid',
    city: 'Aranjuez',
    scope: 'Tree: notable',
    info: 'https://www.arcgis.com/home/item.html?id=07d25d0bbbfd4666968e35bd19be4cdf',
    download: {
      arcgis: 'https://services-eu1.arcgis.com/cinoPLPBK4W8ptpL/arcgis/rest/services/Inventario_final_gdb_vista/FeatureServer/2'
    }
  },
  {
    country: 'Spain',
    state: 'Comunidad de Madrid',
    city: 'Arganda del Rey',
    scope: 'Tree',
    info: 'https://datosabiertos.ayto-arganda.es/dataset/bc20e1e3-0c6c-4f0e-817b-c95f052e3783',
    download: 'https://datosabiertos.ayto-arganda.es/dataset/bc20e1e3-0c6c-4f0e-817b-c95f052e3783/resource/c09a7d05-8d9a-4ca9-92a5-f1be247a8493/download/arbolado-2.geojson',
    srs: 'EPSG:32630',
    delFunc: x => x['ESTADO'] === 'ALCORQUE VACIO',
    crosswalk: {
      ref: 'REFERENCIA',
      scientific: 'EMPLAZAMIENTO',
      common: 'NOMBRE COMUN',
      height: 'ALTURA',
      dbh_cm: 'DIAMETRO',
      age: 'EDAD',
      location: x => ({ 'ZONA VERDE': 'park', VIARIO: 'street' })[x.ZONA],
      health: x => ({ 'ARBOL SECO': 'dead', ENFERMO: 'poor', DUDOSO: 'fair', REGULAR: 'good', BUENO: 'very good' })[x.ESTADO]
    },
    license: { id: 'CC-BY-4.0' },
    opentrees_id: 'arganda-del-rey'
  },
  {
    country: 'Spain',
    state: 'Comunidad de Madrid',
    city: 'Madrid',
    designation: 'Ciudad Universitaria | Universidad Complutense de Madrid – Somosaguas',
    info: 'https://www.arcgis.com/home/item.html?id=e03f9083d0b94d3f911b0342f4804151',
    download: {
      arcgis: 'https://services1.arcgis.com/wKWg6g7Ozgov9sfw/arcgis/rest/services/Inventario_del_arbolado_UCM/FeatureServer/0'
    }
  },
  {
    country: 'Spain',
    state: 'Comunidad de Madrid',
    city: 'Rivas-Vaciamadrid',
    scope: 'Tree',
    info: 'https://datos.gob.es/es/catalogo/l01281230-arbolado1',
    download: 'https://datosabiertos.rivasciudad.es/dataset/b93c8cce-a41c-4030-9fe7-62e97392dba1/resource/19174f14-5835-4fd6-8ca7-79babcc453b6/download/arbolado_geojson.zip',
    vfs: '/vsizip/',
    license: { id: 'ODC-By-1.0' }
  },
  {
    country: 'Spain',
    state: 'Comunidad Valenciana',
    scope: 'Tree: notable',
    info: 'https://datos.gob.es/es/catalogo/a10002983-catalogo-de-arboles-monumentales-y-singulares-de-la-comunitat-valenciana',
    download: {
      arcgis: 'https://carto.icv.gva.es/arcgis/rest/services/tm_medio_ambiente/forestal/MapServer/0'
    },
    license: { id: 'CC-BY-4.0' }
  },
  {
    country: 'Spain',
    state: 'Comunidad Valenciana',
    city: 'Torrent',
    scope: 'Tree',
    inactive: 'http://datosabiertos.torrent.es is either down or geofenced',
    info: 'https://datos.gob.es/es/catalogo/l01462444-arbres-de-torrent-2016-arboles-de-torrent-2016',
    download: 'http://datosabiertos.torrent.es/dataset/b372b8dd-07fb-4973-a2af-cb9a7c8de9bb/resource/dbae0e9d-c48b-4185-8a51-2599b093fdba/download/ODMAArbolAislado.csv',
    geometry: { x: 'X', y: 'Y' },
    srs: 'EPSG:4326',
    crosswalk: { scientific: 'ESPECIE' },
    license: { id: 'CC-BY-4.0' },
    opentrees_id: 'torrent_es'
  },
  {
    country: 'Spain',
    state: 'Comunidad Valenciana',
    city: 'Valencia',
    scope: 'Tree',
    info: 'https://valencia.opendatasoft.com/explore/dataset/arbratge-arbolado/information/',
    download: 'https://valencia.opendatasoft.com/api/explore/v2.1/catalog/datasets/arbratge-arbolado/exports/geojson',
    crosswalk: { scientific: 'planta', common: 'castellano' },
    license: { id: 'CC-BY-4.0' },
    terms: 'https://valencia.opendatasoft.com/terms/terms-and-conditions/',
    opentrees_id: 'valencia_es'
  },
  {
    country: 'Spain',
    state: 'Comunidad Valenciana',
    city: 'Valencia',
    scope: 'Tree: notable',
    info: 'https://valencia.opendatasoft.com/explore/dataset/arbratge-protegit-municipal-arbolado-protegido-municipal/information/',
    download: 'https://valencia.opendatasoft.com/api/explore/v2.1/catalog/datasets/arbratge-protegit-municipal-arbolado-protegido-municipal/exports/geojson',
    license: { id: 'CC-BY-4.0' },
    terms: 'https://valencia.opendatasoft.com/terms/terms-and-conditions/',
    opentrees_id: 'valencia_es'
  },
  {
    country: 'Spain',
    state: 'Extremadura',
    city: 'Cáceres',
    scope: 'Tree',
    notes: 'Manual download with SPARQL query: SELECT ?uri ?om_variedad ?om_genero ?geo_long ?om_riego ?om_unidades ?geo_lat ?dbpedia_owl_family ?dbpedia_owl_genus ?rdfs_label ?dbpedia_owl_order ?om_diametroTronco ?om_altura ?dbpedia_owl_species ?om_diametroCopa ?om_ubicacion  WHERE { \n' +
      '?uri a om:Arbol. \n' +
      'OPTIONAL  {?uri om:variedad ?om_variedad. }\n' +
      'OPTIONAL  {?uri om:genero ?om_genero. }\n' +
      'OPTIONAL  {?uri geo:long ?geo_long. }\n' +
      'OPTIONAL  {?uri om:riego ?om_riego. }\n' +
      'OPTIONAL  {?uri om:unidades ?om_unidades. }\n' +
      'OPTIONAL  {?uri geo:lat ?geo_lat. }\n' +
      'OPTIONAL  {?uri dbpedia-owl:family ?dbpedia_owl_family. }\n' +
      'OPTIONAL  {?uri dbpedia-owl:genus ?dbpedia_owl_genus. }\n' +
      'OPTIONAL  {?uri rdfs:label ?rdfs_label. }\n' +
      'OPTIONAL  {?uri dbpedia-owl:order ?dbpedia_owl_order. }\n' +
      'OPTIONAL  {?uri om:diametroTronco ?om_diametroTronco. }\n' +
      'OPTIONAL  {?uri om:altura ?om_altura. }\n' +
      'OPTIONAL  {?uri dbpedia-owl:species ?dbpedia_owl_species. }\n' +
      'OPTIONAL  {?uri om:diametroCopa ?om_diametroCopa. }\n' +
      'OPTIONAL  {?uri om:ubicacion ?om_ubicacion. }}',
    info: 'http://opendata.caceres.es/dataset/arboles-caceres',
    download: { manual: 'http://opendata.caceres.es/dataset/arboles-caceres' },
    geometry: { x: 'geo_long', y: 'geo_lat' },
    srs: 'EPSG:4326',
    crosswalk: {
      ref: 'uri',
      scientific: x =>
              String(x.dbpedia_owl_species)
      .replace(/.*\//, '')
      .replace(/_/g, ' '),
      family: x =>
              String(x.dbpedia_owl_family)
      .replace(/.*\//, '')
      .replace(/_/g, ' '),
      height: 'om_altura'
    },
    license: { id: 'CC-BY-4.0' },
    opentrees_id: 'caceres_es'
  },
  {
    country: 'Spain',
    state: 'Illes Balears',
    scope: 'Tree: notable',
    info: 'https://catalegdades.caib.cat/Medi-ambient/Arbres-Singulars-Illes-Balears/f2hg-sgdb',
    download: 'https://catalegdades.caib.cat/api/geospatial/f2hg-sgdb?method=export&format=geojson',
    license: { id: 'CC-BY-4.0' }
  },
  {
    country: 'Spain',
    state: 'Islas Canarias',
    city: 'Santa Cruz de Tenerife',
    scope: 'Tree: notable',
    info: 'https://www.santacruzdetenerife.es/opendata/dataset/arboles-singulares',
    download: 'https://www.santacruzdetenerife.es/opendata/dataset/7850581f-371b-4307-a635-3a8c2802a964/resource/b9847725-22ea-4835-945f-c58cdc2e0d0a/download/arboles_singulares.geojson',
    license: { id: 'CC-BY-4.0' }
  },
  {
    country: 'Spain',
    state: 'Navarra',
    city: 'Pamplona',
    scope: 'Tree',
    info: 'https://datosabiertos.navarra.es/es/dataset/spapamplona_jard_pto_arbol',
    download: 'https://sig.pamplona.es/descargas/JARD_Pto_Arbol.zip',
    vfs: '/vsizip/',
    license: { id: 'CC-BY-4.0' }
  },
  {
    country: 'Spain',
    state: 'Tenerife',
    city: 'Santa Cruz de Tenerife',
    info: 'https://www.arcgis.com/home/item.html?id=9d31b1cc9b2245d280264cb628a93126',
    download: {
      arcgis: 'https://services1.arcgis.com/AidH51KIlT1JXpjE/arcgis/rest/services/Arbolado/FeatureServer/1'
    }
  },
  {
    country: 'Sweden',
    scope: 'Tree: notable',
    notes: 'unofficial',
    info: 'https://github.com/perliedman/tradportalen-export',
    download: 'https://tradportalen.s3.eu-north-1.amazonaws.com/tradportalen.zip',
    vfs: '/vsizip/',
    crosswalk: {
      scientific: x => String(x.Species).split(', ')[1],
      common: x => String(x.Species).split(', ')[0],
      height: 'Height',
      circumference_cm: 'TrunkCircumference'
    },
    opentrees_id: 'tradportalen'
  },
  {
    country: 'Sweden',
    state: 'Gävleborg',
    scope: 'Tree: notable',
    notes: 'coarse species',
    info: 'https://ext-geodatakatalog.lansstyrelsen.se/GeodataKatalogen/GetMetaDataById?id=1c681c91-a12f-4c84-a9fa-84d2fd39f85b',
    download: 'https://ext-dokument.lansstyrelsen.se/gemensamt/geodata/ShapeExport/Lstx.LstX_GI_Alla_inv_trad.zip',
    vfs: '/vsizip/',
    license: { id: 'CC0-1.0' }
  },
  {
    country: 'Sweden',
    state: 'Halland',
    scope: 'Tree: notable',
    notes: 'coarse species',
    info: 'https://ext-geodatakatalog.lansstyrelsen.se/GeodataKatalogen/GetMetaDataById?id=30bde742-d61e-4362-b75c-7467fa6bc820',
    download: 'https://ext-dokument.lansstyrelsen.se/gemensamt/geodata/ShapeExport/Lstn.Lst_Tradinventering.zip',
    vfs: '/vsizip/',
    license: { id: 'CC-BY-SA-4.0' }
  },
  {
    country: 'Sweden',
    state: 'Jönköping',
    scope: 'Tree: notable',
    info: 'https://ext-geodatakatalog.lansstyrelsen.se/GeodataKatalogen/GetMetaDataById?id=251f9f84-e8b4-4e76-af39-1ccb19445a8f',
    download: {
      arcgis: 'https://ext-geodata-lokala.lansstyrelsen.se/arcgis/rest/services/LSTF/lstf_wms_1/MapServer/8'
    },
    license: { id: 'CC0-1.0' }
  },
  {
    country: 'Sweden',
    state: 'Västerbotten',
    city: 'Umeå',
    scope: 'Tree',
    info: 'https://opendata.umea.se/explore/dataset/trad-som-forvaltas-av-gator-och-parker/information/',
    download: 'https://opendata.umea.se/api/explore/v2.1/catalog/datasets/trad-som-forvaltas-av-gator-och-parker/exports/geojson',
    crosswalk: {
      scientific: 'tradart_vet',
      common: 'tradart_sve',
      location: 'gatu_eller',
      planted: 'planterings'
    },
    license: { id: 'CC0-1.0' },
    opentrees_id: 'umea'
  },
  {
    country: 'Sweden',
    state: 'Västra Götaland',
    scope: 'Tree: notable',
    notes: 'coarse species',
    info: 'https://ext-geodatakatalog.lansstyrelsen.se/GeodataKatalogen/GetMetaDataById?id=97d7c820-f382-458c-aeb8-89ca6a519f34',
    download: 'https://ext-dokument.lansstyrelsen.se/gemensamt/geodata/ShapeExport/Lsto.pg204_skyddsvarda_trad_.zip',
    vfs: '/vsizip/',
    license: { id: 'CC0-1.0' }
  },
  {
    country: 'Switzerland',
    state: 'Basel-Stadt',
    city: 'Basel',
    scope: 'Tree',
    info: 'https://data.bs.ch/explore/dataset/100052/information/',
    download: 'https://data.bs.ch/api/explore/v2.1/catalog/datasets/100052/exports/geojson',
    crosswalk: {
      scientific: x => String(x.art).replace(/ \(.*/, ''),
      common: x => (String(x.art).match(/\((.*)\)/) || ['', ''])[1],
      planted: 'pflanzdatu',
      age: 'baumalter'
    },
    license: { id: 'CC-BY-3.0-CH' },
    opentrees_id: 'basel'
  },
  {
    country: 'Switzerland',
    state: 'Basel-Stadt',
    city: 'Bern',
    scope: 'Tree',
    info: 'https://map.bern.ch/geoportal/#/produkt/Baumkataster',
    download: 'https://map.bern.ch/arcgis/services/Geoportal/Baumkataster/MapServer/WFSServer?service=WFS&version=2.0.0&request=GetFeature&typeNames=Geoportal_Baumkataster:Baumkataster&srsName=EPSG:4326&outputFormat=GEOJSON',
    terms: 'Freie Nutzung. Quellenangabe ist Pflicht.'
  },
  {
    country: 'Switzerland',
    state: 'Bern',
    city: 'Biel / Bienne',
    scope: 'Tree',
    info: 'https://sig.biel-bienne.ch/data/e331_baumkataster_f.html',
    download: 'https://websig.ch/datastore/E331_Baumkataster-Cadastre_des_arbres/e331_baumkataster.json.zip',
    vfs: '/vsizip/'
  },
  {
    country: 'Switzerland',
    state: 'Fribourg',
    scope: 'Tree: notable',
    info: 'https://geo.fr.ch/portal/apps/sites/#/geoportail/datasets/7d70360d05f647458d4255858448c10a',
    download: {
      arcgis: 'https://geo.fr.ch/ags/rest/services/OpenData/Arbres_spectaculaires/FeatureServer/0'
    },
    license: {
      name: 'opendata.swiss Attribution',
      url: 'https://opendata.swiss/en/terms-of-use/#terms_by'
    }
  },
  {
    country: 'Switzerland',
    state: 'Genève',
    scope: 'Tree',
    info: 'https://ge.ch/sitg/fiche/4571',
    download: {
      arcgis: 'https://ge.ch/sitgags1/rest/services/VECTOR/SITG_OPENDATA_04/MapServer/4571'
    },
    geometry: { x: 'E', y: 'N' },
    srs: 'EPSG:2056',
    crosswalk: {
      scientific: 'NOM_COMPLET',
      notable: x => x['REMARQUABLE'] ? 'remarquable' : null,
      location: 'TYPE_PLANTATION',
      stems_range: x => x['NOMBRE_TRONCS'] == -9999 ? null : x['NOMBRE_TRONCS'],
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
      dead: x => x['ESPERANCE_VIE'] ? Math.round(x['ESPERANCE_VIE']) : null,
      planted: 'DATE_PLANTATION',
      updated: 'DATE_OBSERVATION'
    },
    license: {
      name: "Conditions Générales d'Utilisation des géodonnées et produits du SITG en libre accès 2020.09",
      url: {file: 'https://ge.ch/sitg/media/sitg/files/documents/conditions_generales_dutilisation_des_donnees_et_produits_du_sitg_en_libre_acces_-_revision_09.2020.pdf'}
    },
    opentrees_id: 'geneva'
  },
  {
    country: 'Switzerland',
    state: 'Jura',
    scope: 'Tree: edible',
    notes: 'coarse species | private agriculture?',
    info: 'https://www.geocat.ch/geonetwork/srv/eng/catalog.search#/metadata/C3760E5E-E46F-4008-BAC2-54BC386C8C87',
    download: 'https://geo.jura.ch/geodonnees/donnees/SDT_4_21_Inventaire_des_arbres_sur_tiges.zip',
    vfs: '/vsizip/',
    filename: 'SDT_4_21_Inventaire_des_arbres_sur_tiges/donnees.gpkg',
    license: {
      name: 'opendata.swiss Attribution',
      url: 'https://opendata.swiss/en/terms-of-use/#terms_by'
    }
  },
  {
    country: 'Switzerland',
    state: 'Jura',
    scope: 'Tree: notable',
    notes: 'coarse species | private agriculture?',
    info: 'https://www.geocat.ch/geonetwork/srv/eng/catalog.search#/metadata/5508A363-B8A5-4DE0-ADB3-F932E6BA0853',
    download: 'https://geo.jura.ch/geodonnees/donnees/ENV_3_13_Arbres_remarquables.zip',
    vfs: '/vsizip/',
    filename: 'ENV_3_13_Arbres_remarquables/donnees.gpkg',
    layer: 'env.env_03_13_arbres_remarquables_points',
    license: {
      name: 'opendata.swiss Attribution',
      url: 'https://opendata.swiss/en/terms-of-use/#terms_by'
    }
  },
  {
    country: 'Switzerland',
    state: 'Luzern',
    city: 'Luzern',
    scope: 'Tree',
    info: 'https://www.geocat.ch/geonetwork/srv/eng/catalog.search#/metadata/f6733a2d-6299-418e-9d8f-fdbb51f27710-8371',
    download: 'https://map.stadtluzern.ch/ogd/ogddownload/gis/gruenraum/baeume/gruenraum_baum_json.zip',
    vfs: '/vsizip/',
    filename: 'GRUENRAUM_BAUM.json'
  },
  {
    country: 'Switzerland',
    state: 'Vaud',
    city: 'Pully',
    scope: 'Tree: notable',
    notes: 'WFS server refuses to transform coordinates (srsName param)',
    info: 'https://viageo.ch/catalogue/donnee/201093',
    download: 'https://www.sigip.ch/mapserv_proxy?ogcserver=ows&service=WFS&version=2.0.0&request=GetFeature&typeNames=ms:pully_pp_arbres_classes',
    terms: "Le responsable s’engage à utiliser les données commandées exclusivement pour le projet désigné. Il s'engage à ne pas commercialiser les données. La source doit être indiquée sur chaque reproduction (Copyrights géodonnées Ville de Pully). La rediffusion, sans autorisation préalable, des données est interdite (y compris sur internet)."
  },
  {
    country: 'Switzerland',
    state: 'Vaud',
    city: 'Pully',
    scope: 'Tree',
    notes: 'WFS server refuses to transform coordinates (srsName param)',
    info: 'https://viageo.ch/catalogue/donnee/300053',
    download: 'https://www.sigip.ch/mapserv_proxy?ogcserver=ows&service=WFS&version=2.0.0&request=GetFeature&typeNames=ms:pully_arbres',
    terms: "Le responsable s’engage à utiliser les données commandées exclusivement pour le projet désigné. Il s'engage à ne pas commercialiser les données. La source doit être indiquée sur chaque reproduction (Copyrights géodonnées Ville de Pully). La rediffusion, sans autorisation préalable, des données est interdite (y compris sur internet)."
  },
  {
    country: 'Switzerland',
    state: 'Zürich',
    city: 'Winterthur',
    scope: 'Tree',
    info: 'https://stadt.winterthur.ch/themen/leben-in-winterthur/planen-und-bauen/wir-beraten-sie/geoinformation-und-vermessung/2d-stadtplan/2d-stadtplan-datenbeschreibung#baumkastaster',
    download: 'https://stadtplan.winterthur.ch/wms/Baumkataster?service=WFS&version=2.0.0&request=GetFeature&typeNames=ms:Stadtbaum&srsName=EPSG:4326',
    openFunc: file => {
      const txt = fs.readFileSync(file, 'utf8')
      // Fix <!-- WARNING: The value '*' is not valid in a XML tag context. -->
      const xml = txt.replaceAll('wissenschaftlicher Name', 'wissenschaftlicher_Name').replaceAll('deutscher Name', 'deutscher_Name').replaceAll('Aktivität', 'Aktivitaet')
      const buffer = Buffer.from(xml)
      return gdal.open(buffer)
    }
  },
  {
    country: 'Switzerland',
    state: 'Zürich',
    city: 'Zürich',
    scope: 'Tree',
    info: 'https://data.stadt-zuerich.ch/dataset/geo_baumkataster',
    download: 'https://www.ogd.stadt-zuerich.ch/wfs/geoportal/Baumkataster?service=WFS&version=1.1.0&request=GetFeature&outputFormat=GeoJSON&typename=baumkataster_baumstandorte',
    srs: 'EPSG:2056',
    crosswalk: {
      ref: 'baumnummer',
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
      planted: 'pflanzjahr',
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
    },
    license: { id: 'CC0-1.0' },
    fallingfruit_id: 430,
    opentrees_id: 'zurich'
  },
  {
    country: 'Taiwan',
    city: 'New Taipei',
    scope: 'Tree: notable',
    info: 'https://data.ntpc.gov.tw/datasets/dfd0dd0f-564b-461f-88fd-4493a87387b9',
    download: 'https://data.ntpc.gov.tw/api/datasets/dfd0dd0f-564b-461f-88fd-4493a87387b9/csv/zip',
    vfs: '/vsizip/',
    geometry: { x: 'field8', y: 'field9' },
    srs: 'EPSG:3826',
    license: { id: 'OGDL-Taiwan-1.0' }
  },
  {
    country: 'Taiwan',
    city: 'Taichung',
    scope: 'Tree',
    info: 'https://data.gov.tw/dataset/108167',
    download: 'https://datacenter.taichung.gov.tw/swagger/OpenData/2025f00b-92b2-4270-baaf-b2d8ccaa1fec',
    geometry: { x: '緯度', y: '經度' },
    srs: 'EPSG:4326',
    license: { id: 'OGDL-Taiwan-1.0' }
  },
  {
    country: 'United Kingdom',
    scope: 'Tree: notable',
    info: 'https://data-forestry.opendata.arcgis.com/datasets/8bda5450dfbd402eb558baa7fb1e7210_0/about',
    download: {
      arcgis: 'https://services2.arcgis.com/mHXjwgl3OARRqqD4/arcgis/rest/services/BIG_TREE_PLANT_SITES/FeatureServer/0'
    }
  },
  {
    country: 'United Kingdom',
    scope: 'Tree: notable',
    info: 'https://www.arcgis.com/home/item.html?id=cd7f5390ebde4312a53154432cf490b3',
    download: {
      arcgis: 'https://services-eu1.arcgis.com/WIfgdJeDbrZU1cnA/arcgis/rest/services/Ancient_Tree_Inventory_ATI/FeatureServer/29'
    },
    terms: 'The Data may not be used in publicly available Internet mapping services (e.g. Google Maps/Earth, Microsoft Bing Maps or Yahoo Maps) without prior written permission from the Woodland Trust. Please contact the Woodland Trust’s Ancient Tree Inventory via ancienttreeinventory@woodlandtrust.org.uk if you wish to publish The Data within the public domain.'
  },
  {
    country: 'United Kingdom',
    state: 'East Midlands',
    city: 'Nottingham',
    scope: 'Tree',
    info: 'https://www.opendatanottingham.org.uk/dataset.aspx?id=209',
    download: 'https://geoserver.nottinghamcity.gov.uk/opendata/geojson/ncc_Trees_Points.json?t=638174920897474866',
    license: { id: 'OGL-UK-3.0' },
    terms: 'https://www.ordnancesurvey.co.uk/customers/public-sector/public-sector-licensing/copyright-acknowledgments'
  },
  {
    country: 'United Kingdom',
    state: 'East of England',
    city: 'Norwich',
    scope: 'Tree: notable',
    info: 'https://data.gov.uk/dataset/d4779659-8981-4d5a-89bf-3058e7f6d21b/tree-preservation-orders-trees',
    download: 'http://inspire.misoportal.com/geoserver/norwich_city_council_tpo_trees_trees/wfs?service=WFS&version=2.0.0&request=GetFeature&typeNames=norwich_city_council_tpo_trees_trees:tpo_trees_trees&srsName=EPSG:4326'
  },
  {
    country: 'United Kingdom',
    state: 'London',
    city: 'Camden',
    scope: 'Tree',
    notes: 'Replaces Camden subset of London',
    info: 'https://opendata.camden.gov.uk/Environment/Trees-In-Camden/csqp-kdss',
    download: 'https://opendata.camden.gov.uk/api/views/csqp-kdss/rows.csv',
    driver: 'CSV',
    geometry: { x: 'Longitude', y: 'Latitude' },
    delFunc: x => x['Number Of Trees'] == 0 || x['Scientific Name'].match(/^vacant /i),
    crosswalk: {
      count: 'Number Of Trees',
      location: x => ({
        'Corporate Landlord': 'corporate',
        'Education': 'school',
        'Highways': 'street',
        'Housing': 'residential',
        'Parks': 'park'
      })[x['Contract Area']],
      scientific: 'Scientific Name',
      common: x => x['Common Name'] ?
        x['Common Name'].replace(/^\s*(.*) - (.*).*/, '$2 $1') : null,
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
      value: 'Capital Asset Value For Amenity Trees',
      carbon_kg: 'Carbon Storage In Kilograms',
      carbon_annual_kg: 'Gross Carbon Sequestration Per Year In Kilograms',
      ref: 'Identifier'
    },
    license: { id: 'OGL-UK-3.0' },
    opentrees_id: 'camden-uk'
  },
  {
    country: 'United Kingdom',
    state: 'London',
    city: 'Lambeth',
    scope: 'Tree',
    notes: 'Replaces Lambeth subset of London',
    info: 'https://lambethopenmappingdata-lambethcouncil.opendata.arcgis.com/datasets/lambethcouncil::trees-on-public-land/about',
    download: {
      arcgis: 'https://gis.lambeth.gov.uk/arcgis/rest/services/LambethTreesonPublicLand/MapServer/0'
    },
    geometry: { x: 'X', y: 'Y' },
    srs: 'EPSG:4326',
    delFunc: x => x.COMMONNAME === "'Vacant tree pit'" ||
      x.SPECIES.match(/tree removed|^\[/i),
    crosswalk: {
      ref: 'OBJECTID',
      scientific: x => x.SPECIES.match(/^'|unknown/i) ? null : x.SPECIES,
      common: x => x.COMMONNAME.match(/^'/) ? null : x.COMMONNAME,
      health: x => x.COMMONNAME === "'Dead Tree'" ? 'dead' : null
    },
    license: { id: 'OGL-UK-3.0' },
    opentrees_id: 'lambeth'
  },
  {
    country: 'United Kingdom',
    state: 'London',
    city: 'London',
    scope: 'Tree',
    info: 'https://data.london.gov.uk/dataset/local-authority-maintained-trees',
    download: 'https://data.london.gov.uk/download/local-authority-maintained-trees/61bd9591-ba63-4f0c-ab77-81db6347e856/Borough_tree_list_2021.csv',
    geometry: { x: 'lon', y: 'lat' },
    srs: 'EPSG:4326',
    delFunc: x => ['Camden', 'Lambeth'].includes(x.borough),
    crosswalk: {
      ref: 'gla_id',
      scientific: 'species_name',
      common: 'common_name',
      description: 'display_name'
    },
    license: { id: 'OGL-UK-3.0' },
    opentrees_id: 'london'
  },
  {
    country: 'United Kingdom',
    state: 'Northern Ireland',
    city: 'Belfast',
    scope: 'Tree',
    info: 'https://data.gov.uk/dataset/a334b6bc-a8cf-438c-be05-827fd265c672/belfast-street-trees',
    download: 'https://www.belfastcity.gov.uk/getmedia/262a1f01-f219-4780-835e-7a833bdd1e1c/odTrees.csv',
    geometry: { x: 'LONGITUDE', y: 'LATITUDE' },
    srs: 'EPSG:4326',
    crosswalk: {
      location: 'TYPEOFTREE',
      common: 'SPECIESTYPE',
      scientific: 'SPECIES',
      maturity: 'AGE',
      health: 'CONDITION',
      dbh: 'DIAMETERinCENTIMETRES',
      crown: x => x['SPREADRADIUSinMETRES'] * 2,
      height: 'TREEHEIGHTinMETRES'
    },
    license: { id: 'OGL-UK-3.0' },
    opentrees_id: 'belfast'
  },
  {
    country: 'United Kingdom',
    state: 'Scotland',
    city: 'Dundee',
    scope: 'Tree',
    inactive: true,
    info: 'https://data.dundeecity.gov.uk/dataset/trees',
    download: 'https://data.dundeecity.gov.uk/datastore/dump/e54ef90a-76e5-415e-a272-5e489d9f5c67',
    geometry: { x: 'LONGITUDE', y: 'LATITUDE' },
    srs: 'EPSG:4326',
    crosswalk: {
      ref: 'TREE_NUMBER',
      height: 'HEIGHT_M',
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
    },
    license: { id: 'OGL-UK-3.0' },
    opentrees_id: 'dundee'
  },
  {
    country: 'United Kingdom',
    state: 'Scotland',
    city: 'Edinburgh',
    scope: 'Tree',
    info: 'https://data.edinburghcouncilmaps.info/datasets/cityofedinburgh::trees/about',
    download: {
      arcgis: 'https://edinburghcouncilmaps.info/arcgis/rest/services/Misc/INSPIRE/MapServer/39'
    },
    crosswalk: {
      scientific: 'LatinName',
      common: 'CommonName',
      height: 'Height',
      crown: 'Spread',
      maturity: 'AgeGroup',
      dbh: 'DiameterAt'
    },
    license: { id: 'OGL-UK-3.0' },
    opentrees_id: 'edinburgh'
  },
  {
    country: 'United Kingdom',
    state: 'South East',
    city: 'Milton Keynes',
    scope: 'Tree: notable',
    info: 'https://www.data.gov.uk/dataset/4e83ed56-f357-4974-8850-824dcbdea554/tree-preservation-orders-trees',
    download: 'https://mapping.milton-keynes.gov.uk/GetOWS.ashx?MAPSOURCE=MiltonKeynes/inspire&version=1.1.0&request=GetFeature&service=WFS&typeName=tpo_points'
  },
  {
    country: 'United Kingdom',
    state: 'South East',
    city: 'Stowe',
    designation: 'Stowe Gardens',
    scope: 'Tree: notable',
    info: 'https://www.arcgis.com/home/item.html?id=03cd83eda1e2490cac1f2ae2ec099c9c',
    download: 'https://www.arcgis.com/sharing/rest/content/items/03cd83eda1e2490cac1f2ae2ec099c9c/data',
    api: 'arcgis-sharing',
    openFunc: file => helpers.openEsriFeatureCollectionWithGdal(file)
  },
  {
    country: 'United Kingdom',
    state: 'South West England',
    designation: 'Dartmoor National Park',
    scope: 'Tree: notable',
    info: 'https://www.data.gov.uk/dataset/fe56528a-c607-4dcd-845d-631f32fd92b9/dnpa-veteran-trees',
    download: 'https://maps.dartmoor.gov.uk/geoserver/inspire/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=inspire:dnpa_veteran_trees&srsName=EPSG:4326',
    license: { id: 'CC-BY-4.0' }
  },
  {
    country: 'United Kingdom',
    state: 'South West England',
    designation: 'Exmoor National Park',
    scope: 'Tree: notable',
    inactive: true,
    notes: 'Tree preservation orders | Originally downloaded as a zipped shapefile',
    info: 'https://www.data.gov.uk/dataset/3169df15-9549-4fcf-8907-2fd3d96d0728/enpa-tree-preservation-orders',
    download: 'http://inspire.nationalparks.gov.uk:80/geoserver/enpa_inspire/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=enpa_inspire:enpa_tpo_tree&maxFeatures=50&outputFormat=SHAPE-ZIP',
    license: { id: 'CC-BY-4.0' }
  },
  {
    country: 'United Kingdom',
    state: 'South West England',
    designation: 'Exmoor National Park',
    scope: 'Tree: notable',
    inactive: true,
    notes: 'Veteran trees | Originally downloaded as a zipped shapefile',
    info: 'https://www.data.gov.uk/dataset/0d414ed8-6424-4c8a-aebb-a156b17695bb/enpa-veteran-tree',
    download: 'http://inspire.nationalparks.gov.uk:80/geoserver/enpa_inspire/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=enpa_inspire:enpa_vettree&maxFeatures=50&outputFormat=SHAPE-ZIP',
    license: {
      name: 'Ordnance Survey INSPIRE End User Licence',
      url: {file: 'https://www.ordnancesurvey.co.uk/documents/licensing/inspire-end-user-licence.pdf'}
    }
  },
  {
    country: 'United Kingdom',
    state: 'South West England',
    city: 'Bristol',
    scope: 'Tree',
    info: 'https://opendata.bristol.gov.uk/datasets/bcc::trees-2/about',
    download: {
      arcgis: 'https://maps2.bristol.gov.uk/server2/rest/services/ext/ll_environment_and_planning/MapServer/32'
    },
    crosswalk: {
      dbh: 'dbh',
      height: 'crown_height',
      common: 'full_common_name',
      scientific: 'latin_name',
      crown: x => x['crown_width']
    },
    license: { id: 'OGL-UK-3.0' },
    opentrees_id: 'bristol'
  },
  {
    country: 'United Kingdom',
    state: 'South West England',
    city: 'Plymouth',
    designation: 'Central Park',
    scope: 'Tree: park',
    info: 'https://plymouth.thedata.place/dataset/central-park-family-tree-field',
    download: 'https://plymouth.thedata.place/dataset/277fc808-bfbc-4139-8e6a-65ca23722fda/resource/10490c1d-d360-4eaf-b500-4df7fa82e04b/download/trees.csv',
    geometry: { x: 'easting', y: 'northing' },
    srs: 'EPSG:27700',
    license: { id: 'CC-BY-4.0' }
  },
  {
    country: 'United Kingdom',
    state: 'South West England',
    city: 'Plymouth',
    scope: 'Tree: notable',
    info: 'https://plymouth.thedata.place/dataset/ancient-trees',
    download: 'https://plymouth.thedata.place/dataset/a3464bbf-4063-4127-a3b4-00cb136be654/resource/390e24e5-c818-4967-b42c-29f343fb21c8/download/ancient-trees.geojson',
    license: { id: 'OGL-UK-2.0' }
  },
  {
    country: 'United Kingdom',
    state: 'South West England',
    city: 'Plymouth',
    scope: 'Tree: edible',
    notes: 'species: Pyrus cordata',
    info: 'https://plymouth.thedata.place/dataset/plymouth-pear-trees',
    download: 'https://plymouth.thedata.place/dataset/ed99b211-669d-4ace-babb-8dfe73688be8/resource/bf0512fb-f384-4df1-b8af-1bdb675fd370/download/plymouth-pear.geojson',
    license: { id: 'OGL-UK-2.0' }
  },
  {
    country: 'United Kingdom',
    state: 'West Midlands',
    city: 'Birmingham',
    scope: 'Tree: street (main)',
    inactive: true,
    info: 'https://cc-p-birmingham.ckan.io/dataset/highways-assets/resource/4bfd9191-a520-42fb-9ebf-8fefaededf6c',
    download: 'https://cc-p-birmingham.ckan.io/dataset/e9c314fc-fb6d-4189-a19c-7eec962733a8/resource/4bfd9191-a520-42fb-9ebf-8fefaededf6c/download/trees-dec2016.csv',
    geometry: { x: 'Longitude', y: 'Latitude' },
    srs: 'EPSG:4326',
    crosswalk: {
      scientific: 'species',
      maturity: 'age',
      height: 'height',
      location: 'site_name'
    },
    opentrees_id: 'birmingham'
  },
  {
    country: 'United Kingdom',
    state: 'West Midlands',
    city: 'Coventry',
    designation: 'Coventry University',
    info: 'https://www.arcgis.com/home/item.html?id=03ef28b08b9e431d92171606ed6e1b3b',
    download: {
      arcgis: 'https://services-eu1.arcgis.com/Xptv3uICuvnvSDwV/arcgis/rest/services/SUMBHA_023_New_tree_inventory/FeatureServer/0'
    }
  },
  {
    country: 'United Kingdom',
    state: 'Yorkshire and the Humber',
    city: 'York',
    scope: 'Tree',
    notes: 'Also available from https://www.arcgis.com/home/item.html?id=80019297f50a489599184a8279f513ea',
    info: 'https://data.gov.uk/dataset/12dcc527-a7e2-4b23-a3c5-1501053ff0f5/council-owned-trees',
    download: 'https://opendata.arcgis.com/datasets/30f38f358843467daa2d93074a03b8d5_3.geojson',
    api: 'arcgis-opendata',
    crosswalk: { ref: 'TREEID', scientific: 'BOTANICAL', common: 'SPECIES' },
    opentrees_id: 'york'
  },
  {
    country: 'United Kingdom',
    state: 'Yorkshire and the Humber',
    city: 'York',
    scope: 'Tree: private',
    notes: 'Also available from https://www.arcgis.com/home/item.html?id=80019297f50a489599184a8279f513ea',
    info: 'https://data.gov.uk/dataset/c166b067-5a9d-487b-a37d-4d350f8cff51/private-trees',
    download: 'https://opendata.arcgis.com/datasets/a602aca10afb49659720b435d3f54023_18.geojson',
    api: 'arcgis-opendata',
    geometry: { x: 'X', y: 'Y' },
    crosswalk: { owner: 'OWNER', common: 'SPECIES', scientific: 'BOTANICAL' },
    opentrees_id: 'york-private'
  },
  {
    country: 'United Kingdom',
    state: 'Yorkshire and the Humber',
    city: 'York',
    scope: 'Tree: notable',
    notes: 'Also available from https://www.arcgis.com/home/item.html?id=80019297f50a489599184a8279f513ea',
    info: 'https://data.gov.uk/dataset/7866ce4e-7b72-4a4c-b59f-869697d91029/tree-preservations',
    download: 'https://opendata.arcgis.com/datasets/b573b077c8534b9cbdc5e0ce5534b30d_10.geojson',
    api: 'arcgis-opendata',
    license: { id: 'OGL-UK-3.0' }
  },
  {
    pending: 'address only',
    country: 'United States',
    scope: 'Tree',
    notes: 'Selection from 17 cities | Superseded (2023-11-19): Albuquerque, New Mexico; Indianapolis, Indiana; Minneapolis, Minnesota; Charlotte, North Carolina; Sacramento, California; Santa Monica, California; Honolulu, Hawaii | Adds (2023-11-19): Orlando, Florida; Charleston, South Carolina; Claremont, California; Modesto, California; Fort Collins, Colorado; Queens, New York; Longview, Oregon; Glendale, Arizona; Boise, Idaho',
    info: 'https://www.fs.usda.gov/rds/archive/catalog/RDS-2016-0005',
    download: 'https://www.fs.usda.gov/rds/archive/products/RDS-2016-0005/RDS-2016-0005.zip',
    vfs: '/vsizip/',
    filename: 'Data/TS3_Raw_tree_data.csv',
    terms: 'McPherson, E. Gregory; van Doorn, Natalie S.; Peper, Paula J. 2016. Urban tree database. Fort Collins, CO: Forest Service Research Data Archive. Updated 21 January 2020. https://doi.org/10.2737/RDS-2016-0005'
  },
  {
    country: 'United States',
    state: 'Alabama',
    city: 'Florence',
    info: 'https://www.arcgis.com/home/item.html?id=87dd86197a104226a38b04b26a79cf63',
    download: {
      arcgis: 'https://services1.arcgis.com/4OouWsRyOft5wqPC/arcgis/rest/services/Tree_Inventory_2021/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Alabama',
    city: 'Tuscaloosa',
    designation: 'University of Alabama',
    scope: 'Tree',
    notes: 'partial',
    info: 'https://www.arcgis.com/home/item.html?id=a7ba16de7a394851873930e53a1c6f7a',
    download: {
      arcgis: 'https://services7.arcgis.com/salQweOw5doOMYRw/arcgis/rest/services/UAB_Trees/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Arizona',
    city: 'Catalina Foothills',
    designation: 'Sunrise Presidio Townhomes',
    scope: 'Tree: park',
    notes: 'FF: Careful adding these to Falling Fruit, since foraging may not be permitted (Audubon Society project)',
    info: 'https://www.arcgis.com/home/item.html?id=0bb4ff2be3e249b29e8036713e6322e7',
    download: {
      arcgis: 'https://services2.arcgis.com/Vc8ZVP2akSzC6wq2/arcgis/rest/services/Inventory/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Arizona',
    city: 'Mesa',
    scope: 'Tree',
    info: 'https://data.mesaaz.gov/Environmental-Management-and-Sustainability/Tree-Inventory/jcys-68y7',
    download: 'https://data.mesaaz.gov/api/geospatial/jcys-68y7?method=export&format=geojson'
  },
  {
    country: 'United States',
    state: 'Arizona',
    city: 'Phoenix',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=973ecb3323fb4d50a4ea13de1efc02a7',
    download: {
      arcgis: 'https://services.arcgis.com/40CMVGZPtmu7aNof/arcgis/rest/services/Tree_Keeper/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Arizona',
    city: 'Prescott Valley',
    scope: 'Tree: park',
    info: 'https://www.arcgis.com/home/item.html?id=2207cbe75dee45329d95537b1084e7fa',
    download: {
      arcgis: 'https://services.arcgis.com/NxZdAmj8rBzdRpTr/arcgis/rest/services/PV_TREES/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Arizona',
    city: 'Scottsdale',
    info: 'https://www.arcgis.com/home/item.html?id=f57af05100ba4262bd5f7df844dd021c',
    download: {
      arcgis: 'https://services6.arcgis.com/hvDuIN6e7bxkHpdO/arcgis/rest/services/TreeInventory_Public/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Arizona',
    city: 'Tempe',
    scope: 'Tree',
    info: 'https://hub.arcgis.com/datasets/tempegov::tree-inventory/about',
    download: {
      arcgis: 'https://services.arcgis.com/lQySeXwbBg53XWDi/arcgis/rest/services/TempeGuadalupe_CanopyCover2019_TreeInv_2021_Tempe_iTreeResults_TempeAZOct_2021_1/FeatureServer/0'
    },
    license: { id: 'CC-BY-4.0' },
    fallingfruit_id: 445
  },
  {
    country: 'United States',
    state: 'Arizona',
    city: 'Tucson',
    designation: 'University of Arizona',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=6a6bbb4ad7df4accb7e112ec1ba10145',
    download: {
      arcgis: 'https://utility.arcgis.com/usrsvcs/servers/6a6bbb4ad7df4accb7e112ec1ba10145/rest/services/PublicMaps/CultureRecreation/MapServer/57'
    }
  },
  {
    country: 'United States',
    state: 'Arizona',
    city: 'Tucson',
    scope: 'Tree',
    notes: 'partial',
    info: 'http://hub.arcgis.com/datasets/geotucson::tft-tree-inventory/about',
    download: {
      arcgis: 'https://services5.arcgis.com/0AYM2OwGLAAywmdK/arcgis/rest/services/TFT_Tree_Inventory/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Arkansas',
    city: 'Little Rock',
    designation: 'State Capitol',
    scope: 'Tree: park',
    info: 'https://www.arcgis.com/home/item.html?id=9e73b492e515404ea76ad67bfa71ae70',
    download: {
      arcgis: 'https://services7.arcgis.com/salQweOw5doOMYRw/arcgis/rest/services/Arkansas_State_Capitol_Tree_Inventory/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'California',
    designation: 'Los Angeles County',
    scope: 'Tree: park',
    info: 'https://www.arcgis.com/home/item.html?id=31f9e84f7c5d43c09753c1a215737118',
    download: {
      arcgis: 'https://services1.arcgis.com/ZIL9uO234SBBPGL7/arcgis/rest/services/LACo_Trees_shp/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'California',
    designation: 'San Diego County',
    scope: 'Tree',
    inactive: true,
    notes: 'overlaps San Diego tree inventory | Overlaps the City of San Diego tree inventory. Also includes user data and data from the following cities: Carlsbad, Chula Vista, Coronado, El Cajon, Imperial Beach, La Mesa, Oceanside, Poway, Santee, Solano Beach, and Vista. Many entries have incomplete (or truncated) species names.',
    info: 'https://sandiegotreemap.org',
    download: { manual: 'https://sandiegotreemap.org/sdtrees' },
    fallingfruit_id: 357
  },
  {
    pending: 'address only',
    country: 'United States',
    state: 'California',
    city: 'Alhambra',
    scope: 'Tree: street',
    info: 'https://www.fs.usda.gov/rds/archive/catalog/RDS-2017-0010',
    download: 'https://www.fs.usda.gov/rds/archive/products/RDS-2017-0010/RDS-2017-0010.zip',
    vfs: '/vsizip/',
    filename: 'Data/InlandEmpire/Alhambra_Inventory.csv',
    terms: 'McPherson, E. Gregory; van Doorn, Natalie S.; de Goede, John. 2017. Raw urban street tree inventory data for 49 California cities. Fort Collins, CO: Forest Service Research Data Archive. https://doi.org/10.2737/RDS-2017-0010'
  },
  {
    pending: 'address only',
    country: 'United States',
    state: 'California',
    city: 'Arroyo Grande',
    scope: 'Tree: street',
    info: 'https://www.fs.usda.gov/rds/archive/catalog/RDS-2017-0010',
    download: 'https://www.fs.usda.gov/rds/archive/products/RDS-2017-0010/RDS-2017-0010.zip',
    vfs: '/vsizip/',
    filename: 'Data/NorCalCoast/ArroyoGrande_Inventory.csv',
    terms: 'McPherson, E. Gregory; van Doorn, Natalie S.; de Goede, John. 2017. Raw urban street tree inventory data for 49 California cities. Fort Collins, CO: Forest Service Research Data Archive. https://doi.org/10.2737/RDS-2017-0010'
  },
  {
    pending: 'address only',
    country: 'United States',
    state: 'California',
    city: 'Azusa',
    scope: 'Tree: street',
    info: 'https://www.fs.usda.gov/rds/archive/catalog/RDS-2017-0010',
    download: 'https://www.fs.usda.gov/rds/archive/products/RDS-2017-0010/RDS-2017-0010.zip',
    vfs: '/vsizip/',
    filename: 'Data/InlandEmpire/Azusa_Inventory.csv',
    terms: 'McPherson, E. Gregory; van Doorn, Natalie S.; de Goede, John. 2017. Raw urban street tree inventory data for 49 California cities. Fort Collins, CO: Forest Service Research Data Archive. https://doi.org/10.2737/RDS-2017-0010'
  },
  {
    pending: 'address only',
    country: 'United States',
    state: 'California',
    city: 'Bellflower',
    scope: 'Tree: street',
    info: 'https://www.fs.usda.gov/rds/archive/catalog/RDS-2017-0010',
    download: 'https://www.fs.usda.gov/rds/archive/products/RDS-2017-0010/RDS-2017-0010.zip',
    vfs: '/vsizip/',
    filename: 'Data/SoCalCoast/Bellflower_Inventory.csv',
    terms: 'McPherson, E. Gregory; van Doorn, Natalie S.; de Goede, John. 2017. Raw urban street tree inventory data for 49 California cities. Fort Collins, CO: Forest Service Research Data Archive. https://doi.org/10.2737/RDS-2017-0010'
  },
  {
    omit: 'likely superseded',
    pending: 'address only',
    country: 'United States',
    state: 'California',
    city: 'Berkeley',
    scope: 'Tree: street',
    info: 'https://www.fs.usda.gov/rds/archive/catalog/RDS-2017-0010',
    download: 'https://www.fs.usda.gov/rds/archive/products/RDS-2017-0010/RDS-2017-0010.zip',
    vfs: '/vsizip/',
    filename: 'Data/NorCalCoast/Berkeley_Inventory.csv',
    terms: 'McPherson, E. Gregory; van Doorn, Natalie S.; de Goede, John. 2017. Raw urban street tree inventory data for 49 California cities. Fort Collins, CO: Forest Service Research Data Archive. https://doi.org/10.2737/RDS-2017-0010',
    opentrees_id: 'berkeley'
  },
  {
    pending: 'address only',
    country: 'United States',
    state: 'California',
    city: 'Brentwood',
    scope: 'Tree: street',
    info: 'https://www.fs.usda.gov/rds/archive/catalog/RDS-2017-0010',
    download: 'https://www.fs.usda.gov/rds/archive/products/RDS-2017-0010/RDS-2017-0010.zip',
    vfs: '/vsizip/',
    filename: 'Data/InlandValley/Brentwood_Inventory.csv',
    terms: 'McPherson, E. Gregory; van Doorn, Natalie S.; de Goede, John. 2017. Raw urban street tree inventory data for 49 California cities. Fort Collins, CO: Forest Service Research Data Archive. https://doi.org/10.2737/RDS-2017-0010'
  },
  {
    pending: 'address only',
    country: 'United States',
    state: 'California',
    city: 'Burlingame',
    scope: 'Tree: street',
    info: 'https://www.fs.usda.gov/rds/archive/catalog/RDS-2017-0010',
    download: 'https://www.fs.usda.gov/rds/archive/products/RDS-2017-0010/RDS-2017-0010.zip',
    vfs: '/vsizip/',
    filename: 'Data/NorCalCoast/Burlingame_Inventory.csv',
    terms: 'McPherson, E. Gregory; van Doorn, Natalie S.; de Goede, John. 2017. Raw urban street tree inventory data for 49 California cities. Fort Collins, CO: Forest Service Research Data Archive. https://doi.org/10.2737/RDS-2017-0010'
  },
  {
    pending: 'address only',
    country: 'United States',
    state: 'California',
    city: 'Camarillo',
    scope: 'Tree: street',
    info: 'https://www.fs.usda.gov/rds/archive/catalog/RDS-2017-0010',
    download: 'https://www.fs.usda.gov/rds/archive/products/RDS-2017-0010/RDS-2017-0010.zip',
    vfs: '/vsizip/',
    filename: 'Data/SoCalCoast/Camarillo_Inventory.csv',
    terms: 'McPherson, E. Gregory; van Doorn, Natalie S.; de Goede, John. 2017. Raw urban street tree inventory data for 49 California cities. Fort Collins, CO: Forest Service Research Data Archive. https://doi.org/10.2737/RDS-2017-0010'
  },
  {
    pending: 'address only',
    country: 'United States',
    state: 'California',
    city: 'Carlsbad',
    scope: 'Tree: street',
    info: 'https://www.fs.usda.gov/rds/archive/catalog/RDS-2017-0010',
    download: 'https://www.fs.usda.gov/rds/archive/products/RDS-2017-0010/RDS-2017-0010.zip',
    vfs: '/vsizip/',
    filename: 'Data/SoCalCoast/Carlsbad_Inventory.csv',
    terms: 'McPherson, E. Gregory; van Doorn, Natalie S.; de Goede, John. 2017. Raw urban street tree inventory data for 49 California cities. Fort Collins, CO: Forest Service Research Data Archive. https://doi.org/10.2737/RDS-2017-0010'
  },
  {
    omit: 'likely superseded',
    pending: 'address only',
    country: 'United States',
    state: 'California',
    city: 'Carpinteria',
    scope: 'Tree: street',
    info: 'https://www.fs.usda.gov/rds/archive/catalog/RDS-2017-0010',
    download: 'https://www.fs.usda.gov/rds/archive/products/RDS-2017-0010/RDS-2017-0010.zip',
    vfs: '/vsizip/',
    filename: 'Data/SoCalCoast/Carpinteria_Inventory.csv',
    terms: 'McPherson, E. Gregory; van Doorn, Natalie S.; de Goede, John. 2017. Raw urban street tree inventory data for 49 California cities. Fort Collins, CO: Forest Service Research Data Archive. https://doi.org/10.2737/RDS-2017-0010'
  },
  {
    pending: 'address only',
    country: 'United States',
    state: 'California',
    city: 'Chino Hills',
    scope: 'Tree: street',
    info: 'https://www.fs.usda.gov/rds/archive/catalog/RDS-2017-0010',
    download: 'https://www.fs.usda.gov/rds/archive/products/RDS-2017-0010/RDS-2017-0010.zip',
    vfs: '/vsizip/',
    filename: 'Data/InlandEmpire/ChinoHills_Inventory.csv',
    terms: 'McPherson, E. Gregory; van Doorn, Natalie S.; de Goede, John. 2017. Raw urban street tree inventory data for 49 California cities. Fort Collins, CO: Forest Service Research Data Archive. https://doi.org/10.2737/RDS-2017-0010'
  },
  {
    pending: 'address only',
    country: 'United States',
    state: 'California',
    city: 'Claremont',
    scope: 'Tree: street',
    info: 'https://www.fs.usda.gov/rds/archive/catalog/RDS-2017-0010',
    download: 'https://www.fs.usda.gov/rds/archive/products/RDS-2017-0010/RDS-2017-0010.zip',
    vfs: '/vsizip/',
    filename: 'Data/InlandEmpire/Claremont_Inventory.csv',
    terms: 'McPherson, E. Gregory; van Doorn, Natalie S.; de Goede, John. 2017. Raw urban street tree inventory data for 49 California cities. Fort Collins, CO: Forest Service Research Data Archive. https://doi.org/10.2737/RDS-2017-0010'
  },
  {
    pending: 'address only',
    country: 'United States',
    state: 'California',
    city: 'Clovis',
    scope: 'Tree: street',
    info: 'https://www.fs.usda.gov/rds/archive/catalog/RDS-2017-0010',
    download: 'https://www.fs.usda.gov/rds/archive/products/RDS-2017-0010/RDS-2017-0010.zip',
    vfs: '/vsizip/',
    filename: 'Data/InlandValley/Clovis_Inventory.csv',
    terms: 'McPherson, E. Gregory; van Doorn, Natalie S.; de Goede, John. 2017. Raw urban street tree inventory data for 49 California cities. Fort Collins, CO: Forest Service Research Data Archive. https://doi.org/10.2737/RDS-2017-0010'
  },
  {
    pending: 'address only',
    country: 'United States',
    state: 'California',
    city: 'Costa Mesa',
    scope: 'Tree: street',
    info: 'https://www.fs.usda.gov/rds/archive/catalog/RDS-2017-0010',
    download: 'https://www.fs.usda.gov/rds/archive/products/RDS-2017-0010/RDS-2017-0010.zip',
    vfs: '/vsizip/',
    filename: 'Data/SoCalCoast/CostaMesa_Inventory.csv',
    terms: 'McPherson, E. Gregory; van Doorn, Natalie S.; de Goede, John. 2017. Raw urban street tree inventory data for 49 California cities. Fort Collins, CO: Forest Service Research Data Archive. https://doi.org/10.2737/RDS-2017-0010'
  },
  {
    pending: 'address only',
    country: 'United States',
    state: 'California',
    city: 'Culver City',
    scope: 'Tree: street',
    info: 'https://www.fs.usda.gov/rds/archive/catalog/RDS-2017-0010',
    download: 'https://www.fs.usda.gov/rds/archive/products/RDS-2017-0010/RDS-2017-0010.zip',
    vfs: '/vsizip/',
    filename: 'Data/SoCalCoast/CulverCity_Inventory.csv',
    terms: 'McPherson, E. Gregory; van Doorn, Natalie S.; de Goede, John. 2017. Raw urban street tree inventory data for 49 California cities. Fort Collins, CO: Forest Service Research Data Archive. https://doi.org/10.2737/RDS-2017-0010'
  },
  {
    pending: 'address only',
    country: 'United States',
    state: 'California',
    city: 'Cypress',
    scope: 'Tree: street',
    info: 'https://www.fs.usda.gov/rds/archive/catalog/RDS-2017-0010',
    download: 'https://www.fs.usda.gov/rds/archive/products/RDS-2017-0010/RDS-2017-0010.zip',
    vfs: '/vsizip/',
    filename: 'Data/SoCalCoast/Cypress_Inventory.csv',
    terms: 'McPherson, E. Gregory; van Doorn, Natalie S.; de Goede, John. 2017. Raw urban street tree inventory data for 49 California cities. Fort Collins, CO: Forest Service Research Data Archive. https://doi.org/10.2737/RDS-2017-0010'
  },
  {
    pending: 'address only',
    country: 'United States',
    state: 'California',
    city: 'El Cajon',
    scope: 'Tree: street',
    info: 'https://www.fs.usda.gov/rds/archive/catalog/RDS-2017-0010',
    download: 'https://www.fs.usda.gov/rds/archive/products/RDS-2017-0010/RDS-2017-0010.zip',
    vfs: '/vsizip/',
    filename: 'Data/InlandEmpire/ElCajon_Inventory.csv',
    terms: 'McPherson, E. Gregory; van Doorn, Natalie S.; de Goede, John. 2017. Raw urban street tree inventory data for 49 California cities. Fort Collins, CO: Forest Service Research Data Archive. https://doi.org/10.2737/RDS-2017-0010'
  },
  {
    pending: 'address only',
    country: 'United States',
    state: 'California',
    city: 'Encinitas',
    scope: 'Tree: street',
    info: 'https://www.fs.usda.gov/rds/archive/catalog/RDS-2017-0010',
    download: 'https://www.fs.usda.gov/rds/archive/products/RDS-2017-0010/RDS-2017-0010.zip',
    vfs: '/vsizip/',
    filename: 'Data/SoCalCoast/Encinitas_Inventory.csv',
    terms: 'McPherson, E. Gregory; van Doorn, Natalie S.; de Goede, John. 2017. Raw urban street tree inventory data for 49 California cities. Fort Collins, CO: Forest Service Research Data Archive. https://doi.org/10.2737/RDS-2017-0010'
  },
  {
    pending: 'address only',
    country: 'United States',
    state: 'California',
    city: 'Glendora',
    scope: 'Tree: street',
    info: 'https://www.fs.usda.gov/rds/archive/catalog/RDS-2017-0010',
    download: 'https://www.fs.usda.gov/rds/archive/products/RDS-2017-0010/RDS-2017-0010.zip',
    vfs: '/vsizip/',
    filename: 'Data/InlandEmpire/Glendora_Inventory.csv',
    terms: 'McPherson, E. Gregory; van Doorn, Natalie S.; de Goede, John. 2017. Raw urban street tree inventory data for 49 California cities. Fort Collins, CO: Forest Service Research Data Archive. https://doi.org/10.2737/RDS-2017-0010'
  },
  {
    pending: 'address only',
    country: 'United States',
    state: 'California',
    city: 'Hayward',
    scope: 'Tree: street',
    info: 'https://www.fs.usda.gov/rds/archive/catalog/RDS-2017-0010',
    download: 'https://www.fs.usda.gov/rds/archive/products/RDS-2017-0010/RDS-2017-0010.zip',
    vfs: '/vsizip/',
    filename: 'Data/NorCalCoast/Hayward_Inventory.csv',
    terms: 'McPherson, E. Gregory; van Doorn, Natalie S.; de Goede, John. 2017. Raw urban street tree inventory data for 49 California cities. Fort Collins, CO: Forest Service Research Data Archive. https://doi.org/10.2737/RDS-2017-0010'
  },
  {
    pending: 'address only',
    country: 'United States',
    state: 'California',
    city: 'Highland',
    scope: 'Tree: street',
    info: 'https://www.fs.usda.gov/rds/archive/catalog/RDS-2017-0010',
    download: 'https://www.fs.usda.gov/rds/archive/products/RDS-2017-0010/RDS-2017-0010.zip',
    vfs: '/vsizip/',
    filename: 'Data/InlandEmpire/Highland_Inventory.csv',
    terms: 'McPherson, E. Gregory; van Doorn, Natalie S.; de Goede, John. 2017. Raw urban street tree inventory data for 49 California cities. Fort Collins, CO: Forest Service Research Data Archive. https://doi.org/10.2737/RDS-2017-0010'
  },
  {
    pending: 'address only',
    country: 'United States',
    state: 'California',
    city: 'Irvine',
    scope: 'Tree: street',
    info: 'https://www.fs.usda.gov/rds/archive/catalog/RDS-2017-0010',
    download: 'https://www.fs.usda.gov/rds/archive/products/RDS-2017-0010/RDS-2017-0010.zip',
    vfs: '/vsizip/',
    filename: 'Data/SoCalCoast/Irvine_Inventory.csv',
    terms: 'McPherson, E. Gregory; van Doorn, Natalie S.; de Goede, John. 2017. Raw urban street tree inventory data for 49 California cities. Fort Collins, CO: Forest Service Research Data Archive. https://doi.org/10.2737/RDS-2017-0010'
  },
  {
    pending: 'address only',
    country: 'United States',
    state: 'California',
    city: 'La Cañada Flintridge',
    scope: 'Tree: street',
    info: 'https://www.fs.usda.gov/rds/archive/catalog/RDS-2017-0010',
    download: 'https://www.fs.usda.gov/rds/archive/products/RDS-2017-0010/RDS-2017-0010.zip',
    vfs: '/vsizip/',
    filename: 'Data/InlandEmpire/LaCanadaFlintridge_Inventory.csv',
    terms: 'McPherson, E. Gregory; van Doorn, Natalie S.; de Goede, John. 2017. Raw urban street tree inventory data for 49 California cities. Fort Collins, CO: Forest Service Research Data Archive. https://doi.org/10.2737/RDS-2017-0010'
  },
  {
    pending: 'address only',
    country: 'United States',
    state: 'California',
    city: 'La Mesa',
    scope: 'Tree: street',
    info: 'https://www.fs.usda.gov/rds/archive/catalog/RDS-2017-0010',
    download: 'https://www.fs.usda.gov/rds/archive/products/RDS-2017-0010/RDS-2017-0010.zip',
    vfs: '/vsizip/',
    filename: 'Data/SoCalCoast/LaMesa_Inventory.csv',
    terms: 'McPherson, E. Gregory; van Doorn, Natalie S.; de Goede, John. 2017. Raw urban street tree inventory data for 49 California cities. Fort Collins, CO: Forest Service Research Data Archive. https://doi.org/10.2737/RDS-2017-0010'
  },
  {
    pending: 'address only',
    country: 'United States',
    state: 'California',
    city: 'Laguna Hills',
    scope: 'Tree: street',
    info: 'https://www.fs.usda.gov/rds/archive/catalog/RDS-2017-0010',
    download: 'https://www.fs.usda.gov/rds/archive/products/RDS-2017-0010/RDS-2017-0010.zip',
    vfs: '/vsizip/',
    filename: 'Data/SoCalCoast/LagunaHills_Inventory.csv',
    terms: 'McPherson, E. Gregory; van Doorn, Natalie S.; de Goede, John. 2017. Raw urban street tree inventory data for 49 California cities. Fort Collins, CO: Forest Service Research Data Archive. https://doi.org/10.2737/RDS-2017-0010'
  },
  {
    pending: 'address only',
    country: 'United States',
    state: 'California',
    city: 'Montclair',
    scope: 'Tree: street',
    info: 'https://www.fs.usda.gov/rds/archive/catalog/RDS-2017-0010',
    download: 'https://www.fs.usda.gov/rds/archive/products/RDS-2017-0010/RDS-2017-0010.zip',
    vfs: '/vsizip/',
    filename: 'Data/InlandEmpire/Montclair_Inventory.csv',
    terms: 'McPherson, E. Gregory; van Doorn, Natalie S.; de Goede, John. 2017. Raw urban street tree inventory data for 49 California cities. Fort Collins, CO: Forest Service Research Data Archive. https://doi.org/10.2737/RDS-2017-0010'
  },
  {
    pending: 'address only',
    country: 'United States',
    state: 'California',
    city: 'Monterey Park',
    scope: 'Tree: street',
    info: 'https://www.fs.usda.gov/rds/archive/catalog/RDS-2017-0010',
    download: 'https://www.fs.usda.gov/rds/archive/products/RDS-2017-0010/RDS-2017-0010.zip',
    vfs: '/vsizip/',
    filename: 'Data/SoCalCoast/MontereyPark_Inventory.csv',
    terms: 'McPherson, E. Gregory; van Doorn, Natalie S.; de Goede, John. 2017. Raw urban street tree inventory data for 49 California cities. Fort Collins, CO: Forest Service Research Data Archive. https://doi.org/10.2737/RDS-2017-0010'
  },
  {
    pending: 'address only',
    country: 'United States',
    state: 'California',
    city: 'Norco',
    scope: 'Tree: street',
    info: 'https://www.fs.usda.gov/rds/archive/catalog/RDS-2017-0010',
    download: 'https://www.fs.usda.gov/rds/archive/products/RDS-2017-0010/RDS-2017-0010.zip',
    vfs: '/vsizip/',
    filename: 'Data/InlandEmpire/Norco_Inventory.csv',
    terms: 'McPherson, E. Gregory; van Doorn, Natalie S.; de Goede, John. 2017. Raw urban street tree inventory data for 49 California cities. Fort Collins, CO: Forest Service Research Data Archive. https://doi.org/10.2737/RDS-2017-0010'
  },
  {
    pending: 'address only',
    country: 'United States',
    state: 'California',
    city: 'Oakley',
    scope: 'Tree: street',
    info: 'https://www.fs.usda.gov/rds/archive/catalog/RDS-2017-0010',
    download: 'https://www.fs.usda.gov/rds/archive/products/RDS-2017-0010/RDS-2017-0010.zip',
    vfs: '/vsizip/',
    filename: 'Data/InlandValley/Oakley_Inventory.csv',
    terms: 'McPherson, E. Gregory; van Doorn, Natalie S.; de Goede, John. 2017. Raw urban street tree inventory data for 49 California cities. Fort Collins, CO: Forest Service Research Data Archive. https://doi.org/10.2737/RDS-2017-0010'
  },
  {
    omit: 'likely superseded',
    pending: 'address only',
    country: 'United States',
    state: 'California',
    city: 'Ontario',
    scope: 'Tree: street',
    info: 'https://www.fs.usda.gov/rds/archive/catalog/RDS-2017-0010',
    download: 'https://www.fs.usda.gov/rds/archive/products/RDS-2017-0010/RDS-2017-0010.zip',
    vfs: '/vsizip/',
    filename: 'Data/InlandEmpire/Ontario_Inventory.csv',
    terms: 'McPherson, E. Gregory; van Doorn, Natalie S.; de Goede, John. 2017. Raw urban street tree inventory data for 49 California cities. Fort Collins, CO: Forest Service Research Data Archive. https://doi.org/10.2737/RDS-2017-0010'
  },
  {
    omit: 'likely superseded',
    pending: 'address only',
    country: 'United States',
    state: 'California',
    city: 'Palm Desert',
    scope: 'Tree: street',
    info: 'https://www.fs.usda.gov/rds/archive/catalog/RDS-2017-0010',
    download: 'https://www.fs.usda.gov/rds/archive/products/RDS-2017-0010/RDS-2017-0010.zip',
    vfs: '/vsizip/',
    filename: 'Data/SWDistrict/PalmDesert_Inventory.csv',
    terms: 'McPherson, E. Gregory; van Doorn, Natalie S.; de Goede, John. 2017. Raw urban street tree inventory data for 49 California cities. Fort Collins, CO: Forest Service Research Data Archive. https://doi.org/10.2737/RDS-2017-0010'
  },
  {
    omit: 'likely superseded',
    pending: 'address only',
    country: 'United States',
    state: 'California',
    city: 'Palo Alto',
    scope: 'Tree: street',
    info: 'https://www.fs.usda.gov/rds/archive/catalog/RDS-2017-0010',
    download: 'https://www.fs.usda.gov/rds/archive/products/RDS-2017-0010/RDS-2017-0010.zip',
    vfs: '/vsizip/',
    filename: 'Data/NorCalCoast/PaloAlto_Inventory.csv',
    terms: 'McPherson, E. Gregory; van Doorn, Natalie S.; de Goede, John. 2017. Raw urban street tree inventory data for 49 California cities. Fort Collins, CO: Forest Service Research Data Archive. https://doi.org/10.2737/RDS-2017-0010'
  },
  {
    pending: 'address only',
    country: 'United States',
    state: 'California',
    city: 'Paramount',
    scope: 'Tree: street',
    info: 'https://www.fs.usda.gov/rds/archive/catalog/RDS-2017-0010',
    download: 'https://www.fs.usda.gov/rds/archive/products/RDS-2017-0010/RDS-2017-0010.zip',
    vfs: '/vsizip/',
    filename: 'Data/SoCalCoast/Paramount_Inventory.csv',
    terms: 'McPherson, E. Gregory; van Doorn, Natalie S.; de Goede, John. 2017. Raw urban street tree inventory data for 49 California cities. Fort Collins, CO: Forest Service Research Data Archive. https://doi.org/10.2737/RDS-2017-0010'
  },
  {
    pending: 'address only',
    country: 'United States',
    state: 'California',
    city: 'Pomona',
    scope: 'Tree: street',
    info: 'https://www.fs.usda.gov/rds/archive/catalog/RDS-2017-0010',
    download: 'https://www.fs.usda.gov/rds/archive/products/RDS-2017-0010/RDS-2017-0010.zip',
    vfs: '/vsizip/',
    filename: 'Data/InlandEmpire/Pomona_Inventory.csv',
    terms: 'McPherson, E. Gregory; van Doorn, Natalie S.; de Goede, John. 2017. Raw urban street tree inventory data for 49 California cities. Fort Collins, CO: Forest Service Research Data Archive. https://doi.org/10.2737/RDS-2017-0010'
  },
  {
    pending: 'address only',
    country: 'United States',
    state: 'California',
    city: 'Poway',
    scope: 'Tree: street',
    info: 'https://www.fs.usda.gov/rds/archive/catalog/RDS-2017-0010',
    download: 'https://www.fs.usda.gov/rds/archive/products/RDS-2017-0010/RDS-2017-0010.zip',
    vfs: '/vsizip/',
    filename: 'Data/InlandEmpire/Poway_Inventory.csv',
    terms: 'McPherson, E. Gregory; van Doorn, Natalie S.; de Goede, John. 2017. Raw urban street tree inventory data for 49 California cities. Fort Collins, CO: Forest Service Research Data Archive. https://doi.org/10.2737/RDS-2017-0010'
  },
  {
    pending: 'address only',
    country: 'United States',
    state: 'California',
    city: 'Redwood City',
    scope: 'Tree: street',
    info: 'https://www.fs.usda.gov/rds/archive/catalog/RDS-2017-0010',
    download: 'https://www.fs.usda.gov/rds/archive/products/RDS-2017-0010/RDS-2017-0010.zip',
    vfs: '/vsizip/',
    filename: 'Data/NorCalCoast/RedwoodCity_Inventory.csv',
    terms: 'McPherson, E. Gregory; van Doorn, Natalie S.; de Goede, John. 2017. Raw urban street tree inventory data for 49 California cities. Fort Collins, CO: Forest Service Research Data Archive. https://doi.org/10.2737/RDS-2017-0010'
  },
  {
    pending: 'address only',
    country: 'United States',
    state: 'California',
    city: 'Rialto',
    scope: 'Tree: street',
    info: 'https://www.fs.usda.gov/rds/archive/catalog/RDS-2017-0010',
    download: 'https://www.fs.usda.gov/rds/archive/products/RDS-2017-0010/RDS-2017-0010.zip',
    vfs: '/vsizip/',
    filename: 'Data/InlandEmpire/Rialto_Inventory.csv',
    terms: 'McPherson, E. Gregory; van Doorn, Natalie S.; de Goede, John. 2017. Raw urban street tree inventory data for 49 California cities. Fort Collins, CO: Forest Service Research Data Archive. https://doi.org/10.2737/RDS-2017-0010'
  },
  {
    pending: 'address only',
    country: 'United States',
    state: 'California',
    city: 'Roseville',
    scope: 'Tree: street',
    info: 'https://www.fs.usda.gov/rds/archive/catalog/RDS-2017-0010',
    download: 'https://www.fs.usda.gov/rds/archive/products/RDS-2017-0010/RDS-2017-0010.zip',
    vfs: '/vsizip/',
    filename: 'Data/InlandValley/Roseville_Inventory.csv',
    terms: 'McPherson, E. Gregory; van Doorn, Natalie S.; de Goede, John. 2017. Raw urban street tree inventory data for 49 California cities. Fort Collins, CO: Forest Service Research Data Archive. https://doi.org/10.2737/RDS-2017-0010'
  },
  {
    omit: 'likely superseded',
    pending: 'address only',
    country: 'United States',
    state: 'California',
    city: 'Sacramento',
    scope: 'Tree: street',
    info: 'https://www.fs.usda.gov/rds/archive/catalog/RDS-2017-0010',
    download: 'https://www.fs.usda.gov/rds/archive/products/RDS-2017-0010/RDS-2017-0010.zip',
    vfs: '/vsizip/',
    filename: 'Data/InlandValley/Sacramento_Inventory.csv',
    terms: 'McPherson, E. Gregory; van Doorn, Natalie S.; de Goede, John. 2017. Raw urban street tree inventory data for 49 California cities. Fort Collins, CO: Forest Service Research Data Archive. https://doi.org/10.2737/RDS-2017-0010'
  },
  {
    pending: 'address only',
    country: 'United States',
    state: 'California',
    city: 'San Dimas',
    scope: 'Tree: street',
    info: 'https://www.fs.usda.gov/rds/archive/catalog/RDS-2017-0010',
    download: 'https://www.fs.usda.gov/rds/archive/products/RDS-2017-0010/RDS-2017-0010.zip',
    vfs: '/vsizip/',
    filename: 'Data/InlandEmpire/SanDimas_Inventory.csv',
    terms: 'McPherson, E. Gregory; van Doorn, Natalie S.; de Goede, John. 2017. Raw urban street tree inventory data for 49 California cities. Fort Collins, CO: Forest Service Research Data Archive. https://doi.org/10.2737/RDS-2017-0010'
  },
  {
    pending: 'address only',
    country: 'United States',
    state: 'California',
    city: 'San Marcos',
    scope: 'Tree: street',
    info: 'https://www.fs.usda.gov/rds/archive/catalog/RDS-2017-0010',
    download: 'https://www.fs.usda.gov/rds/archive/products/RDS-2017-0010/RDS-2017-0010.zip',
    vfs: '/vsizip/',
    filename: 'Data/SoCalCoast/SanMarcos_Inventory.csv',
    terms: 'McPherson, E. Gregory; van Doorn, Natalie S.; de Goede, John. 2017. Raw urban street tree inventory data for 49 California cities. Fort Collins, CO: Forest Service Research Data Archive. https://doi.org/10.2737/RDS-2017-0010'
  },
  {
    pending: 'address only',
    country: 'United States',
    state: 'California',
    city: 'San Mateo',
    scope: 'Tree: street',
    info: 'https://www.fs.usda.gov/rds/archive/catalog/RDS-2017-0010',
    download: 'https://www.fs.usda.gov/rds/archive/products/RDS-2017-0010/RDS-2017-0010.zip',
    vfs: '/vsizip/',
    filename: 'Data/NorCalCoast/SanMateo_Inventory.csv',
    terms: 'McPherson, E. Gregory; van Doorn, Natalie S.; de Goede, John. 2017. Raw urban street tree inventory data for 49 California cities. Fort Collins, CO: Forest Service Research Data Archive. https://doi.org/10.2737/RDS-2017-0010'
  },
  {
    omit: 'likely superseded',
    pending: 'address only',
    country: 'United States',
    state: 'California',
    city: 'Santa Monica',
    scope: 'Tree: street',
    info: 'https://www.fs.usda.gov/rds/archive/catalog/RDS-2017-0010',
    download: 'https://www.fs.usda.gov/rds/archive/products/RDS-2017-0010/RDS-2017-0010.zip',
    vfs: '/vsizip/',
    filename: 'Data/SoCalCoast/SantaMonica_Inventory.csv',
    terms: 'McPherson, E. Gregory; van Doorn, Natalie S.; de Goede, John. 2017. Raw urban street tree inventory data for 49 California cities. Fort Collins, CO: Forest Service Research Data Archive. https://doi.org/10.2737/RDS-2017-0010'
  },
  {
    omit: 'likely superseded',
    pending: 'address only',
    country: 'United States',
    state: 'California',
    city: 'Stockton',
    scope: 'Tree: street',
    info: 'https://www.fs.usda.gov/rds/archive/catalog/RDS-2017-0010',
    download: 'https://www.fs.usda.gov/rds/archive/products/RDS-2017-0010/RDS-2017-0010.zip',
    vfs: '/vsizip/',
    filename: 'Data/InlandValley/Stockton_Inventory.csv',
    terms: 'McPherson, E. Gregory; van Doorn, Natalie S.; de Goede, John. 2017. Raw urban street tree inventory data for 49 California cities. Fort Collins, CO: Forest Service Research Data Archive. https://doi.org/10.2737/RDS-2017-0010'
  },
  {
    pending: 'address only',
    country: 'United States',
    state: 'California',
    city: 'Temple City',
    scope: 'Tree: street',
    info: 'https://www.fs.usda.gov/rds/archive/catalog/RDS-2017-0010',
    download: 'https://www.fs.usda.gov/rds/archive/products/RDS-2017-0010/RDS-2017-0010.zip',
    vfs: '/vsizip/',
    filename: 'Data/InlandEmpire/TempleCity_Inventory.csv',
    terms: 'McPherson, E. Gregory; van Doorn, Natalie S.; de Goede, John. 2017. Raw urban street tree inventory data for 49 California cities. Fort Collins, CO: Forest Service Research Data Archive. https://doi.org/10.2737/RDS-2017-0010'
  },
  {
    pending: 'address only',
    country: 'United States',
    state: 'California',
    city: 'Tulare',
    scope: 'Tree: street',
    info: 'https://www.fs.usda.gov/rds/archive/catalog/RDS-2017-0010',
    download: 'https://www.fs.usda.gov/rds/archive/products/RDS-2017-0010/RDS-2017-0010.zip',
    vfs: '/vsizip/',
    filename: 'Data/InlandValley/Tulare_Inventory.csv',
    terms: 'McPherson, E. Gregory; van Doorn, Natalie S.; de Goede, John. 2017. Raw urban street tree inventory data for 49 California cities. Fort Collins, CO: Forest Service Research Data Archive. https://doi.org/10.2737/RDS-2017-0010'
  },
  {
    pending: 'address only',
    country: 'United States',
    state: 'California',
    city: 'Upland',
    scope: 'Tree: street',
    info: 'https://www.fs.usda.gov/rds/archive/catalog/RDS-2017-0010',
    download: 'https://www.fs.usda.gov/rds/archive/products/RDS-2017-0010/RDS-2017-0010.zip',
    vfs: '/vsizip/',
    filename: 'Data/InlandEmpire/Upland_Inventory.csv',
    terms: 'McPherson, E. Gregory; van Doorn, Natalie S.; de Goede, John. 2017. Raw urban street tree inventory data for 49 California cities. Fort Collins, CO: Forest Service Research Data Archive. https://doi.org/10.2737/RDS-2017-0010'
  },
  {
    omit: 'likely superseded',
    pending: 'address only',
    country: 'United States',
    state: 'California',
    city: 'Walnut Creek',
    scope: 'Tree: street',
    info: 'https://www.fs.usda.gov/rds/archive/catalog/RDS-2017-0010',
    download: 'https://www.fs.usda.gov/rds/archive/products/RDS-2017-0010/RDS-2017-0010.zip',
    vfs: '/vsizip/',
    filename: 'Data/NorCalCoast/WalnutCreek_Inventory.csv',
    terms: 'McPherson, E. Gregory; van Doorn, Natalie S.; de Goede, John. 2017. Raw urban street tree inventory data for 49 California cities. Fort Collins, CO: Forest Service Research Data Archive. https://doi.org/10.2737/RDS-2017-0010'
  },
  {
    pending: 'address only',
    country: 'United States',
    state: 'California',
    city: 'West Sacramento',
    scope: 'Tree: street',
    info: 'https://www.fs.usda.gov/rds/archive/catalog/RDS-2017-0010',
    download: 'https://www.fs.usda.gov/rds/archive/products/RDS-2017-0010/RDS-2017-0010.zip',
    vfs: '/vsizip/',
    filename: 'Data/InlandValley/WestSacramento_Inventory.csv',
    terms: 'McPherson, E. Gregory; van Doorn, Natalie S.; de Goede, John. 2017. Raw urban street tree inventory data for 49 California cities. Fort Collins, CO: Forest Service Research Data Archive. https://doi.org/10.2737/RDS-2017-0010'
  },
  {
    country: 'United States',
    state: 'California',
    city: 'Anaheim',
    scope: 'Tree',
    notes: 'geofenced (US)',
    info: 'https://data-anaheim.opendata.arcgis.com/datasets/city-trees/about',
    download: {
      arcgis: 'https://gis.anaheim.net/map/rest/services/OpenData/MapServer/41'
    },
    crosswalk: {
      common: 'COMMONNAME',
      scientific: 'BOTANICALNAME',
      dbh_in_range: 'DBH',
      height_ft_range: 'HEIGHT'
    },
    opentrees_id: 'anaheim_ca'
  },
  {
    country: 'United States',
    state: 'California',
    city: 'Bakersfield',
    scope: 'Tree',
    inactive: true,
    info: 'http://hub.arcgis.com/datasets/cob::city-trees',
    download: 'https://opendata.arcgis.com/datasets/b7a17f7ecb564be4b26ced85016ed1da_0.csv',
    api: 'arcgis-opendata',
    geometry: { x: 'X', y: 'Y' },
    srs: 'EPSG:4326',
    crosswalk: {
      updated: 'DATE_',
      scientific: 'BOTANICAL_',
      common: 'COMMON_N',
      dbh_in: 'DIAMETER',
      height_ft: 'HEIGHT',
      crown_ft: x => x['CROWN_RADI'] * 2,
      health: 'RATING',
      note: 'COMMENT',
      ref: 'TREE_ID'
    },
    opentrees_id: 'bakersfield'
  },
  {
    country: 'United States',
    state: 'California',
    city: 'Berkeley',
    scope: 'Tree',
    notes: 'Geofenced (US)',
    info: [
      'https://data.cityofberkeley.info/Natural-Resources/City-Trees/9t35-jmin',
      {file: 'https://data.cityofberkeley.info/api/views/9t35-jmin/files/bIawvzlczwtJhkEj-XEHZE2kCWpmyIN02KZsQBNJBlM?download=true&filename=1_Page_Narrative_City_Trees.pdf'}
    ],
    download: 'https://data.cityofberkeley.info/api/geospatial/9t35-jmin?method=export&format=geojson',
    crosswalk: {
      scientific: 'SPECIES',
      common: 'Common_Nam',
      height_ft: 'HEIGHT_FT',
      dbh_in: 'DBH_IN',
      health: 'CONDITION',
      note: 'note'
    },
    fallingfruit_id: 79,
    opentrees_id: 'berkeley'
  },
  {
    country: 'United States',
    state: 'California',
    city: 'Carpinteria',
    designation: 'Shepard Place Apartments',
    info: 'https://www.arcgis.com/home/item.html?id=710fcd0c003048f4bd1f44bf9ce5b4e6',
    download: {
      arcgis: 'https://services8.arcgis.com/usWxeh2AMSZvdpAg/arcgis/rest/services/Shepard_Place_Tree_Inventory_Public_View/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'California',
    city: 'Carson',
    designation: 'California State University – Dominguez Hills',
    info: 'https://www.arcgis.com/home/item.html?id=b3c5954ee5094731afa0ff5beaf5d1c5',
    download: {
      arcgis: 'https://services9.arcgis.com/H3sRUUw4G1T50MGB/arcgis/rest/services/Trees1121/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'California',
    city: 'Claremont',
    designation: 'Pitzer College',
    scope: 'Tree',
    inactive: true,
    info: 'https://www.arcgis.com/home/item.html?id=97b1c4af317a4db5a29b4ffe3c71abf3',
    download: { checksum: '56001e6935243f81066cc704511f7595' },
    geometry: { x: 'x', y: 'y' },
    srs: 'EPSG:4326'
  },
  {
    country: 'United States',
    state: 'California',
    city: 'Commerce',
    info: 'https://www.arcgis.com/home/item.html?id=1687edd4fad94de5a4d4e094c91308a4',
    download: {
      arcgis: 'https://services5.arcgis.com/t4zDNzBF9Dot8HEQ/arcgis/rest/services/Commerce_Public_Trees_view/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'California',
    city: 'Cupertino',
    scope: 'Tree',
    info: 'https://gis-cupertino.opendata.arcgis.com/datasets/trees/about',
    download: {
      arcgis: 'https://gis.cupertino.org/cupgis/rest/services/Public/AmazonData/MapServer/29'
    },
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
    opentrees_id: 'cupertino'
  },
  {
    country: 'United States',
    state: 'California',
    city: 'Davis',
    designation: 'University of California',
    scope: 'Tree',
    info: 'https://data-ucda.opendata.arcgis.com/datasets/uc-davis-tree-database/about',
    download: {
      arcgis: 'https://gis.ucdavis.edu/server/rest/services/Grounds_Tree_Database/MapServer/0'
    },
    geometry: { x: 'POINT_X', y: 'POINT_Y' },
    srs: 'EPSG:2226',
    crosswalk: {
      ref: 'TreeID',
      planted: x => helpers.reformatDatetime(
        x['PlantingDate'],
        [
          /^(?<day>[0-9]{1,2})\/(?<month>[0-9]{1,2})\/(?<year>[0-9]{4})$/,
          /^(?<month>[0-9]{1,2})\/(?<year>[0-9]{4})$/,
          /^(?<year>[0-9]{4})$/ // HACK: Prevent warning for YYYY
        ]
      ),
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
      dbh_cm: 'DBH',
      height_m_range: 'Height',
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
    },
    opentrees_id: 'uc_davis'
  },
  {
    country: 'United States',
    state: 'California',
    city: 'Escondido',
    scope: 'Tree',
    info: 'https://hub.arcgis.com/datasets/CityofEscondido::tree-inventory/about',
    download: {
      arcgis: 'https://services2.arcgis.com/eJcVbjTyyZIzZ5Ye/arcgis/rest/services/TreeInventory/FeatureServer/0'
    },
    crosswalk: {
      ref: 'TREEID',
      scientific: 'BOTANICAL',
      common: 'COMMON',
      dbh_in_range: 'DBH_RANGE',
      height_ft_range: 'HEIGHT_RAN',
      health: 'CONDITION',
      updated: 'LAST_EDITED_DATE'
    },
    opentrees_id: 'escondido_ca'
  },
  {
    country: 'United States',
    state: 'California',
    city: 'Garden Grove',
    scope: 'Tree',
    notes: 'unofficial',
    info: 'https://zenodo.org/records/6726506',
    download: 'https://zenodo.org/records/6726506/files/GardenGrove_Final_2022-06-18.csv',
    driver: 'CSV',
    geometry: { x: 'longitude_coordinate', y: 'latitude_coordinate' },
    license: { id: 'CC0-1.0' },
    terms: 'McCoy, D., Goulet-Scott, B., Meng, W., Atahan, B., Kiros, H., Nishino, M., & Kartesz, J. (2022). A dataset of 5 million city trees from 63 US cities: species, location, nativity status, health, and more. [Data set]. Zenodo. https://doi.org/10.5061/dryad.2jm63xsrf'
  },
  {
    country: 'United States',
    state: 'California',
    city: 'Goleta',
    designation: 'Pacific Oaks Apartments',
    info: 'https://www.arcgis.com/home/item.html?id=68ca0b278c374452ae2789b65b4d927d',
    download: {
      arcgis: 'https://services8.arcgis.com/usWxeh2AMSZvdpAg/arcgis/rest/services/Pacific_Oaks_Tree_Inventory_-Public_View/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'California',
    city: 'Inglewood',
    info: 'https://www.arcgis.com/home/item.html?id=b0098996542542f997f3668f5712fa09',
    download: {
      arcgis: 'https://services5.arcgis.com/t4zDNzBF9Dot8HEQ/arcgis/rest/services/Inglewood_Tree_Layer_view/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'California',
    city: 'Laguna Woods',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=517dc0aecd3244909bf9b71d02fcdaff',
    download: {
      arcgis: 'https://services9.arcgis.com/DPQ7yLDIWIyMUXzD/arcgis/rest/services/GIS_Map/FeatureServer/13'
    }
  },
  {
    country: 'United States',
    state: 'California',
    city: 'Long Beach',
    scope: 'Tree',
    info: 'https://data.longbeach.gov/explore/dataset/tree-inventory/information/',
    download: 'https://data.longbeach.gov/api/explore/v2.1/catalog/datasets/tree-inventory/exports/geojson',
    license: { id: 'CC-BY-4.0' }
  },
  {
    country: 'United States',
    state: 'California',
    city: 'Los Angeles',
    scope: 'Tree',
    info: 'https://data.lacity.org/A-Livable-and-Sustainable-City/Street-Tree-Inventory-1990s/vt5t-mscf',
    download: 'https://data.lacity.org/api/views/vt5t-mscf/rows.csv',
    geometry: { x: 'X', y: 'Y' },
    srs: 'EPSG:4326',
    license: { id: 'CC0-1.0' }
  },
  {
    country: 'United States',
    state: 'California',
    city: 'Los Angeles',
    scope: 'Tree: street',
    info: 'https://geohub.lacity.org/datasets/trees-bureau-of-street-services/about',
    download: {
      arcgis: 'https://services5.arcgis.com/7nsPwEMP38bSkCjy/arcgis/rest/services/Trees_Data_Bureau_of_Street_Services/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'California',
    city: 'Los Angeles',
    scope: 'Tree: park',
    info: 'https://geohub.lacity.org/datasets/trees-recreation-and-parks-department/about',
    download: {
      arcgis: 'https://maps.lacity.org/lahub/rest/services/Recreation_and_Parks_Department/MapServer/6'
    }
  },
  {
    country: 'United States',
    state: 'California',
    city: 'Lynwood',
    info: 'https://www.arcgis.com/home/item.html?id=3ec0340026de4a959d1b0af40e9cb160',
    download: {
      arcgis: 'https://services5.arcgis.com/t4zDNzBF9Dot8HEQ/arcgis/rest/services/Lynwood_Public_Trees_(CAL_FIRE)_view/FeatureServer/0'
    }
  },
  {
    pending: 'address only',
    country: 'United States',
    state: 'California',
    city: 'Menlo Park',
    scope: 'Tree',
    inactive: true,
    download: { checksum: '1f24fab0ec2567cfa8ec7ecae695284d' },
    fallingfruit_id: 360
  },
  {
    country: 'United States',
    state: 'California',
    city: 'Mountain View',
    scope: 'Tree',
    notes: 'geofenced (US)',
    info: 'https://data-mountainview.opendata.arcgis.com/datasets/trees/about',
    download: {
      arcgis: 'https://maps.mountainview.gov/arcgis/rest/services/Public/Trees/MapServer/0'
    },
    crosswalk: {
      scientific: 'SPECIES',
      common: 'NAME',
      ref: 'FACILITYID',
      age: 'TREEAGE',
      dbh_in: 'DIAMETER',
      height_ft: 'HEIGHT',
      planted: 'INSTALLDATE',
      health: 'CONDITION',
      updated: 'LASTUPDATE'
    },
    opentrees_id: 'mountain_view'
  },
  {
    country: 'United States',
    state: 'California',
    city: 'Northridge',
    designation: 'California State University',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=a8f4e49a72d74f779f88bb59526191ed',
    download: {
      arcgis: 'https://services6.arcgis.com/4XnW0LugjJEsZM3v/arcgis/rest/services/Tree_Inventory_20230226_WFL1/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'California',
    city: 'Oakland',
    scope: 'Tree',
    info: 'https://data.oaklandca.gov/dataset/Street-Trees/9e7e-63pp',
    download: 'https://data.oaklandca.gov/api/geospatial/9e7e-63pp?method=export&format=geojson',
    fallingfruit_id: 81
  },
  {
    country: 'United States',
    state: 'California',
    city: 'Ontario',
    scope: 'Tree',
    notes: 'unofficial',
    info: 'https://zenodo.org/records/6726506',
    download: 'https://zenodo.org/records/6726506/files/Ontario_Final_2022-06-18.csv',
    driver: 'CSV',
    geometry: { x: 'longitude_coordinate', y: 'latitude_coordinate' },
    license: { id: 'CC0-1.0' },
    terms: 'McCoy, D., Goulet-Scott, B., Meng, W., Atahan, B., Kiros, H., Nishino, M., & Kartesz, J. (2022). A dataset of 5 million city trees from 63 US cities: species, location, nativity status, health, and more. [Data set]. Zenodo. https://doi.org/10.5061/dryad.2jm63xsrf'
  },
  {
    country: 'United States',
    state: 'California',
    city: 'Oxnard',
    scope: 'Tree',
    info: 'http://data-oxnard.opendata.arcgis.com/datasets/a5aa2d1dfd344ef79d61507d33cdbc02_1/about',
    download: {
      arcgis: 'https://maps.oxnard.org/arcgis/rest/services/ParksLayers/MapServer/1'
    },
    crosswalk: {
      scientific: 'BOTANICALN',
      common: 'COMMONNAME',
      dbh_in: 'DBH',
      height_ft: 'HEIGHT'
    },
    opentrees_id: 'oxnard'
  },
  {
    country: 'United States',
    state: 'California',
    city: 'Pacific Grove',
    scope: 'Tree',
    info: 'https://city-of-pacific-grove-open-data-citypacificgrove.hub.arcgis.com/datasets/507f740b82fa4202af8cdb09529f4e07_0/about',
    download: {
      arcgis: 'https://gis-web.cityofpacificgrove.org/arcgis/rest/services/Open_Data/Trees/MapServer/0'
    },
    crosswalk: {
      common: 'Type',
      scientific: 'BOTANICAL',
      cultivar: 'CULTIVAR',
      dbh_in: 'DBH',
      health: x => String(x.CONDITION).split(' - ')[0],
      note: 'NOTES'
    },
    opentrees_id: 'pacific_grove_ca'
  },
  {
    country: 'United States',
    state: 'California',
    city: 'Palm Desert',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=f7965742dbb34b7ea7c66d09fbe51660',
    download: {
      arcgis: 'https://services2.arcgis.com/i4mrGZu1Isvl0rWt/arcgis/rest/services/Palm_Desert_Tree_Inventory_2020/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'California',
    city: 'Palo Alto',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=b9e82567e85549cdbe8aee5b336a6295',
    download: {
      arcgis: 'https://services6.arcgis.com/evmyRZRrsopdeog7/arcgis/rest/services/TreeData/FeatureServer/0'
    },
    fallingfruit_id: 178
  },
  {
    country: 'United States',
    state: 'California',
    city: 'Pasadena',
    scope: 'Tree: street',
    info: 'http://data.cityofpasadena.net/datasets/593b88391b614123890f54a1db8fbf55_2/about',
    download: {
      arcgis: 'https://services2.arcgis.com/zNjnZafDYCAJAbN0/arcgis/rest/services/Street_ROW_Trees/FeatureServer/0'
    }
  },
  {
    omit: 'empty',
    country: 'United States',
    state: 'California',
    city: 'Pasadena',
    scope: 'Tree: notable',
    info: 'http://data.cityofpasadena.net/datasets/6b8f7488ed824ea1b59c96398352ed8b_0/about',
    download: {
      arcgis: 'https://services2.arcgis.com/zNjnZafDYCAJAbN0/arcgis/rest/services/Landmark_Tree/FeatureServer/0'
    },
    terms: 'Any resale of this information is prohibited.'
  },
  {
    country: 'United States',
    state: 'California',
    city: 'Placentia',
    scope: 'Tree',
    info: 'https://placentia.maps.arcgis.com/home/item.html?id=96c75939ccb74bee91dd7c2856d5f1dc',
    download: {
      arcgis: 'https://services1.arcgis.com/3CyDafKD7aN8Dr8M/arcgis/rest/services/Tree_Inventory_2021/FeatureServer/0'
    },
    crosswalk: {
      ref: 'INVENTORYI',
      scientific: 'BOTANICALN',
      common: 'COMMONNAME',
      dbh_in_range: 'DBH',
      height_ft_range: 'HEIGHT',
      updated: 'EditDate'
    },
    opentrees_id: 'placentia_ca'
  },
  {
    country: 'United States',
    state: 'California',
    city: 'Rancho Cucamonga',
    scope: 'Tree',
    info: 'https://rcdata-regis.opendata.arcgis.com/datasets/REGIS::tree-inventory-public/about',
    download: {
      arcgis: 'https://services1.arcgis.com/bF44QtfoYZDGo7TK/arcgis/rest/services/TreeInventoryPublic/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'California',
    city: 'Redding',
    designation: 'Shasta College',
    info: 'https://www.arcgis.com/home/item.html?id=281082f77a3b425b85c16d9e9722c766',
    download: {
      arcgis: 'https://services1.arcgis.com/BkEmXKuPzvnbC7ZB/arcgis/rest/services/Tree_Inventory_3_24_WFL1/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'California',
    city: 'Redlands',
    designation: 'Esri Learning Center',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=c6cc3fd362ae4d32ba012defcca23320',
    download: {
      arcgis: 'https://services6.arcgis.com/Do88DoK2xjTUCXd1/arcgis/rest/services/Esri_Redlands_Trees/FeatureServer/0'
    },
    license: { id: 'CC-BY-4.0' }
  },
  {
    country: 'United States',
    state: 'California',
    city: 'Redlands',
    scope: 'Tree',
    info: 'https://opendata-coredlands.opendata.arcgis.com/datasets/9f9d4ad74a0d44fba8bf27c829e810f2_0/about',
    download: {
      arcgis: 'https://services.arcgis.com/FLM8UAw9y5MmuVTV/arcgis/rest/services/Street_Trees/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'California',
    city: 'Richmond',
    scope: 'Tree',
    info: 'https://www.transparentrichmond.org/Environmental-and-Health-Initiatives/Richmond-Urban-Forestry-Inventory/pev4-ymun',
    download: 'https://www.transparentrichmond.org/api/geospatial/pev4-ymun?method=export&format=geojson'
  },
  {
    country: 'United States',
    state: 'California',
    city: 'Riverside',
    designation: 'Riverside-Corona Resource Conservation District',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=a44aec6ffa674c73a0d15f7c83c611bf',
    download: 'https://www.arcgis.com/sharing/rest/content/items/a44aec6ffa674c73a0d15f7c83c611bf/data',
    api: 'arcgis-sharing',
    openFunc: file => helpers.openEsriFeatureCollectionWithGdal(
      file, {layerName: 'Tree Inventory_10-20-12_9500'}
    )
  },
  {
    country: 'United States',
    state: 'California',
    city: 'Riverside',
    info: 'https://www.arcgis.com/home/item.html?id=808f5a117266488ab5de8c98a4b74ea9',
    download: {
      arcgis: 'https://services5.arcgis.com/t4zDNzBF9Dot8HEQ/arcgis/rest/services/Riverside_Public_Trees_(TCC)_1_view_only/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'California',
    city: 'Sacramento',
    scope: 'Tree',
    info: 'http://data.cityofsacramento.org/datasets/b9b716e09b5048179ab648bb4518452b_0/about',
    download: {
      arcgis: 'https://services5.arcgis.com/54falWtcpty3V47Z/arcgis/rest/services/City_Maintained_Trees/FeatureServer/0'
    },
    fallingfruit_id: 96
  },
  {
    country: 'United States',
    state: 'California',
    city: 'Salinas',
    scope: 'Tree',
    info: 'https://cityofsalinas.opendatasoft.com/explore/dataset/tree-inventory/information/',
    download: 'https://cityofsalinas.opendatasoft.com/api/explore/v2.1/catalog/datasets/tree-inventory/exports/geojson',
    license: { id: 'ODbL-1.0' }
  },
  {
    country: 'United States',
    state: 'California',
    city: 'San Diego',
    designation: 'Environmental Health Coalition',
    info: 'https://www.arcgis.com/home/item.html?id=aae56b40f8214c809a4642840950380a',
    download: {
      arcgis: 'https://services5.arcgis.com/UuGNL8jmkrbAGh6f/arcgis/rest/services/Urban_Corp_EHC_Tree_Sites_WFL1/FeatureServer/1'
    }
  },
  {
    country: 'United States',
    state: 'California',
    city: 'San Diego',
    scope: 'Tree',
    notes: 'login required',
    info: {
      manual: 'https://rdw.sandag.org/Account/GetFSFile.aspx?dir=Miscellaneous&Name=Trees_SD.pdf'
    },
    download: {
      manual: 'https://rdw.sandag.org/Account/GetFSFile.aspx?dir=Miscellaneous&Name=Trees_SD.ZIP'
    },
    vfs: '/vsizip/',
    terms: 'https://gis.sangis.org/sanportal/apps/storymaps/stories/d26146d84e834ff6bcd58e4e620a983a',
    fallingfruit_id: 97
  },
  {
    country: 'United States',
    state: 'California',
    city: 'San Fernando',
    info: 'https://www.arcgis.com/home/item.html?id=fa970f39538c4bf0bb5b32a5df2e1f85',
    download: {
      arcgis: 'https://services5.arcgis.com/t4zDNzBF9Dot8HEQ/arcgis/rest/services/San_Fernando_CAL_FIRE_Tree_Layer_view/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'California',
    city: 'San Francisco',
    designation: 'San Francisco State University',
    scope: 'Tree',
    info: 'http://www.arcgis.com/home/item.html?id=39d96c56d07c4f20858cb95a8e4307c4',
    download: {
      arcgis: 'https://services.arcgis.com/MdapRpkzb0PVHqL1/arcgis/rest/services/SFSU_trees_2014_01_24/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'California',
    city: 'San Francisco',
    scope: 'Tree',
    info: 'https://data.sfgov.org/City-Infrastructure/Street-Tree-List/tkzw-k3nq',
    download: 'https://data.sfgov.org/api/views/tkzw-k3nq/rows.csv',
    geometry: { x: 'Longitude', y: 'Latitude' },
    crosswalk: {
      ref: 'TreeID',
      scientific: x => String(x.qSpecies).split(' :: ')[0],
      common: x => String(x.qSpecies).split(' :: ')[1],
      description: 'qSiteInfo',
      dbh_in: 'DBH',
      planted: 'PlantDate'
    },
    license: { id: 'PDDL-1.0' },
    fallingfruit_id: 98,
    opentrees_id: 'san_francisco'
  },
  {
    country: 'United States',
    state: 'California',
    city: 'San Jose',
    scope: 'Tree: street',
    notes: 'geofenced (US)',
    info: 'https://gisdata-csj.opendata.arcgis.com/maps/street-tree/about',
    download: {
      arcgis: 'https://geo.sanjoseca.gov/server/rest/services/OPN/OPN_OpenDataService/MapServer/510'
    },
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
    opentrees_id: 'san_jose_ca1'
  },
  {
    country: 'United States',
    state: 'California',
    city: 'San Jose',
    scope: 'Tree: notable',
    notes: 'geofenced (US)',
    info: 'https://gisdata-csj.opendata.arcgis.com/maps/heritage-tree/about',
    download: {
      arcgis: 'https://geo.sanjoseca.gov/server/rest/services/OPN/OPN_OpenDataService/MapServer/511'
    },
    opentrees_id: 'san_jose_ca1'
  },
  {
    country: 'United States',
    state: 'California',
    city: 'San Luis Obispo',
    designation: 'Anholm Greenway',
    info: 'https://www.arcgis.com/home/item.html?id=310c1e00da804039909c8c96c8a97c84',
    download: {
      arcgis: 'https://services8.arcgis.com/usWxeh2AMSZvdpAg/arcgis/rest/services/Anholm_Greenway_Tree_Inventory_-_Public_View_Layer/FeatureServer/0'
    }
  },
  {
    omit: 'empty | superseded',
    country: 'United States',
    state: 'California',
    city: 'Santa Barbara',
    designation: 'University of California',
    scope: 'Tree',
    info: 'http://spatialdiscovery-ucsb.opendata.arcgis.com/datasets/treekeeper-012116/about',
    download: {
      arcgis: 'https://services1.arcgis.com/4TXrdeWh0RyCqPgB/arcgis/rest/services/Treekeeper_012116/FeatureServer/0'
    },
    opentrees_id: 'ucsb'
  },
  {
    country: 'United States',
    state: 'California',
    city: 'Santa Barbara',
    designation: 'University of California',
    scope: 'Plant',
    download: {
      arcgis: 'https://services1.arcgis.com/4TXrdeWh0RyCqPgB/ArcGIS/rest/services/UCSB_Campus_Flora_Map_WFL/FeatureServer/0'
    },
    opentrees_id: 'ucsb'
  },
  {
    country: 'United States',
    state: 'California',
    city: 'Santa Monica',
    scope: 'Tree',
    info: 'https://data.santamonica.gov/dataset/trees-inventory',
    download: 'https://data.santamonica.gov/datastore/dump/54d5b905-d4b5-4b5d-8e68-823df6c04b2f',
    geometry: { x: 'longitude', y: 'latitude' },
    srs: 'EPSG:4326',
    license: { id: 'ODC-By-1.0' }
  },
  {
    country: 'United States',
    state: 'California',
    city: 'Santa Rosa',
    scope: 'Tree',
    notes: 'unofficial',
    info: 'https://zenodo.org/records/6726506',
    download: 'https://zenodo.org/records/6726506/files/SantaRosa_Final_2022-06-18.csv',
    driver: 'CSV',
    geometry: { x: 'longitude_coordinate', y: 'latitude_coordinate' },
    license: { id: 'CC0-1.0' },
    terms: 'McCoy, D., Goulet-Scott, B., Meng, W., Atahan, B., Kiros, H., Nishino, M., & Kartesz, J. (2022). A dataset of 5 million city trees from 63 US cities: species, location, nativity status, health, and more. [Data set]. Zenodo. https://doi.org/10.5061/dryad.2jm63xsrf'
  },
  {
    country: 'United States',
    state: 'California',
    city: 'South Gate | Cudahy',
    info: 'https://www.arcgis.com/home/item.html?id=6e56852fecaa47ada57b42cf71544bfd',
    download: {
      arcgis: 'https://services5.arcgis.com/t4zDNzBF9Dot8HEQ/arcgis/rest/services/South_Gate_Cudahy_Public_Tree_Layer_view/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'California',
    city: 'South Gate | Cudahy',
    scope: 'Tree: edible',
    info: 'https://www.arcgis.com/home/item.html?id=c1764d93de404103b5791364841337c2',
    download: {
      arcgis: 'https://services5.arcgis.com/t4zDNzBF9Dot8HEQ/arcgis/rest/services/South_Gate_Cudahy_Fruit_Tree_Layer_view/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'California',
    city: 'Stanford',
    designation: 'Stanford University',
    scope: 'Tree: inedible',
    info: 'https://stanford.maps.arcgis.com/home/item.html?id=67deaa4165124e48a9a5c40450ffbbcd',
    download: {
      arcgis: 'https://services.arcgis.com/7CRlmWNEbeCqEJ6a/arcgis/rest/services/Stanford_Trees_Inedible/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'California',
    city: 'Stanford',
    designation: 'Stanford University',
    scope: 'Tree: edible',
    info: 'https://stanford.maps.arcgis.com/home/item.html?id=026fccaa2a8c4834a2b3a8ca0584fa35',
    download: {
      arcgis: 'https://services.arcgis.com/7CRlmWNEbeCqEJ6a/arcgis/rest/services/Stanford_Trees_Edible/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'California',
    city: 'Stanford',
    designation: 'Stanford University',
    scope: 'Tree',
    info: 'https://stanford.maps.arcgis.com/home/item.html?id=7e908a18a78142df8bcccda575e6a5e8',
    download: {
      arcgis: 'https://services.arcgis.com/7CRlmWNEbeCqEJ6a/arcgis/rest/services/Operational_Layers_Annotation/FeatureServer/14'
    }
  },
  {
    country: 'United States',
    state: 'California',
    city: 'Stockton',
    scope: 'Tree',
    notes: 'unofficial | coordinates derived from addresses',
    info: 'https://zenodo.org/records/6726506',
    download: 'https://zenodo.org/records/6726506/files/Stockton_Final_2022-06-18.csv',
    driver: 'CSV',
    geometry: { x: 'longitude_coordinate', y: 'latitude_coordinate' },
    license: { id: 'CC0-1.0' },
    terms: 'McCoy, D., Goulet-Scott, B., Meng, W., Atahan, B., Kiros, H., Nishino, M., & Kartesz, J. (2022). A dataset of 5 million city trees from 63 US cities: species, location, nativity status, health, and more. [Data set]. Zenodo. https://doi.org/10.5061/dryad.2jm63xsrf'
  },
  {
    country: 'United States',
    state: 'California',
    city: 'Walnut Creek',
    scope: 'Tree',
    notes: 'Downloaded on the ArcGIS Open Data portal',
    download: { checksum: '091d32629a619c79d55611e76903eaca' },
    geometry: { x: 'x', y: 'y' },
    srs: 'EPSG:4326'
  },
  {
    country: 'United States',
    state: 'California',
    city: 'Watts',
    notes: 'overlaps Los Angeles street trees',
    info: 'https://www.arcgis.com/home/item.html?id=4a8a7f25ce054cc4839aa6e0133bd859',
    download: {
      arcgis: 'https://services5.arcgis.com/t4zDNzBF9Dot8HEQ/arcgis/rest/services/Watts_44_3_view/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'California',
    city: 'Watts',
    notes: 'overlaps Los Angeles street trees',
    info: 'https://www.arcgis.com/home/item.html?id=45c4ea6a3f1e4c989fb0c9f2fe910a59',
    download: {
      arcgis: 'https://services5.arcgis.com/t4zDNzBF9Dot8HEQ/arcgis/rest/services/Watts_44_2_view/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'California',
    city: 'West Hollywood',
    scope: 'Tree',
    notes: 'Likely georeferenced from address',
    info: 'https://data.weho.org/Infrastructure/City-Tree-Inventory/qqwt-wx9z',
    download: 'https://data.weho.org/api/views/qqwt-wx9z/rows.csv',
    coordsFunc: x => {
      // 1250 FAIRFAX AV\nWest Hollywood, CA\n(34.093341, -118.361436)
      const match = x['Location'].match(/\(([0-9\.\-]+),\s*([0-9\.\-]+)\)$/)
      return [match[2], match[1]]
    },
    srs: 'EPSG:4326',
    license: { id: 'CC0-1.0' }
  },
  {
    country: 'United States',
    state: 'California',
    city: 'Yucaipa',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=ac628fb7f6d446379ecd969f8425cd48',
    download: {
      arcgis: 'https://services5.arcgis.com/86gdKBxZf7GIt2Or/arcgis/rest/services/City_of_Yucaipa_Trees/FeatureServer/0'
    },
    license: { id: 'CC0-1.0' }
  },
  {
    country: 'United States',
    state: 'Colorado',
    city: 'Aspen',
    designation: 'City of Aspen Parks Department',
    scope: 'Tree: park',
    info: 'https://www.arcgis.com/home/item.html?id=1d315c099b734af0b4fe68cac13a7ed1',
    download: {
      arcgis: 'https://services3.arcgis.com/5FkYBrhNzpVtlA6F/arcgis/rest/services/Parks/FeatureServer/2'
    },
    license: { id: 'CC-BY-4.0' }
  },
  {
    country: 'United States',
    state: 'Colorado',
    city: 'Aurora',
    designation: 'Danbury Park',
    scope: 'Tree',
    notes: 'no overlap with https://ags.auroragov.org/aurora/rest/services/OpenData/MapServer/85',
    info: 'https://www.arcgis.com/home/item.html?id=c6b569b1ea64453d995cdf215003e666',
    download: {
      arcgis: 'https://services.arcgis.com/VgmyyKiMPvUPgldo/arcgis/rest/services/Danbury_Map_0/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Colorado',
    city: 'Aurora',
    scope: 'Tree',
    notes: 'geofenced (US)',
    info: 'http://data-auroraco.opendata.arcgis.com/datasets/trees-city/about',
    download: {
      arcgis: 'https://ags.auroragov.org/aurora/rest/services/OpenData/MapServer/85'
    },
    crosswalk: {
      ref: 'TREE_ID_NO',
      location: 'MAN_UNIT',
      common: x => x['SPECIES'].replace(/^(.*);\s*(.*)$/, '$2 $1'),
      health: 'CONDITION',
      dbh_in: 'DIAMETER',
      maintainer: 'MAINTENANCE'
    },
    opentrees_id: 'aurora'
  },
  {
    country: 'United States',
    state: 'Colorado',
    city: 'Basalt',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=a2bc2b4dd4ff4bd8b2b8f73eae4e0230',
    download: {
      arcgis: 'https://services1.arcgis.com/WC9BfqWRsZfeuIHn/arcgis/rest/services/Tree_Inventory_/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Colorado',
    city: 'Boulder',
    scope: 'Tree',
    info: 'https://data-boulder.opendata.arcgis.com/datasets/dbbae8bdb0a44d17934243b88e85ef2b_0/about',
    download: {
      arcgis: 'https://gis.bouldercolorado.gov/ags_svr2/rest/services/parks/TreesOpenData/MapServer/0'
    },
    crosswalk: {
      scientific: 'LATINNAME',
      common: 'COMMONNAME',
      cultivar: 'CULTIVAR',
      dbh_in: 'DBHINT',
      location: 'LOCTYPE'
    },
    license: { id: 'CC0-1.0' },
    fallingfruit_id: 86,
    opentrees_id: 'boulder'
  },
  {
    country: 'United States',
    state: 'Colorado',
    city: 'Colorado Springs',
    scope: 'Tree',
    info: 'https://data.coloradosprings.gov/dataset/City-of-Colorado-Springs-Trees/e6wv-b629',
    download: 'https://data.coloradosprings.gov/api/geospatial/e6wv-b629?method=export&format=geojson',
    crosswalk: { ref: 'OBJECTID', common: 'Common_Name', dbh_in: 'DBH' },
    opentrees_id: 'colorado_springs-co'
  },
  {
    country: 'United States',
    state: 'Colorado',
    city: 'Denver',
    designation: 'Regis University',
    scope: 'Tree',
    notes: 'Submitted by Nick Hug (data creator) on 2015-12-22',
    download: { checksum: 'b4616cad05ff8912dd2a58ca3508c738' },
    geometry: { x: 'Longitude', y: 'Lattitude' },
    srs: 'EPSG:4326',
    fallingfruit_id: 414
  },
  {
    country: 'United States',
    state: 'Colorado',
    city: 'Denver',
    scope: 'Tree',
    info: 'https://www.denvergov.org/opendata/dataset/city-and-county-of-denver-tree-inventory',
    download: {
      arcgis: 'https://services1.arcgis.com/zdB7qR0BtYrg0Xpl/ArcGIS/rest/services/ODC_PARK_TREEINVENTORY_P/FeatureServer/241'
    },
    crosswalk: {
      ref: 'SITE_ID',
      scientific: 'SPECIES_BOTANIC',
      common: 'SPECIES_COMMON',
      dbh_in: 'DIAMETER',
      location: 'LOCATION_NAME'
    },
    license: { id: 'CC-BY-3.0' },
    fallingfruit_id: 421,
    opentrees_id: 'denver'
  },
  {
    country: 'United States',
    state: 'Colorado',
    city: 'Durango',
    scope: 'Tree',
    info: 'https://data-cityofdurango.opendata.arcgis.com/datasets/city-trees/about',
    download: {
      arcgis: 'https://gis.durangogov.org/map/rest/services/ParksFeatureAccess/MapServer/3'
    },
    crosswalk: {
      ref: 'ID',
      common: 'COMMON',
      genus: 'GENUS',
      species: 'SPECIES',
      cultivar: 'CULTIVAR',
      dbh_in: 'DBH',
      age: 'GRWTHYEARS',
      health: 'CONDITION',
      note: 'TREENOTES'
    },
    opentrees_id: 'durango_co'
  },
  {
    country: 'United States',
    state: 'Colorado',
    city: 'Fort Collins',
    designation: 'Colorado State University',
    info: 'https://www.arcgis.com/home/item.html?id=377be848e2274becad65284382e7e726',
    download: {
      arcgis: 'https://services.arcgis.com/VgmyyKiMPvUPgldo/arcgis/rest/services/CSU_Inventory_view/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Colorado',
    city: 'Grand Junction',
    scope: 'Tree',
    info: 'https://data-gjcitygis.opendata.arcgis.com/datasets/cef93c83233749eb9265914aca06b35c_1/about',
    download: {
      arcgis: 'https://external22-gis.gjcity.org/arcgis/rest/services/Hub/City_Hub/MapServer/1'
    },
    crosswalk: {
      ref: 'OBJECTID',
      common: x => x['TRG_COMMON'].replace(/^(.*), (.*)$/, '$2 $1'),
      health: 'TRG_COND_CD',
      genus: 'TRG_GENUS',
      species: 'TRG_SPECIES',
      cultivar: 'TRG_CULTIVAR',
      dbh_in: 'TRG_DIA',
      height_ft: 'TRG_HEIGHT'
    },
    opentrees_id: 'grand_junction-co'
  },
  {
    country: 'United States',
    state: 'Colorado',
    city: 'Larimer',
    designation: 'Front Range Community College',
    scope: 'Tree',
    info: 'http://www.arcgis.com/home/item.html?id=15ffe63b9b804fe5a32522b42190c6d8',
    download: 'https://www.arcgis.com/sharing/rest/content/items/15ffe63b9b804fe5a32522b42190c6d8/data',
    api: 'arcgis-sharing',
    openFunc: file => helpers.openEsriFeatureCollectionWithGdal(file)
  },
  {
    country: 'United States',
    state: 'Colorado',
    city: 'Morrison',
    designation: 'Willow Springs',
    info: 'https://www.arcgis.com/home/item.html?id=c803f17c4a4d4de585efe65f4d4631f8',
    download: {
      arcgis: 'https://services.arcgis.com/VgmyyKiMPvUPgldo/arcgis/rest/services/Willow_Springs/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Connecticut',
    city: 'Collinsville',
    scope: 'Tree',
    download: {
      arcgis: 'https://services1.arcgis.com/7uJv7I3kgh2y7Pe0/ArcGIS/rest/services/Collinsville_Street_Trees_1/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Connecticut',
    city: 'Farmington',
    designation: 'Hartford Connecticut Temple',
    info: 'https://www.arcgis.com/home/item.html?id=31f07939911e4f9b8c033c4cb4983513',
    download: {
      arcgis: 'https://services.arcgis.com/VgmyyKiMPvUPgldo/arcgis/rest/services/Hartford_Temple_Tree_Inventory/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Connecticut',
    city: 'Hartford',
    designation: 'Asylum Hill',
    info: 'https://www.arcgis.com/home/item.html?id=cd174cb7fa734d3c99ccfa484c8acb8a',
    download: {
      arcgis: 'https://services6.arcgis.com/mnq6ko7vA00FIgWY/arcgis/rest/services/Asylum_HillTreekeeper_data___trees/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Connecticut',
    city: 'Hartford',
    designation: 'Bushnell Park',
    scope: 'Tree: park',
    info: 'https://www.arcgis.com/home/item.html?id=0ab7819a521c41b7bbc075c5c67a1d74',
    download: {
      arcgis: 'https://services.arcgis.com/VgmyyKiMPvUPgldo/arcgis/rest/services/2022_Bushnell_Park_Tree_Inventory/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Connecticut',
    city: 'Hartford',
    designation: 'Institute for Living',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=1401ad3b075442b1a114059cc30abc5a',
    download: {
      arcgis: 'https://services.arcgis.com/VgmyyKiMPvUPgldo/arcgis/rest/services/Institute_for_Living/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Connecticut',
    city: 'New Haven',
    designation: 'Community Greenspace',
    scope: 'Tree: park',
    inactive: true,
    notes: "superseded by https://services1.arcgis.com/7uJv7I3kgh2y7Pe0/ArcGIS/rest/services/New_Haven_Street_Trees_02/FeatureServer/0 ? | Mapping by the Yale University School of Forestry & Environmental Studies' Urban Resources Initiative (https://uri.yale.edu) of trees planted in association with Community Greenspace groups in New Haven, Connecticut (https://environment.yale.edu/uri/programs/community-greenspace)",
    info: 'https://uri.yale.edu/maps/community-greenspace-sites-map',
    download: {
      manual: 'http://www.environment.yale.edu/uri/maps/community-greenspace-sites-map'
    },
    vfs: '/vsizip/',
    fallingfruit_id: 232
  },
  {
    country: 'United States',
    state: 'Connecticut',
    city: 'New Haven',
    designation: 'Yale University',
    scope: 'Tree',
    inactive: true,
    notes: 'overlap with https://services1.arcgis.com/7uJv7I3kgh2y7Pe0/ArcGIS/rest/services/New_Haven_Street_Trees_02/FeatureServer/0 ? | Campus tree inventory by F.A. Bartlett Tree Expert Company (https://www.bartlett.com)',
    download: { checksum: 'a9d92a252b10c1da1c50ac0a022b7acc' },
    vfs: '/vsizip/',
    fallingfruit_id: 233
  },
  {
    country: 'United States',
    state: 'Connecticut',
    city: 'New Haven',
    scope: 'Tree',
    download: {
      arcgis: 'https://services1.arcgis.com/7uJv7I3kgh2y7Pe0/ArcGIS/rest/services/New_Haven_Street_Trees_02/FeatureServer/0'
    },
    fallingfruit_id: 230
  },
  {
    country: 'United States',
    state: 'Connecticut',
    city: 'Stamford',
    designation: 'River Oaks',
    scope: 'Tree',
    download: {
      arcgis: 'https://services.arcgis.com/VgmyyKiMPvUPgldo/arcgis/rest/services/River_Oaks_FINAL/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Connecticut',
    city: 'Torrington',
    info: 'https://www.arcgis.com/home/item.html?id=a29be4896ea54b469c7af57efd464389',
    download: {
      arcgis: 'https://services7.arcgis.com/cszgVAzZgLvRmS7T/arcgis/rest/services/TorringtonTreeInventory_AGOL_2023/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'District of Columbia',
    city: 'Washington',
    scope: 'Tree: park',
    info: 'https://www.arcgis.com/home/item.html?id=aa94f0815288452abe6e0fcfb14caab3',
    download: {
      arcgis: 'https://services2.arcgis.com/j23KFYd23hRWewtZ/arcgis/rest/services/Inventory_2020/FeatureServer/0'
    },
    opentrees_id: 'washington-dc'
  },
  {
    country: 'United States',
    state: 'District of Columbia',
    city: 'Washington',
    scope: 'Tree',
    info: 'http://opendata.dc.gov/datasets/urban-forestry-street-trees/about',
    download: {
      arcgis: 'https://maps2.dcgis.dc.gov/dcgis/rest/services/DCGIS_DATA/Environment_WebMercator/MapServer/23'
    },
    crosswalk: {
      dbh_in: 'DBH',
      common: 'COMMON.NAME',
      scientific: 'SCI_NM',
      planted: 'DATE_PLANT',
      family: 'FAM_NAME',
      note: 'TREE_NOTES',
      health: 'CONDITION'
    },
    license: { id: 'CC-BY-4.0' },
    fallingfruit_id: 103,
    opentrees_id: 'washington-dc'
  },
  {
    country: 'United States',
    state: 'Florida',
    designation: 'Leon County',
    scope: 'Tree: street (main)',
    info: 'https://geodata-tlcgis.opendata.arcgis.com/datasets/tlcgis::canopy-road-tree-inventory-leon-county/about',
    download: {
      arcgis: 'https://services.arcgis.com/ptvDyBs1KkcwzQNJ/arcgis/rest/services/Canopy_Road_Tree_Inventory_Public/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Florida',
    designation: 'Pinellas County',
    scope: 'Tree: street',
    info: 'https://www.arcgis.com/home/item.html?id=1ce91f03fff34dc0834a9f4a136fc7cf',
    download: {
      arcgis: 'https://services1.arcgis.com/9lDFdeC4JIBgML6L/arcgis/rest/services/Pinellas_County_Tree_Inventory/FeatureServer/23'
    }
  },
  {
    country: 'United States',
    state: 'Florida',
    designation: 'Sarasota County',
    scope: 'Tree',
    info: 'https://data-sarco.opendata.arcgis.com/datasets/d83796771ba64ea88f958c058ddcfa79_0/about',
    download: {
      arcgis: 'https://ags3.scgov.net/server/rest/services/Hosted/TreeInventory/FeatureServer/0'
    },
    driver: 'ESRIJSON'
  },
  {
    country: 'United States',
    state: 'Florida',
    city: 'Cape Coral',
    scope: 'Tree',
    notes: 'geofenced (US)',
    info: 'https://capecoral-capegis.opendata.arcgis.com/datasets/tree-inventory/about',
    download: {
      arcgis: 'https://capeims.capecoral.gov/arcgis/rest/services/OpenData/Environmental/MapServer/0'
    },
    crosswalk: {
      common: 'SPECIES',
      dbh_in_range: 'DBH',
      crown_ft: 'CANOPY',
      location: 'SITE',
      health: 'CONDITION',
      updated: 'last_edited_date',
      height_ft_range: 'HEIGHT',
      note: 'COMMENTS'
    },
    opentrees_id: 'cape_coral_fl'
  },
  {
    country: 'United States',
    state: 'Florida',
    city: 'Cocoa',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=4c7cac91b4ba43f0b5ddd2fab60f96b3',
    download: {
      arcgis: 'https://services1.arcgis.com/Tex1uhbqnOZPx6qT/arcgis/rest/services/Cocoa_Tree_Inventory/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Florida',
    city: 'Coral Gables',
    designation: 'University of Miami',
    scope: 'Tree',
    notes: 'partial species',
    info: 'https://www.arcgis.com/home/item.html?id=e84fbc7a8a254b5a98bde4d57bcd682c',
    download: {
      arcgis: 'https://services1.arcgis.com/B4MnusZHL3vmqU3t/arcgis/rest/services/UM_Tree_Inventory_Master_Public_view/FeatureServer/0'
    },
    license: { id: 'ODbL-1.0' }
  },
  {
    country: 'United States',
    state: 'Florida',
    city: 'Crystal River',
    info: 'https://www.arcgis.com/home/item.html?id=a4a77e4ad2c34503b399a68d7be9c72b',
    download: {
      arcgis: 'https://services7.arcgis.com/eJ0sm7uXev5e57yW/arcgis/rest/services/TreeInventory/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Florida',
    city: 'Doral',
    scope: 'Tree: street',
    info: 'https://www.arcgis.com/home/item.html?id=d356e28579fa4af9a93f63973595d9df',
    download: {
      arcgis: 'https://services.arcgis.com/rMDYWPzHhH9byMxO/arcgis/rest/services/Street_Tree_Inventory_Phase_I___II_view/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Florida',
    city: 'Doral',
    scope: 'Tree: street',
    info: 'https://www.arcgis.com/home/item.html?id=5b9a8f09d1fc4e22a9948165b8a014ee',
    download: {
      arcgis: 'https://services.arcgis.com/rMDYWPzHhH9byMxO/arcgis/rest/services/Neat_Street_Miami_Grant_2021_view/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Florida',
    city: 'Doral',
    scope: 'Tree: street',
    info: 'https://www.arcgis.com/home/item.html?id=ffd6c12ac3ed4dac89502343e1f4dd29',
    download: {
      arcgis: 'https://utility.arcgis.com/usrsvcs/servers/ffd6c12ac3ed4dac89502343e1f4dd29/rest/services/PW/Tree_Inventory_PROD/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Florida',
    city: 'Doral',
    scope: 'Tree: street',
    info: 'https://www.arcgis.com/home/item.html?id=e8f989b4c2c04d56bae16c14040051ea',
    download: {
      arcgis: 'https://utility.arcgis.com/usrsvcs/servers/e8f989b4c2c04d56bae16c14040051ea/rest/services/PW/TreeInvPrivateNewDev2019/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Florida',
    city: 'Maitland',
    info: 'https://www.arcgis.com/home/item.html?id=5014e4adabae4765849f6facd2052403',
    download: {
      arcgis: 'https://services8.arcgis.com/q4Vpy7r3KXnWcTBW/arcgis/rest/services/Tree_Inventory_view/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Florida',
    city: 'Ocala',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=b13bf42597fb458aa0dc471c77c3d0f8',
    download: {
      arcgis: 'https://services1.arcgis.com/Xt7esznjGcR11P3w/arcgis/rest/services/CityTrees/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Florida',
    city: 'Saint Augustine',
    scope: 'Tree',
    info: 'https://hub.arcgis.com/datasets/STAUG::lincolnville-tree-inventory-2020-wfl1/about',
    download: {
      arcgis: 'https://services.arcgis.com/2HXAtOKdBRSMj8is/arcgis/rest/services/Lincolnville_Tree_Inventory_2020_WFL1/FeatureServer/0'
    },
    crosswalk: {
      updated: 'INSPECT_DT',
      note: 'NOTES',
      scientific: 'SPP',
      dbh_in_range: 'DBH'
    },
    opentrees_id: 'st_augustine_fl'
  },
  {
    country: 'United States',
    state: 'Florida',
    city: 'Sarasota',
    scope: 'Tree',
    info: 'https://data-sarasota.opendata.arcgis.com/datasets/sarasota::tree-inventory-view-only/about',
    download: {
      arcgis: 'https://services3.arcgis.com/AWDwYUpli8WqpWxQ/ArcGIS/rest/services/Tree_Inventory_View_Only/FeatureServer/0'
    },
    crosswalk: {
      scientific: 'Species',
      dbh_in: 'DBH_1_99_',
      height_ft: 'Height_1_1',
      health: 'Condition',
      owner: 'Ownership',
      note: 'Notes',
      updated: 'last_edited_date'
    },
    opentrees_id: 'sarasota_fl'
  },
  {
    country: 'United States',
    state: 'Florida',
    city: 'Tallahassee',
    scope: 'Tree',
    info: 'https://geodata-tlcgis.opendata.arcgis.com/datasets/tree-inventory-city-of-tallahassee/about',
    download: {
      arcgis: 'https://cotinter.leoncountyfl.gov/cotinter/rest/services/Vector/COT_Cityworks_Trees_D_SP/MapServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Florida',
    city: 'Tampa',
    scope: 'Tree',
    notes: 'unofficial',
    info: 'https://zenodo.org/records/6726506',
    download: 'https://zenodo.org/records/6726506/files/Tampa_Final_2022-06-18.csv',
    driver: 'CSV',
    geometry: { x: 'longitude_coordinate', y: 'latitude_coordinate' },
    license: { id: 'CC0-1.0' },
    terms: 'McCoy, D., Goulet-Scott, B., Meng, W., Atahan, B., Kiros, H., Nishino, M., & Kartesz, J. (2022). A dataset of 5 million city trees from 63 US cities: species, location, nativity status, health, and more. [Data set]. Zenodo. https://doi.org/10.5061/dryad.2jm63xsrf'
  },
  {
    country: 'United States',
    state: 'Florida',
    city: 'Weston',
    scope: 'Tree',
    info: 'https://datahub.westonfl.org/datasets/westonfl::tree-inventory-editing/about',
    download: {
      arcgis: 'https://portal.westonfl.org/arcgis/rest/services/ParksAndRecreation/Tree_Inventory/FeatureServer/0'
    },
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
    },
    opentrees_id: 'weston_fl'
  },
  {
    country: 'United States',
    state: 'Florida',
    city: 'Winter Haven',
    info: 'https://www.arcgis.com/home/item.html?id=6813da7f078d4c54a1c5aaf735dfde0b',
    download: {
      arcgis: 'https://services5.arcgis.com/XQuwwPae94LHONaL/arcgis/rest/services/WinterHaven_All/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Georgia',
    city: 'Athens',
    scope: 'Tree: notable',
    info: 'https://www.arcgis.com/home/item.html?id=2cd09a9415034aa6b8a7c2de9df0d891',
    download: {
      arcgis: 'https://services2.arcgis.com/xSEULKvB31odt3XQ/arcgis/rest/services/ACC_Protected_Trees_(viewable_only)/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Georgia',
    city: 'Atlanta',
    designation: 'downtown',
    scope: 'Tree',
    download: {
      arcgis: 'https://services6.arcgis.com/BZn8g8tzu5WfMokL/ArcGIS/rest/services/DTMP_Trees/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Georgia',
    city: 'Atlanta',
    designation: 'Georgia Institute of Technology',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=a1276a459e974175a323d9b599b06fe1',
    download: {
      arcgis: 'https://services5.arcgis.com/7WaXTZEsI88qiQGw/arcgis/rest/services/Tree_Inventory_View/FeatureServer/1'
    }
  },
  {
    country: 'United States',
    state: 'Georgia',
    city: 'Atlanta',
    designation: 'Trees Atlanta',
    scope: 'Plant',
    info: 'https://www.treesatlanta.org/resources/tree-inventory/',
    download: {
      arcgis: 'https://services6.arcgis.com/BZn8g8tzu5WfMokL/arcgis/rest/services/Trees_Atlanta_Plant_Inventory_Public_View/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Georgia',
    city: 'Atlanta',
    scope: 'Tree: notable',
    notes: 'overlaps Trees Atlanta',
    info: 'https://www.arcgis.com/home/item.html?id=55ad15c5561a45c2933886eb6aa2cb14',
    download: {
      arcgis: 'https://services6.arcgis.com/BZn8g8tzu5WfMokL/arcgis/rest/services/TreeChampionData_2019/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Georgia',
    city: 'Atlanta',
    scope: 'Tree',
    info: 'https://zenodo.org/records/6726506',
    download: 'https://zenodo.org/records/6726506/files/Atlanta_Final_2022-06-18.csv',
    driver: 'CSV',
    geometry: { x: 'longitude_coordinate', y: 'latitude_coordinate' },
    license: { id: 'CC0-1.0' },
    terms: 'McCoy, D., Goulet-Scott, B., Meng, W., Atahan, B., Kiros, H., Nishino, M., & Kartesz, J. (2022). A dataset of 5 million city trees from 63 US cities: species, location, nativity status, health, and more. [Data set]. Zenodo. https://doi.org/10.5061/dryad.2jm63xsrf'
  },
  {
    country: 'United States',
    state: 'Georgia',
    city: 'Decatur',
    scope: 'Tree: street',
    notes: 'overlaps Trees Atlanta',
    info: 'https://www.arcgis.com/home/item.html?id=5bfbd3da60684c6c8543d49a01b2920d',
    download: {
      arcgis: 'https://services.arcgis.com/36QtML6Mf01B1N0W/arcgis/rest/services/Street_Trees/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Georgia',
    city: 'Lawrenceville',
    designation: 'Gwinnett Technical College',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=0f1cfa9ced85446894cadd6582845f5d',
    download: {
      arcgis: 'https://services1.arcgis.com/H4McGmCGCZqItOHs/ArcGIS/rest/services/GTC_Tree_Inventory/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Hawaii',
    designation: 'Honolulu County',
    scope: 'Tree: street',
    info: 'https://koordinates.com/layer/98385-honolulu-hawaii-street-trees/',
    download: {
      manual: 'https://koordinates.com/layer/98385-honolulu-hawaii-street-trees/'
    },
    vfs: '/vsizip/',
    filename: 'honolulu-hawaii-street-trees.gdb'
  },
  {
    country: 'United States',
    state: 'Hawaii',
    designation: 'Honolulu County',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=2c573c2913434b6db62c75ceac32794b',
    download: {
      arcgis: 'https://services1.arcgis.com/gGHDlz6USftL5Pau/arcgis/rest/services/Tree_Inventory/FeatureServer/0'
    },
    license: { id: 'CC0-1.0' }
  },
  {
    country: 'United States',
    state: 'Hawaii',
    designation: 'Honolulu County',
    scope: 'Tree: notable',
    info: 'https://data.honolulu.gov/Recreation/Exceptional-Trees-On-Oahu/84fd-3fzf',
    download: 'https://data.honolulu.gov/api/views/84fd-3fzf/rows.csv',
    geometry: { x: 'Longitude', y: 'Latitude' },
    srs: 'EPSG:4326',
    license: { id: 'CC0-1.0' }
  },
  {
    country: 'United States',
    state: 'Hawaii',
    city: 'Honolulu',
    designation: 'Lyon Arboretum',
    scope: 'Tree: park',
    info: 'https://www.arcgis.com/home/item.html?id=4eddbf7eecd749cfa68de2a5401fa7d0',
    download: {
      arcgis: 'https://services1.arcgis.com/x4h61KaW16vFs7PM/arcgis/rest/services/Living_Collection_Accessions_Public_View_2/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Idaho',
    city: 'Boise',
    scope: 'Tree: street',
    info: 'https://www.arcgis.com/home/item.html?id=61e4dc96bc0745ecb42c3f3892728bd6',
    download: {
      arcgis: 'https://services1.arcgis.com/WHM6qC35aMtyAAlN/arcgis/rest/services/BPR_Park_And_Street_Trees/FeatureServer/1'
    }
  },
  {
    country: 'United States',
    state: 'Idaho',
    city: 'Boise',
    scope: 'Tree: park',
    info: 'https://www.arcgis.com/home/item.html?id=61e4dc96bc0745ecb42c3f3892728bd6',
    download: {
      arcgis: 'https://services1.arcgis.com/WHM6qC35aMtyAAlN/arcgis/rest/services/BPR_Park_And_Street_Trees/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Idaho',
    city: 'Moscow',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=822290a740304c50b3912af5ea0db500',
    download: {
      arcgis: 'https://services.arcgis.com/WLhB60Nqwp4NnHz3/arcgis/rest/services/Moscow_Trees/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Idaho',
    city: 'Post Falls',
    scope: 'Tree',
    notes: 'Downloaded from the ArcGIS Open Data portal',
    download: { checksum: '728d5d4eff85e12229b9873face8e4dd' },
    geometry: { x: 'x', y: 'y' },
    srs: 'EPSG:4326',
    codes: {
      site_typ: { P: 'planting site', T: 'tree', S: 'stump', R: 'removal site' }
    }
  },
  {
    country: 'United States',
    state: 'Illinois',
    designation: 'DuPage County',
    scope: 'Tree: park',
    notes: 'may overlap others | Public park trees inventoried by Graf Tree Care | Downloaded from the ArcGIS Open Data portal',
    download: { checksum: '02fa9409a62f4992954241fc71fa850c' },
    geometry: { x: 'x', y: 'y' },
    srs: 'EPSG:4326'
  },
  {
    country: 'United States',
    state: 'Illinois',
    city: 'Algonquin',
    scope: 'Tree',
    notes: 'Downloaded from the ArcGIS Open Data portal',
    download: { checksum: '85201642a1bad6cda1689b55b7edcbd1' },
    driver: 'CSV',
    geometry: { x: 'x', y: 'y' },
    srs: 'EPSG:4326'
  },
  {
    country: 'United States',
    state: 'Illinois',
    city: 'Berwyn',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=95d7aacaead94d2487313d3801ac5b97',
    download: {
      arcgis: 'https://services7.arcgis.com/DbKiZP6rBmETqLvl/arcgis/rest/services/City_of_Berwyn_Tree_Inventory/FeatureServer/1'
    }
  },
  {
    country: 'United States',
    state: 'Illinois',
    city: 'Champaign',
    scope: 'Tree',
    notes: 'geofenced (US)',
    info: 'https://gis-cityofchampaign.opendata.arcgis.com/datasets/city-owned-trees/about',
    download: {
      arcgis: 'https://gisportal.champaignil.gov/ms/rest/services/Open_Data/Open_Data/MapServer/22'
    },
    crosswalk: {
      ref: 'ID',
      scientific: 'SPP',
      common: 'COMMON',
      dbh_in: 'DBH',
      health: 'COND',
      updated: 'INSPECT_DT',
      note: 'NOTES',
      family: 'FAMILY'
    },
    fallingfruit_id: 350,
    opentrees_id: 'champaign_il'
  },
  {
    country: 'United States',
    state: 'Illinois',
    city: 'Chicago',
    designation: 'Chicago Park District',
    scope: 'Tree: park',
    download: { checksum: '21a7b9a20f2c528c48eb3f7662feda37' },
    geometry: { x: 'LONG', y: 'LAT' },
    srs: 'EPSG:4326'
  },
  {
    country: 'United States',
    state: 'Illinois',
    city: 'Evanston',
    scope: 'Tree',
    info: 'https://data.cityofevanston.org/Information-Technology-includes-maps-geospatial-da/Trees/5xaw-wg36',
    download: 'https://data.cityofevanston.org/api/geospatial/5xaw-wg36?method=export&format=geojson'
  },
  {
    country: 'United States',
    state: 'Illinois',
    city: 'Fox Lake',
    info: 'https://www.arcgis.com/home/item.html?id=a3af3acde5a94214bc48bf9708c27b49',
    download: {
      arcgis: 'https://services6.arcgis.com/MKJI1IzdI5RxIY6T/arcgis/rest/services/Full_Tree_Inventory/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Illinois',
    city: 'Galesburg',
    scope: 'Tree',
    info: 'https://data-galesburg.opendata.arcgis.com/datasets/galesburg-tree-inventory/about',
    download: {
      arcgis: 'https://services1.arcgis.com/T5ar9pn3YeFZ47Wh/arcgis/rest/services/Galesburg_Tree_Inventory_Public/FeatureServer/0'
    },
    terms: 'It is required that the City of Galesburg be cited in any products generated from this data set. Any changes made should be clearly described on any hard copy map or other documentation without implying that changes made were approved by the City of Galesburg.'
  },
  {
    country: 'United States',
    state: 'Illinois',
    city: 'Gurnee',
    scope: 'Tree: street',
    info: 'https://www.arcgis.com/home/item.html?id=da1342b999ba47aabc1268ca24a8c727',
    download: {
      arcgis: 'https://webmaps.gurnee.il.us/arcgis/rest/services/ParkwayTrees/MapServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Illinois',
    city: 'Lake Zurich',
    info: 'https://www.arcgis.com/home/item.html?id=69f3c8d98d6d451fbbe01976a8d28663',
    download: {
      arcgis: 'https://services8.arcgis.com/Xtf9vudSUg8Tu89i/arcgis/rest/services/Tree_Inventory/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Illinois',
    city: 'Macomb',
    designation: 'Western Illinois University',
    info: 'https://www.arcgis.com/home/item.html?id=3bc0c6de0ddc4f3e8a53efae9a62cd65',
    download: {
      arcgis: 'https://services9.arcgis.com/yKAN6qXNTxhi4ojw/arcgis/rest/services/Tree_Map/FeatureServer/2'
    }
  },
  {
    country: 'United States',
    state: 'Illinois',
    city: 'Macomb',
    info: 'https://www.arcgis.com/home/item.html?id=3bc0c6de0ddc4f3e8a53efae9a62cd65',
    download: {
      arcgis: 'https://services9.arcgis.com/yKAN6qXNTxhi4ojw/arcgis/rest/services/Tree_Map/FeatureServer/3'
    }
  },
  {
    country: 'United States',
    state: 'Illinois',
    city: 'Montgomery',
    scope: 'Tree',
    notes: 'Downloaded from the ArcGIS Open Data portal | Originally 14 separate CSV files with filenames like Blackberry_Crossing_Tree_Inventory.csv',
    download: { checksum: 'd90a5c4e94b47782ba17e89d84036eab' },
    geometry: { x: 'x', y: 'y' },
    srs: 'EPSG:4326'
  },
  {
    country: 'United States',
    state: 'Illinois',
    city: 'Naperville',
    scope: 'Tree',
    info: 'https://data.naperville.il.us/datasets/right-of-way-tree-inventory-1/about',
    download: 'https://www.arcgis.com/sharing/rest/content/items/a6865fd074b54a369ad79c87680af8a9/data',
    vfs: '/vsizip/',
    filename: 'row_tree_inventory.gdb',
    crosswalk: {
      common: 'ROWTREE_TYPE',
      ref: 'FACILITYID',
      health: 'CONDITION_CLASS',
      updated: 'DATE_CHANGED',
      planted: 'DatePlanted',
      dbh_in: 'EST_DBH',
      family: 'FAMILY',
      cultivar: 'CULTIVAR',
      genus: 'GENUS'
    },
    opentrees_id: 'naperville_il'
  },
  {
    country: 'United States',
    state: 'Illinois',
    city: "O'Fallon",
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=0d9714f08fec4eee8eb2258925986bb8',
    download: {
      arcgis: 'https://services.arcgis.com/K8hCj4l2z1EMabnx/arcgis/rest/services/CityTrees/FeatureServer/4'
    }
  },
  {
    country: 'United States',
    state: 'Illinois',
    city: "O'Fallon",
    scope: 'Tree',
    notes: 'partial species',
    info: 'https://www.arcgis.com/home/item.html?id=0d9714f08fec4eee8eb2258925986bb8',
    download: {
      arcgis: 'https://services.arcgis.com/K8hCj4l2z1EMabnx/arcgis/rest/services/CityTrees/FeatureServer/2'
    }
  },
  {
    country: 'United States',
    state: 'Illinois',
    city: 'Oak Park',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=402e05e1ced64931b8908178c095bd0f',
    download: {
      arcgis: 'https://services5.arcgis.com/aymthbPDQOcCnuwg/arcgis/rest/services/VOP_Trees_6_2_21_Viewing/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Illinois',
    city: 'Vernon Hills',
    scope: 'Tree',
    info: 'https://hub.arcgis.com/datasets/VernonHills::tree-inventory-view-only/about',
    download: {
      arcgis: 'https://services.arcgis.com/B6g1snvDJFY2QRqn/arcgis/rest/services/Tree_Inventory_(View_Only)/FeatureServer/0'
    },
    terms: 'All information contained herein may not be reproduced, sold, distributed or utilized in any form on other projects without the express written permission of the Village of Vernon Hills (VVH). Due to the unsecured nature of these documents/data (electronic media) and the inability of the originator to establish controls over the use thereof, VVH assumes no responsibility for any consequences arising out of the use of the data. It is the sole responsibility of the user to check the validity of all information contained herein. The user shall assume all risks and liabilities resulting from the use of this data.'
  },
  {
    country: 'United States',
    state: 'Indiana',
    designation: 'Indiana University',
    scope: 'Tree',
    download: {
      arcgis: 'https://services.arcgis.com/tKsJAIiLjd90D5q2/ArcGIS/rest/services/IUSystemTrees2022/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Indiana',
    city: 'Beech Grove',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=67db697b7e2f40c69be70999633fc43a',
    download: {
      arcgis: 'https://services.arcgis.com/tKsJAIiLjd90D5q2/arcgis/rest/services/Beech_Grove_Tree_Inventory/FeatureServer/0'
    },
    geometry: { x: 'LONGITUDE', y: 'LATITUDE' },
    srs: 'EPSG:4326'
  },
  {
    country: 'United States',
    state: 'Indiana',
    city: 'Bloomington | Indianapolis',
    scope: 'Tree',
    notes: 'aggregate (Bloomington, Indianapolis, suburbs)',
    info: 'https://www.arcgis.com/home/item.html?id=6aa1bfc6716f42d0b80ffdeab06e5bbf',
    download: {
      arcgis: 'https://services.arcgis.com/tKsJAIiLjd90D5q2/arcgis/rest/services/Bloomington_and_Indianapolis_Tree_Inventories/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Indiana',
    city: 'Evansville',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=a7a81e5bf27541598d63a4b0173d9e93',
    download: {
      arcgis: 'https://services.arcgis.com/tKsJAIiLjd90D5q2/arcgis/rest/services/Evansville_Tree_Inventory_2008/FeatureServer/0'
    },
    geometry: { x: 'LONGITUDE', y: 'LATITUDE' },
    srs: 'EPSG:4326'
  },
  {
    country: 'United States',
    state: 'Indiana',
    city: 'Goshen',
    scope: 'Tree',
    notes: 'Inventory of street and park trees conducted in 2008-2010 | Data was acquired from the City of Goshen by members of Transition Goshen (www.transitiongoshen.org)',
    download: { checksum: '35d9fec892d5e3d1286ee763e09eb00a' },
    vfs: '/vsizip/',
    fallingfruit_id: 225
  },
  {
    country: 'United States',
    state: 'Indiana',
    city: 'Muncie',
    designation: 'Bail State University',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=c39c206731334cce9cd6d8a46702936a',
    download: {
      arcgis: 'https://services5.arcgis.com/b8MX9QNvXdvWFdta/arcgis/rest/services/Tree_Inventory_Public_View/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Indiana',
    city: 'Muncie',
    scope: 'Tree',
    info: 'https://hub.arcgis.com/maps/DelCoGIS::muncie-tree-invenotry/about',
    download: {
      arcgis: 'https://services.arcgis.com/VyRjdyMziYNF5Bwe/arcgis/rest/services/MuncieTreeInventory2021_view/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Indiana',
    city: 'New Albany',
    info: 'https://www.arcgis.com/home/item.html?id=40199dc2c3fa4a129d5deade29b1ff71',
    download: {
      arcgis: 'https://services5.arcgis.com/fhY0REQd0M65vDjz/arcgis/rest/services/Trees/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Indiana',
    city: 'Richmond',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=7c918046813340989aa7e986abdd5b56',
    download: {
      arcgis: 'https://services3.arcgis.com/fhBemP00ea7p7i0U/arcgis/rest/services/Tree_Inventory_2022/FeatureServer/3'
    }
  },
  {
    country: 'United States',
    state: 'Indiana',
    city: 'West Lafayette',
    designation: "Indiana Veterans' Home Cemetery",
    scope: 'Tree: park',
    info: 'https://www.arcgis.com/home/item.html?id=b1687106bdae4b948017c3c110f04151',
    download: {
      arcgis: 'https://services.arcgis.com/ac326V3ZvsskLNKN/arcgis/rest/services/Saluting_Branches_Tree_Inventory_2022/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Indiana',
    city: 'Westfield',
    scope: 'Tree: park',
    notes: 'Downloaded from the ArcGIS Open Data portal',
    download: { checksum: '9dfa4eb55324a49e03e9cf356047da30' },
    geometry: { x: 'x', y: 'y' },
    srs: 'EPSG:4326'
  },
  {
    country: 'United States',
    state: 'Iowa',
    designation: 'Iowa Department of Natural Resources',
    notes: 'aggregate',
    info: 'https://www.arcgis.com/home/item.html?id=4ec3a4c5bdf5409c850813f096eeddd0',
    download: {
      arcgis: 'https://services2.arcgis.com/r6iFVcMJeA4kB4GC/arcgis/rest/services/TreeInventory20221118/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Iowa',
    city: 'Ames',
    scope: 'Tree',
    notes: 'FF: Request from Hector Arbuckle',
    download: {
      arcgis: 'https://gis.cityofames.org/arcgis/rest/services/ames_basemap_ALL_read_only_V2/MapServer/76'
    }
  },
  {
    country: 'United States',
    state: 'Iowa',
    city: 'Davenport',
    scope: 'Tree',
    info: 'https://davenportiowa.maps.arcgis.com/home/item.html?id=1e73252e386144799b39e95dbaa684ef',
    download: {
      arcgis: 'https://services.arcgis.com/Sf3rzzad9Dl4Cuf7/arcgis/rest/services/Trees_All/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Iowa',
    city: 'Des Moines',
    scope: 'Tree',
    notes: 'unofficial',
    info: 'https://zenodo.org/records/6726506',
    download: 'https://zenodo.org/records/6726506/files/DesMoines_Final_2022-06-18.csv',
    driver: 'CSV',
    geometry: { x: 'longitude_coordinate', y: 'latitude_coordinate' },
    license: { id: 'CC0-1.0' },
    terms: 'McCoy, D., Goulet-Scott, B., Meng, W., Atahan, B., Kiros, H., Nishino, M., & Kartesz, J. (2022). A dataset of 5 million city trees from 63 US cities: species, location, nativity status, health, and more. [Data set]. Zenodo. https://doi.org/10.5061/dryad.2jm63xsrf'
  },
  {
    country: 'United States',
    state: 'Iowa',
    city: 'Iowa City',
    designation: 'Chatham Oaks',
    info: 'https://www.arcgis.com/home/item.html?id=2642cb059ebe49bf915d3716cfe042e7',
    download: {
      arcgis: 'https://services6.arcgis.com/z18ulWf4F9mAUjih/arcgis/rest/services/Chatham_Tree_Inventory___StoryMap3_WFL1/FeatureServer/7'
    }
  },
  {
    country: 'United States',
    state: 'Iowa',
    city: 'Marion',
    info: 'https://www.arcgis.com/home/item.html?id=2001b90fbe1e4656929ed20da048393b',
    download: {
      arcgis: 'https://services2.arcgis.com/D5rqJ85qM97IJslY/arcgis/rest/services/Trees_view/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Kansas',
    city: 'Overland Park',
    scope: 'Tree',
    notes: 'unofficial',
    info: 'https://zenodo.org/records/6726506',
    download: 'https://zenodo.org/records/6726506/files/OverlandPark_Final_2022-06-18.csv',
    driver: 'CSV',
    geometry: { x: 'longitude_coordinate', y: 'latitude_coordinate' },
    license: { id: 'CC0-1.0' },
    terms: 'McCoy, D., Goulet-Scott, B., Meng, W., Atahan, B., Kiros, H., Nishino, M., & Kartesz, J. (2022). A dataset of 5 million city trees from 63 US cities: species, location, nativity status, health, and more. [Data set]. Zenodo. https://doi.org/10.5061/dryad.2jm63xsrf'
  },
  {
    country: 'United States',
    state: 'Kentucky',
    city: 'Lexington',
    designation: 'Waverly Park',
    info: 'https://www.arcgis.com/home/item.html?id=fbd085aa25244b118725e103e33b494e',
    download: {
      arcgis: 'https://services.arcgis.com/vQ8kO5zdqETeirEL/arcgis/rest/services/Waverly_Park_2022_Tree_Inventory_Map_WFL1/FeatureServer/1'
    }
  },
  {
    country: 'United States',
    state: 'Kentucky',
    city: 'Louisville',
    designation: 'TreesLouisville',
    info: 'https://www.arcgis.com/home/item.html?id=40dab7f3716f46d7a9c6616aa740d739',
    download: {
      arcgis: 'https://services9.arcgis.com/2WPY0g0NYKs6DzKS/ArcGIS/rest/services/TreesLouisville_Tree_Inventory_Public_View/FeatureServer/1'
    }
  },
  {
    country: 'United States',
    state: 'Kentucky',
    city: 'Louisville',
    inactive: true,
    notes: '2013 inventory of downtown trees',
    download: { checksum: '915762bd8890bef1d248d0fc053be994' },
    vfs: '/vsizip/'
  },
  {
    country: 'United States',
    state: 'Kentucky',
    city: 'Louisville',
    scope: 'Tree',
    notes: 'unofficial',
    info: 'https://zenodo.org/records/6726506',
    download: 'https://zenodo.org/records/6726506/files/Louisville_Final_2022-06-18.csv',
    driver: 'CSV',
    geometry: { x: 'longitude_coordinate', y: 'latitude_coordinate' },
    license: { id: 'CC0-1.0' },
    terms: 'McCoy, D., Goulet-Scott, B., Meng, W., Atahan, B., Kiros, H., Nishino, M., & Kartesz, J. (2022). A dataset of 5 million city trees from 63 US cities: species, location, nativity status, health, and more. [Data set]. Zenodo. https://doi.org/10.5061/dryad.2jm63xsrf'
  },
  {
    country: 'United States',
    state: 'Louisiana',
    city: 'Baton Rouge',
    designation: 'Louisiana State University',
    scope: 'Tree',
    notes: 'Downloaded from the ArcGIS Open Data portal',
    download: { checksum: 'ec27794bf8ddb30dfcee704f7036e4eb' },
    geometry: { x: 'x', y: 'y' },
    srs: 'EPSG:4326'
  },
  {
    country: 'United States',
    state: 'Louisiana',
    city: 'New Orleans',
    designation: 'Lafitte Corridor',
    scope: 'Tree: park',
    inactive: true,
    notes: 'Conducted in 2010 by the Friends of Lafitte Corridor | Downloaded as an Excel file',
    info: 'http://folc-nola.org/greenway/tree-inventory',
    download: { checksum: 'accd3a844675d1eb0f943ff16baf4f86' },
    geometry: { x: 'GPS Easting', y: 'GPS Northing' },
    srs: 'EPSG:4326',
    fallingfruit_id: 352
  },
  {
    country: 'United States',
    state: 'Louisiana',
    city: 'New Orleans',
    scope: 'Tree',
    info: 'https://data.nola.gov/Parks-Parkways/Tree-Locations/g94y-wr47',
    download: {
      arcgis: 'https://gis.nola.gov/arcgis/rest/services/Basemaps/TreeCanopy/MapServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Maine',
    city: 'Auburn',
    scope: 'Tree',
    info: 'https://accessauburn-auburnme.hub.arcgis.com/datasets/treeinventory/about',
    download: {
      arcgis: 'https://services1.arcgis.com/4nU7cbKqLfftauX2/arcgis/rest/services/TreeInventory/FeatureServer/0'
    },
    crosswalk: {
      ref: 'ID',
      common: 'COMMON',
      scientific: 'BOTANICAL',
      dbh_in: 'DBH',
      health: 'COND',
      note: 'NOTES'
    },
    opentrees_id: 'auburn_me'
  },
  {
    pending: 'address only (mostly)',
    country: 'United States',
    state: 'Maine',
    city: 'Bath',
    scope: 'Tree: street',
    info: 'https://www.uvm.edu/femc/data/archive/project/bath_maine_street_tree_inventory/dataset/bath-maine-street-tree-inventory-data',
    download: {
      manual: 'https://www.uvm.edu/femc/data/archive/project/bath_maine_street_tree_inventory/dataset/bath-maine-street-tree-inventory-data'
    },
    geometry: { x: 'Long', y: 'Lat' },
    srs: 'EPSG:4326',
    license: { id: 'CC0-1.0' }
  },
  {
    country: 'United States',
    state: 'Maine',
    city: 'Biddeford',
    designation: 'University of New England',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=9070805b76ed4636b340e8deffed9714',
    download: 'https://www.arcgis.com/sharing/rest/content/items/9070805b76ed4636b340e8deffed9714/data',
    api: 'arcgis-sharing',
    openFunc: file => helpers.openEsriFeatureCollectionWithGdal(file)
  },
  {
    country: 'United States',
    state: 'Maine',
    city: 'Orono',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=c9b5413f58fe4b2fbfc91b5444b02c34',
    download: {
      arcgis: 'https://services.arcgis.com/42HL8w3LvBbvPLB3/arcgis/rest/services/Urban_Tree_Inventory_Data_Public_view/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Maine',
    city: 'Portland',
    designation: 'University of New England – Westbrook',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=11ce16fa03e940879e411517f477cccb',
    download: 'https://www.arcgis.com/sharing/rest/content/items/11ce16fa03e940879e411517f477cccb/data',
    api: 'arcgis-sharing',
    openFunc: file => helpers.openEsriFeatureCollectionWithGdal(file)
  },
  {
    country: 'United States',
    state: 'Maine',
    city: 'Westbrook',
    scope: 'Tree',
    info: 'https://hub.arcgis.com/datasets/westbrookmaine::trees/about',
    download: {
      arcgis: 'https://services5.arcgis.com/Cxl8RQ4PEBjdRbtW/arcgis/rest/services/Street_Trees_/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Maryland',
    designation: 'Montgomery County',
    scope: 'Tree: planted',
    info: 'https://data.montgomerycountymd.gov/Environment/Tree-Planting-Locations/2gfx-khvb',
    download: 'https://data.montgomerycountymd.gov/api/geospatial/2gfx-khvb?method=export&format=geojson'
  },
  {
    country: 'United States',
    state: 'Maryland',
    city: 'Baltimore',
    designation: 'Morgan State University',
    info: 'https://www.arcgis.com/home/item.html?id=aa37523cca8a41f98e44a65cf9af7572',
    download: {
      arcgis: 'https://services3.arcgis.com/f6DdLR4lY5RnYDuG/arcgis/rest/services/Morgan_State_Campus_Trees_WFL4/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Maryland',
    city: 'Baltimore',
    scope: 'Tree',
    info: 'https://baltimore.maps.arcgis.com/home/item.html?id=34c3b08c17f04d828d3facb51c9195cf',
    download: {
      arcgis: 'https://services1.arcgis.com/UWYHeuuJISiGmgXx/arcgis/rest/services/Trees_12052017/FeatureServer/0'
    },
    crosswalk: {
      ref: 'UniqueID',
      scientific: 'SPP',
      genus: 'GENUS',
      common: 'COMMON',
      cultivar: 'CULTIVAR',
      dbh_in: 'DBH',
      height_ft: 'TREE_HT',
      stems: 'MULTI_STEM',
      health: x => x['CONDITION'].toLowerCase(),
      updated: x => new Date(x['INSPECT_DT']).toISOString().slice(0, 10)
    },
    opentrees_id: 'baltimore_md'
  },
  {
    country: 'United States',
    state: 'Maryland',
    city: 'Cambridge',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=caed0ffd3f874b6cbaf80208808c9748',
    download: {
      arcgis: 'https://services2.arcgis.com/AB4o41cT2GQ69z4k/arcgis/rest/services/Trees/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Maryland',
    city: 'College Park',
    designation: 'University of Maryland',
    scope: 'Plant',
    info: 'http://www.arcgis.com/home/item.html?id=01e461acc7c7435eaaf685887dc64a39',
    download: {
      arcgis: 'https://services1.arcgis.com/qTQ6qYkHpxlu0G82/arcgis/rest/services/UMD_Trees/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Massachusetts',
    city: 'Arlington',
    scope: 'Tree',
    notes: "FF: Request from deborah_fallingf@suberic.net: Mostly street trees, plenty of crabapples and some other edibles. Note that I think most of the pears are Bradfords, so you probably don't want to list them.",
    info: 'https://gis-arlingtonma.opendata.arcgis.com/datasets/4e6f2bc1691e405b93c2f7e85878be7f_0/about',
    download: {
      arcgis: 'https://services2.arcgis.com/s1Sh73K7qtP9JdrG/arcgis/rest/services/ArlingtonMA_Tree/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Massachusetts',
    city: 'Brighton',
    scope: 'Tree: street',
    info: 'https://www.uvm.edu/femc/data/archive/project/Brighton_massachusetts_street_tree_inventory/dataset/brighton-massachusetts-street-tree-inventory-data',
    download: {
      manual: 'https://www.uvm.edu/femc/data/archive/project/Brighton_massachusetts_street_tree_inventory/dataset/brighton-massachusetts-street-tree-inventory-data'
    },
    geometry: { x: 'x', y: 'y' },
    srs: 'EPSG:4326'
  },
  {
    country: 'United States',
    state: 'Massachusetts',
    city: 'Lowell',
    designation: 'University of Massachusetts',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=a430f7728aec4048bb0c3017dbcc218e',
    download: {
      arcgis: 'https://services7.arcgis.com/xVvSSLUlIfKXfbeq/arcgis/rest/services/UMass_Lowell_Trees_WFL1/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Massachusetts',
    city: 'Lowell',
    designation: 'University of Massachusetts',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=a430f7728aec4048bb0c3017dbcc218e',
    download: {
      arcgis: 'https://services7.arcgis.com/xVvSSLUlIfKXfbeq/arcgis/rest/services/UMass_Lowell_Trees_WFL1/FeatureServer/1'
    }
  },
  {
    country: 'United States',
    state: 'Massachusetts',
    city: 'Lowell',
    designation: 'University of Massachusetts',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=a430f7728aec4048bb0c3017dbcc218e',
    download: {
      arcgis: 'https://services7.arcgis.com/xVvSSLUlIfKXfbeq/arcgis/rest/services/UMass_Lowell_Trees_WFL1/FeatureServer/2'
    }
  },
  {
    country: 'United States',
    state: 'Massachusetts',
    city: 'New Bedford',
    info: 'https://www.arcgis.com/home/item.html?id=dbd2e5bec2b34fbbbd9ce41916143624',
    download: {
      arcgis: 'https://services.arcgis.com/3RiQsDoOeneF0Q0P/arcgis/rest/services/NewBedfordTreeInventory/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Massachusetts',
    city: 'Northampton',
    designation: 'Botanic Garden of Smith College',
    scope: 'Tree: park',
    info: 'https://www.arcgis.com/home/item.html?id=aa2c2a6e8fc7470c95f1c84ddc9d5bd5',
    download: {
      arcgis: 'https://services.arcgis.com/aMv9lrl6jFsuGNu8/arcgis/rest/services/ARBWoodyPlants_OCT2018/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Massachusetts',
    city: 'Quincy',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=2012ecdd85ca4410a131d92363b8f268',
    download: {
      arcgis: 'https://services2.arcgis.com/3zax1evKMkXchUjO/arcgis/rest/services/Join_Tree_Inventory_to_Inventory_Form/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Massachusetts',
    city: 'Wellesley',
    scope: 'Tree',
    info: 'https://hub.arcgis.com/datasets/4b5c6eed495141fd85e56e06c5521327_1/about',
    download: {
      arcgis: 'https://services6.arcgis.com/f6G5SbcwuEVmR1CW/arcgis/rest/services/OpenDataLayers2/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Massachussetts',
    city: 'Amherst',
    designation: 'University of Massachusetts',
    scope: 'Tree',
    download: {
      arcgis: 'https://maps.umass.edu/arcgis/rest/services/Campus/CampusLandscapeManagement/FeatureServer/0'
    },
    crosswalk: {
      ref: 'SiteId',
      genus: 'Genus',
      scientific: 'BotanicalName',
      common: 'CommonFullName',
      dbh_in: 'DbhInch',
      height_ft: 'HeightFt',
      stems: 'Trunks',
      crown_ft: 'SpreadFt',
      planted: x => x['DatePlanted'] || null,
      updated: x => helpers.reformatDatetime(
        x['DateModified'],
        [/^(?<month>[0-9]{2})\/(?<day>[0-9]{2})\/(?<year>[0-9]{4})$/]
      ),
      value: x => x['AppraisedValue'] || null
    },
    fallingfruit_id: 448,
    opentrees_id: 'umass_amherst'
  },
  {
    country: 'United States',
    state: 'Massachussetts',
    city: 'Amherst',
    scope: 'Tree',
    info: 'https://maps2-amherstma.opendata.arcgis.com/datasets/street-trees/about',
    download: {
      arcgis: 'http://gis.amherstma.gov/arcgis/rest/services/iOS/StreetTrees/FeatureServer/0'
    },
    crosswalk: {
      ref: 'TreeID',
      updated: 'LastEdit',
      common: 'Species',
      note: 'Notes'
    },
    license: { id: 'CC-BY-4.0' },
    fallingfruit_id: 76,
    opentrees_id: 'amherst'
  },
  {
    country: 'United States',
    state: 'Massachussetts',
    city: 'Boston',
    designation: 'Northeastern University',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=359dec81c4c84172b7a3d6f7711085f2',
    download: {
      arcgis: 'https://services.arcgis.com/VgmyyKiMPvUPgldo/arcgis/rest/services/Northeastern_Tree_Inventory_data/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Massachussetts',
    city: 'Brookline',
    scope: 'Tree',
    notes: 'geofenced (US)',
    info: 'https://hub.arcgis.com/datasets/4500c14f85d846d6924c7f8cb532763f_14/about',
    download: {
      arcgis: 'https://gisweb.brooklinema.gov/arcgis/rest/services/OpenDataPortal/OpenDataPortal/MapServer/14'
    }
  },
  {
    country: 'United States',
    state: 'Massachussetts',
    city: 'Cambridge',
    designation: 'Massachusetts Institute of Technology',
    scope: 'Tree',
    info: 'http://www.arcgis.com/home/item.html?id=20ac21f096904d098dc24403b85f8f5d',
    download: {
      arcgis: 'https://services.arcgis.com/VgmyyKiMPvUPgldo/arcgis/rest/services/MIT_TREES/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Massachussetts',
    city: 'Cambridge',
    scope: 'Tree',
    info: 'https://www.cambridgema.gov/GIS/gisdatadictionary/Environmental/ENVIRONMENTAL_StreetTrees',
    download: 'https://gis.cambridgema.gov/download/gdb/ENVIRONMENTAL_StreetTrees.gdb.zip',
    vfs: '/vsizip/',
    delFunc: x => x['SiteType'] !== 'Tree',
    crosswalk: {
      common: 'CommonName',
      scientific: 'Scientific',
      ref: 'TreeID',
      dbh_in: 'diameter',
      updated: 'modified',
      planted: 'PlantDate',
      stems: 'trunks',
      notable: x => ({ 'Y': 'memorial' })[x['MemTree']],
      location: 'Location',
      owner: 'Ownership',
      health: x => String(x.TreeCondit).replace(/ \(.*/, '')
    },
    opentrees_id: 'cambridge'
  },
  {
    country: 'United States',
    state: 'Massachussetts',
    city: 'Dedham',
    scope: 'Tree',
    info: 'https://dedham.maps.arcgis.com/home/item.html?id=71f15db592974cd58c0bf042ff36e58f',
    download: {
      arcgis: 'https://services1.arcgis.com/me41C4ZTLmDO2rPK/arcgis/rest/services/TreeInventory/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Massachussetts',
    city: 'Greenfield',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=116f6f34fd30422c97c7a15d2d5af604',
    download: {
      arcgis: 'https://services1.arcgis.com/DdXlpq5ZPlhI0Mb0/arcgis/rest/services/GTC_Tree_Inventory_10132021/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Massachussetts',
    city: 'Holyoke',
    scope: 'Tree',
    info: 'http://www.arcgis.com/home/item.html?id=5a8ef076bc7b470f8419fd39b93b6653',
    download: {
      arcgis: 'https://services1.arcgis.com/yzNawWwHQXYQkxUq/arcgis/rest/services/treesholyoke/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Massachussetts',
    city: 'Longmeadow',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=202e5932c7d544288e2970b9f321948e',
    download: {
      arcgis: 'https://services8.arcgis.com/N4Zyuaihnt51kZnl/arcgis/rest/services/Tree_Inv_noedit/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Massachussetts',
    city: 'Newton',
    designation: 'Boston College',
    scope: 'Tree',
    notes: 'Code definitions in ir-tree-inventory-codebook.pdf, ir-tree-inventory-genus.txt, ir-tree-inventory-species.txt',
    info: 'https://dataverse.harvard.edu/dataset.xhtml?persistentId=doi:10.7910/DVN/IBSB2R',
    download: {
      manual: 'https://dataverse.harvard.edu/dataset.xhtml?persistentId=doi:10.7910/DVN/IBSB2R'
    },
    vfs: '/vsizip/',
    license: { id: 'CC-BY-NC-4.0' }
  },
  {
    country: 'United States',
    state: 'Massachussetts',
    city: 'Salem',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=df1d66111f2d481db82564d5b820dee0',
    download: {
      arcgis: 'https://services9.arcgis.com/nPsFhwkdebYjxn1R/arcgis/rest/services/Salem_Street_Trees/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Massachussetts',
    city: 'Somerville',
    info: 'https://www.arcgis.com/home/item.html?id=4e33d47547e840fa9d459b275a367366',
    download: {
      arcgis: 'https://services1.arcgis.com/qN3V93cYGMKQCOxL/arcgis/rest/services/Somerville_Tree_Inventory_as_of_03_05_23/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Michigan',
    city: 'Adrian',
    scope: 'Tree',
    notes: 'Downloaded from the ArcGIS Open Data portal',
    download: { checksum: '31c5f2f5d8b86ab8c2b9c977fd7d36e4' },
    geometry: { x: 'x', y: 'y' },
    srs: 'EPSG:4326'
  },
  {
    country: 'United States',
    state: 'Michigan',
    city: 'Ann Arbor',
    designation: 'Matthaei Botanical Gardens & Nichols Arboretum',
    scope: 'Tree',
    info: 'https://mbgna-umich.opendata.arcgis.com/datasets/nichols-arboretum-inventory-survey/about',
    download: {
      arcgis: 'https://services1.arcgis.com/4ezfu5dIwH83BUNL/arcgis/rest/services/ARB_VEG_DaveyTree_pt/FeatureServer/0'
    },
    crosswalk: {
      common: 'COMMON',
      scientific: 'BOTANICAL',
      infraspecies: 'CULTIVAR',
      dbh_in: 'DBH',
      health: 'COND',
      note: 'NOTES',
      updated: 'DATE'
    },
    opentrees_id: 'nichols_arboretum'
  },
  {
    country: 'United States',
    state: 'Michigan',
    city: 'Ann Arbor',
    scope: 'Tree',
    info: 'https://www.a2gov.org/services/data/Pages/default.aspx',
    download: 'https://data.a2gov.org/feeds/GIS/Trees/A2Trees.zip',
    vfs: '/vsizip/',
    fallingfruit_id: 77
  },
  {
    country: 'United States',
    state: 'Michigan',
    city: 'Boyne City',
    designation: 'Camp Michigania',
    scope: 'Tree',
    inactive: true,
    notes: 'Downloaded from the ArcGIS Open Data portal',
    download: { checksum: '461dfd5f2d2089353c41346a70fca93d' },
    geometry: { x: 'x', y: 'y' },
    srs: 'EPSG:4326'
  },
  {
    country: 'United States',
    state: 'Michigan',
    city: 'Detroit',
    designation: 'Belle Isle Park',
    scope: 'Tree: park',
    info: 'https://www.arcgis.com/home/item.html?id=ef39ea325a304f61a3e737e52168397a',
    download: {
      arcgis: 'https://services3.arcgis.com/f8FBNX4bfDyc804R/arcgis/rest/services/BelleIsle_Presentation/FeatureServer/12'
    }
  },
  {
    country: 'United States',
    state: 'Michigan',
    city: 'Detroit',
    designation: 'Wayne State University',
    info: 'https://www.arcgis.com/home/item.html?id=c2050bc88c3548c382c94a388b8c1ba5',
    download: {
      arcgis: 'https://services1.arcgis.com/xQo6zoNjmy3NNfkT/arcgis/rest/services/TreesOct2022/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Michigan',
    city: 'Detroit',
    scope: 'Tree',
    notes: 'unofficial',
    info: 'https://zenodo.org/records/6726506',
    download: 'https://zenodo.org/records/6726506/files/Detroit_Final_2022-06-18.csv',
    driver: 'CSV',
    geometry: { x: 'longitude_coordinate', y: 'latitude_coordinate' },
    license: { id: 'CC0-1.0' },
    terms: 'McCoy, D., Goulet-Scott, B., Meng, W., Atahan, B., Kiros, H., Nishino, M., & Kartesz, J. (2022). A dataset of 5 million city trees from 63 US cities: species, location, nativity status, health, and more. [Data set]. Zenodo. https://doi.org/10.5061/dryad.2jm63xsrf'
  },
  {
    country: 'United States',
    state: 'Michigan',
    city: 'Grand Rapids',
    designation: 'Calvin University',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=6c6ae604ca8d42d981db9de2296a30e6',
    download: {
      arcgis: 'https://services2.arcgis.com/DBcRJmfPI2l07jMS/ArcGIS/rest/services/Calvin_Tree_Inventory_2011/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Michigan',
    city: 'Grand Rapids',
    designation: 'Calvin University',
    scope: 'Tree: park',
    download: {
      arcgis: 'https://services2.arcgis.com/DBcRJmfPI2l07jMS/ArcGIS/rest/services/CalvinCampusArboretum_WFL1/FeatureServer/7'
    }
  },
  {
    country: 'United States',
    state: 'Michigan',
    city: 'Grand Rapids',
    designation: 'Downtown',
    info: 'https://www.arcgis.com/home/item.html?id=a27647fc806e4fb7813d1df1a6f0b7af',
    download: {
      arcgis: 'https://services2.arcgis.com/L81TiOwAPO1ZvU9b/arcgis/rest/services/Inventory_Snapshot/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Michigan',
    city: 'Grand Rapids',
    notes: 'overlaps Grand Rapids (downtown)',
    info: 'https://www.arcgis.com/home/item.html?id=8dd6632e710243d4b3620f2304e8e409',
    download: {
      arcgis: 'https://services2.arcgis.com/L81TiOwAPO1ZvU9b/arcgis/rest/services/P2StreetTrees/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Minnesota',
    designation: 'Three Rivers Park District',
    scope: 'Tree',
    info: 'https://gis.threeriversparks.org/datasets/trpd::managed-trees-comprehensive-open-data/about?layer=0',
    download: {
      arcgis: 'https://gis.trpdmn.org/hostserver/rest/services/ManagedTrees_Public_Viewing/FeatureServer/0'
    },
    crosswalk: {
      common: 'CommonName',
      scientific: 'ScientificName',
      planted: 'YearPlanted',
      ref: 'CartedID'
    },
    opentrees_id: 'three_rivers'
  },
  {
    country: 'United States',
    state: 'Minnesota',
    designation: 'Washington County',
    scope: 'Tree: park',
    info: 'https://hub.arcgis.com/datasets/WCMN::tree-inventory/about',
    download: {
      arcgis: 'https://services1.arcgis.com/3fjYPqJf7qalQMlb/ArcGIS/rest/services/Tree_Inventory/FeatureServer/0'
    },
    crosswalk: {
      common: 'Tree_Type',
      health: 'Health',
      note: 'Comments',
      ref: 'OBJECTID'
    },
    opentrees_id: 'washington_me'
  },
  {
    country: 'United States',
    state: 'Minnesota',
    city: 'Columbia Heights',
    info: 'https://www.arcgis.com/home/item.html?id=11f0bf7c460546819eb4468bc78196f6',
    download: {
      arcgis: 'https://services2.arcgis.com/jukipzcNaiQXqMc8/arcgis/rest/services/CH_trees/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Minnesota',
    city: 'Duluth',
    designation: 'Brighton Beach',
    scope: 'Tree: notable',
    info: 'https://www.arcgis.com/home/item.html?id=b67194947e0a4cbd90dc5dcbc1771356',
    download: {
      arcgis: 'https://services5.arcgis.com/tDXj154iVHABwGu6/arcgis/rest/services/TKDA_Brighton_Beach_Tree_Preservation_Inventory/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Minnesota',
    city: 'Faribault',
    scope: 'Tree',
    notes: 'partial',
    info: 'https://www.arcgis.com/home/item.html?id=38c8cd4a302d43c69853a7756e9ce432',
    download: {
      arcgis: 'https://services3.arcgis.com/0kRsKvAEycihgDRG/arcgis/rest/services/COF_Tree_Inventory/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Minnesota',
    city: 'Maple Grove',
    scope: 'Tree',
    info: 'https://hub.arcgis.com/datasets/maplegrovemn::public-trees/about',
    download: {
      arcgis: 'https://services2.arcgis.com/UkDoq2fZJIfKR4NN/arcgis/rest/services/EAB_StoryMap_trees/FeatureServer/1'
    }
  },
  {
    country: 'United States',
    state: 'Minnesota',
    city: 'Minneapolis',
    designation: 'Holmes Park',
    scope: 'Tree: park',
    inactive: true,
    notes: 'Downloaded from the ArcGIS Open Data portal',
    download: { checksum: '84649d26c3c63852ba1610be42d066be' },
    geometry: { x: 'x', y: 'y' },
    srs: 'EPSG:4326'
  },
  {
    country: 'United States',
    state: 'Minnesota',
    city: 'Minneapolis',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=ab795a832412417288dd0925e7caf950',
    download: 'https://www.arcgis.com/sharing/rest/content/items/ab795a832412417288dd0925e7caf950/data',
    api: 'arcgis-sharing',
    vfs: '/vsizip/',
    fallingfruit_id: 84
  },
  {
    country: 'United States',
    state: 'Minnesota',
    city: 'Minneapolis',
    scope: 'Tree: park',
    info: 'https://services.arcgis.com/afSMGVsC7QlRK1kZ/ArcGIS/rest/services/msvcMPRB_ParkTrees_PROD/FeatureServer',
    download: {
      arcgis: 'https://services.arcgis.com/afSMGVsC7QlRK1kZ/ArcGIS/rest/services/msvcMPRB_ParkTrees_PROD/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Minnesota',
    city: 'Minneapolis',
    scope: 'Tree: park',
    info: 'https://services.arcgis.com/afSMGVsC7QlRK1kZ/ArcGIS/rest/services/msvcMPRB_ParkTrees_PROD/FeatureServer',
    download: {
      arcgis: 'https://services.arcgis.com/afSMGVsC7QlRK1kZ/ArcGIS/rest/services/msvcMPRB_ParkTrees_PROD/FeatureServer/1'
    }
  },
  {
    country: 'United States',
    state: 'Minnesota',
    city: 'Minneapolis',
    scope: 'Tree: park',
    info: 'https://services.arcgis.com/afSMGVsC7QlRK1kZ/ArcGIS/rest/services/msvcMPRB_ParkTrees_PROD/FeatureServer',
    download: {
      arcgis: 'https://services.arcgis.com/afSMGVsC7QlRK1kZ/ArcGIS/rest/services/msvcMPRB_ParkTrees_PROD/FeatureServer/2'
    }
  },
  {
    country: 'United States',
    state: 'Minnesota',
    city: 'Minneapolis',
    scope: 'Tree: park',
    info: 'https://services.arcgis.com/afSMGVsC7QlRK1kZ/ArcGIS/rest/services/msvcMPRB_ParkTrees_PROD/FeatureServer',
    download: {
      arcgis: 'https://services.arcgis.com/afSMGVsC7QlRK1kZ/ArcGIS/rest/services/msvcMPRB_ParkTrees_PROD/FeatureServer/3'
    }
  },
  {
    country: 'United States',
    state: 'Minnesota',
    city: 'Minneapolis',
    scope: 'Tree: park',
    info: 'https://services.arcgis.com/afSMGVsC7QlRK1kZ/ArcGIS/rest/services/msvcMPRB_ParkTrees_PROD/FeatureServer',
    download: {
      arcgis: 'https://services.arcgis.com/afSMGVsC7QlRK1kZ/ArcGIS/rest/services/msvcMPRB_ParkTrees_PROD/FeatureServer/4'
    }
  },
  {
    country: 'United States',
    state: 'Minnesota',
    city: 'Minneapolis',
    scope: 'Tree: park',
    info: 'https://services.arcgis.com/afSMGVsC7QlRK1kZ/ArcGIS/rest/services/msvcMPRB_ParkTrees_PROD/FeatureServer',
    download: {
      arcgis: 'https://services.arcgis.com/afSMGVsC7QlRK1kZ/ArcGIS/rest/services/msvcMPRB_ParkTrees_PROD/FeatureServer/5'
    }
  },
  {
    country: 'United States',
    state: 'Minnesota',
    city: 'Saint Louis Park',
    designation: 'Victoria Ponds',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=2c0a2d3e3ae64a37b1eb3ef8148feb20',
    download: 'https://www.arcgis.com/sharing/rest/content/items/2c0a2d3e3ae64a37b1eb3ef8148feb20/data',
    api: 'arcgis-sharing',
    vfs: '/vsizip/',
    fallingfruit_id: 82
  },
  {
    country: 'United States',
    state: 'Minnesota',
    city: 'Winona',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=830945236a3f4ce4a11b54ce5cc9ca73',
    download: {
      arcgis: 'https://services.arcgis.com/n4v88Dv33V9Mhi0b/arcgis/rest/services/WinonaCity_TreeInventory/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Minnesota',
    city: 'Woodbury',
    designation: 'Heritage Glenn',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=c3da562461d8455dbe60c664aa5e7528',
    download: 'https://www.arcgis.com/sharing/rest/content/items/c3da562461d8455dbe60c664aa5e7528/data',
    api: 'arcgis-sharing',
    openFunc: file => helpers.openEsriFeatureCollectionWithGdal(file)
  },
  {
    country: 'United States',
    state: 'Minnesota',
    city: 'Woodbury',
    scope: 'Tree',
    inactive: true,
    notes: 'Downloaded from the ArcGIS Open Data portal',
    download: { checksum: '707f3ce53269e3f4418db31c10ffe365' },
    geometry: { x: 'x', y: 'y' },
    srs: 'EPSG:4326'
  },
  {
    country: 'United States',
    state: 'Mississippi',
    city: 'Aberdeen',
    designation: 'Thomas G. Aberbethy Federal Building',
    scope: 'Tree: park',
    info: 'https://www.arcgis.com/home/item.html?id=2f4520876f3d4db4ab612094c2092832',
    download: {
      arcgis: 'https://services3.arcgis.com/MQyvf2CpDJ4b9IjQ/arcgis/rest/services/Aberdeen_tree_Invenory/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Mississippi',
    city: 'Biloxi',
    designation: 'Keesler Air Force Base',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=029fa217b2a740f3bcb34d091ef00c8d',
    download: {
      arcgis: 'https://services7.arcgis.com/salQweOw5doOMYRw/arcgis/rest/services/Keesler_Tree_Inventory_11_30/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Mississippi',
    city: 'Booneville',
    designation: 'Northeast Mississippi Community College',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=5b278fa79f1e428894f8e8a5534bc0ce',
    download: {
      arcgis: 'https://services7.arcgis.com/salQweOw5doOMYRw/arcgis/rest/services/Northeast_Mississippi_Community_College/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Mississippi',
    city: 'Corinth',
    designation: 'Corinth National Cemetery',
    scope: 'Tree: park',
    info: 'https://www.arcgis.com/home/item.html?id=1057b138b3404c37844593b91860e9c4',
    download: {
      arcgis: 'https://services7.arcgis.com/salQweOw5doOMYRw/arcgis/rest/services/Corinth_National_Cemetery/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Mississippi',
    city: 'Ellisville',
    designation: 'Jones County Junior College',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=9681439eb0334ed8985e4efc54b1c601',
    download: {
      arcgis: 'https://services7.arcgis.com/salQweOw5doOMYRw/arcgis/rest/services/Jones_College_Tree_Inventory_Map/FeatureServer/2'
    }
  },
  {
    country: 'United States',
    state: 'Mississippi',
    city: 'Gulf Park',
    designation: 'University of Southern Mississippi',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=c5f5c2c91b7d4b3aa60bff7de28e80a9',
    download: {
      arcgis: 'https://services7.arcgis.com/salQweOw5doOMYRw/arcgis/rest/services/Coastal_info_test/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Mississippi',
    city: 'Gulfport',
    designation: 'Courhouse',
    scope: 'Tree: park',
    info: 'https://www.arcgis.com/home/item.html?id=2ec1461c402b4b7bac7847c31e86a4cf',
    download: {
      arcgis: 'https://services3.arcgis.com/MQyvf2CpDJ4b9IjQ/arcgis/rest/services/Gulfport_tree_Invenory/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Mississippi',
    city: 'Jackson',
    designation: 'downtown',
    scope: 'Tree: street',
    info: 'https://www.arcgis.com/home/item.html?id=f267a1530ef540d0bcae2b29c36ed7de',
    download: {
      arcgis: 'https://services7.arcgis.com/salQweOw5doOMYRw/arcgis/rest/services/jackson/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Mississippi',
    city: 'Jackson',
    designation: 'Tougaloo College',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=5f92b6a865ed45f88f619fcc781a76ba',
    download: {
      arcgis: 'https://services7.arcgis.com/salQweOw5doOMYRw/arcgis/rest/services/Tougaloo_Tree_Inventory/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Mississippi',
    city: 'Jackson',
    designation: 'West Street Park',
    scope: 'Tree: park',
    info: 'https://www.arcgis.com/home/item.html?id=e18b4ecc30b84eb29c8bc81d2ae75de9',
    download: {
      arcgis: 'https://services7.arcgis.com/salQweOw5doOMYRw/arcgis/rest/services/Smith_Park_Tree_Inventory/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Mississippi',
    city: 'New Albany',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=f69af871fd3445298fdefead75c5e698',
    download: 'https://www.arcgis.com/sharing/rest/content/items/f69af871fd3445298fdefead75c5e698/data',
    api: 'arcgis-sharing',
    openFunc: file => helpers.openEsriFeatureCollectionWithGdal(file)
  },
  {
    country: 'United States',
    state: 'Mississippi',
    city: 'Oxford',
    designation: 'US District Court',
    scope: 'Tree: park',
    info: 'https://www.arcgis.com/home/item.html?id=ed230a3998e24fd8bdcd6cd18457a20f',
    download: {
      arcgis: 'https://services3.arcgis.com/MQyvf2CpDJ4b9IjQ/arcgis/rest/services/Oxford_Tree_Inventory/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Mississippi',
    city: 'Picayune',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=6e7139da4ab94e7c866dc9ca39ef22f7',
    download: {
      arcgis: 'https://services7.arcgis.com/salQweOw5doOMYRw/arcgis/rest/services/Picayune_WFL1/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Mississippi',
    city: 'Ridgeland',
    designation: 'The Township at Colony Park',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=10af3986ae3b4c3fbf22c365b6cd1c43',
    download: {
      arcgis: 'https://services7.arcgis.com/salQweOw5doOMYRw/arcgis/rest/services/Township_Tree_Inventory/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Mississippi',
    city: 'Starkville',
    designation: 'Mississippi State University',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=fcd422dd1e424eee855d23e74b991616',
    download: {
      arcgis: 'https://services7.arcgis.com/salQweOw5doOMYRw/arcgis/rest/services/MSU_Trees_9154_WFL1/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Missouri',
    city: 'Cape Girardeau',
    designation: 'Capaha Park',
    scope: 'Tree: park',
    info: 'http://www.arcgis.com/home/item.html?id=584a4dd55a2a47ca812ad015cdc46ee8',
    download: 'https://www.arcgis.com/sharing/rest/content/items/584a4dd55a2a47ca812ad015cdc46ee8/data',
    api: 'arcgis-sharing',
    openFunc: file => helpers.openEsriFeatureCollectionWithGdal(file)
  },
  {
    country: 'United States',
    state: 'Missouri',
    city: 'Kansas City',
    designation: 'Roanoke Park',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=439da5b131684fcaaacf16344f53a654',
    download: 'https://www.arcgis.com/sharing/rest/content/items/439da5b131684fcaaacf16344f53a654/data',
    api: 'arcgis-sharing',
    openFunc: file => {
      const layerNames = [
        'Non-Native_4135',
        'Other Missouri Native_2553',
        'Other Kansas City Native_6602',
        'Ash_5018',
        'Maples_7404',
        'Oak & Hickories_6829',
        'Invasive_3176',
        'Common Species_4817',
        'Dominant Species - Hackberry_1239'
      ]
      const files = layerNames.map(name =>
        helpers.readEsriFeatureCollectionToVsimem(file, {layerName: name})
      )
      return helpers.openFileUnionWithGdal(files)
    }
  },
  {
    country: 'United States',
    state: 'Missouri',
    city: 'Liberty',
    info: 'https://www.arcgis.com/home/item.html?id=760f142c03024edba74d7b36bf4b075e',
    download: {
      arcgis: 'https://services.arcgis.com/70vcD5tpfNSJmyxA/arcgis/rest/services/TreeInventory/FeatureServer/0'
    },
    terms: 'For Informational Use Only.'
  },
  {
    country: 'United States',
    state: 'Missouri',
    city: 'Maplewood',
    scope: 'Tree',
    inactive: true,
    notes: 'Downloaded from the ArcGIS Open Data portal',
    download: { checksum: '5437bdba21c90a3f08e90b477f35854f' },
    geometry: { x: 'x', y: 'y' },
    srs: 'EPSG:4326'
  },
  {
    country: 'United States',
    state: 'Missouri',
    city: 'Raymore',
    scope: 'Tree: street',
    notes: '(almost) no species',
    info: 'https://www.arcgis.com/home/item.html?id=b26753cfdc974de09a1c716cdbe6d072',
    download: {
      arcgis: 'https://services5.arcgis.com/Xl0cAd6WMhA7fHTz/arcgis/rest/services/Trees/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Missouri',
    city: 'Saint Louis',
    designation: 'Forest Park',
    scope: 'Tree: park',
    info: 'https://www.stlouis-mo.gov/data/datasets/dataset.cfm?id=123',
    download: {
      arcgis: 'https://maps6.stlouis-mo.gov/arcgis/rest/services/FORESTRY/FORESTRY_TREES/MapServer/4'
    }
  },
  {
    country: 'United States',
    state: 'Missouri',
    city: 'Saint Louis',
    designation: 'Tower Grove Park',
    scope: 'Tree: park',
    info: 'https://www.arcgis.com/home/item.html?id=39de9f08df9a48b08996fc2e2e4e380a',
    download: {
      arcgis: 'https://services3.arcgis.com/WtyxQzC8Vs4vzwRJ/arcgis/rest/services/Tribute_Tree_Inventory_1_02_View/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Missouri',
    city: 'Saint Louis',
    scope: 'Tree: street',
    info: 'https://www.stlouis-mo.gov/data/datasets/dataset.cfm?id=121',
    download: {
      arcgis: 'https://maps6.stlouis-mo.gov/arcgis/rest/services/FORESTRY/FORESTRY_TREES/MapServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Missouri',
    city: 'Saint Louis',
    scope: 'Tree: park',
    info: 'https://www.arcgis.com/home/item.html?id=fb6f7b406f5241dcbcc915e4d5c484b4',
    download: {
      arcgis: 'https://services2.arcgis.com/w657bnjzrjguNyOy/arcgis/rest/services/STLCO_Tree_Inventory/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Missouri',
    city: 'Sedalia',
    scope: 'Tree',
    inactive: true,
    notes: 'Downloaded from the ArcGIS Open Data portal',
    download: { checksum: '969041323ad930a4966f4a20f851de31' },
    geometry: { x: 'x', y: 'y' },
    srs: 'EPSG:4326'
  },
  {
    country: 'United States',
    state: 'Missouri',
    city: 'Springfield',
    scope: 'Tree',
    info: 'https://gisdata-cosmo.opendata.arcgis.com/datasets/tree-inventory/about',
    download: {
      arcgis: 'https://maps.springfieldmo.gov/arcgis/rest/services/Maps/OpenData/MapServer/34'
    },
    crosswalk: {
      health: 'Condition',
      common: 'TreeType',
      scientific: 'SciName',
      height_ft_range: 'Height',
      dbh_in: 'Diameter',
      crown_ft_range: 'Spread'
    },
    terms: 'http://www.springfieldmo.gov/disclaimer',
    opentrees_id: 'springfield_mo'
  },
  {
    country: 'United States',
    state: 'Montana',
    city: 'Bozeman',
    designation: 'Montana State University',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=35834988444b401b88a602019c4d3568',
    download: {
      arcgis: 'https://services.arcgis.com/9ecg2KpMLcsUv1Oh/arcgis/rest/services/Public_Arborist_16/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Montana',
    city: 'Bozeman',
    scope: 'Tree',
    notes: 'geofenced (US)',
    info: 'http://public-bozeman.opendata.arcgis.com/datasets/trees/about',
    download: {
      arcgis: 'https://gisweb.bozeman.net/arcgis/rest/services/Internal/Forestry_Dashboard/MapServer/0'
    },
    crosswalk: {
      genus: 'Genus',
      species: 'Species',
      cultivar: 'Cultivar',
      dbh_in: 'DBH',
      health: 'Condition',
      updated: 'last_edited_date',
      common: 'Common_Name',
      ref: 'FacilityID'
    },
    opentrees_id: 'bozeman_mt'
  },
  {
    country: 'United States',
    state: 'Montana',
    city: 'Cut Bank',
    scope: 'Tree',
    info: 'http://www.arcgis.com/home/item.html?id=0d417a228ec14edb92c345800b24a213',
    download: 'https://www.arcgis.com/sharing/rest/content/items/0d417a228ec14edb92c345800b24a213/data',
    api: 'arcgis-sharing',
    openFunc: file => helpers.openEsriFeatureCollectionWithGdal(
      // title: Cut Bank, MT Urban Trees
      file, {layerName: 'cfe505fd-5ff9-4355-882d-4c2025936066'}
    )
  },
  {
    country: 'United States',
    state: 'Montana',
    city: 'Livingston',
    scope: 'Tree',
    info: 'http://www.arcgis.com/home/item.html?id=b0714e69cb28482f8c1dc8ecc933f0bb',
    download: 'https://www.arcgis.com/sharing/rest/content/items/b0714e69cb28482f8c1dc8ecc933f0bb/data',
    api: 'arcgis-sharing',
    openFunc: file => {
      const layerNames = [
        // title: Trees 1 of 3
        'd1148cdb-9e97-4f75-966f-4921230c482e',
        // title: Trees 2 of 3
        '34b2610b-0337-415d-89c5-ad38d1678b55',
        // title: Trees Part 3 of 3
        '75de8f8e-ed5b-4aa1-b166-2210b9c52aaf'
      ]
      const files = layerNames.map(name =>
        helpers.readEsriFeatureCollectionToVsimem(file, {layerName: name})
      )
      return helpers.openFileUnionWithGdal(files)
    }
  },
  {
    country: 'United States',
    state: 'Montana',
    city: 'Missoula',
    designation: 'University of Montana',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=4218561196a64a1e91e906b152f2eb4d',
    download: {
      arcgis: 'https://services2.arcgis.com/3FyEz1ZRTg2oyrLc/arcgis/rest/services/Montana_Arboretum_Trees_and_Species/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Nebraska',
    city: 'Omaha',
    scope: 'Tree',
    info: 'https://data-dogis.opendata.arcgis.com/datasets/dogis::omaha-trees/about',
    download: {
      arcgis: 'https://gis.dogis.org/arcgis/rest/services/OpenData_Parks/MapServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Nevada',
    designation: 'Clark County',
    scope: 'Tree: park',
    info: 'https://koordinates.com/layer/97392-clark-county-nv-trees/',
    download: {
      arcgis: 'http://gisgate.co.clark.nv.us/arcgis/rest/services/RPM/DisplayTrees/MapServer/1'
    }
  },
  {
    country: 'United States',
    state: 'Nevada',
    designation: 'Clark County',
    scope: 'Tree: notable',
    download: {
      arcgis: 'http://gisgate.co.clark.nv.us/arcgis/rest/services/RPM/DisplayTrees/MapServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Nevada',
    city: 'Las Vegas',
    scope: 'Tree: park',
    info: 'https://mapdata.lasvegasnevada.gov/clvgis/rest/services/ExistingInfrastructure/Park_Features/MapServer/12',
    download: {
      arcgis: 'https://mapdata.lasvegasnevada.gov/clvgis/rest/services/ExistingInfrastructure/Park_Features/MapServer/12'
    },
    srs: 'EPSG:3421',
    crosswalk: {
      location: 'LOC_TYPE',
      scientific: 'BOTANICAL',
      common: 'COMMON',
      stems: 'STEMS',
      dbh_in_range: 'DBH',
      crown_ft_range: 'WIDTH',
      height_ft_range: 'HEIGHT',
      health: 'COND',
      note: 'NOTES'
    },
    opentrees_id: 'las_vegas'
  },
  {
    country: 'United States',
    state: 'Nevada',
    city: 'Sparks',
    scope: 'Tree',
    inactive: true,
    notes: "Downloaded from the ArcGIS Open Data portal | Originally downloaded as two CSV files named 'Tree Inventory PHASE1.csv' and 'Tree Inventory PHASE2.csv' which were then merged",
    download: { checksum: '57e37af7b958ea561892e1d78b372048' },
    geometry: { x: 'x', y: 'y' },
    srs: 'EPSG:4326'
  },
  {
    country: 'United States',
    state: 'New Hampshire',
    city: 'Manchester',
    designation: 'City of Manchester Parks and Recreation',
    scope: 'Tree: park',
    info: 'https://www.arcgis.com/home/item.html?id=880d1fd2f9404a0381814565f5ee4cd7',
    download: {
      arcgis: 'https://maps.kimley-horn.com/server/rest/services/Hosted/Manchester_Trees_2022/FeatureServer/0'
    },
    driver: 'ESRIJSON'
  },
  {
    country: 'United States',
    state: 'New Jersey',
    designation: 'DuPage County Forest Preserve',
    scope: 'Tree: park',
    notes: 'FF: Careful adding these to Falling Fruit, since foraging may not be permitted',
    info: 'https://www.arcgis.com/home/item.html?id=f2317e931a0f4c4fada8e2ec7acc95fe',
    download: {
      arcgis: 'https://services5.arcgis.com/fui97fnwp2uOvw2J/arcgis/rest/services/DedicationBenchTree/FeatureServer/2'
    }
  },
  {
    country: 'United States',
    state: 'New Jersey',
    city: 'Franklin Lakes',
    designation: 'Indian Trail Club',
    scope: 'Tree',
    notes: 'private land',
    info: 'https://www.arcgis.com/home/item.html?id=6aaaf154ac2a45b1bb6fe98d542f0413',
    download: {
      arcgis: 'https://services.arcgis.com/VgmyyKiMPvUPgldo/arcgis/rest/services/Indian_Trail_Club_FINAL/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'New Jersey',
    city: 'Hoboken',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=5e72becb5432489ea2c7cca4ee40f6ad',
    download: {
      arcgis: 'https://services8.arcgis.com/LDmC4ZVHdfKcEzxl/arcgis/rest/services/Tree_Inventory_/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'New Jersey',
    city: 'Holmdel',
    designation: 'Holmdel Park',
    scope: 'Tree: park',
    info: 'https://www.arcgis.com/home/item.html?id=0ca08dac87de47898ab9c60f2610c601',
    download: {
      arcgis: 'https://services2.arcgis.com/XGVCSkDqMwLJeGIy/arcgis/rest/services/MCPS_Holmdel_Tree_Inventory_Public_Layer/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'New Jersey',
    city: 'Jersey City',
    scope: 'Tree',
    info: 'https://data.jerseycitynj.gov/explore/dataset/2021-tree-inventory/information/',
    download: 'https://data.jerseycitynj.gov/api/explore/v2.1/catalog/datasets/2021-tree-inventory/exports/geojson'
  },
  {
    country: 'United States',
    state: 'New Jersey',
    city: 'Montclair',
    scope: 'Tree',
    notes: 'partial',
    info: 'https://www.arcgis.com/home/item.html?id=3a43e803d6824cdcb9dc8e40d85bf4e5',
    download: {
      arcgis: 'https://services9.arcgis.com/QHXEWAb0pE2rvfbb/arcgis/rest/services/Montclair_tree_inventory_Merged/FeatureServer/3'
    }
  },
  {
    country: 'United States',
    state: 'New Jersey',
    city: 'Princeton',
    designation: 'Marquand Park',
    scope: 'Tree: park',
    info: 'http://www.arcgis.com/home/item.html?id=e73e07ceb45c4d399e7793d44e1b8d34',
    download: 'https://www.arcgis.com/sharing/rest/content/items/e73e07ceb45c4d399e7793d44e1b8d34/data',
    api: 'arcgis-sharing',
    openFunc: file => helpers.openEsriFeatureCollectionWithGdal(
      // title: Marquand Inventory
      file, {layerName: 'Marquand Park 5_30_9033'}
    )
  },
  {
    country: 'United States',
    state: 'New Mexico',
    city: 'Albuquerque',
    scope: 'Tree',
    notes: 'unofficial',
    info: 'https://zenodo.org/records/6726506',
    download: 'https://zenodo.org/records/6726506/files/Albuquerque_Final_2022-06-18.csv',
    driver: 'CSV',
    geometry: { x: 'longitude_coordinate', y: 'latitude_coordinate' },
    license: { id: 'CC0-1.0' },
    terms: 'McCoy, D., Goulet-Scott, B., Meng, W., Atahan, B., Kiros, H., Nishino, M., & Kartesz, J. (2022). A dataset of 5 million city trees from 63 US cities: species, location, nativity status, health, and more. [Data set]. Zenodo. https://doi.org/10.5061/dryad.2jm63xsrf'
  },
  {
    country: 'United States',
    state: 'New York',
    designation: 'Warren County',
    scope: 'Tree: notable',
    info: 'https://warrencountyny.maps.arcgis.com/home/item.html?id=0139135162e54e2f86d31ce4f5a53d64',
    download: {
      arcgis: 'https://services6.arcgis.com/Fg3XpDIUTR3JZZES/arcgis/rest/services/Remarkable_Trees/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'New York',
    city: 'Arlington',
    designation: 'Vassar College',
    scope: 'Tree',
    info: 'http://www.arcgis.com/home/item.html?id=85e12b5272ab4c2b9f0aab66e16a784c',
    download: {
      arcgis: 'https://services.arcgis.com/VgmyyKiMPvUPgldo/arcgis/rest/services/2014_Vassar_Tree_Inventory_and_Risk_Assessment/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'New York',
    city: 'Athens',
    scope: 'Tree',
    notes: 'unofficial',
    info: 'https://www.arcgis.com/home/item.html?id=b4b1220ca86549e5916fdd09dee9778c',
    download: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTUm-buwH_9HhTdfrMVKf4grYI06wI-km1ALCW4gGn6U6TvWezao7hqshOKoz-yjoswhxWyNHKDB4ji/pub?output=csv',
    geometry: { x: 'Lon', y: 'Lat' },
    srs: 'EPSG:4326'
  },
  {
    country: 'United States',
    state: 'New York',
    city: 'Beacon',
    scope: 'Tree',
    info: 'http://www.arcgis.com/home/item.html?id=1a6676f11e91488eb81b3de240525ea6',
    download: {
      arcgis: 'https://services1.arcgis.com/0Lw2m57KEotYYFaA/arcgis/rest/services/Q_All_Trees/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'New York',
    city: 'Bedford | Katonah | Bedford Hills',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=c4a4fc47dbf640b99d77b1a3df923439',
    download: {
      arcgis: 'https://services9.arcgis.com/knuEiqG2RpapGunj/arcgis/rest/services/Bedford_Tree_Inventory/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'New York',
    city: 'Briarcliff Manor',
    designation: 'YSG Solar',
    info: 'https://www.arcgis.com/home/item.html?id=f1d2f8bef88b4b1bada76aa67b47cc8a',
    download: {
      arcgis: 'https://services.arcgis.com/VgmyyKiMPvUPgldo/arcgis/rest/services/YSG_Solar_Tree_Inventory/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'New York',
    city: 'Buffalo',
    scope: 'Tree: street',
    notes: 'GeoJSON export yields a broken file',
    info: 'https://data.buffalony.gov/Quality-of-Life/Tree-Inventory/n4ni-uuec',
    download: 'https://data.buffalony.gov/api/views/n4ni-uuec/rows.csv',
    driver: 'CSV',
    geometry: { x: 'Longitude', y: 'Latitude' },
    srs: 'EPSG:4326',
    crosswalk: {
      scientific: 'Botanical Name',
      common: 'Common Name',
      dbh_in: 'DBH',
      ref: 'Site ID'
    },
    license: {
      name: 'United States Public Domain',
      url: 'https://resources.data.gov/open-licenses/'
    },
    opentrees_id: 'buffalo-ny'
  },
  {
    country: 'United States',
    state: 'New York',
    city: 'Cayuga Heights',
    scope: 'Tree',
    info: 'https://cugir.library.cornell.edu/catalog/cugir-009097',
    download: 'https://cugir-data.s3.amazonaws.com/00/90/97/cugir-009097.zip',
    vfs: '/vsizip/',
    filename: 'cugir-009097/cayuga_heights_trees_2019.shp',
    fallingfruit_id: 85
  },
  {
    country: 'United States',
    state: 'New York',
    city: 'Geneva',
    designation: 'Hobart and William Smith Colleges',
    info: 'https://www.arcgis.com/home/item.html?id=056466623ac840fd946a41549466f4c1',
    download: {
      arcgis: 'https://services.arcgis.com/gAAqLWNS2IKt1zU1/arcgis/rest/services/HWS_Tree_Inventory/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'New York',
    city: 'Glens Falls',
    scope: 'Tree',
    inactive: true,
    notes: 'Downloaded as a KMZ file and converted to a clean CSV file | An intial inventory was collected by biology students at the Glens Falls High School in the fall of 2006. The remainder of the trees along with attributes were recorded in fall 2008',
    info: 'http://warrencountyny.gov/gis/TreeInventory.html',
    download: { checksum: '7b86c2acd2a4576260ecd42bc5754688' },
    geometry: { x: 'Longitude', y: 'Latitude' },
    srs: 'EPSG:4326',
    fallingfruit_id: 74
  },
  {
    country: 'United States',
    state: 'New York',
    city: 'Ithaca',
    designation: 'Cornell University',
    scope: 'Tree',
    info: 'https://cugir.library.cornell.edu/catalog/cugir-009100',
    download: 'https://cugir-data.s3.amazonaws.com/00/91/00/cugir-009100.zip',
    vfs: '/vsizip/',
    filename: 'cugir-009100/CornellTree2019.shp',
    crosswalk: {
      scientific: 'Botanic',
      common: 'Common',
      dbh_in: 'DBH',
      note: 'Comment',
      updated: 'SurveyDate'
    },
    fallingfruit_id: 87,
    opentrees_id: 'cornell'
  },
  {
    country: 'United States',
    state: 'New York',
    city: 'Ithaca',
    scope: 'Tree',
    info: 'https://hub.arcgis.com/datasets/881adbbd08bb408cbd33c1567886edae_0/about',
    download: {
      arcgis: 'https://services5.arcgis.com/R1JbITZvSQHJsl5r/arcgis/rest/services/City_Managed_Trees/FeatureServer/0'
    },
    terms: 'The following statement must be included with any products that use or are derived from this data set: "Data contained in this product was originally produced by the GIS Program, City of Ithaca, NY. The originator does not warrant the accuracy or completeness of the information portrayed by the data."'
  },
  {
    country: 'United States',
    state: 'New York',
    city: 'New York',
    designation: 'Brooklyn Bridge Park',
    scope: 'Tree: park',
    notes: "Jordan Engel (jordanengel1@gmail.com): The Brooklyn Bridge Park inventory isn't currently online anywhere. We've been using Cartegraph to create the inventory - the full export is attached. The author is Brooklyn Bridge Park, and there's no official license. | Data was provided by Jordan Engel and exported from the park's tree database",
    download: { checksum: 'af27828a280b2679a8f04f4892a38bdf' },
    geometry: { x: 'field_6', y: 'field_7' },
    srs: 'EPSG:4326'
  },
  {
    country: 'United States',
    state: 'New York',
    city: 'New York',
    designation: 'Hudson River Park',
    scope: 'Tree',
    inactive: true,
    info: 'https://hub.arcgis.com/datasets/SustainableMSU::tree/about',
    download: 'https://opendata.arcgis.com/datasets/51b5e5da030f4331af48cb052f2d2d5e_1.csv',
    api: 'arcgis-opendata',
    geometry: { x: 'X', y: 'Y' },
    srs: 'EPSG:4326',
    crosswalk: {
      scientific: 'Species_Latin_Name',
      common: 'Species_Common_Name',
      height_ft: 'Height',
      dbh_in: 'DBH',
      structure: 'Structural_Value',
      ref: 'HRPT_Numbering_1'
    },
    opentrees_id: 'hudson_river_park'
  },
  {
    country: 'United States',
    state: 'New York',
    city: 'New York',
    designation: 'Roosevelt Island',
    scope: 'Tree',
    inactive: true,
    notes: 'Downloaded from the ArcGIS Open Data portal',
    info: 'https://www.arcgis.com/home/item.html?id=1052e8157ab9444ba76c35a98705f791',
    download: { checksum: 'c84bbb582c5993c0221f606e5ee70911' },
    geometry: { x: 'x', y: 'y' },
    srs: 'EPSG:4326'
  },
  {
    country: 'United States',
    state: 'New York',
    city: 'New York',
    scope: 'Tree: street',
    info: 'https://data.cityofnewyork.us/Environment/2015-Street-Tree-Census-Tree-Data/uvpi-gqnh',
    download: 'https://data.cityofnewyork.us/api/views/uvpi-gqnh/rows.csv',
    geometry: { x: 'longitude', y: 'latitude' },
    srs: 'EPSG:4326',
    delFunc: x => x['status'] === 'Stump',
    crosswalk: {
      ref: 'tree_id',
      dbh_in: 'tree_dbh',
      scientific: 'spc_latin',
      common: 'spc_common',
      health: x => x['status'] === 'Dead' ? x['health'] : 'dead'
    },
    fallingfruit_id: 90,
    opentrees_id: 'nyc'
  },
  {
    country: 'United States',
    state: 'New York',
    city: 'New York',
    scope: 'Tree',
    info: 'https://data.cityofnewyork.us/Environment/Forestry-Tree-Points/hn5i-inap',
    download: 'https://data.cityofnewyork.us/api/views/hn5i-inap/rows.csv',
    geometry: { wkt: 'Geometry' },
    srs: 'EPSG:4326',
    opentrees_id: 'nyc'
  },
  {
    pending: 'address only',
    country: 'United States',
    state: 'New York',
    city: 'Newburgh',
    scope: 'Tree: street',
    info: 'https://www.uvm.edu/femc/data/archive/project/Newburgh_new_york_street_tree_inventory/dataset/newburgh-new-york-street-tree-inventory',
    download: {
      manual: 'https://www.uvm.edu/femc/data/archive/project/Newburgh_new_york_street_tree_inventory/dataset/newburgh-new-york-street-tree-inventory'
    },
    license: { id: 'CC0-1.0' }
  },
  {
    country: 'United States',
    state: 'New York',
    city: 'Pawling',
    info: 'https://www.arcgis.com/home/item.html?id=a09c6cf25f74490584a131f39cbe1e81',
    download: {
      arcgis: 'https://services.arcgis.com/VgmyyKiMPvUPgldo/arcgis/rest/services/Pawling_Tree_Inventory_data_7_30_21/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'New York',
    city: 'Poughkeepsie',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=5c7e99b9cae146779d062e44cdbd913e',
    download: {
      arcgis: 'https://services2.arcgis.com/HXuDXoXgsUiaeXTG/arcgis/rest/services/Street_Tree_Inventory_2019_(View_Layer)/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'New York',
    city: 'Queens',
    designation: "Saint John's University",
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=538edc6155e942a5afbde86fb819a648',
    download: {
      arcgis: 'https://services1.arcgis.com/pzqYKKGextsqxzkb/arcgis/rest/services/TreeInventory_May2017/FeatureServer/0'
    },
    terms: 'For educational purposes only.'
  },
  {
    country: 'United States',
    state: 'New York',
    city: 'Rochester',
    designation: 'University of Rochester',
    info: 'https://www.arcgis.com/home/item.html?id=ef55c22bb36b4588a86203637470ee28',
    download: {
      arcgis: 'https://services3.arcgis.com/Ue34o2qxc9h430hV/arcgis/rest/services/UR_Trees_View_Only/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'New York',
    city: 'Rochester',
    scope: 'Tree',
    info: 'https://data.cityofrochester.gov/datasets/RochesterNY::trees-open-data-live/about',
    download: {
      arcgis: 'https://maps.cityofrochester.gov/server/rest/services/Open_Data/Trees_Open_Data/FeatureServer/0'
    },
    crosswalk: {
      description: 'TREE_NAME',
      health: 'COND',
      dbh_in: x => String(x.DBH).replace('"', ''),
      ref: 'TREE_NUMBE',
      note: 'NOTES'
    },
    terms: 'https://data.cityofrochester.gov/pages/terms',
    opentrees_id: 'rochester'
  },
  {
    country: 'United States',
    state: 'New York',
    city: 'Rome',
    designation: 'Griffiss Air Force Base',
    scope: 'Tree: park',
    info: 'https://data.gis.ny.gov/datasets/sharegisny::tree-data-2019/about',
    download: {
      arcgis: 'https://services6.arcgis.com/EbVsqZ18sv1kVJ3k/ArcGIS/rest/services/MVCC_Tree_Data/FeatureServer/1'
    }
  },
  {
    country: 'United States',
    state: 'New York',
    city: 'Syracuse',
    scope: 'Tree: street',
    info: 'https://www.uvm.edu/femc/data/archive/project/syracuse_new_york_street_tree_inventories/dataset/syracuse-new-york-street-tree-inventory',
    download: {
      manual: 'https://www.uvm.edu/femc/data/archive/project/syracuse_new_york_street_tree_inventories/dataset/syracuse-new-york-street-tree-inventory'
    },
    geometry: { x: 'Longitude', y: 'Latitude' },
    srs: 'EPSG:4326',
    license: { id: 'CC0-1.0' }
  },
  {
    country: 'United States',
    state: 'New York',
    city: 'Tonawanda',
    scope: 'Tree',
    download: {
      arcgis: 'https://gis1.tonawanda.ny.us/arcgis/rest/services/FacilitiesStreets/TonawandaTrees_FeatureService/MapServer/0'
    }
  },
  {
    country: 'United States',
    state: 'New York',
    city: 'Utica',
    designation: 'T.R. Proctor Park | F. T. Proctor Park',
    scope: 'Tree: park',
    info: 'https://data.gis.ny.gov/datasets/sharegisny::tree-data-2020/about',
    download: {
      arcgis: 'https://services6.arcgis.com/EbVsqZ18sv1kVJ3k/ArcGIS/rest/services/MVCC_Tree_Data/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'New York',
    city: 'Utica',
    scope: 'Tree: park',
    info: 'https://data.gis.ny.gov/datasets/sharegisny::tree-data-2018/about',
    download: {
      arcgis: 'https://services6.arcgis.com/EbVsqZ18sv1kVJ3k/ArcGIS/rest/services/MVCC_Tree_Data/FeatureServer/2'
    }
  },
  {
    country: 'United States',
    state: 'New York',
    city: 'Watertown',
    scope: 'Tree: street',
    info: 'https://www.uvm.edu/femc/data/archive/project/watertown_new_york_street_tree_inventory/dataset/watertown-new-york-street-tree-inventory-1',
    download: {
      manual: 'https://www.uvm.edu/femc/data/archive/project/watertown_new_york_street_tree_inventory/dataset/watertown-new-york-street-tree-inventory-1'
    },
    geometry: { x: 'Longitude', y: 'Latitude' },
    srs: 'EPSG:4326',
    license: { id: 'CC0-1.0' }
  },
  {
    omit: 'Coded species with unknown meaning',
    pending: 'Multiple layers with tree data',
    country: 'United States',
    state: 'New York',
    city: 'Westfield',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=ca3b9384a0844c3b99cda76f89536897',
    download: 'https://www.arcgis.com/sharing/rest/content/items/ca3b9384a0844c3b99cda76f89536897/data',
    api: 'arcgis-sharing',
    vfs: '/vsizip/',
    filename: '74ed1c47-ae63-475b-8dd4-76bc682d1449.gdb'
  },
  {
    pending: 'address only',
    country: 'United States',
    state: 'New York',
    city: 'Williamsville',
    scope: 'Tree: street',
    info: 'https://www.uvm.edu/femc/data/archive/project/williamsville_new_york_street_tree_inventory/dataset/williamsville-new-york-street-tree-inventory',
    download: {
      manual: 'https://www.uvm.edu/femc/data/archive/project/williamsville_new_york_street_tree_inventory/dataset/williamsville-new-york-street-tree-inventory'
    },
    license: { id: 'CC0-1.0' }
  },
  {
    country: 'United States',
    state: 'North Carolina',
    city: 'Asheville',
    designation: 'Crowfields',
    info: 'https://www.arcgis.com/home/item.html?id=599f365dc9634225a0c38c60f9650cc9',
    download: {
      arcgis: 'https://services1.arcgis.com/PwLrOgCfU0cYShcG/arcgis/rest/services/Tree_Inventory/FeatureServer/11'
    }
  },
  {
    country: 'United States',
    state: 'North Carolina',
    city: 'Asheville',
    scope: 'Tree',
    inactive: true,
    info: 'http://ashevilletreemap.org',
    download: { manual: 'http://ashevilletreemap.org' },
    vfs: '/vsizip/',
    fallingfruit_id: 349
  },
  {
    country: 'United States',
    state: 'North Carolina',
    city: 'Cary',
    scope: 'Tree',
    info: 'https://data.townofcary.org/explore/dataset/cary-trees/information/',
    download: 'https://data.townofcary.org/api/explore/v2.1/catalog/datasets/cary-trees/exports/geojson',
    crosswalk: { updated: 'editdate', common: 'name', description: 'description' },
    license: { id: 'ODbL-1.0' },
    opentrees_id: 'cary'
  },
  {
    country: 'United States',
    state: 'North Carolina',
    city: 'Chapel Hill',
    designation: 'University of North Carolina',
    scope: 'Tree',
    info: 'https://gisdata-uncadmin.opendata.arcgis.com/datasets/0643ac24fa324cf4a6c97d5c1e0d4c49_1/about',
    download: {
      arcgis: 'https://gismaps.unc.edu/arcgis/rest/services/UNCOpenData/UNCOpenData/FeatureServer/1'
    }
  },
  {
    country: 'United States',
    state: 'North Carolina',
    city: 'Charlotte',
    designation: 'Bartlett Tree Research Laboratories',
    info: 'https://www.arcgis.com/home/item.html?id=69d2858822f74c4e8fad23d619b96b66',
    download: {
      arcgis: 'https://services9.arcgis.com/6LNM62YYwpEJPKbo/arcgis/rest/services/BTRL_Trees/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'North Carolina',
    city: 'Charlotte',
    scope: 'Tree',
    info: 'https://koordinates.com/layer/96938-charlotte-nc-greenways-trees/',
    download: {
      manual: 'https://koordinates.com/layer/96938-charlotte-nc-greenways-trees/'
    },
    vfs: '/vsizip/',
    filename: 'charlotte-nc-greenways-trees.gdb'
  },
  {
    country: 'United States',
    state: 'North Carolina',
    city: 'Durham',
    scope: 'Tree',
    notes: 'geofenced (US)',
    info: 'https://live-durhamnc.opendata.arcgis.com/datasets/DurhamNC::trees-planting-sites/about',
    download: {
      arcgis: 'https://webgis2.durhamnc.gov/server/rest/services/PublicServices/Environmental/FeatureServer/11'
    }
  },
  {
    country: 'United States',
    state: 'North Carolina',
    city: 'Fayetteville',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=23a36cf936d2451a9ed40e82238e14d0',
    download: {
      arcgis: 'https://services.arcgis.com/j3zNT485kmwrBtMJ/arcgis/rest/services/Tree_Inventory_Phase_1/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'North Carolina',
    city: 'Fayetteville',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=a03ecf29baf44e83ad2903c2069ec91e',
    download: {
      arcgis: 'https://services.arcgis.com/j3zNT485kmwrBtMJ/arcgis/rest/services/Tree_Inventory_Phase_2/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'North Carolina',
    city: 'Fayetteville',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=34c5a2f97b4f4e948459390d5c2cbd7e',
    download: {
      arcgis: 'https://services.arcgis.com/j3zNT485kmwrBtMJ/arcgis/rest/services/Phase3_trees_2017/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'North Carolina',
    city: 'Fayetteville',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=b093800e97f040139e828d729201e2f8',
    download: {
      arcgis: 'https://services.arcgis.com/j3zNT485kmwrBtMJ/arcgis/rest/services/Tree_Survey_2020/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'North Carolina',
    city: 'Greensboro',
    designation: 'Green Hill Cemetery',
    scope: 'Plant',
    info: 'https://www.arcgis.com/home/item.html?id=938ca2f492434c42b64e05df1eaea634',
    download: {
      arcgis: 'https://services1.arcgis.com/A7KFW0gHh8qBaXk3/arcgis/rest/services/GreenHillCemeteryTreeInventory_gdb/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'North Carolina',
    city: 'Greensboro',
    scope: 'Tree',
    info: 'http://www.arcgis.com/home/item.html?id=5b43f5c835bc472e993321d47526aefb',
    download: {
      arcgis: 'https://gis.greensboro-nc.gov/arcgis/rest/services/Planning/TreeInventory_CollegeHill_Dunleath_MS/MapServer/0'
    }
  },
  {
    country: 'United States',
    state: 'North Carolina',
    city: 'Raleigh',
    scope: 'Trees',
    info: 'https://data-ral.opendata.arcgis.com/datasets/ral::raleigh-street-and-park-trees/about',
    download: {
      arcgis: 'https://services.arcgis.com/v400IkDOw1ad7Yad/arcgis/rest/services/PRCR_Urban_Forestry_Trees_Open_Data/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'North Carolina',
    city: 'Salisbury',
    scope: 'Tree',
    info: 'http://www.arcgis.com/home/item.html?id=9521dbe887db4617ad62d6e098b1a9d7',
    download: {
      arcgis: 'https://services.arcgis.com/FKrJWv8CWiYT6Rsn/arcgis/rest/services/Tree_Inventory/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'North Carolina',
    city: 'Wake Forest',
    scope: 'Tree',
    info: 'http://data2-wakeforestnc.opendata.arcgis.com/datasets/trees/about',
    download: {
      arcgis: 'https://services1.arcgis.com/gqTCvanrwF2z2HEu/arcgis/rest/services/Trees/FeatureServer/0'
    },
    crosswalk: {
      scientific: 'SPECIES_LA',
      common: 'SPECIES_CO',
      health: 'STATUS'
    },
    opentrees_id: 'wake_forest'
  },
  {
    country: 'United States',
    state: 'North Carolina',
    city: 'Wilmington',
    scope: 'Tree: notable',
    info: 'https://wilmingtonnc.hub.arcgis.com/datasets/wilmingtonnc::heritage-trees/about',
    download: {
      arcgis: 'https://services1.arcgis.com/GwaLJVJq0Y6voqEc/arcgis/rest/services/Heritage_Trees/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Ohio',
    city: 'Athens',
    designation: 'Ohio University',
    scope: 'Tree: notable',
    info: 'https://www.arcgis.com/home/item.html?id=ff1d92d407ae41e3a62107be6f830c7f',
    download: {
      arcgis: 'https://services6.arcgis.com/VF9zVmfenvWNTmVd/arcgis/rest/services/Ohio_University_Campus_Memorials_WFL1/FeatureServer/8'
    }
  },
  {
    country: 'United States',
    state: 'Ohio',
    city: 'Bratenahl',
    info: 'https://www.arcgis.com/home/item.html?id=779c2bba9296410b9f8ef4ea53037303',
    download: {
      arcgis: 'https://services8.arcgis.com/G9HcjIcXXonYrtdY/arcgis/rest/services/Brat_Village_Tree_Map/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Ohio',
    city: 'Cincinnati',
    designation: 'Xavier University',
    info: 'https://www.arcgis.com/home/item.html?id=ac701913d1c24e988109d7679a1815d7',
    download: {
      arcgis: 'https://services5.arcgis.com/bL9D2dODGA0Rk8hK/arcgis/rest/services/Xavier_Master_Tree_Inventory_View_/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Ohio',
    city: 'Columbus',
    designation: 'Ohio State University',
    scope: 'Tree',
    info: 'http://hub.arcgis.com/datasets/2b4fc9ac4cdc43b7bba6f2b1e0d6f75f_29/about',
    download: {
      arcgis: 'https://gismaps.osu.edu/arcgis/rest/services/OSUMaps/BaseMap_RO/MapServer/29'
    }
  },
  {
    country: 'United States',
    state: 'Ohio',
    city: 'Columbus',
    designation: 'Weinland Park',
    notes: 'overlaps Columbus',
    info: 'https://www.arcgis.com/home/item.html?id=9abe4b9c5a1340f8b243f77aeddd6717',
    download: {
      arcgis: 'https://services7.arcgis.com/CKzlzHTK1Ng4peUH/arcgis/rest/services/WeinlandParkTreeDataExcel/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Ohio',
    city: 'Columbus',
    scope: 'Tree',
    info: 'http://opendata.columbus.gov/datasets/public-owned-trees/about',
    download: {
      arcgis: 'https://maps2.columbus.gov/arcgis/rest/services/Schemas/RecreationParks/MapServer/1'
    },
    crosswalk: {
      ref: 'OBJECTID',
      dbh_in: 'DIAM_BREAS',
      height_ft: 'HEIGHT',
      updated: 'INSPECTION',
      health: 'CONDITION1',
      maturity: 'LIFE_STAGE',
      common: 'SP_CODE',
      description: 'STR_NAME'
    },
    license: { id: 'CC0-1.0' },
    opentrees_id: 'colombus'
  },
  {
    country: 'United States',
    state: 'Ohio',
    city: 'Dublin',
    scope: 'Tree: street',
    info: 'https://data-dublinohio.opendata.arcgis.com/datasets/DublinOhio::street-trees-1/about',
    download: {
      arcgis: 'https://services1.arcgis.com/NqY8dnPSEdMJhuRw/arcgis/rest/services/Street_Trees_including_Removed/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Ohio',
    city: 'Dublin',
    scope: 'Tree: park',
    info: 'https://data-dublinohio.opendata.arcgis.com/datasets/DublinOhio::park-trees-2/about',
    download: {
      arcgis: 'https://services1.arcgis.com/NqY8dnPSEdMJhuRw/arcgis/rest/services/Park_Trees/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Ohio',
    city: 'Grove City',
    info: 'https://www.arcgis.com/home/item.html?id=ab5f42155557484b970bfc1bb3538300',
    download: {
      arcgis: 'https://arcgisweb.grovecityohio.gov:6443/arcgis/rest/services/Stage_Services/Tree_Inventory_ArcPro/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Ohio',
    city: 'Lebanon',
    scope: 'Tree',
    notes: 'Downloaded from the ArcGIS Open Data portal',
    download: { checksum: '7acca8d2c4127b0c55040b229dc880fb' },
    geometry: { x: 'x', y: 'y' },
    srs: 'EPSG:4326',
    codes: {
      LOT_SIDE: { F: 'Front', I: 'In ROW', O: 'Out ROW', R: 'Rear', S: 'Side' },
      GENUS: {
        ACER: 'Acer',
        AESCULUS: 'Aesculus',
        AILANTHUS: 'Ailanthus',
        AMELANCHIER: 'Amelanchier',
        CARPINUS: 'Carpinus',
        CATALPA: 'Catalpa',
        CEDRUS: 'Cedrus',
        CELTIS: 'Celtis',
        CERCIDIPHYLLUM: 'Cercidiphyllum',
        CERCIS: 'Cercis',
        CORNUS: 'Cornus',
        FRAXINUS: 'Fraxinus',
        GLEDITSIA: 'Gleditsia',
        JUGLANS: 'Juglans',
        KOELREUTERIA: 'Koelreuteria',
        LIQUIDAMBAR: 'Liquidambar',
        LIRIODENDRON: 'Liriodendron',
        MAGNOLIA: 'Magnolia',
        MALUS: 'Malus',
        MORUS: 'Morus',
        NYSSA: 'Nyssa',
        OTHER: 'Other',
        PICEA: 'Picea',
        PINUS: 'Pinus',
        PLANTING: 'Planting',
        PRUNUS: 'Prunus',
        PYRUS: 'Pyrus',
        QUERCUS: 'Quercus',
        ROBINIA: 'Robinia',
        SALIX: 'Salix',
        SYRINGA: 'Syringa',
        TILIA: 'Tilia',
        ULMUS: 'Ulmus',
        ZELKOVA: 'Zelkova',
        NA: 'NA',
        GINKGO: 'Ginkgo',
        GYMNOCLADUS: 'Gymnocladus',
        STEWARTIA: 'Stewartia',
        ALMUS: 'Almus',
        CLADRASTIS: 'Cladrastis',
        CARYA: 'Carya',
        PRENANTHES: 'Prenanthes',
        SOPHORA: 'Sophora',
        PLATANUS: 'Platanus',
        CRATAEGUS: 'Crataegus',
        POPULUS: 'Populus',
        HIBISCUS: 'Hibiscus',
        BETULA: 'Betula',
        JUNIPERUS: 'Juniperus',
        TAXODIUM: 'Taxdium',
        CORYLUS: 'Corylus',
        FAGUS: 'Fagus'
      },
      SPECIES: {
        ABIES: 'Abies',
        ACUTISSIMA: 'Acutissima',
        ALBA: 'Alba',
        ALTISSIMA: 'Altissima',
        AMERICANA: 'Americana',
        ARBOREA: 'Arborea',
        ATLANTICA: 'Atlantica',
        BABYLONICA: 'Babylonica',
        BICOLOR: 'Bicolor',
        BILOBA: 'Biloba',
        CALLERYANA: 'Calleryana',
        CANADENSIS: 'Canadensis',
        CAROLINIANA: 'Caroliniana',
        CERASIFERA: 'Cerasifera',
        COMMUNIS: 'Communis',
        CORDATA: 'Cordata',
        ELEGANS: 'Elegans',
        ELLIPSOIDALIS: 'Ellipsoidalis',
        FLORIDA: 'Florida',
        GLABRA: 'Glabra',
        JAPONICUM: 'Japonicum',
        LARGE: 'Large',
        MACROCARPA: 'Macrocarpa',
        MEDIUM: 'Medium',
        MEDLG: 'Medium Large',
        MUEHLENBERGII: 'Muehlenbergii',
        NEGUNDO: 'Negundo',
        NIGRA: 'Nigra',
        NIGRUM: 'Nigrum',
        OCCIDENTALIS: 'Occidentalis',
        PALUSTRIS: 'Palustris',
        PARVIFOLIA: 'Parvifolia',
        PENNSYLVANICA: 'Pennsylvanica',
        PLATANOIDES: 'Platanoides',
        PUMILA: 'Pumila',
        PUNGENS: 'Pungens',
        RETICULATA: 'Reticulata',
        ROBUR: 'Robur',
        RUBRA: 'Rubra',
        RUBRUM: 'Rubrum',
        SACCHARINUM: 'Saccharinum',
        SACCHARUM: 'Saccharum',
        SARGENTII: 'Sargentii',
        SEROTINA: 'Serotina',
        SERRULATA: 'Serrulata',
        SMALL: 'Small',
        SPECIES: 'Species',
        STROBUS: 'Strobus',
        STYRACIFLUA: 'Styraciflua',
        SYLVATICA: 'Sylvatica',
        SYLVESTRIS: 'Sylvestris',
        TRIACANTHOS: 'Tricanthos',
        TULIPIFERA: 'Tulipifera',
        NA: 'NA',
        MIYABEI: 'Miyabei "Morton"',
        PANICULATA: 'Paniculata',
        PSEUDOCAMELLIA: 'Pseudocamellia',
        DIOICUS: 'Dioicus',
        KOUSA: 'Kousa',
        BETULUS: 'Betulus',
        KENTUKEA: 'Kentukea',
        XYEDOENSIS: 'X Yedoensis',
        TRUNCATUM: 'Truncatum',
        FALCATE: 'Falcate',
        XGRANDIFLORA: 'X Grandiflora',
        GINNALA: 'Ginnala',
        LUTEA: 'Lutea',
        XPLATANOIDES: 'X Platanoides',
        FLAVA: 'Flava',
        OVATA: 'Ovata',
        BIGNONIOIDES: 'Bignonioides',
        DEODARA: 'Deodara',
        PSEUDOACACIA: 'Pseudoacacia',
        SAGITTATA: 'Sagittata',
        SPACH: 'Spach',
        XACERFOLIA: 'X Acerfolia',
        SUBHIRTELLA: 'Subhirtella Autumnalis',
        TOMENTOSA: 'Tomentosa',
        TATARIAN: 'Tatarian',
        GRISEUM: 'Griseum',
        XVERSCHAFFELTII: 'X Verschaffeltii',
        COCCINEA: 'Coccinea',
        ACERIFOLIA: 'Acerifolia',
        JAPONICA: 'Japonica',
        SERRATA: 'Serrata',
        VIRGINIANA: 'Virginiana',
        'VIRGINIANA SCHUBERTI': 'Virginiana Schuberti',
        PRAIRIEFIRE: 'Prairiefire',
        SYRIACUS: 'Syriacus',
        DELTOIDES: 'Deltoides',
        ALLISSIMA: 'Allissima',
        SPECIOSA: 'Speciosa',
        IMBRICARIA: 'Imbricaria',
        DISTICHUM: 'Distichum',
        COLURNA: 'Colurna',
        GRANDFOLIA: 'Grandfolia',
        PALMATUM: 'Palmatum',
        PHAENOPYRUM: 'Phaenopyrum',
        SHUMARDII: 'Shumardii',
        LIBANI: 'Libani',
        GLAUCA: 'Glauca',
        'CRUS-GALLI': 'Crus-Galli'
      },
      INACTIVE: { '0': 'Inactive', '1': 'Active' },
      COM_NAME: {
        'Acer Ginnala': 'Amur Maple',
        'Acer Griseum': 'Paperbark Maple',
        'Acer Miyabei': 'Morton Maple',
        'Acer Negundo': 'Boxelder Maple',
        'Acer Nigrum': 'Black Maple',
        'Acer Platanoides': 'Norway Maple',
        'Acer Rubrum': 'Red Maple',
        'Acer Saccharinum': 'Silver Maple',
        'Acer Saccharum': 'Sugar Maple',
        'Acer Truncatum': 'Shantung Maple',
        'Aesculus Flava': 'Yellow Buckeye',
        'Aesculus Glabra': 'Ohio Buckeye',
        'Carpinus Betulus': 'European Hornbeam',
        'Carpinus Caroliniana': 'American Hornbeam',
        'Catalpa Bignonioides': 'Southern Catalpa',
        'Catalpa Speciosa': 'Northern Catalpa',
        'Cedrus Deodara': 'Deodar Cedar',
        'Celtis Occidentalis': 'Common Hackberry',
        'Cercidiphyllum Japonicum': 'Katsura Tree (Big)',
        'Cercidiphyllum Magnificum': 'Katsura Tree (Small)',
        'Cercis Canadensis': 'Eastern Redbud',
        'Cladrastis Lutea': 'Yellowwood',
        'Cladrastis Kentukea': 'Kentucky Yellowwood',
        'Cornus Florida': 'Flowering Dogwood',
        'Cornus Kousa': 'Kousa Dogwood',
        'Fraxinus Americana': 'White Ash',
        'Fraxinus Pennsylvanica': 'Green Ash',
        'Ginkgo Biloba': 'Ginkgo Biloba "Maidenhair"',
        'Gleditsia Triacanthos': 'Honey Locust',
        'Gymnocladus Dioicus': 'Kentucky Coffeetree',
        'Juglans Nigra': 'Black Walnut',
        'Juglans Regia': 'English Walnut',
        'Koelreuteria Bipinnata': 'Chinese Flame-tree',
        'Koelreuteria Elegans': 'Flamegold',
        'Koelreuteria Paniculata': 'Golden Rain Tree',
        'Liquidambar Styraciflua': 'Sweet Gum',
        'Liriodendron Tulipifera': 'Tuliptree',
        'Malus Pumila': 'Paradise Apple',
        'Morus Rubra': 'Red Mulberry',
        'Nyssa Sylvatica': 'Black Gum',
        'Picea Abies': 'Norway Spruce',
        'Picea Pungens': 'Blue Spruce',
        'Pinus Strobus': 'Eastern White Pine',
        'Pinus Sylvestris': 'Scots Pine',
        'Platanus Occidentalis': 'American Sycamore',
        'Populus Alba': 'White Poplar',
        'Prenanthes Sagittata': 'Arrowleaf Rattlesnake Root',
        'Prunus Cerasifera': 'Plum Cherry',
        'Prunus Serotina': 'Black Cherry',
        'Prunus Serrulata': 'Japanese Flowering Cherry',
        'Prunus Subhirtella': 'Winter Flowering Cherry',
        'Prunus Virginiana': 'Choke Cherry',
        'Pyrus Calleryana': 'Callery Pear',
        'Pyrus Communis': 'Common Pear',
        'Quercus Acutissima': 'Sawtooth Oak',
        'Quercus Alba': 'White Oak',
        'Quercus Bicolor': 'Swamp White Oak',
        'Quercus Ellipsoidalis': 'Northern Pin Oak',
        'Quercus Falcate': 'Southern Red Oak',
        'Quercus Macrocarpa': 'Bur Oak',
        'Quercus Muehlenbergii': 'Chinkapin Oak',
        'Quercus Palustris': 'Pin Oak',
        'Quercus Robur': 'English Oak',
        'Quercus Rubra': 'Northern Red Oak',
        'Robinia Pseudoacacia': 'Black Locust',
        'Salix Babylonica': 'Weeping Willow',
        'Sophora Japonica': 'Pagoda Tree',
        'Stewartia Pseudocamellia': 'Japanese Stewartia',
        'Syringa Reticulata': 'Japanese Lilac Tree',
        'Tilia Americana': 'American Basswood Linden',
        'Tilia Cordata': 'Littleleaf Linden',
        'Tilia Tomentosa': 'Sterling Silver Linden',
        'Ulmus Americana': 'American Elm',
        'Ulmus Parvifolia': 'Chinese Elm',
        'Ulmus Pumila': 'Siberian Elm',
        'Zelkova Spach': 'Zelkova',
        'Zelkova Serrata': 'Japanese City "Sprite Zelkova"',
        'Amelanchier Arborea': 'Cumulus Serviceberry',
        'Carya Ovata': 'Shagbark Hickory',
        'Acer Species': 'Maple',
        'Aesculus Species': 'Buckeye',
        'Amelanchier Species': 'Serviceberry',
        'Amelanchier Xgrandiflora': 'Autumn Brilliance Serviceberry',
        'Carpinus Species': 'Hornbeam',
        'Catalpa Species': 'Catalpa',
        'Cedrus Species': 'Cedar',
        'Celtis Species': 'Hackberry',
        'Cercidiphyllum Species': 'Katsura',
        'Cercis Species': 'Redbud',
        'Cornus Species': 'Dogwood',
        'Crataegus Species': 'Hawthorn',
        'Fraxinus Species': 'Ash',
        'Gymnocladus Species': 'Coffeetree',
        'Juglans Species': 'Walnut',
        'Malus Species': 'Apple',
        'Morus Species': 'Mulberry',
        'Picea Species': 'Spruce',
        'Pinus Species': 'Pine',
        'Platanus Species': 'Sycamore',
        'Populus Species': 'Poplar',
        'Prunus Species': 'Cherry',
        'Pyrus Species': 'Pear',
        'Quercus Species': 'Oak',
        'Salix Species': 'Willow',
        'Syringa Species': 'Lilac',
        'Ulmus Species': 'Elm',
        'Magnolia Species': 'Magnolia',
        'Prunus Xyedoensis': 'Yoshino Cherry',
        'Platanus Hybrida': 'London Sycamore',
        'Platanus Xacerfolia': 'London Plane Sycamore',
        'Prunus Virginiana schuberti': 'Canada Red Cherry (Tree Form)',
        'Malus Prairiefire': 'Prairiefire Crabapple',
        'Hibiscus Syriacus': 'Rose of Sharon',
        'Populus Deltoides': 'Eastern Cottonwood',
        'Betula Nigra': 'River Birch',
        'Morus Alba': 'White Mulberry',
        'Juniperus Virginiana': 'Eastern Redcedar',
        'Quercus Imbricaria': 'Shingle Oak',
        'Taxodium Distichum': 'Baldcypress',
        'Corylus Colurna': 'Turkish Hazel',
        'Fagus Grandfolia': 'Beech Tree',
        'Pincea Glauca': 'White Spruce',
        'Cedrus Libani': 'Lebanon Cedar',
        'Acer Palmatum': 'Japanese Maple',
        'Crataegus Phaenopyrum': 'Washington Hawthorne',
        'Quercus Shumardii': "Shumard's Oak",
        'Ailanthus Altissima': 'Tree of Heaven',
        'Crataegus Crus-Galli': 'Cockspur Hawthorn',
        'Morus Rubrum': 'Red Gelato Mulberry'
      },
      CondType: {
        DEAD: 'Dead',
        FAIR: 'Fair',
        GOOD: 'Good',
        POOR: 'Poor',
        CRITICAL: 'Critical',
        EXCELLENT: 'Excellent',
        VERYGOOD: 'Very Good',
        UNK: 'Unknown',
        NA: 'NA'
      },
      MINORTYPE: {
        PR1: 'Priority 1',
        PR2: 'Priority 2',
        R_LG: 'Routine Large',
        R_SM: 'Routine Small',
        STUMP: 'Stump',
        TRAIN: 'Train',
        PLANT: 'Plant',
        NA: 'NA',
        REMD: 'Removed',
        PROP: 'Proposed',
        REM1: 'Remove Immediately',
        RAISE: 'Raise',
        PRUNE: 'Prune'
      }
    }
  },
  {
    country: 'United States',
    state: 'Ohio',
    city: 'Marysville',
    scope: 'Tree',
    info: 'https://open-data-marysville.opendata.arcgis.com/datasets/Marysville::tree-sites/about',
    download: {
      arcgis: 'https://services3.arcgis.com/ccRMrVzOSHBUG6X2/arcgis/rest/services/Tree_Sites_Public/FeatureServer/0'
    },
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
    },
    opentrees_id: 'marysville_oh'
  },
  {
    country: 'United States',
    state: 'Ohio',
    city: 'Sandusky',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=ea3deef3f18445738bde158f6e604453',
    download: {
      arcgis: 'https://services3.arcgis.com/r00vmm8eIzAwdHlO/arcgis/rest/services/COSTreeInventory_publicview/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Ohio',
    city: 'Westerville',
    scope: 'Tree',
    info: 'https://hub.arcgis.com/datasets/Westerville::comm-parks-rec-trees/about',
    download: {
      arcgis: 'https://webgis.westerville.org/public/rest/services/TransparencyHub/Trees/FeatureServer/0'
    },
    crosswalk: {
      dbh_in: 'DBH',
      common: 'COMMON_NAME',
      location: 'TREE_TYPE',
      health: 'CONDITION',
      scientific: 'SCIENTIFIC'
    },
    opentrees_id: 'westerville_oh'
  },
  {
    country: 'United States',
    state: 'Oklahoma',
    city: 'Oklahoma City',
    scope: 'Tree',
    notes: 'unofficial',
    info: 'https://zenodo.org/records/6726506',
    download: 'https://zenodo.org/records/6726506/files/OklahomaCity_Final_2022-06-18.csv',
    driver: 'CSV',
    geometry: { x: 'longitude_coordinate', y: 'latitude_coordinate' },
    license: { id: 'CC0-1.0' },
    terms: 'McCoy, D., Goulet-Scott, B., Meng, W., Atahan, B., Kiros, H., Nishino, M., & Kartesz, J. (2022). A dataset of 5 million city trees from 63 US cities: species, location, nativity status, health, and more. [Data set]. Zenodo. https://doi.org/10.5061/dryad.2jm63xsrf'
  },
  {
    country: 'United States',
    state: 'Oregon',
    city: 'Grants Pass',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=885c198264304692b89fc3cc418fb6bf',
    download: {
      arcgis: 'https://services2.arcgis.com/pc4beVTMEhYHqerq/arcgis/rest/services/Tree_Inventory_1_ViewLayer/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Oregon',
    city: 'La Grande',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=ccc61822a90042b39583afa2bace0c08',
    download: {
      arcgis: 'https://services8.arcgis.com/fctQFRCLcuzAFEur/arcgis/rest/services/Tree_Inventory_Public/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Oregon',
    city: 'Oregon City',
    scope: 'Tree',
    info: 'https://koordinates.com/layer/100048-oregon-city-oregon-trees/',
    download: {
      arcgis: 'https://maps.orcity.org/arcgis/rest/services/WaterAndNaturalResources/MapServer/11'
    }
  },
  {
    country: 'United States',
    state: 'Oregon',
    city: 'Portland',
    scope: 'Tree: street',
    info: 'http://gis-pdx.opendata.arcgis.com/datasets/street-trees/about',
    download: {
      arcgis: 'https://www.portlandmaps.com/arcgis/rest/services/Public/COP_OpenData_Environment/MapServer/25'
    },
    crosswalk: {
      ref: 'OBJECTID',
      updated: 'Date_Inven',
      planted: 'Plant_Date',
      scientific: 'Scientific',
      genus: 'Genus',
      family: 'Family',
      common: 'Common',
      health: 'Condition',
      dbh_in: 'DBH',
      note: 'Notes',
      edible: x => ({
        'no': 'false',
        'fruit': 'fruit',
        'nut': 'nut'
      })[x['Edible']],
      location: x => 'street'
    },
    opentrees_id: 'pdx-street',
    fallingfruit_id: 94
  },
  {
    country: 'United States',
    state: 'Oregon',
    city: 'Portland',
    scope: 'Tree: park',
    info: 'http://gis-pdx.opendata.arcgis.com/datasets/parks-tree-inventory/about',
    download: {
      arcgis: 'https://www.portlandmaps.com/arcgis/rest/services/Public/COP_OpenData_Environment/MapServer/220'
    },
    crosswalk: {
      ref: 'OBJECTID',
      updated: 'Inventory_',
      dbh_in: 'DBH',
      height_ft: 'TreeHeight',
      crown_ft: x => (x['CrownWidth'] + x['CrownWid_1']) / 2,
      carbon_lb: 'Carbon_Sto',
      carbon_annual_lb: 'Carbon_Seq',
      health: 'Condition',
      family: 'Family',
      genus: 'Genus',
      scientific: 'Genus_spec',
      common: 'Common_nam',
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
    opentrees_id: 'pdx-park',
    fallingfruit_id: 93
  },
  {
    country: 'United States',
    state: 'Oregon',
    city: 'Talent',
    designation: 'Colver Road Park',
    scope: 'Tree: park',
    info: 'https://www.arcgis.com/home/item.html?id=e48dfc7cceab4dcab6d757f29a4c78a0',
    download: {
      arcgis: 'https://services8.arcgis.com/WTpeil3dRPBpap1N/arcgis/rest/services/COLVER_PARK_TREE_POINTS/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Oregon',
    city: 'Wilsonville',
    info: 'https://www.arcgis.com/home/item.html?id=be1cd8dacddc4059b0818046f11e8964',
    download: {
      arcgis: 'https://dev.wilsonvillemaps.com/server/rest/services/cartegraph_sde_gis16/FeatureServer/48'
    }
  },
  {
    country: 'United States',
    state: 'Pennsylvania',
    city: 'Allentown',
    scope: 'Tree',
    info: 'https://opendata.allentownpa.gov/datasets/AllentownPA::city-trees/about',
    download: {
      arcgis: 'https://services1.arcgis.com/WUqVDRuvIiIiH2Pl/arcgis/rest/services/City_Trees/FeatureServer/0'
    },
    crosswalk: {
      common: 'TR_COMMON',
      scientific: 'TR_GENUS',
      dbh_in: 'TR_DIA',
      health: 'CONDITION',
      updated: 'INPUT_DATE'
    },
    opentrees_id: 'allentown'
  },
  {
    country: 'United States',
    state: 'Pennsylvania',
    city: 'Bethlehem',
    designation: 'Lehigh University',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=6fb9dc7447524b3a9021a4e36a00f0fd',
    download: {
      arcgis: 'https://services2.arcgis.com/NlbUAihbvA50xxJw/arcgis/rest/services/Lehigh_University_Trees/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Pennsylvania',
    city: 'Bethlehem',
    designation: 'Moravian University',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=1573495b484049719bb6a759f9e1fd60',
    download: {
      arcgis: 'https://services2.arcgis.com/NlbUAihbvA50xxJw/arcgis/rest/services/Moravian_University_Trees/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Pennsylvania',
    city: 'Bethlehem',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=2f0bf054191d4fd381e26a3ed1a7958a',
    download: {
      arcgis: 'https://services2.arcgis.com/NlbUAihbvA50xxJw/arcgis/rest/services/COB_Tree_Inventory_Public_View/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Pennsylvania',
    city: 'College Township',
    scope: 'Tree: street',
    info: 'https://www.arcgis.com/home/item.html?id=19dd6203a942417c8055371b9d9e9f0c',
    download: {
      arcgis: 'https://services8.arcgis.com/qnunbWxvlJsj1oVm/arcgis/rest/services/Street_Trees_Public/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Pennsylvania',
    city: 'Harrisburg',
    scope: 'Tree: street',
    info: 'https://hub.arcgis.com/datasets/COHBG::street-trees-3/about',
    download: {
      arcgis: 'https://services5.arcgis.com/9n3LUAMi3B692MBL/arcgis/rest/services/Corrected_2018_Tree_Layer/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Pennsylvania',
    city: 'Harrisburg',
    scope: 'Tree: park',
    info: 'https://www.arcgis.com/home/item.html?id=197acffdce134d5aa9109e2283005edf',
    download: {
      arcgis: 'https://services5.arcgis.com/9n3LUAMi3B692MBL/arcgis/rest/services/Park_Tree_Inventory/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Pennsylvania',
    city: 'Mount Lebanon',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=bdc05017c91d45e3b729979bf0a8b231',
    download: {
      arcgis: 'https://services8.arcgis.com/4sXEsxQJTWBlSKA1/arcgis/rest/services/TreesFeatureService_ReadOnly/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Pennsylvania',
    city: 'Mount Lebanon',
    scope: 'Tree: park',
    info: 'https://www.arcgis.com/home/item.html?id=bdc05017c91d45e3b729979bf0a8b231',
    download: {
      arcgis: 'https://services8.arcgis.com/4sXEsxQJTWBlSKA1/arcgis/rest/services/TreesFeatureService_ReadOnly/FeatureServer/3'
    }
  },
  {
    country: 'United States',
    state: 'Pennsylvania',
    city: 'Mount Lebanon',
    scope: 'Tree: park',
    info: 'https://www.arcgis.com/home/item.html?id=111f82cc9d5c4fe1a3ca7a55659096b8',
    download: {
      arcgis: 'https://services8.arcgis.com/4sXEsxQJTWBlSKA1/arcgis/rest/services/ParkTrees_ReadOnly/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Pennsylvania',
    city: 'Philadelphia',
    designation: 'Temple University',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=56557a4b640d4d33ae96e066fe3782bd',
    download: {
      arcgis: 'https://services.arcgis.com/6fiE7QkLWSPMd0N5/arcgis/rest/services/Tree_Inventory_on_Main_Campus/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Pennsylvania',
    city: 'Philadelphia',
    scope: 'Tree',
    info: 'https://opendataphilly.org/datasets/philadelphia-tree-inventory/',
    download: {
      arcgis: 'https://services.arcgis.com/fLeGjb7u4uXqeF9q/ArcGIS/rest/services/PPR_Tree_Inventory_2022/FeatureServer/0'
    },
    opentrees_id: 'philadelphia'
  },
  {
    country: 'United States',
    state: 'Pennsylvania',
    city: 'Philadelphia',
    scope: 'Tree',
    notes: 'superseded (for Philadelphia subset)',
    inactive: true,
    info: 'https://www.opentreemap.org/phillytreemap/map/',
    download: { manual: 'https://www.opentreemap.org/phillytreemap/map/' },
    fallingfruit_id: 92,
    opentrees_id: 'philadelphia'
  },
  {
    country: 'United States',
    state: 'Pennsylvania',
    city: 'Phoenixville',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=828da60491a442c497cf073c78f27976',
    download: {
      arcgis: 'https://services1.arcgis.com/gGHDlz6USftL5Pau/arcgis/rest/services/phxtrees/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Pennsylvania',
    city: 'Pittsburgh',
    designation: 'University of Pittsburgh',
    info: 'https://www.arcgis.com/home/item.html?id=887c75d62f7b475ab845c7670e993ee8',
    download: {
      arcgis: 'https://services7.arcgis.com/arZnhQhtvIXpgVPD/arcgis/rest/services/IMP_WFL1/FeatureServer/1'
    }
  },
  {
    country: 'United States',
    state: 'Pennsylvania',
    city: 'Pittsburgh',
    scope: 'Tree',
    info: 'https://data.wprdc.org/dataset/city-trees',
    download: 'https://data.wprdc.org/datastore/dump/1515a93c-73e3-4425-9b35-1cd11b2196da',
    geometry: { x: 'longitude', y: 'latitude' },
    srs: 'EPSG:4326',
    crosswalk: {
      common: 'common_name',
      ref: 'id',
      scientific: 'scientific_name',
      height_ft: 'height',
      health: 'condition'
    },
    license: { id: 'CC-BY-4.0' },
    fallingfruit_id: 127,
    opentrees_id: 'pittsburgh'
  },
  {
    country: 'United States',
    state: 'Pennsylvania',
    city: 'Selinsgrove',
    designation: 'Susquehanna University',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=d4cb38fcb89148fc980318862a49aa30',
    download: {
      arcgis: 'https://services3.arcgis.com/QhHiDuPJvXaEOuSa/arcgis/rest/services/Trees/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Pennsylvania',
    city: 'Villanova',
    designation: 'Villanova University',
    info: 'https://www.arcgis.com/home/item.html?id=e786e061f887473b9797c12ac66529b2',
    download: {
      arcgis: 'https://services5.arcgis.com/yCVH8H4hXcgEqeRw/arcgis/rest/services/CampusTrees_Public/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Pennsylvania',
    city: 'West Chester Borough',
    scope: 'Tree',
    notes: 'unofficial',
    info: 'http://hub.arcgis.com/datasets/WCUPAGIS::borotrees-1/about',
    download: {
      arcgis: 'https://services1.arcgis.com/xnOV358bj0tLwxji/arcgis/rest/services/BoroTrees/FeatureServer/0'
    },
    crosswalk: {
      dbh_in: 'DBH',
      ref: 'ID_1',
      genus: 'Genus',
      species: 'Species_1',
      common: 'CommonName',
      health: 'Condition_1'
    },
    opentrees_id: 'west_chester_pa'
  },
  {
    country: 'United States',
    state: 'Rhode Island',
    city: 'Providence',
    scope: 'Tree: street',
    info: 'https://data.providenceri.gov/Neighborhoods/Providence-Tree-Inventory/uv9w-h8i4',
    download: 'https://data.providenceri.gov/api/views/uv9w-h8i4/rows.csv',
    coordsFunc: x => x['Property Address'].split('\n').reverse()[0].split(/[(), ]/).filter(Number).map(Number).reverse(),
    crosswalk: { scientific: 'Species', dbh_in: 'Diameter in Inches' },
    opentrees_id: 'providence'
  },
  {
    country: 'United States',
    state: 'South Carolina',
    scope: 'Tree: notable',
    info: 'https://clemson.maps.arcgis.com/home/item.html?id=26fe789e994f4c90b6670902af7d9c77',
    download: {
      arcgis: 'https://services1.arcgis.com/x5wCko8UnSi4h0CB/arcgis/rest/services/South_Carolina_Champion_Tree/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'South Carolina',
    city: 'AIken',
    scope: 'Tree: notable',
    info: 'https://open-data-aiken-sc.hub.arcgis.com/datasets/0df3e53a96d44b368ef7837e7fd2b042_2/about',
    download: {
      arcgis: 'https://utility.arcgis.com/usrsvcs/servers/0df3e53a96d44b368ef7837e7fd2b042/rest/services/TempProjects/Trees_Bartlett_Survey_Conditions/MapServer/2'
    }
  },
  {
    country: 'United States',
    state: 'South Carolina',
    city: 'Clemson',
    designation: 'Clemson University',
    scope: 'Tree',
    info: 'https://www.clemson.edu/campus-map/',
    download: 'https://www.clemson.edu/campus-map/kml/trees.kmz',
    vfs: '/vsizip/',
    fallingfruit_id: 351
  },
  {
    country: 'United States',
    state: 'South Carolina',
    city: 'Greenville',
    scope: 'Tree',
    notes: 'Downloaded from the ArcGIS Open Data portal',
    download: { checksum: '5e6fc6329f72f0c3cb2fa9b59f38c931' },
    geometry: { x: 'x', y: 'y' },
    srs: 'EPSG:4326',
    codes: {
      Condition: {
        '1': 'Excellent',
        '2': 'Good',
        '3': 'Fair',
        '4': 'Poor',
        '5': 'Critical',
        '6': 'Dead',
        '7': 'None'
      },
      Treelawn: {
        '1': 'Open',
        '2': "0-3'",
        '3': "3-5'",
        '4': "5-8'",
        '5': "8'+"
      },
      Street: {
        '1': 'Aerotech Dr',
        '2': 'Airport Park Dr',
        '3': 'Angel Hill Dr',
        '4': 'Appletree Ct',
        '5': 'Ares Dr',
        '6': 'Arnies Ln',
        '7': 'Atlantis Dr',
        '8': 'Autuman Ct',
        '9': "Bailey's Harbor Ct",
        '10': "Bailey's Harbor Rd",
        '11': 'Barnwood Ct',
        '12': 'Barry Ct',
        '13': 'Benjamin Dr',
        '14': 'Bennett Cir',
        '15': "Betty's Rodeo Dr",
        '16': 'Birmingham St',
        '17': 'Blue Heron La',
        '18': 'Bluebluff Way',
        '19': 'Blustery Dr',
        '20': 'Bobwhite Dr',
        '21': 'Bon Bon Ct',
        '22': 'Boonesborough Dr',
        '23': 'Brackenwood La',
        '24': 'Brandon Ct',
        '25': 'Brookhill Dr',
        '26': 'Brookview Dr',
        '27': 'Brush Run',
        '28': "Bucky's Way",
        '29': 'Buman Way',
        '30': 'Buttercup Ct',
        '31': 'CTH CA',
        '32': 'CTH GV',
        '33': 'CTH JJ',
        '34': 'Cape Cod Ave',
        '35': 'Cedar Dr',
        '36': 'Cedar Grove Ct',
        '37': 'Cedar La',
        '38': 'Celebration Dr',
        '39': 'Challenger Dr',
        '40': 'Chapel Hill Dr',
        '41': 'Charleen La',
        '42': 'Cheryl Ct',
        '43': 'Chesapeake Ct',
        '44': 'Christy La',
        '45': 'Churchill Ct',
        '46': 'Churchill Rd',
        '47': 'Cleary Ct',
        '48': 'Clover La',
        '49': 'Cobblestone Ct',
        '50': 'College Ave',
        '51': 'Colonial Dr',
        '52': 'Columbia Dr',
        '53': 'Comet La',
        '54': 'Communication Ct',
        '55': 'Communication Dr',
        '56': 'Contractor Dr',
        '57': 'Cornhusk Dr',
        '58': 'County Rd BB',
        '59': 'County Rd CB',
        '60': 'County Rd JJ',
        '61': 'Cozy Creek',
        '62': 'Craftsmen Ct',
        '63': 'Craftsmen Dr',
        '64': 'Crandon Ct',
        '65': 'Dairy La',
        '66': 'Daniel Ct',
        '67': 'Dawn Ct',
        '68': 'Deer Haven Ct',
        '69': 'Design Dr',
        '70': 'Diamond Ct',
        '71': 'Discovery Dr',
        '72': 'Donna Dr',
        '73': 'Dover Ct',
        '74': 'Ellen La',
        '75': 'El Paso Dr',
        '76': 'Emerald Ct',
        '77': 'Emerald La',
        '78': 'Endeavor Dr',
        '79': 'Englewood Dr',
        '80': 'Enterprise Dr',
        '81': 'Evening Star Dr',
        '82': 'Everglade Rd',
        '83': 'Fairlane Dr',
        '84': 'Fairwinds Dr',
        '85': 'Family Cir',
        '86': 'Fawn Ridge Ct',
        '87': 'Fawn Ridge Dr',
        '88': 'Flagstone Ct',
        '89': 'Forest Glen Ct',
        '90': 'Fox Hollow La',
        '91': 'Fox Springs Dr',
        '92': 'Foxwood Dr',
        '93': 'Gemini Ln',
        '94': 'Gemstone Ct',
        '95': 'Gene Ct',
        '96': 'Glen Rose La',
        '97': 'Glen Valley Dr',
        '98': 'Glenford Way',
        '99': 'Glennview Dr',
        '100': 'Golden Autumn Pl',
        '101': 'Goldfinch Ct',
        '102': 'Goldfinch Dr',
        '103': 'Goose Creek Cir',
        '104': 'Green Willow Ct',
        '105': 'Green Willow La',
        '106': 'Greenbush Ct',
        '107': 'Greendale Rd',
        '108': 'Greenridge Dr',
        '109': 'Greenville Center Dr',
        '110': 'Greenville Dr',
        '111': 'Greenwood Ct',
        '112': 'Greenwood Rd',
        '113': 'Harpers Dr',
        '114': 'Harvest Dr',
        '115': 'Hawkfield Ct',
        '116': 'Heavenly Dr',
        '117': 'Heron Ridge Ct',
        '118': 'Hickory Meadows La',
        '119': 'Hickory Nut Tr',
        '120': 'Highgreen Ct',
        '121': 'Highgreen Dr',
        '122': 'Hillandale Dr',
        '123': 'Hillcrest Ct',
        '124': 'Hillview Rd',
        '125': 'Hillwood Ct',
        '126': 'Holy Hill Dr',
        '127': 'Horizon Dr',
        '128': 'Hot Springs Ct',
        '129': 'Hummock Dr',
        '130': 'Hyacinth Ct',
        '131': 'Hyacinth La',
        '132': 'Island Rd',
        '133': 'Ivy La',
        '134': 'Jackie Ct',
        '135': 'Jeremy Ct',
        '136': 'Joan St',
        '137': "Joey's Pl",
        '138': 'Julius Dr',
        '139': 'Kas Dr',
        '140': 'Keifer Ct',
        '141': 'Keimer Ct',
        '142': 'Kimberly Ct',
        '143': 'Knollwood Ct',
        '144': 'Lakeview Ct',
        '145': 'kadeview La',
        '146': 'Lawler Ct',
        '147': 'Levi Dr',
        '148': 'Lilac La',
        '149': 'Lily of the Valley Ct',
        '150': 'Lily of the Valley Dr',
        '151': 'Linda Lou Dr',
        '152': 'Long Ct',
        '153': 'Lundeen Dr',
        '154': 'Lynchburg Dr',
        '155': 'Manley Rd',
        '156': 'Maple Terrace Rd',
        '157': 'Mapleleaf Ct',
        '158': 'Marcy Ct',
        '159': 'Marlys Ct',
        '160': 'Marrihill Ct',
        '161': 'Mayflower Rd',
        '162': 'Meadowpark Dr',
        '163': 'Meadowview La',
        '164': 'Medina Dr',
        '165': 'Merrimac Dr',
        '166': 'Michael Ct',
        '167': 'Midnight Ct',
        '168': 'Midnight Way',
        '169': 'Milly St',
        '170': 'Misty Spring Ct',
        '171': 'Molly Marie Ct',
        '172': 'Moon Dust Ct',
        '173': 'Moonlight Dr',
        '174': 'Moon Shadow Dr',
        '175': 'Morning Glory La',
        '176': 'Municipal Dr',
        '177': 'Nature Tr Dr',
        '178': 'Neubert Rd',
        '179': 'North Rd',
        '180': 'North Spring Dr',
        '181': 'Northmont Dr',
        '182': 'Oakwood Ave',
        '183': 'Olive Ct',
        '184': 'Orchid Way',
        '185': 'Parkview Ct',
        '186': 'Parkview Dr',
        '187': 'Pasture Pkwy',
        '188': 'Pathfinder Dr',
        '189': 'Peaceful Ct',
        '190': 'Pebble Ridge Rd',
        '191': 'Pilgrim St',
        '192': 'Pine View Ct',
        '193': 'Plymouth St',
        '194': 'Ponderosa Dr',
        '195': 'Portside Ct',
        '196': 'Prairie Ct',
        '197': 'Prairie View Dr',
        '198': 'Priscilla La',
        '199': 'Puls Farm Pl',
        '200': 'Quail Run Dr',
        '201': 'Quality Ct',
        '202': 'Quality Dr',
        '203': 'Quarry View Dr',
        '204': 'Rawley Point Dr',
        '205': 'Red Hawk Dr',
        '206': 'Red Wing Dr',
        '207': 'Reimer Ct',
        '208': 'Reimer Dr',
        '209': 'Reis Rd',
        '210': 'Rhinestone Ct',
        '211': 'Rickey La',
        '212': 'Ridgeside Dr',
        '213': 'Ridgetop Dr',
        '214': 'Ridgeway Dr',
        '215': 'Rimrock La',
        '216': 'Rivendale Ct',
        '217': 'River Dr',
        '218': 'Robert Ct',
        '219': 'Rochelle Ct',
        '220': 'Rock Island Dr',
        '221': 'Rockdale La',
        '222': 'Rocky Mountain Dr',
        '223': 'Sally Ct',
        '224': 'Sally St',
        '225': 'Savannah Dr',
        '226': 'School Rd',
        '227': 'Schroeder Farm Dr',
        '228': 'Schroth La',
        '229': 'Shadybrook La',
        '230': 'Shagbark Way',
        '231': 'Shenandoah Ct',
        '232': 'Sherwood Point Ct',
        '233': 'Sherwood Point Dr',
        '234': 'Skyline Dr',
        '235': 'Smokey Ct',
        '237': 'Snowdrop Ct',
        '238': 'South Creek Dr',
        '239': 'South Park Dr',
        '240': 'Southport Dr',
        '241': 'Speciality Dr',
        '242': 'Spencer Dr',
        '243': 'Spencer Rd',
        '244': 'Spring Ct',
        '245': 'Spring Rd',
        '246': 'Spring Green Pl',
        '247': 'Spring Valley Dr',
        '248': 'Squirrel Run',
        '249': 'St Helen Dr',
        '250': "St Mary's Dr",
        '251': 'STH 15',
        '252': 'STH 76',
        '253': 'STH 96',
        '254': 'Star Dust Dr',
        '255': 'Stone Bluff La',
        '256': 'Summer Wind Dr',
        '257': 'Summerbreeze Ln',
        '258': 'Summer View Dr',
        '259': 'Sunfield Dr',
        '260': 'Sunnyvale La',
        '261': 'Sunrise Tr',
        '262': 'Sunset Dr',
        '263': 'Swanee Cir',
        '264': 'Tallahassee Ct',
        '265': 'Talon Dr',
        '266': 'Technical Dr',
        '267': 'Terrace Dr',
        '268': 'Thornton Dr',
        '269': 'Thrush Dr',
        '270': 'Timothy La',
        '271': 'Topaz Ct',
        '272': 'Tower View Dr',
        '273': 'Trillium Ct',
        '274': 'Tuckaway Ct',
        '275': 'Two Mile Rd',
        '276': 'Vander Maazen Dr',
        '277': 'Vanessa La',
        '278': 'Vast Domain Dr',
        '279': 'Velma La',
        '280': 'Violet Ct',
        '281': 'Vista Ct',
        '282': 'W Spencer Rd',
        '283': 'Wally Way',
        '284': 'Waterlefe Dr',
        '285': 'Weatherhill Ct',
        '286': 'West Haven Ct',
        '287': 'West Haven Dr',
        '288': 'West Lake Ct',
        '289': 'West Meadows La',
        '290': 'Westgreen Ct',
        '291': 'Westgreen Dr',
        '292': 'Wieckert Ct',
        '293': 'Wildwood Dr',
        '294': 'Winds End La',
        '295': 'Windward Dr',
        '296': 'Windy Way',
        '297': 'Windyhill Rd',
        '298': 'Winnegamie Dr',
        '299': 'Wisconsin Ave',
        '300': 'Woodland Dr',
        '301': 'Forest Glen Dr',
        '302': 'Appletree Square',
        '303': 'Community Park',
        '304': 'Glen Valley Park',
        '305': 'Jennerjohn Park',
        '306': 'Kimberly Court',
        '307': 'Lions Park',
        '308': 'Municipal Complex',
        '309': 'Pebbleridge Park',
        '310': 'Town Hall',
        '311': 'Trail'
      },
      LotLocation: {
        '1': 'Front',
        '2': 'Side',
        '3': 'Back',
        '4': 'Median',
        '5': 'N/A',
        '6': 'None'
      },
      Species: {
        ALGL: 'Alder, Black',
        PHAM: 'Amur Corktree',
        PHAMMA: 'Amur Corktree - Macho',
        MAAM: 'Amur Maackia',
        THOCPY: 'Arborvitae - Pyramidal',
        FRNI: 'Ash, Black',
        FRNIFA: 'Ash, Black - Fall Gold',
        FRQU: 'Ash, Blue',
        FRPE: 'Ash, Green',
        FRPEPA: 'Ash, Green - Patmore',
        FRMA: 'Ash, Manchurian',
        FRAM: 'Ash, White',
        FRAMAU: 'Ash, White - Autumn Applause',
        POGR: 'Aspen, Bigtooth',
        POTR: 'Aspen, Quaking',
        TADI: 'Baldcypress',
        FAGR: 'Beech, American',
        FASY: 'Beech, American',
        BEPL: 'Birch, Asian White',
        BEPE: 'Birch, European White',
        BEPO: 'Birch, Gray',
        BEPA: 'Birch, Paper',
        BEPARE: 'Birch, Paper - Renaissance Reflection',
        BENI: 'Birch, River',
        BELE: 'Birch, Sweet',
        BEAL: 'Birch, Yellow',
        ROPS: 'Black Locust',
        NYSY: 'Black Tupelo',
        JUNI: 'Balck Walnut',
        ACNE: 'Boxelder',
        AEPA: 'Buckeye, Bottlebrush',
        AECH: 'Buckeye, Chinese',
        AEXHO: 'Buckeye, Homestead',
        AEGL: 'Buckeye, Ohio',
        AECA: 'Buckeye, Red',
        AEOC: 'Buckeye, Yellow',
        JUCI: 'Butternut',
        PYCA: 'Callery Pear',
        PYCAAR: 'Callery Pear - Aristocrat',
        PYCAAU: 'Callery Pear - Autumn Blaze',
        PYCACL: 'Callery Pear - Cleveland Select',
        CASP: 'Catalpa',
        JUVI: 'Cedar, Eastern Red',
        THOC: 'Cedar, Northern White',
        PRMA: 'Cherry, Amur Choke',
        PRSE1: 'Cherry, Black',
        PRVI: 'Cherry, Choke',
        PRPA: 'Cherry, European Bird - Summer Glow',
        PRSE2: 'Cherry, Oriental',
        PRPE: 'Cherry, Pin',
        PRSA: 'Cherry, Sargeant',
        CAMO: 'Chestnut, Chinese',
        PODE: 'Cottonwood',
        MASP: 'Crabapple',
        MEGL: 'Dawnredwood',
        COAL: 'Dogwood, Pagoda',
        PSME: 'Douglasfir',
        ULAM: 'Elm, American',
        ULX: 'Elm, Hybrid',
        ULXAC: 'Elm, Hybrid - Accolade',
        ULXFR: 'Elm, Hybrid - Frontier',
        ULXHO: 'Elm, Hybrid - Homestead',
        ULXNH: 'Elm, Hybrid - New Horizon',
        ULPA: 'Elm, Lacebark',
        ULPU: 'Elm, Siberian',
        CHPI: 'Falsecypress, Japanese',
        ABBA: 'Fir, Balsam',
        ABCO: 'Fir, White',
        CHVI: 'Fringetree, White',
        GIBIAG: 'Gingko - Autumn Gold',
        GIBI: 'Ginkgo',
        GIBIPR: 'Ginkgo - Princeton Sentry',
        KOPA: 'Goldenraintree',
        CEOC: 'Hackberry',
        EUUL: 'Hardy Rubber Tree',
        CRSP: 'Hawthorne spp.',
        CRCR: 'Hawthorne, Cockspur',
        CRPH: 'Hawthorne, Washington',
        TSCA: 'Hemlock, Canada',
        CAOV: 'Hickory Shagbark',
        CACO: 'Hickory, Bitternut',
        GLTR: 'Honeylocust',
        GLTRSK: 'Honeylocust - Skyline',
        PTTR: 'Hoptree-Waferash',
        CACA: 'Hornbean, American',
        CABE: 'Hornbean, European - Pyramidal',
        AETU: 'Horsechestnut, Chinese',
        AEHI: 'Horsechestnut, European',
        AEHIBA: 'Horsechestnut, European - Baumanni',
        OSVI: 'Ironwood',
        SOJA: 'Japanese Pagodatree',
        CEJA: 'Katsuratree',
        GYDI: 'Kentucky Coffeetree',
        GYDIES: 'Kentucky Coffeetree - Espresso',
        LADE: 'Larch, European',
        LAKA: 'Larch, Japanese',
        SYRE: 'Lilac, Japanese Tree',
        SYREIP: 'Lilac, Japanese Tree - Ivory Pillar',
        SYREIS: 'Lilac, Japanese Tree - Ivory Silk',
        SYPE: 'Lilac, Peking',
        SYPECH: 'Lilac, Peking - China Snow',
        TIAM: 'Linden, American',
        TIAMLE: 'Linden, American - Legend',
        TIAMRE: 'Linden, American - Redmond',
        TIFL: 'Linden, Glenleven',
        TICO: 'Linden, Littleleaf',
        TICOGR: 'Linden, Littleleaf - Greenspire',
        TICOHG: 'Linden, Littleleaf - Harvest Gold',
        TICOPR: 'Linden, Littleleaf - Prestige',
        TITO: 'Linden, Silver',
        TITOST: 'Linden, Silver - Sterling',
        PLAC: 'London Planetree',
        MAAC: 'Magnolia, Cucumbertree',
        MAST: 'Magnolia, Star',
        ACGI: 'Maple, Amur',
        ACGIFL: 'Maple, Amur - Flame',
        ACGR1: 'Maple, Bigtooth',
        ACNI: 'Maple, Black',
        ACFR: 'Maple, Freeman',
        ACFRAU: 'Maple, Freeman - Autmn Blaze',
        ACFRAD: 'Maple, Freeman - Autumn Delight',
        ACFRMA: 'Maple, Freeman - Marmo',
        ACCA: 'Maple, Hedge',
        ACMI: 'Maple, Miyabe',
        ACMIST: 'Maple, Miyabe - State Street',
        ACPL: 'Maple, Norway',
        ACPLDE: 'Maple, Norway - Deborah',
        ACPLRO: 'Maple, Norway - Royal Red',
        ACGR2: 'Maple, Paperbark',
        ACRU: 'Maple, Red',
        ACTR: 'Maple, Shatung',
        ACTRNO: 'Maple, Shatung - Norwegian Sunset',
        ACTRPA: 'Maple, Shatung - Pacific Sunset',
        ACSA1: 'Maple, Silver',
        ACSA2: 'Maple, Sugar',
        ACSA2CO: 'Maple, Sugar - Commemoration',
        ACSA3GR: 'Maple, Sugar - Majesty',
        ACSA2WB: 'Maple, Sugar - Wright Brothers',
        ACPS: 'Maple, Sycamore',
        ACTA: 'Maple, Tatarian',
        ACBU: 'Maple, Trident',
        SOAM: 'Mountainash, American',
        SOAU: 'Mountainash, European',
        SOAL: 'Mountainash, Korean',
        MOAL: 'Mulberry, White',
        QUMA: 'Oak, Bur',
        QUMU: 'Oak, Chinkapin',
        QURO: 'Oak, English',
        QEROCS: 'Oak, English - Crimson Spire',
        QURORE: 'Oak, English - Regal Prince',
        QUEL: 'Oak, Northern Pin',
        QUPA: 'Oak, Pin',
        QURU: 'Oak, Red',
        QUIM: 'Oak, Shingle',
        QUSH: 'Oak, Swamp Bur',
        QUBI: 'Oak, Swamp White',
        QUAL: 'Oak, White',
        MAPO: 'Osageorange',
        PAPE: 'Parrotia, Persian',
        PINI: 'Pine, Austrian',
        PIHE: 'Pine, Bosnian',
        PIAR: 'Pine, Bristlecone',
        PIST: 'Pine, Eastern White',
        PIBA: 'Pine, Jack',
        PIPA: 'Pine, Japanese White',
        PIKO: 'Pine, Korean',
        PIBU: 'Pine, Lacebark',
        PIFL: 'Pine, Limber',
        PICO: 'Pine, Lodgepole',
        PIMU: 'Pine, Mugo',
        PIPO: 'Pine, Ponderosa',
        PIRE: 'Pine, Red',
        PISY: 'Pine, Scotch',
        PICE: 'Pine, Swiss Stone',
        PONI: 'Poplar, Lombardy Black',
        POAL: 'Poplar, White',
        CECA: 'Redbud, Eastern',
        ELAN: 'Russianolive',
        AMSP: 'Serviceberry',
        AMSPAU: 'Serviceberry - Autumn Birlliance',
        COOB: 'Smoketree',
        PIPU: 'Spruce, Colorado Blue',
        PIAB: 'Spruce, Norway',
        PIOM: 'Spruce, Serbiena',
        PIGL: 'Spruce, White',
        STUM: 'Stump',
        LIST: 'Sweetgum',
        PLOC: 'Sycamore',
        LALA: 'Tamarack',
        LITU: 'Tuliptree',
        COCO: 'Turkish Filbert',
        NA: 'Unknown',
        VACA: 'Vacant Site',
        SASP: 'Willow spp.',
        CLLU: 'Yellowwood, American',
        TACU: 'Yew, Japanese',
        ZESE: 'Zelkova, Japanese',
        ZESEVG: 'Zelkova, Japanese - Village Green'
      },
      Priority: { '1': 'High', '2': 'Low', '3': 'Medium', '4': 'None' },
      PrimaryMaint: {
        '1': 'Plant',
        '2': 'Safety Prune',
        '3': 'Training Prune',
        '4': 'Routine Prune',
        '5': 'Remove',
        '6': 'Stump Removal',
        '7': 'Stake',
        '8': 'Water',
        '9': 'Cable/Brace',
        '10': 'Remove Stakes',
        '11': 'Root Prune',
        '12': "Don't Plant",
        '13': 'Insecticide',
        '14': 'None'
      },
      SecondMaint: {
        '1': 'Plant',
        '2': 'Safety Prune',
        '3': 'Training Prune',
        '4': 'Routine Prune',
        '5': 'Remove',
        '6': 'Stump Removal',
        '7': 'Stake',
        '8': 'Water',
        '9': 'Cable/Brace',
        '10': 'Remove Stakes',
        '11': 'Root Prune',
        '12': "Don't Plant",
        '13': 'Insecticide',
        '14': 'None'
      },
      Location: {
        '1': 'Street Tree',
        '2': 'Park',
        '3': 'Town Property',
        '4': 'Well Site',
        '5': 'Lift Station',
        '6': 'Stormwater',
        '7': 'Cemetery',
        '8': 'Right of Way',
        '9': 'None'
      }
    }
  },
  {
    country: 'United States',
    state: 'South Carolina',
    city: 'Rock Hill',
    designation: 'Winthrop University',
    scope: 'Tree',
    notes: "Downloaded from the ArcGIS Open Data portal | Originally downloaded as two CSV files named 'Tree Inventory (large).csv' and 'Tree Inventory (small)(master).csv' that were merged into a single file",
    download: { checksum: 'c651fa207011d6790eaef8fd71083add' },
    geometry: { x: 'x', y: 'y' },
    srs: 'EPSG:4326'
  },
  {
    country: 'United States',
    state: 'South Dakota',
    city: 'Sioux Falls',
    scope: 'Tree',
    notes: 'geofenced (US)',
    info: 'https://dataworks.siouxfalls.org/datasets/cityofsfgis::trees/about',
    download: {
      arcgis: 'https://gis2.siouxfalls.org/arcgis/rest/services/Data/Trees/MapServer/10'
    },
    crosswalk: {
      ref: 'AssetID',
      location: 'Location',
      common: 'FullName',
      scientific: 'Species',
      family: 'Family',
      crown_ft: 'Spread',
      height_ft: 'Height',
      dbh_in: 'Diameter',
      health: 'Condition',
      note: 'SpecialComments',
      updated: 'last_edited_date'
    },
    license: { id: 'CC-BY-4.0' },
    opentrees_id: 'sioux_falls'
  },
  {
    country: 'United States',
    state: 'South Dakota',
    city: 'Spearfish',
    designation: 'Black Hills State University',
    scope: 'Tree',
    info: 'https://www.bhsu.edu/Faculty-Staff/Campus-Services/Facilities-Services/Sustainability/Tree-Campus-USA',
    download: 'https://google.com/maps/d/u/0/kml?mid=1oS_JtUNVQbQgpz3-2SckEYGq4Ap-DruC&lid=-0kjZeeR9Bw&forcekml=1'
  },
  {
    country: 'United States',
    state: 'Tennessee',
    city: 'Clarksville',
    scope: 'Tree: park',
    info: 'https://www.arcgis.com/home/item.html?id=27df946be9a049dba2b725c13ff67370',
    download: {
      arcgis: 'https://services6.arcgis.com/H9ihyy27OU16MQR3/arcgis/rest/services/Trees_view/FeatureServer/304'
    }
  },
  {
    country: 'United States',
    state: 'Tennessee',
    city: 'Knoxville',
    scope: 'Tree',
    notes: 'unofficial',
    info: 'https://zenodo.org/records/6726506',
    download: 'https://zenodo.org/records/6726506/files/Knoxville_Final_2022-06-18.csv',
    driver: 'CSV',
    geometry: { x: 'longitude_coordinate', y: 'latitude_coordinate' },
    license: { id: 'CC0-1.0' },
    terms: 'McCoy, D., Goulet-Scott, B., Meng, W., Atahan, B., Kiros, H., Nishino, M., & Kartesz, J. (2022). A dataset of 5 million city trees from 63 US cities: species, location, nativity status, health, and more. [Data set]. Zenodo. https://doi.org/10.5061/dryad.2jm63xsrf'
  },
  {
    pending: 'address only',
    country: 'United States',
    state: 'Tennessee',
    city: 'Nashville',
    scope: 'Tree',
    info: 'https://www.nashville.gov/departments/water/stormwater/tree-information/inventory-and-canopy-assessment',
    download: 'https://filetransfer.nashville.gov/portals/0/sitecontent/pw/docs/beautification/tree_canopy/Urban-Tree-Inventory-Data-Loc-Species-Size.xls',
    openFunc: file => helpers.openExcelWithGdal(file, {type: 'file'}),
    fallingfruit_id: 73
  },
  {
    country: 'United States',
    state: 'Texas',
    city: 'Arlington',
    scope: 'Tree: street (main)',
    info: 'https://koordinates.com/layer/97860-arlington-tx-trees/',
    download: {
      arcgis: 'https://gis2.arlingtontx.gov/agsext2/rest/services/Parks/ParksAccessory/MapServer/1'
    }
  },
  {
    country: 'United States',
    state: 'Texas',
    city: 'Austin',
    designation: 'University of Texas',
    scope: 'Tree',
    inactive: true,
    notes: 'Originally downloaded as a KMZ file | Conducted in spring 2007 by University of Texas Landscape Services (https://facilitiesservices.utexas.edu/services/landscape-and-pest-control-services)',
    info: 'http://www.everytrail.com/view_trip.php?trip_id=954189',
    download: { checksum: '7e84f5c6834c46b4531077dc6697facc' },
    geometry: { x: 'Longitude', y: 'Latitude' },
    srs: 'EPSG:4326',
    fallingfruit_id: 228
  },
  {
    country: 'United States',
    state: 'Texas',
    city: 'Austin',
    scope: 'Tree',
    info: 'https://data.austintexas.gov/Locations-and-Maps/Tree-Inventory/wrik-xasw',
    download: {
      arcgis: 'https://services.arcgis.com/0L95CJ0VTaxqcmED/ArcGIS/rest/services/Tree_Inventory/FeatureServer/0'
    },
    crosswalk: {
      scientific: 'SPECIES',
      common: 'COM_NAME',
      dbh_in: 'DBH',
      height_ft: 'HEIGHT',
      health: 'CONDITION',
      location: 'LAND_TYPE'
    },
    license: { id: 'CC-PDM-1.0' },
    fallingfruit_id: 326,
    opentrees_id: 'austin'
  },
  {
    country: 'United States',
    state: 'Texas',
    city: 'Denton',
    designation: 'University of North Texas',
    scope: 'Tree',
    info: 'https://data-untgis.opendata.arcgis.com/datasets/untgis::tree-3/about',
    download: {
      arcgis: 'https://services6.arcgis.com/nwPkaLXTDexHnmsW/arcgis/rest/services/Tree/FeatureServer/0'
    },
    crosswalk: { note: 'NOTES', common: 'NAME_COMN', ref: 'UNT_ID' },
    opentrees_id: 'unt'
  },
  {
    country: 'United States',
    state: 'Texas',
    city: 'El Paso',
    designation: 'University of Texas',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=377ae57c433142928a20a698352003fb',
    download: {
      arcgis: 'https://services3.arcgis.com/yNYLA0jxavf9Ecrz/arcgis/rest/services/UTEP_Campus_Grounds_gdb/FeatureServer/1'
    }
  },
  {
    country: 'United States',
    state: 'Texas',
    city: 'Houston',
    designation: 'Houston Parks Board',
    scope: 'Tree: park',
    info: 'https://www.arcgis.com/home/item.html?id=3e3da366f3e948f79addba740e49d66b',
    download: {
      arcgis: 'https://services6.arcgis.com/Xv3JMHA0Kl8GN3tJ/arcgis/rest/services/HPB_Tree_Inventory/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Texas',
    city: 'Houston',
    scope: 'Tree',
    info: 'https://mycity.maps.arcgis.com/home/item.html?id=c5190fdeff1f42c586b03bfcb5e46784',
    download: {
      arcgis: 'https://services.arcgis.com/NummVBqZSIJKUeVR/arcgis/rest/services/COH_UrbanForestry_Trees_VIEW_ONLY/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Texas',
    city: 'Kerrville',
    scope: 'Tree: partial',
    info: 'https://koordinates.com/layer/20108-kerrville-texas-trees/',
    download: {
      manual: 'https://koordinates.com/layer/20108-kerrville-texas-trees/'
    },
    vfs: '/vsizip/',
    filename: 'kerrville-texas-trees.gdb'
  },
  {
    country: 'United States',
    state: 'Texas',
    city: 'Pearland',
    scope: 'Tree: park',
    info: 'https://koordinates.com/layer/31603-pearland-texas-trees/',
    download: {
      manual: 'https://koordinates.com/layer/31603-pearland-texas-trees/'
    },
    vfs: '/vsizip/',
    filename: 'pearland-texas-trees.gdb'
  },
  {
    country: 'United States',
    state: 'Texas',
    city: 'Richardson',
    scope: 'Tree: park',
    info: 'http://opendata-richardson.opendata.arcgis.com/datasets/trees/about',
    download: {
      arcgis: 'https://maps.cor.gov/arcgis/rest/services/OpenData/Trees/MapServer/0'
    },
    crosswalk: {
      common: 'NAME',
      genus: 'GENUS',
      species: 'SPECIES',
      age: 'TREEAGE',
      dbh_in: 'DIAMETER',
      height_ft: 'HEIGHT',
      owner: 'OWNEDBY',
      structure: 'TRUNKSTRCT',
      note: 'COMMENTS',
      updated: 'last_edited_date'
    },
    terms: 'This data product is free and open access for personal use and adaptation.',
    opentrees_id: 'richardson'
  },
  {
    country: 'United States',
    state: 'Texas',
    city: 'Wylie',
    scope: 'Tree',
    info: 'https://gisdata-wylietx.opendata.arcgis.com/datasets/treesurvey/about',
    download: {
      arcgis: 'https://maps.wylietexas.gov/arcgis/rest/services/ParksDept/TreeSurvey/FeatureServer/0'
    },
    geometry: { x: 'X', y: 'Y' },
    crosswalk: {
      ref: 'TK_ID',
      common: 'COMMON',
      dbh_in: 'DBH',
      health: 'CONDITION',
      updated: 'INSPECT_DT'
    },
    opentrees_id: 'wylie_tx'
  },
  {
    country: 'United States',
    state: 'Utah',
    scope: 'Tree',
    notes: 'aggregate',
    info: 'https://utahdnr.maps.arcgis.com/home/item.html?id=cb15bada7052438aa52f965edefb4225',
    download: {
      arcgis: 'https://services.arcgis.com/ZzrwjTRez6FJiOq4/arcgis/rest/services/UrbanTreeInventory/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Utah',
    scope: 'Tree: notable',
    info: 'https://utahdnr.maps.arcgis.com/home/item.html?id=ee8d5d4e92c344c5b6c2f76c3b7992d3',
    download: {
      arcgis: 'https://services.arcgis.com/ZzrwjTRez6FJiOq4/arcgis/rest/services/Big_Trees/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Utah',
    city: 'Cedar City',
    designation: 'Southern Utah University',
    info: 'https://www.arcgis.com/home/item.html?id=5c726f6b383840d6a155548f4e15c174',
    download: {
      arcgis: 'https://services1.arcgis.com/QsZ6YNp8DCrBlhlg/arcgis/rest/services/SUUTreePUB_view/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Utah',
    city: 'Centerville',
    scope: 'Tree: park',
    info: 'https://www.arcgis.com/home/item.html?id=d29135d70d3b402c8b29a57a2c599186',
    download: {
      arcgis: 'https://services1.arcgis.com/rdQPhMjJQVUQCDzu/arcgis/rest/services/TreeInventory_WFL1/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Utah',
    city: 'Logan',
    designation: 'Utah State University',
    scope: 'Tree',
    inactive: true,
    info: 'http://earth.gis.usu.edu/trees/',
    download: { checksum: '6e4cb7b602136419eb58bc4aa090f335' },
    driver: 'CSV',
    geometry: { x: 'X', y: 'Y' },
    srs: 'EPSG:32612',
    fallingfruit_id: 147
  },
  {
    country: 'United States',
    state: 'Utah',
    city: 'Ogden',
    designation: 'Weber State University',
    scope: 'Tree',
    info: 'http://www.arcgis.com/home/item.html?id=12df9a6b669c492e8c0df0b4a029c49b',
    download: 'https://www.arcgis.com/sharing/rest/content/items/12df9a6b669c492e8c0df0b4a029c49b/data',
    api: 'arcgis-sharing',
    openFunc: file => {
      // title for both: Trees
      const layerNames = ['first_half_7932', 'second_half_6963']
      const files = layerNames.map(layerName =>
        helpers.readEsriFeatureCollectionToVsimem(file, {layerName})
      )
      return helpers.openFileUnionWithGdal(files)
    }
  },
  {
    country: 'United States',
    state: 'Utah',
    city: 'Provo',
    scope: 'Tree',
    info: 'https://opendata.utah.gov/dataset/Trees_1K/595y-dqkb',
    download: 'https://opendata.utah.gov/api/geospatial/595y-dqkb?method=export&format=geojson'
  },
  {
    country: 'United States',
    state: 'Vermont',
    scope: 'Tree',
    notes: 'download: https://anrmaps.vermont.gov/arcgis/rest/services/Open_Data/OPENDATA_ANR_ECOLOGIC_SP_NOCACHE_v1/MapServer/40',
    info: 'https://anropendata-vtanr.opendata.arcgis.com/datasets/VTANR::municipal-tree-inventory-1/about',
    download: 'https://opendata.arcgis.com/api/v3/datasets/2d0401a0ac9d449784ed9b31daabed60_40/downloads/data?format=geojson&spatialRefId=4326&where=1%3D1',
    api: 'arcgis-opendata'
  },
  {
    country: 'United States',
    state: 'Vermont',
    city: 'Burlington',
    scope: 'Tree',
    download: {
      arcgis: 'https://services1.arcgis.com/1bO0c7PxQdsGidPK/arcgis/rest/services/Tree_Sites_Public_View/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Vermont',
    city: 'Essex',
    info: 'https://www.arcgis.com/home/item.html?id=4176c221002a49229a416b65e2c08b5c',
    download: {
      arcgis: 'https://services1.arcgis.com/KVHZNprt62ZdIujN/arcgis/rest/services/EssexUrbanTrees20220407/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Vermont',
    city: 'Essex Junction',
    scope: 'Tree',
    notes: 'Downloaded from the ArcGIS Open Data portal',
    download: { checksum: '0a9c89df26dc20509c83f0fdc76f85e4' },
    geometry: { x: 'x', y: 'y' },
    srs: 'EPSG:4326',
    codes: {
      'gdb_anr_ddev.ANR_ADMIN.EcologicFlora_UrbanTreeInventory_point.SpeciesID': {
        TIAM: 'American basswood',
        ULAM: 'American elm',
        ILOP: 'American holly',
        ACGI: 'Amur maple',
        FR: 'Ash',
        PINI: 'Austrian pine',
        ABBA: 'Balsam fir',
        POBA: 'Balsam poplar',
        TI: 'Basswood',
        FA: 'Beech',
        BE: 'Birch',
        ROPS: 'Black locust',
        PONI: 'Black poplar',
        PIMA: 'Black spruce',
        JUNI: 'Black walnut',
        PIPU: 'Blue spruce',
        PICO5: 'Bolander beach pine',
        ACNE: 'Boxelder',
        'BDL OTHER': 'Broadleaf Deciduous Large',
        'BDM OTHER': 'Broadleaf Deciduous Medium',
        'BDS OTHER': 'Broadleaf Deciduous Small',
        'BEL OTHER': 'Broadleaf Evergreen Large',
        'BEM OTHER': 'Broadleaf Evergreen Medium',
        'BES OTHER': 'Broadleaf Evergreen Small',
        QUMA1: 'Bur oak',
        JUCI: 'Butternut',
        POCA2: 'Carolina poplar',
        CA3: 'Catalpa',
        PRCE: 'Cherry plum',
        ULPA: 'Chinese elm',
        QUMU: 'Chinkapin oak',
        PRVI: 'Common chokecherry',
        JUCO1: 'Common juniper',
        'CEL OTHER': 'Conifer Evergreen Large',
        'CEM OTHER': 'Conifer Evergreen Medium',
        'CES OTHER': 'Conifer Evergreen Small',
        PO: 'Cottonwood',
        MA2: 'Crabapple',
        SAFR: 'Crack willow',
        MEGL: 'Dawn redwood',
        CO1: 'Dogwood',
        PSME: 'Douglas fir',
        JUVI: 'Eastern red cedar',
        CECA: 'Eastern redbud',
        PIST: 'Eastern white pine',
        ULS: 'Elm',
        PIEN: 'Engelmann spruce',
        QURO: 'English oak',
        FASY: 'European beech',
        PRPA: 'European bird cherry',
        RHCA: 'European buckthorn',
        CABE: 'European hornbeam',
        SOAU: 'European mountain ash',
        BEPE: 'European white birch',
        ACFR: 'Freeman maple',
        POFR: 'Fremont cottonwood',
        GIBI: 'Ginkgo',
        FRPE: 'Green ash',
        CR: 'Hawthorn',
        CA1: 'Hickory',
        GLTR: 'Honeylocust',
        LOSP: 'Honeysuckle',
        AEHI: 'Horsechestnut',
        SYRE: 'Japanese tree lilac',
        JU: 'Juniper',
        GYDI: 'Kentucky coffeetree',
        POAC5: 'Lanceleaf cottonwood',
        SYSP: 'Lilac',
        PIFL: 'Limber pine',
        TICO: 'Littleleaf linden',
        PICO: 'Lodgepole pine',
        AC: 'Maple',
        PICE: 'Mexican pinyon',
        SO: 'Mountain ash',
        POAN: 'Narrowleaf cottonwood',
        CASP: 'Northern catalpa',
        CEOC: 'Northern hackberry',
        QURU: 'Northern red oak',
        ACPL: 'Norway maple',
        PIAB: 'Norway spruce',
        QU: 'Oak',
        AEGL: 'Ohio buckeye',
        JUMO: 'One seed juniper',
        BEPA: 'Paper birch',
        MAPU: 'Paradise apple',
        PY: 'Pear',
        QUPA: 'Pin oak',
        PI2: 'Pine',
        PIED: 'Pinyon pine',
        POSA: 'Plains cottonwood',
        PR: 'Plum',
        PIPO: 'Ponderosa pine',
        WISI: 'Purple wisteria',
        SADI: 'Pussy willow',
        POTR1: 'Quaking aspen',
        TH9: 'Red cedar',
        ACRU: 'Red maple',
        MORU: 'Red mulberry',
        PIRU: 'Red spruce',
        BENI: 'River birch',
        JUSC: 'Rocky mountain juniper',
        ACGL: 'Rocky mountain maple',
        ELAN: 'Russian olive',
        QUCO: 'Scarlet oak',
        PISY: 'Scotch pine',
        AM: 'Serviceberry',
        CAOV: 'Shagbark hickory',
        QUSH: 'Shumard oak',
        ULPU: 'Siberian elm',
        ACSA1: 'Silver maple',
        RHGL: 'Smooth sumac',
        MAGR: 'Southern magnolia',
        PIST2: 'Southwestern white pine',
        PI1: 'Spruce',
        RHTY: 'Staghorn sumac',
        ACSA2: 'Sugar maple',
        RHSP: 'Sumac',
        QUBI: 'Swamp white oak',
        PIMU: 'Sweet mountain pine',
        LIST: 'Sweetgum',
        ACTA: 'Tatar maple',
        testerooo: 'test',
        LITU: 'Tulip tree',
        COCO2: 'Turkish hazelnut',
        VACPRIV: 'VACANT - PRIVATE',
        VACPUB: 'VACANT - PUBLIC',
        VACTOWN: 'VACANT - TOWN',
        VACUTIL: 'VACANT - UTIL',
        QUNI: 'Water oak',
        THPL: 'Western redcedar',
        FRAM: 'White ash',
        ABCO: 'White fir',
        POAL: 'White poplar',
        PIGL1: 'White spruce',
        SAAL4: 'White willow',
        SA: 'Willow'
      },
      'gdb_anr_ddev.ANR_ADMIN.EcologicFlora_UrbanTreeInventory_point.Diameter': {
        '1': '0-3"',
        '3': '3-6"',
        '6': '6-12"',
        '12': '12-18"',
        '18': '18-24"',
        '24': '24-30"',
        '30': '30-36"',
        '36': '36-42"',
        '42': '42+"'
      },
      'gdb_anr_ddev.ANR_ADMIN.EcologicFlora_UrbanTreeInventory_point.Remove': {
        No: 'No removal',
        YPRIV: 'Yes, private',
        YPUB: 'Yes, public',
        Ytown: 'Yes, town',
        YUTIL: 'Yes, utility'
      }
    }
  },
  {
    country: 'United States',
    state: 'Virginia',
    designation: 'Arlington County',
    scope: 'Tree',
    info: 'https://arlgis.maps.arcgis.com/home/item.html?id=7d96e6e61ae348959c8ad597ce89539a',
    download: {
      arcgis: 'https://arlgis.arlingtonva.us/arcgis/rest/services/Open_Data/od_DPR_Tree_Points/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Virginia',
    designation: 'Joint Base Langley-Eustis',
    scope: 'Tree',
    info: 'http://www.arcgis.com/home/item.html?id=12d86dc52474435dae2d9280301c8504',
    download: {
      arcgis: 'https://services2.arcgis.com/mFyiztqNioZGXt0j/arcgis/rest/services/Hawktreenasa/FeatureServer/1'
    },
    codes: {
      SPECIES: {
        '1': 'Acer rubrum',
        '2': 'Acer saccharinum',
        '3': 'Amelancher',
        '4': 'Aronia',
        '5': 'Asimina',
        '6': 'Betula nigra',
        '7': 'Carpinus caroliniana',
        '8': 'Carya',
        '9': 'Castanea pumila',
        '10': 'Cedrus deodara',
        '11': 'Celtis occidentalis',
        '12': 'Cercis canadensis',
        '13': 'Chionanthus',
        '14': 'Cornus',
        '15': 'Diospyros',
        '16': 'Fagus grandifolia',
        '17': 'Fraxinus americana',
        '18': 'Gleditsia',
        '19': 'Ilex',
        '20': 'Juglans nigra',
        '21': 'Juniperus virginiana',
        '22': 'Lagerstroemia',
        '23': 'Liriodendron tulipeifera',
        '24': 'Liquidambar styraciflua',
        '25': 'Malus hybrida',
        '26': 'Magnolia grandiflora',
        '27': 'Magnolia stellata',
        '28': 'Magnolia virginiana',
        '29': 'Morus',
        '30': 'Myrica cerefera',
        '31': 'Nyssa sylvatica',
        '32': 'Ostrya virginiana',
        '33': 'Pinus palustris',
        '34': 'Pinus serotina',
        '35': 'Pinus taeda',
        '36': 'Pinus virginiana',
        '37': 'Platanus occidentalis',
        '38': 'Prunus',
        '39': 'Pyrus calleryana',
        '40': 'Quercus alba',
        '41': 'Quercus coccinea',
        '42': 'Quercus falcata',
        '43': 'Quercus laurifolia',
        '44': 'Quercus michauxii',
        '45': 'Quercus nigra',
        '46': 'Quercus palustris',
        '47': 'Quercus phellos',
        '48': 'Quercus shumardii',
        '49': 'Quercus stellata',
        '50': 'Quercus velutina',
        '51': 'Quercus virginiana',
        '52': 'Salix',
        '53': 'Taxcodium distichum',
        '54': 'Tilia',
        '55': 'Ulmus',
        '56': 'Other',
        '57': 'Unknown'
      }
    }
  },
  {
    country: 'United States',
    state: 'Virginia',
    designation: 'Loudoun County',
    scope: 'Tree',
    notes: 'Downloaded from the ArcGIS Open Data portal',
    download: { checksum: '2da8f30fd31e987af3c7104a77bebbae' },
    geometry: { x: 'x', y: 'y' },
    srs: 'EPSG:4326'
  },
  {
    country: 'United States',
    state: 'Virginia',
    designation: 'Prince William County',
    scope: 'Tree: park',
    info: 'https://koordinates.com/layer/99603-prince-william-county-virginia-trees/',
    download: {
      manual: 'https://koordinates.com/layer/99603-prince-william-county-virginia-trees/'
    },
    vfs: '/vsizip/',
    filename: 'prince-william-county-virginia-trees.gdb'
  },
  {
    country: 'United States',
    state: 'Virginia',
    city: 'Arlington',
    designation: 'West Village of Shirlington',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=1bce5340b9ed40b8a57745f7986a79c0',
    download: {
      arcgis: 'https://services.arcgis.com/VgmyyKiMPvUPgldo/arcgis/rest/services/West_Village_of_Shirlington_2018/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Virginia',
    city: 'Blacksburg',
    designation: 'Virginia Tech',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=cc53f7c5a6d64302ba05f199be69a95e',
    download: {
      arcgis: 'https://utility.arcgis.com/usrsvcs/servers/cc53f7c5a6d64302ba05f199be69a95e/rest/services/facilities/Campus_Trees/MapServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Virginia',
    city: 'Charlottesville',
    scope: 'Tree',
    info: 'https://opendata.charlottesville.org/datasets/tree-inventory-point/about',
    download: {
      arcgis: 'https://gisweb.charlottesville.org/cvgisweb/rest/services/OpenData_1/MapServer/79'
    },
    delFunc: x => x.Removal_Date,
    crosswalk: {
      planted: 'Install_Date',
      common: 'Common_Name',
      owner: 'Agency',
      genus: 'Genus',
      species: 'Species',
      updated: 'last_edited_date'
    },
    license: { id: 'CC-BY-4.0' },
    opentrees_id: 'charlottesville_nc'
  },
  {
    country: 'United States',
    state: 'Virginia',
    city: 'Falls Church',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=1ea12a4063304ad38f2a3a42b6058f42',
    download: {
      arcgis: 'https://services.arcgis.com/VgmyyKiMPvUPgldo/arcgis/rest/services/Falls_Church_City_Hall_Tree_Inventory_and_Management_Plan/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Virginia',
    city: 'Richmond',
    designation: 'University of Richmond',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=d161936f7fe44439ba8e2700fb0414da',
    download: {
      arcgis: 'https://services.arcgis.com/ak2bo87wLfUpMrt1/arcgis/rest/services/UR_Campus_Tree_Inventory_2022/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Virginia',
    city: 'Richmond',
    scope: 'Tree: street',
    info: 'https://www.arcgis.com/home/item.html?id=7d747955b25a410eb8f749c320852cc2',
    download: {
      arcgis: 'https://services1.arcgis.com/k3vhq11XkBNeeOfM/arcgis/rest/services/Natural/FeatureServer/2'
    }
  },
  {
    country: 'United States',
    state: 'Virginia',
    city: 'Richmond',
    scope: 'Tree: other',
    info: 'https://www.arcgis.com/home/item.html?id=7d747955b25a410eb8f749c320852cc2',
    download: {
      arcgis: 'https://services1.arcgis.com/k3vhq11XkBNeeOfM/arcgis/rest/services/Natural/FeatureServer/3'
    }
  },
  {
    country: 'United States',
    state: 'Virginia',
    city: 'West Springfield',
    designation: 'Danbury Forest',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=69e02e37aec543aca60df5c83359c413',
    download: {
      arcgis: 'https://services.arcgis.com/VgmyyKiMPvUPgldo/arcgis/rest/services/2020_Danbury_Forest_Tree_Inventory/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Virginia',
    city: 'West Village Of Shirlington',
    scope: 'Tree',
    info: 'http://www.arcgis.com/home/item.html?id=1df6203b71904c7783ec75faaa682029',
    download: {
      arcgis: 'https://services.arcgis.com/VgmyyKiMPvUPgldo/arcgis/rest/services/West_Village_of_Shirlington_tree_inventory_and_management_plan/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Washington',
    designation: 'Washington State Parks',
    scope: 'Tree: notable',
    info: 'https://geo.wa.gov/datasets/wa-stateparks::historic-oldgrowth-tree-point/about',
    download: {
      arcgis: 'https://services5.arcgis.com/4LKAHwqnBooVDUlX/arcgis/rest/services/PARKS_Historic_Old_Growth_Trees/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Washington',
    city: 'Beaux Arts Village',
    scope: 'Tree: street',
    info: 'https://www.arcgis.com/home/item.html?id=1f9d5f61774045e39277782739e76df1',
    download: {
      arcgis: 'https://services6.arcgis.com/h65OdekHK2g4RWMZ/arcgis/rest/services/BAV_2022_ROW_Complete/FeatureServer/8'
    }
  },
  {
    country: 'United States',
    state: 'Washington',
    city: 'Bellingham',
    designation: 'downtown',
    scope: 'Tree: street',
    info: 'https://www.arcgis.com/home/item.html?id=df9cf5501bf549a3acd42cc080840e11',
    download: {
      arcgis: 'https://services1.arcgis.com/mg5xPlZs10O6tWPP/arcgis/rest/services/Tree_Inventory_ViewOnly/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Washington',
    city: 'Bellingham',
    scope: 'Tree: notable',
    info: 'https://www.arcgis.com/home/item.html?id=bb963f358ae5427fb6c93fcdcbb2c1c6',
    download: {
      arcgis: 'https://services.arcgis.com/qboYD3ru0louQq4F/arcgis/rest/services/tree_pts/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Washington',
    city: 'Camas',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=7f68472c2ab24f03871f69fffc2b5732',
    download: {
      arcgis: 'https://services6.arcgis.com/vkqYJw02wbr9rLv8/arcgis/rest/services/Tree_Inventory/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Washington',
    city: 'Covington',
    info: 'https://www.arcgis.com/home/item.html?id=22c5b86f878643e7979834ab5aaf4280',
    download: {
      arcgis: 'https://services6.arcgis.com/yfG2KMmLkmUJvyKS/arcgis/rest/services/Tree_Inventory_04142023/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Washington',
    city: 'Edmonds',
    designation: 'Brooke Acre Estates',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=bac5877e30514a4eb75ad5745ef8c687',
    download: {
      arcgis: 'https://services6.arcgis.com/h65OdekHK2g4RWMZ/arcgis/rest/services/Brookacres_TreeAssessment_2022/FeatureServer/40'
    }
  },
  {
    country: 'United States',
    state: 'Washington',
    city: 'Oak Harbor',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=ebd124703324478787010c325a9c0f73',
    download: {
      arcgis: 'https://services9.arcgis.com/SVlf413Qqlzv09Uo/arcgis/rest/services/Tree_Inventory/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Washington',
    city: 'Olympia',
    scope: 'Tree: street',
    notes: 'unofficial',
    info: 'https://www.arcgis.com/home/item.html?id=46643ecfd9ca4118a090f5380de80d88',
    download: {
      arcgis: 'https://services3.arcgis.com/0IbpLwS460cn4psv/arcgis/rest/services/Street_Tree_Points/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Washington',
    city: 'Pullman',
    designation: 'Washington State University',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=d2260e07fae34a8eba4438163ad94d2c',
    download: {
      arcgis: 'https://services6.arcgis.com/AK42VSd2ESNY4Vkp/arcgis/rest/services/Tree_Inventory_(ViewLayer)/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Washington',
    city: 'Puyallup',
    scope: 'Tree',
    info: 'https://gis-portal-puyallup.opendata.arcgis.com/datasets/puyallup::city-maintained-street-trees/about',
    download: {
      arcgis: 'https://services8.arcgis.com/5K6vnOH0GkPyJs6A/arcgis/rest/services/City_Maintained_Street_Trees/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Washington',
    city: 'Redmond',
    info: 'https://www.arcgis.com/home/item.html?id=32f7c09444c74b9ca9521eee96bab71b',
    download: {
      arcgis: 'https://services7.arcgis.com/9u5SMK7jcrQbBJIC/arcgis/rest/services/TreeSite/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Washington',
    city: 'Renton',
    scope: 'Tree',
    inactive: true,
    notes: 'Originally downloaded as a zip file with multiple layers',
    info: 'https://www.rentonwa.gov/city_hall/executive_services/Information_technology/maps___g_i_s_data/data_download',
    download: 'https://gismaps.rentonwa.gov/GISIMAGES/TEMPDOWNLOAD/zipfiles/ParksAndRecreationGDB.zip',
    vfs: '/vsizip/'
  },
  {
    country: 'United States',
    state: 'Washington',
    city: 'Seattle',
    designation: 'Seattle Pacific University',
    scope: 'Tree',
    notes: 'partial overlap with City of Seattle',
    info: 'https://www.arcgis.com/home/item.html?id=765e3963fd6b40c1a0adae1a529e9a4b',
    download: {
      arcgis: 'https://services6.arcgis.com/h65OdekHK2g4RWMZ/arcgis/rest/services/SPU_Campus_Tree_Inventory_05262022/FeatureServer/47'
    }
  },
  {
    country: 'United States',
    state: 'Washington',
    city: 'Seattle',
    scope: 'Tree',
    info: 'https://data-seattlecitygis.opendata.arcgis.com/datasets/trees/about',
    download: {
      arcgis: 'https://gisdata.seattle.gov/server/rest/services/SDOT/SDOT_Assets/MapServer/6'
    },
    crosswalk: {
      ref: 'UNITID',
      health: x => ['Very poor', 'Poor', 'Fair', 'Good', 'Excellent'][x.CONDITIO_3 - 1],
      owner: 'OWNERSHIP',
      updated: 'LAST_VERIF',
      planted: 'PLANTED_DA',
      scientific: 'SCIENTIFIC',
      common: 'COMMON_NAM',
      height_ft: 'TREEHEIGHT',
      dbh_in: 'DIAM'
    },
    fallingfruit_id: 99,
    opentrees_id: 'seattle'
  },
  {
    country: 'United States',
    state: 'Washington',
    city: 'Shoreline',
    scope: 'Tree',
    info: 'https://shoreline.maps.arcgis.com/home/item.html?id=04f53c8bebf04d96a4ec0146eb6b595c',
    download: {
      arcgis: 'https://smaps.shorelinewa.gov/server/rest/services/PRCS/Trees/MapServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Washington',
    city: 'Spokane',
    scope: 'Tree',
    notes: 'Received from colleagues in Spokane | 2012 inventory of public trees by the City of Spokane Urban Foretry Program | Originally provided as a Microsoft Access database with multiple tables and manually converted to a CSV file',
    download: { checksum: '38ff6a9cb5f82aebcd32e7e4b971e06a' },
    geometry: { x: 'Lng', y: 'Lat' },
    srs: 'EPSG:4326',
    fallingfruit_id: 355
  },
  {
    country: 'United States',
    state: 'Washington',
    city: 'Tumwater',
    scope: 'Tree: street',
    info: 'https://www.arcgis.com/home/item.html?id=50c28285b3ad4063b91fd574b34978bd',
    download: {
      arcgis: 'https://services6.arcgis.com/ovypB8ighP2NPfFE/ArcGIS/rest/services/Street_Trees/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'West Virginia',
    city: 'Institute',
    designation: 'West Virginia State University',
    info: 'https://www.arcgis.com/home/item.html?id=8c2dcd81a2fa4fd49aceca21f36b35af',
    download: {
      arcgis: 'https://services5.arcgis.com/XQuwwPae94LHONaL/arcgis/rest/services/WVSU_Tree_Inventory/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Wisconsin',
    city: 'Adams',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=02711cf7afa841ada04dd9abcf0a4bb0',
    download: {
      arcgis: 'https://services9.arcgis.com/xvpIhHR1R7shnhSg/arcgis/rest/services/Tree_Inventory_(Public_View)/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Wisconsin',
    city: 'Ashland',
    designation: 'Ashland Housing Authority',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=a264727c38684ed78b66bd927f7861d2',
    download: {
      arcgis: 'https://services5.arcgis.com/tDXj154iVHABwGu6/arcgis/rest/services/Ashland_HOUSING_AUTHORITY_Tree_Inventory_Public/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Wisconsin',
    city: 'Elroy',
    scope: 'Tree',
    notes: 'Downloaded from the ArcGIS Open Data portal',
    download: { checksum: '497ef5b647499a44249765d9b5e24606' },
    geometry: { x: 'x', y: 'y' },
    srs: 'EPSG:4326'
  },
  {
    country: 'United States',
    state: 'Wisconsin',
    city: 'Greenville',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=2d5e76388f5e490a967d462609972c65',
    download: {
      arcgis: 'https://arcgis.townofgreenville.com/server/rest/services/TreePublic/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Wisconsin',
    city: 'Hartford',
    scope: 'Tree: street',
    info: 'https://www.arcgis.com/home/item.html?id=e1c6e61ee44246828d93da93a8fbe593',
    download: {
      arcgis: 'https://services5.arcgis.com/j0UfBSlXJiINWcjz/arcgis/rest/services/Street_Trees/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Wisconsin',
    city: 'Hillsboro',
    scope: 'Tree',
    notes: 'Downloaded from the ArcGIS Open Data portal',
    download: { checksum: '42e71a6d274bb60452fa7b8e8c682b31' },
    geometry: { x: 'x', y: 'y' },
    srs: 'EPSG:4326'
  },
  {
    country: 'United States',
    state: 'Wisconsin',
    city: 'Kenosha',
    designation: 'Gateway Technical College',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=5ec206cb956247cd87ed6f54e21e299c',
    download: {
      arcgis: 'https://services3.arcgis.com/qt1iymA3IISB4iUl/arcgis/rest/services/Gateway_Tree_Inventory_2022/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Wisconsin',
    city: 'Kenosha',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=c7cf596d27a7455e83261a189e57ffbc',
    download: {
      arcgis: 'https://services1.arcgis.com/dEWY7aW7h9zHrSP9/arcgis/rest/services/Tree_Inventory_PublicView/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Wisconsin',
    city: 'Madison',
    designation: 'Vilas Park',
    scope: 'Tree: park',
    info: 'https://www.arcgis.com/home/item.html?id=abc32ed4c1294f0e93f631f8edd314af',
    download: {
      arcgis: 'https://services2.arcgis.com/F0eFMri3OWS05kGc/arcgis/rest/services/Vilas_Park_Tree_Inventory/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Wisconsin',
    city: 'Madison',
    scope: 'Tree',
    info: 'https://data-cityofmadison.opendata.arcgis.com/datasets/street-trees/about',
    download: {
      arcgis: 'https://maps.cityofmadison.com/arcgis/rest/services/Public/OPEN_DATA/MapServer/0'
    },
    crosswalk: { ref: 'OBJECTID', dbh_in: 'DIAMETER' },
    opentrees_id: 'madison'
  },
  {
    country: 'United States',
    state: 'Wisconsin',
    city: 'Mauston',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=f918d48e26ca4c46832c99b5bf49ff01',
    download: {
      arcgis: 'https://services7.arcgis.com/bT3EoWZjN5T5Pbld/arcgis/rest/services/JuneauCo_MaustonTrees/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Wisconsin',
    city: 'Milwaukee',
    scope: 'Tree',
    notes: 'unofficial',
    info: 'https://zenodo.org/records/6726506',
    download: 'https://zenodo.org/records/6726506/files/Milwaukee_Final_2022-06-18.csv',
    driver: 'CSV',
    geometry: { x: 'longitude_coordinate', y: 'latitude_coordinate' },
    license: { id: 'CC0-1.0' },
    terms: 'McCoy, D., Goulet-Scott, B., Meng, W., Atahan, B., Kiros, H., Nishino, M., & Kartesz, J. (2022). A dataset of 5 million city trees from 63 US cities: species, location, nativity status, health, and more. [Data set]. Zenodo. https://doi.org/10.5061/dryad.2jm63xsrf'
  },
  {
    country: 'United States',
    state: 'Wisconsin',
    city: 'Monona',
    designation: 'San Damiano Park',
    scope: 'Tree: park',
    info: 'https://www.arcgis.com/home/item.html?id=8dd1f0405f42452fa1301d2908696af3',
    download: {
      arcgis: 'https://services2.arcgis.com/F0eFMri3OWS05kGc/arcgis/rest/services/City_of_Monona_San_Damiano_Tree_Inventory_view/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Wisconsin',
    city: 'Necedah',
    scope: 'Tree',
    notes: 'Downloaded from the ArcGIS Open Data portal',
    download: { checksum: '81d349768c3701dfd39db6a95e71a102' },
    geometry: { x: 'x', y: 'y' },
    srs: 'EPSG:4326'
  },
  {
    country: 'United States',
    state: 'Wisconsin',
    city: 'Onalaska',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=9f92644efbd549058768eb5aa0d28ddb',
    download: {
      arcgis: 'https://services1.arcgis.com/VMiHKHuCDWhb8bY8/arcgis/rest/services/TreeInventory_Public/FeatureServer/0'
    },
    terms: 'Public Use.'
  },
  {
    country: 'United States',
    state: 'Wisconsin',
    city: 'Rhinelander',
    info: 'https://www.arcgis.com/home/item.html?id=18590cff66e54ebe8e95b25aae363ef4',
    download: {
      arcgis: 'https://services8.arcgis.com/ZlFI0h3OjcOM6gIa/arcgis/rest/services/Tree_Inventory_ViewLayer/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Wisconsin',
    city: 'Ripon',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=559f675215d1489e8f740cc8753e05ca',
    download: {
      arcgis: 'https://services6.arcgis.com/HgNfRkflJeXTPgge/arcgis/rest/services/Tree_Inventory_view/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Wisconsin',
    city: 'Sherwood',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=e29362f8e39f4e3bb04c90cb7a578aef',
    download: {
      arcgis: 'https://services6.arcgis.com/WCuPctHy89ccTjFo/arcgis/rest/services/Tree_Inventory_Viewer/FeatureServer/1'
    }
  },
  {
    country: 'United States',
    state: 'Wisconsin',
    city: 'Sparta',
    info: 'https://www.arcgis.com/home/item.html?id=4e0c2a86ef964b519a71d3ce3653db5b',
    download: {
      arcgis: 'https://services7.arcgis.com/ob3iBq0CA0JS6eE3/arcgis/rest/services/TreeInventory2021_view/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Wisconsin',
    city: 'Stoughton',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=f7fa8d791e8f4aefbd07c01b9d57c52b',
    download: {
      arcgis: 'https://services7.arcgis.com/iZIPdzAfqdnP9vrA/arcgis/rest/services/Tree_Inventory_(Public)/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Wisconsin',
    city: 'Suamico',
    designation: 'NEW Zoo & Adventure Park',
    scope: 'Tree: park',
    notes: 'Private property | Downloaded from the ArcGIS Open Data portal',
    download: { checksum: 'c119e0784af2ca4a01fc4b9d8f3f3950' },
    driver: 'CSV',
    geometry: { x: 'x', y: 'y' },
    srs: 'EPSG:4326',
    codes: {
      OWNEDBY: { '1': 'Our Agency', '-1': 'Private', '-2': 'Other' },
      MAINTBY: { '1': 'Our Agency', '-1': 'Private', '-2': 'Other' }
    }
  },
  {
    country: 'United States',
    state: 'Wyoming',
    designation: 'Community Tree Inventories',
    scope: 'Tree',
    notes: 'Includes (2023-11-20): Ucross; Laramie County Community College, Cheyenne; Buffalo Golf Club, Buffalo',
    info: 'https://www.arcgis.com/home/item.html?id=45af0de8750c4e2698e9e14c8129591e',
    download: {
      arcgis: 'https://services1.arcgis.com/i5xRZLABP6oUOcld/ArcGIS/rest/services/CommunityTreeInventoryDataCollection/FeatureServer/0'
    },
    terms: 'The authorized use of this data is limited to informational and educational purposes only, and NOT for operational or commercial purposes.'
  },
  {
    country: 'United States',
    state: 'Wyoming',
    city: 'Clearmont',
    designation: 'Apache Corporation',
    scope: 'Tree',
    info: 'http://www.arcgis.com/home/item.html?id=3e138f53f3ca4eb896aa8a28c1aa94e5',
    download: 'https://www.arcgis.com/sharing/rest/content/items/3e138f53f3ca4eb896aa8a28c1aa94e5/data',
    api: 'arcgis-sharing',
    openFunc: file => helpers.openEsriFeatureCollectionWithGdal(
      file, {layerName: 'FINAL_TREES_7991'}
    )
  },
  {
    country: 'United States',
    state: 'Wyoming',
    city: 'Gillette',
    designation: 'Gillette College',
    scope: 'Tree',
    info: 'http://www.arcgis.com/home/item.html?id=31565a4a71064b81a3f4896fc9b2c6a1',
    download: 'https://www.arcgis.com/sharing/rest/content/items/31565a4a71064b81a3f4896fc9b2c6a1/data',
    api: 'arcgis-sharing',
    openFunc: file => helpers.openEsriFeatureCollectionWithGdal(file)
  },
  {
    country: 'United States',
    state: 'Wyoming',
    city: 'Laramie',
    scope: 'Tree: street',
    info: 'http://www.arcgis.com/home/item.html?id=95f4c5847dae4327a56b3bae2cd53e43',
    download: {
      arcgis: 'https://services1.arcgis.com/i5xRZLABP6oUOcld/arcgis/rest/services/Laramie_StreetTrees/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Wyoming',
    city: 'Laramie',
    scope: 'Tree: other',
    info: 'http://www.arcgis.com/home/item.html?id=0efcd2ce32b44b29b6bd28e432600a9f',
    download: {
      arcgis: 'https://services1.arcgis.com/i5xRZLABP6oUOcld/arcgis/rest/services/Laramie_OtherTrees/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Wyoming',
    city: 'Laramie',
    scope: 'Tree: park',
    info: 'http://www.arcgis.com/home/item.html?id=01cbdc6fba964b4a963155277936c049',
    download: {
      arcgis: 'https://services1.arcgis.com/i5xRZLABP6oUOcld/arcgis/rest/services/Laramie_ParkTrees/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'Wyoming',
    city: 'Sheridan',
    designation: 'Sheridan College',
    scope: 'Tree',
    info: 'https://www.arcgis.com/home/item.html?id=d7a352437cc2486dbf66dabcb2c3b885',
    download: 'https://www.arcgis.com/sharing/rest/content/items/d7a352437cc2486dbf66dabcb2c3b885/data',
    api: 'arcgis-sharing',
    openFunc: file => helpers.openEsriFeatureCollectionWithGdal(file)
  },
  {
    country: 'United States',
    state: 'Wyoming',
    city: 'Sheridan',
    designation: 'Whitney Commons Park',
    scope: 'Tree: park',
    info: 'http://www.arcgis.com/home/item.html?id=3ef60cc5ecad4b0aadac4496ffe3acb0',
    download: 'https://www.arcgis.com/sharing/rest/content/items/3ef60cc5ecad4b0aadac4496ffe3acb0/data',
    api: 'arcgis-sharing',
    openFunc: file => helpers.openEsriFeatureCollectionWithGdal(
      file, {layerName: 'Whitney_Commons_Final_Inventory_2935'}
    )
  },
  {
    pending: 'address only',
    country: 'Uruguay',
    state: 'Montevideo',
    city: 'Montevideo',
    designation: 'Centro Comunal Zonal 1',
    scope: 'Tree',
    info: [
      'https://catalogodatos.gub.uy/dataset/intendencia-montevideo-censo-de-arbolado-2008',
      {file: 'https://catalogodatos.gub.uy/dataset/6d770b32-6baf-49bf-8d3c-6a1e2f626947/resource/c799548d-e9bb-492b-9179-53de2b748d43/download/referencias.txt'},
      {file: 'https://catalogodatos.gub.uy/dataset/6d770b32-6baf-49bf-8d3c-6a1e2f626947/resource/5416308f-256f-4d7a-afaf-336a8e872a70/download/codigos-de-especie.csv'}
    ],
    download: 'https://catalogodatos.gub.uy/dataset/6d770b32-6baf-49bf-8d3c-6a1e2f626947/resource/3572ea34-9dc4-4fd6-b3d4-c1d5ba8cd3bb/download/archivo_comunal1.csv',
    driver: 'CSV',
    license: {
      name: 'Licencia de Datos Abiertos – Uruguay 0.1',
      url: {file: 'https://www.gub.uy/agencia-gobierno-electronico-sociedad-informacion-conocimiento/sites/agencia-gobierno-electronico-sociedad-informacion-conocimiento/files/documentos/publicaciones/licencia_de_datos_abiertos_0.pdf'}
    }
  },
  {
    pending: 'address only',
    country: 'Uruguay',
    state: 'Montevideo',
    city: 'Montevideo',
    designation: 'Centro Comunal Zonal 10',
    scope: 'Tree',
    info: [
      'https://catalogodatos.gub.uy/dataset/intendencia-montevideo-censo-de-arbolado-2008',
      {file: 'https://catalogodatos.gub.uy/dataset/6d770b32-6baf-49bf-8d3c-6a1e2f626947/resource/c799548d-e9bb-492b-9179-53de2b748d43/download/referencias.txt'},
      {file: 'https://catalogodatos.gub.uy/dataset/6d770b32-6baf-49bf-8d3c-6a1e2f626947/resource/5416308f-256f-4d7a-afaf-336a8e872a70/download/codigos-de-especie.csv'}
    ],
    download: 'https://catalogodatos.gub.uy/dataset/6d770b32-6baf-49bf-8d3c-6a1e2f626947/resource/57bd8340-955f-467d-bcb8-b6abf86413a5/download/archivo_comunal10.csv',
    driver: 'CSV',
    license: {
      name: 'Licencia de Datos Abiertos – Uruguay 0.1',
      url: {file: 'https://www.gub.uy/agencia-gobierno-electronico-sociedad-informacion-conocimiento/sites/agencia-gobierno-electronico-sociedad-informacion-conocimiento/files/documentos/publicaciones/licencia_de_datos_abiertos_0.pdf'}
    }
  },
  {
    pending: 'address only',
    country: 'Uruguay',
    state: 'Montevideo',
    city: 'Montevideo',
    designation: 'Centro Comunal Zonal 11',
    scope: 'Tree',
    info: [
      'https://catalogodatos.gub.uy/dataset/intendencia-montevideo-censo-de-arbolado-2008',
      {file: 'https://catalogodatos.gub.uy/dataset/6d770b32-6baf-49bf-8d3c-6a1e2f626947/resource/c799548d-e9bb-492b-9179-53de2b748d43/download/referencias.txt'},
      {file: 'https://catalogodatos.gub.uy/dataset/6d770b32-6baf-49bf-8d3c-6a1e2f626947/resource/5416308f-256f-4d7a-afaf-336a8e872a70/download/codigos-de-especie.csv'}
    ],
    download: 'https://catalogodatos.gub.uy/dataset/6d770b32-6baf-49bf-8d3c-6a1e2f626947/resource/1da9f485-abcf-495f-8fb4-3502579c863a/download/archivo_comunal11.csv',
    driver: 'CSV',
    license: {
      name: 'Licencia de Datos Abiertos – Uruguay 0.1',
      url: {file: 'https://www.gub.uy/agencia-gobierno-electronico-sociedad-informacion-conocimiento/sites/agencia-gobierno-electronico-sociedad-informacion-conocimiento/files/documentos/publicaciones/licencia_de_datos_abiertos_0.pdf'}
    }
  },
  {
    pending: 'address only',
    country: 'Uruguay',
    state: 'Montevideo',
    city: 'Montevideo',
    designation: 'Centro Comunal Zonal 12',
    scope: 'Tree',
    info: [
      'https://catalogodatos.gub.uy/dataset/intendencia-montevideo-censo-de-arbolado-2008',
      {file: 'https://catalogodatos.gub.uy/dataset/6d770b32-6baf-49bf-8d3c-6a1e2f626947/resource/c799548d-e9bb-492b-9179-53de2b748d43/download/referencias.txt'},
      {file: 'https://catalogodatos.gub.uy/dataset/6d770b32-6baf-49bf-8d3c-6a1e2f626947/resource/5416308f-256f-4d7a-afaf-336a8e872a70/download/codigos-de-especie.csv'}
    ],
    download: 'https://catalogodatos.gub.uy/dataset/6d770b32-6baf-49bf-8d3c-6a1e2f626947/resource/7c6edc37-4c96-425c-a429-9f2e2fb877e7/download/archivo_comunal12.csv',
    driver: 'CSV',
    license: {
      name: 'Licencia de Datos Abiertos – Uruguay 0.1',
      url: {file: 'https://www.gub.uy/agencia-gobierno-electronico-sociedad-informacion-conocimiento/sites/agencia-gobierno-electronico-sociedad-informacion-conocimiento/files/documentos/publicaciones/licencia_de_datos_abiertos_0.pdf'}
    }
  },
  {
    pending: 'address only',
    country: 'Uruguay',
    state: 'Montevideo',
    city: 'Montevideo',
    designation: 'Centro Comunal Zonal 13',
    scope: 'Tree',
    info: [
      'https://catalogodatos.gub.uy/dataset/intendencia-montevideo-censo-de-arbolado-2008',
      {file: 'https://catalogodatos.gub.uy/dataset/6d770b32-6baf-49bf-8d3c-6a1e2f626947/resource/c799548d-e9bb-492b-9179-53de2b748d43/download/referencias.txt'},
      {file: 'https://catalogodatos.gub.uy/dataset/6d770b32-6baf-49bf-8d3c-6a1e2f626947/resource/5416308f-256f-4d7a-afaf-336a8e872a70/download/codigos-de-especie.csv'}
    ],
    download: 'https://catalogodatos.gub.uy/dataset/6d770b32-6baf-49bf-8d3c-6a1e2f626947/resource/50626e2c-2150-4ffa-9578-54f10d2dbd0b/download/archivo_comunal13.csv',
    driver: 'CSV',
    license: {
      name: 'Licencia de Datos Abiertos – Uruguay 0.1',
      url: {file: 'https://www.gub.uy/agencia-gobierno-electronico-sociedad-informacion-conocimiento/sites/agencia-gobierno-electronico-sociedad-informacion-conocimiento/files/documentos/publicaciones/licencia_de_datos_abiertos_0.pdf'}
    }
  },
  {
    pending: 'address only',
    country: 'Uruguay',
    state: 'Montevideo',
    city: 'Montevideo',
    designation: 'Centro Comunal Zonal 14',
    scope: 'Tree',
    info: [
      'https://catalogodatos.gub.uy/dataset/intendencia-montevideo-censo-de-arbolado-2008',
      {file: 'https://catalogodatos.gub.uy/dataset/6d770b32-6baf-49bf-8d3c-6a1e2f626947/resource/c799548d-e9bb-492b-9179-53de2b748d43/download/referencias.txt'},
      {file: 'https://catalogodatos.gub.uy/dataset/6d770b32-6baf-49bf-8d3c-6a1e2f626947/resource/5416308f-256f-4d7a-afaf-336a8e872a70/download/codigos-de-especie.csv'}
    ],
    download: 'https://catalogodatos.gub.uy/dataset/6d770b32-6baf-49bf-8d3c-6a1e2f626947/resource/992b16cb-f560-42f1-b453-6e2303be9ca6/download/archivo_comunal14.csv',
    driver: 'CSV',
    license: {
      name: 'Licencia de Datos Abiertos – Uruguay 0.1',
      url: {file: 'https://www.gub.uy/agencia-gobierno-electronico-sociedad-informacion-conocimiento/sites/agencia-gobierno-electronico-sociedad-informacion-conocimiento/files/documentos/publicaciones/licencia_de_datos_abiertos_0.pdf'}
    }
  },
  {
    pending: 'address only',
    country: 'Uruguay',
    state: 'Montevideo',
    city: 'Montevideo',
    designation: 'Centro Comunal Zonal 15',
    scope: 'Tree',
    info: [
      'https://catalogodatos.gub.uy/dataset/intendencia-montevideo-censo-de-arbolado-2008',
      {file: 'https://catalogodatos.gub.uy/dataset/6d770b32-6baf-49bf-8d3c-6a1e2f626947/resource/c799548d-e9bb-492b-9179-53de2b748d43/download/referencias.txt'},
      {file: 'https://catalogodatos.gub.uy/dataset/6d770b32-6baf-49bf-8d3c-6a1e2f626947/resource/5416308f-256f-4d7a-afaf-336a8e872a70/download/codigos-de-especie.csv'}
    ],
    download: 'https://catalogodatos.gub.uy/dataset/6d770b32-6baf-49bf-8d3c-6a1e2f626947/resource/43342c19-da4a-469d-959f-bde826edb10c/download/archivo_comunal15.csv',
    driver: 'CSV',
    license: {
      name: 'Licencia de Datos Abiertos – Uruguay 0.1',
      url: {file: 'https://www.gub.uy/agencia-gobierno-electronico-sociedad-informacion-conocimiento/sites/agencia-gobierno-electronico-sociedad-informacion-conocimiento/files/documentos/publicaciones/licencia_de_datos_abiertos_0.pdf'}
    }
  },
  {
    pending: 'address only',
    country: 'Uruguay',
    state: 'Montevideo',
    city: 'Montevideo',
    designation: 'Centro Comunal Zonal 16',
    scope: 'Tree',
    info: [
      'https://catalogodatos.gub.uy/dataset/intendencia-montevideo-censo-de-arbolado-2008',
      {file: 'https://catalogodatos.gub.uy/dataset/6d770b32-6baf-49bf-8d3c-6a1e2f626947/resource/c799548d-e9bb-492b-9179-53de2b748d43/download/referencias.txt'},
      {file: 'https://catalogodatos.gub.uy/dataset/6d770b32-6baf-49bf-8d3c-6a1e2f626947/resource/5416308f-256f-4d7a-afaf-336a8e872a70/download/codigos-de-especie.csv'}
    ],
    download: 'https://catalogodatos.gub.uy/dataset/6d770b32-6baf-49bf-8d3c-6a1e2f626947/resource/5e48dc93-bf10-4d51-9862-865465b4d4ec/download/archivo_comunal16.csv',
    driver: 'CSV',
    license: {
      name: 'Licencia de Datos Abiertos – Uruguay 0.1',
      url: {file: 'https://www.gub.uy/agencia-gobierno-electronico-sociedad-informacion-conocimiento/sites/agencia-gobierno-electronico-sociedad-informacion-conocimiento/files/documentos/publicaciones/licencia_de_datos_abiertos_0.pdf'}
    }
  },
  {
    pending: 'address only',
    country: 'Uruguay',
    state: 'Montevideo',
    city: 'Montevideo',
    designation: 'Centro Comunal Zonal 17',
    scope: 'Tree',
    info: [
      'https://catalogodatos.gub.uy/dataset/intendencia-montevideo-censo-de-arbolado-2008',
      {file: 'https://catalogodatos.gub.uy/dataset/6d770b32-6baf-49bf-8d3c-6a1e2f626947/resource/c799548d-e9bb-492b-9179-53de2b748d43/download/referencias.txt'},
      {file: 'https://catalogodatos.gub.uy/dataset/6d770b32-6baf-49bf-8d3c-6a1e2f626947/resource/5416308f-256f-4d7a-afaf-336a8e872a70/download/codigos-de-especie.csv'}
    ],
    download: 'https://catalogodatos.gub.uy/dataset/6d770b32-6baf-49bf-8d3c-6a1e2f626947/resource/4dda84c6-45b0-459e-a51d-2e9dc0a4b332/download/archivo_comunal17.csv',
    driver: 'CSV',
    license: {
      name: 'Licencia de Datos Abiertos – Uruguay 0.1',
      url: {file: 'https://www.gub.uy/agencia-gobierno-electronico-sociedad-informacion-conocimiento/sites/agencia-gobierno-electronico-sociedad-informacion-conocimiento/files/documentos/publicaciones/licencia_de_datos_abiertos_0.pdf'}
    }
  },
  {
    pending: 'address only',
    country: 'Uruguay',
    state: 'Montevideo',
    city: 'Montevideo',
    designation: 'Centro Comunal Zonal 18',
    scope: 'Tree',
    info: [
      'https://catalogodatos.gub.uy/dataset/intendencia-montevideo-censo-de-arbolado-2008',
      {file: 'https://catalogodatos.gub.uy/dataset/6d770b32-6baf-49bf-8d3c-6a1e2f626947/resource/c799548d-e9bb-492b-9179-53de2b748d43/download/referencias.txt'},
      {file: 'https://catalogodatos.gub.uy/dataset/6d770b32-6baf-49bf-8d3c-6a1e2f626947/resource/5416308f-256f-4d7a-afaf-336a8e872a70/download/codigos-de-especie.csv'}
    ],
    download: 'https://catalogodatos.gub.uy/dataset/6d770b32-6baf-49bf-8d3c-6a1e2f626947/resource/6e1919b6-8208-4562-9a50-0880ad302d40/download/archivo_comunal18.csv',
    driver: 'CSV',
    license: {
      name: 'Licencia de Datos Abiertos – Uruguay 0.1',
      url: {file: 'https://www.gub.uy/agencia-gobierno-electronico-sociedad-informacion-conocimiento/sites/agencia-gobierno-electronico-sociedad-informacion-conocimiento/files/documentos/publicaciones/licencia_de_datos_abiertos_0.pdf'}
    }
  },
  {
    pending: 'address only',
    country: 'Uruguay',
    state: 'Montevideo',
    city: 'Montevideo',
    designation: 'Centro Comunal Zonal 2',
    scope: 'Tree',
    info: [
      'https://catalogodatos.gub.uy/dataset/intendencia-montevideo-censo-de-arbolado-2008',
      {file: 'https://catalogodatos.gub.uy/dataset/6d770b32-6baf-49bf-8d3c-6a1e2f626947/resource/c799548d-e9bb-492b-9179-53de2b748d43/download/referencias.txt'},
      {file: 'https://catalogodatos.gub.uy/dataset/6d770b32-6baf-49bf-8d3c-6a1e2f626947/resource/5416308f-256f-4d7a-afaf-336a8e872a70/download/codigos-de-especie.csv'}
    ],
    download: 'https://catalogodatos.gub.uy/dataset/6d770b32-6baf-49bf-8d3c-6a1e2f626947/resource/8493b5a7-f319-4e36-93dd-d5c8e7015ff9/download/archivo_comunal2.csv',
    driver: 'CSV',
    license: {
      name: 'Licencia de Datos Abiertos – Uruguay 0.1',
      url: {file: 'https://www.gub.uy/agencia-gobierno-electronico-sociedad-informacion-conocimiento/sites/agencia-gobierno-electronico-sociedad-informacion-conocimiento/files/documentos/publicaciones/licencia_de_datos_abiertos_0.pdf'}
    }
  },
  {
    pending: 'address only',
    country: 'Uruguay',
    state: 'Montevideo',
    city: 'Montevideo',
    designation: 'Centro Comunal Zonal 3',
    scope: 'Tree',
    info: [
      'https://catalogodatos.gub.uy/dataset/intendencia-montevideo-censo-de-arbolado-2008',
      {file: 'https://catalogodatos.gub.uy/dataset/6d770b32-6baf-49bf-8d3c-6a1e2f626947/resource/c799548d-e9bb-492b-9179-53de2b748d43/download/referencias.txt'},
      {file: 'https://catalogodatos.gub.uy/dataset/6d770b32-6baf-49bf-8d3c-6a1e2f626947/resource/5416308f-256f-4d7a-afaf-336a8e872a70/download/codigos-de-especie.csv'}
    ],
    download: 'https://catalogodatos.gub.uy/dataset/6d770b32-6baf-49bf-8d3c-6a1e2f626947/resource/828792ea-051f-46a8-9c9e-d88e1d4d6ef3/download/archivo_comunal3.csv',
    driver: 'CSV',
    license: {
      name: 'Licencia de Datos Abiertos – Uruguay 0.1',
      url: {file: 'https://www.gub.uy/agencia-gobierno-electronico-sociedad-informacion-conocimiento/sites/agencia-gobierno-electronico-sociedad-informacion-conocimiento/files/documentos/publicaciones/licencia_de_datos_abiertos_0.pdf'}
    }
  },
  {
    pending: 'address only',
    country: 'Uruguay',
    state: 'Montevideo',
    city: 'Montevideo',
    designation: 'Centro Comunal Zonal 4',
    scope: 'Tree',
    info: [
      'https://catalogodatos.gub.uy/dataset/intendencia-montevideo-censo-de-arbolado-2008',
      {file: 'https://catalogodatos.gub.uy/dataset/6d770b32-6baf-49bf-8d3c-6a1e2f626947/resource/c799548d-e9bb-492b-9179-53de2b748d43/download/referencias.txt'},
      {file: 'https://catalogodatos.gub.uy/dataset/6d770b32-6baf-49bf-8d3c-6a1e2f626947/resource/5416308f-256f-4d7a-afaf-336a8e872a70/download/codigos-de-especie.csv'}
    ],
    download: 'https://catalogodatos.gub.uy/dataset/6d770b32-6baf-49bf-8d3c-6a1e2f626947/resource/f70d1224-fc4a-4c1a-a291-bb33a517e9b6/download/archivo_comunal4.csv',
    driver: 'CSV',
    license: {
      name: 'Licencia de Datos Abiertos – Uruguay 0.1',
      url: {file: 'https://www.gub.uy/agencia-gobierno-electronico-sociedad-informacion-conocimiento/sites/agencia-gobierno-electronico-sociedad-informacion-conocimiento/files/documentos/publicaciones/licencia_de_datos_abiertos_0.pdf'}
    }
  },
  {
    pending: 'address only',
    country: 'Uruguay',
    state: 'Montevideo',
    city: 'Montevideo',
    designation: 'Centro Comunal Zonal 5',
    scope: 'Tree',
    info: [
      'https://catalogodatos.gub.uy/dataset/intendencia-montevideo-censo-de-arbolado-2008',
      {file: 'https://catalogodatos.gub.uy/dataset/6d770b32-6baf-49bf-8d3c-6a1e2f626947/resource/c799548d-e9bb-492b-9179-53de2b748d43/download/referencias.txt'},
      {file: 'https://catalogodatos.gub.uy/dataset/6d770b32-6baf-49bf-8d3c-6a1e2f626947/resource/5416308f-256f-4d7a-afaf-336a8e872a70/download/codigos-de-especie.csv'}
    ],
    download: 'https://catalogodatos.gub.uy/dataset/6d770b32-6baf-49bf-8d3c-6a1e2f626947/resource/14d525ae-0c13-4738-af0c-cfcf87072e7f/download/archivo_comunal5.csv',
    driver: 'CSV',
    license: {
      name: 'Licencia de Datos Abiertos – Uruguay 0.1',
      url: {file: 'https://www.gub.uy/agencia-gobierno-electronico-sociedad-informacion-conocimiento/sites/agencia-gobierno-electronico-sociedad-informacion-conocimiento/files/documentos/publicaciones/licencia_de_datos_abiertos_0.pdf'}
    }
  },
  {
    pending: 'address only',
    country: 'Uruguay',
    state: 'Montevideo',
    city: 'Montevideo',
    designation: 'Centro Comunal Zonal 6',
    scope: 'Tree',
    info: [
      'https://catalogodatos.gub.uy/dataset/intendencia-montevideo-censo-de-arbolado-2008',
      {file: 'https://catalogodatos.gub.uy/dataset/6d770b32-6baf-49bf-8d3c-6a1e2f626947/resource/c799548d-e9bb-492b-9179-53de2b748d43/download/referencias.txt'},
      {file: 'https://catalogodatos.gub.uy/dataset/6d770b32-6baf-49bf-8d3c-6a1e2f626947/resource/5416308f-256f-4d7a-afaf-336a8e872a70/download/codigos-de-especie.csv'}
    ],
    download: 'https://catalogodatos.gub.uy/dataset/6d770b32-6baf-49bf-8d3c-6a1e2f626947/resource/871491ff-f1a1-468e-b7b7-c1308a6b238d/download/archivo_comunal6.csv',
    driver: 'CSV',
    license: {
      name: 'Licencia de Datos Abiertos – Uruguay 0.1',
      url: {file: 'https://www.gub.uy/agencia-gobierno-electronico-sociedad-informacion-conocimiento/sites/agencia-gobierno-electronico-sociedad-informacion-conocimiento/files/documentos/publicaciones/licencia_de_datos_abiertos_0.pdf'}
    }
  },
  {
    pending: 'address only',
    country: 'Uruguay',
    state: 'Montevideo',
    city: 'Montevideo',
    designation: 'Centro Comunal Zonal 7',
    scope: 'Tree',
    info: [
      'https://catalogodatos.gub.uy/dataset/intendencia-montevideo-censo-de-arbolado-2008',
      {file: 'https://catalogodatos.gub.uy/dataset/6d770b32-6baf-49bf-8d3c-6a1e2f626947/resource/c799548d-e9bb-492b-9179-53de2b748d43/download/referencias.txt'},
      {file: 'https://catalogodatos.gub.uy/dataset/6d770b32-6baf-49bf-8d3c-6a1e2f626947/resource/5416308f-256f-4d7a-afaf-336a8e872a70/download/codigos-de-especie.csv'}
    ],
    download: 'https://catalogodatos.gub.uy/dataset/6d770b32-6baf-49bf-8d3c-6a1e2f626947/resource/93b58a46-616b-4c1a-b4f3-6b0b17dcd98f/download/archivo_comunal7.csv',
    driver: 'CSV',
    license: {
      name: 'Licencia de Datos Abiertos – Uruguay 0.1',
      url: {file: 'https://www.gub.uy/agencia-gobierno-electronico-sociedad-informacion-conocimiento/sites/agencia-gobierno-electronico-sociedad-informacion-conocimiento/files/documentos/publicaciones/licencia_de_datos_abiertos_0.pdf'}
    }
  },
  {
    pending: 'address only',
    country: 'Uruguay',
    state: 'Montevideo',
    city: 'Montevideo',
    designation: 'Centro Comunal Zonal 8',
    scope: 'Tree',
    info: [
      'https://catalogodatos.gub.uy/dataset/intendencia-montevideo-censo-de-arbolado-2008',
      {file: 'https://catalogodatos.gub.uy/dataset/6d770b32-6baf-49bf-8d3c-6a1e2f626947/resource/c799548d-e9bb-492b-9179-53de2b748d43/download/referencias.txt'},
      {file: 'https://catalogodatos.gub.uy/dataset/6d770b32-6baf-49bf-8d3c-6a1e2f626947/resource/5416308f-256f-4d7a-afaf-336a8e872a70/download/codigos-de-especie.csv'}
    ],
    download: 'https://catalogodatos.gub.uy/dataset/6d770b32-6baf-49bf-8d3c-6a1e2f626947/resource/283ace9a-f8f8-476b-87bf-a17611675007/download/archivo_comunal8.csv',
    driver: 'CSV',
    license: {
      name: 'Licencia de Datos Abiertos – Uruguay 0.1',
      url: {file: 'https://www.gub.uy/agencia-gobierno-electronico-sociedad-informacion-conocimiento/sites/agencia-gobierno-electronico-sociedad-informacion-conocimiento/files/documentos/publicaciones/licencia_de_datos_abiertos_0.pdf'}
    }
  },
  {
    pending: 'address only',
    country: 'Uruguay',
    state: 'Montevideo',
    city: 'Montevideo',
    designation: 'Centro Comunal Zonal 9',
    scope: 'Tree',
    info: [
      'https://catalogodatos.gub.uy/dataset/intendencia-montevideo-censo-de-arbolado-2008',
      {file: 'https://catalogodatos.gub.uy/dataset/6d770b32-6baf-49bf-8d3c-6a1e2f626947/resource/c799548d-e9bb-492b-9179-53de2b748d43/download/referencias.txt'},
      {file: 'https://catalogodatos.gub.uy/dataset/6d770b32-6baf-49bf-8d3c-6a1e2f626947/resource/5416308f-256f-4d7a-afaf-336a8e872a70/download/codigos-de-especie.csv'}
    ],
    download: 'https://catalogodatos.gub.uy/dataset/6d770b32-6baf-49bf-8d3c-6a1e2f626947/resource/5dcb4d2d-87a7-433b-9ce3-8187f505c908/download/archivo_comunal9.csv',
    driver: 'CSV',
    license: {
      name: 'Licencia de Datos Abiertos – Uruguay 0.1',
      url: {file: 'https://www.gub.uy/agencia-gobierno-electronico-sociedad-informacion-conocimiento/sites/agencia-gobierno-electronico-sociedad-informacion-conocimiento/files/documentos/publicaciones/licencia_de_datos_abiertos_0.pdf'}
    }
  },
  {
    country: 'Uruguay',
    state: 'San José',
    city: 'San José de Mayo | Rodríguez | Libertad',
    info: 'https://www.arcgis.com/home/item.html?id=10d2eb572cd245bda355d613a9f33cd6',
    download: {
      arcgis: 'https://services5.arcgis.com/BfQRkGiClKKMSsY1/arcgis/rest/services/Censo_de_Arbolado_Publica_vista/FeatureServer/0'
    }
  },
  {
    country: 'United States',
    state: 'California',
    city: 'North Highlands',
    designation: 'American River College',
    info: 'https://www.google.com/maps/d/u/0/viewer?mid=1K6isvV-ba0oerxfof2J59btqyOY',
    download: 'https://www.google.com/maps/d/u/0/kml?mid=1K6isvV-ba0oerxfof2J59btqyOY&lid=ze6m5b563ob8.kW2vA9KclIFk&forcekml=1',
    crosswalk: {
      common: x => {
        // common (scientific)(<br>|/s+)Family:
        return x['Description'].match(/([^>]+) \(([^)]+)\)\s*(?:<br>)?\s*Family:/)?.[1]
      },
      scientific: x => {
        // common (scientific)(<br>|/s+)Family:
        return x['Description'].match(/([^>]+) \(([^)]+)\)\s*(?:<br>)?\s*Family:/)?.[2]
      }
    }
  },
  {
    country: 'United States',
    state: 'Illinois',
    city: 'Oak Brook',
    designation: 'Central Park',
    info: 'https://www.google.com/maps/d/u/1/viewer?mid=1nn53o9Zu5kjdjVYFgXHZx3xRkoY-DxQJ',
    download: 'https://www.google.com/maps/d/u/1/kml?mid=1nn53o9Zu5kjdjVYFgXHZx3xRkoY-DxQJ&lid=Jcuj0YbUaLc&forcekml=1'
  },
  {
    country: 'United States',
    state: 'California',
    city: 'South Pasadena',
    designation: 'Library Park',
    info: 'https://www.google.com/maps/d/u/0/viewer?mid=121KIHdC3heBNHfYWLE5SL_AlYtgdvmWC',
    download: 'https://www.google.com/maps/d/u/0/kml?mid=121KIHdC3heBNHfYWLE5SL_AlYtgdvmWC&lid=xouLB4ZLO5c&forcekml=1'
  },
  {
    designation: 'OpenStreetMap',
    notes: 'All trees (natural: tree) on OpenStreetMap with a common or scientific name (genus, species, or taxon tag): `(node["natural"="tree"][~"^genus:?"~"."];node["natural"="tree"][~"^taxon:?"~"."];node["natural"="tree"][~"^species:?"~"."];);out geom;` | Superseded where it overlaps other more authoritative sources',
    info: 'https://wiki.openstreetmap.org/wiki/Tag:natural%3Dtree',
    download: 'https://overpass-api.de/api/interpreter?data=(node%5B%22natural%22%3D%22tree%22%5D%5B~%22%5Egenus%3A%3F%22~%22.%22%5D%3Bnode%5B%22natural%22%3D%22tree%22%5D%5B~%22%5Etaxon%3A%3F%22~%22.%22%5D%3Bnode%5B%22natural%22%3D%22tree%22%5D%5B~%22%5Especies%3A%3F%22~%22.%22%5D%3B)%3Bout%20geom%3B',
    layer: 'points',
    license: { id: 'ODbL-1.0' }
  }
]
