const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api')


const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trime: true
    },completed: {
        type: Boolean,
        default: false
    }
})

const laundry = new Task({completed: true})

laundry.save().then(() => {
    console.log(laundry)
}).catch((error) => {
    console.log(error)
})
// const User = mongoose.model('User', {
//     name: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     age: {
//         type: Number,
//         default: 0,
//         validate(value) {
//             if(value<0){
//                 throw new Error('Age must be a positive number.')
//             }
//         }
//     },
//     email:{
//         type: String,
//         required: true,
//         trim: true,
//         lowercase: true,
//         validate(value) {
//             if(!validator.isEmail(value)){
//                 throw new Error('Email is not valid')
//             }
//         }
//     }, 
//     password:{
//         type: String,
//         required: true,
//         minLength: 7,
//         trim: true,
//         validate(value){
//             if(validator.contains('password')){
//                 throw new Error ('Password contains word password')
//             }
//         }
//     }
// })

// const me = new User({name: "   Zdzicho ", email: 'mike@GMAIL.com', password: 'password'})

// me.save().then(()=>{
//     console.log(me)
// }).catch((error) => {
//     console.log(error)
// })