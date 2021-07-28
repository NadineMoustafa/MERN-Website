const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Nationality = new Schema({
    
name: {type:String,required:true}
});


module.exports = nationality = mongoose.model('nationalities', Nationality)