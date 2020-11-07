const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    MOBILE_NUMBER : {
    type : String,
    required : true,

    },
    Email : {
        type : String ,
        required : true,
        unique:true
    },
    Password : {

        type : String ,
        required : true

    },welcomePage: {
        type :Boolean,
        default : true
    },userInfo : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'UserInfo'
      
    }
    

});

module.exports = mongoose.model('User',userSchema);