/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()
const permit = require('../../middlewares').permit

const controller = require('../../controllers').appointmentRequests

router.post('/createAppointmentRequest', permit(['_a', '_cst']), controller.createAppointmentRequest)
router.post('/getAppointmentRequestsWithFullDetails', permit(['_a']), controller.getAppointmentRequestsWithFullDetails)
router.post('/updateAppointmentRequest', permit(['_a']), controller.updateAppointmentRequest)
router.post('/removeAppointmentRequest', permit(['_a']), controller.removeAppointmentRequest)
router.post('/getAppointmentRequestsList', permit(['_a']), controller.getAppointmentRequestsList)
router.post('/findAppointmentRequestById', permit(['_a']), controller.findAppointmentRequestById)
router.post('/uploadMedicalImages', permit(['_a', '_cst']), controller.uploadMedicalImages)
router.post('/uploadMedicalVideos', permit(['_a', '_cst']), controller.uploadMedicalVideos)
router.post('/uploadMedicinePrescription', permit(['_a', '_cst']), controller.uploadMedicinePrescription)


module.exports = router
