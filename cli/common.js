const DEFAULT_OPTIONS = [
  {
    name: 'help', alias: 'h', type: Boolean, defaultValue: false
  },
  {
    name: 'ids', alias: 'i', type: String, multiple: true, defaultOption: true,
    description: 'Restrict to these source identifiers.'
  },
  {
    name: 'countries', alias: 'c', type: String, multiple: true,
    description: 'Restrict to these source countries (case and whitespace insensitive).'
  },
  {
    name: 'dir', alias: 'd', type: String, defaultValue: 'data/${id}/input',
    // Escape special characters for chalk. See https://github.com/Polymer/tools/pull/612
    description: "Template for input directory, with source properties referred to by name (default: 'data/${id}/input').".
      replace(/[{}\\]/g, '\\$&')
  }
]

module.exports = {
  DEFAULT_OPTIONS
}
