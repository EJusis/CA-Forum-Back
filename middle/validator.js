const validator = require("email-validator");
const userSchema = require('../models/User')


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

}