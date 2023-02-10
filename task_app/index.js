const geocode = require('./utils/geocode/geocode.js')
const weatherstack = require('./utils//weatherstack/wheaterstack.js')
const mapbox = require('./utils/mapbox/mapbox.js')
const tomorow = require('./utils/tomorow/tomorrow.js')

const place = process.argv[2]

const varum = async () => {
    const loc = (await geocode.location(place))
    const geo = await mapbox.geocode(place)
    console.log(geo)
    console.log(await tomorow.wheaterForLoc(geo.lattitude, geo.longitude))
    //console.log(loc)
    //console.log(await weatherstack.forecast(loc.lattitude, loc.longitude))
}

varum()
