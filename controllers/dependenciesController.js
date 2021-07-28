const mongoose = require("mongoose");
const Dependencies = require("../models/Dependencies");

exports.search = async (att, value) => {
  if (!att) {
    return await Dependencies.find()
      .then(res => {
        return res;
      })
      .catch(err => {
        return { error: err };
      });
  }
  if (att === "_id") {
    return await Dependencies.findById(value)
      .then(res => {
        return res;
      })
      .catch(err => {
        return { error: err };
      });
  }
  if (att == "formType") {
    return await Dependencies.find({ formType: value })
      .then(res => {
        return res;
      })
      .catch(err => {
        return { error: err };
      });
  }
  
};

exports.create = async body => {
  return await Dependencies.create(body)
    .then(res => {
      return res;
    })
    .catch(err => {
      return { error: err };
    });
};

exports.update = async (att, value, body) => {
  if (!att) {
    return { error: "Can't update form, provide a value to update with" };
  }
  if (att === "_id") {
    var dependencies = await Dependencies.findByIdAndUpdate(value, body).catch(err => {
      return { error: err };
    });
    if (dependencies.error) return dependencies;
    return await Dependencies.findById(value)
      .then(res => {
        return res;
      })
      .catch(err => {
        return { error: err };
      });
  }
  if( att === "formType"){
    var dependencies = await Dependencies.updateMany({formType:value}, body).catch(err => {
        return { error: err };
      });
      if (dependencies.error) return dependencies;
      return await Dependencies.find({formType:value})
        .then(res => {
          return res;
        })
        .catch(err => {
          return { error: err };
        });
  }
  var dependencies = await Dependencies.updateMany({[att]:value}, body).catch(err => {
    return { error: err };
  });
  if (dependencies.error) return dependencies;
  return await Dependencies.find({[att]:value})
    .then(res => {
      return res;
    })
    .catch(err => {
      return { error: err };
    });
};

exports.remove = async (att,value)=>{
    if (!att) {
        return {error: "Can't be deleted , Please provide an attribute to delete with"}
      }
      if (att === "_id") {
        return await Dependencies.findByIdAndDelete(value)
          .then(res => {
            return res;
          })
          .catch(err => {
            return { error: err };
          });
      }
      if (att == "formType") {
        return await Dependencies.deleteMany({ formType: value })
          .then(res => {
            return res;
          })
          .catch(err => {
            return { error: err };
          });
      }
}
