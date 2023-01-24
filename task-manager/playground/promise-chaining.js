require('../src/db/mongoose')
const User = require('../src/models/user')

User.findByIdAndUpdate('63d051b49bda63ef590e22cd', {age: 39}).then((user) => {
    console.log(user) 
    return User.countDocuments({age: 39})
}).then((result)=>{
    console.log(result)
}).catch((e) => {
    console.log(e)
})

// User.findOne({_id: '63d051b49bda63ef590e22cd'}).then((user) =>{
//     console.log(user)
// })
