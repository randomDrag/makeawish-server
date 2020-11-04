const mongoose = require('mongoose');
const User = require('../models/user.model');

let NumberSchema = new mongoose.Schema({

    NUMBER : {
        type : String, 
        required : true,
      
    },USER : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'User'
    }


});


module.exports = mongoose.model("MONumber" ,NumberSchema );