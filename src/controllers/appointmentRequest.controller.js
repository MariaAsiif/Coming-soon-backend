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


const appointmentRequestHelper = require('../helpers/appointmentRequests.helper')
const customerHelper = require('../helpers/customers.helper')

//helper functions
logger = require("../helpers/logger")

responseHelper = require("../helpers/response.helper")

//const notificationtexts = require("../hardCodedData").notificationtexts
const constants = require("../hardCodedData").constants

var pageSize = parseInt(config.PAGE_SIZE)

var createPublicAppointmentRequest = async (req, res) => {
    console.log('createAppointmentRequest called')
    var medicalfile
    let isErr = false
    let errorMessage = ''

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            if (file.fieldname === "medicalfile") {
                cb(null, './public/uploads/medicalfiles')
            }
        },
        filename: (req, file, cb) => {
            if (file.fieldname === "medicalfile") {
                medicalfile = Date.now() + '-' + file.originalname
                cb(null, medicalfile)
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
                name: 'medicalfile',
                maxCount: 1
            }
        ]
    )

    upload(req, res, async function (err) {
        console.log("upload function called");
        //console.log(err)

        if (err instanceof multer.MulterError) {


            if (err.field == "medicalfile" && err.code == "LIMIT_UNEXPECTED_FILE") {

                errorMessage = "Only 1 image can be uploaded";
                isErr = true
                //return res.status(500).json(message)

            } else if (err.field == "medicalfile" && err.code == "LIMIT_FILE_SIZE") {

                errorMessage = "File Limit is 2 MB";
                
                isErr = true
                
            }



        } else if (err) {
            console.log('erro')
            console.log(err)
            return res.status(500).json(err)
        }
        
        if(isErr){
            
            if(errorMessage == "File Limit is 2 MB"){
                return responseHelper.requestfailure(res, errorMessage)
            } else if(errorMessage == "Only 1 image can be uploaded"){
                return responseHelper.requestfailure(res, errorMessage)
            }
            
            try {
                fs.unlinkSync('./public/uploads/medicalfiles/' + medicalfile);
            } catch (err) {
              return  responseHelper.requestfailure(res, err);

            }
            return responseHelper.requestfailure(res, errorMessage)
        }else

        {userData = JSON.parse(req.body.request);


       //userData.imageUrl = '/uploads/medicalfiles/' + medicalfile

        try {
            if(medicalfile !== undefined){
                userData.imageUrl = '/uploads/medicalfiles/' +medicalfile;
            }
            var result = await appointmentRequestHelper.createAppointmentRequest(userData)

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



                var message = "AppointmentRequest created successfully"
                return responseHelper.success(res, result, message)
            
    
        } catch (err) {

            try {
                fs.unlinkSync('./public/uploads/medicalfiles/' + medicalfile);
            } catch (err) {
                return  responseHelper.requestfailure(res, err);

            }

            logger.error(err)
            return responseHelper.requestfailure(res, err)
        }



        }

    })
    
} //end function

var createAppointmentRequest = async (req, res) => {
    console.log('createAppointmentRequest called')
    var medicalfile
    var picturefiles = []
    let isErr = false
    let errorMessage = ''

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            console.log("storage called")
            if (file.fieldname === "medicalfile") {
                cb(null, './public/uploads/medicalfiles')
            } else if (file.fieldname === "pictures") {
                cb(null, './public/uploads/medicalfiles')
            }
        },
        filename: (req, file, cb) => {
            if (file.fieldname === "medicalfile") {
                medicalfile = Date.now() + '-' + file.originalname
                cb(null, medicalfile)
            } else if(file.fieldname === "pictures") {
                console.log("pictures")
                console.log(file.originalname)
                let filenew = Date.now() + '-' + file.originalname
                console.log(filenew)
                picturefiles.push(filenew )
                cb(null, filenew)
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
            
          let extentions = ['.png', '.jpg', '.jpeg', '.gif', '.pdf']
          if (!extentions.includes(ext)){
               
               errorMessage = "Only PNG, JPG, JPEC, PDF and GIF Files allowed"
               isErr = true
               
         }
         cb(null, true);
        }
    }).fields(
        [
            {
                name: 'medicalfile',
                maxCount: 1
            },
            {
                name: 'pictures',
                maxCount: 3
            }
        ]
    )

    upload(req, res, async function (err) {
        console.log("upload function called");
        console.log(picturefiles)

        if (err instanceof multer.MulterError) {


            if (err.field == "medicalfile" && err.code == "LIMIT_UNEXPECTED_FILE") {

                errorMessage = "Only 1 image can be uploaded";
                isErr = true
                //return res.status(500).json(message)

            } else if (err.field == "medicalfile" && err.code == "LIMIT_FILE_SIZE") {

                errorMessage = "File Limit is 2 MB";
                
                isErr = true
                
            }



        } else if (err) {
            console.log('erro')
            console.log(err)
            return res.status(500).json(err)
        }
        
        if(isErr){
            if(errorMessage == "File Limit is 2 MB"){
                return responseHelper.requestfailure(res, errorMessage)
            } else if(errorMessage == "Only 1 image can be uploaded"){
                return responseHelper.requestfailure(res, errorMessage)
            }
            
            try {
                fs.unlinkSync('./public/uploads/medicalfiles/' + medicalfile);
            } catch (err) {
              return  responseHelper.requestfailure(res, err);

            }
            return responseHelper.requestfailure(res, errorMessage)
        }else

        {userData = JSON.parse(req.body.request);


        //userData.imageUrl = '/uploads/medicalfiles/' + medicalfile

        try {
            if(medicalfile !== undefined){
                userData.imageUrl = '/uploads/medicalfiles/' +medicalfile;
            }

            let pictures = []

            if(picturefiles.length !== 0){
                
                picturefiles.map(pic => {
                    userData. pictures.push('/uploads/medicalfiles/' +pic)
                })

                //userData.pictures = pictures
            }

            
            var adminid = req.token_decoded.d
            userData.addedby = adminid

            

            let {customerfields} = userData
            customerfields.customerid = userData.customer
            

            await customerHelper.updateCustomer(customerfields)

             result = await appointmentRequestHelper.createAppointmentRequest(userData)

            
                var message = "AppointmentRequest created successfully"
                return responseHelper.success(res, {}, message)
            
    
        } catch (err) {

            try {
                fs.unlinkSync('./public/uploads/medicalfiles/' + medicalfile);
            } catch (err) {
                responseHelper.requestfailure(res, err);

            }

            logger.error(err)
            responseHelper.requestfailure(res, err)
        }



        }

    })
    
} //end function

var createTestAppointmentRequest = async (req, res) => {
    console.log("createTestAppointmentRequest called")
    try {
        /* if(medicalfile !== undefined){
            userData.imageUrl = '/uploads/medicalfiles/' +medicalfile;
        } */
        //var userData = JSON.parse(req.body.request)
        console.log('userdata')
        var appointmentData = req.body
        console.log(appointmentData)
        var adminid = req.token_decoded.d
        appointmentData.addedby = adminid

        //await customerHelper.updateCustomer
        var result = await appointmentRequestHelper.createAppointmentRequest(appointmentData)

        var message = 'Appointment Request Submitted Successfully'

        responseHelper.success(res, result, message)
    }catch (err) {

        responseHelper.requestfailure(res, err)
    }
} //end function


var getAppointmentRequestsWithFullDetails = async (req, res) => {
    console.log("getAppointmentRequestsWithFullDetails called")
    var appointmentData = req.body


    try {

        var result = await appointmentRequestHelper.getAppointmentRequestsWithFullDetails(appointmentData.sortproperty, appointmentData.sortorder, appointmentData.offset, appointmentData.limit, appointmentData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var getAppointmentRequestsList = async (req, res) => {
    console.log("getAppointmentRequestsList called")
    var appointmentData = req.body


    try {

        var result = await appointmentRequestHelper.getAppointmentRequestsList(appointmentData.sortproperty, appointmentData.sortorder, appointmentData.offset, appointmentData.limit, appointmentData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var updateAppointmentRequest = async (req, res) => {
    var medicalfile
    let isErr = false
    let errorMessage = ''

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            if (file.fieldname === "medicalfile") {
                cb(null, './public/uploads/medicalfiles')
            }
        },
        filename: (req, file, cb) => {
            if (file.fieldname === "medicalfile") {
                medicalfile = Date.now() + '-' + file.originalname
                cb(null, medicalfile)
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
                name: 'medicalfile',
                maxCount: 1
            }
        ]
    )

    upload(req, res, async function (err) {
        console.log("upload function called");
        //console.log(err)

        if (err instanceof multer.MulterError) {


            if (err.field == "medicalfile" && err.code == "LIMIT_UNEXPECTED_FILE") {

                errorMessage = "Only 1 image can be uploaded";
                isErr = true
                //return res.status(500).json(message)

            } else if (err.field == "medicalfile" && err.code == "LIMIT_FILE_SIZE") {

                errorMessage = "File Limit is 2 MB";
                
                isErr = true
                
            }



        } else if (err) {
            console.log('erro')
            console.log(err)
            return res.status(500).json(err)
        }
        
        if(isErr){
            if(errorMessage == "File Limit is 2 MB"){
                return responseHelper.requestfailure(res, errorMessage)
            } else if(errorMessage == "Only 1 image can be uploaded"){
                return responseHelper.requestfailure(res, errorMessage)
            }
            
            try {
                fs.unlinkSync('./public/uploads/medicalfiles/' + medicalfile);
            } catch (err) {
              return  responseHelper.requestfailure(res, err);

            }
            return responseHelper.requestfailure(res, errorMessage)
        }else

        {userData = JSON.parse(req.body.request);


        //userData.imageUrl = '/uploads/medicalfiles/' + medicalfile

        try {

            if(medicalfile !== undefined){
                userData.imageUrl = '/uploads/medicalfiles/' +medicalfile;
            }

            var adminid = req.token_decoded.d
            userData.lastModifiedBy = adminid

            let existingFB = await AppointmentRequest.findById(userData.AppointmentRequestid)

            if(medicalfile !== undefined && existingFB.imageUrl !== '') {
                const imgpath = './public/' + existingFB.imageUrl;
                    try {
                    fs.unlinkSync(imgpath);
                    } catch(err) {
                        console.log('Error Deleting old, probably already removed');
                        return responseHelper.requestfailure(res, err);
                    }
                }

            var result = await appointmentRequestHelper.updateAppointmentRequest(userData)

            
                var message = "AppointmentRequest updated successfully"
                return responseHelper.success(res, result, message)
            
    
        } catch (err) {

            try {
                fs.unlinkSync('./public/uploads/medicalfiles/' + medicalfile);
            } catch (err) {
                responseHelper.requestfailure(res, err);

            }

            logger.error(err)
            responseHelper.requestfailure(res, err)
        }



        }

    })
  }
/* 
var updateAppointmentRequestOld = async (req, res) => {
    console.log("request received for updateAppointmentRequest")

    var appointmentData = req.body
    var role = req.token_decoded.r
    try {
        appointmentData.lastModifiedBy = req.token_decoded.d
        if (role == '_a') {
            var result = await appointmentRequestHelper.updateAppointmentRequest(appointmentData)
            var message = 'AppointmentRequest Updated successfully'
        } else {
            let err = "Unauthorized to Update AppointmentRequest"
            return responseHelper.requestfailure(res, err)
        }

        responseHelper.success(res, result, message)
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}
 */
var removeAppointmentRequest = async (req, res) => {
    console.log("removeAppointmentRequest called")
    try {
        var role = req.token_decoded.r

        if (role == "_a") {
            var appointmentData = req.body
            appointmentData.lastModifiedBy = req.token_decoded.d
            var result = await appointmentRequestHelper.removeAppointmentRequest(appointmentData)

            var message = "AppointmentRequest removed successfully"

            if (result == "AppointmentRequest does not exists.") {
                message = "AppointmentRequest does not exists."
            }
            return responseHelper.success(res, result, message)
        } else {
            var error = "Only Admin can remove a AppointmentRequest"
            responseHelper.requestfailure(res, error)
        }
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }


}

var findAppointmentRequestById = async (req, res) => {
    console.log("findAppointmentRequestById called")
    try {
        var role = req.token_decoded.r

        if (role == "_a") {
            var appointmentData = req.body

            var result = await appointmentRequestHelper.findAppointmentRequestById(appointmentData)
            console.log(result)
            var message = "AppointmentRequest find successfully"
            if (result == null) {
                message = "AppointmentRequest does not exists."
            }


            return responseHelper.success(res, result, message)
        } else {
            var error = "Only Admin can find a AppointmentRequest"
            responseHelper.requestfailure(res, error)
        }
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}






module.exports = {
    createPublicAppointmentRequest,
    createAppointmentRequest,
    getAppointmentRequestsWithFullDetails,
    getAppointmentRequestsList,
    updateAppointmentRequest,
    removeAppointmentRequest,
    findAppointmentRequestById,
    createTestAppointmentRequest

}



