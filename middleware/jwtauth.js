const jwt = require('jsonwebtoken');

function Jwtauth( req , res, next){
    try{
    const {S_0 , S_1} = req.cookies;

    const token = S_0+"."+S_1;

    

    if(!token){
        return res.status(401).json({msg : "NO AUTH TOKEN"});
    }

    const verified = jwt.verify(token,process.env.JWT_SECRET);

    if(!verified){
        return res.status(401).json({msg : "ERROR AUTH"});
    }else{
        req.user = verified.id;
        next();
    }
    

    }catch(e){
 return res.status(500).json({msg : e.message});
    }

}

module.exports = Jwtauth