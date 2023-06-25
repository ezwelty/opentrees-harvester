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
            scraped_crosswalks_noID.push(entry_crosswalk)
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

// function getHeaderCounts(headers, datasets) {
//     const original_headers_count = {}
//     for (const crosswalk in datasets) {
//         for (const header in crosswalk) {
//             for (const unique_header in headers)
//                 if (header === unique_header) {
//                     original_headers_count
//             }
//         }
//     }
//         // for (var i=0; i < array.length; i++) {
//         //     obj[array[i]] = (obj[array[i]] || 0) +1 ;
//         //   }
// }


