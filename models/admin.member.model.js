const mongooose = require('mongoose');

let memberAdminSchema = mongooose.Schema({

    Email : {
        type : String,
        required : true,
        unique:true
    },Password :{

        type : String ,
        required : true
    },writeable:{
        type : Boolean,
        default : false
    }




});


module.exports = mongooose.model('memberAdmin', memberAdminSchema);