const joi = require('joi');

const categoryValidator = (data) => {
    const categorySchema = joi.object({
        name: joi.string().trim().required(),
        description: joi.string().trim().optional(),  // Changed to optional
    });

    return categorySchema.validate(data);
};

module.exports = {
    categoryValidator
};
