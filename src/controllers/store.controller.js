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




const storeHelper = require('../helpers/store.helper')

//helper functions
logger = require("../helpers/logger")

responseHelper = require("../helpers/response.helper")

//const notificationtexts = require("../hardCodedData").notificationtexts
const constants = require("../hardCodedData").constants

var pageSize = parseInt(config.PAGE_SIZE)

var createStore = async (req, res) => {
    console.log('createStore')
    try {
        var storeData = req.body
        var role = req.token_decoded.r
        storeData.addedby = req.token_decoded.d

        
            var result = await storeHelper.createStore(storeData)
            var message = "Store created successfully"
            return responseHelper.success(res, result, message)
        

    } catch (err) {
        logger.error(err)
        responseHelper.requestfailure(res, err)
    }
} //end function


var getStoresWithFullDetails = async (req, res) => {
    console.log("getStoresWithFullDetails called")
    var storeData = req.body


    try {

        var result = await storeHelper.getStoresWithFullDetails(storeData.sortproperty, storeData.sortorder, storeData.offset, storeData.limit, storeData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var getStoresList = async (req, res) => {
    console.log("getStoresList called")
    var storeData = req.body


    try {

        var result = await storeHelper.getStoresList(storeData.sortproperty, storeData.sortorder, storeData.offset, storeData.limit, storeData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var updateStore = async (req, res) => {
    console.log("request received for updateStore")

    var storeData = req.body
    var role = req.token_decoded.r
    try {
        storeData.lastModifiedBy = req.token_decoded.d
        
            var result = await storeHelper.updateStore(storeData)
            var message = 'Store Updated successfully'
        

        responseHelper.success(res, result, message)
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var removeStore = async (req, res) => {
    console.log("removeStore called")
    try {
        var role = req.token_decoded.r

       
            var storeData = req.body
            storeData.lastModifiedBy = req.token_decoded.d
            var result = await storeHelper.removeStore(storeData)

            var message = "Store removed successfully"

            if (result == "Store does not exists.") {
                message = "Store does not exists."
            }
            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }


}

var findStoreById = async (req, res) => {
    console.log("findStoreById called")
    try {
        var role = req.token_decoded.r

        
            var storeData = req.body

            var result = await storeHelper.findStoreById(storeData)
            console.log(result)
            var message = "Store find successfully"
            if (result == null) {
                message = "Store does not exists."
            }


            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}






module.exports = {
    createStore,
    getStoresWithFullDetails,
    getStoresList,
    updateStore,
    removeStore,
    findStoreById

}



