const mongoose = require('mongoose');
const User = require('../models/User');
const userValidator = require('../validations/userValidations');
const bcrypt = require('bcrypt');

//comparing between creation dates
exports.compareByDate = function compareByDate(a, b) {
	if (Date.parse(a.creationDate) > Date.parse(b.creationDate)) return 1;

	if (Date.parse(a.creationDate) < Date.parse(b.creationDate)) return -1;

	return 0;
};
//creating Investor
exports.registerInvestor = async function registerInvestor(body) {
	const { error } = userValidator.createValidationI(body);

	if (error) {
		return { error: error.details[0].message };
	}

	let user = await User.findOne({ email: body.email });

	// const user = await User.findOne({body:email})
	if (user) return { error: 'Account already exists' };
	body.financialBalance = 0
	const newUser = await User.create(body)
		.then((res) => {
			return res;
		})
		.catch((err) => {
			return { error: err };
		});
	if (newUser.error) return { error: newUser.error };
	const salt = await bcrypt.genSalt(10);
	newUser.password = await bcrypt.hash(newUser.password, salt);
	await newUser.save();
	return newUser;
};

exports.search = async function search(att, value) {
	if (att === null) {
		var values = await User.find();
		return values;
	}

	if (att === '_id') {
		var values = await User.findById(value);
		return values;
	}
	if (att === 'userType') {
		var values = await User.find({ userType: value });
		return values;
	}

	var values = User.find({ att: value });
	return values;
};

exports.remove = async function remove(att, value) {
	//delete user

	if (att === null) {
		return 'there is no user to delete';
	} else if (att === '_id') {
		const deletedUser = await User.findByIdAndDelete(value);
		return deletedUser;
	}
};

// Update Users
exports.update = async function update(att, value, body) {
	try {
		if (!att) return null;
		if (att === '_id') {
			const user = await User.findById(value);
			if (user.userType === 'Lawyer') {
				const isValidated = userValidator.updateValidationL(body);
				if (isValidated.error) return { error: isValidated.error.details[0].message };
				var updatedUser = await User.findByIdAndUpdate(value, body)
					.then((res) => {
						return res;
					})
					.catch((error) => {
						return { error: error };
					});
				if (updatedUser.error) return updatedUser;
				var x = await User.findById(value);
				return x;
			} else if (user.userType === 'Investor') {
				var isValidated = userValidator.updateValidationI(body);
				if (isValidated.error) return { error: isValidated.error.details[0].message };
				var updatedUser = await User.findByIdAndUpdate(value, body)
					.then((res) => {
						return res;
					})
					.catch((error) => {
						return { error: error };
					});
				if (updatedUser.error) return updatedUser;
				var x = await User.findById(value);
				return x;
			} else if (user.userType === 'Reviewer') {
				const isValidated = userValidator.updateValidationR(body);
				if (isValidated.error) return { error: isValidated.error.details[0].message };
				var updatedUser = await User.findByIdAndUpdate(value, body)
					.then((res) => {
						return res;
					})
					.catch((error) => {
						return { error: error };
					});
				if (updatedUser.error) return updatedUser;
				var x = await User.findById(value);
				return x;
			}
		}
		var updatedUser = User.updateMany({ att: value }, body)
			.then((res) => {
				return res;
			})
			.catch((error) => {
				return { error: error };
			});
		if (updatedUser.error) return updatedUser;
		var x = await User.findById(value);
		return x;
	} catch (error) {
		console.log(error);
	}

	exports.compareById = async function compareById(a, b) {
		// for sorting the cses by caseID
		if (a._id > b._id) return 1;

		if (b._id > a._id) return -1;

		return 0;
	};
};
