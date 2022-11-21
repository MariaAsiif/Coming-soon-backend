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

const assessmentAttemptHelper = require('../helpers/assessmentAttempts.helper')
const industryHelper = require('../helpers/industries.helper')
const Industry = mongoose.model('industries')

//helper functions
logger = require("../helpers/logger")

responseHelper = require("../helpers/response.helper")

//const notificationtexts = require("../hardCodedData").notificationtexts
const constants = require("../hardCodedData").constants

var pageSize = parseInt(config.PAGE_SIZE)

var createAssessmentAttempt = async (req, res) => {
    console.log('createAssessmentAttempt')
    try {
        var assessmentAttemptData = req.body
        var role = req.token_decoded.r
        assessmentAttemptData.addedby = req.token_decoded.d

        let { industries } = assessmentAttemptData
        let fetchedIndustries = []
        for (let ind of industries) {
            ind.critarion = { "active": true }
            ind.questionsFields = "questionText answers marks"
            console.log(ind)
            let inds = await industryHelper.findIndustryByIdForAssessments(ind)
            fetchedIndustries.push(inds)
        }

        

        fetchedIndustries.map(ind => {
            //let { questions } = ind
            
            const nums = new Set();
            while (nums.size !== 10) {
                nums.add(Math.floor(Math.random() * ind.questions.length));
            }

            let finalquestions = []
            let newnums = [...nums]
            console.log('nums ' + newnums)
            for (let index of newnums) {
                console.log(index)
                finalquestions.push(ind.questions[index])
            }

            /* for(var i = 0; i< finalquestions.length; i++){
                console.log(finalquestions[i].questionText)
            } */
            ind.questions = finalquestions
        })

        /* const nums = new Set();
while(nums.size !== 8) {
  nums.add(Math.floor(Math.random() * 100) + 1);
}

console.log([...nums]) */

        //console.log(arr)
        //var result = await assessmentAttemptHelper.createAssessmentAttempt(assessmentAttemptData)
        var message = "AssessmentAttempt created successfully"
        return responseHelper.success(res, fetchedIndustries, message)


    } catch (err) {
        logger.error(err)
        responseHelper.requestfailure(res, err)
    }
} //end function


var getAssessmentAttemptsWithFullDetails = async (req, res) => {
    console.log("getAssessmentAttemptsWithFullDetails called")
    var assessmentAttemptData = req.body


    try {

        var result = await assessmentAttemptHelper.getAssessmentAttemptsWithFullDetails(assessmentAttemptData.sortproperty, assessmentAttemptData.sortOrder, assessmentAttemptData.offset, assessmentAttemptData.limit, assessmentAttemptData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var getAssessmentAttemptsList = async (req, res) => {
    console.log("getAssessmentAttemptsList called")
    var assessmentAttemptData = req.body


    try {

        var result = await assessmentAttemptHelper.getAssessmentAttemptsList(assessmentAttemptData.sortproperty, assessmentAttemptData.sortOrder, assessmentAttemptData.offset, assessmentAttemptData.limit, assessmentAttemptData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var updateAssessmentAttempt = async (req, res) => {
    console.log("request received for updateAssessmentAttempt")

    var assessmentAttemptData = req.body
    var role = req.token_decoded.r
    try {
        assessmentAttemptData.lastModifiedBy = req.token_decoded.d

        var result = await assessmentAttemptHelper.updateAssessmentAttempt(assessmentAttemptData)
        var message = 'AssessmentAttempt Updated successfully'


        responseHelper.success(res, result, message)
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var removeAssessmentAttempt = async (req, res) => {
    console.log("removeAssessmentAttempt called")
    try {
        var role = req.token_decoded.r


        var assessmentAttemptData = req.body
        assessmentAttemptData.lastModifiedBy = req.token_decoded.d
        var result = await assessmentAttemptHelper.removeAssessmentAttempt(assessmentAttemptData)

        var message = "AssessmentAttempt removed successfully"

        if (result == "AssessmentAttempt does not exists.") {
            message = "AssessmentAttempt does not exists."
        }
        return responseHelper.success(res, result, message)

    } catch (err) {
        responseHelper.requestfailure(res, err)
    }


}

var findAssessmentAttemptById = async (req, res) => {
    console.log("findAssessmentAttemptById called")
    try {
        var role = req.token_decoded.r


        var assessmentAttemptData = req.body

        var result = await assessmentAttemptHelper.findAssessmentAttemptById(assessmentAttemptData)
        console.log(result)
        var message = "AssessmentAttempt find successfully"
        if (result == null) {
            message = "AssessmentAttempt does not exists."
        }


        return responseHelper.success(res, result, message)

    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}






module.exports = {
    createAssessmentAttempt,
    getAssessmentAttemptsWithFullDetails,
    getAssessmentAttemptsList,
    updateAssessmentAttempt,
    removeAssessmentAttempt,
    findAssessmentAttemptById

}



