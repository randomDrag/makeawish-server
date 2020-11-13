const mongoose = require('mongoose');

let FAQSchema = mongoose.Schema({

   QUESTION : {
        type : String ,
        
      
    },
    ANSWER: {

        type : String ,
       
    }



})


module.exports = mongoose.model('FAQ',FAQSchema);