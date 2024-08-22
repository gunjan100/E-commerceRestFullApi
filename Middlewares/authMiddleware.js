const jwt = require("jsonwebtoken")
const userModel = require("../Models/userModel")

const isUser = async(req, res, next)=>{
    const token = req.headers.authorization
    if(!token){
        return res.status(401).json({message:"Unauthorized user No Token"})
    }
    token = token.split(" ")[1];
    const isVarifiedToken = jwt.verify(token, process.env.secretKey)
    const user = await userModel.findById(isVarifiedToken._id).select(
        "-password" ,"role"
    )
    
    req.user = user
    req.token = token
    next()
}


const isAdmin = async(req, res, next)=>{
   
    if(req.user.role!=="admin")
    {
        return res.status(403).json({ message: "Forbidden: Admins only" });
    }
   
    next()
    

}

module.exports = {
    isUser,
    isAdmin
}