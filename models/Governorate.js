const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Governorate = new Schema({
    name: {type:String,required:true},
    cities:{type:Array}
    });



module.exports = governorate = mongoose.model('governorates', Governorate)