/**
 * Created by Jamshaid
 */


//import mongoose and models
var mongoose = require('mongoose')

var config = require('dotenv').config()
//var notificationCtrl = require("./notifications.controller")

//Lodash for data manipulation
const _ = require('lodash')

//bluebird for promises
const promise = require('bluebird')

//async for async tasks
var async = require('async')
var multer = require('multer');
const fs = require('fs');


const feedbackHelper = require('../helpers/feeback.helper')

//helper functions
logger = require("../helpers/logger")

responseHelper = require("../helpers/response.helper")

//const notificationtexts = require("../hardCodedData").notificationtexts
const constants = require("../hardCodedData").constants

var pageSize = parseInt(config.PAGE_SIZE)

var createFeedback = async (req, res) => {
    console.log('createFeedback called')
    var feedbackimg
    let isErr = false
    let errorMessage = ''

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            if (file.fieldname === "feedbackimg") {
                cb(null, './public/uploads/feedbackimages')
            }
        },
        filename: (req, file, cb) => {
            if (file.fieldname === "feedbackimg") {
                feedbackimg = Date.now() + '-' + file.originalname
                cb(null, feedbackimg)
            }
        }
    })

    const upload = multer({
        storage: storage,
        limits: {
            fileSize: 1024 * 1024 * 2
        },
        fileFilter: (req, file, cb) => {
            
            let ext = path.extname(file.originalname);
            
          let extentions = ['.png', '.jpg', '.jpeg', '.gif']
          if (!extentions.includes(ext)){
               
               errorMessage = "Only PNG, JPG, JPEC and GIF Files allowed"
               isErr = true
               
         }
         cb(null, true);
        }
    }).fields(
        [
            {
                name: 'feedbackimg',
                maxCount: 1
            }
        ]
    )

    upload(req, res, async function (err) {
        console.log("upload function called");
        //console.log(err)

        if (err instanceof multer.MulterError) {


            if (err.field == "feedbackimg" && err.code == "LIMIT_UNEXPECTED_FILE") {

                var message = "Only 1 image can be uploaded";

                return res.status(500).json(message)

            } else if (err.field == "feedbackimg" && err.code == "LIMIT_FILE_SIZE") {

                errorMessage = "File Limit is 2 MB";
                
                isErr = true
                
            }



        } else if (err) {
            console.log('erro')
            console.log(err)
            return res.status(500).json(err)
        }
        
        if(isErr){
            
               responseHelper.requestfailure(res, errorMessage)
        }else

        {userData = JSON.parse(req.body.request);


        userData.imageUrl = '/uploads/feedbackimages/' + feedbackimg

        try {
            var result = await feedbackHelper.createFeedback(userData)

            res.mailer.send('emails/feedback.html', {
                user: userData.userName,
                feedback: userData.feedbackDescription,
                customeremail: userData.userEmail,
                title: 'Feedback',   //project.title
                to: process.env.FEEDBACK_EMAIL, // REQUIRED. This can be a comma delimited string just like a normal email to field.
                subject: 'Feedback', // REQUIRED.
            }, function (err) {
                if (err) {
                    return console.error("Email could not sent: ", err)
                }
                /* var message = "Client's Feedback successfully sent to Admin";
                return responseHelper.success(res, {}, message); */
            })



                var message = "Feedback created successfully"
                return responseHelper.success(res, result, message)
            
    
        } catch (err) {

            try {
                fs.unlinkSync('./public//uploads/feedbackimages/' + feedbackimg);
            } catch (err) {
                responseHelper.requestfailure(res, err);

            }

            logger.error(err)
            responseHelper.requestfailure(res, err)
        }



        }

    })
    
} //end function


var getFeedbacksWithFullDetails = async (req, res) => {
    console.log("getFeedbacksWithFullDetails called")
    var feedbackData = req.body


    try {

        var result = await feedbackHelper.getFeedbacksWithFullDetails(feedbackData.sortproperty, feedbackData.sortorder, feedbackData.offset, feedbackData.limit, feedbackData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var getFeedbacksList = async (req, res) => {
    console.log("getFeedbacksList called")
    var feedbackData = req.body


    try {

        var result = await feedbackHelper.getFeedbacksList(feedbackData.sortproperty, feedbackData.sortorder, feedbackData.offset, feedbackData.limit, feedbackData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var updateFeedback = async (req, res) => {
    console.log("request received for updateFeedback")

    var feedbackData = req.body
    var role = req.token_decoded.r
    try {
        feedbackData.lastModifiedBy = req.token_decoded.d
        if (role == '_a') {
            var result = await feedbackHelper.updateFeedback(feedbackData)
            var message = 'Feedback Updated successfully'
        } else {
            let err = "Unauthorized to Update Feedback"
            return responseHelper.requestfailure(res, err)
        }

        responseHelper.success(res, result, message)
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var removeFeedback = async (req, res) => {
    console.log("removeFeedback called")
    try {
        var role = req.token_decoded.r

        if (role == "_a") {
            var feedbackData = req.body
            feedbackData.lastModifiedBy = req.token_decoded.d
            var result = await feedbackHelper.removeFeedback(feedbackData)

            var message = "Feedback removed successfully"

            if (result == "Feedback does not exists.") {
                message = "Feedback does not exists."
            }
            return responseHelper.success(res, result, message)
        } else {
            var error = "Only Admin can remove a Feedback"
            responseHelper.requestfailure(res, error)
        }
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }


}

var findFeedbackById = async (req, res) => {
    console.log("findFeedbackById called")
    try {
        var role = req.token_decoded.r

        if (role == "_a") {
            var feedbackData = req.body

            var result = await feedbackHelper.findFeedbackById(feedbackData)
            console.log(result)
            var message = "Feedback find successfully"
            if (result == null) {
                message = "Feedback does not exists."
            }


            return responseHelper.success(res, result, message)
        } else {
            var error = "Only Admin can find a Feedback"
            responseHelper.requestfailure(res, error)
        }
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}






module.exports = {
    createFeedback,
    getFeedbacksWithFullDetails,
    getFeedbacksList,
    updateFeedback,
    removeFeedback,
    findFeedbackById

}



