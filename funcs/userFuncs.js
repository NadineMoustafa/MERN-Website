// const funcs= require('./funcs/userFuncs')
const axios = require('axios');
const mongoose = require('mongoose');
const User = require('../models/User');

const functions = {
	createAdmin: async (
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
		return await axios({
			method: 'post',
			url: 'http://localhost:5000/routes/api/admins/createAdmin',
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
		})
			.then((res) => {
				return res;
			})
			.catch((err) => {
				return { error: err };
			});
	},
	createLawyer: async (
		token,
		userType1,
		name1,
		gender1,
		nationality1,
		identificationType1,
		identificationNumber1,
		birthdate1,
		address1,
		email1,
		password1,
		telephone1
	) => {
		return await axios({
			method: 'post',
			url: 'http://localhost:5000/routes/api/admins/registerL',
			headers: { Authorization: token },
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
				password: password1,
				telephone: telephone1
			}
		})
			.then((res) => {
				return res;
			})
			.catch((err) => {
				return { error: err };
			});
	},
	createReviewer: async (
		token,
		userType1,
		name1,
		gender1,
		nationality1,
		identificationType1,
		identificationNumber1,
		birthdate1,
		address1,
		email1,
		password1,
		telephone1
	) => {
		return await axios({
			method: 'post',
			url: 'http://localhost:5000/routes/api/admins/registerR',
			headers: { Authorization: token },
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
				password: password1,
				telephone: telephone1
			}
		})
			.then((res) => {
				return res;
			})
			.catch((err) => {
				return { error: err };
			});
	},
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
		password1,
		investorType1
	) => {
		return await axios({
			method: 'post',
			url: 'http://localhost:5000/routes/api/users/register',
			//url:'http://desolate-oasis-18053.herokuapp.com/routes/api/admins/register',
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
				password: password1,
				investorType: investorType1
			}
		})
			.then((res) => {
				return res;
			})
			.catch((err) => {
				return { error: err };
			});
	},
	loginUser: async (password1, email1) => {
		return await axios({
			method: 'post',
			url: 'http://localhost:5000/routes/api/users/login',
			data: {
				password: password1,
				email: email1
			}
		})
			.then((res) => {
				return res;
			})
			.catch((err) => {
				return { error: err };
			});
	},
	loginAdmin: async (password1, email1) => {
		return await axios({
			method: 'post',
			url: 'http://localhost:5000/routes/api/admins/login',
			data: {
				password: password1,
				email: email1
			}
		})
			.then((res) => {
				return res;
			})
			.catch((err) => {
				return { error: err };
			});
	},
	getAllUsers: async () => {
		return await axios({
			method: 'get',
			url: 'http://localhost:5000/routes/api/users/getAllUsers'
		})
			.then((res) => {
				return res;
			})
			.catch((err) => {
				return { error: err };
			});
	},
	getAllLawyers: async () => {
		return await axios({
			method: 'get',
			url: 'http://localhost:5000/routes/api/users/getAllLawyers'
		})
			.then((res) => {
				return res;
			})
			.catch((err) => {
				return { error: err };
			});
	},
	getAllReviewers: async () => {
		return await axios({
			method: 'get',
			url: 'http://localhost:5000/routes/api/users/getAllReviewers'
		})
			.then((res) => {
				return res;
			})
			.catch((err) => {
				return { error: err };
			});
	},
	getAllInvestors: async () => {
		return await axios({
			method: 'get',
			url: 'http://localhost:5000/routes/api/users/getAllInvestors'
		})
			.then((res) => {
				return res;
			})
			.catch((err) => {
				return { error: err };
			});
	},
	getFinancialBalance: async (token) => {
		return await axios({
			method: 'get',
			url: 'http://localhost:5000/routes/api/users/getTheFinancialBalance',
			headers: { Authorization: token }
		})
			.then((res) => {
				return res;
			})
			.catch((err) => {
				return { error: err };
			});
	},
	getUserById: async (token) => {
		// get certain user

		return await axios({
			method: 'get',
			url: 'http://localhost:5000/routes/api/users/CertainUser',
			headers: { Authorization: token }
		})
			.then((res) => {
				return res;
			})
			.catch((err) => {
				return { error: err };
			});
	},
	updateUser: async (
		token,
		name1,
		gender1,
		nationality1,
		identificationType1,
		identificationNumber1,
		birthdate1,
		address1,
		email1,
		password1,
		investorType1
	) => {
		return await axios({
			method: 'put',
			url: 'http://localhost:5000/routes/api/users/updateUser',
			headers: { Authorization: token },
			data: {
				name: name1,
				gender: gender1,
				nationality: nationality1,
				identificationType: identificationType1,
				identificationNumber: identificationNumber1,
				birthdate: birthdate1,
				address: address1,
				email: email1,
				password: password1,
				investorType: investorType1
			}
		})
			.then((res) => {
				return res;
			})
			.catch((err) => {
				return { error: err };
			});
	},
	deleteUser: async (token) => {
		return await axios({
			method: 'delete',
			url: 'http://localhost:5000/routes/api/users/delete',
			headers: { Authorization: token }
		})
			.then((res) => {
				return res;
			})
			.catch((err) => {
				return { error: err };
			});
	},
	getAllForms: async () => {
		return await axios({
			method: 'get',
			url: 'http://localhost:5000/routes/api/dynamicForms/'
		})
			.then((res) => {
				return res;
			})
			.catch((err) => {
				return { error: err };
			});
	},
	getInvestorInProgressCases: async (token) => {
		return await axios({
			method: 'get',
			url: 'http://localhost:5000/routes/api/userDynamicForms/getInvestorInProgressCases/',
			headers: { Authorization: token }
		})
			.then((res) => {
				return res;
			})
			.catch((err) => {
				return { error: err };
			});
	},
	getInvestorApprovedCases: async (token) => {
		return await axios({
			method: 'get',
			url: 'http://localhost:5000/routes/api/userDynamicForms/getInvestorApprovedCompanies',
			headers: { Authorization: token }
		})
			.then((res) => {
				return res;
			})
			.catch((err) => {
				return { error: err };
			});
	},
	getInvestorLawyerRejectedCase: async (token) => {
		return await axios({
			method: 'get',
			url: 'http://localhost:5000/routes/api/userDynamicForms/getInvestorLawyerRejectedCases',
			headers: { Authorization: token }
		})
			.then((res) => {
				return res;
			})
			.catch((err) => {
				return { error: err };
			});
	},
	getLawyerPossiblePicks: async (token) => {
		return await axios({
			method: 'get',
			url: 'http://localhost:5000/routes/api/userDynamicForms/getLawyerPossiblePicks',
			headers: { Authorization: token }
		})
			.then((res) => {
				return res;
			})
			.catch((err) => {
				return { error: err };
			});
	},
	getLawyerInProgressCases: async (token) => {
		return await axios({
			method: 'get',
			url: 'http://localhost:5000/routes/api/userDynamicForms/getLawyerInProgressCases',
			headers: { Authorization: token }
		})
			.then((res) => {
				return res;
			})
			.catch((err) => {
				return { error: err };
			});
	},
	getReviewerPossiblePicks: async (token) => {
		return await axios({
			method: 'get',
			url: 'http://localhost:5000/routes/api/userDynamicForms/getReviewerPossiblePicks',
			headers: { Authorization: token }
		})
			.then((res) => {
				return res;
			})
			.catch((err) => {
				return { error: err };
			});
	},
	getReviewerInProgressCases: async (token) => {
		return await axios({
			method: 'get',
			url: 'http://localhost:5000/routes/api/userDynamicForms/getReviewerInProgressCases',
			headers: { Authorization: token }
		})
			.then((res) => {
				return res;
			})
			.catch((err) => {
				return { error: err };
			});
	},
	postFormForUser: async (
		token,
		formType1,
		companyName1,
		companyNameInEnglish1,
		companyGovernorate1,
		companyCity1,
		companyAddress1,
		companyTelephone1,
		companyFax1,
		currency1,
		investorNationality1,
		equityCapital1
	) => {
		return await axios({
			method: 'post',
			url: 'http://localhost:5000/routes/api/userDynamicForms/CreatingForm/',
			headers: { Authorization: token },
			data: {
				formType: formType1,
				companyName: companyName1,
				companyNameInEnglish: companyNameInEnglish1,
				companyGovernorate: companyGovernorate1,
				companyCity: companyCity1,
				companyAddress: companyAddress1,
				companyTelephone: companyTelephone1,
				companyFax: companyFax1,
				currency: currency1,
				investorNationality: investorNationality1,
				equityCapital: equityCapital1
			},
			responseType: 'json'
		})
			.then((res) => {
				return res;
			})
			.catch((err) => {
				return { error: err };
			});
	},
	updateFormForUser: async (
		token,
		formID,
		formType1,
		companyName1,
		companyNameInEnglish1,
		companyGovernorate1,
		companyCity1,
		companyAddress1,
		companyTelephone1,
		companyFax1,
		currency1,
		investorNationality1,
		equityCapital1
	) => {
		return await axios({
			method: 'put',
			url: 'http://localhost:5000/routes/api/userDynamicForms/investorEditForm/' + formID,
			headers: { Authorization: token },
			data: {
				formType: formType1,
				companyName: companyName1,
				companyNameInEnglish: companyNameInEnglish1,
				companyGovernorate: companyGovernorate1,
				companyCity: companyCity1,
				companyAddress: companyAddress1,
				companyTelephone: companyTelephone1,
				companyFax: companyFax1,
				currency: currency1,
				investorNationality: investorNationality1,
				equityCapital: equityCapital1
			},
			responseType: 'json'
		})
			.then((res) => {
				return res;
			})
			.catch((err) => {
				return { error: err };
			});
	},
	deleteForm: async (formID) => {
		return await axios({
			method: 'delete',
			url: 'http://localhost:5000/routes/api/dynamicForms/' + formID
		})
			.then((res) => {
				return res;
			})
			.catch((err) => {
				return { error: err };
			});
	},
	sortFormsByID: async (token) => {
		return await axios({
			method: 'get',
			url: 'http://localhost:5000/routes/api/userDynamicForms/AllFormSortedByFormId/',
			headers: { Authorization: token }
		})
			.then((res) => {
				return res;
			})
			.catch((err) => {
				return { error: err };
			});
	},
	sortFormsByDate: async (token) => {
		return await axios({
			method: 'get',
			url: 'http://localhost:5000/routes/api/userDynamicForms/AllformsSortedByformDate/',
			headers: { Authorization: token }
		})
			.then((res) => {
				return res;
			})
			.catch((err) => {
				return { error: err };
			});
	},
	deleteAdmin: async (DeleteID) => {
		return await axios
			.delete('http://localhost:5000/routes/api/admins/' + DeleteID)
			.then((res) => {
				return res;
			})
			.catch((err) => {
				return { error: err };
			});
	},
	getAllAdmins: async () => {
		return await axios
			.get('http://localhost:5000/routes/api/admins')
			.then((res) => {
				return res;
			})
			.catch((err) => {
				return { error: err };
			});
	},
	takingForm: async (formID, token) => {
		return await axios({
			method: 'put',
			url: 'http://localhost:5000/routes/api/userDynamicForms/takingForm/' + formID,
			headers: { Authorization: token }
		})
			.then((res) => {
				return res;
			})
			.catch((err) => {
				return { error: err };
			});
	},
	acceptForm: async (formID, token) => {
		return await axios({
			method: 'put',
			url: 'http://localhost:5000/routes/api/userDynamicForms/accept/' + formID,
			headers: { Authorization: token }
		})
			.then((res) => {
				return res;
			})
			.catch((err) => {
				return { error: err };
			});
	},
	calculateFees: async (formID, token) => {
		return await axios({
			method: 'put',
			url: 'http://localhost:5000/routes/api/userDynamicForms/CalculatingFees/' + formID,
			headers: { Authorization: token }
		})
			.then((res) => {
				return res;
			})
			.catch((err) => {
				return { error: err };
			});
	},
	casesSortedByIdAdmin: async (token) => {
		return await axios({
			method: 'get',
			url: 'http://localhost:5000/routes/api/admins/CasesSortedById',
			headers: { Authorization: token }
		})
			.then((res) => {
				return res;
			})
			.catch((err) => {
				return { error: err };
			});
	}
};

jest.setTimeout(4000000);
module.exports = functions;
