const chalk = require('chalk');
const request = require('request');

const baseUrl = 'https://geocode.xyz/';
const api_key = 'auth=445831585840255419331x79355'; 

const geocode = (address, callback) =>{
    request({
            url: urlBuilder(address),
            json: true
        }, (error, {body} = {}) => {
            if (error){
                callback('General error', undefined)
            } else if (body.matches === null ){
                callback('Unable to find location', body.error.description)
            } else {
                callback(undefined, {
                    place_name: body.alt.loc[0].city,
                    latitude: body.alt.loc[0].latt,
                    longitude: body.alt.loc[0].longt
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