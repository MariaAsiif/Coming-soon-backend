/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()
const permit = require('../../middlewares').permit

const controller = require('../../controllers').taskers

router.post('/createTasker', permit(['_a']), controller.createTasker)
router.post('/getTaskersWithFullDetails', permit(['_a']), controller.getTaskersWithFullDetails)
router.post('/updateTasker', permit(['_a']), controller.updateTasker)
router.post('/removeTasker', permit(['_a']), controller.removeTasker)
router.post('/getTaskersList', permit(['_a']), controller.getTaskersList)
router.post('/findTaskerById', permit(['_a']), controller.findTaskerById)


module.exports = router
