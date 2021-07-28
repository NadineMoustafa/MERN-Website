const nodemailer = require('nodemailer');
const extrernalEntitiesController = require('../controllers/externalentityController');

var auth = {
	type: 'oauth2',
	user: 'summegreintelligence@gmail.com',
	clientId: '1016590334455-l7nrah3969t7j8ce54rf12uia8eh2ivn.apps.googleusercontent.com',
	clientSecret: 'aaC8Y_TckaxQ3_3Z4DBHD_mU',
	refreshToken: '1/GyqbA74G9FEW6hII-VA3_WRp2rcVgQf9OKOXUS6m_tVPKErOSv6kOSFIiAuR_JeF',
	accessToken:
		'ya29.GlvcBqejGL6ioGeIM-gFVzcKXXjoCyp34KR2CHC1_esF4RBrPjZnAv7cVa3mXd2SD_2NJ_9tkA2OyYwD0xnDegH1jvnmNrW4S8zTohmedc5PlS2Gyf4MgLOYU1EP'
};

exports.notifyUserForFormUpdates = async function(User, Form) {
	var mails = User.mail;
	var mailOptions = {
		from: 'Notification Regarding Your Case <summergeintelligence@gmail.com>',
		subject: 'Updates!!',
		to: mails,
		text: 'Your Case for Company ' + Form.companyName + ' have some updates, Go and check it'
	};
	var transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: auth
	});
	//Mail is sent but I can't get any value back to show in test
	try {
		var returnValue = await transporter.sendMail(mailOptions);
		return returnValue;
	} catch (error) {
		return error;
	}
};

exports.notifyExternalEntities = async function(form) {
	var externalEntities = await extrernalEntitiesController.search();
	var mail = [];
	var error = [];
	for (i = 0; i < externalEntities.length; i++) {
		var mails = externalEntities[i].Email;
		var mailOptions = {
			from: 'New Company <summergeintelligence@gmail.com>',
			subject: 'Updates!!',
			to: mails,
			text: form.companyName + 'has been established today'
		};

		var transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: auth
		});
		try {
			var returned = await transporter.sendMail(mailOptions);
			mail.push(returned);
		} catch (err) {
			error.push(err);
		}
	}
	return { mail: mail, error: error };
};
