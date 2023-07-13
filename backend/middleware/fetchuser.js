var jwt = require("jsonwebtoken");
const JWT_SECRET = "PANAKJ";
const fetchuser=(req,res,next)=>{
    const token=req.header("auth_token");
    if(!token){
        return res.status(401).json({error:"Correct Authentication not found"});
    }
    let data=jwt.verify(token,JWT_SECRET);
    
    req.userdetail=data.user;
    next();
}
module.exports=fetchuser;