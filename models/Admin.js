const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const Admin = new Schema({
  userType:{type: String,enum:['Admin']},
  name: { type: String, required: true},
  gender: { type: String, required: true},
  nationality: { type: String, required: true},
  identificationType: { type: String, required: true},
  identificationNumber: { type: String, required: true, unique: true},
  password: { type: String, required: true },
  email: {type: String,required:true},
  birthdate:{ type: Date, required: true},
  address: { type: String, required: true},
  telephone:{ type:String},
  fax:{ type:String}

});

module.exports = admin = mongoose.model('admins', Admin);
