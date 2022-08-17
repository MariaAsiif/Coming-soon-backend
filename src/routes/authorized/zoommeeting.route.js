/**
 * Created by Jamshaid
 */
 
const express = require('express')
const router = express.Router()

const controller = require('../../controllers').zoommeetings

router.post('/zoomuserInfo', controller.zoomuserInfo)
router.post('/createZoomMeeting', controller.createZoomMeeting)

module.exports = router;
