const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const readMeSchema = new Schema({
    title: {
        type: String, 
        required: 'You need to have a title!',
        trim: true
    },
    description: {
        type: String
    },
    tableOfContents: {
        type: String
    },
    installation: {
        type: String
    },
    usage: {
        type: String
    },
    credits: {
        type: String
    },
    license: {
        type: String
    },
    tests: {
        type: String
    },
    repoLink: {
        type: String
    },
    deployedLink: {
        type: String
    },
    dateCreated: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
    datePublished: {
        type: Date,
        get: (timestamp) => dateFormat(timestamp),
    },
    isPublished: {
        type: Boolean,
        default: false,
    },
    markdown:{
        type: String,
    },
    author: {
        type: String
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
});

const ReadMe = model('ReadMe', readMeSchema);

module.exports = ReadMe;