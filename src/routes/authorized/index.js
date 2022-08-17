
const express = require('express')
const router = express.Router()

//get defined routes
const usersRoutes = require('./users.route')
const jobCategoriesRoutes = require('./categories.route')
const jobsRoutes = require('./jobs.route')
const interviewRoutes = require('./interviews.route')
const zoomMeetingRoutes = require('./zoommeeting.route')


//call appropriate routes
router.use ('/users', usersRoutes)
router.use('/jobcategories', jobCategoriesRoutes)
router.use ('/jobs', jobsRoutes)
router.use ('/interviews', interviewRoutes)
router.use ('/zoommeetings', zoomMeetingRoutes)

module.exports = router
