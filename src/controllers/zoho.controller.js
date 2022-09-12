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



const quoteHelper = require('../helpers/quote.helper')

//helper functions
logger = require("../helpers/logger")

responseHelper = require("../helpers/response.helper")

//const notificationtexts = require("../hardCodedData").notificationtexts
const constants = require("../hardCodedData").constants

var pageSize = parseInt(config.PAGE_SIZE)

var Zoho = require('zoho')

var createZoho = async (req, res) => {
    console.log('Create Zoho Called')
    try {
        var quoteData = req.body
        var role = req.token_decoded.r
        quoteData.addedby = req.token_decoded.d

        console.log(req.token_decoded.n)

        var invoice = new Zoho.Invoice({
            authtoken: '1000.15fc21bb58e8c7df8a7556f6db0b7038.08678d3d9ecb09072ea0f48635f4b890'
          })
        
          invoice.getRecords('contacts', (err, data) => {
            if(err){
                console.log(err)
            }

            console.log(data)
          })


            /* var result = await quoteHelper.createQuote(quoteData) */
            var message = "Zoho accessed successfully"
            return responseHelper.success(res, {}, message)
        

    } catch (err) {
        logger.error(err)
        responseHelper.requestfailure(res, err)
    }
} //end function






module.exports = {
    createZoho,
    
}



