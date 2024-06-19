require('dotenv').config()
const fs = require('fs')
const {Client} = require('@googlemaps/google-maps-services-js')
const client = new Client()
const archive = require('./archive')

/**
 * Geocode address.
 *
 * @param {string} address - Address to geocode.
 * @returns {Promise<object>} Geocode results.
 */
async function geocode(address) {
  let response
  try {
    response = await client.geocode({
      params: { address, key: process.env.GOOGLE_MAPS_API_KEY},
      timeout: 1000, // milliseconds
    })
  } catch (error) {
    throw new Error(error)
  }
  return response.data.results
}

function buildGeocodePath(address) {
  const hash = archive.md5(address)
  return `${process.env.GEOCODE_ARCHIVE}/${hash}.json`
}

/**
 * Geocode address with caching.
 *
 * @param {string} address - Address to geocode.
 * @returns {Promise<object>} Geocode results.
 */
async function geocodeCached(address) {
  const path = buildGeocodePath(address)
  let data
  if (fs.existsSync(path)) {
    const txt = fs.readFileSync(path, 'utf8')
    data = JSON.parse(txt)
    if (data.address !== address) {
      throw new Error(
        `Address mismatch in ${path}: ${data.address} !== ${address}`
      )
    }
  } else {
    const result = await geocode(address)
    data = {address, date: new Date(), result}
    fs.writeFileSync(path, JSON.stringify(data))
  }
  return data
}

module.exports = {
  buildGeocodePath,
  geocode,
  geocodeCached,
}
