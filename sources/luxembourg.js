module.exports = [
  {
    id: 'luxembourg',
    country: 'Luxembourg',
    short: 'Luxembourg',
    long: 'Grand-Duchy of Luxembourg',
    download: 'https://download.data.public.lu/resources/inspire-annex-i-theme-protected-sites-remarkable-trees/20200129-134525/ps.protectedsitesnatureconservation-trees.gml',
    info: 'https://catalog.inspire.geoportail.lu/geonetwork/srv/eng/catalog.search#/metadata/bf367452-c965-4ae1-b652-bd2c86400be5',
    format: 'gml',
    crosswalk: {
      ref: 'localId',
      scientific: x => String(x.text).split(' - ')[0],
      common: x => String(x.text).split(' - ')[1]
    }
  }
].map(s => ({ ...s, country: 'Luxembourg' }))
