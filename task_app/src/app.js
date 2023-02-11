const path = require('path');
const express = require('express');
const hbs = require('hbs');
const { allowedNodeEnvironmentFlags } = require('process');
const { response } = require('express');

const weatherRouter = require('./routers/weather')
const baseRouter = require('./routers/base')

const geocode = require('./utils/geocode/geocode.js');
const mapbox = require('./utils/mapbox/mapbox.js');
const weatherstack = require('./utils/weatherstack/wheaterstack.js')
const tomorrow = require('./utils/tomorow/tomorrow.js')
const openweathermap = require('./utils/openweathermap/openwheatermap.js');


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

app.use(weatherRouter)
app.use(baseRouter)

app.listen(3000, ()=>{
    console.log('Server is up on port 3000 yeah');
});