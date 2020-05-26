module.exports = {
  parseScientificName
}

const tags = {
  // subg: subg, subgen, subgenus
  subg: 'subg(?:en(?:us)?)?',
  // sp: sp, spp, species
  sp: 'sp(?:p|ecies)?'
}

const ranks = {
  // subsp: subsp, subspp, subspecies, ssp, sspp
  subsp: `subsp(?:p|ecies)?|sspp?`,
  // var: var, variety, varietas
  var: `var(?:iet(?:y|as)?)?`,
  // f: f, form, forma
  f: `f(?:orma?)?`,
  // subvar: subvar, subvariety, subvarietas
  subvar: `subvar(?:iet(?:y|as)?)?`,
  // subf: subf, subform, subforma
  subf: `subf(?:orma?)?`
}

const anyRank = `${ranks.subsp}|${ranks.var}|${ranks.f}|${ranks.subvar}|${ranks.subf}`

const ends = {
  tag: `(?:$| |\\. ?|\\.? ?(?='))`,
  prefix: `(?: |\\. ?)`,
  field: `(?:$| )`
}

const patterns = {
  // Everything before first [A-z]
  head: /^([^A-z]+)/,
  // NOTE: [xX×] [A-z] ambiguous (either ... x Genus or ... x species)
  genus: new RegExp(`^([A-Z][a-z]+)${ends.field}`),
  sp: new RegExp(`^${tags.sp}${ends.tag}`),
  subgenus: new RegExp(`^${tags.subg}${ends.prefix}([A-Z][a-z]+)${ends.field}`),
  // [xX×], [xX×] ?'Cultivar', [xX] species, × ?species
  // NOTE: [xX×] [A-z] ambiguous (either Genus x Genus or Genus x species)
  hybrid: new RegExp(`^[xX×](?:$| ?(?='))|(?:[xX] |× ?)([a-z]+)${ends.field}`),
  species: new RegExp(`^([a-z]+)${ends.field}`),
  infraspecies: new RegExp(`^(?:(${anyRank})${ends.prefix})?([a-z]+)${ends.field}`),
  ranks: Object.keys(ranks).reduce((obj, key) => {
    obj[key] = new RegExp(ranks[key])
    return obj
  }, {}),
  cultivar: new RegExp(`^'([^']+)'${ends.field}`)
}

/**
 * Parse scientific name.
 * 
 * @param {string} name - Scientific name to parse
 * @return {object}
 * {string} head - Unparsed head
 * {string} genus - Genus (capitalized: e.g. `Malus`)
 * {string} subgenus - Subgenus (capitalized: e.g. `Malus`)
 * {string} species - Specific epithet (lowercase: e.g. `pumila`)
 * {boolean} hybrid - Whether `species` is a named hybrid
 * {object[]} infraspecies - Infraspecific epithets { rank, epithet }
 * {string} cultivar - Cultivar (title case: e.g. 'Golden Delicious')
 * {string} tail - Unparsed tail
 * @example
 * parseScientificName(`Genus`)
 * parseScientificName(`Genus sp.`)
 * parseScientificName(`Genus 'Cultivar'`)
 * parseScientificName(`Genus sp. 'Cultivar'`)
 * parseScientificName(`Genus subgen. Subgenus`)
 * parseScientificName(`Genus x`)
 * parseScientificName(`Genus x speciosa`)
 * parseScientificName(`Genus ×speciosa`)
 * parseScientificName(`Genus speciosa`)
 * parseScientificName(`Genus speciosa infraspecies`)
 * parseScientificName(`Genus speciosa var. subspeciosa f formosa 'Cultivar'`)
 */
function parseScientificName(name) {
  // Initialize
  let s = name
  let level = null
  const result = {}
  function apply(key) {
    const match = s.match(patterns[key])
    if (match) {
      if (match[1]) {
        result[key] = match[1]
      }
      s = s.slice(match.index + match[0].length)
      return true
    } else {
      return false
    }
  }
  // Unparsed head
  apply('head')
  // Genus
  if (apply('genus')) {
    level = 'generic'
  }
  // Subgeneric: sp, subgenus
  if (level === 'generic') {
    for (const key of ['sp', 'subgenus']) {
      if (apply(key)) {
        level = 'subgeneric'
        break
      }
    }
  }
  // Specific: hybrid, species
  if (level === 'generic') {
    for (const key of ['hybrid', 'species']) {
      if (apply(key)) {
        level = 'specific'
        if (key === 'hybrid') {
          result.species = result.hybrid
          result.hybrid = true
        }
        break
      }
    }
  }
  // Infraspecific
  if (level === 'specific') {
    const infraspecies = []
    while (match = s.match(patterns['infraspecies'])) {
      let rank = match[1]
      if (rank) {
        for (key in patterns.ranks) {
          if (patterns.ranks[key].test(rank)) {
            rank = `${key}.`
            break
          }
        }
      }
      infraspecies.push({ rank: rank, epithet: match[2] })
      s = s.slice(match.index + match[0].length)
    }
    if (infraspecies.length) {
      result.infraspecies = infraspecies
      level == 'infraspecific'
    }
  }
  // Cultivar
  apply('cultivar')
  // Unparsed tail
  if (s) result.tail = s
  return result
}
