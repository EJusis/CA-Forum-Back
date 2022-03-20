const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    "photo": {
        type: String,
        required: true
    },
    "city": {
        type: String,
        required: true
    },
    "price": {
        type: Number,
        required: true
    },
    "description": {
        type: String,
        required: true
    },
    "bookedDays": {
        type: [],
        required: true
    }
})


module.exports = mongoose.model('products', productSchema)