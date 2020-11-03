const mongoose = require('mongoose');
const User = require('../models/user.model');

let NumberSchema = new mongoose.Schema({

    MO_NUMBER : {
        type : String, 
        required : true,
        minlength : 10
    },USER : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'User'
    }


});


module.exports = mongoose.model("MONumber" ,NumberSchema );