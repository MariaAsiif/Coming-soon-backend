/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()
const permit = require('../../middlewares').permit

const controller = require('../../controllers').symptoms

router.post('/createSymptom', permit(['_a']), controller.createSymptom)
router.post('/getSymptomsWithFullDetails', permit(['_a']), controller.getSymptomsWithFullDetails)
router.post('/updateSymptom', permit(['_a']), controller.updateSymptom)
router.post('/removeSymptom', permit(['_a']), controller.removeSymptom)
router.post('/getSymptomsList', permit(['_a']), controller.getSymptomsList)
router.post('/findSymptomById', permit(['_a']), controller.findSymptomById)


module.exports = router
