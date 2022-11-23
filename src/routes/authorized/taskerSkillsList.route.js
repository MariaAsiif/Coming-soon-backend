/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()
const permit = require('../../middlewares').permit

const controller = require('../../controllers').taskerSkillsList

router.post('/createTaskerSkillsList', permit(['_a']), controller.createTaskerSkillsList)
router.post('/getTaskerSkillsListsWithFullDetails', permit(['_a']), controller.getTaskerSkillsListWithFullDetails)
router.post('/updateTaskerSkillsList', permit(['_a']), controller.updateTaskerSkillsList)
router.post('/removeTaskerSkillsList', permit(['_a']), controller.removeTaskerSkillsList)
router.post('/getTaskerSkillsList', permit(['_a']), controller.getTaskerSkillsList)
router.post('/findTaskerSkillsListById', permit(['_a']), controller.findTaskerSkillsListById)


module.exports = router
