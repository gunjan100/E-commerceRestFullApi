const asyncHandler = require('express-async-handler');
const { userRegistrationService } = require("../../Services/User/userServices")
const COOKIE_OPTIONS = require('../../Constant/apiConstant')

const registerUser =asyncHandler(async(req, res)=>{
    const data = req.body
    
    const {userData, accessToken} = await userRegistrationService(data)

    res.cookie("token", accessToken, COOKIE_OPTIONS);
    res.status(201).json({success:true, message:"User Registered Succesfully", data:userData, accessToken})
    
 
 }) 

module.exports ={
    registerUser
}