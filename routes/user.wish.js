const express = require('express');
const user = require('../models/user.model');
const jwtauth = require('../middleware/jwtauth');

const userInfo = require('../models/userInfo.model');

let route = express.Router();


route.post('/firstpage',jwtauth, async (req,res)=>{

 try{
   
    const {NAME , AGE , PLACE} = req.body;

 await   user.findById({_id : req.user},(err , doc)=>{
        console.log(doc.userInfo);
        if(err){

        }else{
            if(doc != null){
               
               let info = new userInfo({
                   _id : doc.userInfo,
                   NAME : NAME, AGE : AGE, PLACE :PLACE
               });

               info.save((err,docs)=>{
                   if(!err){

                    user.findByIdAndUpdate({_id : req.user},{welcomePage:false},(err)=>{

                        if(!err){

                            res.status(200).json({msg : true});

                        }
                    });

                   }
               });

            }
        }
    })




 }catch(e){

    res.status(400).json({msg:false});


 }




});







module.exports = route;
