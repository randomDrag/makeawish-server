const mongoose = require('mongoose');

let FAQSchema = mongoose.Schema({

   QUSTION : {
        type : String ,
        
      
    },
    ANSWER: {

        type : String ,
       
    }



})


module.exports = mongoose.model('FAQ',FAQSchema);