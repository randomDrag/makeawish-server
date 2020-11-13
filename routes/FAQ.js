const express = require('express');

let route = express.Router();

let FAQ = require('../models/FAQ.model');

const memberjwtauth = require('../middleware/memberjwt');

const member = require('../models/admin.member.model');

route.get("/",(req,res)=>{

    try{

        FAQ.find((err,doc)=>{

                if(!err){
            
                    res.status(200).json({msg:true,
                                            data : doc});
    
                }

         

        });



    }catch(e){
        res.status(200).json({msg:false});
    }



});

route.post('/create',memberjwtauth, async (req,res)=>{

  await  member.findOne({_id : req.member},(err,docs)=>{

        if(!err){

            if(docs.writeable){
                try{

                  let createfaq = new FAQ(req.body);

                  createfaq.save((err)=>{
                      if(!err){
                        res.status(200).json({msg:true});
                      }
                  })
            
                }catch(e){
                    res.status(200).json({msg:false});

            
                }
            

            }

        }else{
            res.status(200).json({msg:false});

        }

    });
    
   




});


route.get("/del/:id",memberjwtauth,(req,res)=>{

    user.findOne({_id : req.member},(err,docs)=>{

        if(!err){

            if(docs.writeable){
                try{

                    memberModel.findByIdAndDelete({_id : req.params.id},(err,doc)=>{
            
                        if(!err){
            
                            res.status(200).json({msg:true});
            
                        }
                    });
            
                }catch(e){
                    res.status(200).json({msg:false});

            
                }
            

            }

        }else{
            res.status(200).json({msg:false});

        }

    });
    
   

   
});

module.exports = route;