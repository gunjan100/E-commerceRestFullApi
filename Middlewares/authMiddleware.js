const jwt = require("jsonwebtoken")
const userModel = require("../Models/userModel")

const isUser = async (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized user: No Token" });
        }
        token = token.split(" ")[1];
        const isVarifiedToken = jwt.verify(token, process.env.secretKey);
        
        const user = await userModel.findById(isVarifiedToken.id).select("-password");
        console.log("User found:", user);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        req.user = user;
        req.token = token;
        next();
    } catch (error) {
        console.error("Error in isUser middleware:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};



const isAdmin = async(req, res, next)=>{
    if(!req.user){
        return res.status(401).json({success:false, message:"Unauthorized user: No user information available"})
    }
   
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