const mongoose = require('mongoose');


let UserInfoSchema = new mongoose.Schema({

  NAME : {
      type : String
  },GENDER : {
      type : String
  },occupation : {
      type :String
  },AGE : {
      type : String
  },PLACE : {
      type : String
  },WISH : [{
      Wish_NAME : {
          type : String
      }
  }]


});


module.exports = mongoose.model("UserInfo" ,UserInfoSchema );