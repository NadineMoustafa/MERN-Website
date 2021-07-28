const Joi = require('joi')


module.exports = {
    createValidation: request => {
        const createSchema = {
          //  Name: Joi.string().required().valid('GAFI', 'Notary Public', 'Commercial Register'),
            Name: Joi.string().required(),
            Equation: Joi.string().required(),
            Api: Joi.string().required(),
            Email:Joi.string().email().required()
           // EquityCapital:Form.equityCapital.required()
           
        }

        return Joi.validate(request, createSchema)
    },
    updateValidation: request => {
        const updateSchema=   {
        Name: Joi.string(),
        Equation: Joi.string(),
       // Api: Joi.string().uri()
        Api: Joi.string(),
        //EquityCapital:Form.equityCapital
       Email: Joi.string().email()
    }
    return Joi.validate(request, updateSchema)


}
}