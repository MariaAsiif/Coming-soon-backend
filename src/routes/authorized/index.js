
const express = require('express');
const router = express.Router();

//get defined routes
const usersRoutes = require('./users.route');


//call appropriate routes
router.use ('/users', usersRoutes);

module.exports = router;
