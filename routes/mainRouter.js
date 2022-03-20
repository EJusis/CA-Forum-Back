const express = require('express')
const router = express.Router()
const {validateRegistration, validateLogin, validateNewProduct,validateFilter} = require("../middle/validator")
const {addNewUser, loginUser, toLocalStorage, addNewProduct, getAllProducts, filterProduct, addBookedDays, getSingleProduct} = require("../controller/mainController")

router.post('/adduser', validateRegistration, addNewUser)
router.post('/loginuser', validateLogin, loginUser)
router.get('/localStorage/:email', toLocalStorage)
router.post('/addproduct', validateNewProduct, addNewProduct)
router.get('/getallproducts', getAllProducts)
router.post('/filterproduct', validateFilter, filterProduct)
router.post('/bookdays', addBookedDays)
router.get('/getsingleproduct/:id', getSingleProduct)

module.exports = router