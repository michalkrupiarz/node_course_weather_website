const e = require('express')
const express = require('express')
const axios = require('axios');
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
    try {
        res.render('index',{
            title: 'Wheater app changed by me',
            createdBy: 'Michal',
            name: 'Michal'
        })
    } catch (error) {
        res.status(401).send({error: e.message});
    }
})

router.get('/about', (req,res)=>{
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

router.get('/profile', (req,res) => {
    res.render('profile', {
        title: 'Profile',
        author: 'Michal'
    })
})

router.get('/notesList', (req,res) =>{
    res.render('notesList',{
        title: 'Notes list',
        author: 'Michal'
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