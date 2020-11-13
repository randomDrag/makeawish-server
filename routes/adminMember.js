const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
let route = express.Router();

let user = require("../models/admin.member.model");
let userdet = require("../models/user.model");
const adminjwtauth = require('../middleware/adminjwt');
const memberjwtauth = require('../middleware/memberjwt');



const saltRounds = 10;



route.post("/AMregister", adminjwtauth, async (req, res) => {

let {Email , Password} = req.body;

  user.findOne({"Email" :Email},function(err,doc){

    if(err){

    
    }else{
       
        if(doc === null|| doc === ''){

            bcrypt.hash(Password, saltRounds, function(err, hash) {
                
           



        const dat = new user({
            Email : Email,
            Password : hash
        });



            dat.save(function (err, doc) {
        
                if (err) {
                    res.status(400).json(err);
                } else {
                    res.status(200).json({msg : true})
                }
        
            });

        });
        
        }else{
            res.status(200).json({msg : false})
        }
      
    }
    
  });
    

});


route.post("/login",  async function(req ,res){

    try{
    let {Email , Password} = req.body;


    await user.findOne({"Email" :Email},function(err,doc){

        if(err){
    
        
        }else{
           
            if(doc != null){
    
                bcrypt.compare(Password, doc.Password, function(err, result) {
                    
               if(err){

               }else{
                   if(result){
                    
                     const token = jwt.sign({id : doc._id},process.env.JWT_SECRET,{expiresIn : '1h'});
                    
                       const t = token.split(".");
                      
                       const c1 = t[0] + "." + t[1];
                       const c2 = t[2];
                
                       res.cookie("M_0",c1,{httpOnly : true ,sameSite:"none" , secure : true});
                       res.cookie("M_1",c2,{httpOnly : true ,sameSite:"none" , secure : true});
                 
                    res.status(200).json({msg : true});
                                         
                   }else{
                    res.status(200).json({msg :false});
                   }
               }
    
    
                
            });
            
            }else{
                res.status(200).send("invalid password and username");
            }
          
        }
        
      });
    }catch(e){
        res.status(400).json({msg: e.massage});
    }
});


route.get("/logout",memberjwtauth, function(req, res){

    try{
        res.cookie("M_0","0",{httpOnly : true ,sameSite:"none" , secure : true});
        res.cookie("M_1","0",{httpOnly: true ,sameSite:"none" , secure : true});
  res.clearCookie("M_0").clearCookie("M_1");

  res.status(200).json({msg:"OK"});
    }catch(e){
        res.status(400).json(e.massage);
    }

});


route.get("/isAuth",(req,res)=>{
    try{
        const {M_0 , M_1} = req.cookies;
    
        const token = M_0+"."+M_1;
    
        
    
        if(!token){
            return res.status(401).json({msg : "false"});
        }
    
        const verified = jwt.verify(token,process.env.JWT_SECRET);
    
        if(!verified){
            return res.status(200).json({msg : false});
        }else{
            req.memberid = verified.id;
          return res.status(200).json({msg: true});
        }
        
    
        }catch(e){
     return res.status(200).json({msg : false});
        }

    



});

route.get("/",memberjwtauth,(req ,res)=>{

    try{
        userdet.find().populate('userInfo').exec((err,doc)=>{
            

            if(!err){

                res.status(200).json({msg:true,
                                        data : doc});

            }



        });
    }catch(e){

        res.status(200).json({msg:false});


    }


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