const FuzzySet = require('fuzzyset.js')
const names = require('./names')

ASCII = {
  a: 'aⓐａẚàáâầấẫẩãāăằắẵẳȧǡäǟảåǻǎȁȃạậặḁąⱥɐꜳ',
  ao: 'ꜵ',
  au: 'ꜷ',
  av: 'ꜹꜻ',
  ay: 'ꜽ',
  ae: 'æǽǣ',
  b: 'bⓑｂḃḅḇƀƃɓ',
  c: 'cⓒｃćĉċčçḉƈȼ',
  d: 'dⓓｄḋďḍḑḓḏđƌɖɗꝺð',
  dz: 'ǳǆ',
  e: 'eⓔｅèéêềếễểẽēḕḗĕėëẻěȅȇẹệȩḝęḙḛɇɛǝ',
  f: 'fⓕｆḟƒ',
  g: 'gⓖｇǵĝḡğġǧģǥɠꞡᵹ',
  h: 'hⓗｈĥḣḧȟḥḩḫẖħⱨɥ',
  hv: 'ƕ',
  i: 'iⓘｉìíîĩīĭïḯỉǐȉȋịįḭɨı',
  j: 'jⓙｊĵǰɉ',
  k: 'kⓚｋḱǩḳķḵƙⱪꝁꝃꝅꞣ',
  l: 'lⓛｌŀĺľḷḹļḽḻłƚɫ',
  lj: 'ǉ',
  m: 'mⓜｍḿṁṃɱɯ',
  n: 'nⓝｎǹńñṅňṇņṋṉƞɲŉꞑꞥ',
  nj: 'ǌ',
  o: 'oⓞｏòóôồốỗổõṍȭṏōṑṓŏȯȱöȫỏőǒȍȏơờớỡởợọộǫǭøǿɔꝋꝍɵ',
  oe: 'œ',
  oi: 'ƣ',
  ou: 'ȣ',
  oo: 'ꝏ',
  p: 'pⓟｐṕṗƥᵽꝑꝓꝕ',
  q: 'qⓠｑɋꝗꝙ',
  r: 'rⓡｒŕṙřȑȓṛṝŗṟɍɽ',
  s: 'sⓢｓśṥŝṡšṧṣṩșşȿꞩẛſß',
  t: 'tⓣｔṫẗťṭțţṱṯŧƭʈⱦ',
  tz: 'ꜩ',
  u: 'uⓤｕùúûũṹūṻŭüǜǘǖǚủůűǔȕȗưừứữửựụṳųṷṵʉ',
  v: 'vⓥｖṽṿʋꝟʌ',
  w: 'wⓦｗẁẃŵẇẅẘẉⱳ',
  x: 'xⓧｘẋẍ',
  y: 'yⓨｙỳýŷỹȳẏÿỷẙỵƴɏỿ',
  z: 'zⓩｚźẑżžẓẕƶȥɀⱬ'
}

const ASCII_MAP = {}
for (const key in ASCII) {
  for (const letter of ASCII[key]) {
    ASCII_MAP[letter] = key
  }
}

PHONETIZE = {
  start: [
    ['e', /^(ae|ea|oe)/],
    ['j', /^dj/],
    ['mac', /^mc/],
    ['n', /^(cn|gn|kn|mn)/],
    ['q', /^qu/],
    ['r', /^wr/],
    ['s', /^(ps|ts)/],
    ['t', /^(ct|pt)/],
    ['u', /^eu/],
    ['z', /^(cz|x)/]
  ],
  body: [
    ['', /h/g],
    ['i', /(ae|oe)/g],
    ['a', /(ia|oi)/g],
    ['s', /sc/g],
    ['a', /o/g],
    ['c', /k/g],
    ['i', /[euy]/g],
    ['s', /z/g]
  ],
  ending: [
    // -is (includes -us, -ys, -es), -im (was -um), -as (-os)
    ['a', /(is|im|as)$/]
  ]
}

/**
 * Capitalize first character of a string.
 * 
 * @param {string} s
 * @return {string}
 * @example
 * capitalize('malus') // 'Malus'
 */
function capitalize(s) {
  return s[0].toUpperCase() + s.slice(1)
}

/**
 * Normalize a scientific name component.
 * 
 * Converts to lowercase, removes dashes, and latinizes characters.
 * 
 * @param {string} s - Single word string.
 * @return {string}
 * @example
 * normalize('Leœptura') // 'leoeptura'
 * normalize('Ærenea') // 'aerenea'
 * normalize('Fallén') // 'fallen'
 * normalize('Choriozopella') // 'choriozopella'
 * normalize('trägårdhi') // 'tragardhi'
 * normalize('rosa-sinensis') // 'rosasinensis'
 */
function normalize(s) {
  return s.
    toLowerCase().
    replace(/-/g, '').
    replace(/[^\u0000-\u007E]/g, a => ASCII_MAP[a] || a)
}

/**
 * Phonetize a scientific name component.
 * 
 * Expects a normalized string (see {@link normalize}).
 * Implements the phonetic normalization from the Taxamatch algorithm by Tony Reese
 * (http://www.cmar.csiro.au/datacentre/taxamatch.htm).
 * 
 * @param {string} s - Single word string.
 * @param {boolean} ending - Whether to normalize ending.
 * Recommended for species and infraspecies epithets.
 * @return {string}
 * @example
 * phonetize('betula') // 'bitila'
 * phonetize('leoeptura') // 'liptira'
 * phonetize('laetifica', true) // 'litifica'
 * phonetize('hydnellum') // 'hidnilim'
 * phonetize('scrobiculatum', true) // 'scrabicilata'
 * phonetize('zonatum', true) // 'zanata'
 * phonetize('plantagi') === phonetize('plantagy') // true
 * phonetize('xaaaaantheriiiiii') === phonetize('zaaaantheryyyyy') // true
 * phonetize('majorum', true) === phonetize('majoris', true) // true
 */
function phonetize(s, ending = false) {
  PHONETIZE.start.forEach(v => {
    s = s.replace(v[1], v[0])
  })
  PHONETIZE.body.forEach(v => {
    s = s[0] + s.slice(1).replace(v[1], v[0])
  })
  // Remove repating characters
  s = s.replace(/([a-z])(?=\1)/g, '')
  // Phonetize ending
  if (ending && s.length > 4) {
    PHONETIZE.ending.forEach(v => {
      s = s.replace(v[1], v[0])
    })
  }
  return s
}

/**
 * Class for matching scientific names to a taxonomic dictionary.
 * 
 * Currently supports exact, fuzzy, and phonetic matching on:
 * - genus
 * - species
 * - first infraspecies epithet and rank
 *
 * @param {object[]} taxa - Taxonomic dictionary. Each taxon must have a unique id and
 * `genus`, and may have `species` and `infraspecies` [{ rank, epithet }, ...].
 * @param {string} [id='id'] - Key in `taxa` to use as unique object identifier.
 * @example
 * taxa = [
 *  { id: 0, genus: 'Malus' },
 *  { id: 1, genus: 'Malus', species: 'pumila' },
 *  { id: 2, genus: 'Malus', species: 'pumila', infraspecies: [{ rank: 'var.', epithet: 'asiatica' }] }
 * ]
 * matcher = new Matcher(taxa)
 * matcher.match({ genus: 'Malus' })
 * matcher.match({ genus: 'Malis' })
 * matcher.match({ genus: 'Malus', species: 'pumila' })
 * matcher.match({ genus: 'Malus', species: 'pimila' })
 * matcher.match({ genus: 'Mala', species: 'pimila' })
 * matcher.match({ genus: 'Malus', species: 'pumila', infraspecies: [{ epithet: 'asiatica'}] })
 * matcher.match({ genus: 'Malus', species: 'pumila', infraspecies: [{ rank: 'f.', epithet: 'asiatica'}] })
 * matcher.match({ genus: 'Malus', species: 'pumila', infraspecies: [{ rank: 'var.', epithet: 'asiatica'}] })
 * matcher.match({ genus: 'Malis', species: 'pimila', infraspecies: [{ rank: 'var.', epithet: 'asiatica'}] })
 */
class Matcher {

  constructor(taxa, id = 'id') {
    this.taxa = taxa
    this.normalized = {}
    this.normalized.tree = taxa.reduce((obj, t) => {
      if (!(t.genus in obj)) {
        obj[t.genus] = { '': { genus: t.genus } }
      }
      let node = obj[t.genus]
      if (t.species) {
        if (!(t.species in node)) {
          node[t.species] = { '': { genus: t.genus, species: t.species } }
        }
      } else {
        node[''] = t
        return obj
      }
      node = node[t.species]
      if (t.infraspecies && t.infraspecies[0]) {
        if (!(t.infraspecies[0].epithet in node)) {
          node[t.infraspecies[0].epithet] = {}
        }
        node = node[t.infraspecies[0].epithet]
        node[''] = t
        if (t.infraspecies[0].rank) {
          node[t.infraspecies[0].rank] = t
        }
      } else {
        node[''] = t
        return obj
      }
      return obj
    }, {})
    this.normalized.fuzzyGenus = FuzzySet(Object.keys(this.normalized.tree))
    this.phonetized = {}
    this.phonetized.tree = taxa.reduce((obj, t) => {
      let value = capitalize(phonetize(t.genus.toLowerCase()))
      if (!(value in obj)) {
        obj[value] = { '': [{ genus: t.genus }] }
      }
      let node = obj[value]
      if (t.species) {
        value = phonetize(t.species, true)
        if (!(value in node)) {
          node[value] = { '': [{ genus: t.genus, species: t.species }] }
        }
      } else {
        if (id in node[''][0]) {
          node[''] = [t]
        } else {
          node[''].push(t)
        }
        return obj
      }
      node = node[value]
      if (t.infraspecies && t.infraspecies[0]) {
        value = phonetize(t.infraspecies[0].epithet, true)
        if (!(value in node)) {
          node[value] = {}
        }
        node = node[value]
        if (node['']) {
          node[''].push(t)
        } else {
          node[''] = [t]
        }
        if (t.infraspecies[0].rank) {
          node[t.infraspecies[0].rank] = [t]
        }
      } else {
        if (id in node[''][0]) {
          node[''] = [t]
        } else {
          node[''].push(t)
        }
        return obj
      }
      return obj
    }, {})
    this._fuzzyCache = new WeakMap()
  }

  _getFuzzySet(obj, n = 3) {
    if (!this._fuzzyCache.has(obj)) {
      this._fuzzyCache.set(obj, FuzzySet(Object.keys(obj)))
      if (this._fuzzyCache.size > n) {
        this._fuzzyCache.delete(this._fuzzyCache.keys().next().value)
      }
    }
    return this._fuzzyCache.get(obj)
  }

  _matchNode(key, node, set, scores = []) {
    const results = []
    if (key in node) {
      results.push([node[key], [...scores, 1]])
    } else {
      const fuzzy = set.get(key)
      if (fuzzy) {
        for (let [score, match] of fuzzy) {
          if (score < fuzzy[0][0]) {
            break
          }
          results.push([node[match], [...scores, score]])
        }
      }
    }
    return results
  }

  _matchNormalized(name) {
    const matches = []
    let results
    if (name.genus) {
      results = this._matchNode(name.genus, this.normalized.tree, this.normalized.fuzzyGenus)
    } else {
      return matches
    }
    if (name.species) {
      results = results.reduce((obj, x) => {
        const xi = this._matchNode(name.species, x[0], this._getFuzzySet(x[0]), x[1])
        if (xi.length) {
          obj = obj.concat(xi)
        } else {
          matches.push({
            incomplete: true, ...Math.min(...x[1]) < 1 && { fuzzy: x[1] }, taxon: x[0]['']
          })
        }
        return obj
      }, [])
    } else {
      results.forEach(x => {
        matches.push({ ...Math.min(...x[1]) < 1 && { fuzzy: x[1] }, taxon: x[0][''] })
      })
      return matches
    }
    const infraspecies = (name.infraspecies && name.infraspecies[0]) || {}
    if (infraspecies.epithet) {
      results = results.reduce((obj, x) => {
        const xi = this._matchNode(infraspecies.epithet, x[0], this._getFuzzySet(x[0]), x[1])
        if (xi.length) {
          obj = obj.concat(xi)
        } else {
          matches.push({
            incomplete: true, ...Math.min(...x[1]) < 1 && { fuzzy: x[1] }, taxon: x[0]['']
          })
        }
        return obj
      }, [])
      if (infraspecies.rank) {
        results = results.reduce((obj, x) => {
          if (infraspecies.rank in x[0]) {
            matches.push({
              ...Math.min(...x[1]) < 1 && { fuzzy: x[1] },
              taxon: x[0][infraspecies.rank]
            })
          } else {
            obj.push(x)
          }
          return obj
        }, [])
      }
    }
    results.forEach(x => {
      matches.push({ ...Math.min(...x[1]) < 1 && { fuzzy: x[1] }, taxon: x[0][''] })
    })
    return matches
  }

  _matchPhonetized(name) {
    let node = this.phonetized.tree
    let value
    // genus
    if (name.genus) {
      value = capitalize(phonetize(name.genus.toLowerCase()))
      if (value in node) {
        node = node[value]
      } else {
        return
      }
    } else {
      return
    }
    // species
    if (name.species) {
      value = phonetize(name.species, true)
      if (value in node) {
        node = node[value]
      } else {
        return { incomplete: true, phonetic: true, taxon: node[''] }
      }
    } else {
      return { phonetic: true, taxon: node[''] }
    }
    // infraspecies
    const infraspecies = (name.infraspecies && name.infraspecies[0]) || {}
    if (infraspecies.epithet) {
      value = phonetize(infraspecies.epithet, true)
      if (value in node) {
        node = node[value]
      } else {
        return { incomplete: true, phonetic: true, taxon: node[''] }
      }
      if (infraspecies.rank) {
        if (infraspecies.rank in node) {
          return { phonetic: true, taxon: node[infraspecies.rank] }
        }
      }
    }
    return { phonetic: true, taxon: node[''] }
  }

  /**
   * Match scientific name to taxa.
   * 
   * @param {names.ParsedScientificName} name - Scientific name.
   * @return {object[]} Taxon match(es) in the following order:
   * - exact and complete match, or
   * - complete phonetic match or fuzzy match(es)
   * - incomplete exact, phonetic, or fuzzy match(es)
   * Each match is in the following format:
   * - {boolean} incomplete - Whether match is of a higher rank than the provided name.
   * - {number[]} fuzzy - Similarity score (0-1) for each matched name component
   * (in the order genus, species, infraspecies), if fuzzy.
   * - {boolean} phonetic - Whether match is phonetic.
   * - {object} taxon - Matched taxon.
   */
  match(name) {
    const matches = this._matchNormalized(name)
    if (!matches[0] || matches[0].fuzzy || matches[0].incomplete) {
      const phonetized = this._matchPhonetized(name)
      if (phonetized) {
        // Multiple taxa may have the same phonetic name
        for (let taxon of phonetized.taxon) {
          matches.push({ ...phonetized, taxon: taxon })
        }
      }
    }
    matches.sort((a, b) => {
      return `${a.incomplete ? 1 : 0}${a.fuzzy ? 1 : 0}${a.phonetic ? 1 : 0}` -
        `${b.incomplete ? 1 : 0}${b.fuzzy ? 1 : 0}${b.phonetic ? 1 : 0}`
    })
    // Remove matches included in more complete matches
    const print = matches.map(x => names.printScientificName(x.taxon, { rank: false }))
    return matches.filter((_, i) => {
      for (let j = 0; j < i; j++) {
        if (print[j].startsWith(print[i])) {
          return false
        }
      }
      return true
    })
  }
}

module.exports = {
  capitalize,
  normalize,
  phonetize,
  Matcher
}
