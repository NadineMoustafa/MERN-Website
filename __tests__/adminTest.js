/**
 * @jest-environment node
 */

// test('1+1 is 2', async () => {
//   expect(1+1).toBe(2)
// })
const mongoose = require("mongoose");
const funcs = require("../funcs/adminFuncs");

let beforeOldAdmins;
let beforeOldLength;
let token;
let beforeNewAdmins;
let beforeNewLength;
let loggedInAdmin;
let beforeAdmin;
//let tokenUser;
beforeAll(async () => {
  beforeOldAdmins = await funcs.getAdmins();
  beforeOldLength = beforeOldAdmins.data.data.length;
  beforeAdmin = await funcs.postAdmin("Mariam","Female","Egyptian","National ID","55630746622","password1234","1990-3-3","Maadi","mari@gmail.com","Admin");
  beforeNewAdmins = await funcs.getAdmins();
  beforeNewLength = beforeNewAdmins.data.data.length
  loggedInAdmin = await funcs.loginAdmin("password1234","mari@gmail.com")
  token = loggedInAdmin.data.data
});

afterAll(async () => {
  //const allAdmins = await funcs.getAdmins()
  await funcs.deleteAdmin(beforeAdmin.data.data._id);
  // await funcs.deleteInvestor(tokenUser)
});

//Testing creating a new admin
test("Creating an admin", async () => {
  expect(beforeNewLength).toBe(beforeOldLength + 1);
  expect(beforeNewAdmins.data.data[beforeNewAdmins.data.data.length - 1].name).toMatch(
    "Mariam"
  );
  expect(beforeNewAdmins.data.data[beforeNewAdmins.data.data.length - 1].email).toMatch(
    "mari@gmail.com"
  );
});

//Testing creating a new admin with identification number less than 8 and expecting an error
test("Creating an admin with wrong identification number", async () => {
  const postingAdmin = await funcs.postAdmin(
    "Ayman",
    "Male",
    "Egyptian",
    "National ID",
    "1123",
    "password1234",
    "1990-3-3",
    "Maadi",
    "ayman@gmail.com",
    "Admin"
  );
  // console.log(postingAdmin)
  const Admins = await funcs.getAdmins()
  expect(postingAdmin.data.data.error).toEqual('"identificationNumber" length must be at least 8 characters long');
  expect(Admins.data.data.length).toBe(beforeNewLength);
});

//Testing creating a new admin with a wrong email syntax
test("Creating an admin with wrong email", async () => {
  const postingAdmin = await funcs.postAdmin(
    "Ayman",
    "Male",
    "Egyptian",
    "National ID",
    "1169970423",
    "password1234",
    "1990-3-3",
    "Maadi",
    "ayman",
    "Admin"
  );
  const Admins = await funcs.getAdmins()
  expect(postingAdmin.data.data.error).toEqual('"email" must be a valid email');
  expect(Admins.data.data.length).toBe(beforeNewLength);
});

//Testing creating a new admin without a name which is required
test("Creating an admin without a name", async () => {
  const postingAdmin = await funcs.postAdmin(
    "",
    "Male",
    "Egyptian",
    "National ID",
    "1169970423",
    "password1234",
    "1990-3-3",
    "Maadi",
    "ayman",
    "Admin"
  );
  const Admins = await funcs.getAdmins()
  expect(postingAdmin.data.data.error).toEqual('"name" is not allowed to be empty');
  expect(Admins.data.data.length).toBe(beforeNewLength);
});

//Testing getting all admins
test("Getting all admins", async () => {
  expect(beforeNewLength).toBe(beforeOldLength + 1);
});

//Testing getting a certain admin by id
test("Getting a certain admin by id", async () => {
  const newAdmin = await funcs.getAdminByID(token);
  expect(newAdmin.data.data._id).toMatch(beforeNewAdmins.data.data[beforeNewAdmins.data.data.length-1]._id);
  expect(newAdmin.data.data.name).toMatch(beforeNewAdmins.data.data[beforeNewAdmins.data.data.length-1].name);
  expect(newAdmin.data.data.email).toMatch(beforeNewAdmins.data.data[beforeNewAdmins.data.data.length-1].email);
});

//Testing deleting an admin by id and the length should be minus 1
test("Deleting an admin", async () => {
  await funcs.postAdmin(
    "Mohamed",
    "Male",
    "Egyptian",
    "National ID",
    "273773333",
    "123456789",
    "3-3-1990",
    "Maadi",
    "mo@gmail.com",
    "Admin"
  );
  const oldAdmins = await funcs.getAdmins();
  const oldLength = oldAdmins.data.data.length;
  await funcs.deleteAdmin(
    oldAdmins.data.data[oldAdmins.data.data.length - 1]._id
  );
  const newAdmins = await funcs.getAdmins();
  expect(newAdmins.status).toEqual(200);
  expect(newAdmins.data.data.length).toBe(oldLength - 1);
});

//Testing deleting an admin by a wrong id
test("Deleting an admin with a wrong id", async () => {
  await funcs.deleteAdmin(mongoose.Types.ObjectId("5c9ff4e9a684c432b40e2c82"));
  const newAdmins = await funcs.getAdmins();
  expect(newAdmins.status).toEqual(200);
  expect(newAdmins.data.data.length).toBe(beforeNewLength);
});

//Testing updating an admin by id
test("Updating an admin by id", async () => {
  const specificAdmin = await funcs.getAdminByID(token);
  await funcs.putAdmin(
    token,
    "Youssr",
    specificAdmin.data.data.gender,
    specificAdmin.data.data.nationality,
    specificAdmin.data.data.identificationType,
    specificAdmin.data.data.identificationNumber,
    "pass6637294",
    specificAdmin.data.data.birthdate,
    specificAdmin.data.data.address,
    specificAdmin.data.data.email
  );
  const updatedAdmin = await funcs.getAdminByID(token);
  expect(updatedAdmin.data.data.name).toMatch("Youssr");
});

//Testing updating an admin by id with a password less than 8
test("Updating an admin by id with wrong password", async () => {
  const specificAdmin = await funcs.getAdminByID(token);
  const updatedAdmin = await funcs.putAdmin(
    token,
    specificAdmin.data.data.name,
    specificAdmin.data.data.gender,
    specificAdmin.data.data.nationality,
    specificAdmin.data.data.identificationType,
    specificAdmin.data.data.identificationNumber,
    "22",
    specificAdmin.data.data.birthdate,
    specificAdmin.data.data.address,
    specificAdmin.data.data.email
  );
  expect(updatedAdmin.error.response.data.error).toEqual('"password" length must be at least 8 characters long');
});

//Testing login
test("Login admin", async () => {
  expect(loggedInAdmin.config.data).toMatch('"password":"password1234","email":"mari@gmail.com"');
});

//Testing login with a wrong password
test("Login admin with wrong password", async () => {
  const loginAdmin = await funcs.loginAdmin("Rodayna12", "mari@gmail.com");
  expect(loginAdmin.error.response.data.password).toMatch('Wrong password')
});

//Testing login with a wrong email
test("Login admin with wrong email", async () => {
  const loginAdmin = await funcs.loginAdmin("password1234", "rody@yahoo.com")
  expect(loginAdmin.error.response.data.email).toMatch('This email is not registered yet')
});

