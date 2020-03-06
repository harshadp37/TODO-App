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
}, { timestamps: 1 })

var List = mongoose.model('List', listSchema);
module.exports = List;