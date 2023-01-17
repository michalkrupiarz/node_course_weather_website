const path = require('path');
const express = require('express');
const chalk = require('chalk')
const hbs = require('hbs');
const { allowedNodeEnvironmentFlags } = require('process');
const { response } = require('express');

const geocode = require('./utils/geocode/geocode.js');
const mapbox = require('./utils/mapbox/mapbox.js');
const weatherstack = require('./utils/weatherstack/wheaterstack.js')
const tomorrow = require('./utils/tomorow/tomorrow.js')
const openweathermap = require('./utils/openweathermap/openwheatermap.js')

const app = express();

//path for expres
const viewPath = path.join(__dirname, '../templates/views')
const staticPath = path.join(__dirname, '../public');
const partialPath = path.join(__dirname, '../templates/partials')

// setup handlebars view engine to hbs and where to look for templates
app.set('view engine', 'hbs'); //handlebars set up
app.set('views', viewPath);
hbs.registerPartials(partialPath);

//setup static direcotry to serve
app.use(express.static(staticPath));

app.get('', (req,res)=>{
    res.render('index',{
        title: 'Wheater app changed by me',
        createdBy: 'Michal',
        name: 'Michal'
    })
})

app.get('/about', (req,res)=>{
    res.render('about',{
        title: 'About me',
        name: 'Michal'

    })
})

app.get('/help', (req,res)=>{
    res.render('help',{
        title: 'This is title of help page',
        msg2: 'do not resist.',
        name: 'Michal'
    })
})

app.get('/weather', (req,res)=>{   
    geocode.geocode(req.query.address, (error,{latitude, longitude, place_name} = {})=>{
        let forecasts = [];
        if (error){
            return res.send({
                error: error
            });
        }
        
        openweathermap.forecast(latitude, longitude, (error, forecast) => {
            console.log(place_name);
            if(error){
                return res.send({
                    error: error
                });
            }
            return res.send({
                forecastProvider: "openweahtermap forecast",
                place: place_name,
                forceast : forecast
            })            
        })
        
        // tomorrow.wheaterForLoc(latitude, longitude, (error,tommorowForecast)=>{
        //     if(error){
        //         return console.log(error)
        //     }
        //     console.log(chalk.green.inverse('tommorow forecast'))
        //     console.log(place_name, tommorowForecast);
        // })
    
        
        // weatherstack.forecast(latitude, longitude, (error,weatherForecast)=>{
        //     if(error){
        //         return console.log(error);
        //     }
        //     console.log(chalk.green.inverse("Weatherforecast"));
        //     console.log(weatherForecast);    
        // })
         
    })
    
})

app.get('/products', (req, res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide search term.'
        })
    }

    res.send({
        products: [] 
    })
})

app.get('/help/*', (req,res)=>{
    res.render('pageNotFound',{
        title: 'Sub page of help was not found.',
        name: 'Michal',
        errorMessage: 'Help does not have the article you are looking for'
    })
})

app.get('*', (req,res)=>{
    res.render('pageNotFound',{
        title: 'Page not found',
        name: 'Michal',
        errorMessage: 'Page on server was not found'
    })
})


app.listen(3000, ()=>{
    console.log('Server is up on port 3000');
});