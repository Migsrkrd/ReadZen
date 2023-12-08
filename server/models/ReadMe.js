const { Schema, model } = require('mongoose');

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
    deployLink: {
        type: String
    }
});

const ReadMe = model('ReadMe', readMeSchema);

module.exports = ReadMe;