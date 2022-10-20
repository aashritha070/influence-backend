const mongoose = require('mongoose')

const blogTable = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    coverPic: {
        type: String,
        required: false,
    },
    emailId: {
        type: String,
        required: true
    },
    tags: {
        type: Array,
        required: false
    }
},
    { timestamps: true }
);

module.exports = mongoose.model("blogData", blogTable);