const Joi = require('joi')

module.exports = {
    createValidation: request => {
        const createSchema = {
            userType: Joi.string().valid('Admin'), 
            name: Joi.string().required().max(50),
            gender: Joi.string().required().max(6),
            nationality: Joi.string().required().max(50),
            identificationType: Joi.string().required().max(50),
            identificationNumber: Joi.string().min(8).max(14).required(),
            password: Joi.string().min(8).required().max(50),
            birthdate: Joi.date().required(),
            address: Joi.string().required().max(50),
            telephone: Joi.string().min(8).max(20),
            fax: Joi.string().max(20),
            email: Joi.string().required().email().max(20)
        }

        return Joi.validate(request, createSchema)
    },

    updateValidation: request => {
        const updateSchema = {
            
            name: Joi.string().max(50),
            gender: Joi.string().max(6),
            nationality: Joi.string().max(50),
            identificationType: Joi.string().max(50),
            identificationNumber: Joi.string().max(14),
            password: Joi.string().min(8).max(50),
            birthdate: Joi.date(),
            address: Joi.string().max(50),
            telephone: Joi.string().min(8).max(20),
            fax: Joi.string().max(20),
            email: Joi.string().email().max(20)
        }

        return Joi.validate(request, updateSchema)
    }, 
}