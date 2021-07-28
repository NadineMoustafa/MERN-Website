const express = require('express');
const router = express.Router();
const Governorate = require('../../models/Governorate');
const governorateController = require('../../controllers/governorateController');

//testing
//Regarding the drop down list

//get all governorates
router.get('/', async (req, res) => {
	const governorates = await Governorate.find();
	res.json({ data: governorates });
});
//get all governoratesCities
router.get('/getByGovernorateName/:name', async (req, res) => {
	const name2 = req.params.name;
	const govRequested = await governorateController.search('name', name2);
	return res.json({ data: govRequested.cities });
});

//create a new governorate
router.post('/', async (req, res) => {
	try {
		const newGovernorate = await Governorate.create(req.body);
		res.json({ msg: 'Governorate was created successfully', data: newGovernorate });
	} catch (error) {
		console.log(error);
	}
});
router.put('/:id', async (req, res) => {
	try {
		const governorates = await Governorate.find();
		res.json({ msg: 'Governorate was created successfully', data: newGovernorate });
	} catch (error) {
		console.log(error);
	}
});

//delete a certain governorate
router.delete('/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const deletedGovernorate = await Governorate.findByIdAndRemove(id);
		res.json({ msg: 'Governorate was deleted successfully', data: deletedGovernorate });
	} catch (error) {
		console.log(error);
	}
});
module.exports = router;
