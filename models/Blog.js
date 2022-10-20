const mongoose = require('mongoose')

const PostTable=new mongoose.Schema({
    Title:{
        type:String,
        required:true,
        unique:true,
    },
    description:{
        type:String,
        required:true,
    },
    coverPic:{
        type:String,
        required:false,
    },
    username:{
        type:String,
        required:true
    },
    tags:{
        type:Array,
        required:false
    }
},
{timestamps: true}
);

module.exports = mongoose.model("Blog",PostTable);