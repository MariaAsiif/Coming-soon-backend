/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()


const controller = require('../../controllers').uploads

router.post('/uploadSingleFilePublic', controller.uploadSingleFilePublic)



module.exports = router
