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

router.post('/verifyEmail', async (req, res) => {
	const email = req.body.email;
	// const user = await userController.search('email', email);
	// console.error(req.body.email);

	const token = crypto.randomBytes(20).toString('hex');

	//.update('_id', id, req.body);
	const t = { verifyToken: token };
	const mail = { email: email };

	var updatedUser = await User.findOneAndUpdate(mail, t);

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
		subject: 'Link To verify account',
		text:
			'You are receiving this because you (or someone else) have requested to create an account.\n\n' +
			'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n' +
			`http://localhost:3000/verify/${token}\n\n` + //to work on development uncomment
			//`http://intelligence-summerge.herokuapp.com/verify/${token}\n\n` +			//to work on deployment uncomment
			//`/routes/api/users/reset/${token}\n\n` +
			'If you did not request this, please ignore this email.\n'
	};

	console.log('sending mail');

	transporter.sendMail(mailOptions, (err, response) => {
		if (err) {
			console.error('there was an error: ', err);
			return res.status(400).json('email doesnt exist');
		} else {
			console.log('here is the res: ', response);
			res.status(200).json('verify email sent');
		}
	});
});

router.get('/verify/:token', async (req, res) => {
	const token = req.params.token;
	console.log(token);

	const user = await User.findOne({ verifyToken: token } /*, { resetPasswordExpires: { $gt: Date.now() } }*/);

	if (user == null) {
		console.error('verification link is invalid or has expired');
		res.status(403).send('verification link is invalid or has expired');
	} else {
		res.status(200).send({
			name: user.name,
			message: 'verification link a-ok'
		});
	}
});

router.put('/updateVerify', async (req, res) => {
	const user = await User.findOne(
		// { name: req.body.name },
		{ verifyToken: req.body.verifyToken }
		//{ resetPasswordExpires: { /*[Op.gt]*/ $gt: Date.now() } }
	);
	const userid = user._id;

	if (user == null) {
		console.error('verify link is invalid or has expired');
		res.status(403).send('verify is invalid or has expired');
	} else if (user != null) {
		console.log(userid);
		const body = {
			// expire_at: { expires: 10000 },
			// $set: { 'expires_at.default': undefined },
			$unset: { expire_at: 1, multi: true },
			verifyToken: null,
			isVerified: true
		};

		var x = await User.findByIdAndUpdate(userid, body);
		console.log(x);
		x.save();

		console.log('user updated');
		res.status(200).send({ message: 'User Verified' });
	} else {
		console.error('no user exists in db to update');
		res.status(401).json('no user exists in db to update');
	}
});

module.exports = router;
