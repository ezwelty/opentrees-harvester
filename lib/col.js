/**
 * Load Catalogue of Life taxa.
 *
 * @module
 * @private
 */

const Source = require('./source')
const helpers = require('./helpers')
const names = require('./names')

const PROPERTIES = {
  id: 'taxa',
  // Catalogue of Life: Tracheophyta (vascular plants)
  download: 'http://www.catalogueoflife.org/DCA_Export/zip/archive-kingdom-plantae-phylum-tracheophyta-bl2.zip',
  // HACK: Rename *.txt to *.tsv for GDAL
  execute: `mv taxa.txt taxa.tsv`,
  filename: 'taxa.tsv',
  // Keep only genus, species, and infraspecies rank
  delFunc: x => !(new Set(['genus', 'species', 'infraspecies']).has(x['taxonRank'])),
  crosswalk: {
    id: 'taxonID',
    // parentId: 'parentNameUsageID',
    // acceptedId: 'acceptedNameUsageID',
    // accepted name, ambiguous synonym, misapplied name, provisionally accepted name, synonym
    status: 'taxonomicStatus',
    genus: x => x['genericName'].replace('ö', 'o'),
    species: x => x['specificEpithet'].replace('ë', 'e'),
    infraspecies: x => x['infraspecificEpithet'].replace(' ', '-').replace('×', ''),
    // subsp., var., f., ...
    infraspeciesRank: 'verbatimTaxonRank',
  }
}
const INPUT = 'taxa/input'
const OUTPUT = 'taxa/output/taxa.csv'

async function loadTaxa() {
  const source = new Source(PROPERTIES, INPUT)
  await source.get()
  source.process(OUTPUT, { creation: [], allowEmptyGeometry: true })
  let taxa = await helpers.readCSV(OUTPUT)
  taxa.forEach(t => {
    if (t.infraspecies) {
      t.infraspecies = [{ epithet: t.infraspecies }]
      if (t.infraspeciesRank) {
        t.infraspecies.rank = t.infraspeciesRank
      }
    } else {
      delete t.infraspecies
    }
    delete t.infraspeciesRank
  })
  // Remove taxa with same name as an accepted name
  const accepted = new Set(taxa.filter(t => t.status === 'accepted name').
    map(names.printScientificName))
  return taxa.filter(t => {
    return (t.status === 'accepted name') || !accepted.has(names.printScientificName(t))
  })
}

module.exports = {
  loadTaxa
}
