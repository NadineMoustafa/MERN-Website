
/**
 * @jest-environment node
*/
var mongoose=require('mongoose');
var axios=require('axios');
const funcs = require('../funcs/userFuncs');

let beforeOldUsers;
let beforeOldLength;
let token;
let token2; //Admin 
let token3; //Lawyer
let token4; //Reviewer
let beforeNewUsers;
let beforeNewLength;
let loggedInUser;
let beforeOldForms;
let beforeOldFormLength;
let beforeNewForms;
let beforeNewFormLength;
let loggedInAdmin;
let loggedInLawyer;
let loggedInReviewer;
let form1;
let form2;
let form3;
beforeAll(async () => {
  loggedInAdmin = await funcs.loginAdmin('OIbrahim00','Omar_Ibra@gmail.com')
  console.log(loggedInAdmin)
  token2 = loggedInAdmin.data.data
  await funcs.createLawyer(token2,'Lawyer','Ahmed','Male','Egyptian','National ID','570575620174','01-01-1980','Nasr City','ahmed999@gmail.com','12345678')
  loggedInLawyer = await funcs.loginUser('12345678','ahmed999@gmail.com')
  console.log(loggedInLawyer)
  token3 = loggedInLawyer.data.token
  await funcs.createReviewer(token2,'Reviewer','Alaa','Male','Egyptian','National ID','570575644371','01-01-1980','Nasr City','alaa999@gmail.com','12345678')
  loggedInReviewer = await funcs.loginUser('12345678','alaa999@gmail.com')
  console.log(loggedInReviewer)
  token4 = loggedInReviewer.data.token
  beforeOldUsers = await funcs.getAllUsers();
  beforeOldLength = beforeOldUsers.data.data.length;
  await funcs.createInvestor('Investor','Mona','Female','Egyptian','National ID','990575020173','01-01-1980','Nasr City','monzzzz@gmail.com','password1234','Person')
  beforeNewUsers = await funcs.getAllUsers();
  beforeNewLength = beforeNewUsers.data.data.length
  loggedInUser = await funcs.loginUser("password1234","monzzzz@gmail.com")
  console.log(loggedInUser)
  token = loggedInUser.data.token
  beforeOldForms = await funcs.getAllForms()
  beforeOldFormLength = beforeOldForms.data.data.length
  form1 = await funcs.postFormForUser(loggedInUser.data.token,'SPCForm','الشركة00','The Company00','Cairo','New Cairo','Fifth Settlement','02752277577','a-2417457642','Dollars','Egyptian',100000)
  form2 = await funcs.postFormForUser(loggedInUser.data.token,'SPCForm','الشركة01','The Company01','Cairo','New Cairo','Fifth Settlement','015722772081','u-417757743','Dollars','Egyptian',100000)
  form3 = await funcs.postFormForUser(loggedInUser.data.token,'SPCForm','الشركة02','The Company02','Cairo','New Cairo','Fifth Settlement','011472777667','k-317772942','Dollars','Egyptian',100000)
  beforeNewForms = await funcs.getAllForms()
  beforeNewFormLength = beforeNewForms.data.data.length
});

afterAll(async () => {
  await funcs.deleteUser(token);
  await funcs.deleteUser(token3);
  await funcs.deleteUser(token4);
  await funcs.deleteForm(form1.data.data._id)
  await funcs.deleteForm(form2.data.data._id)
  await funcs.deleteForm(form3.data.data._id)
});

//Testing Creating a user
test("Creating a user", async () => {
  expect(beforeNewUsers.data.data).toHaveLength(beforeOldUsers.data.data.length+1);
  expect(beforeNewUsers.data.data[beforeNewUsers.data.data.length - 1].name).toMatch(
    "Mona"
  );
  expect(beforeNewUsers.data.data[beforeNewUsers.data.data.length - 1].email).toMatch(
    "monzzzz@gmail.com"
  );
});

//Testing creating a new user with identification number less than 8 and expecting an error
test("Creating a user with wrong identification number", async () => {
  const postingUser = await funcs.createInvestor('Investor','Hala','Female','Egyptian','National ID','770','01-01-1980','Nasr City','hala@gmail.com','password1234','Person')
  const Users = await funcs.getAllUsers()
  expect(postingUser.error.response.data.error).toEqual('"identificationNumber" length must be at least 8 characters long');
  expect(Users.data.data.length).toBe(beforeNewLength);
});

//Testing creating a new user with a wrong email syntax
test("Creating a user with wrong email", async () => {
  const postingUser = await funcs.createInvestor('Investor','Hala','Female','Egyptian','National ID','728399402710','01-01-1980','Nasr City','hala','password1234','Person')
  const Users = await funcs.getAllUsers()
  expect(postingUser.error.response.data.error).toEqual('"email" must be a valid email');
  expect(Users.data.data.length).toBe(beforeNewLength);
});

//Testing creating a new user without a name which is required
test("Creating a user without a name", async () => {
  const postingUser = await funcs.createInvestor('Investor','','Female','Egyptian','National ID','728399402710','01-01-1980','Nasr City','hala@gmail.com','password1234','Person')
  const Users = await funcs.getAllUsers()
  expect(postingUser.error.response.data.error).toEqual('"name" is not allowed to be empty');
  expect(Users.data.data.length).toBe(beforeNewLength);
});

//Testing Getting all users
test("Test getting all users ", async () => {
  expect(beforeNewLength).toBe(beforeOldLength + 1);
});

//Testing updating an user by id
test("Updating a user by id", async () => {
  const specificUser = await funcs.getUserById(token);
  await funcs.updateUser(
    token,
    "Hala",
    specificUser.data.data.gender,
    specificUser.data.data.nationality,
    specificUser.data.data.identificationType,
    specificUser.data.data.identificationNumber,
    specificUser.data.data.birthdate,
    specificUser.data.data.address,
    specificUser.data.data.email,
    "pass6637294",
    specificUser.data.data.investorType
  );
  const updatedUser = await funcs.getUserById(token);
  expect(updatedUser.data.data.name).toMatch("Hala");
});

//Testing updating a user by id with a password less than 8
test("Updating a user by id with wrong password", async () => {
  const specificUser = await funcs.getUserById(token);
  const updatedUser = await funcs.updateUser(
    token,
    specificUser.data.data.name,
    specificUser.data.data.gender,
    specificUser.data.data.nationality,
    specificUser.data.data.identificationType,
    specificUser.data.data.identificationNumber,
    specificUser.data.data.birthdate,
    specificUser.data.data.address,
    specificUser.data.data.email,
    "pa",
    specificUser.data.data.investorType
  );
  expect(updatedUser.error.response.data.error).toEqual('"password" length must be at least 8 characters long');
});

//Testing getting all lawyers
test('Getting all lawyers', async () =>{
  const lawyers = await funcs.getAllLawyers()
  expect(lawyers.data.data[lawyers.data.data.length-1].userType).toBe('Lawyer')
})

//Testing getting all reviewers
test('Getting all reviewers', async () =>{
  const reviewers = await funcs.getAllReviewers()
  expect(reviewers.data.data[reviewers.data.data.length-1].userType).toBe('Reviewer')
})

//Testing getting all investors
test('Getting all investors', async () =>{
  const investors = await funcs.getAllInvestors()
  expect(investors.data.data[investors.data.data.length-1].userType).toBe('Investor')
})

//Testing getting the financial balance
test('Getting the financial balance of an investor', async () =>{
  const investors = await funcs.getAllInvestors()
  const financialBalance = await funcs.getFinancialBalance(token)
  expect(investors.data.data[investors.data.data.length-1].financialBalance).toBe(financialBalance.data.data)
})

//Testing delete an investor
test('Deleting an investor',async() =>{
  await funcs.createInvestor('Investor','Noha','Female','Egyptian','National ID','010575020173','01-01-1980','Nasr City','noha123@gmail.com','password1234','Person')
  const oldInvestors = await funcs.getAllInvestors()
  const oldLength = oldInvestors.data.data.length
  const loggedInInvestor = await funcs.loginUser('password1234','noha123@gmail.com')
  const tokenInvestor = loggedInInvestor.data.token
  await funcs.deleteUser(tokenInvestor)
  const newInvestors = await funcs.getAllInvestors()
  const newLength  = newInvestors.data.data.length
  expect(newLength).toBe(oldLength-1)
})

//Testing login User
test("Login User", async () => {
  expect(loggedInUser.config.data).toMatch('"password":"password1234","email":"monzzzz@gmail.com"');
});

//Testing login with a wrong password
test("Login admin with wrong password", async () => {
  const loginUser = await funcs.loginUser("Rodayna12", "monzzzz@gmail.com");
  expect(loginUser.error.response.data.password).toMatch('Wrong password')
});

//Testing login with a wrong email
test("Login admin with wrong email", async () => {
  const loginUser = await funcs.loginUser("password1234", "haha@yahoo.com")
  expect(loginUser.error.response.data.email).toMatch('This email is not registered yet')
});

//Testing all forms sorted by id as a lawyer
test("All forms Sorted by ID", async () =>{
  const forms = await funcs.sortFormsByID(token3)
  expect(forms.data.data[forms.data.data.length-3]._id).toMatch(form1.data.data._id)
  expect(forms.data.data[forms.data.data.length-2]._id).toMatch(form2.data.data._id)
  expect(forms.data.data[forms.data.data.length-1]._id).toMatch(form3.data.data._id)
   
})

//Testing all forms sorted by id
test("All forms Sorted by Creation Date", async () =>{
  const forms = await funcs.sortFormsByDate(token3)
  expect(forms.data.data[forms.data.data.length-3].creationDate).toMatch(form1.data.data.creationDate)
  expect(forms.data.data[forms.data.data.length-2].creationDate).toMatch(form2.data.data.creationDate)
  expect(forms.data.data[forms.data.data.length-1].creationDate).toMatch(form3.data.data.creationDate)
   
})

//Testing taking the form and change it's status to in progress lawyer as a lawyer then accept it then a reviewer can take it
//and accept it
test.only('Taking an unassigned Case and changing the status to in progress case',async () =>{
  const forms = await funcs.getLawyerPossiblePicks(token3)
  expect(forms.data.data[forms.data.data.length-1].status).toBe('Unassigned')
  const wantedForm = forms.data.data[forms.data.data.length-1]
  await funcs.takingForm(wantedForm._id,token3)
  const wantedForms = await funcs.getAllForms()
  const finalForm = wantedForms.data.data[wantedForms.data.data.length-1]
  expect(finalForm.status).toBe('In progress Lawyer')
  const inProgressForms = await funcs.getLawyerInProgressCases(token3)
  expect(inProgressForms.data.data[inProgressForms.data.data.length-1].status).toBe('In progress Lawyer')
  await funcs.calculateFees(inProgressForms.data.data[inProgressForms.data.data.length-1]._id,token3)
  const feesForms = await funcs.getAllForms()
  expect(feesForms.data.data[feesForms.data.data.length-1].fees).toBe(1100)
  await funcs.acceptForm(feesForms.data.data[feesForms.data.data.length-1]._id,token3)
  const acceptedForms = await funcs.getAllForms()
  expect(acceptedForms.data.data[acceptedForms.data.data.length-1].status).toBe('Lawyer accepted')
  const acceptedLawyerReviewerForms = await funcs.getReviewerPossiblePicks(token4)
  expect(acceptedLawyerReviewerForms.data.data[acceptedLawyerReviewerForms.data.data.length-1].status).toBe('Lawyer accepted')
  await funcs.takingForm(acceptedLawyerReviewerForms.data.data[acceptedLawyerReviewerForms.data.data.length-1]._id,token4)
  const reviewerTakenForms = await funcs.getAllForms()
  expect(reviewerTakenForms.data.data[reviewerTakenForms.data.data.length-1].status).toBe('In progress Reviewer')
  await funcs.acceptForm(reviewerTakenForms.data.data[reviewerTakenForms.data.data.length-1]._id,token4)
  const reviewerAcceptedForms = await funcs.getAllForms()
  expect(reviewerAcceptedForms.data.data[reviewerAcceptedForms.data.data.length-1].status).toBe('Approved')
})

//Testing getting in progress cases (anything rather than 'Approved') as an investor
test('In progress cases of an investor', async () =>{
  const forms = await funcs.getInvestorInProgressCases(token)
  expect(forms.data.data[forms.data.data.length-1].status).not.toBe('Approved')
})

//Testing getting unassigned cases as a lawyer
test('Cases I can get as a lawyer (Unassigned Cases)', async () =>{
  const forms = await funcs.getLawyerPossiblePicks(token3)
  expect(forms.data.data[forms.data.data.length-1].status).toBe('Unassigned')
}) 

//Testing investor creating a form
test('Creating a form as an investor',async () =>{
  const createdForm = await funcs.getAllForms()
  const users = await funcs.getAllUsers()
  expect(createdForm.data.data[createdForm.data.data.length-1].investorId).toMatch(users.data.data[users.data.data.length-1]._id)
  expect(createdForm.data.data[createdForm.data.data.length-1].companyName).toMatch('الشركة02')
})

//Testing updating a form as an investor
test('Updating a form as an investor',async () =>{
  const createdForm = await funcs.getAllForms()
  specificForm = createdForm.data.data[createdForm.data.data.length-2]
  id = specificForm._id
  await funcs.updateFormForUser(token,id,
    specificForm.formType,
    "الشركة03",
    specificForm.companyNameInEnglish,
    specificForm.companyGovernorate,
    specificForm.companyCity,
    specificForm.companyAddress,
    specificForm.companyTelephone,
    specificForm.companyFax,
    specificForm.currency,
    specificForm.investorNationality,
    specificForm.equityCapital)
    const updatedForms = await funcs.getAllForms()
    expect(updatedForms.data.data[updatedForms.data.data.length-2].companyName).toMatch('الشركة03')
})
