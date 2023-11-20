const xpath = require('xpath')
const xmldom = require('xmldom')

// function stripURLExceptTypeName(url) {
//   const u = new URL(url)
//   const base = `${u.origin}${u.pathname}`
//   let typeName
//   for (const [key, value] of u.searchParams.entries()) {
//     if (['typename', 'typenames'].includes(key.toLowerCase())) {
//       typeName = value
//     }
//   }
//   if (!typeName) {
//     return base
//   }
//   const searchParams = new URLSearchParams({typeName})
//   return `${base}?${decodeURIComponent(searchParams)}`
// }

/**
 * Build WFS GetCapabilities URL.
 *
 * @param {string} url - WFS server URL
 * @returns {string}
 */
function buildGetCapabilitiesUrl(url) {
  const u = new URL(url)
  const base = `${u.origin}${u.pathname}`
  // Build GetCapabilities URL
  const searchParams = new URLSearchParams({
    service: 'WFS',
    request: 'GetCapabilities'
  })
  // Avoid encoding colons
  return `${base}?${decodeURIComponent(searchParams)}`
}

/**
 * Parse WFS GetCapabilities response.
 *
 * @param {string} xml – XML string
 * @returns {object} Parsed capabilities (version, outputFormats, typeNames,
 * resultTypes, resultPaging).
 */
function parseCapabilities(xml) {
  const parser = new xmldom.DOMParser()
  const tree = parser.parseFromString(xml)
  const namespaces = xpath.select('/*/@*', tree).reduce((obj, x) => {
    if (x.name.startsWith('xmlns')) {
      obj[x.name.replace(/^xmlns:?/, '')] = x.value
    }
    return obj
  }, {})
  const select = xpath.useNamespaces(namespaces)
  const version = select(
    '//ows:Operation[@name="GetCapabilities"]/ows:Parameter[@name="AcceptVersions"]/ows:AllowedValues/ows:Value' +
    '|//ows:Operation[@name="GetCapabilities"]/ows:Parameter[@name="AcceptVersions"]/ows:Value',
    tree
  )
    .map((x) => x.firstChild.data)
    .sort()
    .pop()
  const outputFormats = select(
    '//ows:Operation[@name="GetFeature"]/ows:Parameter[@name="outputFormat"]/ows:AllowedValues/ows:Value' +
    '|//ows:Operation[@name="GetFeature"]/ows:Parameter[@name="outputFormat"]/ows:Value',
    tree
  ).map((x) => x.firstChild.data)
  const typeNames = select(
    '//*[local-name()="FeatureType"]/*[local-name()="Name"]',
    tree
  ).map((x) => x.firstChild.data)
  const resultTypes = select(
    '//ows:Operation[@name="GetFeature"]/ows:Parameter[@name="resultType"]/ows:AllowedValues/ows:Value' +
    '|//ows:Operation[@name="GetFeature"]/ows:Parameter[@name="resultType"]/ows:Value',
    tree
  ).map((x) => x.firstChild.data)
  const resultPaging = select(
    '//ows:Constraint[@name="ImplementsResultPaging"]/ows:DefaultValue',
    tree
  ).map((x) => x.firstChild.data === 'TRUE').pop()
  return { version, outputFormats, typeNames, resultTypes, resultPaging }
}

/**
 * Choose the output format.
 *
 * @param {string[]} formats - List of output formats
 * @returns {string|null}
 */
function chooseOutputFormat(formats) {
  for (const format of formats) {
    const lowercase = format.toLowerCase()
    if (lowercase.includes('geopackage') || lowercase.includes('gpkg')) {
      return format
    }
    if (lowercase.includes('json')) {
      return format
    }
  }
  return null
}

/**
 * Build WFS GetFeature URL.
 *
 * @param {string} url - WFS server URL (ideally with typeName parameter)
 * @param {object} capabilities - Server capabilities
 * @param {boolean} paging - Whether to set a start index and max feature count
 * @returns {string}
 */
function buildGetFeatureUrl(url, capabilities, paging = false) {
  const u = new URL(url)
  const base = `${u.origin}${u.pathname}`
  let typeName
  for (const [key, value] of u.searchParams.entries()) {
    if (['typename', 'typenames'].includes(key.toLowerCase())) {
      typeName = value
    }
  }
  if (capabilities.typeNames.length === 0) {
    throw new Error(`[${url}] No feature types`)
  }
  if (typeName && !capabilities.typeNames.includes(typeName)) {
    throw new Error(`[${url}] ${typeName} not in feature types: ${capabilities.typeNames}`)
  }
  if (!typeName) {
    if (capabilities.typeNames.length > 1) {
      throw new Error(
        `[${url}] Select one of multiple feature types: ${capabilities.typeNames}`
      )
    }
    typeName = capabilities.typeNames[0]
  }
  // Build GetFeature URL
  const isV2 = capabilities.version >= '2.0.0'
  const searchParams = new URLSearchParams({
    service: 'WFS',
    version: capabilities.version,
    request: 'GetFeature',
    [isV2 ? 'typeNames' : 'typeName']: typeName,
    srsName: 'EPSG:4326'
  })
  const outputFormat = chooseOutputFormat(capabilities.outputFormats)
  if (outputFormat) {
    searchParams.set('outputFormat', outputFormat)
  }
  if (paging) {
    searchParams.set(isV2 ? 'count' : 'maxFeatures', 50000)
    searchParams.set('startIndex', 0)
  }
  // Avoid encoding colons
  return `${base}?${decodeURIComponent(searchParams)}`
}

// function parseFeatureResult(xml) {
//   const parser = new xmldom.DOMParser()
//   const tree = parser.parseFromString(xml)
//   const namespaces = xpath.select('/*/@*', tree).reduce((obj, x) => {
//     if (x.name.startsWith('xmlns')) {
//       obj[x.name.replace(/^xmlns:?/, '')] = x.value
//     }
//     return obj
//   }, {})
//   const select = xpath.useNamespaces(namespaces)
//   const numberMatched = select(
//     '//wfs:FeatureCollection/@numberMatched' +
//     '|//wfs:FeatureCollection/@numberOfFeatures',
//     tree
//   )[0]?.value
//   const numberReturned = select(
//     '//wfs:FeatureCollection/@numberReturned', tree
//   )[0]?.value
//   const next = select('//wfs:FeatureCollection/@next', tree)[0]?.value
//   return {
//     numberMatched: numberMatched ? parseInt(numberMatched) : undefined,
//     numberReturned: numberReturned ? parseInt(numberReturned) : undefined,
//     next
//   }
// }

// function mergeGMLFiles(files, out) {
//   const headerRegex = /^\<[^\>]+\>\<[^\>]+\>/
//   const footerRegex = /\<\/[^\>]+\>$/
//   // First file (header)
//   // Remove timestamp to avoid spurious differences between versions
//   let xml = fs.readFileSync(files[0], {encoding: 'utf-8'})
//   const header = xml.match(headerRegex)[0]
//   fs.writeFileSync(
//     out,
//     header.replace(/timeStamp="[^"]+" ?/, ''),
//     {encoding: 'utf-8'}
//   )
//   // First file (content)
//   const footer = xml.match(footerRegex)[0]
//   fs.appendFileSync(
//     out,
//     xml.replace(headerRegex, '').replace(footerRegex, '')
//   )
//   // Subsequent file content
//   files.slice(1).forEach(file => {
//     const xml = fs.readFileSync(file, {encoding: 'utf-8'})
//     const content = xml.replace(headerRegex, '').replace(footerRegex, '')
//     fs.appendFileSync(out, content)
//   })
//   // Footer
//   fs.appendFileSync(out, footer)
// }

// function mergeGMLFilesToCSV(files, out) {
//   const ids = gdal.open(files[0])
//   const ods = gdal.vectorTranslate(out, ids, ['-lco', 'GEOMETRY=AS_WKT'])
//   ids.close()
//   ods.close()
//   if (files.length === 1) {
//     return
//   }
//   // Subsequent file content
//   const memfile = '/vsimem/temp.csv'
//   files.slice(1).forEach(file => {
//     const ids = gdal.open(file)
//     const ods = gdal.vectorTranslate(memfile, ids, ['-lco', 'GEOMETRY=AS_WKT'])
//     const csv = gdal.vsimem.release(memfile)
//     ids.close()
//     ods.close()
//     fs.appendFileSync(out, csv.toString().replace(/^[^\n]+\n/, ''))
//   })
// }

// async function buildGetFeatureURL(url) {
//   const u = new URL(url)
//   const base = `${u.origin}${u.pathname}`
//   const params = {}
//   for (const [key, value] of u.searchParams.entries()) {
//     if (key.toLowerCase() === 'version') {
//       params['version'] = value
//     } else if (['typename', 'typenames'].includes(key.toLowerCase())) {
//       params['typename'] = value
//     }
//   }
//   // Get capabilities if missing version or typename
//   if (!params.version || !params.typename) {
//     const request_url = `${base}?service=WFS&request=GetCapabilities`
//     const response = await cache.getSetURL(request_url, {
//       tags: ['metadata', 'WFS', 'GetCapabilities'],
//     })
//     if (response.status != 200) {
//       throw new Error(`[${base}] HTTP ${response.status}`)
//     }
//     const results = parseCapabilities(response.data)
//     params.version = results.version
//     if (!params['typename']) {
//       if (results.types.length != 1) {
//         throw new Error(
//           `[${request_url}] Multiple or no feature types: ${results.types}`
//         )
//       }
//       params.typename = results.types[0]
//     }
//   }
//   // Build GetFeature URL
//   const searchParams = new URLSearchParams({
//     service: 'WFS',
//     version: params.version,
//     request: 'GetFeature',
//     [params.version === '2.0.0' ? 'typeNames' : 'typeName']: params.typename,
//     srsName: 'EPSG:4326',
//   })
//   // Avoid encoding colons
//   return `${base}?${decodeURIComponent(searchParams)}`
// }

module.exports = {
  buildGetFeatureUrl,
  buildGetCapabilitiesUrl,
  parseCapabilities,
  chooseOutputFormat
}
