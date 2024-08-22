const Joi = require('joi')

const userRegistrationValidator = (data)=>{

    const userSchema = Joi.object({
        name: Joi.string().trim().required(),
        email: Joi.string().email().trim().required(),
        mobile: Joi.string().min(10).required(),
        password: Joi.string().min(6).required(), // Adjust the minimum length as needed
        address: Joi.object({
            street: Joi.string().trim().required(),
            city: Joi.string().trim().required(),
            country: Joi.string().trim().required(),
        }).required()
    });
  return userSchema.validate(data)
}

const userLogInValidator = (data)=>{
    const userLogin = Joi.object({
        email: Joi.string().email().trim().required(),
        password: Joi.string().min(6).required()
    })
 return userLogin.validate(data)
}

module.exports = {
    userRegistrationValidator,
    userLogInValidator
}