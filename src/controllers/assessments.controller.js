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


const assessmentHelper = require('../helpers/assessments.helper')

//helper functions
logger = require("../helpers/logger")

responseHelper = require("../helpers/response.helper")

//const notificationtexts = require("../hardCodedData").notificationtexts
const constants = require("../hardCodedData").constants

var pageSize = parseInt(config.PAGE_SIZE)

var createAssessment = async (req, res) => {
    console.log('createAssessment')
    try {
        var assessmentData = req.body
        var role = req.token_decoded.r
        assessmentData.addedby = req.token_decoded.d

        
            var result = await assessmentHelper.createAssessment(assessmentData)
            var message = "Assessment created successfully"
            return responseHelper.success(res, result, message)
        

    } catch (err) {
        logger.error(err)
        responseHelper.requestfailure(res, err)
    }
} //end function


var getAssessmentsWithFullDetails = async (req, res) => {
    console.log("getAssessmentsWithFullDetails called")
    var assessmentData = req.body


    try {

        var result = await assessmentHelper.getAssessmentsWithFullDetails(assessmentData.sortproperty, assessmentData.sortOrder, assessmentData.offset, assessmentData.limit, assessmentData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var getAssessmentsList = async (req, res) => {
    console.log("getAssessmentsList called")
    var assessmentData = req.body


    try {

        var result = await assessmentHelper.getAssessmentsList(assessmentData.sortproperty, assessmentData.sortOrder, assessmentData.offset, assessmentData.limit, assessmentData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var updateAssessment = async (req, res) => {
    console.log("request received for updateAssessment")

    var assessmentData = req.body
    var role = req.token_decoded.r
    try {
        assessmentData.lastModifiedBy = req.token_decoded.d
        
            var result = await assessmentHelper.updateAssessment(assessmentData)
            var message = 'Assessment Updated successfully'
        

        responseHelper.success(res, result, message)
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var removeAssessment = async (req, res) => {
    console.log("removeAssessment called")
    try {
        var role = req.token_decoded.r

       
            var assessmentData = req.body
            assessmentData.lastModifiedBy = req.token_decoded.d
            var result = await assessmentHelper.removeAssessment(assessmentData)

            var message = "Assessment removed successfully"

            if (result == "Assessment does not exists.") {
                message = "Assessment does not exists."
            }
            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }


}

var findAssessmentById = async (req, res) => {
    console.log("findAssessmentById called")
    try {
        var role = req.token_decoded.r

        
            var assessmentData = req.body

            var result = await assessmentHelper.findAssessmentById(assessmentData)
            
            var message = "Assessment find successfully"
            if (result == null) {
                message = "Assessment does not exists."
            }


            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}






module.exports = {
    createAssessment,
    getAssessmentsWithFullDetails,
    getAssessmentsList,
    updateAssessment,
    removeAssessment,
    findAssessmentById

}



