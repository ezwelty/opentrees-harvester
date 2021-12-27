/**
 * Parse scientific names.
 *
 * @module
 */

const helpers = require('./helpers')

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
  genus: new RegExp(`^([A-Z][a-z]+-?[a-z]+)${ends.field}`),
  sp: new RegExp(`^${tags.sp}${ends.tag}`),
  subgenus: new RegExp(`^${tags.subg}${ends.prefix}([A-Z][a-z]+)${ends.field}`),
  // [xX×], [xX×] ?'Cultivar', [xX] species, × ?species
  // NOTE: [xX×] [A-z] ambiguous (either Genus x Genus or Genus x species)
  hybrid: new RegExp(`^(?:[xX×]|hybrid)(?:$| ?(?='))|(?:[xX] |× ?)([a-z]+-?[a-z]+)${ends.field}`),
  species: new RegExp(`^([a-z]+-?[a-z]+)${ends.field}`),
  infraspecies: new RegExp(`^(?:(${anyRank})${ends.prefix})?([a-z]+-?[a-z]+)${ends.field}`),
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
 * @property {ParsedInfraspecies[]} infraspecies - Infraspecific epithets.
 * @property {string} cultivar - Cultivar (title case: e.g. 'Golden Delicious').
 * @property {string} tail - Unparsed tail.
 */

/**
 * Parsed infraspecies.
 *
 * @typedef {object} ParsedInfraspecies
 * @property {string} rank - Rank (subsp, var, f, subvar, subf).
 * @property {string} epithet - Epithet.
 */

/**
 * Clean string field value (latinize and squeeze/trim whitespace).
 *
 * @param {string} s
 * @return {string}
 */
function cleanValue(s) {
  return helpers.latinize(s).replace(/\s+/g, ' ').trim()
}

/**
 * Format scientific name.
 *
 * @param {ParsedScientificName} name
 * @return {ParsedScientificName}
 * @example
 * formatScientificName({genus: '  GENUS', subgenus: 'SUBGENUS', species: 'SPECIES', cultivar: 'CULTI VAR', infraspecies: [{rank: 'RANK', epithet: 'EPITHET'}]})
 */
function formatScientificName(name) {
  const result = {}
  for (const key of ['genus', 'species', 'subgenus', 'cultivar', 'infraspecies']) {
    value = name[key]
    if (value) {
      if (key === 'infraspecies') {
        value = value.map(obj => {
          const subvalue = {}
          for (const subkey in obj) {
            if (obj[subkey]) {
              subvalue[subkey] = cleanValue(obj[subkey]).toLowerCase()
            }
          }
          return subvalue
        }).filter(subvalue => subvalue)
      } else {
        value = cleanValue(value)
        if (['genus', 'subgenus'].includes(key)) {
          value = helpers.toSentenceCase(value)
        } else if (key === 'species') {
          value = value.toLowerCase()
        } else if (key === 'cultivar') {
          value = helpers.toTitleCase(value)
        }
      }
      result[key] = value
    }
  }
  return { ...name, ...result }
}

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
 * parseScientificName(`Hibiscus-falsa rosa-sinensis ima-gina`)
 * parseScientificName(`Genus hybrid`) // { genus: 'Genus', hybrid: true }
 * parseScientificName(`Genus hybrida`) // { genus: 'Genus', species: 'hybrida' }
 * parseScientificName(`Genus hybrid 'Cultivar'`) // { genus: 'Genus', hybrid: true, cultivar: 'Cultivar' }
 * parseScientificName(`Acer platanoïdes`) // { genus: 'Acer', species: 'platanoides' }
 * parseScientificName(` Acer  alba `) // { genus: 'Acer', species: 'alba' }
 * parseScientificName(`acer alba`) // { genus: 'Acer', species: 'alba' }
 * parseScientificName(`ACER ALBA`) // { genus: 'Acer', species: 'alba' }
 */
function parseScientificName(s) {
  // Initialize
  s = cleanValue(s)
  let flags
  if (s === s.toLowerCase() || s === s.toUpperCase()) {
    flags = 'i'
  }
  let level = null
  const result = {}
  function apply(key) {
    const match = s.match(
      flags ? new RegExp(patterns[key], flags) : patterns[key]
    )
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
          if (!result.species) {
            delete result.species
          }
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
      infraspecies.push({ ...rank && { rank: rank }, epithet: match[2] })
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
  return formatScientificName(result)
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

/**
 * Class representing a scientific name.
 *
 * @param {ParsedScientificName} obj - Parsed scientific name.
 *
 * @property {ParsedScientificName} parsed - Parsed scientific name.
 * @property {string|object} [input] - Input from which `parsed` was derived.
 * @property {object[]} [matches] - Matches from a taxonomic database.
 */
class ScientificName {

  constructor(obj) {
    this.parsed = obj
  }

  /**
   * Build scientific name from string.
   *
   * @param {string} str
   * @return {ScientificName}
   * @example
   * ScientificName.fromString('Malus pumila')
   */
  static fromString(str) {
    const parsed = parseScientificName(str)
    const sciname = new ScientificName(parsed)
    sciname.input = str
    return sciname
  }

  /**
   * Scientific name fields.
   * @private
   */
  static _allFields = ['scientific', 'genus', 'species', 'cultivar', 'infraspecies']

  /**
   * Scientific name fields secondary to `scientific`.
   * @private
   */
  static _secondaryFields = ['genus', 'species', 'cultivar']

  /**
   * Build scientific name from feature fields.
   *
   * @param {object} fields
   * @return {ScientificName}
   * @example
   * ScientificName.fromFields({ scientific: 'Malus pumila', other: 'Bloop' })
   * ScientificName.fromFields({ genus: 'Malus', species: 'platanoïdes' })
   */
  static fromFields(obj) {
    const fields = {}
    ScientificName._allFields.forEach(key => {
      if (obj[key]) {
        fields[key] = obj[key]
      }
    })
    let names = {}
    if (fields.scientific) {
      names = parseScientificName(fields.scientific)
    }
    const secondary = formatScientificName(fields)
    if (secondary.species && secondary.species.match(/^([x×]|hybrid)$/)) {
      names.hybrid = true
      delete secondary.species
    }
    const sciname = new ScientificName({ ...secondary, ...names })
    sciname.input = fields
    return sciname
  }

  /**
   * Print scientific name to string.
   *
   * @param {object} options - Print options (see {@link printScientificName}).
   * @return {string}
   * @example
   * ScientificName.fromString(`Malus pumila var. asiatica 'Gala'`).toString()
   */
  toString(options) {
    return printScientificName(this.parsed, options)
  }

  /**
   * Generate compare function for sorting by string representation.
   *
   * @param {object} options - Print options (see {@link printScientificName}).
   * @return {function} Compare function (a, b).
   * @example
   * l = [new ScientificName({genus: 'Prunus'}), new ScientificName({genus: 'Malus'})]
   * l.sort(ScientificName.compareStrings())
   */
  static compareStrings(options) {
    return function (a, b) {
      const s = [a.toString(options), b.toString(options)]
      if (s[0] < s[1]) return -1
      if (s[0] > s[1]) return 1
      return 0
    }
  }

  /**
   * Get warnings.
   *
   * @return {string[]}
   * @example
   * ScientificName.fromString('... Malus x pumila ...').warnings()
   * ScientificName.fromFields({genus: 'Malus', species: 'pumila', scientific: 'Pyrus communis'}).warnings()
   */
  warnings() {
    const warnings = []
    if (this.parsed.head) {
      warnings.push('Unparsed head')
    }
    if (this.parsed.tail) {
      warnings.push('Unparsed tail')
    }
    if (this.parsed.hybrid) {
      warnings.push('Named hybrid')
    }
    if (typeof this.input === 'object' && this.input.scientific) {
      const bad = []
      ScientificName._secondaryFields.forEach(key => {
        if (this.parsed[key] && this.input[key] && this.parsed[key] !== this.input[key]) {
          bad.push(key)
        }
      })
      if (bad.length) {
        warnings.push(`Inconsistent secondary fields: ${bad.join(', ')}`)
      }
    }
    if (this.matches && this.matches[0]) {
      if (this.matches[0].phonetic) {
        warnings.push('Phonetic match')
      }
      if (this.matches[0].fuzzy) {
        warnings.push('Fuzzy match')
      }
    }
    return warnings.length ? warnings : undefined
  }

  /**
   * Get errors.
   *
   * @return {string[]}
   * @example
   * (new ScientificName({species: 'pumila'})).errors()
   */
  errors() {
    const errors = []
    if (!this.parsed.genus) {
      errors.push('Missing genus')
    }
    if (this.matches) {
      if (!this.matches.length) {
        errors.push('Missing matches')
      } else {
        if (this.matches[0].incomplete) {
          errors.push('Incomplete match')
        }
      }
    }
    return errors.length ? errors : undefined
  }

  /**
   * Get full report.
   *
   * @return {object}
   * @example
   * ScientificName.fromString('... Malus x pumila ...').report()
   */
  report() {
    const errors = this.errors()
    const warnings = this.warnings()
    return {
      ...this.input && { input: this.input },
      parsed: this.parsed,
      ...this.matches && this.matches.length && { matches: this.matches },
      ...errors && { errors: errors },
      ...warnings && { warnings: warnings }
    }
  }
}

module.exports = {
  parseScientificName,
  printScientificName,
  ScientificName
}
