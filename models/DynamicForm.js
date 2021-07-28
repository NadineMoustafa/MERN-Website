const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

const DynamicForm = new Schema({
    status:{type: String,enum:['Unassigned','In progress Lawyer','Laywer rejected','Lawyer accepted','In progress Reviewer','Reviewer accepted','Reviewer rejected','Approved','Rejected']},
    creationDate:{type: Date,required: true},
    lawyerComments:{type:[String]},
    reviewerComments:{type:[String]},
    reviewerId:{type:ObjectId},
    investorId:{type:ObjectId},
    lawyerId:{type:ObjectId},
    fees:{type:Number}
}, { strict: false });

module.exports = dynamicForm = mongoose.model("dynamicforms", DynamicForm);
