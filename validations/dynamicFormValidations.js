var Joi = require("joi");
const FormType = require("../models/FormType");
const DynamicForm = require("mongoose").model('dynamicforms')
//const DynamicForm = require("../models/DynamicForm");
const Dependencies = require("../models/Dependencies");
Joi.objectId = require("joi-objectid")(Joi);

module.exports = {
  createValidation: async request => {
    let createSchema = { formType: Joi.string().required() };
    let formType = request.formType;
    let validations = await FormType.find({ formType: formType })
      .then(res => {
        return res;
      })
      .catch(err => {
        return { error: err };
      });
    if (validations.error) return validations;
    if (validations === []) return { error: "Form type doesnt exist" };
    validations = validations[0];
    // //console.log(validations)
    validations = validations.toJSON();
    let dependencies = await Dependencies.find({ formType: formType })
      .then(res => {
        return res;
      })
      .catch(err => {
        return { error: err };
      });
      console.log(dependencies)
    if (dependencies.length===0) dependencies ={};
    else {
      dependencies = dependencies[0].toJSON();
    }
    for (var prop in validations) {
      // //console.log(prop)
      if (prop !== "formType" && prop !== "_id" && prop!=="__v") {
        //console.log(prop)
        let constraints = validations["" + prop].split(",");
        let depends = undefined;
        if (dependencies["" + prop]) {
          depends = dependencies["" + prop].split(",");
        }
        //  //console.log(constraints)
        if (constraints[4] === "unique") {
          let queryparam = {};
          if (request[prop]) {
            queryparam[prop] = request[prop];
            let testUnique = await DynamicForm.find(queryparam)
              .then(res => {
                return res;
              })
              .catch(err => {
                return { error: err };
              });
            if (testUnique.error) return testUnique;
            ////console.log(testUnique)
            if (testUnique[0])
              return {
                error: "Duplicate Value: " + prop + ":" + request[prop]
              };
          }
        }
        switch (constraints[0]) {
          case "string":
            if (constraints[1] === "required" && prop === "email") {
              createSchema[prop] = Joi.string()
                .required()
                .email();
              break;
            }
            if (constraints[1] !== "required" && prop === "email") {
              createSchema[prop] = Joi.string().email();
              break;
            }
            if (
              constraints[1] === "required" &&
              constraints[2] !== "" &&
              constraints[3] !== ""
            )
              createSchema[prop] = Joi.string()
                .required()
                .min(parseInt(constraints[2], 10))
                .max(parseInt(constraints[3], 10));
            if (
              constraints[1] === "required" &&
              constraints[2] === "" &&
              constraints[3] !== ""
            )
              createSchema[prop] = Joi.string()
                .required()
                .max(parseInt(constraints[3], 10));
            if (
              constraints[1] === "required" &&
              constraints[2] !== "" &&
              constraints[3] === ""
            )
              createSchema[prop] = Joi.string()
                .required()
                .min(parseInt(constraints[2], 10));
            if (
              constraints[1] === "required" &&
              constraints[2] === "" &&
              constraints[3] === ""
            )
              createSchema[prop] = Joi.string().required();
            if (
              constraints[1] !== "required" &&
              constraints[2] !== "" &&
              constraints[3] !== ""
            )
              createSchema[prop] = Joi.string()
                .min(parseInt(constraints[2], 10))
                .max(parseInt(constraints[3], 10));
            if (
              constraints[1] !== "required" &&
              constraints[2] === "" &&
              constraints[3] !== ""
            )
              createSchema[prop] = Joi.string().max(
                parseInt(constraints[3], 10)
              );
            if (
              constraints[1] !== "required" &&
              constraints[2] !== "" &&
              constraints[3] === ""
            )
              createSchema[prop] = Joi.string().min(
                parseInt(constraints[2], 10)
              );
            if (
              constraints[1] !== "required" &&
              constraints[2] === "" &&
              constraints[3] === ""
            )
              createSchema[prop] = Joi.string();

            if (depends) {
              let dependConstraints = validations[depends[0]]
              let dependConstraintArray = dependConstraints.split(",")
              if(dependConstraintArray[0]==='number') depends[1]=parseInt(depends[1])
              if (depends[5] !== "")
                createSchema[prop] = Joi.when(depends[0], {
                  is: depends[1],
                  then: Joi.string().length(parseInt(depends[5])),
                  otherwise: createSchema[prop]
                });
              if (depends[5] === "" && depends[4] !== "")
                createSchema[prop] = Joi.when(depends[0], {
                  is: depends[1],
                  then: Joi.string().valid(depends[4]),
                  otherwise: createSchema[prop]
                });
              if (
                depends[5] === "" &&
                depends[4] === "" &&
                depends[3] !== "" &&
                depends[2] !== ""
              )
                createSchema[prop] = Joi.when(depends[0], {
                  is: depends[1],
                  then: Joi.string()
                    .min(parseInt(depends[2]))
                    .max(parseInt(depends[3])),
                  otherwise: createSchema[prop]
                });
              if (
                depends[5] === "" &&
                depends[4] === "" &&
                depends[3] === "" &&
                depends[2] !== ""
              )
                createSchema[prop] = Joi.when(depends[0], {
                  is: depends[1],
                  then: Joi.string().min(parseInt(depends[2])),
                  otherwise: createSchema[prop]
                });
              if (
                depends[5] === "" &&
                depends[4] === "" &&
                depends[3] !== "" &&
                depends[2] === ""
              )
                createSchema[prop] = Joi.when(depends[0], {
                  is: depends[1],
                  then: Joi.string().max(parseInt(depends[3])),
                  otherwise: createSchema[prop]
                });
            }

            break;
          case "number":
            if (
              constraints[1] === "required" &&
              constraints[2] !== "" &&
              constraints[3] !== ""
            )
              createSchema[prop] = Joi.number()
                .required()
                .min(parseInt(constraints[2], 10))
                .max(parseInt(constraints[3], 10));
            if (
              constraints[1] === "required" &&
              constraints[2] === "" &&
              constraints[3] !== ""
            )
              createSchema[prop] = Joi.number()
                .required()
                .max(parseInt(constraints[3], 10));
            if (
              constraints[1] === "required" &&
              constraints[2] !== "" &&
              constraints[3] === ""
            )
              createSchema[prop] = Joi.number()
                .required()
                .min(parseInt(constraints[2], 10));
            if (
              constraints[1] === "required" &&
              constraints[2] === "" &&
              constraints[3] === ""
            )
              createSchema[prop] = Joi.number().required();
            if (
              constraints[1] !== "required" &&
              constraints[2] !== "" &&
              constraints[3] !== ""
            )
              createSchema[prop] = Joi.number()
                .min(parseInt(constraints[2], 10))
                .max(parseInt(constraints[3], 10));
            if (
              constraints[1] !== "required" &&
              constraints[2] === "" &&
              constraints[3] !== ""
            )
              createSchema[prop] = Joi.number().max(
                parseInt(constraints[3], 10)
              );
            if (
              constraints[1] !== "required" &&
              constraints[2] !== "" &&
              constraints[3] === ""
            )
              createSchema[prop] = Joi.number()
                .required()
                .min(parseInt(constraints[2], 10));
            if (
              constraints[1] !== "required" &&
              constraints[2] === "" &&
              constraints[3] === ""
            )
              createSchema[prop] = Joi.number();

            if (depends) {
              let dependConstraints = validations[depends[0]]
              let dependConstraintArray = dependConstraints.split(",")
              if(dependConstraintArray[0]==='number') depends[1]=parseInt(depends[1])
              if (depends[5] !== "")
                createSchema[prop] = Joi.when(depends[0], {
                  is: depends[1],
                  then: Joi.number().length(parseInt(depends[5])),
                  otherwise: createSchema[prop]
                });
              if (depends[5] === "" && depends[4] !== "")
                createSchema[prop] = Joi.when(depends[0], {
                  is: depends[1],
                  then: Joi.number().equal(parseInt(depends[4])),
                  otherwise: createSchema[prop]
                });
              if (
                depends[5] === "" &&
                depends[4] === "" &&
                depends[3] !== "" &&
                depends[2] !== ""
              )
                createSchema[prop] = Joi.when(depends[0], {
                  is: depends[1],
                  then: Joi.number()
                    .min(parseInt(depends[2]))
                    .max(parseInt(depends[3])),
                  otherwise: createSchema[prop]
                });
              if (
                depends[5] === "" &&
                depends[4] === "" &&
                depends[3] === "" &&
                depends[2] !== ""
              )
                createSchema[prop] = Joi.when(depends[0], {
                  is: depends[1],
                  then: Joi.number().min(parseInt(depends[2])),
                  otherwise: createSchema[prop]
                });
              if (
                depends[5] === "" &&
                depends[4] === "" &&
                depends[3] !== "" &&
                depends[2] === ""
              )
                createSchema[prop] = Joi.when(depends[0], {
                  is: depends[1],
                  then: Joi.number().max(parseInt(depends[3])),
                  otherwise: createSchema[prop]
                });
            }
            break;
          case "date":
            if (constraints[1] === "required")
              createSchema[prop] = Joi.date().required();
            else createSchema[prop] = Joi.date();
            break;
          case "array":
            createSchema[prop] = Joi.array().items(
              Joi.object(),
              Joi.string(),
              Joi.number(),
              Joi.date()
            ).allow(null);
            // //console.log(prop)
            // //console.log(createSchema[prop])
            let childValidations = await FormType.find({
              formTypeArray: constraints[2]
            })
              .then(res => {
                return res;
              })
              .catch(err => {
                return { error: err };
              });
            let array = request[prop];
            if(!array) break;
             //console.log(array)
            childValidations = childValidations[0].toJSON();
            for (i = 0; i < array.length; i++) {
              let childCreateSchema = {formTypeArray:Joi.any()};
              if (childValidations.error) return childValidations;
              for (var childProp in childValidations) {
                if (
                  childValidations.hasOwnProperty(childProp) &&
                  childProp !== "formTypeArray" &&
                  childProp !== "_id"
                ) {
                  // //console.log(childProp)
                  // //console.log(childValidations[childProp])
                  let childConstraints = childValidations[childProp].split(",");
                  switch (childConstraints[0]) {
                    case "string":
                      if (
                        childConstraints[1] === "required" &&
                        childProp === "email"
                      ) {
                        childCreateSchema[childProp] = Joi.string()
                          .required()
                          .email();
                        break;
                      }
                      if (
                        childConstraints[1] !== "required" &&
                        childProp === "email"
                      ) {
                        childCreateSchema[childProp] = Joi.string().email();
                        break;
                      }
                      if (
                        childConstraints[1] === "required" &&
                        childConstraints[2] !== "" &&
                        childConstraints[3] !== ""
                      )
                        childCreateSchema[childProp] = Joi.string()
                          .required()
                          .min(parseInt(childConstraints[2], 10))
                          .max(parseInt(childConstraints[3], 10));
                      if (
                        childConstraints[1] === "required" &&
                        childConstraints[2] === "" &&
                        childConstraints[3] !== ""
                      )
                        childCreateSchema[childProp] = Joi.string()
                          .required()
                          .max(parseInt(childConstraints[3], 10));
                      if (
                        childConstraints[1] === "required" &&
                        childConstraints[2] !== "" &&
                        childConstraints[3] === ""
                      )
                        childCreateSchema[childProp] = Joi.string()
                          .required()
                          .min(parseInt(childConstraints[2], 10));
                      if (
                        childConstraints[1] === "required" &&
                        childConstraints[2] === "" &&
                        childConstraints[3] === ""
                      )
                        childCreateSchema[childProp] = Joi.string().required();
                      if (
                        childConstraints[1] !== "required" &&
                        childConstraints[2] !== "" &&
                        childConstraints[3] !== ""
                      )
                        childCreateSchema[childProp] = Joi.string()
                          .min(parseInt(childConstraints[2], 10))
                          .max(parseInt(childConstraints[3], 10));
                      if (
                        childConstraints[1] !== "required" &&
                        childConstraints[2] === "" &&
                        childConstraints[3] !== ""
                      )
                        childCreateSchema[childProp] = Joi.string().max(
                          parseInt(childConstraints[3], 10)
                        );
                      if (
                        childConstraints[1] !== "required" &&
                        childConstraints[2] !== "" &&
                        childConstraints[3] === ""
                      )
                        childCreateSchema[childProp] = Joi.string()
                          .required()
                          .min(parseInt(childConstraints[2], 10));
                      if (
                        childConstraints[1] !== "required" &&
                        childConstraints[2] === "" &&
                        childConstraints[3] === ""
                      )
                        childCreateSchema[childProp] = Joi.string();
                      break;
                    case "number":
                      if (
                        childConstraints[1] === "required" &&
                        childConstraints[2] !== "" &&
                        childConstraints[3] !== ""
                      )
                        childCreateSchema[childProp] = Joi.number()
                          .required()
                          .min(parseInt(childConstraints[2], 10))
                          .max(parseInt(childConstraints[3], 10));
                      if (
                        childConstraints[1] === "required" &&
                        childConstraints[2] === "" &&
                        childConstraints[3] !== ""
                      )
                        childCreateSchema[childProp] = Joi.number()
                          .required()
                          .max(parseInt(childConstraints[3], 10));
                      if (
                        childConstraints[1] === "required" &&
                        childConstraints[2] !== "" &&
                        childConstraints[3] === ""
                      )
                        childCreateSchema[childProp] = Joi.number()
                          .required()
                          .min(parseInt(childConstraints[2], 10));
                      if (
                        childConstraints[1] === "required" &&
                        childConstraints[2] === "" &&
                        childConstraints[3] === ""
                      )
                        childCreateSchema[childProp] = Joi.number().required();
                      if (
                        childConstraints[1] !== "required" &&
                        childConstraints[2] !== "" &&
                        childConstraints[3] !== ""
                      )
                        childCreateSchema[childProp] = Joi.number()
                          .min(parseInt(childConstraints[2], 10))
                          .max(parseInt(childConstraints[3], 10));
                      if (
                        childConstraints[1] !== "required" &&
                        childConstraints[2] === "" &&
                        childConstraints[3] !== ""
                      )
                        childCreateSchema[childProp] = Joi.number().max(
                          parseInt(childConstraints[3], 10)
                        );
                      if (
                        childConstraints[1] !== "required" &&
                        childConstraints[2] !== "" &&
                        childConstraints[3] === ""
                      )
                        childCreateSchema[childProp] = Joi.number()
                          .required()
                          .min(parseInt(childConstraints[2], 10));
                      if (
                        childConstraints[1] !== "required" &&
                        childConstraints[2] === "" &&
                        childConstraints[3] === ""
                      )
                        childCreateSchema[childProp] = Joi.number();
                      break;
                    case "date":
                      // //console.log(childConstraints[1]);
                      if (childConstraints[1] === "required")
                        childCreateSchema[childProp] = Joi.date().required();
                      else childCreateSchema[childProp] = Joi.date();
                      break;
                    case "object":
                      if (childConstraints[1] === "required")
                        childCreateSchema[childProp] = Joi.object().required();
                      else childCreateSchema[childProp] = Joi.object();
                      break;
                  }
                }
              }
              let v = await Joi.validate(array[i], childCreateSchema)
                .then(res => {
                  return res;
                })
                .catch(err => {
                  return { error: err };
                });
              if (v.error) return v;
            }
            break;
          case "object":
            if (constraints[1] === "required")
              createSchema[prop] = Joi.object().required();
            else createSchema[prop] = Joi.object();
            break;
          case "objectId":
            createSchema[prop] = Joi.object();
            break;
        }
      }
    }
    return await Joi.validate(request, createSchema)
      .then(res => {
        return res;
      })
      .catch(err => {
        return { error: err };
      });
  },

  updateValidation: async request => {
    let updateSchema = {
      formType: Joi.string().required(),
      _id: Joi.object(),
      lawyerComments: Joi.array(),
      reviewerComments: Joi.array(),
      status:Joi.string(),
      fees:Joi.number(),
      investorId:Joi.any().allow(null),
      reviewerId:Joi.any().allow(null),
      lawyerId:Joi.any().allow(null),
      creationDate:Joi.date(),
      __v:Joi.number()
    };
    //console.log("hi")
    var formType = request.formType;
    
    //console.log("hi")
    let validations = await FormType.find({ formType: formType })
      .then(res => {
        return res;
      })
      .catch(err => {
        return { error: err };
      });
    if (validations.error) return validations;
    // //console.log(validations)
    if (validations === [])
      return { error: "This is not a valid type of Form" };
    validations = validations[0];
    // //console.log(validations)
    validations = validations.toJSON();
    let dependencies = await Dependencies.find({ formType: formType })
      .then(res => {
        return res;
      })
      .catch(err => {
        return { error: err };
      });
     // //console.log(dependencies)
    if (!dependencies || dependencies.length===0) dependencies = {};
    else {
      dependencies = dependencies[0].toJSON();
    }
    for (var prop in validations) {
      if (
        validations.hasOwnProperty(prop) &&
        prop !== "formType" &&
        prop !== "_id"
      ) {
        let constraints = validations[prop].split(",");
        let depends = undefined;
        if (dependencies["" + prop]) {
          depends = dependencies["" + prop].split(",");
        }
        // //console.log(depends)
        if (constraints[4] === "unique") {
          let queryparam = {};
          if (request[prop]) {
            queryparam[prop] = request[prop];
            let testUnique = await DynamicForm.find(queryparam)
              .then(res => {
                return res;
              })
              .catch(err => {
                return { error: err };
              });
            if (testUnique.error) return testUnique;
            ////console.log(testUnique)
            if (testUnique[1])
              return {
                error: "Duplicate Value: " + prop + ":" + request[prop]
              };
          }
        }
        switch (constraints[0]) {
          case "string":
            if (prop === "email") {
              updateSchema[prop] = Joi.string().email();
              break;
            }
            if (constraints[2] !== "" && constraints[3] !== "")
              updateSchema[prop] = Joi.string()
                .min(parseInt(constraints[2], 10))
                .max(parseInt(constraints[3], 10));
            if (constraints[2] === "" && constraints[3] !== "")
              updateSchema[prop] = Joi.string().max(
                parseInt(constraints[3], 10)
              );
            if (constraints[2] !== "" && constraints[3] === "")
              updateSchema[prop] = Joi.string()
                .required()
                .min(parseInt(constraints[2], 10));
            if (constraints[2] === "" && constraints[3] === "")
              updateSchema[prop] = Joi.string();

            if (depends) {
              let dependConstraints = validations[depends[0]]
              let dependConstraintArray = dependConstraints.split(",")
              if(dependConstraintArray[0]==='number') depends[1]=parseInt(depends[1])
              if (depends[5] !== "")
                updateSchema[prop] = Joi.when(depends[0], {
                  is: depends[1],
                  then: Joi.string().length(parseInt(depends[5])),
                  otherwise: updateSchema[prop]
                });
              if (depends[5] === "" && depends[4] !== "")
                updateSchema[prop] = Joi.when(depends[0], {
                  is: depends[1],
                  then: Joi.string().valid(depends[4]),
                  otherwise: updateSchema[prop]
                });
              if (
                depends[5] === "" &&
                depends[4] === "" &&
                depends[3] !== "" &&
                depends[2] !== ""
              )
                updateSchema[prop] = Joi.when(depends[0], {
                  is: depends[1],
                  then: Joi.string()
                    .min(parseInt(depends[2]))
                    .max(parseInt(depends[3])),
                  otherwise: updateSchema[prop]
                });
              if (
                depends[5] === "" &&
                depends[4] === "" &&
                depends[3] === "" &&
                depends[2] !== ""
              )
                updateSchema[prop] = Joi.when(depends[0], {
                  is: depends[1],
                  then: Joi.string().min(parseInt(depends[2])),
                  otherwise: updateSchema[prop]
                });
              if (
                depends[5] === "" &&
                depends[4] === "" &&
                depends[3] !== "" &&
                depends[2] === ""
              )
                updateSchema[prop] = Joi.when(depends[0], {
                  is: depends[1],
                  then: Joi.string().max(parseInt(depends[3])),
                  otherwise: updateSchema[prop]
                });
            }

            break;
          case "number":
            if (constraints[2] !== "" && constraints[3] !== "")
              updateSchema[prop] = Joi.number()
                .min(parseInt(constraints[2], 10))
                .max(parseInt(constraints[3], 10));
            if (constraints[2] === "" && constraints[3] !== "")
              updateSchema[prop] = Joi.number().max(
                parseInt(constraints[3], 10)
              );
            if (constraints[2] !== "" && constraints[3] === "")
              updateSchema[prop] = Joi.number().min(
                parseInt(constraints[2], 10)
              );
            if (constraints[2] === "" && constraints[3] === "")
              updateSchema[prop] = Joi.number();

            if (depends) {
              // //console.log(depends[4])
              // //console.log(depends[1])
              let dependConstraints = validations[depends[0]]
              let dependConstraintArray = dependConstraints.split(",")
              if(dependConstraintArray[0]==='number') depends[1]=parseInt(depends[1])
              if (depends[5] !== "")
                updateSchema[prop] = Joi.when(depends[0], {
                  is: depends[1],
                  then: Joi.number().length(parseInt(depends[5])),
                  otherwise: updateSchema[prop]
                });
              if (depends[5] === "" && depends[4] !== "")
                updateSchema[prop] = Joi.when(depends[0], {
                  is: depends[1],
                  then: Joi.number().equal(parseInt(depends[4])),
                  otherwise: updateSchema[prop]
                });
              if (
                depends[5] === "" &&
                depends[4] === "" &&
                depends[3] !== "" &&
                depends[2] !== ""
              )
                updateSchema[prop] = Joi.when(depends[0], {
                  is: depends[1],
                  then: Joi.number()
                    .min(parseInt(depends[2]))
                    .max(parseInt(depends[3])),
                  otherwise: updateSchema[prop]
                });
              if (
                depends[5] === "" &&
                depends[4] === "" &&
                depends[3] === "" &&
                depends[2] !== ""
              )
                updateSchema[prop] = Joi.when(depends[0], {
                  is: depends[1],
                  then: Joi.number().min(parseInt(depends[2])),
                  otherwise: updateSchema[prop]
                });
              if (
                depends[5] === "" &&
                depends[4] === "" &&
                depends[3] !== "" &&
                depends[2] === ""
              )
                updateSchema[prop] = Joi.when(depends[0], {
                  is: depends[1],
                  then: Joi.number().max(parseInt(depends[3])),
                  otherwise: updateSchema[prop]
                });
            }
            break;
          case "date":
            updateSchema[prop] = Joi.date();
            break;
          case "object":
            updateSchema[prop] = Joi.object();
            break;
          case "objectId":
            updateSchema[prop] = Joi.object();
            break;
          case "array":
            updateSchema[prop] = Joi.array().items(
              Joi.object(),
              Joi.string(),
              Joi.number(),
              Joi.date()
            );
            let childValidations = await FormType.find({
              formTypeArray: constraints[2]
            })
              .then(res => {
                return res;
              })
              .catch(err => {
                return { error: err };
              });
             // //console.log(request)
            let array = request[""+prop];
            childValidations = childValidations[0].toJSON();
            // //console.log(childValidations)
            for (i = 0; i < array.length; i++) {
              let childUpdateSchema = {formTypeArray:Joi.string()};
              if (childValidations.error) return childValidations;
              for (var childProp in childValidations) {
                if (
                  childValidations.hasOwnProperty(childProp) &&
                  childProp !== "formTypeArray" &&
                  childProp !== "_id"
                ) {
                  ////console.log(childProp)
                  ////console.log(childValidations[childProp])
                  let childConstraints = childValidations[childProp].split(",");
                  switch (childConstraints[0]) {
                    case "string":
                      if (
                        childConstraints[1] === "required" &&
                        childProp === "email"
                      ) {
                        childUpdateSchema[childProp] = Joi.string()
                          .required()
                          .email();
                        break;
                      }
                      if (
                        childConstraints[1] !== "required" &&
                        childProp === "email"
                      ) {
                        childUpdateSchema[childProp] = Joi.string().email();
                        break;
                      }
                      if (
                        childConstraints[1] === "required" &&
                        childConstraints[2] !== "" &&
                        childConstraints[3] !== ""
                      )
                        childUpdateSchema[childProp] = Joi.string()
                          .required()
                          .min(parseInt(childConstraints[2], 10))
                          .max(parseInt(childConstraints[3], 10));
                      if (
                        childConstraints[1] === "required" &&
                        childConstraints[2] === "" &&
                        childConstraints[3] !== ""
                      )
                        childUpdateSchema[childProp] = Joi.string()
                          .required()
                          .max(parseInt(childConstraints[3], 10));
                      if (
                        childConstraints[1] === "required" &&
                        childConstraints[2] !== "" &&
                        childConstraints[3] === ""
                      )
                        childUpdateSchema[childProp] = Joi.string()
                          .required()
                          .min(parseInt(childConstraints[2], 10));
                      if (
                        childConstraints[1] === "required" &&
                        childConstraints[2] === "" &&
                        childConstraints[3] === ""
                      )
                        childUpdateSchema[childProp] = Joi.string().required();
                      if (
                        childConstraints[1] !== "required" &&
                        childConstraints[2] !== "" &&
                        childConstraints[3] !== ""
                      )
                        childUpdateSchema[childProp] = Joi.string()
                          .min(parseInt(childConstraints[2], 10))
                          .max(parseInt(childConstraints[3], 10));
                      if (
                        childConstraints[1] !== "required" &&
                        childConstraints[2] === "" &&
                        childConstraints[3] !== ""
                      )
                        childUpdateSchema[childProp] = Joi.string().max(
                          parseInt(childConstraints[3], 10)
                        );
                      if (
                        childConstraints[1] !== "required" &&
                        childConstraints[2] !== "" &&
                        childConstraints[3] === ""
                      )
                        childUpdateSchema[childProp] = Joi.string()
                          .required()
                          .min(parseInt(childConstraints[2], 10));
                      if (
                        childConstraints[1] !== "required" &&
                        childConstraints[2] === "" &&
                        childConstraints[3] === ""
                      )
                        childUpdateSchema[childProp] = Joi.string();
                      break;
                    case "number":
                      if (
                        childConstraints[1] === "required" &&
                        childConstraints[2] !== "" &&
                        childConstraints[3] !== ""
                      )
                        childUpdateSchema[childProp] = Joi.number()
                          .required()
                          .min(parseInt(childConstraints[2], 10))
                          .max(parseInt(childConstraints[3], 10));
                      if (
                        childConstraints[1] === "required" &&
                        childConstraints[2] === "" &&
                        childConstraints[3] !== ""
                      )
                        childUpdateSchema[childProp] = Joi.number()
                          .required()
                          .max(parseInt(childConstraints[3], 10));
                      if (
                        childConstraints[1] === "required" &&
                        childConstraints[2] !== "" &&
                        childConstraints[3] === ""
                      )
                        childUpdateSchema[childProp] = Joi.number()
                          .required()
                          .min(parseInt(childConstraints[2], 10));
                      if (
                        childConstraints[1] === "required" &&
                        childConstraints[2] === "" &&
                        childConstraints[3] === ""
                      )
                        childUpdateSchema[childProp] = Joi.number().required();
                      if (
                        childConstraints[1] !== "required" &&
                        childConstraints[2] !== "" &&
                        childConstraints[3] !== ""
                      )
                        childUpdateSchema[childProp] = Joi.number()
                          .min(parseInt(childConstraints[2], 10))
                          .max(parseInt(childConstraints[3], 10));
                      if (
                        childConstraints[1] !== "required" &&
                        childConstraints[2] === "" &&
                        childConstraints[3] !== ""
                      )
                        childUpdateSchema[childProp] = Joi.number().max(
                          parseInt(childConstraints[3], 10)
                        );
                      if (
                        childConstraints[1] !== "required" &&
                        childConstraints[2] !== "" &&
                        childConstraints[3] === ""
                      )
                        childUpdateSchema[childProp] = Joi.number()
                          .required()
                          .min(parseInt(childConstraints[2], 10));
                      if (
                        childConstraints[1] !== "required" &&
                        childConstraints[2] === "" &&
                        childConstraints[3] === ""
                      )
                        childUpdateSchema[childProp] = Joi.number();
                      break;
                    case "date":
                      if (childConstraints[1] === "required")
                        childUpdateSchema[childProp] = Joi.date().required();
                      else childUpdateSchema[childProp] = Joi.date();
                      break;
                    case "object":
                      if (childConstraints[1] === "required")
                        childUpdateSchema[childProp] = Joi.object().required();
                      else childUpdateSchema[childProp] = Joi.object();
                      break;
                  }
                }
              }
              let v = await Joi.validate(array[i], childUpdateSchema)
                .then(res => {
                  return res;
                })
                .catch(err => {
                  return { error: err };
                });
              if (v.error) return v;
            }
        }
      }
    }
    let x = await Joi.validate(request, updateSchema)
      .then(res => {
        return res;
      })
      .catch(err => {
        return { error: err };
      });
    //console.log(x);
    return x;
  }
};