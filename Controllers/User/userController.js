const asyncHandler = require('express-async-handler');
const { userRegistrationService, userLogInServices, logoutServices } = require("../../Services/User/userServices")
const COOKIE_OPTIONS = require('../../Constant/apiConstant');
const { userRegistrationValidator, userLogInValidator } = require('../../Validators/userValidation');

const registerUser =asyncHandler(async(req, res)=>{
    const data = req.body
    const {error} = userRegistrationValidator(data)
    if(error){
      return  res.status(400).json({mes:error.details[0].message})
    }
    const {userData, accessToken} = await userRegistrationService(data)

    res.cookie("token", accessToken, COOKIE_OPTIONS);
    res.status(201).json({success:true, message:"User Registered Succesfully", data:userData, accessToken})
    
  }) 

  const userLogin = asyncHandler(async(req, res)=>{
    const data = req.body
    const {error} = userLogInValidator(data)
    if(error){
        return  res.status(401).json({mesg:error.details[0].message})
    }
    const { user, accessToken } = await userLogInServices(data);
   res.cookie("token", accessToken, COOKIE_OPTIONS)
    res.status(200).json({success:true, message:"User Login Successfully ...", accessToken})
  })



  const logOutUser =asyncHandler(async(req, res)=>{
    res.clearCookie("token")
    await logoutServices()
    res.status(201).json({success:true, message:"User Logout SuccesFully.."})

  })




module.exports ={
    registerUser,
    userLogin,
    logOutUser
}