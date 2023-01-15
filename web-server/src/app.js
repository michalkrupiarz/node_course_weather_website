const path = require('path');
const express = require('express');
const hbs = require('hbs');
const { allowedNodeEnvironmentFlags } = require('process');

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

app.get('/forecast', (req,res)=>{
    res.send({
        location: 'Mietkow',
        temperature: '10 degrees'
    })
    res.render('forecast',{
        title: 'this is forecast',
        name: 'Michal'
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