const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if(value<0){
                throw new Error('Age must be a positive number.')
            }
        }
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
    }
})

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

const User = mongoose.model('User', userSchema)

module.exports = User