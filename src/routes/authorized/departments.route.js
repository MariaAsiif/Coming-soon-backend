/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()

const controller = require('../../controllers').departments

router.post('/createDepartment', controller.createDepartment)
router.post('/getDepartmentsWithFullDetails', controller.getDepartmentsWithFullDetails)
router.post('/updateDepartment', controller.updateDepartment)
router.post('/removeDepartment', controller.removeDepartment)
router.post('/getDepartmentsList', controller.getDepartmentsList)
router.post('/findDepartmentById', controller.findDepartmentById)
router.post('/addDepartmentHead', controller.addDepartmentHead)
router.post('/removeDepartmentHead', controller.removeDepartmentHead)
router.post('/addSingleEmployeeToDepartment', controller.addSingleEmployeeToDepartment)
router.post('/addEmployeesToDepartment', controller.addEmployeesToDepartment)

module.exports = router
