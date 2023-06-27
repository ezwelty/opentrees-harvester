const fs = require('fs')
const source_files = fs.readdirSync('../sources')

/**
 * This function scrapes all crosswalk data from the 'sources' directory
 * and turns it into an array with all crosswalks.
 * 
 * @returns {Array} All of the crosswalk data
 */
function getCrosswalkData() {
    const scraped_crosswalks = []
    for (const source_file of source_files) {
        const source_data = require('../sources'+'/'+source_file)
        for (const entry of source_data) {
            const entry_crosswalk = entry['crosswalk']
            // removing crosswalks that are just 'identity'
            if (typeof entry_crosswalk !== 'undefined') {
                scraped_crosswalks.push(entry_crosswalk)
            }
        }
    }
    return scraped_crosswalks
}

/**
 * This function scrapes all crosswalk data from the 'sources' directory
 * and turns it into two arrays, one with target headers and one with their original names.
 * 
 * @returns {Array} Contains one array with all target schema headers and another array ith the names of all original columns
 */
function getHeaderArrays() {
    const target_schema_headers = []
    const original_dataset_headers = []
    for (const source_file of source_files) {
        const source_data = require('../sources'+'/'+source_file)
        for (const entry of source_data) {
            const entry_crosswalk = entry['crosswalk']
            if (typeof entry_crosswalk !== 'undefined') {
                for (const [target_value, original_value] of Object.entries(entry_crosswalk)) {
                    target_schema_headers.push(target_value)
                    original_dataset_headers.push(original_value)
                }
            }
        }
    }
    return [target_schema_headers, original_dataset_headers]
}

/**
 * This function gets only the unique values from an array.
 * 
 * @param {Array} dataset target schema headers: getHeaderArrays()[0]
 * @returns {Array} unique values only
 */
function getUniqueValues(dataset) {
    return [... new Set(dataset)]
}

/**
 * This function sorts all original headers in crosswalks by their matched header in the target schema.
 * 
 * @param {Array} headers getUniqueValues(getHeaderArrays()[0])
 * @param {Array} datasets getCrosswalkData()
 * @returns {object} all target schema headers found in crosswalks with all corresponding original dataset headers
 */
function sortOriginalHeadersByTargetHeader(headers, datasets) {
    const original_headers_tracker = {}
    for (const unique_header of headers) {
        original_headers_tracker[unique_header] = []
    }
    for (const crosswalk of datasets) {
        for (const header of Object.entries(crosswalk)) {
            original_headers_tracker[header[0]].push(header[1])
        }
    }
    return original_headers_tracker
}

/**
 * This function allows the user to view an array of the headers in the original data for a single header in the target schema.
 * 
 * @param {string} header individual header from target schema
 * @param {object} data from sortOriginalHeadersByTargetHeader
 * @returns {Array} target schema header found in crosswalks with all corresponding original dataset headers
 */
function viewIndividualHeadersArray(header, data) {
    return data[header]
}

// Shows all headers in the Target Schema and the headers from the original datasets that correspond
console.log(sortOriginalHeadersByTargetHeader(getUniqueValues(getHeaderArrays()[0]),getCrosswalkData()))

// Replace 'harvest' with the desired header to view an individual header from previous line
console.log(viewIndividualHeadersArray('harvest',sortOriginalHeadersByTargetHeader(getUniqueValues(getHeaderArrays()[0]),getCrosswalkData())))
