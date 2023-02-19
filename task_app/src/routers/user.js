const express = require('express')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = new express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')
const multer = require('multer')
const upload = multer({
    dest: 'avatar'
})
const mapbox = require('../utils/mapbox/mapbox.js');

router.post('/users', async (req,res) => {
    const user = new User(req.body)
    try{
        const token = await user.generateAuthToken();
        await user.save()
        req.session.token = token; 
        res.cookie("token", token, {
            httpOnly: false,
            sameSite: "strict"
          });   
        res.status(201).send({user, token})
    } catch (e){
        res.status(400).send({error: e.message})
    }
})

router.post('/users/login', async (req, res) => {
    console.log('doszlo tu w ogole?')
    try {
        const user = await User.findByCredentials(req.body.login, req.body.password)
        const token = await user.generateAuthToken();
        req.session.token = token;
        res.cookie("token", token, {
            httpOnly: false,
            sameSite: "strict"
          });
        res.status(200).send({user, token});      
    } catch (e){
        res.status(400).send({error: e.message});
    }
})

router.post('/users/logout', auth, async (req, res)=>{
    try {
        res.cookie("token", '')
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch (e){
        res.status(500).send(e);
    }
})

router.post('/users/logoutAll', auth, async(req, res)=>{
    console.log('is in logout')
    try {
        req.user.tokens = [] ;
        await req.user.save();
        res.send()
    } catch (e){
        res.status(500).send(e);
    }
})

router.get('/users/me', auth, async (req,res) => {
    res.send(req.user)    
})

router.patch('/users/me', auth, async (req,res) => {
    const updates = Object.keys(req.body); 
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    
    if(!isValidOperation){
        return res.status(400).send({error: 'Invalid updates!'});
    }
    
    try {
        updates.forEach((update) => {
            req.user[update] = req.body[update]
        })
        await req.user.save()   
        res.send(req.user)
    }catch (e){
        res.status(500).send(e)
    }
})

router.delete('/users/me', auth, async (req,res) => {
    try {
        await req.user.remove()
        res.send(req.user)
    } catch (e){
        res.status(500).send(e);
    }
    
})

router.post('/users/me/location', auth, async(req, res)=>{
    try {
        const foundLoc = await mapbox.geocode(req.body.location);
        req.user.locations = req.user.locations.concat({location: {
            name : foundLoc.place_name,
            locType: req.body.type,
            lattitude: foundLoc.lattitude,
            longitude: foundLoc.longitude
        }})       
        await req.user.save();
        res.send({user: req.user,
            loc: foundLoc})
    }catch (e){
        res.status(500).send({error: e})
    }
})

router.delete('/users/me/location/:id', auth, async(req,res) => {
    try {
        const index = req.user
            .locations
            .findIndex(el => el._id.toString() === req.params.id);
        if (index !== -1){
            req.user.locations.splice(index, 1);
        }
        await req.user.save()
        res.send({user: req.user})
    } catch (error){
        res.status(500).send({error: error});
    }
})

router.post('/users/me/avatar', upload.single('meAvatar'), async(req, res) => {
    res.send()
})
module.exports = router