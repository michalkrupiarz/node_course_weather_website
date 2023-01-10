const request = require('request')
const chalk = require('chalk');

const key = 'pk.eyJ1IjoicG9uY3p1cyIsImEiOiJjbGNwOTd3cG4xcmN1M25wODE3Z2c0MG1nIn0.SsTSoasKD_dntl_73ms6gw'

const geocode = (address, callback) => 
{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address)+ '.json?access_token='+key;
    request({url: url, json:true},(error, response)=>{
        if(error){
            callback('General error', undefined)
        } else if (response.body.features.length === 0){
            callback('Unable to find location', undefined);
        } else{
            callback(undefined, {
                place_name : response.body.features[0].place_name,
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0]
            });
        }
    })
}

module.exports = {
    geocode: geocode
}