const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')

router.get('', (req,res)=>{
    res.render('loginPage',{
        title: 'Wheater app changed by me',
        createdBy: 'Michal',
        name: 'Michal'
    })
})

router.get('/login', (req,res) => {
    res.render('loginPage',{
        title: 'Wheater app changed by me',
        createdBy: 'Michal',
        name: 'Michal'
    })
})

router.get('/index', auth,(req,res)=>{
    console.log('we are in index');
    try {
        res.render('index',{
            title: 'Wheater app changed by me',
            createdBy: 'Michal',
            name: 'Michal'
        })
        console.log('we are in index');
    } catch (error) {
        console.log('error z try catch: ', error)
        res.status(401).send('Internal server error');
    }
})

router.get('/about', (req,res)=>{
    console.log('czy weszlo w about')
    res.render('about',{
        title: 'About me',
        name: 'Michal'

    })
})


router.get('/help', (req,res)=>{
    res.render('help',{
        title: 'This is title of help page',
        msg2: 'do not resist.',
        name: 'Michal'
    })
})

router.get('/products', (req, res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide search term.'
        })
    }

    res.send({
        products: [] 
    })
})

router.get('/help/*', (req,res)=>{
    res.render('pageNotFound',{
        title: 'Sub page of help was not found.',
        name: 'Michal',
        errorMessage: 'Help does not have the article you are looking for'
    })
})

router.get('/registerUser', (req,res)=>{
    res.render('registerUser',{
        title: "Registration",
        name: 'Michal'
    })
})

router.get('*', (req,res)=>{
    res.render('pageNotFound',{
        title: 'Page not found',
        name: 'Michal',
        errorMessage: 'Page on server was not found'
    })
})
module.exports = router;