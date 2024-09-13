const userModel = require("../../Models/userModel")
const { ApiError } = require("../../Utils/apiErrors")
const { genrateaccessToken } = require("../../Utils/generateToken")

const userRegistrationService =async(data)=>{
const {name,mobile, email, address, password } = data
const user = await userModel.findOne({$or:[{email},{mobile}]})
if(user){
    throw new ApiError(401, "User Allready Exist")
}
const userData = await userModel.create({name, email, mobile, address, password})
const accessToken = await genrateaccessToken(userData._id)
console.log(accessToken);
return {userData, accessToken}

}

const userLogInServices = async(data)=>{
    const {email, password} = data
    
    const user = await userModel.findOne({email})
    if (!user) {
        throw new ApiError(401, "User not found");
    }

    const isMatch = await user.isMatch(password);
    if (!isMatch) {
        throw new ApiError(401, "Invalid credentials");
    }

    const accessToken = await genrateaccessToken(user._id)
    return { user, accessToken };


}

const logoutServices=async()=>{
    return { message: 'Logout successful' };    

}


module.exports ={
    userRegistrationService,
    userLogInServices ,
    logoutServices
}