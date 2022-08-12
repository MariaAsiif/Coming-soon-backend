
 
const express = require('express')
const router = express.Router()

const controller = require('../../controllers').jobs


router.post('/createjob', controller.createjob)
router.post('/updatejob', controller.updatejob)
router.post('/listjobs', controller.listjobs)
router.post('/applyForJob', controller.applyForJob)
router.post('/changejobstatus', controller.changejobstatus)

module.exports = router;
