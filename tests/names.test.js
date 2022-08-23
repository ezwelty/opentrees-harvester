const { parseScientificName } = require('../lib/names')
const { expect, test } = require('@jest/globals')

const STANDARDS = {
  "Generic": {
    "uninomial": "Generic"
  },
  "Generic specific": {
    genus: "Generic",
    species: "specific"
  },
  "Generic specific 'Cultivar'": {
    genus: "Generic",
    species: "specific",
    cultivar: "Cultivar"
  },
  "Generic specific subsp. specific": {
    genus: "Generic",
    species: "specific",
    infraspecies: [
      {
        rank: "subsp.",
        epithet: "specific"
      }
    ]
  },
  "Generic specific subsp. specific 'Cultivar'": {
    genus: "Generic",
    species: "specific",
    infraspecies: [
      {
        rank: "subsp.",
        epithet: "specific"
      }
    ],
    cultivar: "Cultivar"
  },
  "Generic 'Cultivar'": {
    genus: "Generic",
    cultivar: "Cultivar"
  },
  "Generic sp.": {
    genus: "Generic"
  },
  "Generic sp. 'Cultivar'": {
    genus: "Generic",
    cultivar: "Cultivar"
  },
  "Generic subgen. Subgeneric": {
    genus: "Generic",
    "subgenus": "Subgeneric"
  },
  "Generic ×": {
    genus: "Generic",
    hybrid: true
  },
  "Generic × 'Cultivar'": {
    genus: "Generic",
    hybrid: true,
    cultivar: "Cultivar"
  },
  "Generic × specific": {
    genus: "Generic",
    hybrid: true,
    species: "specific"
  },
  "Generic × specific 'Cultivar'": {
    genus: "Generic",
    hybrid: true,
    species: "specific",
    cultivar: "Cultivar"
  },
  "Generic × specific subsp. specific": {
    genus: "Generic",
    hybrid: true,
    species: "specific",
    infraspecies: [
      {
        rank: "subsp.",
        epithet: "specific"
      }
    ]
  },
  "Generic × specific subsp. specific 'Cultivar'": {
    genus: "Generic",
    hybrid: true,
    species: "specific",
    infraspecies: [
      {
        rank: "subsp.",
        epithet: "specific"
      }
    ],
    cultivar: "Cultivar"
  },
  "Generic hybrid": {
    genus: "Generic",
    hybrid: true
  },
  "Generic hybrid 'Cultivar'": {
    genus: "Generic",
    hybrid: true,
    cultivar: "Cultivar"
  },
  "× Generic": {
    genus: "Generic",
    hybrid: true,
    hybridGenus: true
  },
  "× Generic sp.": {
    genus: "Generic",
    hybrid: true,
    hybridGenus: true
  },
  "× Generic sp.": {
    genus: "Generic",
    hybrid: true,
    hybridGenus: true
  },
  "× Generic sp. 'Cultivar'": {
    genus: "Generic",
    hybrid: true,
    hybridGenus: true,
    cultivar: "Cultivar"
  },
  "× Generic 'Cultivar'": {
    genus: "Generic",
    hybrid: true,
    hybridGenus: true,
    cultivar: "Cultivar"
  },
  "× Generic specific": {
    genus: "Generic",
    hybrid: true,
    hybridGenus: true,
    species: "specific"
  },
  "× Generic specific 'Cultivar'": {
    genus: "Generic",
    hybrid: true,
    hybridGenus: true,
    species: "specific",
    cultivar: "Cultivar"
  },
  "× Generic specific subsp. specific": {
    genus: "Generic",
    hybrid: true,
    hybridGenus: true,
    species: "specific",
    infraspecies: [
      {
        rank: "subsp.",
        epithet: "specific"
      }
    ]
  },
  "× Generic specific subsp. specific 'Cultivar'": {
    genus: "Generic",
    hybrid: true,
    hybridGenus: true,
    species: "specific",
    infraspecies: [
      {
        rank: "subsp.",
        epithet: "specific"
      }
    ],
    cultivar: "Cultivar"
  },
  "Generic specific x Generic specific": {
    genus: "Generic",
    species: "specific",
    hybrids: [
      {
        genus: "Generic",
        species: "specific"
      }
    ],
    hybrid: true,
  },
  "Generic specific x G. specific": {
    genus: "Generic",
    species: "specific",
    hybrids: [
      {
        genus: "Generic",
        species: "specific"
      }
    ],
    hybrid: true
  },
  "Generic specific x specific": {
    genus: "Generic",
    species: "specific",
    hybrids: [
      {
        genus: "Generic",
        species: "specific"
      }
    ],
    hybrid: true
  },
  "Generic specific subsp. specific x specific 'Cultivar'": {
    genus: "Generic",
    species: "specific",
    infraspecies: [
      {
        rank: "subsp.",
        epithet: "specific"
      }
    ],
    hybrids: [
      {
        genus: "Generic",
        species: "specific",
        cultivar: "Cultivar"
      }
    ],
    hybrid: true
  }
}

const VARIANTS = [
  {
    scientific: [
      "Genus sp",
      "Genus sp.",
      "Genus spp",
      "Genus spp.",
      "Genus species"
    ],
    parsed: { genus: "Genus" }
  },
  {
    scientific: [
      `Genus 'Cultivar'`,
      `Genus ''Cultivar''`,
      `Genus '''Cultivar'''`,
      `Genus "Cultivar"`,
      `Genus ""Cultivar""`,
      `Genus """Cultivar"""`,
      "Genus sp 'Cultivar'",
      "Genus sp. 'Cultivar'",
      "Genus spp 'Cultivar'",
      "Genus spp. 'Cultivar'",
      "Genus species 'Cultivar'"
    ],
    parsed: { genus: "Genus", cultivar: "Cultivar" }
  },
  {
    scientific: [
      "Genus speciosa subsp mora",
      "Genus speciosa subsp. mora",
      "Genus speciosa subspp mora",
      "Genus speciosa subspp. mora",
      "Genus speciosa ssp mora",
      "Genus speciosa ssp. mora",
      "Genus speciosa sspp mora",
      "Genus speciosa sspp. mora",
      "Genus speciosa subspecies mora"
    ],
    parsed: {
      genus: "Genus", species: "speciosa",
      infraspecies: [{ rank: "subsp.", epithet: "mora" }]
    },
  },
  {
    scientific: [
      "Genus speciosa var mora",
      "Genus speciosa var. mora",
      "Genus speciosa variety mora",
      "Genus speciosa varietas mora"
    ],
    parsed: {
      genus: "Genus", species: "speciosa",
      infraspecies: [{ rank: "var.", epithet: "mora" }]
    },
  },
  {
    scientific: [
      "Genus speciosa subvar mora",
      "Genus speciosa subvar. mora",
      "Genus speciosa subvariety mora",
      "Genus speciosa subvarietas mora"
    ],
    parsed: {
      genus: "Genus", species: "speciosa",
      infraspecies: [{ rank: "subvar.", epithet: "mora" }]
    },
  },
  {
    scientific: [
      "Genus speciosa f mora",
      "Genus speciosa f. mora",
      "Genus speciosa form mora",
      "Genus speciosa forma mora"
    ],
    parsed: {
      genus: "Genus", species: "speciosa",
      infraspecies: [{ rank: "f.", epithet: "mora" }]
    },
  },
  {
    scientific: [
      "Genus speciosa subf mora",
      "Genus speciosa subf. mora",
      "Genus speciosa subform mora",
      "Genus speciosa subforma mora"
    ],
    parsed: {
      genus: "Genus", species: "speciosa",
      infraspecies: [{ rank: "subf.", epithet: "mora" }]
    },
  },
  {
    scientific: [
      "Genus subg Subgenus",
      "Genus subg. Subgenus",
      "Genus subgen Subgenus",
      "Genus subgen. Subgenus",
      "Genus subgenus Subgenus"
    ],
    parsed: { genus: "Genus", subgenus: "Subgenus" }
  },
  {
    scientific: [
      "× Genus",
      "×Genus",
      "×GENUS",
      "×genus",
      "x Genus",
      "xGenus",
      "X Genus"
    ],
    parsed: { genus: "Genus", hybrid: true, hybridGenus: true }
  },
  {
    scientific: [
      "XGENUS",
      "xgenus"
    ],
    parsed: { uninomial: "Xgenus" }
  },
  {
    scientific: [
      "Genus ×",
      "Genus x",
      "Genus X",
      "Genus hybrid"
    ],
    parsed: { genus: "Genus", hybrid: true }
  },
  {
    "scientific": [
      "Genus × speciosa",
      "Genus ×speciosa",
      "genus ×speciosa",
      "GENUS ×SPECIOSA",
      "Genus x speciosa",
      "Genus X speciosa",
      "Genus Xspeciosa"
    ],
    "parsed": { genus: "Genus", hybrid: true, species: "speciosa" }
  },
  {
    "scientific": [
      "Genus xspeciosa",
      "GENUS XSPECIOSA",
      "genus xspeciosa"
    ],
    "parsed": { genus: "Genus", species: "xspeciosa" }
  },
  {
    "scientific": [
      "Genus speciosa × Genus speciosa",
      "Genus speciosa x Genus speciosa",
      "Genus speciosa X Genus speciosa"
    ],
    "parsed": {
      genus: "Genus", species: "speciosa",
      hybrids: [{ genus: "Genus", species: "speciosa" }],
      hybrid: true
    }
  }
]

const SINGLES = {
  "Acer platanoïdes": { genus: 'Acer', species: 'platanoides' },
  " Acer alba ": { genus: 'Acer', species: 'alba' },
  "acer alba": { genus: 'Acer', species: 'alba' },
  "ACER ALBA": { genus: 'Acer', species: 'alba' },
  "Hibiscus-falsa rosa-sinensis ima-gina": {
    genus: "Hibiscus-falsa",
    species: "rosa-sinensis",
    infraspecies: [{ epithet: "ima-gina" }]
  },
  "Cedrus deodara 'Feelin' Blue'": {
    genus: 'Cedrus', species: 'deodara', cultivar: "Feelin' Blue"
  },
  "Brownea rosa-de-monte": {
    genus: 'Brownea', species: 'rosa-de-monte'
  }
}

// ---- Run tests ----

describe("Parses standard formats", () => {
  for (const name in STANDARDS) {
    test(name, () => {
      const parsed = parseScientificName(name)
      expect(parsed).toEqual(STANDARDS[name])
    })
  }
})

describe("Parses variants", () => {
  for (const name in SINGLES) {
    test(name, () => {
      const parsed = parseScientificName(name)
      expect(parsed).toEqual(SINGLES[name])
    })
  }
})

describe("Parses outliers", () => {
  for (const group of VARIANTS) {
    for (const name of group.scientific) {
      test(name, () => {
        const parsed = parseScientificName(name)
        expect(parsed).toEqual(group.parsed)
      })
    }
  }
})
