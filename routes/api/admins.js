// Dependencies
const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const validator = require('../../validations/adminValidations');
const adminController = require('../../controllers/adminController');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const tokenKey = require('../../config/keys').secretOrKey;
// Models
const Admin = require('../../models/Admin');

const dynamicFormController = require('../../controllers/dynamicFormController');

const passport = require('passport');
require('../../config/passport')(passport);
//       for testing!!!!!!!!
// router.get('/getInvestorName',passport.authenticate('jwt', {session: false}) ,async (req,res) => {
//     // You can access the logged in user through req.user
//     // Add your authorization rules accordingly
//     const userid=req.user.id
//     const user= await userController.search('_id',userid)
//     const name= user.name
//     return res.json({ data: name  });

//     // return res.json({data: req.user})

// })

//get by ID
router.get('/getById/', passport.authenticate('jwt', { session: false }), async (req, res) => {
	var admin = await adminController.search('id', req.user.id);
	return res.json({ data: admin });
});
router.get('/CertainAttributes', passport.authenticate('jwt', { session: false }), async (req, res) => {
	const userid = req.user.id;
	const searchUsers = await adminController.search('id', userid);
	return res.json({
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
		Fax: searchUsers.fax
	});
});

// get all admins
router.get('/', async (
	req,
	res //redundant
) => {
	const admin = await adminController.search();
	return res.json({ data: admin });
});

//create admin           //not sure about it
router.post('/createAdmin', async (req, res) => {
	const newAdmin = await adminController.create(req.body);
	return res.json({ data: newAdmin });
});

// sort cases by id
router.get('/CasesSortedById', passport.authenticate('jwt', { session: false }), async (req, res) => {
	if (req.user.userType === 'Admin') {
		var forms = await dynamicFormController.search();
		if (forms.error) return res.status(400).json({ error: forms.error });
		forms.sort(adminController.compareById);
		return res.json({ data: forms });
	} else {
		return res.json({ msg: 'Non Authorized' });
	}
});

// sort cases by creation date
router.get('/CasesSortedByCreationDate', passport.authenticate('jwt', { session: false }), async (req, res) => {
	if (req.user.userType === 'Admin') {
		var forms = await dynamicFormController.search();
		if (forms.error) return res.status(400).json({ error: forms.error });
		forms.sort(adminController.compare);
		return res.json({ data: forms });
	} else {
		return res.json({ msg: 'Non Authorized' });
	}
});

//get case/form by company name
router.get('/getByCompanyName/:companyName', passport.authenticate('jwt', { session: false }), async (req, res) => {
	if (req.user.userType === 'Admin') {
		const companyname = req.params.companyName;
		var form = await dynamicFormController.search('companyName', companyname);
		if (form.error) return res.status(400).json({ error: form.error });
		return res.json({ data: form });
	} else {
		return res.json({ msg: 'Non Authorized' });
	}
});

// update an admin
router.put('/updateAdmin', passport.authenticate('jwt', { session: false }), async (req, res) => {
	const id = req.user.id;
	if (req.user.userType === 'Admin') {
		var admin = await adminController.update('id', id, req.body);
		if (!admin) return res.json({ msg: 'ID not there' });
		if (admin.error) return res.status(400).send(admin);
		return res.json({ msg: 'Admin updated successfully', data: admin });
	} else {
		return res.json({ msg: 'Non Authorized' });
	}
});

//delete an admin               //redundant
router.delete('/:id', async (req, res) => {
	try {
		const adminId = req.params.id;
		const deletedAdmin = await adminController.remove('id', adminId);
		if (!deletedAdmin) return res.json({ msg: 'ID not there' });
		return res.json({
			msg: 'Admin was deleted successfully',
			data: deletedAdmin
		});
	} catch (error) {
		console.log(error);
	}
});

router.post('/registerR', passport.authenticate('jwt', { session: false }), async (req, res) => {
	//register lawyer or reviewer
	if (req.user.userType === 'Admin') {
		const newUser = await adminController.registerReviewer(req.body);
		if (newUser.error) return res.status(400).json(newUser.error);
		return res.json({
			msg: 'Account was created successfully',
			data: newUser
		});
	} else {
		return res.json({ msg: 'Non Authorized' });
	}
});

router.post('/registerL', passport.authenticate('jwt', { session: false }), async (req, res) => {
	//register lawyer or reviewer
	if (req.user.userType === 'Admin') {
		const newUser = await adminController.registerLawyer(req.body);
		if (newUser.error) return res.status(400).json(newUser.error);
		return res.json({
			msg: 'Account was created successfully',
			data: newUser
		});
	} else {
		return res.json({ msg: 'Non Authorized' });
	}
});

//Login
router.post('/login', async (req, res) => {
	try {
		const email = req.body.email;
		const password = req.body.password;
		const admin = await Admin.findOne({ email });
		if (!admin) return res.status(404).json({ email: 'This email is not registered yet' });
		const doesItMatch = await bcrypt.compareSync(password, admin.password);
		if (doesItMatch) {
			const payload = {
				id: admin.id,
				name: admin.name,
				email: admin.email
			};
			const token = jwt.sign(payload, tokenKey, { expiresIn: '1h' });
			res.json({ data: `Bearer ${token}` });
			return res.json({ msg: 'You are logged in now', data: 'Token' });
		} else return res.status(400).send({ password: 'Wrong password' });
	} catch (e) {}
});

module.exports = router;
