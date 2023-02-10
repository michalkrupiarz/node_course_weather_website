const request = require('request')
const chalk = require('chalk');

const accessKey = '?access_key=2c588b9c6de8dc56a0ac3c5a334e6cb8';
const wheaterUrl = 'http://api.weatherstack.com/current' +accessKey+ '&query='; //latitude, longitide

const wheaterForLoc = (latitude, longitude, callback) =>{
    request({
        url: wheaterUrl+latitude+','+longitude,
        json: true
    }, (error, {body}={})=> {
        if (error){
            callback('General error', undefined)
        } else if(body.error){
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                wheater_description: body.current.weather_descriptions[0], 
                temperature: body.current.temperature
            });
        } 
    })
}

module.exports = {forecast: wheaterForLoc};