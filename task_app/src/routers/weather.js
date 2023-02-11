const express = require('express')
const router = new express.Router()
const geocode = require('../utils/geocode/geocode.js');
const mapbox = require('../utils/mapbox/mapbox.js');
const weatherstack = require('../utils/weatherstack/wheaterstack.js')
const tomorrow = require('../utils/tomorow/tomorrow.js')
const openweathermap = require('../utils/openweathermap/openwheatermap.js');
// const Task = require('../models/task')
// const auth = require('../middleware/auth')

router.get('/weather', async (req,res)=>{   
    const provider = req.query.provider;
    //const loc = await geocode.location(req.query.address);
    const loc = await mapbox.geocode(req.query.address);
    if(provider === 'openweathermap'){
        const forecast = await openweathermap.forecast(loc.lattitude, loc.longitude) 
        return res.send({
            place: loc.placeName,
            forceast : forecast
        })        
    }
})

module.exports = router