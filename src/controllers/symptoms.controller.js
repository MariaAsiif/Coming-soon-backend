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

const symptomHelper = require('../helpers/symptoms.helper')

//helper functions
logger = require("../helpers/logger")

responseHelper = require("../helpers/response.helper")

//const notificationtexts = require("../hardCodedData").notificationtexts
const constants = require("../hardCodedData").constants

var pageSize = parseInt(config.PAGE_SIZE)

var createSymptom = async (req, res) => {
    console.log('createSymptom')
    try {
        var symptomData = req.body
        var role = req.token_decoded.r
        symptomData.addedby = req.token_decoded.d

        
            var result = await symptomHelper.createSymptom(symptomData)
            var message = "Symptom created successfully"
            return responseHelper.success(res, result, message)
        

    } catch (err) {
        logger.error(err)
        responseHelper.requestfailure(res, err)
    }
} //end function


var getSymptomsWithFullDetails = async (req, res) => {
    console.log("getSymptomsWithFullDetails called")
    var symptomData = req.body


    try {

        var result = await symptomHelper.getSymptomsWithFullDetails(symptomData.sortproperty, symptomData.sortorder, symptomData.offset, symptomData.limit, symptomData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var getSymptomsList = async (req, res) => {
    console.log("getSymptomsList called")
    var symptomData = req.body


    try {

        var result = await symptomHelper.getSymptomsList(symptomData.sortproperty, symptomData.sortorder, symptomData.offset, symptomData.limit, symptomData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var updateSymptom = async (req, res) => {
    console.log("request received for updateSymptom")

    var symptomData = req.body
    var role = req.token_decoded.r
    try {
        symptomData.lastModifiedBy = req.token_decoded.d
        
            var result = await symptomHelper.updateSymptom(symptomData)
            var message = 'Symptom Updated successfully'
        

        responseHelper.success(res, result, message)
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var removeSymptom = async (req, res) => {
    console.log("removeSymptom called")
    try {
        var role = req.token_decoded.r

       
            var symptomData = req.body
            symptomData.lastModifiedBy = req.token_decoded.d
            var result = await symptomHelper.removeSymptom(symptomData)

            var message = "Symptom removed successfully"

            if (result == "Symptom does not exists.") {
                message = "Symptom does not exists."
            }
            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }


}

var findSymptomById = async (req, res) => {
    console.log("findSymptomById called")
    try {
        var role = req.token_decoded.r

        
            var symptomData = req.body

            var result = await symptomHelper.findSymptomById(symptomData)
            console.log(result)
            var message = "Symptom find successfully"
            if (result == null) {
                message = "Symptom does not exists."
            }


            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}






module.exports = {
    createSymptom,
    getSymptomsWithFullDetails,
    getSymptomsList,
    updateSymptom,
    removeSymptom,
    findSymptomById

}



