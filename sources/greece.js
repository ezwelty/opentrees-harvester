module.exports = [
  {
    /**
     * thesisdendrondbf.zip unzips to thesis_dendron.dbf rather than
     * thesisdendron.dbf. Regardless, it contains no useful attributes.
     */
    id: 'thessaloniki_gr',
    short: 'Thessaloniki',
    country: 'Greece',
    info: 'https://opendata.thessaloniki.gr/el/dataset/%CE%B1%CF%81%CF%87%CE%B5%CE%AF%CE%BF-%CE%B3%CE%B5%CF%89%CE%B3%CF%81%CE%B1%CF%86%CE%B9%CE%BA%CE%AE%CF%82-%CE%B1%CF%80%CF%8C%CE%B4%CE%BF%CF%83%CE%B7%CF%82-%CF%83%CE%B7%CE%BC%CE%B5%CE%B9%CE%B1%CE%BA%CE%AC-%CE%B4%CE%B5%CE%B4%CE%BF%CE%BC%CE%AD%CE%BD%CE%B1-%CF%84%CF%89%CE%BD-%CE%B8%CE%AD%CF%83%CE%B5%CF%89%CE%BD-%CE%B4%CE%AD%CE%BD%CE%B4%CF%81%CF%89%CE%BD-%CF%83%CF%84%CE%BF-%CE%B4%CE%AE%CE%BC%CE%BF-%CE%B8%CE%B5%CF%83%CF%83%CE%B1%CE%BB%CE%BF%CE%BD%CE%AF%CE%BA%CE%B7%CF%82-9',
    download: [
      'https://opendata.thessaloniki.gr/sites/default/files/thesisdendron.shp',
      'https://opendata.thessaloniki.gr/sites/default/files/thesisdendron.prj',
      'https://opendata.thessaloniki.gr/sites/default/files/thesisdendron.shx',
      'https://opendata.thessaloniki.gr/sites/default/files/thesisdendrondbf.zip',
      'https://opendata.thessaloniki.gr/sites/default/files/thesisdendron.sbn',
      'https://opendata.thessaloniki.gr/sites/default/files/thesisdendron-shp.xml'
    ],
    license: {
      url: 'https://www.ypes.gr/UserFiles/f0ff9297-f516-40ff-a70e-eca84e2ec9b9/anoixti_adeia_v01.pdf'
    }
  }
].map(s => ({ ...s, country: 'Greece' }))
