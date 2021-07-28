const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Dependencies = new Schema({}, { strict: false });

module.exports = dependencies = mongoose.model("dependencies", Dependencies);