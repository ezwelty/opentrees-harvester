module.exports = {
  parseScientificName,
  printScientificName
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
 * Parsed scientific name.
 * 
 * @typedef {object} ParsedScientificName
 * @property {string} head - Unparsed head.
 * @property {string} genus - Genus (capitalized: e.g. `Malus`).
 * @property {string} subgenus - Subgenus (capitalized: e.g. `Malus`).
 * @property {string} species - Specific epithet (lowercase: e.g. `pumila`).
 * @property {boolean} hybrid - Whether `species` is a named hybrid.
 * @property {{rank: string, epithet: string}[]} infraspecies - Infraspecific epithets.
 * @property {string} cultivar - Cultivar (title case: e.g. 'Golden Delicious').
 * @property {string} tail - Unparsed tail.
 */

/**
 * Parse scientific name.
 * 
 * @param {string} name - Scientific name to parse
 * @return {ParsedScientificName}
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

/**
 * Print scientific name.
 * 
 * @param {ParsedScientificName} name - Parsed scientific name.
 * @param {object} [options] - Printing options.
 * @param {number} [options.infraspecies=Infinity] - Number of infraspecies to print.
 * @param {boolean} [options.rank=true] - Whether to print infraspecies rank.
 * @param {boolean} [options.cultivar=true] - Whether to print cultivar.
 * @return {string}
 * @example
 * printScientificName({ genus: 'Genus', subgenus: 'Subgenus' })
 * printScientificName({ genus: 'Genus', species: 'species', hybrid: true })
 * base = { genus: 'Genus', species: 'species' }
 * printScientificName({ ...base, infraspecies: [{ epithet: 'formosa' }] })
 * printScientificName({ ...base, infraspecies: [{ rank: 'f.', epithet: 'formosa' }] })
 * printScientificName({ ...base, infraspecies: [{ rank: 'f.', epithet: 'formosa' }] })
 * printScientificName({ ...base, infraspecies: [{ rank: 'f.', epithet: 'formosa' }] }, { rank: false })
 * printScientificName({ ...base, infraspecies: [{ epithet: 'formosa' }, { epithet: 'varietas' }] }, { infraspecies: 1 })
 * printScientificName({ ...base, infraspecies: [{ epithet: 'formosa' }, { epithet: 'varietas' }] }, { infraspecies: 0 })
 * printScientificName({ ...base, cultivar: 'Cultivar' })
 * printScientificName({ ...base, cultivar: 'Cultivar' }, { cultivar: false })
 * printScientificName({ head: 'head', genus: 'Genus', tail: 'tail' })
 */
function printScientificName(name, options) {
  options = {
    infraspecies: Infinity,
    rank: true,
    cultivar: true,
    ...options
  }
  const s = []
  if (name.genus) {
    s.push(name.genus)
  }
  if (name.subgenus) {
    s.push(`subg. ${name.subgenus}`)
  }
  if (name.hybrid) {
    if (name.species) {
      s.push(`×${name.species}`)
    } else {
      s.push('×')
    }
  } else if (name.species) {
    s.push(name.species)
  }
  if (options.infraspecies && name.infraspecies) {
    name.infraspecies.slice(0, options.infraspecies).forEach(e => {
      if (e.epithet) {
        if (options.rank && e.rank) {
          s.push(`${e.rank} ${e.epithet}`)
        } else {
          s.push(e.epithet)
        }
      }
    })
  }
  if (options.cultivar && name.cultivar) {
    s.push(`'${name.cultivar}'`)
  }
  return s.join(' ')
}
