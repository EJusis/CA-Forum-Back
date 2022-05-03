const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const topicSchema = new Schema({
    owner: {
        type: Object,
        require: true
    },
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    photo: {
        type: Array,
        require: true
    },
    posts: {
        type: Array,
        require: true
    },
    creationTime: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('Topics', topicSchema)