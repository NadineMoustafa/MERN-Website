const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const User = require('../models/User')


module.exports = {
    createValidationSSC: request => {
        const SSCFormSchema = {
            userId:Joi.objectId().required(),
            lawyerId:Joi.objectId(),
            fees:Joi.number(),
            companyName: Joi.string().required().max(50).regex(/^[\u0621-\u064A]/),
            companyGovernorate: Joi.string().required().min(3).max(20),
            companyAddress: Joi.string().required().min(5).max(50),
            companyCity: Joi.string().required().min(3).max(20),
            companyTelephone: Joi.string().min(8).max(15),
            companyFax: Joi.string().min(5).max(20),
            companyNameInEnglish: Joi.string().max(50),
            currency: Joi.string().required().min(2).max(10),
            equityCapital: Joi.number().required().min(50000),
            type: Joi.string().required(),
            SSCManagers: Joi.array().required(),
            status: Joi.string().valid('Unassigned','Rejected','In progress Lawyer','Lawyer accepted','In progress Reviewer','Approved'),
            creationDate: Joi.date().required(),
            lawyerComments: Joi.array().items(Joi.string()),
            //lawyerApprove: Joi.boolean(),
            reviewerComments: Joi.array().items(Joi.string()),
            //reviewerApprove: Joi.boolean(),
            SSCManagers: Joi.array().required()}
     return Joi.validate(request, SSCFormSchema)
    },
    updateValidationSSC: request => {
        const updateSSCFormSchema = {
            companyName: Joi.string().max(50).regex(/^[\u0621-\u064A]/),
            lawyerId:Joi.objectId(),
            fees:Joi.number(),
            companyGovernorate: Joi.string().min(3).max(20),
            companyAddress: Joi.string().min(5).max(50),
            companyCity: Joi.string().min(3).max(20),
            companyTelephone: Joi.string().min(8).max(15),
            companyFax: Joi.string().min(5).max(20),
            companyNameInEnglish: Joi.string().max(50),
            currency: Joi.string().min(2).max(10),
            equityCapital: Joi.number().min(50000),
            SSCManagers: Joi.array(),
            status: Joi.string().valid('Unassigned','Rejected','In progress Lawyer','Lawyer accepted','In progress Reviewer','Approved'),
            creationDate: Joi.date(),
            lawyerComments: Joi.array().items(Joi.string()), //must insert an object , syntax -> {} , it doesn't accept null
            reviewerComments: Joi.array().items(Joi.string()),
            userId: Joi.objectId()
        }

        return Joi.validate(request, updateSSCFormSchema)
    }, 
   
    createValidationSPC: request => {
        const SPCSchema ={
            userId:Joi.objectId().required(),
            lawyerId:Joi.objectId(),
            fees:Joi.number(),
            companyName: Joi.string().required().max(50).regex(/^[\u0621-\u064A]/),
            companyGovernorate: Joi.string().required().min(3).max(20),
            companyAddress: Joi.string().required().min(5).max(50),
            companyCity: Joi.string().required().min(3).max(20),
            companyTelephone: Joi.string().min(8).max(15),
            companyFax: Joi.string().min(5).max(20),
            companyNameInEnglish: Joi.string().max(50),
            currency: Joi.string().required().min(2).max(10),
            type: Joi.string().required(),
            status: Joi.string().valid('Unassigned','Rejected','In progress Lawyer','Lawyer accepted','In progress Reviewer','Approved'),
            creationDate: Joi.date().required(),
            lawyerComments: Joi.array().items(Joi.string()),
            reviewerComments: Joi.array().items(Joi.string()),
        };
            const SpecificUser= User.findById(SPCSchema.userId);
            if (SpecificUser.nationality!=='Egyptian')
            SPCSchema.equityCapital= Joi.number().required().min(100000);
            else
            SPCSchema.equityCapital= Joi.number().required();

     return Joi.validate(request, SPCSchema)
    },
     
    updateValidationSPC: request => {
        const updateSPCFormSchema = {
            userId: Joi.objectId(),
            lawyerId:Joi.objectId(),
            fees:Joi.number(),
            companyName: Joi.string().max(50).regex(/^[\u0621-\u064A]/),
            companyGovernorate: Joi.string().min(3).max(20),
            companyAddress: Joi.string().min(5).max(50),
            companyCity: Joi.string().min(3).max(20),
            companyTelephone: Joi.string().min(8).max(15),
            companyFax: Joi.string().min(5).max(20),
            companyNameInEnglish: Joi.string().max(50),
            currency: Joi.string().min(2).max(10),
            equityCapital: Joi.number(),
            status: Joi.string().valid('Unassigned','Rejected','In progress Lawyer','Lawyer accepted','In progress Reviewer','Approved'),
            creationDate: Joi.date(),
            lawyerComments: Joi.array().items(Joi.string()), //must insert an object , syntax -> {} , it doesn't accept null
            reviewerComments: Joi.array().items(Joi.string()),
        };
        const SpecificUser= User.findById(updateSPCFormSchema.userId)
        if (SpecificUser.nationality!=='Egyptian')
        updateSPCFormSchema.equityCapital= Joi.number().min(100000)
        else
        updateSPCFormSchema.equityCapital= Joi.number()
        return Joi.validate(request, updateSPCFormSchema)
    },
        
    
    createValidationSSCManagers: request => {
        const SSCManagerSchema={
        name: Joi.string().min(3).max(50).required(),
        type: Joi.string().required(),
        gender: Joi.string().min(4).max(6).required(),
        nationality: Joi.string().max(50).required(),
        identificationType: Joi.string().required().min(8).max(20),
        identificationNumber: Joi.string().min(8).max(50).required(),
        birthdate: Joi.date().required(),
        address: Joi.string().required().min(5).max(50),
        typeOfManagers: Joi.string().required()
        }
        return Joi.validate(request, SSCManagerSchema)
    },

    updateValidationSSCManagers: request => {
        const updateSSCManagerSchema = {
            name: Joi.string().min(3).max(50),
            type: Joi.string(),
            gender: Joi.string().min(4).max(6),
            nationality: Joi.string().max(50),
            identificationType: Joi.string().min(8).max(20),
            identificationNumber: Joi.string(),
            birthdate: Joi.date(),
            address: Joi.string().min(5).max(50),
            typeOfManagers: Joi.string()

        }
        return Joi.validate(request, updateSSCManagerSchema)

}
}