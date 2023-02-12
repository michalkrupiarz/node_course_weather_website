const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
//const Task = require('./task')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error('Email is not valid')
            }
        }
    }, 
    password:{
        type: String,
        required: true,
        minLength: 7,
        trim: true,
        validate(value){
            if(validator.contains(value, 'password')){
                throw new Error ('Password contains word password')
            }
        }
    },
    locations: [{
        location: {
            name: String,
            lattitude: String,
            longitude: String
        }
    }],
    lastLoginAt:{
        type: Date,
        required: true
    },
    tokens:[{
        token: {
            type: String,
            required: true
        }
    }]
},{
    timestamps: true
})

// userSchema.virtual('tasks', {
//     ref: 'Task',
//     localField: '_id',
//     foreignField: 'owner'
// })

userSchema.methods.toJSON = function (){
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.tokens;
   
    return userObject;
}

userSchema.methods.generateAuthToken = async function (){  
    const user = this;    
    const token = jwt.sign({_id: user._id.toString()}, 'thisismynewcourse', {expiresIn: '1 hours'})
    user.tokens = user.tokens.concat({token})
    const now = Date.now();
    user.lastLoginAt = now;
    await user.save();
    return token;
}

userSchema.statics.findByCredentials = async (login, password) => {
    try {
        const user = await User.findOne({email: login});
        if (!user){
            throw new Error('Unable to login')
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            throw new Error('Unable to login')
        }
        return user
    } catch (e){
        throw new Error('Something went wrong')
    }
} 

//hash user password

userSchema.pre('save', async function(next){
    const user = this;
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

//delete user tasks when user is removed

userSchema.pre('remove', async function(next){
    const user = this;
    
    //await Task.deleteMany({owner: user._id});

    next();
})

const User = mongoose.model('User', userSchema)

module.exports = User