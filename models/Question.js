const mongoose = require('mongoose')
const Schema = mongoose.Schema

const QuestionSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref : 'users'
    },
    question:{
        type: String,
        required: true
    },
    answers:[
        {
            user:{
                type : Schema.Types.ObjectId,
                ref: 'users'
            },
            text:{
                type: String,
                required: true
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],    
    
    date: {
        type: Date,
        default: Date.now
    },
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    avatar:{
        type: String
    }, 
    likes: [
        {
            user:{
                type : Schema.Types.ObjectId,
                ref: 'users'
            }
        }
    ],
    comments: [
        {
            user:{
                type : Schema.Types.ObjectId,
                ref: 'users'
            },
            text:{
                type: String,
                required: true
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ]
    
});

module.exports = Question = mongoose.model('question', QuestionSchema)