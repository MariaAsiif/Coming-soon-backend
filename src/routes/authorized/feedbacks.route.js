/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()

const controller = require('../../controllers').feedbacks


router.post('/getFeedbacksWithFullDetails', controller.getFeedbacksWithFullDetails)
router.post('/updateFeedback', controller.updateFeedback)
router.post('/removeFeedback', controller.removeFeedback)
router.post('/getFeedbacksList', controller.getFeedbacksList)
router.post('/findFeedbackById', controller.findFeedbackById)


module.exports = router
