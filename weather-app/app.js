const request = require('request')
const chalk = require('chalk');
const geocode = require('./utils/geocode/geocode.js');
const mapbox = require('./utils/mapbox/mapbox.js');
const weatherstack = require('./utils/weatherstack/wheaterstack.js')
const tomorrow = require('./utils/tomorow/tomorrow.js')
const openweathermap = require('./utils/openweathermap/openwheatermap.js')




const place = process.argv[2];

geocode.geocode(place, (error,{latitude, longitude, place_name} = {})=>{
    if (error){
        return console.log(error);
    }
    openweathermap.forecast(latitude, longitude, (error, forecast) => {
        if(error){
            return console.log(error);
        }
        console.log(chalk.green.inverse("openweathermap forecast"));
        console.log(place_name, forecast);
    })
    tomorrow.wheaterForLoc(latitude, longitude, (error,tommorowForecast)=>{
        if(error){
            return console.log(error)
        }
        console.log(chalk.green.inverse('tommorow forecast'))
        console.log(place_name, tommorowForecast);
    })

    
    weatherstack.forecast(latitude, longitude, (error,weatherForecast)=>{
        if(error){
            return console.log(error);
        }
        console.log(chalk.green.inverse("Weatherforecast"));
        console.log(weatherForecast);    
    })
})

mapbox.geocode(place, (error,{latitude, longitude, place_name} = {})=>{
    console.log(chalk.red.inverse('mapbox'));
    if (error){
        return console.log(error);
    }
    openweathermap.forecast(latitude, longitude, (error, forecast) => {
        if(error){
            return console.log(error);
        }
        console.log(chalk.green.inverse("openweathermap forecast"));
        console.log(place_name, forecast);
    })
    tomorrow.wheaterForLoc(latitude, longitude, (error,tommorowForecast)=>{
        if(error){
            return console.log(error)
        }
        console.log(chalk.green.inverse('tommorow forecast'))
        console.log(place_name, tommorowForecast);
    })

    
        weatherstack.forecast(latitude, longitude, (error,weatherForecast)=>{
            if(error){
                return console.log(error);
            }
            console.log(chalk.green.inverse("Weatherforecast"));
            console.log(weatherForecast);
        
    })
})

