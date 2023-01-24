const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api')




// const laundry = new Task({completed: true})

// laundry.save().then(() => {
//     console.log(laundry)
// }).catch((error) => {
//     console.log(error)
// })


// const me = new User({name: "   Zdzicho ", email: 'mike@GMAIL.com', password: 'password'})

// me.save().then(()=>{
//     console.log(me)
// }).catch((error) => {
//     console.log(error)
// })