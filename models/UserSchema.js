const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    age: Number,
    sex: String,
    height: Number,
    startweight: Number,
    currentweight: Number,
    goalweight: Number,
    caloriegoal: Number,
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)