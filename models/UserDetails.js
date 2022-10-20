const mongoose = require('mongoose');

const UserDetails = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        unique:false
    },
    lastName:{
        type:String,
        required:true,
        unique:false
    },
    emailId:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
},
{timestamps: true}
);

module.exports = mongoose.model("UserDetails", UserDetails)