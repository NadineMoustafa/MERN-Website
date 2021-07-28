const axios = require('axios');

const functions = {
	postAdmin: async (
		name1,
		gender1,
		nationality1,
		identificationType1,
		identificationNumber1,
		password1,
		birthdate1,
		address1,
		email1,
		userType1
	) => {
		return await axios({
			method: 'post',
			url: 'http://localhost:5000/routes/api/admins/createAdmin',
			data: {
				name: name1,
				gender: gender1,
				nationality: nationality1,
				identificationType: identificationType1,
				identificationNumber: identificationNumber1,
				password: password1,
				birthdate: birthdate1,
				address: address1,
				email: email1,
				userType: userType1
			}
		})
			.then((res) => {
				return res;
			})
			.catch((err) => {
				return { error: err };
			});
	},
	putAdmin: async (
		token,
		name1,
		gender1,
		nationality1,
		identificationType1,
		identificationNumber1,
		password1,
		birthdate1,
		address1,
		email1
	) => {
		return await axios({
			method: 'put',
			url: 'http://localhost:5000/routes/api/admins/updateAdmin',
			headers: { Authorization: token },
			data: {
				name: name1,
				gender: gender1,
				nationality: nationality1,
				identificationType: identificationType1,
				identificationNumber: identificationNumber1,
				password: password1,
				birthdate: birthdate1,
				address: address1,
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
	getAdmins: async () => {
		return await axios
			.get('http://localhost:5000/routes/api/admins/')
			.then((res) => {
				return res;
			})
			.catch((err) => {
				return { error: err };
			});
	},
	getAdminByID: async (token) => {
		return await axios({
			method: 'get',
			url: 'http://localhost:5000/routes/api/admins/getById/',
			headers: { Authorization: token }
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
	postFormForUser: async (
		companyGovernorate1,
		companyCity1,
		companyAddress1,
		companyName1,
		currency1,
		equityCapital1,
		type1,
		creationDate1,
		tokenUser
	) => {
		return await axios({
			method: 'post',
			url: 'http://localhost:5000/routes/api/users/CreatingForm/',
			headers: { Authorization: tokenUser },
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
		})
			.then((res) => {
				return res;
			})
			.catch((err) => {
				return { error: err };
			});
	},
	loginInvestor: async (password1, email1) => {
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
	getInvestors: async () => {
		// get all users

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
	deleteInvestor: async (token) => {
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
	getFormByCompanyName: async (companyName, token) => {
		return await axios({
			method: 'get',
			url: 'http://localhost:5000/routes/api/admins/getByCompanyName/' + companyName,
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
	}
};
module.exports = functions;

jest.setTimeout(4000000);
