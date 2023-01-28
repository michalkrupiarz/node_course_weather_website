const express = require('express')
const bcrypt = require('bcrypt');
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

// const myFunc = async () => {
//     const pass = 'Red12345!'
//     const hashedPassword = await bcrypt.hash(pass, 8);
//     console.log(pass)
//     console.log(hashedPassword)

//     const isMatch = await bcrypt.compare('zdzichu', hashedPassword);
//     console.log(isMatch)
// }

// myFunc();