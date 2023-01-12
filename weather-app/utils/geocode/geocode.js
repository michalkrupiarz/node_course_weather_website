const chalk = require('chalk');
const request = require('request');

const baseUrl = 'https://geocode.xyz/';
const api_key = 'auth=445831585840255419331x79355'; 

const geocode = (address, callback) =>{
    request({
            url: urlBuilder(address),
            json: true
        }, (error, response) => {
            if (error){
                callback('General error', undefined)
            } else if (response.body.matches === null ){
                callback('Unable to find location', response.body.error.description)
            } else {
                callback(undefined, {
                    place_name: response.body.alt.loc[0].city,
                    latitude: response.body.alt.loc[0].latt,
                    longitude: response.body.alt.loc[0].longt
                })
            }
        })
};

const urlBuilder = (address) => {
    return baseUrl + encodeURIComponent(address) + '/?json=1&' + api_key;
}

module.exports = {
    geocode: geocode
}