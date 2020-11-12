const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
let route = express.Router();

let user = require("../models/admin.user");
const adminjwtauth = require('../middleware/adminjwt');



const saltRounds = 10;



route.post("/adminregister", async (req, res) => {

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
                
                       res.cookie("A_0",c1,{httpOnly : true });
                       res.cookie("A_1",c2,{httpOnly: true });
                 
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


route.get("/logout", function(req, res){

    try{
        res.cookie("A_0","0",{httpOnly : true ,sameSite:"none" , secure : true});
        res.cookie("A_1","0",{httpOnly: true ,sameSite:"none" , secure : true});
  res.clearCookie("A_0").clearCookie("A_1");

  res.status(200).json({msg:"OK"});
    }catch(e){
        res.status(400).json(e.massage);
    }

});


route.get("/isAuth",(req,res)=>{
    try{
        const {A_0 , A_1} = req.cookies;
    
        const token = A_0+"."+A_1;
    
        
    
        if(!token){
            return res.status(401).json({msg : "false"});
        }
    
        const verified = jwt.verify(token,process.env.JWT_SECRET);
    
        if(!verified){
            return res.status(200).json({msg : false});
        }else{
            req.Admin = verified.id;
          return res.status(200).json({msg: true});
        }
        
    
        }catch(e){
     return res.status(200).json({msg : false});
        }

    



});

module.exports = route;