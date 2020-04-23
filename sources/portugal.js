module.exports = [
  {
    id: 'cascais_pt',
    short: 'Cascais',
    long: 'Câmara Municipal de Cascais',
    download: 'https://dadosabertos.cascais.pt/dataset/5ae9100a-01ea-45da-bb02-e033aa5ebe90/resource/9a3f0648-de96-4075-88d5-f0e15ded4d2a/download/mnarvore.geojson',
    info: 'http://dadosabertos.cascais.pt/dataset/arvores-em-espaco-publico',
    // GeoJSON has invalid lines that must be removed
    // Other available formats are valid but have corrupt characters
    cmd: "grep -v '^,' mnarvore.geojson > temp && mv temp mnarvore.geojson",
    license: { id: 'CC0-1.0' },
    delFunc: x => x['Geometry name'] === 'Localização Abate',
    crosswalk: {
      ref: 'Número de Registo',
      common: 'Espécie',
      scientific: 'Nome Científico',
      maturity: x => ({ Jovem: 'young', Adulto: 'mature', Velho: 'over-mature' })[x.Estado],
      location: x => ({ Arruamento: 'street', 'Espaço Verde': 'park' })[x.Implantação],
      manager: 'Gestor',
      updated: x => x['Data de actualização'] ?
        x['Data de actualização'].replace(/^([0-9]{2})\/([0-9]{2})\/([0-9]{4}).*$/, '$3-$2-$1') : null,
      planted: x => x['Data de Plantação'] ?
        x['Data de Plantação'].replace(/^([0-9]{2})\/([0-9]{2})\/([0-9]{4}).*$/, '$3-$2-$1') : null
    }
  },
  {
    id: 'lisbon',
    country: 'Portugal',
    download: 'https://opendata.arcgis.com/datasets/202d0f1a7f234e449761af8af14436d6_0.zip',
    info: 'http://geodados.cm-lisboa.pt/datasets/arvoredo?geometry=-9.312%2C38.745%2C-9.148%2C38.768',
    crosswalk: {
      scientific: 'ESPECIE_VA',
      location: 'LOCAL'
    },
    short: 'Lisbon'
  }
].map(s => ({ ...s, country: 'Portugal', language: 'pt-PT' }))
