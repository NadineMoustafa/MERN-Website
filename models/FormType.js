const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FormType = new Schema({},{ strict: false });

module.exports = formType = mongoose.model('formtypes', FormType);