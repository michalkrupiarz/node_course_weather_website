const express = require('express')
const router = new express.Router()
const Note = require('../models/notes')
const auth = require('../middleware/auth')

router.post('/notes', auth, async (req,res)=> {
    const note = new Note({
        ...req.body,
        author: {
            id: req.user._id,
            email: req.user.email
        } 
    })
    try{
        res.status(201).send( await note.save())
    } catch(e){

        res.status(400).send(e)
    }
})

router.get('/notes', auth, async (req,res)=>{
    try{
        await req.user.populate({
            path: 'notes'
            // path: 'notes',
            // match,
            // options: {
            //     limit: parseInt(req.query.limit),
            //     skip: parseInt(req.query.skip),
            //     sort
            // } 
        })
        if(req.user.notes.length<1){
            console.log(req.user)
            res.send("No notes found");
        } else {
            res.send({
                userNotes : {
                    count: req.user.notes.length,
                    notes: req.user.notes
                }
            })
        }     
    } catch (e) {
        console.error(e)
        res.status(500).send(e)
    }
})

module.exports = router;