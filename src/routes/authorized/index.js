
const express = require('express')
const router = express.Router()

//get defined routes
const usersRoutes = require('./users.route')
const jobCategoriesRoutes = require('./categories.route')
const jobsRoutes = require('./jobs.route')
const interviewRoutes = require('./interviews.route')
const zoomMeetingRoutes = require('./zoommeeting.route')
const recruitmentRoutes = require('./recruitments.route')
const employeeRoutes = require('./employees.route')
const departmentRoutes = require('./departments.route')
const quotesRoutes = require('./quotes.route')
const tickerRoutes = require('./tickers.route')
const feedbackRoutes = require('./feedbacks.route')
const permissionRoutes = require('./permissions.route')
const rolesRoutes = require('./roles.route')
const locateServicesRoutes = require('./services.route')
const phoneBookRoutes = require('./phonebook.route')
const termsRoutes = require('./termsconditions.route')
const serviceCategoryRoutes = require('./servicecategories.route')
const zohoRoutes = require('./zoho.route')


//call appropriate routes
router.use ('/users', usersRoutes)
router.use('/jobcategories', jobCategoriesRoutes)
router.use ('/jobs', jobsRoutes)
router.use ('/interviews', interviewRoutes)
router.use ('/zoommeetings', zoomMeetingRoutes)
router.use ('/recruitments', recruitmentRoutes)
router.use ('/employees', employeeRoutes)

router.use ('/departmens', departmentRoutes)
router.use ('/quotes', quotesRoutes)

router.use ('/tickers', tickerRoutes)
router.use ('/feedbacks', feedbackRoutes)
router.use ('/permissions', permissionRoutes)
router.use ('/roles', rolesRoutes)
router.use ('/locateservices', locateServicesRoutes)
router.use ('/phonebooks', phoneBookRoutes)
router.use ('/terms', termsRoutes)
router.use ('/servicecategories', serviceCategoryRoutes)
router.use ('/zoho', zohoRoutes)


module.exports = router
