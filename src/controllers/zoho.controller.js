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

//var Zoho = require('zoho')
//const zoho = require('@effco/zoho-crm')
var axios = require('axios')
const ZohoBooks = require('zoho-books')

var createZoho = async (req, res) => {
    console.log('Create Zoho Called')
    try {
        var quoteData = req.body
        var role = req.token_decoded.r
        quoteData.addedby = req.token_decoded.d

        /* let zohoBooks = new ZohoBooks({
            authtoken: '1000.85cc95b812de2251e9c73c03ee29ddf1.b171afbd1cf1db0c968973171de5b8d1',
            host: 'https://books.zoho.com/api/v3',
            organization: '789644281',
          })

          zohoBooks.api('/contacts', 'POST', {
            contact_name: 'Juan Pérez'
        }).then((response) => {
            console.log('before')
            console.log(response)
        }).catch(err => console.log(err))

          console.log("Later") */
var result = await getZoho()

            /* var result = await quoteHelper.createQuote(quoteData) */
            var message = "Zoho accessed successfully"
            return responseHelper.success(res, result, message)
        

    } catch (err) {
        logger.error(err)
        responseHelper.requestfailure(res, err)
    }
} //end function

var getZoho = async (origin, destination, mode, submode) => {
    console.log('getZoho called')
    
    let currentUrl = `https://books.zoho.com/api/v3/invoices?organization_id=789644281`
   let auth = "Authorization: Zoho-oauthtoken 1000.dc4aaabfaab84141f8388e5d2fbd403d.d12b1e8a9b0a6ea94af9bd28301be5b6"




    var config = {
        method: 'get',
       
       url: currentUrl,
        headers: {Authorization: "Zoho-oauthtoken 1000.dc4aaabfaab84141f8388e5d2fbd403d.d12b1e8a9b0a6ea94af9bd28301be5b6"}
    };

    

    //console.log(config.url)

    let result = axios(config)
        .then(function (response) {
            
            console.log(response.data) 
           
            return response.data
            
        })
        .catch(function (error) {
            console.log(error);
            return error
        })
    return result



} //end function








module.exports = {
    createZoho,
    
}



