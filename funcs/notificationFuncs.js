const axios = require('axios');

const functions = {
	createInvestor: async (
		userType1,
		name1,
		gender1,
		nationality1,
		identificationType1,
		identificationNumber1,
		birthdate1,
		address1,
		email1,
		password1
	) => {
		var user = await axios({
			method: 'post',
			url: 'http://localhost:5000/routes/api/users/register',
			data: {
				userType: userType1,
				name: name1,
				gender: gender1,
				nationality: nationality1,
				identificationType: identificationType1,
				identificationNumber: identificationNumber1,
				birthdate: birthdate1,
				address: address1,
				email: email1,
				password: password1
			}
		});
		return user;
	},

	postSPCFormForUser: async (
		companyGovernorate1,
		companyCity1,
		companyAddress1,
		companyName1,
		currency1,
		equityCapital1,
		type1,
		creationDate1,
		userId1
	) => {
		var form = await axios({
			method: 'post',
			url: 'http://localhost:5000/routes/api/users/CreatingForm/' + userId1,
			data: {
				companyGovernorate: companyGovernorate1,
				companyCity: companyCity1,
				companyAddress: companyAddress1,
				companyName: companyName1,
				currency: currency1,
				equityCapital: equityCapital1,
				type: type1,
				creationDate: creationDate1
			},
			responseType: 'json'
		});
		return form;
	},
	putFormLawyerComments: async (lawyerComments1, userId1, formId1) => {
		var returned = await axios({
			method: 'put',
			url: 'http://localhost:5000/routes/api/users/lawyerComments/' + userId1 + '/' + formId1,
			data: {
				lawyerComments: lawyerComments1
			}
		});
		return returned;
	},
	putFormReviewerComments: async (ReviewerComments1, userId1, formId1) => {
		var returned = await axios({
			method: 'put',
			url: 'http://localhost:5000/routes/api/users/reviewerComments/' + userId1 + '/' + formId1,
			data: {
				reviewerComments: ReviewerComments1
			}
		});
		return returned;
	},
	deleteUser: async (DeleteID) => {
		await axios.delete('/routes/api/users/' + DeleteID);
	},

	UpdateFormInUser: async (UserId, FormId, status1) => {
		// update a form in a certain user
		return await axios({
			method: 'put',
			url: 'http://localhost:5000/routes/api/users/' + UserId + '/' + FormId,
			data: {
				status: status1
			}
		});
	}
};

module.exports = functions;
jest.setTimeout(4000000);
