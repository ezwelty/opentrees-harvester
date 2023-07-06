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
 * This function takes in all crosswalk data and merges the columns that only vary by suffix.
 * 
 * @param {Array} crosswalks getCrosswalkData()
 * @returns {Array} All of the crosswalk data, with suffixes removed
 */
function removeUnitSuffixes(crosswalks) {
    // Needs to be manually added when more columns are found in the crosswalks
    // Had to remove instances with similar columns in the same crosswalk 
    //     - (i.e. crosswalks with 'ule' and 'ule_min' would just delete the 'ule_min' entry)
    const headers_to_merge = {
        'height':['height_ft','height_ft_range','height_m_range','height_m','height_max','height_min'],
        'dbh':['dbh_in','dbh_in_range','dbh_cm','dbh_mm_range'],
        'crown':['crown_ft','crown_ft_range','crown_m','crown_max','crown_min'],
        'circumference':['circumference_cm','circumference_cm_max','circumference_cm_min','circumference_m_max','circumference_m_min'],
        'ule':['ule_max','ule_min','ule_range'],
        'stems':['stems_range'],
        'carbon':['carbon_annual_lb','carbon_lb','carbon_annual_kg','carbon_kg']
    }
    for (const crosswalk of crosswalks) {
        for (const headers of Object.entries(headers_to_merge)) {
            const base_header = headers[0]    
            for (const header_to_merge of headers[1]) {
                if ((!Object.keys(crosswalk).includes(base_header)) && (Object.keys(crosswalk).includes(header_to_merge))) {
                    crosswalk[base_header] = crosswalk[header_to_merge]
                }
                delete crosswalk[header_to_merge]
            } 
        }
    }
    return crosswalks
}

/**
 * This function scrapes all crosswalk data from the 'sources' directory
 * and turns it into two arrays, one with target headers and one with their original names.
 * 
 * @param {Array} crosswalks removeUnitSuffixes(getCrosswalkData())
 * @returns {Array} Contains one array with all target schema headers and another array with the names of all original columns
 */
function getHeaderArrays(crosswalks) {
    // could just make target_schema_headers a set?
    const target_schema_headers = []
    const original_dataset_headers = []
    for (const crosswalk of crosswalks) {
        if (typeof crosswalk !== 'undefined') {
            for (const [target_value, original_value] of Object.entries(crosswalk)) {
                target_schema_headers.push(target_value)
                original_dataset_headers.push(original_value)
            }  
        }
    }
    return [target_schema_headers, original_dataset_headers]
}

/**
 * This function gets only the unique values from the target schema headers, sorted by # of times matched in crosswalks.
 * 
 * @param {Array} target_headers getHeaderArrays(removeUnitSuffixes(getCrosswalkData()))[0]
 * @returns {Array} unique values only, sorted by # times matched in crosswalks
 */
function getUniqueValues(target_headers) {
    const counts = {}
    const unique_headers = []
    for (const header of target_headers) {
        counts[header] = counts[header] ? counts[header] + 1 : 1;
    }
    const sortable = Object.entries(counts).sort(([,a],[,b]) => a-b).reverse().reduce((r, [k, v]) => ({ ...r, [k]: v }), {})
    for (const unique_header of Object.keys(sortable)) {
        unique_headers.push(unique_header)
    }
    return unique_headers
}

/**
 * This function sorts all original headers in the crosswalks by their matched header in the target schema.
 * 
 * @param {Array} unique_headers getUniqueValues(getHeaderArrays(removeUnitSuffixes(getCrosswalkData()))[0])
 * @param {Array} crosswalk_data getCrosswalkData()
 * @returns {object} all target schema headers found in crosswalks with all corresponding original dataset headers
 */
function sortOriginalHeadersByTargetHeader(unique_headers, crosswalk_data) {
    const original_headers_tracker = {}
    for (const unique_header of unique_headers) {
        original_headers_tracker[unique_header] = []
    }
    for (const crosswalk of crosswalk_data) {
        for (const header of Object.entries(crosswalk)) {
            original_headers_tracker[header[0]].push(header[1])
        }
    }
    return original_headers_tracker
}

/**
 * This function allows the user to view an array of the headers in the original data for a single header in the target schema.
 * 
 * @param {string} header individual header from the target schema
 * @param {object} sorted_crosswalk_data sortOriginalHeadersByTargetHeader(getUniqueValues(getHeaderArrays(removeUnitSuffixes(getCrosswalkData()))[0]),getCrosswalkData())
 * @returns {Array} target schema header found in crosswalks with all corresponding original dataset headers
 */
function viewIndividualHeadersArray(header, sorted_crosswalk_data) {
    return sorted_crosswalk_data[header]
}

/**
 * This function exports the data from sortOriginalHeadersByTargetHeader to a csv
 * 
 * @param {object} sorted_data sortOriginalHeadersByTargetHeader(getUniqueValues(getHeaderArrays(removeUnitSuffixes(getCrosswalkData()))[0]),getCrosswalkData())
 */
function exportDataToCSV(sorted_data) {
    const csv_headers = Object.keys(sorted_data).join(',')
    const csv_values = {}
    for (const matches of Object.values(sorted_data)) {
        for (const match_index in matches) {
            if (typeof matches[match_index] != 'string') {
                const function_string = matches[match_index].toString()
                const regex = /x\['([^']+)'\]|x\["([^"]+)"\]|x\.([a-zA-Z0-9_]+)/g
                const funciton_parsed = Array.from(function_string.matchAll(regex))
                matches[match_index] = funciton_parsed.toString().replaceAll(',',';')
            }
            if (!(Object.keys(csv_values).includes(match_index))) {
                csv_values[match_index] = [matches[match_index]]
            } else {
                csv_values[match_index].push(matches[match_index])
            }
        }
    }
    let full_csv = ''
    full_csv += csv_headers
    full_csv += '\n'
    // Creating the body of the csv
    for (const csv_row of Object.values(csv_values)) {
        while (csv_row.length != csv_values['0'].length) {
            csv_row.push('')
        }
        csv_row.join(',')
        full_csv += csv_row
        full_csv += '\n'
    }
    const writer = fs.createWriteStream('crosswalk_mappings.csv')
    writer.write(full_csv)
}

/**
 * This function takes in a column name and finds the target headers that have previously been matched with that name.
 * 
 * @param {string} colname from a dataset
 * @param {object} crosswalk_data sortOriginalHeadersByTargetHeader(getUniqueValues(getHeaderArrays(removeUnitSuffixes(getCrosswalkData()))[0]),getCrosswalkData())
 * @returns {Array|string} either an array with the matched headers or a string stating there are no matched headers
 */
function checkMatchHistory(colname, crosswalk_data) {
    matched_headers = []
    for (const header of Object.keys(crosswalk_data)) {
        if (crosswalk_data[header].includes(colname.toLowerCase())) {
            matched_headers.push(header)
        }
    }
    if (matched_headers.length > 0) {
        return matched_headers
    } else {
        return 'There is no matched history for the column name "' + colname + '"'
    }
}

/**
 * This function takes in a column name and finds the target headers that might be associated with the column name,
 * based on patterns in the crosswalk data.
 * 
 * @param {string} colname from a dataset
 * @param {object} crosswalk_data sortOriginalHeadersByTargetHeader(getUniqueValues(getHeaderArrays(removeUnitSuffixes(getCrosswalkData()))[0]),getCrosswalkData())
 * @returns {Array|string} either an array with the similar headers or a string stating there are no similar headers
 */
function checkSimilarHeaders(colname, crosswalk_data) {
    similar_headers = []
    // patterns found in the history of matching for each target header
    potential_similar_headers = {
        'scientific':['botanical'],
        'ref':['id'],
        'health':['condition'],
        'updated':['edit','date'],
        'dbh':['diameter'],
        'crown':['spread'],
        'note':['comment'],
        'cultivar':['variete'],
        'description':['desc'],
        'age':['treeage'],
    }
    for (const header of Object.keys(crosswalk_data)) {
        if (colname.toLowerCase().includes(header)) {
            similar_headers.push(header)
        }
    }
    for (const header of Object.keys(potential_similar_headers)) {
        if (colname.toLowerCase().includes(potential_similar_headers[header])) {
            if (!similar_headers.includes(header)) {
                similar_headers.push(header)
            }
        }
    }
    for (const header_pairs of Object.entries(crosswalk_data)) {
        for (const matched_header of header_pairs[1]) {
            if (typeof matched_header == 'string') {
                if (colname.toLowerCase().includes(matched_header.toLowerCase())) {
                    if (!similar_headers.includes(header_pairs[0])) {
                        similar_headers.push(header_pairs[0])
                    }     
                }
            }
        }
    }
    if (similar_headers.length > 0) {
        return similar_headers
    } else {
        return 'There are no guesses for the column name "' + colname + '"'
    }
}

/**
 * This function takes in information from a dataset and the crosswalk data, and provides a guess on the crosswalk for the dataset.
 * The user should copy the output and manually edit it.
 * 
 * @param {*} headers from a dataset
 * @param {*} crosswalk_dataset sortOriginalHeadersByTargetHeader(getUniqueValues(getHeaderArrays(removeUnitSuffixes(getCrosswalkData()))[0]),getCrosswalkData())
 */
function makeCrosswalkMapping(headers, crosswalk_dataset) {
    crosswalk = {}
    ignored_columns = []
    ignored_bc_existing = {}
    for (const header of headers) {
        matched_headers = checkMatchHistory(header, crosswalk_dataset)
        similar_headers = checkSimilarHeaders(header, crosswalk_dataset)
        const all_headers = [...new Set([...matched_headers ,...similar_headers])]
        if (!Object.keys(crosswalk).includes(similar_headers.toString()) && !Object.keys(crosswalk).includes(matched_headers.toString())) {
            if (typeof matched_headers == 'string') {
                if (typeof similar_headers != 'string') {
                        crosswalk[similar_headers] = header
                } else {
                    ignored_columns.push(header)
                }
            } else {
                if (typeof similar_headers != 'string') {
                    crosswalk[all_headers] = header
                } else {
                    crosswalk[matched_headers] = header
                }
            }
        } else {
            if (typeof matched_headers == 'string') {
                if (typeof similar_headers != 'string') {
                    ignored_bc_existing[header] = similar_headers
                }
            } else {
                if (typeof similar_headers != 'string') {
                    ignored_bc_existing[header] = all_headers
                } else {
                    ignored_bc_existing[header] = matched_headers
                }
            }
        }
    }
    console.log('// Here is a guess for the crosswalk, please copy and manually edit:')
    console.log(crosswalk)
    console.log('// Comments:')
    for (const ignored of Object.entries(ignored_bc_existing)) {
        console.log('// The guesser also matched "'+ ignored[0] + '" to the the possible target header(s) [' + ignored[1] + ']. But [' + ignored[1] + '] was previously matched to another entry.')
    }
    console.log('// No guesses were found for the following headers: [' + ignored_columns.toString() + ']')
}

// The sorted_data variable shows all headers in the Target Schema and the headers from the original datasets that correspond:
const sorted_data = (sortOriginalHeadersByTargetHeader(getUniqueValues(getHeaderArrays(removeUnitSuffixes(getCrosswalkData()))[0]),getCrosswalkData()))
// Export the data to a csv:
// exportDataToCSV(sorted_data)

// Example crosswalk guesser format
// console.log(makeCrosswalkMapping(['dbhffffcecomment','f','species','reff','ref','refff','treetypeifhosdf'],sorted_data))


// TODO: take in a dataset instead of a header, fix function stuff