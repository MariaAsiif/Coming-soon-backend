/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()

const controller = require('../../controllers').feedbacks

router.post('/createFeedback', controller.createFeedback)



module.exports = router
