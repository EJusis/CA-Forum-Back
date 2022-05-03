const express = require('express')
const router = express.Router()
const {validateRegistration, validateLogin} = require("../middle/validator")
const {addNewUser, loginUser, toLocalStorage, addAvatar, createTopic, getAllTopics, getSingleTopic, addComment, getMyTopics} = require("../controller/mainController")

router.post('/adduser', validateRegistration, addNewUser)
router.post('/loginuser', validateLogin, loginUser)
router.get('/localStorage/:email', toLocalStorage)



// new Routes
router.post('/addAvatar', addAvatar)
router.post('/addTopic', createTopic)
router.get('/getAllTopics', getAllTopics)
router.get('/getSingleTopic/:id', getSingleTopic)
router.post('/addComment', addComment)
router.get('/getMyTopics/:email', getMyTopics)

module.exports = router