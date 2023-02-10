const request = require('request')
const axios = require('axios')

const accessKey = '?access_key=2c588b9c6de8dc56a0ac3c5a334e6cb8';
const url = 'http://api.weatherstack.com/current' +accessKey+ '&query='; //latitude, longitide

const wheaterForLocAsync = async(lattitude, longitude) => {
    try {
        const req = await axios.get(url+lattitude+','+longitude)
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
        if (req.data.error){
            console.log({error: req.data.error})
        }
        return req.data;
    } catch (e){
        console.log({error: e});
    }
}

module.exports = {forecast: wheaterForLocAsync};