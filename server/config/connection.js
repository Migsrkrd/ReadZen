const mongoose = require('mongoose');
//REMEMBER TO PLACE CONNECTION STRING HERE
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/readZenDB');

module.exports = mongoose.connection;