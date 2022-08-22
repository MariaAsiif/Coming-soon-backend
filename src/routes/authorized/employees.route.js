

const express = require('express')
const router = express.Router()

const controller = require('../../controllers').employees


router.post('/createEmployee', controller.createEmployee)

module.exports = router;
