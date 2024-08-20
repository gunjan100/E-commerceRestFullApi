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


module.exports ={
    userRegistrationService
}