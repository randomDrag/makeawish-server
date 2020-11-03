const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({

    Email : {
        type : String ,
        required : true
    },
    Password : {

        type : String ,
        required : true

    },
    

});

module.exports = mongoose.model('User',userSchema);