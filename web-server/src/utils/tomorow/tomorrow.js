const request = require('request');

const baseurl = 'https://api.tomorrow.io/v4/timelines';
const fields = '&fields=temperature,temperatureApparent,windSpeed,sunriseTime';
const timestep = '&timesteps=1h';
const units = '&units=metric';
const api_key = '&apikey=iSRhpZLijV5DxqVgbDW8tCetcQEjrPd1';
const location = '?location=';



const wheaterForLoc = (lat, longt, callback) =>{
    request({
        url: baseurl + location +lat +','+ longt + fields + timestep + units + api_key,
        json: true 
    }, (error, response) => {
        if (error){
            callback('General error', undefined)
        } else if (response.body.code){
            callback('Error from provider. ' +response.body, undefined)
        } else {
            callback(undefined, {
                temperature: response.body.data.timelines[0].intervals[0].values.temperature,
                temperatureApparent: response.body.data.timelines[0].intervals[0].values.temperatureApparent,
                sunriseTime: response.body.data.timelines[0].intervals[0].values.sunriseTime
            })
        }
    })
}

module.exports = {wheaterForLoc: wheaterForLoc}

//https://api.tomorrow.io/v4/timelines?location=50.9722066955017,16.665495467128&fields=temperature,temperatureApparent,windSpeed,sunriseTime&timesteps=1h&units=metric&apikey=iSRhpZLijV5DxqVgbDW8tCetcQEjrPd1