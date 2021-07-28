/**
 * @jest-environment node
 */
// test('1+1 is 2', async () => {
//   expect(1+1).toBe(2)
// })
var mongoose = require("mongoose");
const axios = require("axios");
const funcs = require("../funcs/externalentityFuncs");

let beforeOldEntities;
let beforeOldLength;
let beforeNewEntities;
let beforeNewLength;
beforeAll(async () => {
  beforeOldEntities = await funcs.getExternalEntity();
  beforeOldLength = beforeOldEntities.data.data.length;
  console.log(beforeOldLength)
  await funcs.postExternalEntity(
    "Nadzos",
    "(1/1000)*x",
    "http://yoyo.com",
    "gafi@hotmail.com"
  );
  beforeNewEntities = await funcs.getExternalEntity();
  beforeNewLength = beforeNewEntities.data.data.length
  console.log(beforeNewLength)
});

afterAll(async () => {
  const allEntities = await funcs.getExternalEntity()
  await funcs.deleteExternalEntity(allEntities.data.data[allEntities.data.data.length-1]._id)
});

//Test getting all external entities
test("Get all external entities", async () => {
  expect(beforeNewEntities.status).toEqual(200);
  expect(beforeNewLength).toBe(beforeOldLength+1);
});

//Test getting specific external entity
test("Get a certain external entity ", async () => {
  expect(beforeNewEntities.status).toEqual(200);
  const res2 = await funcs.getExternalEntityById(
    beforeNewEntities.data.data[beforeNewEntities.data.data.length - 1]._id
  );
  expect(res2.data.data.Name).toBe("Nadzos");
  expect(res2.data.data.Equation).toBe("(1/1000)*x");
  expect(res2.data.data.Api).toBe("http://yoyo.com");
  expect(res2.data.data.Email).toBe("gafi@hotmail.com");
});

//test get external entity by name
test("test get  external entity by its name", async () => {
  expect(beforeNewEntities.status).toEqual(200);
  const res2 = await funcs.getExternalEntityByName(
    beforeNewEntities.data.data[beforeNewEntities.data.data.length - 1].Name
  );
  expect(res2.data.data[res2.data.data.length-1].Name).toBe("Nadzos");
  expect(res2.data.data[res2.data.data.length-1].Equation).toBe("(1/1000)*x");
});

// //test get  external entity by it's Api
// test("test get  external entity by its Api", async () => {
//   await funcs.postExternalEntity(
//     "testYoyHas",
//     "(1/9)+x",
//     "http:huyyyt.ccom",
//     "nn@gmail.com"
//   );
//   const res = await funcs.getExternalEntity();
//   expect(res.data).toBeDefined();
//   expect(res.status).toEqual(200);
//   const res2 = await funcs.getExternalEntityByAPI(
//     res.data.data[res.data.data.length - 1].Api
//   );
//   expect(res2.data.data[res2.data.data.length - 1].Name).toBe("testYoyHas");
//   expect(res2.data.data[res2.data.data.length - 1].Equation).toBe("(1/9)+x");
//   expect(res2.data.data[res2.data.data.length - 1].Api).toBe(
//     "http:huyyyt.ccom"
//   );
//   await funcs.deleteExternalEntity(res.data.data[res.data.data.length - 1]._id);
// });

//Testing creating new External Entity
test("Creating new External entity", async () => {
  expect(beforeNewLength).toBe(beforeOldLength+1)
  expect(beforeNewEntities.data.data[beforeNewEntities.data.data.length-1].Name).toMatch("Nadzos")
  expect(beforeNewEntities.data.data[beforeNewEntities.data.data.length-1].Equation).toMatch("(1/1000)*x")
});

//Testing creating a new External Entity with a wrong email syntax
test("Creating an External Entity with error", async () => {
  var postingExEntities = await funcs.postExternalEntity(
    "NADZ",
    "(1/1000)*X",
    "http://nado.com",
    "nadogmailcom"
  );
  const entities = await funcs.getExternalEntity()
  expect(postingExEntities.response.data.error).toEqual(
    '"Email" must be a valid email'
  );
  expect(entities.data.data.length).toBe(beforeNewLength);
});

//Testing creating a new External Entity with a wrong email syntax
test("Creating an External Entity with error", async () => {
  var postingExEntities = await funcs.postExternalEntity(
    234,
    "(1/1000)*X",
    "http://nado.com",
    "nado@gmailcom"
  );
  const entities = await funcs.getExternalEntity()
  expect(postingExEntities.response.data.error).toEqual('"Name" must be a string');
  expect(entities.data.data.length).toBe(beforeNewLength);
});

//Testing updating an External Entity
test("Update an External Entity", async () => {
  const response = await funcs.getExternalEntity();
  const a = response.data.data[response.data.data.length - 1]._id;
  await funcs.updateExternalEntityByID(
    mongoose.Types.ObjectId(a),
    "UpdatedPlz",
    response.data.data[response.data.data.length - 1].Equation,
    "newUrl",
    response.data.data[response.data.data.length - 1].Email
  );
  const res = await funcs.getExternalEntity();
  expect(res.status).toEqual(200);
  expect(res.data.data[response.data.data.length - 1].Name).toMatch(
    "UpdatedPlz"
  );
  expect(res.data.data[response.data.data.length - 1].Api).toMatch("newUrl");
});

//Another Update test for external entity with wrong validation for the email
test("Update an External Entity with wrong validations", async () => {
  const response = await funcs.getExternalEntity();
  const a = response.data.data[response.data.data.length - 1]._id;
  var UpdatedEE = await funcs.updateExternalEntityByID(
    mongoose.Types.ObjectId(a),
    response.data.data[response.data.data.length - 1].Name,
    response.data.data[response.data.data.length - 1].Equation,
    response.data.data[response.data.data.length - 1].Api,
    "nadz"
  );
  expect(UpdatedEE.response.data.error).toEqual(
    '"Email" must be a valid email'
  );
});

// //Testing deleting an External Entity by id and the length should be minus 1
// test("Deleting an External Entity", async () => {
//   await funcs.postExternalEntity(
//     "ExternalEntityTestt",
//     "10X+2",
//     "http:/ExternalEntity.com",
//     "ExternalEntity@gmail.com"
//   );
//   const oldExternalEntities = await funcs.getExternalEntity();
//   const oldLength = oldExternalEntities.data.data.length;
//   await funcs.deleteExternalEntity(
//     oldExternalEntities.data.data[oldExternalEntities.data.data.length - 1]._id
//   );
//   const newExternalEntities = await funcs.getExternalEntity();
//   expect(newExternalEntities.status).toEqual(200);
//   expect(newExternalEntities.data.data.length).toBe(oldLength - 1);
// });

//Testing deleting an External Entity by a wrong id
test("Deleting an Entity with a wrong id", async () => {
  // const oldExternalEntities = await funcs.getExternalEntity();
  // const oldLength = oldExternalEntities.data.data.length;
  // await funcs.deleteExternalEntity(
  //   mongoose.Types.ObjectId("5c9ff4e9a684c432b40e2c82")
  // );
  // const newExternalEntities = await funcs.getExternalEntity();
  // expect(newExternalEntities.status).toEqual(200);
  // expect(newExternalEntities.data.data.length).toBe(oldLength);
});
