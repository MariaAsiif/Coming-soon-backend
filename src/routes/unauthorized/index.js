
 
const express = require('express');
const router = express.Router();

//get defined routes
const userRoutes = require('./user.route')
const jobsRoutes = require("./jobspublic.route")




//call appropriate routes

//Un-restricted routes
router.use ('/users', userRoutes)
router.use ('/jobspublic', jobsRoutes)


module.exports = router;
