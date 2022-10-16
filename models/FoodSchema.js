const mongoose = require('mongoose')

const Schema = mongoose.Schema

const foodSchema = Schema({
    mealType: {
        type: String,
        required: true
    },
    foodInfo: { name: String, calories: Number, serving: Number },
    // date: { type: }
})

module.exports = mongoose.model('Food', foodSchema)