
const axios = require('axios')

const baseUrl = 'https://geocode.xyz/';
const api_key = 'auth=445831585840255419331x79355'; 

const location = async (address) => {
    console.log(urlBuilder(address))
    try {
        const req = await axios.get(urlBuilder(address))
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
        if (req.data.matches === null){
            return ({error: 'Unable to find location'})
        }
        return {placeName: req.data.alt.loc[0].city,
                lattitude: req.data.alt.loc[0].latt,
                longitude: req.data.alt.loc[0].longt}
    } catch (e){
      return console.log(e);
    }
 
}


const urlBuilder = (address) => {
    return baseUrl + encodeURIComponent(address) + '/?json=1&' + api_key + '&limit=1';
}

module.exports = {
    location: location
}