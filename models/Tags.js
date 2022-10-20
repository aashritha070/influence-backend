const mongoose = require('mongoose')

const TagsTable=new mongoose.Schema({
    name:{
        type:String,
        required:true
    }
},
{timestamps: true}
);

module.exports = mongoose.model("Tags",TagsTable);