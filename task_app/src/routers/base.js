const e = require('express')
const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const cookieAuth = require ('../middleware/cookieAuth')

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

router.get('/index', cookieAuth,(req,res)=>{
    
    try {
        console.log('i`m in index')
        res.render('index',{
            title: 'Wheater app changed by me',
            createdBy: 'Michal',
            name: 'Michal'
        })
    } catch (error) {
        console.log('error z try catch: ', error)
        res.status(401).send({error: e.message});
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