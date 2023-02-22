const express = require('express')
const router = new express.Router()
const geocode = require('../utils/geocode/geocode.js');
const mapbox = require('../utils/mapbox/mapbox.js');
const weatherstack = require('../utils/weatherstack/wheaterstack.js')
const tomorrow = require('../utils/tomorow/tomorrow.js')
const openweathermap = require('../utils/openweathermap/openwheatermap.js');
const auth = require('../middleware/auth');
const { update } = require('../models/user.js');
// const Task = require('../models/task')
// const auth = require('../middleware/auth')

router.get('/weather', auth, async (req,res)=>{   
    const provider = req.query.provider;
    //const loc = await geocode.location(req.query.address);
    const loc = await mapbox.geocode(req.query.address);
    if(loc.error){
        return res.send({
            error: loc.error
        })
    }
    if(provider === 'openweathermap'){
        const forecast = await openweathermap.forecast(loc.lattitude, loc.longitude) 
        return res.send({
            place: loc.placeName,
            forceast : forecast
        })        
    }
})

router.get('/weather/me', auth, async (req,res) => {
    Promise.all(req.user.locations.map(async element => {
        const forecast = await openweathermap.forecast(element.location.lattitude, element.location.longitude);
        element.location.forecast = JSON.stringify(forecast);
        return element;
      })).then(updatedElements => {
        res.send(updatedElements)
      }).catch(error => {
        console.error(error);
      });
})

const getForecasts = async (req) => {
    const promises = req.user.locations.map((element) => openweathermap.forecast(element.location.lattitude, element.location.longitude));
    const forecasts = await Promise.all(promises);
    return forecasts;
    }

module.exports = router

// app.get('/weather', async (req,res)=>{   
//     const provider = req.query.provider;
//     //const loc = await geocode.location(req.query.address);
//     const loc = await mapbox.geocode(req.query.address);
//     if(provider === 'openweathermap'){
//         const forecast = await openweathermap.forecast(loc.lattitude, loc.longitude) 
//         return res.send({
//             place: loc.placeName,
//             forceast : forecast
//         })        
//     }
    //     if(provider==='openweathermap'){
    //         openweathermap.forecast(latitude, longitude, (error, forecast) => {
    //             if(error){
    //                 return res.send({
    //                     error: error
    //                 });
    //             }
    //             return res.send({
    //                 place: place_name,
    //                 forceast : forecast
    //             })            
    //         })
    //     } else if (provider==='tommorow'){
    //         tomorrow.wheaterForLoc(latitude, longitude, (error,tommorowForecast)=>{
    //             if(error){
    //                 return req.send({
    //                     error: error
    //                 })
    //             }
    //             return res.send({
    //                 place: place_name,
    //                 forecast: tommorowForecast
    //             })
    //         })
    //     } else if (provider === 'weatherstack'){
    //         weatherstack.forecast(latitude, longitude, (error,weatherForecast)=>{
    //             if(error){
    //                 return req.send({
    //                     error: error
    //                 })
    //             }
    //             return res.send({
    //                 place: place_name,
    //                 forceast : weatherForecast
    //             }) 
    //         })
    //     }             
         
    // })
    
//})