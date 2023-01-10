const request = require('request')
const chalk = require('chalk');
const geocode = require('./utils/geocode/geocode.js');
const mapbox = require('./utils/mapbox/mapbox.js');
const weatherstack = require('./utils/weatherstack/wheaterstack.js')

weatherstack.forecast('qr213rq', 'qrqrqwe', (error,data)=>{
//weatherstack.forecast('50.972', '15.665', (error,data)=>{
    console.log(error);
    console.log(data);
})

geocode.geocode('Mietków', (error,data) => {
    console.log('Error', error);
    console.log('Data', data);
})

mapbox.geocode('Mietkow', (error,data)=>{
    console.log(data);
})