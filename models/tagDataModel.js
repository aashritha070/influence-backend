const mongoose = require('mongoose')

const tagTable = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
},
    { timestamps: true }
);

module.exports = mongoose.model("tagData", tagTable);