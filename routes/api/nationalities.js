const express = require('express');
const router = express.Router();

const Nationality = require('../../models/Nationality');

//Regarding the drop down list

//get all nationalities
router.get('/', async (req,res) => {
    const nationalities = await Nationality.find()
    res.json({data: nationalities})
})

//create a new nationality
router.post('/', async (req,res) => {
    try {
     const newNationality = await Nationality.create(req.body)
     res.json({msg:'Nationality was created successfully', data: newNationality})
    }
    catch(error) {
        console.log(error)
    }  
 })
 
 //delete a certain nationality
 router.delete('/:id', async (req,res) => {
    try {
     const id = req.params.id
     const deletedNationality = await Nationality.findByIdAndRemove(id)
     res.json({msg:'Nationality was deleted successfully', data: deletedNationality})
    }
    catch(error) {
    
        console.log(error)
    }  
})

module.exports = router;