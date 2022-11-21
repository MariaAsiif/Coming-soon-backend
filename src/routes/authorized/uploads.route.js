/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()
const permit = require('../../middlewares').permit

const controller = require('../../controllers').uploads

router.post('/uploadSingleFile', permit(['_a']), controller.uploadSingleFile)
router.post('/deleteSingleFile', permit(['_a']), controller.deleteSingleFile)



module.exports = router
