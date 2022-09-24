
 
const express = require('express');
const router = express.Router();

//get defined routes
const userRoutes = require('./user.route')
const jobsRoutes = require("./jobspublic.route")
const quotesRoutes = require('./quotes.route')
const feedbackRoutes = require('./feedbacks.route')
const verificationRoutes = require('./verifications.route')
const locateServicesRoutes = require('./services.route')
const tickerRoutes = require('./tickers.route')
const phonebookRoutes = require('./phonebooks.route')
const termsRoutes = require('./termsconditions.route')
const rolesRoutes = require('./roles.route')
const productsRoutes = require('./products.route')


//call appropriate routes

//Un-restricted routes
router.use ('/users', userRoutes)
router.use ('/jobspublic', jobsRoutes)
router.use ('/quotes', quotesRoutes)
router.use ('/feedbacks', feedbackRoutes)
router.use ('/verifications', verificationRoutes)
router.use ('/locateservices', locateServicesRoutes)
router.use ('/tickers', tickerRoutes)
router.use ('/phonebooks', phonebookRoutes)
router.use ('/terms', termsRoutes)
router.use ('/roles', rolesRoutes)
router.use('/productspublic', productsRoutes)


module.exports = router;
