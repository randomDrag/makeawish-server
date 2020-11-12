const jwt = require('jsonwebtoken');

function adminjwtauth( req , res, next){
    try{
    const {A_0 , A_1} = req.cookies;

    const token = A_0+"."+A_1;

    

    if(!token){
        return res.status(401).json({msg : "NO AUTH TOKEN"});
    }

    const verified = jwt.verify(token,process.env.JWT_SECRET);

    if(!verified){
        return res.status(401).json({msg : "ERROR AUTH"});
    }else{
        req.Admin = verified.id;
        next();
    }
    

    }catch(e){
 return res.status(200).json({msg : false,
                            err : e.message});
    }

}

module.exports = adminjwtauth