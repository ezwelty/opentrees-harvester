const fs = require('fs')
const source_files = fs.readdirSync('../sources')

// Scrapes all data from the 'sources' directory and turns it into an array with source ids and their crosswalks.
function getCrosswalkData_withID() {
    const scraped_crosswalks_ID = []
    for (const source_file of source_files) {
        const source_data = require('../sources'+'/'+source_file)
        for (const entry of source_data) {
            const entry_id = entry['id']
            const entry_crosswalk = entry['crosswalk']
            scraped_crosswalks_ID.push({id:entry_id,crosswalk:entry_crosswalk})
        }
    }
    return scraped_crosswalks_ID
}

// Scrapes all data from the 'sources' directory and turns it into an array with all crosswalks.
function getCrosswalkData_noID() {
    const scraped_crosswalks_noID = []
    for (const source_file of source_files) {
        const source_data = require('../sources'+'/'+source_file)
        for (const entry of source_data) {
            const entry_crosswalk = entry['crosswalk']
            // removing crosswalks that are just 'identity'
            if (typeof entry_crosswalk !== 'undefined') {
                scraped_crosswalks_noID.push(entry_crosswalk)
            }
        }
    }
    return scraped_crosswalks_noID
}

// Scrapes all data from the 'sources' directory and turns it into two arrays with target headers and their original names
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

// Gets unique values from a dataset
function getUniqueValues(dataset) {
    return [... new Set(dataset)]
}

// Sorts all original headers in crosswalks by their matched header in the Target Schema
function sortOriginalHeadersByTargetHeader(headers, datasets) {
    const original_headers_count = {}
    for (const unique_header of headers) {
        original_headers_count[unique_header] = []
    }
    for (const crosswalk of datasets) {
        for (const header of Object.entries(crosswalk)) {
            original_headers_count[header[0]].push(header[1])
        }
    }
    return original_headers_count
}

// Allows the user to view an array of the unique headers in the original data for a single header in the Target Schema
function viewIndividualHeadersArray(header, data) {
    return data[header]
}

// Shows all headers in the Target Schema and the headers from the data that correspond
console.log(sortOriginalHeadersByTargetHeader(getUniqueValues(getHeaderArrays()[0]),getCrosswalkData_noID()))

// Replace 'harvest' with the desired header to view an individual header from previous line
console.log(viewIndividualHeadersArray('harvest',sortOriginalHeadersByTargetHeader(getUniqueValues(getHeaderArrays()[0]),getCrosswalkData_noID())))