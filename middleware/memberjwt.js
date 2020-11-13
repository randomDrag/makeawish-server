const jwt = require('jsonwebtoken');

function memberjwtauth( req , res, next){
    try{
    const {M_0 , M_1} = req.cookies;

    const token = M_0+"."+M_1;

    

    if(!token){
        return res.status(401).json({msg : "NO AUTH TOKEN"});
    }

    const verified = jwt.verify(token,process.env.JWT_SECRET);

    if(!verified){
        return res.status(401).json({msg : "ERROR AUTH"});
    }else{
        req.member = verified.id;
        next();
    }
    

    }catch(e){
 return res.status(200).json({msg : false,
                            err : e.message});
    }

}

module.exports = memberjwtauth