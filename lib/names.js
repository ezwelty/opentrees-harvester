/**
 * Parse scientific names.
 *
 * @module
 */

const helpers = require('./helpers')

// ---- Components ----

/**
 * Generic epithet.
 *
 * Minimum two letters.
 * Dash can be within three letters of end (e.g. 'Uva-ursi', 'Filix-mas').
 */
const GENERIC = `(?:[A-Z][a-z]+|[A-z][a-z]{2,}-[a-z]{3,})`

/**
 * Specifc epithet.
 *
 * Minimum two letters.
 * Dashes can be within one letter of end (e.g. 's-stylata', 'laurel-y').
 */
const SPECIFIC = `[a-z]+[a-z-]*[a-z]+`

/**
 * Subgenus rank.
 *
 * subg: subg(.) | subgen(.) | subgenus
 */
const SUBG = `(?:subg(?:en)?\\.?|subgenus)`

/**
 * Species rank.
 *
 * sp: sp(.), spp(.), species
 */
const SP = `(?:spp?\\.?|species)`

/**
 * Infraspecific ranks.
 *
 * subsp: subsp(.) | subspp(.) | ssp(.) | sspp(.) | subspecies
 * var: var(.) | variety | varietas
 * subvar: subvar(.), subvariety, subvarietas
 * f: f(.) | form | forma
 * subf: subf(.) | subform | subforma
 */
const RANKS = {
  subsp: `subspp?\\.?|sspp?\\.?|subspecies`,
  var: `var\\.?|variety|varietas`,
  subvar: `subvar\\.?|subvariety|subvarietas`,
  f: `f\\.?|forma?`,
  subf: `subf\\.?|subforma?`
}

/**
 * Any infraspecific rank.
 */
const RANK = Object.values(RANKS).join('|')

// ---- Named capture groups ----

/**
 * Everything before the first (latin) letter or hybrid symbol.
 */
const HEAD = `^(?<head>[^A-z×]+)`

/**
 * Uninomial.
 */
const UNINOMIAL = `(?<uninomial>${GENERIC})`

/**
 * Genus.
 *
 * Identical to uninomial, but inferred to be a genus based on context.
 */
const GENUS = `(?<genus>${GENERIC})`

/**
 * Secondary genus in hybrid formula.
 *
 * May be abbreviated down to a single letter.
 */
const HYBRID_GENUS = `(?<genus>[A-Z](?:${SPECIFIC})?)\\.?`

/**
 * Subgenus.
 */
const SUBGENUS = `${SUBG} (?<subgenus>${GENERIC})`

/**
 * Species.
 */
const SPECIES = `(?<species>${SPECIFIC})`

/**
 * One or more infraspecific epithets, each preceded by an optional rank.
 */
const INFRASPECIES = `(?<infraspecies>(?:(?:(?:${RANK}) )?${SPECIFIC}(?=$| ) ?)+)`

/**
 * Single infraspecific epithet preceded by an optional rank.
 */
const RANK_EPITHET = `(?:(?:(?<rank>${RANK}) )?(?<epithet>${SPECIFIC}))(?:$| )`

/**
 * Cultivar.
 *
 * Must be wrapped in quotes and not include certain characters.
 */
const CULTIVAR = `(?:(?<cultivarQuote>['"]+) ?(?<cultivar>(?:[A-z0-9'-\\. ](?! [xX] ))+[^ ]) ?\\k<cultivarQuote>)`

// ---- Decision trees ----

/**
 * Parse a scientific name (or the first name in a hybrid formula).
 *
 * Each key is a regular expression with named capture groups. Try each in
 * order. As soon as a match is found, proceed to the children keys and repeat
 * until `null` or no more children are found. Any `tags`, if encountered, are
 * added to the result.
 */
const FIRST = {
  [`(?:[xX] |× ?)${GENUS}`]: {
    tags: { hybrid: true, hybridGenus: true },
    [SP]: CULTIVAR,
    [CULTIVAR]: null,
    [SPECIES]: {
      [CULTIVAR]: null,
      [INFRASPECIES]: CULTIVAR
    }
  },
  [`${GENUS} (?:[xX] |× ?)${SPECIES}`]: {
    tags: { hybrid: true },
    [CULTIVAR]: null,
    [INFRASPECIES]: CULTIVAR
  },
  [`${GENUS} (?:[xX×]|hybrid)`]: {
    tags: { hybrid: true },
    [CULTIVAR]: null
  },
  [`${GENUS} ${SUBGENUS}`]: {
    tags: { hybrid: false }
  },
  [`${GENUS} ${SP}`]: {
    [CULTIVAR]: null
  },
  [`${GENUS} ${CULTIVAR}`]: {
  },
  [`${GENUS} ${SPECIES}`]: {
    [CULTIVAR]: null,
    [INFRASPECIES]: {
      [CULTIVAR]: null
    }
  },
  [UNINOMIAL]: {
    tags: { hybrid: false }
  }
}

/**
 * Parse a secondary name in a hybrid formula.
 */
const HYBRID = {
  [SPECIES]: {
    [CULTIVAR]: null,
    [INFRASPECIES]: {
      [CULTIVAR]: null
    }
  },
  [`${HYBRID_GENUS} ${CULTIVAR}`]: {
  },
  [`${HYBRID_GENUS} ${SPECIES}`]: {
    [CULTIVAR]: null,
    [INFRASPECIES]: {
      [CULTIVAR]: null
    }
  }
}

// ---- Object definitions ----

/**
 * Infraspecies.
 *
 * @typedef {object} Infraspecies
 * @property {string} rank - Rank (`subsp.`, `var.`, `f.`, `subvar.`, `subf.`).
 * @property {string} epithet - Epithet (lowercase: e.g. `pontica`).
 */

/**
 * Hybrid.
 *
 * Represents a secondary scientific name in a hybrid formula.
 *
 * @property {string} genus - Genus (capitalized: e.g. `Malus`).
 * @property {string} subgenus - Subgenus (capitalized: e.g. `Malus`).
 * @property {string} species - Specific epithet (lowercase: e.g. `pumila`).
 * @property {Infraspecies[]} infraspecies - Infraspecific epithets.
 * @property {string} cultivar - Cultivar (title case: e.g. `Golden Delicious`).
 */

/**
 * Scientific name.
 *
 * @typedef {object} ParsedScientificName
 * @property {string} head - Unparsed head.
 * @property {string} uninomial – Uninomial name (maybe `genus`).
 * @property {string} genus - Genus (capitalized: e.g. `Malus`).
 * @property {string} subgenus - Subgenus (capitalized: e.g. `Malus`).
 * @property {string} species - Specific epithet (lowercase: e.g. `pumila`).
 * @property {Infraspecies[]} infraspecies - Infraspecific epithets.
 * @property {string} cultivar - Cultivar (title case: e.g. `Golden Delicious`).
 * @property {boolean} hybrid - Whether this is a hybrid.
 * @property {boolean} hybridGenus – Whether `genus` is a nothogenus (e.g. `× Sorbopyrus`).
 * @property {Hybrid[]} hybrids – Secondary names in a hybrid formula.
 * @property {string} tail - Unparsed tail.
 */

// ---- Helper functions ----

/**
 * Clean name string.
 *
 * - Latinizes characters.
 * - Replaces whitespace sequences with a single space.
 * - Removes leading and trailing whitespace.
 *
 * @param {string} s
 * @returns {string}
 * @example
 * cleanName(' Acer  platanoïdes ') // 'Acer platanoides'
 */
function cleanName(s) {
  return helpers.latinize(s).replace(/\s+/g, ' ').trim()
}

/**
 * Parse infraspecific ranks and epithets.
 *
 * @param {string} s
 * @returns {Infraspecies[]}
 * @example
 * parseInfraspecies('foo f bar') // [{epithet: 'foo'}, {rank: 'f.', epithet: 'bar'}]
 */
function parseInfraspecies(s) {
  const infraspecies = []
  let subs = s
  while (match = subs.match(RANK_EPITHET)) {
    if (match.groups.rank) {
      for (const key in RANKS) {
        if (match.groups.rank.match(`^(${RANKS[key]})$`)) {
          match.groups.rank = `${key}.`
          break
        }
      }
    } else {
      delete match.groups.rank
    }
    infraspecies.push(match.groups)
    subs = subs.slice(match.index + match[0].length)
  }
  return infraspecies
}

/**
 * Print infraspecific ranks and epithets.
 *
 * @param {Infraspecies[]} infraspecies
 * @param {object} options
 * @param {object} [options.n=Infinity] – Number of infraspecies.
 * @param {object} [options.rank=true] – Print infraspecies rank.
 * @returns {string}
 * @example
 * printInfraspecies([ { rank: 'f.', epithet: 'mora' } ])
 * // 'f. mora'
 * printInfraspecies([ { rank: 'f.', epithet: 'mora' } ], { rank: false })
 * // 'mora'
 */
function printInfraspecies(infraspecies, { n = Infinity, rank = true } = {}) {
  const s = []
  if (n && infraspecies) {
    infraspecies.slice(0, n).forEach(i => {
      if (i.epithet) {
        if (rank && i.rank) {
          s.push(`${i.rank} ${i.epithet}`)
        } else {
          s.push(i.epithet)
        }
      }
    })
  }
  return s.join(' ')
}

// ---- Main functions ----

/**
 * Print scientific name.
 *
 * @param {ParsedScientificName} name - Scientific name.
 * @param {object} [options] - Printing options.
 * @param {number} [options.infraspecies=Infinity] - Number of infraspecies.
 * @param {boolean} [options.hybrid=true] - Print hybrid symbol and formulas.
 * @param {boolean} [options.rank=true] - Print infraspecies rank.
 * @param {boolean} [options.cultivar=true] - Print cultivar.
 * @returns {string}
 * @example
 * name = {
 *   genus: 'Genus',
 *   species: 'speciosa',
 *   infraspecies: [{ rank: 'f.', epithet: 'formosa' }],
 *   cultivar: 'Gala',
 *   hybrid: true,
 *   hybrids: [{ genus: 'Genus', species: 'pendula' }]
 * }
 * printScientificName(name)
 * // "Genus speciosa f. formosa 'Gala' × Genus pendula'"
 * printScientificName(name, {cultivar: false})
 * // "Genus speciosa f. formosa × Genus pendula'"
 * printScientificName(name, {infraspecies: 0, cultivar: false})
 * // 'Genus speciosa × Genus pendula'
 * printScientificName(name, {hybrid: false, infraspecies: 0, cultivar: false})
 * // 'Genus speciosa'
 */
function printScientificName(
  name, { infraspecies = Infinity, hybrid = true, rank = true, cultivar = true } = {}
) {
  if (name.uninomial) {
    return name.uninomial
  }
  const s = []
  if (hybrid && name.hybridGenus) {
    s.push(`×${name.genus}`)
  } else {
    s.push(name.genus)
  }
  if (name.subgenus) {
    s.push(`subg. ${name.subgenus}`)
  }
  if (hybrid && name.hybrid && !name.hybridGenus && !name.hybrids) {
    if (name.species) {
      s.push(`×${name.species}`)
    } else {
      s.push('×')
    }
  } else if (name.species) {
    s.push(name.species)
  }
  if (infraspecies && name.infraspecies) {
    s.push(
      printInfraspecies(name.infraspecies, { n: infraspecies, rank: rank })
    )
  }
  if (cultivar && name.cultivar) {
    s.push(`'${name.cultivar}'`)
  }
  if (hybrid && name.hybrids) {
    name.hybrids.forEach(h => {
      const printedHybrid = printScientificName(
        h, { infraspecies: infraspecies, rank: rank, cultivar: cultivar }
      )
      s.push(`× ${printedHybrid}`)
    })
  }
  return s.join(' ')
}

/**
 * Format scientific name.
 *
 * @param {ParsedScientificName} name – Scientific name.
 * @param {string|boolean} defaultGenus – Genus to assume if hybrid genus is
 * blank or an abbreviation of `defaultGenus`. Defaults to `genus` if `null`, or
 * skipped if `false`.
 * @returns {ParsedScientificName}
 * @example
 * name = {
 *   genus: ' GENUS',
 *   species: 'SPECIOSA ',
 *   infraspecies: [ { rank: 'VAR', epithet: 'FORMOSA' } ],
 *   cultivar: 'CULTI VAR',
 *   hybrids: [ {genus: 'G', species: 'spéciosa' } ],
 *   hybrid: true
 * }
 * formatScientificName(name)
 * // {
 * //   genus: 'Genus',
 * //   species: 'speciosa',
 * //   infraspecies: [ { rank: 'var.', epithet: 'formosa' } ],
 * //   cultivar: 'Culti Var',
 * //   hybrids: [ { genus: 'Genus', species: 'speciosa' } ],
 * //   hybrid: true
 * // }
 */
function formatScientificName(name, defaultGenus = null) {
  const CASE = {
    uninomial: helpers.toSentenceCase,
    genus: helpers.toSentenceCase,
    subgenus: helpers.toSentenceCase,
    species: s => s.toLowerCase(),
    cultivar: helpers.toTitleCase
  }
  // Deep copy
  const result = JSON.parse(JSON.stringify(name))
  // Top-level strings
  for (const key in CASE) {
    if (name[key]) {
      let s = name[key]
      if (s) {
        s = CASE[key](cleanName(s))
      }
      if (s) {
        result[key] = s
      } else {
        delete result[key]
      }
    }
  }
  // Default genus
  if (typeof defaultGenus === 'string') {
    if (
      (!result.genus && !result.uninomial) ||
      (result.genus && defaultGenus.match(`^${result.genus.replace(/\.$/, '')}`))
    ) {
      result.genus = defaultGenus
    }
  }
  // Infraspecies
  if (name.infraspecies) {
    const infraspecies = result.infraspecies.map(i => {
      for (const key of ['rank', 'epithet']) {
        if (key in i) {
          let s = i[key]
          if (s) {
            s = cleanName(s).toLowerCase()
          }
          if (s) {
            if (key === 'rank') {
              // Normalize rank
              for (const key in RANKS) {
                if (s.match(`^(${RANKS[key]})$`)) {
                  s = `${key}.`
                  break
                }
              }
            }
            i[key] = s
          } else {
            delete i[key]
          }
        }
      }
      return i
    }).filter(obj => Object.keys(obj).length > 0)
    if (infraspecies.length > 0) {
      result.infraspecies = infraspecies
    } else {
      delete result.infraspecies
    }
  }
  // Hybrids
  if (name.hybrids) {
    if (defaultGenus === null && result.genus) {
      defaultGenus = result.genus
    }
    const hybrids = (
      result.hybrids
        .map(h => formatScientificName(h, defaultGenus))
        .filter(obj => Object.keys(obj).length > 0)
    )
    if (hybrids.length > 0) {
      result.hybrids = hybrids
    } else {
      delete result.hybrids
    }
  }
  // Remove empty optional properties
  for (const key of ['hybrid', 'hybridGenus', 'head', 'tail']) {
    if (!result[key]) {
      delete result[key]
    }
  }
  return result
}

/**
 * Parse scientific name.
 *
 * @param {string} name - Name to parse as a scientific name.
 * @returns {ParsedScientificName}
 * @example
 * parseScientificName(`Genus`)
 * // { uninomial: 'Genus' }
 * parseScientificName(`Genus speciosa var. segunda 'Cultivar' x Genus hybrida`)
 * // {
 * //   genus: 'Genus',
 * //   species: 'speciosa',
 * //   infraspecies: [ { rank: 'var.', epithet: 'segunda' } ],
 * //   cultivar: 'Cultivar',
 * //   hybrids: [ { genus: 'Genus', species: 'hybrida' } ],
 * //   hybrid: true
 * // }
 */
function parseScientificName(s) {
  // Ignore case if string all upper or lower case
  let ignoreCase = false
  if (s === s.toLowerCase() || s === s.toUpperCase()) {
    ignoreCase = true
  }
  s = cleanName(s)
  const parsed = {}

  function recurse(node, results) {
    for (const key in node) {
      const value = node[key]
      if (key === 'tags') {
        Object.assign(results, value)
        continue
      }
      let pattern = `^${key}(?:$| )`
      if (ignoreCase) {
        pattern = new RegExp(pattern, 'i')
      }
      if (parse(pattern, results)) {
        if (typeof value === 'string') {
          let pattern = `^${value}(?:$| )`
          if (ignoreCase) {
            pattern = new RegExp(pattern, 'i')
          }
          parse(pattern, results)
        } else if (value) {
          recurse(value, results)
        }
        break
      }
    }
  }

  function parse(pattern, results) {
    match = s.match(pattern)
    if (match) {
      if (match.groups) {
        Object.assign(results, match.groups)
      }
      s = s.slice(match.index + match[0].length)
      return true
    }
    return false
  }

  // Unparsed head
  parse(HEAD, parsed)
  // Parse
  // HACK: Modify string to not require space in case-sensitive scenarios
  if (!ignoreCase) {
    // xGenus
    s = s.replace(/^x([A-Z])/, 'x $1')
    // Xspecies
    s = s.replace(new RegExp(`^${GENUS} X([a-z])`), '$<genus> X $2')
  }
  recurse(FIRST, parsed)
  // Parse infraspecies
  if ('infraspecies' in parsed) {
    parsed.infraspecies = parseInfraspecies(parsed.infraspecies)
  }
  delete parsed['cultivarQuote']
  if (Object.keys(parsed).length === 0) {
    return { tail: s }
  }
  // Hybrid formulas
  if (!('hybrid' in parsed)) {
    const hybrids = []
    while (parse(`^(?:[xX×])(?:$| )`, parsed)) {
      const temp = {}
      recurse(HYBRID, temp)
      if ('infraspecies' in temp) {
        temp['infraspecies'] = parseInfraspecies(temp['infraspecies'])
      }
      delete temp['cultivarQuote']
      if (Object.keys(temp).length > 0) {
        hybrids.push(temp)
      }
    }
    if (hybrids.length > 0) {
      parsed.hybrids = hybrids
      parsed.hybrid = true
    }
  }
  // Unparsed tail
  if (s) {
    parsed.tail = s
  }
  return formatScientificName(parsed)
}

// ---- Class definition ----

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
    this.parsed = formatScientificName(obj)
  }

  /**
   * Build scientific name from string.
   *
   * @param {string} str
   * @returns {ScientificName}
   * @example
   * ScientificName.fromString('Malus pumila')
   * // ScientificName {
   * //   parsed: { genus: 'Malus', species: 'pumila' },
   * //   input: 'Malus pumila'
   * // }
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
   * @returns {ScientificName}
   * @example
   * ScientificName.fromFields({ scientific: 'Malus pumila', other: 'Bloop' })
   * // ScientificName {
   * //   parsed: { genus: 'Malus', species: 'pumila' },
   * //   input: { scientific: 'Malus pumila' }
   * // }
   * ScientificName.fromFields({ genus: 'malus', species: 'PLATANOÏDES' })
   * // ScientificName {
   * //   parsed: { genus: 'Malus', species: 'platanoides' },
   * //   input: { genus: 'malus', species: 'PLATANOÏDES'}
   * // }
   */
  static fromFields(obj) {
    const inputs = {}
    ScientificName._allFields.forEach(key => {
      if (obj[key]) {
        inputs[key] = obj[key]
      }
    })
    let parsed = { ...inputs }
    if (parsed.scientific) {
      Object.assign(parsed, parseScientificName(parsed.scientific))
      delete parsed.scientific
    }
    const sciname = new ScientificName(parsed)
    sciname.input = inputs
    if (sciname.parsed.species && sciname.parsed.species.match(/^([xX×]|hybrid)$/)) {
      sciname.parsed.hybrid = true
      delete sciname.parsed.species
    }
    return sciname
  }

  /**
   * Print scientific name to string.
   *
   * @param {object} options - Print options (see {@link printScientificName}).
   * @returns {string}
   * @example
   * ScientificName.fromString(`Malus pumila var. asiatica 'Gala'`).toString()
   * // "Malus pumila var. asiatica 'Gala'"
   */
  toString(options) {
    return printScientificName(this.parsed, options)
  }

  /**
   * Generate compare function for sorting by string representation.
   *
   * @param {object} options - Print options (see {@link printScientificName}).
   * @returns {function} Compare function (a, b).
   * @example
   * l = [new ScientificName({genus: 'Prunus'}), new ScientificName({genus: 'Malus'})]
   * l.sort(ScientificName.compareStrings())
   * // [
   * //   ScientificName { parsed: { genus: 'Malus' } },
   * //   ScientificName { parsed: { genus: 'Prunus' } }
   * // ]
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
   * @returns {string[]}
   * @example
   * ScientificName.fromString('... Malus x pumila ...').warnings()
   * // [ 'Unparsed head', 'Unparsed tail', 'Hybrid' ]
   * ScientificName.fromFields({genus: 'Malus', species: 'pumila', scientific: 'Pyrus communis'}).warnings()
   * // [ 'Inconsistent secondary fields: genus, species' ]
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
      if (this.parsed.hybridGenus) {
        warnings.push('Hybrid genus')
      } else if (this.parsed.hybrids) {
        warnings.push('Hybrid formula')
      } else {
        warnings.push('Hybrid')
      }
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
   * @returns {string[]}
   * @example
   * (new ScientificName({species: 'pumila'})).errors()
   * // [ 'Missing genus' ]
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
   * @returns {object}
   * @example
   * ScientificName.fromString('... Malus x pumila ...').report()
   * // {
   * //    input: '... Malus x pumila ...',
   * //    parsed: {
   * //      head: '... ',
   * //      genus: 'Malus',
   * //      species: 'pumila',
   * //      hybrid: true,
   * //      tail: '...'
   * //    },
   * //    warnings: [ 'Unparsed head', 'Unparsed tail', 'Hybrid' ]
   * // }
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
