const path = require('path');
const express = require('express');
const hbs = require('hbs');
const { allowedNodeEnvironmentFlags } = require('process');
const { response } = require('express');
require('./db/mongoose')


const weatherRouter = require('./routers/weather')
const baseRouter = require('./routers/base')
const userRouter = require('./routers/user')

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

app.use(express.json());

app.use(weatherRouter)
app.use(baseRouter)
app.use(userRouter)

app.listen(3000, ()=>{
    console.log('Server is up on port 3000 yeah');
});