const path = require('path');
const express = require('express');

const app = express();


app.set('view engine', 'hbs'); //handlebars set up
app.use(express.static(path.join(__dirname,'../public')));

app.get('', (req,res)=>{
    res.render('index',{
        title: 'wheater app changed by me',
        createdBy: 'Michal'
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
        msg: 'This is the helpe message',
        msg2: 'do not resist.'
    })
})

app.get('/forecast', (req,res)=>{
    res.send({
        location: 'Mietkow',
        temperature: '10 degrees'
    })
})


app.listen(3000, ()=>{
    console.log('Server is up on port 3000');
});