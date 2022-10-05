/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()
const permit = require('../../middlewares').permit

const controller = require('../../controllers').appointments

router.post('/createAppointment', permit(['_a', '_doc']), controller.createAppointment)
router.post('/getAppointmentsWithFullDetails', permit(['_a', '_doc']), controller.getAppointmentsWithFullDetails)
router.post('/updateAppointment', permit(['_a', '_doc']), controller.updateAppointment)
router.post('/removeAppointment', permit(['_a', '_doc']), controller.removeAppointment)
router.post('/getAppointmentsList', permit(['_a', '_doc']), controller.getAppointmentsList)
router.post('/findAppointmentById', permit(['_a', '_doc']), controller.findAppointmentById)


module.exports = router
