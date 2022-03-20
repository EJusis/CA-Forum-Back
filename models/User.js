const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    "email": {
        type: String,
        required: true
    },
    "password": {
        type: String,
        required: true
    },
    "isAdmin": {
        type: Boolean,
        required:true
    },
    "stayLogged": {
        type: Boolean,
        required:false
    }
})


module.exports = mongoose.model('Users', userSchema)