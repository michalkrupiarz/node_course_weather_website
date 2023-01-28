require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.find({}).then((tasks) => {
//     console.log(tasks)
// }).catch((error) => {
//     console.log(error)
// })

// Task.findByIdAndDelete('63d0544a0ef63b38cf690324').then((task) => {
//     console.log(task)
//     return Task.countDocuments({completed: false})
// }).then((result) => {
//     console.log(result)
// }).catch((error)=> {
//     console.log(error)
// })

const deleteTaskAndCount = async (id) => {
    await Task.findByIdAndDelete(id);
    return await Task.countDocuments({completed:false});
}

deleteTaskAndCount('63cf02c088df4c52ba04384c').then((r) => {
    console.log(r)
}).catch((e) => {
    console.log(e)
})