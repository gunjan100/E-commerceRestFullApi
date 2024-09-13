const Joi = require('joi');

const categoryValidator = (data) => {
    const categorySchema = Joi.object({
        name: Joi.string().trim().required(),
        description: JSONoi.string().trim().optional(),  // Changed to optional
    });

    return categorySchema.validate(data);
};


const productValidator = (data)=>{
    const productSchema = Joi.object({
        name: Joi.string()
        .min(3)                   // Minimum length of 3 characters
        .max(100)                 // Maximum length of 100 characters
        .required(),             // Field is required
    price: Joi.number()           // Should be a number
        .positive()              // Should be positive
        .required(),            // Field is required
    description: Joi.string()
        .min(10)                  // Minimum length of 10 characters
        .max(500)                 // Maximum length of 500 characters
        .required(),             // Field is required
    image: Joi.string()           // Allow the image field as a string (we are not validating it rigorously)
        .optional(),                // Field is required
    category: Joi.string()
        .required(),     
    brand: Joi.string()
        .required()   
    })

    return productSchema.validate(data)
}

module.exports = {
    categoryValidator,
    productValidator
};
