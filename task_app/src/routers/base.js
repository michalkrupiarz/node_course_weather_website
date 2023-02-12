const express = require('express')
const router = new express.Router()

router.get('', (req,res)=>{
    res.render('loginPage',{
        title: 'Wheater app changed by me',
        createdBy: 'Michal',
        name: 'Michal'
    })
})

router.get('/index', (req,res)=>{
    res.render('index',{
        title: 'Wheater app changed by me',
        createdBy: 'Michal',
        name: 'Michal'
    })
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

router.get('*', (req,res)=>{
    res.render('pageNotFound',{
        title: 'Page not found',
        name: 'Michal',
        errorMessage: 'Page on server was not found'
    })
})
module.exports = router;