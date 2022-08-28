
 
const express = require('express');
const router = express.Router();

//get defined routes
const userRoutes = require('./user.route')
const jobsRoutes = require("./jobspublic.route")
const quotesRoutes = require('./quotes.route')
const feedbackRoutes = require('./feedbacks.route')
const verificationRoutes = require('./verifications.route')




//call appropriate routes

//Un-restricted routes
router.use ('/users', userRoutes)
router.use ('/jobspublic', jobsRoutes)
router.use ('/quotes', quotesRoutes)
router.use ('/feedbacks', feedbackRoutes)
router.use ('/verifications', verificationRoutes)

module.exports = router;
