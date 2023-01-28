require('../src/db/mongoose')
const User = require('../src/models/user')

// User.findByIdAndUpdate('63d051b49bda63ef590e22cd', {age: 39}).then((user) => {
//     console.log(user) 
//     return User.countDocuments({age: 39})
// }).then((result)=>{
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, {age});
    const count = await User.countDocuments({age})
    return count
}

updateAgeAndCount('63d051b49bda63ef590e22cd', 40).then((result) => {
    console.log(result)
}).catch((e) =>{
    console.log(e)
})