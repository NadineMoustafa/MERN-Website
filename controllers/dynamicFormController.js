const mongoose = require("mongoose");
const DynamicForm = require("../models/DynamicForm");
const validator = require("../validations/dynamicFormValidations");

exports.search = async (att, value) => {
  if (!att) {
    return await DynamicForm.find()
      .then(res => {
        return res;
      })
      .catch(err => {
        return { error: err };
      });
  }
  if (att === "id") {
    return await DynamicForm.findById(value)
      .then(res => {
        return res;
      })
      .catch(err => {
        return { error: err };
      });
  } 
  if(att ==='companyName')
    {
    return await DynamicForm.find({companyName:value})
    .then(res => {
      return res;
    })
    .catch(err => {
      return { error: err };
    });
    }
  else {
    return await DynamicForm.find({ [att]: value })
      .then(res => {
        return res;
      })
      .catch(err => {
        return { error: err };
      });
  }
};

exports.create = async (body, status, investorId, lawyerId) => {
  const isValidated = await validator.createValidation(body);
  //console.log(isValidated)
  if (isValidated.error) return { error: isValidated.error };
  body.lawyerComments = [];
  body.reviewerComments = [];
  body.status = status;
  body.fees = 0;
  body.investorId = investorId;
  body.lawyerId = lawyerId;
  body.reviewerId = null;
  body.creationDate = new Date();
  //console.log(body);
  return await DynamicForm.create(body)
    .then(res => {
      return res;
    })
    .catch(err => {
      return { error: err };
    });
};

// exports.update = async (att, value, body) => {
//   //delete body.formType ;
//   var temp = new obj.constructor();
//   for (var key in body) temp[key] = clone(body[key]);
//   delete body.lawyerComments;
//   delete body.reviewerComments;
//   delete body.status;
//   delete body.fees;
//   delete body.investorId;
//   delete body.lawyerId;
//   delete body.reviewerId;
//   delete body.creationDate;
//   const isValidated = await validator
//     .updateValidation(body)
//     .then(res => {
//       return res;
//     })
//     .catch(err => {
//       return { error: err };
//     });

//   if (isValidated.error) return { error: isValidated.error };
//   if (!att) {
//     return {
//       error: "Can't update record , Please provide an attribute to update with"
//     };
//   }
//   if (att === "_id") {
//     var dynamicForm = await DynamicForm.findByIdAndUpdate(value, temp)
//       .then(res => {
//         return res;
//       })
//       .catch(err => {
//         return { error: err };
//       });
//     // console.log(dynamicForm)
//     if (dynamicForm.error) return dynamicForm;
//     return await DynamicForm.findById(value)
//       .then(res => {
//         return res;
//       })
//       .catch(err => {
//         return { error: err };
//       });
//   }
// };

exports.update = async (att, value, body) => {
  //delete body.formType ;
  const isValidated = await validator
    .updateValidation(body)
    .then(res => {
      return res;
    })
    .catch(err => {
      return { error: err };
    });

  if (isValidated.error) return { error: isValidated.error };
  if (!att) {
    return {
      error: "Can't update record , Please provide an attribute to update with"
    };
  }
  if (att === "_id") {
    //console.log(body)
    var dynamicForm = await DynamicForm.findByIdAndUpdate(value, body)
    .then(res=>{return res})
    .catch(error=>{
        return {error:error}
    })
   // console.log(dynamicForm)
    if (dynamicForm.error) return dynamicForm;
    return await DynamicForm.findById(value)
      .then(res => {
        return res;
      })
      .catch(err => {
        return { error: err };
      });
  }
};

exports.remove = async (att, value) => {
  if (!att) {
    return {
      error: "Can't be deleted , Please provide an attribute to delete with"
    };
  }
  if (att === "_id") {
    return await DynamicForm.findByIdAndDelete(value)
      .then(res => {
        return res;
      })
      .catch(err => {
        return { error: err };
      });
  }
  return await DynamicForm.deleteMany({ [att]: value })
    .then(res => {
      return res;
    })
    .catch(err => {
      return { error: err };
    });
};
