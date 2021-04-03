const Joi = require('joi')

const empValidation = (data)=> {
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().max(255).min(6).required().email(),
        mobile: Joi.string().required(),
        dob:Joi.string().required()
    });
    return schema.validate(data)
}
module.exports.empValidation  = empValidation;
