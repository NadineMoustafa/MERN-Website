const express = require('express');
const Joi = require('joi');
const router = express.Router();
const userController = require('../../controllers/userController');
const User = require('../../models/User');
const notifications = require('../../helpers/notifications');
const dynamicFormController = require('../../controllers/dynamicFormController');
const Admin = require('../../models/Admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const tokenKey = require('../../config/keys_dev').secretOrKey;
const passport = require('passport');
require('../../config/passport')(passport);
const axios = require('axios');

const moment = require('moment');

const randomBytes = require('randombytes');

const nodemailer = require('nodemailer');

let crypto;
try {
	crypto = require('crypto');
} catch (err) {
	console.log('crypto support is disabled!');
}

//get all lawyers
router.get('/getAllLawyers', async (req, res) => {
	const userType = await userController.search('userType', 'Lawyer');
	return res.json({ data: userType });
});

//get all investors
router.get('/getAllInvestors', async (req, res) => {
	const userType = await userController.search('userType', 'Investor');
	return res.json({ data: userType });
});

//get all Reviewers
router.get('/getAllReviewers', async (req, res) => {
	const userType = await userController.search('userType', 'Reviewer');
	return res.json({ data: userType });
});

// view a certain user
router.get('/CertainUser', passport.authenticate('jwt', { session: false }), async (req, res) => {
	const userid = req.user.id;
	const searchUsers = await userController.search('_id', userid);
	return res.json({ data: searchUsers });
});

router.get('/CertainAttributes', passport.authenticate('jwt', { session: false }), async (req, res) => {
	const userid = req.user.id;
	const searchUsers = await userController.search('_id', userid);
	return res.json({
		UserType: searchUsers.userType,
		Username: searchUsers.name,
		Gender: searchUsers.gender,
		Nationality: searchUsers.nationality,
		IdentificationType: searchUsers.identificationType,
		IdentificationNumber: searchUsers.identificationNumber,
		Birthdate: searchUsers.birthdate,
		Address: searchUsers.address,
		Email: searchUsers.email,
		Password: searchUsers.password,
		Telephone: searchUsers.telephone,
		Fax: searchUsers.fax,
		FinancialBalance: searchUsers.financialBalance
	});
});

//view the financialBalance of an investor
router.get('/getTheFinancialBalance', passport.authenticate('jwt', { session: false }), async (req, res) => {
	const userid = req.user.id;
	if (req.user.userType === 'Investor') {
		const user = await userController.search('_id', userid);
		const financialBalance = user.financialBalance;
		return res.json({ data: financialBalance });
	} else {
		return res.status(401).json({ msg: 'Non Authorized' });
	}
});

//get all users
router.get('/getAllUsers', async (req, res) => {
	const searchUsers = await userController.search();
	res.json({ data: searchUsers });
});

//When you delete a specific user , you delete the unassigned forms only
//Delete a user
router.delete('/delete', passport.authenticate('jwt', { session: false }), async (req, res) => {
	const id = req.user.id;
	var SpecificUser = await userController.search('_id', id);
	if (!SpecificUser) return res.status(400).json({ msg: 'This user doesnt exist' });
	const deletedUser = await userController.remove('_id', id);
	const forms = await dynamicFormController.search('investorId', id);
	for (i = 0; i < forms; i++) {
		if (forms[i].status === 'Unassigned') {
			await dynamicFormController.remove('_id', forms[i]._id);
		}
	}
	res.json({ msg: 'User was deleted successfully', data: deletedUser });
});

//Register a user
router.post('/register', async (req, res) => {
	const newUser = await userController.registerInvestor(req.body);
	if (newUser.error) return res.status(400).send(newUser);
	if (newUser.userType === 'Investor') {
		newUser.resetPasswordToken = '';
		newUser.resetPasswordExpires = null;
		newUser.financialBalance = 0;
		newUser.verifyToken = null;
		returnedUser = await userController.update('_id', newUser._id, {
			resetPasswordToken: newUser.resetPasswordToken,
			resetPasswordExpires: newUser.resetPasswordExpires,
			verifyToken: newUser.verifyToken
		});
		return res.json({
			msg: 'Account was created successfully',
			data: returnedUser
		});
	}
});

//Login
router.post('/login', async (req, res) => {
	try {
		const email = req.body.email;
		const password = req.body.password;
		const user = await User.findOne({ email });
		if (!user) {
			const admin = await Admin.findOne({ email });
			if (!admin) return res.status(404).json({ email: 'This email is not registered yet' });
			else {
				const doesItMatch = await bcrypt.compareSync(password, admin.password);
				if (doesItMatch) {
					const payload = {
						id: admin.id,
						name: admin.name,
						email: admin.email
					};
					const token = jwt.sign(payload, tokenKey, { expiresIn: '1h' });
					//res.json({data: `Bearer ${token}`})
					return res.json({ msg: 'You are logged in now', token: `Bearer ${token}`, type: admin.userType });
				}
			}
		}
		if (
			(user.isVerified === true && user.userType === 'Investor') ||
			user.userType === 'Lawyer' ||
			user.userType === 'Reviewer'
		) {
			const doesItMatch = await bcrypt.compareSync(password, user.password);
			if (doesItMatch) {
				const payload = {
					id: user.id,
					name: user.name,
					email: user.email
				};
				const token = jwt.sign(payload, tokenKey, { expiresIn: '1h' });
				//res.json({data: `Bearer ${token}`})
				return res.json({ msg: 'You are logged in now', token: `Bearer ${token}`, type: user.userType }); //,data:'Token'
			} else return res.status(400).send({ password: 'Wrong password' });
		} else {
			return res.status(401).send({ msg: 'Account not verified' });
		}
	} catch (e) {
		console.log(e);
	}
});

//update a user
router.put('/updateUser', passport.authenticate('jwt', { session: false }), async (req, res) => {
	var id = req.user.id;
	const updateUser = await userController.update('_id', id, req.body);
	if (!updateUser) return res.json({ msg: 'ID not there' });
	if (updateUser.error) return res.status(400).json(updateUser);
	return res.json({ msg: 'User Updated Successfully', data: updateUser });
});

//Update a user's form
router.put('/updateForm/:formId', passport.authenticate('jwt', { session: false }), async (req, res) => {
	var userid = req.user.id;
	if (req.user.userType === 'Investor' || req.user.userType === 'Lawyer') {
		var formid = req.params.formId;
		var user = await userController.search('_id', userid);
		var updatedForm = await formController.update('_id', formid, req.body);
		const userForms = user.forms;
		for (i = 0; i < user.forms.length; i++) {
			if (userForms[i]._id.equals(formid)) {
				userForms[i] = updatedForm;
			}
		}
		const returnedUser = await userController.update('_id', userid, {
			forms: user.forms
		});
		if (req.body.status) {
			if (req.body.status === 'Approved') {
				var notify = await notifications.notifyExternalEntities(updatedForm);
			}
		}

		if (
			req.body.status !== undefined ||
			req.body.lawyerSeen !== undefined ||
			req.body.lawyerComments !== undefined ||
			req.body.lawyerApprove !== undefined ||
			req.body.reviewerSeen !== undefined ||
			req.body.reviewersComments !== undefined ||
			req.body.reviewerApprove !== undefined
		) {
			var notifyUser = await notifications.notifyUserForFormUpdates(user, updatedForm);
			return res.json({ data: returnedUser, notification: notifyUser });
		}

		return res.json({ data: returnedUser });
	} else {
		return res.status(401).json({ msg: 'Non Authorized' });
	}
});

// Change password
router.post('/changePassword', passport.authenticate('jwt', { session: false }), async (req, res) => {
	const userid = req.user.id;
	const user = await userController.search('_id', userid);
	const oldPassword = req.body.oldPassword;
	const newPassword = req.body.newPassword;
	const confirmPassword = req.body.confirmPassword;
	const doesItMatch = await bcrypt.compareSync(oldPassword, user.password);
	if (doesItMatch) {
		if (newPassword === confirmPassword) {
			const salt = await bcrypt.genSalt(10);
			newPasswordEnc = await bcrypt.hash(newPassword, salt);
			user.password = newPasswordEnc;
			await user.save();
			return res.json({ msg: 'Password was updated successfully', data: user });
		} else return res.json({ msg: 'The passwords do not match!' });
	} else {
		return res.json({ msg: 'The old password does not match with your current password! Please check it again' });
	}
});

//Paying fees
router.put('/payingFees', async (req, res) => {
	const formId = req.body.id;
	var form = await dynamicFormController.search('id', formId);
	const userid = form.investorId;
	const user = await userController.search('_id', userid);
	const amount = req.body.amount;
	form = form.toJSON();
	if (form.status === 'Reviewer accepted') {
		if (user.userType === 'Investor') {
			const fee = form.fees - amount;
			if (fee < 0) {
				return res.json({ msg: 'Amount greater than the required' });
			} else {
				const newfinancialBalance = user.financialBalance - amount;
				if (newfinancialBalance < 0) {
					return res.json({ msg: 'Amount greater than the required' });
				}
				const newUser = await userController.update('_id', userid, { financialBalance: newfinancialBalance });
				form.fees = fee;
				if (form.fees === 0) {
					//await dynamicFormController.update('_id',formId,{ status:'Approved'})
					form.status = 'Approved';
				}
				await dynamicFormController.update('_id', formId, form);
				const newform = await dynamicFormController.search('id', formId);
				return res.json({ msg: 'Amount payed successfully', data: newform, newUser });
			}
		} else {
			return res.status(401).json({ msg: 'Non Authorized' });
		}
	} else {
		return res.json({ msg: 'This form is not fully reviewed' });
	}
});

router.post('/forgotPassword', async (req, res) => {
	if (req.body.email === '') {
		res.status(400).send('email required');
	}

	const email = req.body.email;
	const user = await userController.search('email', email);
	console.error(req.body.email);

	if (user === null) {
		console.error('email not in database');
		return res.json({ msg: 'email not in db' });
		res.status(403).send('email not in db');
	} else {
		const token = crypto.randomBytes(20).toString('hex');

		//.update('_id', id, req.body);
		const t = { resetPasswordToken: token };
		const mail = { email: email };
		const d = { resetPasswordExpires: Date.now() + 360000 };

		var updatedUser = await User.findOneAndUpdate(mail, t);

		var updatedUser2 = await User.findOneAndUpdate(mail, d);

		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: 'resetpass.summerge@gmail.com', //`${process.env.EMAIL_ADDRESS}`,               //will do it
				pass: 'summerge1234' //`${process.env.EMAIL_PASSWORD}`,              //will do it
			}
		});

		const mailOptions = {
			from: 'resetpass.summerge@gmail.com',
			to: email, // `${email}`,
			subject: 'Link To Reset Password',
			text:
				'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
				'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n' +
				`http://localhost:3000/reset/${token}\n\n` + //to work on development uncomment
				//`http://intelligence-summerge.herokuapp.com/reset/${token}\n\n` +    //to work on deployment uncomment
				//`/routes/api/users/reset/${token}\n\n` +
				'If you did not request this, please ignore this email and your password will remain unchanged.\n'
		};

		console.log('sending mail');

		transporter.sendMail(mailOptions, (err, response) => {
			if (err) {
				console.error('there was an error: ', err);
			} else {
				console.log('here is the res: ', response);
				res.status(200).json('recovery email sent');
			}
		});
	}
});

router.get('/reset/:token', async (req, res) => {
	const token = req.params.token;
	console.log(token);

	const user = await User.findOne({ resetPasswordToken: token } /*, { resetPasswordExpires: { $gt: Date.now() } }*/);

	if (user == null) {
		console.error('password reset link is invalid or has expired');
		res.status(403).send('password reset link is invalid or has expired');
	} else {
		res.status(200).send({
			name: user.name,
			message: 'password reset link a-ok'
		});
	}
});
//});

router.put('/updatePasswordViaEmail', async (req, res) => {
	const salt = await bcrypt.genSalt(10);

	const user = await User.findOne(
		{ name: req.body.name },
		{ resetPasswordToken: req.body.resetPasswordToken }
		//{ resetPasswordExpires: { /*[Op.gt]*/ $gt: Date.now() } }
	);
	const userid = user._id;

	if (user == null) {
		console.error('password reset link is invalid or has expired');
		res.status(403).send('password reset link is invalid or has expired');
	} else if (user != null) {
		console.log('user exists in db');
		// const salt = await bcrypt.genSalt(10);
		// passwordH = await bcrypt.hash(req.body.password, salt);
		bcrypt.hash(req.body.password, salt);
		passwordH = await bcrypt.hash(req.body.password, salt);

		console.log(userid);
		const body = {
			password: passwordH,
			resetPasswordToken: null,
			resetPasswordExpires: null
		};

		//var updatedUser = await User.findOneAndUpdate(mail, t);
		var x = await User.findByIdAndUpdate(userid, body);

		console.log('password updated');
		res.status(200).send({ message: 'password updated' });
	} else {
		console.error('no user exists in db to update');
		res.status(401).json('no user exists in db to update');
	}
});

module.exports = router;
