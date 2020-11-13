const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userdb = require('../models/user.model');


const route = express.Router();


route.post('/login',async (req,res)=>{



    try{
        let {Email , Password} = req.body;
    
    
        await userdb.findOne({"Email" :Email},function(err,doc){
    
            if(err){
        
            
            }else{
               
                if(doc != null){
        
                    bcrypt.compare(Password, doc.Password, function(err, result) {
                        
                   if(err){
    
                   }else{
                       if(result){
                        
                         const token = jwt.sign({id : doc._id ,isfirsttime : doc.welcomePage},process.env.JWT_SECRET,{expiresIn : '1h'});
                        
                           const t = token.split(".");
                          
                           const c1 = t[0] + "." + t[1];
                           const c2 = t[2];
                    
                           res.cookie("S_0",c1,{httpOnly : true ,sameSite:"none" , secure : true});
                           res.cookie("S_1",c2,{httpOnly : true ,sameSite:"none" , secure : true});
                     
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
        res.cookie("S_0","0",{httpOnly : true ,sameSite:"none" , secure : true});
        res.cookie("S_1","0",{httpOnly: true ,sameSite:"none" , secure : true});
  res.clearCookie("S_0").clearCookie("S_1");

  res.status(200).json({msg:true});
    }catch(e){
        res.status(400).json(e.massage);
    }

});


route.get("/isAuth",(req,res)=>{
    try{
        const {S_0 , S_1} = req.cookies;
    
        const token = S_0+"."+S_1;
    
        
    
        if(!token){
            return res.status(401).json({msg : "false"});
        }
    
        const verified = jwt.verify(token,process.env.JWT_SECRET);
    
        if(!verified){
            return res.status(200).json({msg : false});
        }else{
          
          return res.status(200).json({msg: true ,
                                        isfirsttime : verified.isfirsttime});
        }
        
    
        }catch(e){
     return res.status(200).json({msg : false});
        }

    



});






module.exports = route;
