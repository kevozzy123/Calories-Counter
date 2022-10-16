const { mongo } = require('mongoose')
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const bodySchema = new Schema({
    age: Number,
    sex: String,
    height: Number,
    startweight: Number,
    currentweight: Number,
    goalweight: Number,
    caloriegoal: Number,
    uid: String
})

module.exports = mongoose.model('Body', bodySchema)