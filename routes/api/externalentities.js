const express = require('express');
const router = express.Router();
const validator = require('../../validations/externalentityValidations')
const mongoose = require('mongoose')
const controller = require('../../controllers/externalentityController')
const ExternalEntity = require('../../models/ExternalEntity')

//get all external entities 
router.get('/', async (req,res) => {
    const externalentities = await controller.search()
    return res.json({data:externalentities})
})

//get a specific external entity by Id
router.get('/:id', async (req,res) => {
    const id = req.params.id
    const externalentity= await controller.search('_id',id)
    return res.json({data:externalentity})
    
})

//get a specific external entity by it's name
router.get('/getByExternalEntityName/:Name', async (req,res) => {
    const externalentityname = req.params.Name
    const externalentityRequested = await controller.search('Name',externalentityname)
    return res.json({data: externalentityRequested})
})

//get an external entity by it's api
router.get('/getByExternalEntityApi/:Api', async (req,res) => {
    const externalentityapi = req.params.Api
    const externalentityRequested = await controller.search('Api',externalentityapi)
    return res.json({data: externalentityRequested})
})

//create an external entity 
router.post('/', async (req,res) => {
   var newExternalEntity=await controller.create(req.body)
   if(newExternalEntity.error) res.status(400).send(newExternalEntity)
   return res.json({data:newExternalEntity})
 })

 //update an external entity like the equation to be dynamic as they said
 router.put('/:id', async (req,res) => {
    try {
     const id = req.params.id
     var externalentity = await controller.update('id',id,req.body)
     if(!externalentity) return res.json({msg: 'External Entity does not exist'})
     if (externalentity.error) return res.status(400).send(externalentity)
     else{return res.json({msg: 'External Entity updated successfully',data:externalentity })
     }
    }
    catch(error) {
       
        console.log(error)
    }  
 })
//delete an external entity 
router.delete('/:id', async (req,res) => {
    try {
     const id = req.params.id
     const deletedExternalEntity= await controller.remove('_id',id)
    return res.json({msg:'External Entity was deleted successfully', data: deletedExternalEntity})
    }
    catch(error) {
        console.log(error)
    }  
 })



 module.exports = router;