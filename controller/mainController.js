const userSchema = require('../models/User')
const topicSchema = require('../models/Topic')

module.exports = {
    addNewUser: async (req, res) => {
        const user = await new userSchema()
            user.email = req.body.email
            user.password = req.body.pass1
            user.stayLogged = false
            user.avatar = 'none'

        try {
            user.save().then(() => {
                res.send({success: true, message: 'User added to DB'})})

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
    addAvatar: async (req,res) => {
        const {email, avatar} = req.body
        const changedAvatar = await userSchema.findOneAndUpdate({email: email}, {avatar: avatar}, {new: true})
        try{
            res.send(changedAvatar)
        }
        catch (error) {
            res.send({success: false, reason: 'error message'})
        }
    },
    createTopic: async (req,res) => {
        const topic = await new topicSchema()
        topic.photo = req.body.photo
        topic.description = req.body.description
        topic.title = req.body.title
        topic.owner = {
            email: req.body.owner.email,
            avatar: req.body.owner.avatar
        }
        topic.creationTime = req.body.creationTime
        topic.posts = []


        try {
            topic.save().then(() => {
                res.send({success: true, message: 'topic added to DB'})})
            console.log('topic added to DB')
        }
        catch (error) {
            res.send({success: true, reason: 'DB error'})
            console.log('error with DB')
        }
    },
    getAllTopics: async (req, res) => {
        const allTopics = await topicSchema.find()
        try{
            res.send(allTopics)

        }
        catch (error) {
            res.send({success: false, reason: 'error with DB'})
        }
    },
    getSingleTopic: async (req, res) => {
        const {id} = req.params
        console.log(id)
        const findTopic = await topicSchema.findOne({_id: id})
        try{
            res.send(findTopic)
        }
        catch (error) {
            res.send({success: false, reason: 'error message'})
        }
    },
    addComment: async (req,res) => {
        const newComment = {
            author: req.body.author,
            comment: req.body.comment,
            media: req.body.media,
            date: req.body.date
        }
        const updatedTopic = await topicSchema.findOneAndUpdate(
            {_id: req.body.id},
            {$push: {posts: newComment}},
            {new: true}
        )
        try{
            res.send(updatedTopic)
        }
        catch (error) {
            res.send({success: false, reason: 'error message'})
        }

    },
    getMyTopics: async (req, res) => {
        const {email} = req.params
        const findTopic = await topicSchema.find({
            "owner.email": email
        })
        try{
            res.send(findTopic)
        }
        catch (error) {
            res.send({success: false, reason: 'error message'})
        }
    }
}