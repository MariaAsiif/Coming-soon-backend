/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()
const permit = require('../../middlewares').permit

const controller = require('../../controllers').assessmentAttempts

router.post('/createAssessmentAttempt', permit(['_a']), controller.createAssessmentAttempt)
router.post('/getAssessmentAttemptsWithFullDetails', permit(['_a']), controller.getAssessmentAttemptsWithFullDetails)
router.post('/updateAssessmentAttempt', permit(['_a']), controller.updateAssessmentAttempt)
router.post('/removeAssessmentAttempt', permit(['_a']), controller.removeAssessmentAttempt)
router.post('/getAssessmentAttemptsList', permit(['_a']), controller.getAssessmentAttemptsList)
router.post('/findAssessmentAttemptById', permit(['_a']), controller.findAssessmentAttemptById)


module.exports = router
