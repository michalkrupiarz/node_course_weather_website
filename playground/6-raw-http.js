const http = require('http');

const accessKey = '?access_key=2c588b9c6de8dc56a0ac3c5a334e6cb8';
const wheaterUrl = 'http://api.weatherstack.com/current' +accessKey+ '&query=45,-75';

const request = http.request(wheaterUrl, (response) =>{
    let data = '';
    response.on('data', (chunk) => {
        data = data + chunk.toString();

    })

    response.on('end', ()=>{
        const body = JSON.parse(data);
        console.log(body);
    })
})

request.on('error', (error) =>{
    console.log(error);
})

request.end();