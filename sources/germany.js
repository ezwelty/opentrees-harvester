module.exports = [
  {
    pending: 'Downloaded zip file has invalid comment length',
    id: 'halle',
    country: 'Germany',
    short: 'Halle',
    long: 'Halle (Saale)',
    download: 'https://www.halle.de/pushOD.aspx?FileName=f2087a53-2c10-f7c5-4dba-9ad5112a90cb_shp.zip',
    info: 'https://www.halle.de/de/Verwaltung/Online-Angebote/Offene-Verwaltungsdaten/Mit-Kartenbezug/index.aspx?ID=f2087a53-2c10-f7c5-4dba-9ad5112a90cb',
    crosswalk: {
      planted: 'pflanzjahr',
      crown: 'krone_m',
      height: 'hoehe_m',
      // gefaellt - removed?
      ref: 'baum_nr',
      scientific: 'art_botan',
      common: 'art_deut',
      // baumart? Laubbaum
    }
  },
  {
    id: 'leipzig',
    country: 'Germany',
    short: 'Leipzig',
    download: 'https://opendata.arcgis.com/datasets/918dfaa87b754c4384ddcf869cfd6dc6_0.zip',
    info: 'https://hub.arcgis.com/datasets/esri-de-content::stra%C3%9Fenbaumkataster-leipzig',
    crosswalk: {
      scientific: 'Baumart_wi',
      common: 'Baumart_de',
      planted: 'Pflanzjahr',
      ref: 'STANDORTNR'
    }
  },
  {
    id: 'bonn',
    country: 'Germany',
    short: 'Bonn',
    download: 'https://opendata.arcgis.com/datasets/f8f130c1dd4e4ea9b5fe1f2385673cab_0.zip',
    info: 'http://opendata.gis.ms.gov/datasets/esri-de-content::baumkataster-bonn',
    crosswalk: {
      ref: 'baum_id',
      scientific: 'lateinisch',
      common: 'deutscher_',
      // alter_ ?
    }
  },
  {
    id: 'koeln',
    country: 'Germany',
    short: 'Köln',
    long: 'Stadt Köln',
    download: 'https://offenedaten-koeln.de/sites/default/files/Bestand_Einzelbaeume_Koeln_0.csv',
    info: 'https://offenedaten-koeln.de/dataset/baumkataster-koeln',
    srs: 'EPSG:3044',
    crosswalk: {
      ref: 'Baum-Nr.',
      // STAMMVON, STAMMBIS,
      crown: 'KRONE',
      height: 'HöHE',
      age: 'AlterSchätzung',
      genus: 'Gattung',
      species: 'Art',
      common: 'DeutscherN'

    },
    centre: { lon: 6.9796, lat: 50.9356 }
  },
  {
    id: 'berlin',
    country: 'Germany',
    short: 'Berlin',
    download: 'https://opendata.arcgis.com/datasets/05c3f9d7dea6422b86e30967811bddd7_0.zip',
    crosswalk: {
      scientific: 'Art_Bot',
      common: 'Art_Dtsch',
      // Gattung, //
      planted: 'Pflanzjahr',
      height: 'BaumHoehe',
      location: 'Kategorie' // maybe others Staummfg...
    },
    centre: { lon: 13.43, lat: 52.485 }
  },
  {
    id: 'frankfurt',
    country: 'Germany',
    short: 'Frankfurt',
    long: 'Frankfurt am Main',
    download: 'https://opendata.arcgis.com/datasets/8c50110f190e43599baf50701aaff13a_0.zip',
    info: 'https://hub.arcgis.com/datasets/esri-de-content::baumkataster-frankfurt-am-main',
    crosswalk: {
      scientific: x => String(x.Gattung_Ar).split(', ')[0],
      common: x => String(x.Gattung_Ar).split(', ')[1],
      ref: 'Baumnummer',
      planted: 'Pflanzjahr',
      crown: 'Kronendurc'

    }
  },
  {
    id: 'hamburg_hafen',
    country: 'Germany',
    short: 'Hamburg Hafen',
    download: 'https://opendata.arcgis.com/datasets/35950460a3744fa4b088570b2df55718_0.zip',
    info: 'https://hub.arcgis.com/datasets/esri-de-content::stra%C3%9Fenbaumkataster-hamburg-hafen',
    crosswalk: {
      scientific: 'art_latein',
      common: 'art_deutsc',
      description: 'sorte', // contains variety...
      planted: 'pflanzjahr',
      crown_m: 'kronendurc', // kronendmza confirms [m]
      circumference_cm: 'stammumfan', // stammumf_1 confirms [cm]
      // stand-bear??
      owner: 'zustaendig'
    }
  },
  {
    id: 'rostock',
    country: 'Germany',
    short: 'Rostock',
    long: 'Hanse- und Universitätsstadt Rostock',
    download: 'https://geo.sv.rostock.de/download/opendata/baeume/baeume.csv',
    info: 'https://www.opendata-hro.de/dataset/baeume',
    crosswalk: {
      scientific: 'gattung_botanisch',
      common: 'gattung_deutsch',
      height: 'hoehe',
      crown: 'kronendurchmesser',
      dbh: 'stammdurchmesser',
      location: 'allebaum'
    }
  },
  {
    id: 'chemnitz',
    country: 'Germany',
    short: 'Chemnitz',
    download: 'https://opendata.arcgis.com/datasets/70330324e2364b209f7511ca20581f83_0.zip?outSR=%7B%22latestWkid%22%3A3857%2C%22wkid%22%3A102100%7D',
    info: 'http://portal-chemnitz.opendata.arcgis.com/datasets/baeume?geometry=12.910%2C50.819%2C12.914%2C50.822',
    crosswalk: {
      ref: 'BaumNummer',
      scientific: x => String(x.BaumArt).split(', ')[0],
      common: x => String(x.BaumArt).split(', ')[1],
      planted: 'PflanzDatu'
    }
  },
  {
    id: 'wesel',
    country: 'Germany',
    short: 'Wesel',
    download: 'http://data.geoportal-wesel.de/OPENDATA/Baumkataster/Baumkataster.geojson',
    info: 'https://open.nrw/dataset/baumkataster-odp',
    crosswalk: {
      ref: 'ID',
      scientific: x => String(x.GA_LANG).split(', ')[0],
      common: x => String(x.GA_LANG).split(', ')[1],
      crown: 'KR_DURCHM',
      dbh: 'ST_UMFANG',
      height: 'BAUMHOEHE'
    }
  },
  {
    // NOTE: Sample dataset only
    id: 'ulm',
    short: 'Ulm',
    download: 'http://daten.ulm.de/sites/default/files/20180921_Baeume_1.xlsx',
    info: 'http://www.daten.ulm.de/datenkatalog/metadaten/baumbestand-stadt-ulm-testdatensatz',
    srs: 'EPSG:31467', // or 2166, 31467, 3396...
    geometry: { x: 'Koordinaten_X_Y', y: 'Koordinate_Y' },
    crosswalk: {
      scientific: 'Baumart_botanisch',
      common: 'Baumart',
      height: 'Baumhöhe_(aktuell)',
      crown: 'Kronendurchm_(aktuell)',
      // dbh: 'Stammumfang_(aktuell)',
      dbh: 'Stammdurchm_(aktuell)',
      health: 'Vitalitaetsstatus_(aktuell)', // needs processing?
      planted: 'Pflanzjahr_geschaetzt',
      updated: 'Standortermittlung_am' // "location determination"
    },
    centre: { lon: 10, lat: 48.4 }
  },
  {
    id: 'hamburg',
    country: 'Germany',
    short: 'Hamburg',
    info: 'http://suche.transparenz.hamburg.de/dataset/strassenbaumkataster-hamburg10',
    download: 'http://daten-hamburg.de/umwelt_klima/strassenbaumkataster/Strassenbaumkataster_HH_2019-06-19.zip',
    // info:'',
    crosswalk: {
      ref: 'baumid',
      scientific: 'art_latein',
      common: 'art_deutsch',
      planted: 'pflanzjahr',
      // kronendurchmesser
      dbh: 'stammumfang', // TODO verify
    }
    /*
    TODO investigate
    BERROR 1: Layer 'strassenbaumkataster_hpa' does not already exist in the output dataset, and cannot be created by the output driver.
    ERROR 1: Terminating translation prematurely after failed
    translation of layer strassenbaumkataster_hpa (use -skipfailures to skip errors)
    Error with unzip/hamburg/Strassenbaumkataster_HH_2019-06-19.gml (hamburg)
    */
  },
  {
    id: 'karlsruhe_de',
    short: 'Karlsruhe',
    // are more fields possibly by altering this URL?
    download: 'https://geoportal.karlsruhe.de/server/rest/services/Fachplaene/Baumkataster/MapServer/1/query?where=ARTDEUT+IS+NOT+NULL&outFields=ARTDEUT%2CARTLAT&returnGeometry=true&f=geojson',
    info: 'https://transparenz.karlsruhe.de/dataset/fachplane-baumkataster/resource/9cd1989f-9720-4621-b171-3c4e56352598',
    crosswalk: {
      common: 'ARTDEUT',
      scientific: 'ARTLAT'

    }
  },
  {
    id: 'gelsenkirchen_de',
    short: 'Gelsenkirchen',
    download: 'https://opendata.gelsenkirchen.de/sites/default/files/baumkataster_ge.csv',
    info: 'https://opendata.gelsenkirchen.de/dataset/baumkataster-gelsenkirchen',
    srs: 'EPSG:3044',
    crosswalk: {
      scientific: 'BAUMART',
      // SORTE?
      planted: 'PFLANZJAHR',
      crown: 'KRONENDURCHMESSER',
      height: 'HOEHE',
      ref: 'BAUMID',
      // common:
    },
    license: {
      name: 'Datenlizenz Deutschland – Namensnennung – Version 2.0',
      url: 'https://www.govdata.de/dl-de/by-2-0'
    }
  },
  {
    pending: 'Broken download link',
    id: 'krefeld_de',
    short: 'Krefeld',
    long: 'Stadt Krefeld',
    download: 'http://geoportal-niederrhein.de/files/opendatagis/Stadt_Krefeld/Aktueller_Baumbestand.geojson',
    info: 'https://www.offenesdatenportal.de/dataset/baumstandorte-der-stadt-krefeld',
    license: {
      name: 'Datenlizenz Deutschland – Zero – Version 2.0',
      url: 'https://www.govdata.de/dl-de/zero-2-0'
    }
  },
  {
    id: 'moers_de',
    short: 'Moers',
    long: 'Stadt Moers',
    download: 'https://www.offenesdatenportal.de/dataset/cc69db13-f6b9-4319-9ee6-3f385dc7d944/resource/6c36f4a2-560e-4689-93cc-6af845247c38/download/baumstrauch.json',
    info: 'https://www.offenesdatenportal.de/dataset/baume-und-straucher-in-bebauten-ortslagen',
    license: {
      name: 'Datenlizenz Deutschland – Zero – Version 2.0',
      url: 'https://www.govdata.de/dl-de/zero-2-0'
    },
    crosswalk: {
      description: x => x.ART ? x.ART.replace(/�/, 'ß') : null,
      location: x => x.ART === 'Laubbaum_Stra�enbaum' ? 'street' : null,
      edible: x => x.ART === 'Laubbaum_Obstbaum' ? 'fruit' : null
    }
  },
  {
    id: 'troisdorf_de',
    short: 'Troisdorf',
    long: 'Stadt Troisdorf',
    download: 'http://www.stadtplan.troisdorf.de/opengeodata/opendata/data/Troisdorf_Baumkataster_180926.zip',
    info: 'http://www.stadtplan.troisdorf.de/opengeodata/opendata/open_data_baumkataster.html',
    // X-Koordinate and Y-Koordinate use decimal separator ","
    coordsFunc: x => [Number(x['X-Koordinate'].replace(',', '.')), Number(x['Y-Koordinate'].replace(',', '.'))],
    crosswalk: {
      height: 'Baumhoehe',
      scientific: x => x.Baumart.split(', ')[0],
      common: x => x.Baumart.split(', ')[1],
      crown: 'Kronendurchmesser',
      dbh: 'Stammumfang'
    },
    license: {
      name: 'Datenlizenz Deutschland – Namensnennung – Version 2.0',
      url: 'https://www.govdata.de/dl-de/by-2-0'
    }
  },
  {
    id: 'jena_de',
    short: 'Jena',
    download: 'https://opendata.jena.de/dataset/acd67e0c-b597-48c7-b251-1b565c49de90/resource/3ff727bb-8db4-4b47-9c53-7084d15f73d6/download/baumkataster.csv',
    info: 'https://opendata.jena.de/dataset/baumkataster',
    crosswalk: {
      height: 'baumhoehe',
      ref: 'baumnummer',
      scientific: 'ga_lang',
      dbh: 'st_umfang',
      health: 'vitalitaet'

    },
    srs: 'EPSG:3044',
    license: {
      name: 'Datenlizenz Deutschland – Namensnennung – Version 2.0',
      url: 'https://www.govdata.de/dl-de/by-2-0'
    }
  },
].map(s => ({ ...s, country: 'Germany' }))
