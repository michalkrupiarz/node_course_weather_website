const request = require('request')
const chalk = require('chalk');
const geocode = require('./utils/geocode/geocode.js');
const mapbox = require('./utils/mapbox/mapbox.js');
const weatherstack = require('./utils/weatherstack/wheaterstack.js')
const tomorrow = require('./utils/tomorow/tomorrow.js')
const openweathermap = require('./utils/openweathermap/openwheatermap.js')

//weatherstack.forecast('qr213rq', 'qrqrqwe', (error,data)=>{
// weatherstack.forecast('50.972', '15.665', (error,data)=>{
//     console.log(error);
//     console.log(data);
// })

// geocode.geocode('Mietków', (error,data) => {
//     console.log('Error', error);
//     console.log('Data', data);
// })

// mapbox.geocode('Mietkow', (error,data)=>{
//     console.log(data);
// })

// tomorrow.wheaterForLoc('50.972', '16.665', (error,data)=>{
//     console.log(error);
//     console.log(data);
// })

openweathermap.forecast('50.9722066955017', '16.665495467128', (error, data) => {
    console.log(error);
    console.log(data);
})