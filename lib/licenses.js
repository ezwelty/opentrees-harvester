/**
 * Data licenses.
 *
 * @module
 * @private
 */

/**
 * Common data licenses.
 *
 * Each property is a license identifier. The value is an object with the
 * following properties:
 * - spdx: Whether the license is in the Software Package Data Exchange (SPDX)
 *   [license list](https://spdx.org/licenses/).
 * - name: License name.
 * - url: License URL.
 * @type {Object}
 */
const LICENSES = {
  'CC-BY-2.0': {
    spdx: true,
    name: 'Creative Common Attribution 2.0 Generic',
    url: 'https://creativecommons.org/licenses/by/2.0/'
  },
  'CC-BY-2.5-AR': {
    spdx: false,
    name: 'Creative Commons Attribution 2.5 Argentina',
    url: 'https://creativecommons.org/licenses/by/2.5/ar/'
  },
  'CC-BY-2.5-AU': {
    spdx: false,
    name: 'Creative Commons Attribution 2.5 Australia',
    url: 'https://creativecommons.org/licenses/by/2.5/au/'
  },
  'CC-BY-3.0': {
    spdx: true,
    name: 'Creative Common Attribution 3.0 Unported',
    url: 'https://creativecommons.org/licenses/by/3.0/'
  },
  'CC-BY-3.0-AU': {
    spdx: false,
    name: 'Creative Commons Attribution 3.0 Australia',
    url: 'https://creativecommons.org/licenses/by/3.0/au/'
  },
  'CC-BY-3.0-CH': {
    spdx: false,
    name: 'Creative Commons Attribution 3.0 Switzerland',
    url: 'https://creativecommons.org/licenses/by/3.0/ch/'
  },
  'CC-BY-3.0-DE': {
    spdx: true,
    name: 'Creative Commons Attribution 3.0 Germany',
    url: 'https://creativecommons.org/licenses/by/3.0/de/'
  },
  'CC-BY-3.0-NZ': {
    spdx: false,
    name: 'Creative Commons Attribution 3.0 New Zealand',
    url: 'https://creativecommons.org/licenses/by/3.0/nz'
  },
  'CC-BY-4.0': {
    spdx: true,
    name: 'Creative Common Attribution 4.0 International',
    url: 'https://creativecommons.org/licenses/by/4.0/'
  },
  'CC-BY-NC-4.0': {
    spdx: true,
    name: 'Creative Commons Attribution Non-Commercial 4.0 International',
    url: 'https://creativecommons.org/licenses/by-nc/4.0/'
  },
  'CC-BY-NC-ND-4.0': {
    spdx: true,
    name: 'Creative Commons Attribution Non-Commercial No-Derivatives 4.0 International',
    url: 'https://creativecommons.org/licenses/by-nc-nd/4.0/'
  },
  'CC-BY-NC-SA-4.0': {
    spdx: true,
    name: 'Creative Commons Attribution Non-Commercial Share-Alike 4.0 International',
    url: 'https://creativecommons.org/licenses/by-nc-sa/4.0/'
  },
  'CC-BY-SA-3.0': {
    spdx: true,
    name: 'Creative Common Attribution Share-Alike 3.0 Unported',
    url: 'https://creativecommons.org/licenses/by-sa/3.0/'
  },
  'CC-BY-SA-4.0': {
    spdx: true,
    name: 'Creative Common Attribution Share-Alike 4.0 International',
    url: 'https://creativecommons.org/licenses/by-sa/4.0/'
  },
  'CC-PDM-1.0': {
    spdx: false,
    name: 'Creative Commons Public Domain Mark 1.0 Universal',
    url: 'https://creativecommons.org/publicdomain/mark/1.0/'
  },
  'CC0-1.0': {
    spdx: true,
    name: 'Creative Commons Zero 1.0 Universal',
    url: 'https://creativecommons.org/publicdomain/zero/1.0/'
  },
  'DL-DE-BY-1.0': {
    spdx: false,
    name: 'Data License Germany Attribution 1.0',
    url: 'https://www.govdata.de/dl-de/by-1-0'
  },
  'DL-DE-BY-2.0': {
    spdx: true,
    name: 'Data License Germany Attribution 2.0',
    url: 'https://www.govdata.de/dl-de/by-2-0'
  },
  'DL-DE-ZERO-2.0': {
    spdx: true,
    name: 'Data License Germany Zero 2.0',
    url: 'https://www.govdata.de/dl-de/zero-2-0'
  },
  'etalab-1.0': {
    spdx: false,
    name: 'Etalab Open License 1.0',
    url: {file: 'https://www.etalab.gouv.fr/wp-content/uploads/2014/05/Open_Licence.pdf'}
  },
  'etalab-2.0': {
    spdx: true,
    name: 'Etalab Open License 2.0',
    url: {file: 'https://www.etalab.gouv.fr/wp-content/uploads/2018/11/open-licence.pdf'}
  },
  'IGCYL-NC': {
    spdx: false,
    name: 'Licencia Información Geográfica Castilla y León No Commercial',
    url: 'https://www.jcyl.es/licencia-IGCYL-NC'
  },
  'IODL-2.0': {
    spdx: false,
    name: 'Italian Open Data License 2.0',
    url: 'https://www.dati.gov.it/content/italian-open-data-license-v20'
  },
  'ODbL-1.0': {
    spdx: true,
    name: 'Open Data Commons Open Database License 1.0',
    url: 'https://opendatacommons.org/licenses/odbl/1-0/'
  },
  'ODC-By-1.0': {
    spdx: true,
    name: 'Open Data Commons Attribution License 1.0',
    url: 'https://opendatacommons.org/licenses/by/1-0/'
  },
  'OGDL-Taiwan-1.0': {
    spdx: true,
    name: 'Taiwan Open Government Data License 1.0',
    url: 'https://data.gov.tw/license'
  },
  'OGL-Canada-2.0': {
    spdx: true,
    name: 'Open Government Licence - Canada 2.0',
    url: 'https://open.canada.ca/en/open-government-licence-canada'
  },
  'OGL-UK-2.0': {
    spdx: true,
    name: 'Open Government License 2.0',
    url: 'https://www.nationalarchives.gov.uk/doc/open-government-licence/version/2/'
  },
  'OGL-UK-3.0': {
    spdx: true,
    name: 'Open Government License 3.0',
    url: 'https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/'
  },
  'PDDL-1.0': {
    spdx: true,
    name: 'Open Data Commons Public Domain Dedication and License 1.0',
    url: 'https://opendatacommons.org/licenses/pddl/1-0/'
  },
  'opendata.swiss-terms_open': {
    spdx: false,
    name: 'opendata.swiss Open',
    url: 'https://opendata.swiss/terms-of-use#terms_open'
  },
  'opendata.swiss-terms_by': {
    spdx: false,
    name: 'opendata.swiss Attribution',
    url: 'https://opendata.swiss/terms-of-use#terms_by'
  },
  'opendata.swiss-terms_ask': {
    spdx: false,
    name: 'opendata.swiss Non-Commercial',
    url: 'https://opendata.swiss/terms-of-use#terms_ask'
  },
  'opendata.swiss-terms_by_ask': {
    spdx: false,
    name: 'opendata.swiss Attribution Non-Commercial',
    url: 'https://opendata.swiss/terms-of-use#terms_by_ask'
  },
}

module.exports = LICENSES
