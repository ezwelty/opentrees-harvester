module.exports = [
  {
    id: 'bologna_it',
    short: 'Bologna',
    long: 'Comune di Bologna',
    country: 'Italy',
    download: 'http://dati.comune.bologna.it/download/file/fid/3989',
    info: 'http://dati.comune.bologna.it/node/207',
    crosswalk: {
      scientific: 'decodifi_4',
      // decodifi_2: circumference min - max [cm] (diameter min-max [cm])
      circumference_cm_min: x => {
        let match = x['decodifi_2'].match(/^([0-9]+)\s*-\s*[0-9]+|^>\s*([0-9]+)/)
        if (match) return match[1] | match[2]
        else if (x['decodifi_2'].match(/^<\s*[0-9]+/)) return 0
      },
      circumference_cm_max: x => {
        let match = x['decodifi_2'].match(/^[0-9]+\s*-\s*([0-9]+)|^<\s*([0-9]+)/)
        if (match) return match[1] | match[2]
      },
      ref: 'NUM_PT',
      // CL_H? height? health?
    },
    license: { id: 'CC-BY-3.0' }
  },
  {
    id: 'villa_manin_it',
    short: 'Villa_Manin',
    country: 'Italy',
    download: 'https://www.dati.friuliveneziagiulia.it/api/views/uqpq-dr8x/rows.csv?accessType=DOWNLOAD',
    info: 'https://www.dati.friuliveneziagiulia.it/dataset/Alberi-di-Villa-Manin/uqpq-dr8x',
    crosswalk: {
      location: 'dove',
      scientific: 'specie',
      family: 'familia',
      updated: 'data rilievo',
      // lots more fields with very weird names like 'SFRC|SFR', 'PIP|PI'
    }
  }
].map(s => ({ ...s, country: 'Italy' }))
