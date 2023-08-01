const { match } = require('assert')
const fs = require('fs')
const source_files = fs.readdirSync('../sources')
const { parseFieldName } = require('./convert.js')

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
 * This function takes in all crosswalk data, merges the columns that only vary by suffix, and extracts column names from function values
 * 
 * @param {Array} crosswalks getCrosswalkData()
 * @returns {Array} All of the crosswalk data, with suffixes removed and function columns extracted
 */
function removeUnitSuffixesAndFunctions(crosswalks) {
    const temporary_duplicate_holder = []
    const temporary_funciton_holder = []
    const matches_to_add = []
    // extracting column names with regex
    for (const crosswalk of crosswalks) {
        for (const match of Object.entries(crosswalk)) {
            if (typeof match[1] != 'string') {
                const function_string = match[1].toString()
                const regex = /x\['([^']+)'\]|x\["([^"]+)"\]|x\.([a-zA-Z0-9_]+)/g
                const funciton_parsed = Array.from(function_string.matchAll(regex))
                for (const col of funciton_parsed) {
                    const potential_headers = col.slice(1,4)
                    for (const potential_header of potential_headers) {
                        if (typeof potential_header == 'string') {
                            const found_header = potential_header
                            temporary_funciton_holder.push([match[0],found_header])
                        }
                    }
                }
                delete crosswalk[match[0]]
            }
        }
    }
    for (const dupe of temporary_funciton_holder) {
        const temp = {}
        temp[dupe[0]] = dupe[1]
        matches_to_add.push(temp)
    }
    // merging columns that differ only by suffix
    for (const crosswalk of crosswalks) {
        for (const entry of Object.keys(crosswalk)) {
            const base_header = parseFieldName(entry)['base']
            if (!(typeof base_header['unit']==undefined) || !(typeof base_header['range']==undefined)) {
                if (!Object.keys(crosswalk).includes(base_header)) {
                    crosswalk[base_header] = crosswalk[entry]
                } else {
                    temporary_duplicate_holder.push([base_header,crosswalk[entry]])
                }
                delete crosswalk[entry]
            }
        }
    }
    for (const crosswalk of matches_to_add) {
        for (const entry of Object.keys(crosswalk)) {
            const base_header = parseFieldName(entry)['base']
            if (!(typeof base_header['unit']==undefined) || !(typeof base_header['range']==undefined)) {
                if (!Object.keys(crosswalk).includes(base_header)) {
                    crosswalk[base_header] = crosswalk[entry]
                } else {
                    temporary_duplicate_holder.push([base_header,crosswalk[entry]])
                }
                delete crosswalk[entry]
            }
        }
    }
    for (const dupe of temporary_duplicate_holder) {
        const temp = {}
        temp[dupe[0]] = dupe[1]
        matches_to_add.push(temp)
    }
    return crosswalks.concat(matches_to_add)
}

/**
 * This function scrapes all crosswalk data from the 'sources' directory
 * and turns it into two arrays, one with target headers and one with their original names.
 * 
 * @param {Array} crosswalks removeUnitSuffixesAndFunctions(getCrosswalkData())
 * @returns {Array} Contains one array with all target schema headers and another array with the names of all original columns
 */
function getHeaderArrays(crosswalks) {
    const target_schema_headers = []
    const original_dataset_headers = []
    for (const crosswalk of crosswalks) {
        if (typeof crosswalk != 'undefined') {
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
 * @param {Array} target_headers getHeaderArrays(removeUnitSuffixesAndFunctions(getCrosswalkData()))[0]
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
 * @param {Array} crosswalks removeUnitSuffixesAndFunctions(getCrosswalkData())
 * @returns {object} all target schema headers found in crosswalks with all corresponding original dataset headers
 */
function sortOriginalHeadersByTargetHeader(crosswalks) {
    const unique_headers = getUniqueValues(getHeaderArrays(crosswalks)[0])
    const original_headers_tracker = {}
    for (const unique_header of unique_headers) {
        original_headers_tracker[unique_header] = []
    }
    for (const crosswalk of crosswalks) {
        for (const header of Object.entries(crosswalk)) {
            original_headers_tracker[header[0]].push(header[1])
        }
    }
    return original_headers_tracker
}

/**
 * This function exports the data from sortOriginalHeadersByTargetHeader to a csv
 * 
 * @param {object} sorted_data sortOriginalHeadersByTargetHeader(removeUnitSuffixesAndFunctions(getCrosswalkData()))
 */
function exportDataToCSV(sorted_data) {
    const csv_headers = Object.keys(sorted_data).join(',')
    const csv_values = {}
    for (const matches of Object.values(sorted_data)) {
        for (const match_index in matches) {
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
 * @param {object} crosswalk_data sortOriginalHeadersByTargetHeader(removeUnitSuffixesAndFunctions(getCrosswalkData()))
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
 * @param {object} crosswalk_data sortOriginalHeadersByTargetHeader(removeUnitSuffixesAndFunctions(getCrosswalkData()))
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
 * @param {Array} headers from a dataset
 * @param {object} crosswalk_dataset sortOriginalHeadersByTargetHeader(removeUnitSuffixesAndFunctions(getCrosswalkData()))
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
    return crosswalk
}

// The sorted_data variable shows all headers in the Target Schema and the headers from the original datasets that correspond:
// const sorted_data = sortOriginalHeadersByTargetHeader(removeUnitSuffixesAndFunctions(getCrosswalkData()))
// Export the data to a csv:
// exportDataToCSV(sorted_data)

// Example crosswalk guesser format
// console.log(makeCrosswalkMapping(['dbhffffcecomment','f','species','reff','ref','refff','treetypeifhosdf'],sorted_data))

