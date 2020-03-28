const mongoose = require('mongoose');

var listSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
    },
    deadline: {
        type: Date,
    }
}, {timestamps: true})

module.exports = mongoose.model('List', listSchema);