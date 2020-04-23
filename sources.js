const glob = require('glob')
const path = require('path')
var Source = require('./source')

const sources = glob.sync(`./sources/**/*.js`).
  map(file => require(file)).flat().
  map(props => new Source(props, path.join('data', props.id, 'input')))

module.exports = sources;
