/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()
const permit = require('../../middlewares').permit

const controller = require('../../controllers').assessments

router.post('/createAssessment', permit(['_a']), controller.createAssessment)
router.post('/getAssessmentsWithFullDetails', permit(['_a']), controller.getAssessmentsWithFullDetails)
router.post('/updateAssessment', permit(['_a']), controller.updateAssessment)
router.post('/removeAssessment', permit(['_a']), controller.removeAssessment)
router.post('/getAssessmentsList', permit(['_a']), controller.getAssessmentsList)
router.post('/findAssessmentById', permit(['_a']), controller.findAssessmentById)


module.exports = router
