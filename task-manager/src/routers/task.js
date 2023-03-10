const express = require('express')
const router = new express.Router()
const Task = require('../models/task')
const auth = require('../middleware/auth')

router.post('/tasks', auth, async (req,res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    try{
        res.status(201).send( await task.save())
    } catch(e){
        res.status(400).send(e)
    }
})

//get /tasks?completed=false
//limit //skip
//tasks?limit=10&skip=0
//get /tasks?sortBy=createAt:asc

router.get('/tasks', auth, async (req,res) => {
    const match = {}
    const sort = {}
    if (req.query.completed){
        match.completed = req.query.completed === 'true'
    }
    
    if (req.query.sortBy){
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1].toLowerCase() === 'desc' ? -1 : 1
    }

    try{
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            } 
        })
        if(req.user.tasks.length<1){
            res.send("No tasks found");
        } else {
            res.send({
                tasksFound : {
                    count: req.user.tasks.length,
                    tasks: req.user.tasks
                }
            })
        }
        
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/tasks/:id', auth, async (req,res) => {
    const _id = req.params.id
    console.log(req.user._id)
    try{    
        const task = await Task.findOne({_id, owner: req.user._id})
        if(!task){
            return res.status(404).send("Did not find the task.")
        }
        res.send(task)
    } catch (e){
        res.status(500).send(e)
    }
})

router.patch('/tasks/:id', auth, async (req,res) => {
    const isValid = Object.keys(req.body)
        .every((update) => ['description'
                , 'completed']
            .includes(update))
    if(!isValid){
        return res.status(400).send({error: 'Invalid update'})
    }
    
    try {
        const task = await Task.findOne({_id: req.params.id, owner: req.user._id})
        
        if(!task){
            return res.status(404)
                .send('No task found')
        }
        Object.keys(req.body).forEach((update) => {
            task[update] = req.body[update]
        })
        await task.save()        
        res.send(task)
    } catch (e){
        return res.status(500)
            .send(e)
    }
})

router.delete('/tasks/:id', auth, async (req,res) => {
    try {
        const task = await Task.findOneAndDelete({_id: req.params.id, owner: req.user._id})
        if(!task){
            return res.status(404).send('Task not found!')
        }
        res.send(task)
    } catch (e){
        res.status(500).send(e);
    }
    
})

module.exports = router