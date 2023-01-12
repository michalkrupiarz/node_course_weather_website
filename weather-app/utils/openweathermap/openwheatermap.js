const request = require('request');

const api_key = '&appid=8165e1cebb418caf53edf6c4800aa8fe'
const base_url = 'https://api.openweathermap.org/data/2.5/weather';
const latitude ='?lat=';
const longitude = '&lon=';
const units = '&units=metric';


const wheaterForLoc=( lat, lon, callback) =>{
    console.log(base_url+latitude+lat+longitude+lon+units+api_key);
    request({
        url: base_url+latitude+lat+longitude+lon+units+api_key,
        json: true
    }, (error, response)=>{
        if (error){
            callback('General error', undefined)
        } else if(response.body.cod!=200){
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                main: response.body.weather[0].main,
                temp: response.body.main.temp,
                windspeed: response.body.wind.speed
            });
        } 
    })
}

module.exports = {forecast: wheaterForLoc};