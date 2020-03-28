const mongoose = require('mongoose');

/* CREATE LIST SCHEMA WITH TITLE, CATEGORY, DEADLINE */
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

/* EXPORT LIST SCHEMA */
module.exports = mongoose.model('List', listSchema);