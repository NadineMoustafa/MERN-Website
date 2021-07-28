const mongoose = require('mongoose')

const Schema = mongoose.Schema
var ObjectId = mongoose.Schema.Types.ObjectId;
//const Form = require('../Models/Form').schema
//const x=require('mongoose-type-url');
//const x=require('./node_modules/mongoose-type-url');


const ExternalEntitySchema= new Schema({
   Name:{ type: String, required: true},
  // enum: ['GAFI', 'Notary Public', 'Commercial Register'] 
  Equation:{type: String,required: true},
  //  Api: {type:  mongoose.SchemaTypes.Url, required: true}
  Api: {type: String, required: true},
  Email:{type: String, required:true}
  
})

module.exports = ExternalEntity = mongoose.model('externalentities', ExternalEntitySchema)


