const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api')

const Task = mongoose.model('Task', {
    description: {
        type: String
    },completed: {
        type: Boolean
    }
})

const laundry = new Task({description: "this is laundry", completed: false})

laundry.save().then(() => {
    console.log(laundry)
}).catch((error) => {
    console.log(error)
})
// const User = mongoose.model('User', {
//     name: {
//         type: String
//     },
//     age: {
//         type: Number
//     }
// })

// const me = new User({name: "Michal", age: 38})

// me.save().then(()=>{
//     console.log(me)
// }).catch((error) => {
//     console.log(error)
// })