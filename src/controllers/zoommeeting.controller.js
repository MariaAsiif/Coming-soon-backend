/**
 * Created by Mb
 */


//import mongoose and models
var mongoose = require('mongoose');

var config = require('dotenv').config();
var multer = require('multer');
const fs = require('fs');
//var notificationCtrl = require("./notifications.controller");

//Lodash for data manipulation
const _ = require('lodash');

//bluebird for promises
const promise = require('bluebird');

//async for async tasks
var async = require('async');

//helper functions
logger = require("../helpers/logger");
const axios = require('axios')
responseHelper = require("../helpers/response.helper");
const zoomauth = require('../middlewares/zoomauth')
//const notificationtexts = require("../hardCodedData").notificationtexts;

var zoomuserInfo = async (req, res) => {
    console.log('request received for zoomuserInfo')
    try {
        var role = req.token_decoded.r
        var token = zoomauth.zoomtoken
        const email = zoomauth.hostemail
        const options = {
            headers: {
                'Authorization': 'Bearer ' + token,
                'User-Agent': 'Zoom-api-Jwt-Request',
                'content-type': 'application/json'
            }
        }

        if (role == '_a') {

            const result = await axios.get("https://api.zoom.us/v2/users/" + email, options)
            var message = "User verified successfully"
            return responseHelper.success(res, result.data, message)
        } else {
            let err = "Unauthorized to create Job Category"
            return responseHelper.requestfailure(res, err)
        }

    } catch (err) {
        logger.error(err)
        responseHelper.requestfailure(res, err)
    }
} //end function

var createZoomMeeting = async (req, res) => {
    try {
        var token = zoomauth.zoomtoken
        const email = zoomauth.hostemail
        const options = req.body

        const headers = {
            headers: {
                'Authorization': 'Bearer ' + token,
                'User-Agent': 'Zoom-api-Jwt-Request',
                'content-type': 'application/json'
            }
        }
        const result = await axios.post("https://api.zoom.us/v2/users/" + email + "/meetings", options, headers);

        var message = "New Meeting created successfully"
        return responseHelper.success(res, result.data, message)



    } catch (error) {
        logger.error(err)
        responseHelper.requestfailure(res, err)
    }
}


module.exports = {
    zoomuserInfo,
    createZoomMeeting
  /* createCategory,
  getCategories,
  updateCategory,
  removeCategory */
};



