/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()
const permit = require('../../middlewares').permit

const controller = require('../../controllers').doctorNotes

router.post('/createDoctorNote', permit(['_a']), controller.createDoctorNote)
router.post('/getDoctorNotesWithFullDetails', permit(['_a']), controller.getDoctorNotesWithFullDetails)
router.post('/updateDoctorNote', permit(['_a']), controller.updateDoctorNote)
router.post('/removeDoctorNote', permit(['_a']), controller.removeDoctorNote)
router.post('/getDoctorNotesList', permit(['_a']), controller.getDoctorNotesList)
router.post('/findDoctorNoteById', permit(['_a']), controller.findDoctorNoteById)


module.exports = router
