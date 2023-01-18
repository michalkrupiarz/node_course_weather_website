const request = require('request');

const api_key = '&appid=8165e1cebb418caf53edf6c4800aa8fe'
const base_url = 'https://api.openweathermap.org/data/2.5/weather';
const latitude ='?lat=';
const longitude = '&lon=';
const units = '&units=metric';


const wheaterForLoc=( lat, lon,  callback) =>{
    request({
        url: base_url+latitude+lat+longitude+lon+units+api_key,
        json: true
    }, (error, {body} = {})=>{
        if (error){
            callback('General error',  undefined)
        } else if(body.cod!=200){
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                main: body.weather[0].main,
                temp: body.main.temp,
                windspeed: body.wind.speed
            });
        } 
    })
}

module.exports = {forecast: wheaterForLoc};