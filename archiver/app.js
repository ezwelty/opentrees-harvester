var { downloadFile } = require('../lib/helpers')
const archive = require('./archive')
const puppeteer = require('puppeteer')


URL =
  'https://s3.ap-southeast-2.amazonaws.com/dmzweb.adelaidecitycouncil.com/OpenData/Street_Trees/Street_Trees.csv'
DATE = new Date()


async function archiveData() {
    URL = 'https://data.sa.gov.au/data/dataset/street-trees'
    DATE = new Date()
    BASENAME = 'response'
    console.log("URL...", URL);

    // Open a new browser page
    browser = await puppeteer.launch()
    page = await browser.newPage()

    console.log("opened brwoser")

    // Navigate the page to a URL
    response = await archive.loadPage(URL, page)

    console.log("loaded page...")

    if (response.status() < 300) {
    // Save and log HTML
    html = await archive.readPageHtml(page)
    archive.logData({
        data: html,
        filename: `${BASENAME}.html`,
        url: URL,
        date: DATE,
        type: 'page',
        format: 'html',
        status: response.status(),
        headers: response.headers(),
    })
    console.log("log html");
    // Save and log MHTML
    mhtml = await archive.readPageMhtml(page)
    archive.logData({
        data: mhtml,
        filename: `${BASENAME}.mhtml`,
        url: URL,
        date: DATE,
        type: 'page',
        format: 'mhtml',
        status: response.status(),
        headers: response.headers(),
    })
    console.log("logged mhtml");
    } else {
    // Log error
    archive.log({
        url: URL,
        date: DATE,
        type: 'page',
        status: response.status(),
        headers: response.headers(),
    })
    }

    // Close browser
    await browser.close()
}

async function runArchiver() {
    // Check that we have not already downloaded this url with the same data

    /**
     * Basically, below, we're going to want to check if the url.date is less than a number that will be passed in via the archive.js file.
     * So if we do like runArchiver(5), then we should check if the date in the archiver for the url is less than 5 days old. If its less than 5 days old,
     * then we do not download. If it is greater, then we download and then use md5 hash to check if the data is still the same or not. If the same, we can throw
     * an error and not download. If it is different, then download the data as normal. We start some of this work in helpers.js/doesArchiverContainHash and
     * archive.js/areDataHashesEqual.
     * 
     * An entry in the archiver looks like:
     * {"date":"2023-06-25T23:54:52.993Z","url":"https://s3.ap-southeast-2.amazonaws.com/dmzweb.adelaidecitycouncil.com/OpenData/Street_Trees/Street_Trees.csv","path":"archive\\cfe690c9ecadb70910fa8ea57f6aa8a7\\2023-06-25T23-54-52.993Z\\Street_Trees.csv","type":"data"}
     * So we would just need to see if jsonObject.date == date + 5 days (or whatever number is passed in) and go from there.
     * 
     */
    results = await archive.search({ url: URL })
    if (results.length !== 0) {
        console.log("you have already archived this data.");
        process.exit(1);
    }

    // Build archive directory for file
    dir = archive.buildPath(URL, DATE)
    console.log("dir: ", dir);

    // Download file to directory
    path = await downloadFile(URL, dir, {
    override: { skip: true, skipSmaller: true },
    })

    if (path) {
    // Log file
    archive.log({
        url: URL,
        path: path,
        date: DATE,
        type: 'data',
    })
    }
}

//archiveData();
runArchiver();
