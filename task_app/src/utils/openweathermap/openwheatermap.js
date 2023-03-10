const request = require('request');
const axios = require('axios');

const api_key = '&appid=8165e1cebb418caf53edf6c4800aa8fe'
const base_url = 'https://api.openweathermap.org/data/2.5/weather';
const latitude ='?lat=';
const longitude = '&lon=';
const units = '&units=metric';

const wheaterForLoc = async(lat, lon) => {
    try{
        const req = await axios.get(base_url+latitude+lat+longitude+lon+units+api_key) 
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
        return req.data;
    } catch (e){
        console.log({error: e})
    }
}

module.exports = {forecast: wheaterForLoc};