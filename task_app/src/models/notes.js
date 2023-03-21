const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description:{
        type: String
    },
    completed: {
        type: Boolean,
        default: false
    },
    comments: [{
        comment:{
            type: String
        }
    }],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }},
    {
        timestamps: true
    
})
const Note = mongoose.model('Note', noteSchema)

module.exports = Note