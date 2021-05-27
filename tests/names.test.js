const { parseScientificName } = require('lib/names')

test('parses scientific names', () => {
  expect(parseScientificName(`Genus hybrid`)).
    toStrictEqual({ genus: 'Genus', hybrid: true })
})
