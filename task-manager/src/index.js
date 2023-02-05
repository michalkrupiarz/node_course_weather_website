const express = require('express')
const jwt = require('jsonwebtoken');
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000


app.use(express.json());

app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port ' +port)
})


const main = async () => {
    // const task = await Task.findById('63df9101307c023c329223b8')
    // await task.populate('owner')+
    // console.log(task)

    const user = await User.findById('63df905429837c4fe44db446')
    await user.populate('tasks')
    console.log(user.tasks)
}

//main()