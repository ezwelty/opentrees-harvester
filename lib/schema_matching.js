const fs = require('fs')
const source_files = fs.readdirSync('../sources')

// Scrapes all data from the 'sources' directory and turns it into an array with source ids and their crosswalks.
function getCrosswalkData() {
    const scraped_crosswalks = []
    for (const source_file of source_files) {
        const source_data = require('../sources'+'/'+source_file)
        for (const entry of source_data) {
            const entry_id = entry['id']
            const entry_crosswalk = entry['crosswalk']
            scraped_crosswalks.push({id:entry_id,crosswalk:entry_crosswalk})
        }
    }
    return scraped_crosswalks
}


