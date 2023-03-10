const { default: axios } = require('axios');

const key = 'pk.eyJ1IjoicG9uY3p1cyIsImEiOiJjbGNwOTd3cG4xcmN1M25wODE3Z2c0MG1nIn0.SsTSoasKD_dntl_73ms6gw'

const geocode = async(address) => {
    try{
        const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address)+ '.json?access_token='+key;
        const req = await axios.get(url)
            .catch(function(error){
                if(error.response){
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                    return {error: error.response}
                } else if (error.request) {
                    return ({error : error.request});
                } else {
                   return ({error: error.message});
                }
                return {error: error.config};    
                }
            )
            if (req.data.features.length === 0){
                return {error: 'Location not found'}
            }
            return {place_name: req.data.features[0].place_name,
                lattitude: req.data.features[0].center[1],
                longitude: req.data.features[0].center[0]};
    } catch (e){
        return {error: e};
    }
}

module.exports = {
    geocode: geocode
}