const geocode = require('./utils/geocode/geocode.js')

const place = process.argv[2]

const varum = async () => {console.log(await geocode.location(place))}

varum()
