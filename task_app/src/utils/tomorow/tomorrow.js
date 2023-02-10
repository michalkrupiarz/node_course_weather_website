const { default: axios } = require('axios');
const request = require('request');

const baseurl = 'https://api.tomorrow.io/v4/timelines';
const fields = '&fields=temperature,temperatureApparent,windSpeed,sunriseTime';
const timestep = '&timesteps=current';
const units = '&units=metric';
const api_key = '&apikey=iSRhpZLijV5DxqVgbDW8tCetcQEjrPd1';
const location = '?location=';


const wheaterForLoc = async(lat, longt) => {
    try{
        const req = await axios.get(baseurl + location +lat +','+ longt + fields + units + api_key)
            .catch(function(error){
                if(error.response){
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
                console.log(error.config);    
                }
            )
        if (req.data.code){
            console.log({error: req.data})
        }
        return req.data.data.timelines[0].intervals;

    } catch (e){
        console.log({error: e})
    }
}

module.exports = {wheaterForLoc: wheaterForLoc}

//https://api.tomorrow.io/v4/timelines?location=50.9722066955017,16.665495467128&fields=temperature,temperatureApparent,windSpeed,sunriseTime&timesteps=1h&units=metric&apikey=iSRhpZLijV5DxqVgbDW8tCetcQEjrPd1