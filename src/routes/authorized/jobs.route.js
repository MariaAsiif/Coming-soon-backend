
 
const express = require('express')
const router = express.Router()

const controller = require('../../controllers').jobs


router.post('/createjob', controller.createjob)
router.post('/updatejob', controller.updatejob)
router.post('/listjobs', controller.listjobs)
router.post('/applyForJob', controller.applyForJob)
router.post('/addApprovedApplicants', controller.addApprovedApplicants)
router.post('/getApprovedApplicants', controller.getApprovedApplicants)
router.post('/addSelectedApplicant', controller.addSelectedApplicant)
router.post('/changejobstatus', controller.changejobstatus)

module.exports = router;
