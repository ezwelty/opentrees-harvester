const DEFAULT_OPTIONS = [
  {
    name: 'help', type: Boolean, defaultValue: false
  },
  {
    name: 'id', type: String, multiple: true,
    description: 'Restrict by id.\nNote: These are currently assigned automatically on load based on source properties and are thus subject to change.'
  },
  {
    name: 'country', type: String, multiple: true,
    description: 'Restrict by country.'
  },
  {
    name: 'city', type: String, multiple: true,
    description: 'Restrict by city.'
  },
  {
    name: 'state', type: String, multiple: true,
    description: 'Restrict by state.'
  },
  {
    name: 'designation', type: String, multiple: true,
    description: 'Restrict by designation.'
  },
  {
    name: 'scope', type: String, multiple: true,
    description: 'Restrict by scope.'
  },
  {
    name: 'omit', type: Boolean, defaultValue: false,
    description: 'Whether to keep sources flagged as `omit: true`.'
  }
]

module.exports = {
  DEFAULT_OPTIONS
}
