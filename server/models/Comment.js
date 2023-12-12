const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const commentSchema = new Schema({
    readMeId: {
        type: Number,
        required: 'You need a readme to comment to!'
    },
    author: {
        type: String,
        required: 'You need to have an author!'
    },
    text: {
        type: String, 
        required: 'You need to have a comment!',
        trim: true
    },
    datePosted: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },

});

const Comment = model('Comment', commentSchema);

module.exports = Comment;