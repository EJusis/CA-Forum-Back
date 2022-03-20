const validator = require("email-validator");
const userSchema = require('../models/User')
const productSchema = require('../models/Product')


module.exports = {
    validateRegistration: async (req, res, next) => {
        const {email, pass1, pass2} = req.body
        const isInDB = await userSchema.exists({email: email})
        if (isInDB) return res.send({success: false, reason: 'Email is already in use'})
        if (!validator.validate(email)) return res.send({success: false, reason: 'Email is not valid'})
        if (pass1.length < 4) return res.send({success: false, reason: 'Password is too short'})
        if (pass1.length > 20) return res.send({success: false, reason: 'Password is too long'})
        if (pass1 !== pass2) return res.send({success: false, reason: 'Passwords do not match'})
        next()
    },
    validateLogin: async (req, res, next) => {
        const {email, pass, stayLogged} = req.body
        const isInDB = await userSchema.findOne({email: email, password: pass})
        if (!isInDB) {
            return res.send({success: false, reason: 'User credentials mismatch'})
        } else {
            const isInDB = await userSchema.findOneAndUpdate({
                email: email,
                password: pass
            }, {$set: {stayLogged: stayLogged}})
        }
        next()
    },
    validateNewProduct: (req, res, next) => {
        const {photo, city, price, description} = req.body
        if (!photo.includes('http')) return res.send({success: false, reason: '"Http" in Photo URL missing'})
        if (city.length < 1) return res.send({success: false, reason: 'City field left blank'})
        if (price < 1) return res.send({success: false, reason: 'Price field left blank'})
        if (description.length < 1) return res.send({success: false, reason: 'Description field left blank'})
        if (description.length < 10) return res.send({success: false, reason: 'Description too short! (min. 10 chars)'})

        next()

    },
    validateFilter: async (req, res, next) => {
        const isInDB = await productSchema.find({city: req.body.filterCity.toLowerCase()})
        if (isInDB.length === 0) return res.send({success: false, reason: 'City field empty'})
        next()

    }

}