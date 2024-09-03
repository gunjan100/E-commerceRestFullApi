const Joi = require('joi')

const objectIdPattern = /^[a-fA-F0-9]{24}$/;

const idValidator =(id)=>{
    const idSchema = Joi.string().pattern(objectIdPattern).required()
   return idSchema.validate(id)

}

module.exports= {
    idValidator
}