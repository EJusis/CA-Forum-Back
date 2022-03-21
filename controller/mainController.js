const userSchema = require('../models/User')
const productSchema = require('../models/Product')

module.exports = {
    addNewUser: async (req, res) => {
        const user = await new userSchema()
            user.email = req.body.email
            user.password = req.body.pass1
            user.isAdmin = req.body.isAdmin
            user.stayLogged = false

        try {
            user.save().then(() => {
                res.send({success: true, message: 'User added to DB'})})
            console.log('user added to DB')
        }
        catch (error) {
            res.send({success: true, reason: 'DB error'})
            console.log('error with DB')
        }
    },
    loginUser: async (req, res) => {
        const {email, pass} = req.body
        const isInDB = await userSchema.findOne({email: email, password: pass})
        try{
            res.send({success: true, message: isInDB.stayLogged, isInDB})
        }
        catch (error) {
            res.send({success: false, reason: 'Failed to fetch'})
        }
    },
    toLocalStorage: async (req, res) => {
        const {email} = req.params
        const findUser = await userSchema.findOne({email})
        try{
            res.send(findUser)
        }
        catch (error) {
            res.send({success: false, reason: 'error message'})
        }
    },
    addNewProduct: async (req, res) => {
        const product = await new productSchema()
        product.photo = req.body.photo
        product.city = req.body.city.toLowerCase()
        product.price = req.body.price
        product.description = req.body.description
        product.bookedDays = []

        try {
            product.save().then(() => {
                res.send({success: true, message: 'Product added to DB'})})
            console.log('Product added to DB')
        }
        catch (error) {
            res.send({success: true, reason: 'DB error'})
            console.log('error with DB')
        }
    },
    getAllProducts: async (req, res) => {
        const allProducts = await productSchema.find()
        try{
            res.send(allProducts)

        }
        catch (error) {
            res.send({success: false, reason: 'error with DB'})
        }
    },
    filterProduct: async (req, res) => {
        const {filterCity, minPrice, maxPrice} = req.body
        const filteredProducts = await productSchema.find({price: {$lte: maxPrice, $gte:minPrice}, city: filterCity})

        try{
           if(filteredProducts.length>0) {
               res.send(filteredProducts)
           } else {
               res.send({success: false, reason: 'No match'})}

        }
        catch (error) {
            res.send({success: false, reason: 'error with DB'})
        }
    },
    getSingleProduct: async (req, res) => {
        const {id} = req.params
        const findUser = await productSchema.findOne({_id: id})
        console.log(findUser)
        try{
            res.send(findUser)
        }
        catch (error) {
            res.send({success: false, reason: 'error message'})
        }
    },
    addBookedDays: async (req, res) => {
        const {productId, allDays} = req.body
        const isInDb = await productSchema.findOneAndUpdate({_id: productId}, {$push: {bookedDays: allDays}})
        try{
            res.send(isInDb)
        }
        catch (error) {
            res.send({success: false, reason: 'error message'})
        }


    }
}