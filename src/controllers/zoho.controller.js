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
//const ZohoBooks = require('zoho-books')

let generateGrantToken = require('../helpers/zohohelpers/zohotokens').generateGrantToken
let getZoho = require('../helpers/zohohelpers/zohoapi.helper').getZoho

//const fs = require('fs')
const { readFile, writeFile } = require( 'fs/promises')

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
//var result = await getZoho()


let gtz = await getZoho('invoices')
//console.log('gtz '+gtz)
//console.log('status '+  )
//gtz = JSON.parse(gtz)
 /* if(gtz.status == 400){
    console.log('get new token in controller')
     /* let result = await generateGrantToken()
    process.env.ZOHO_SELF_CLIENT_ACCESS_TOKEN = result.access_token
    let newgtz = await getZoho(req, 'invoices')
    gtz = JSON.parse(newgtz) 


    
}  */
            /* var result = await quoteHelper.createQuote(quoteData) */
            var message = "Zoho accessed successfully"
            return responseHelper.success(res, gtz, message)
        

    } catch (err) {
        logger.error(err)
        responseHelper.requestfailure(res, err)
    }
} //end function


var getZohoLocal = async (origin, destination, mode, submode) => {
    console.log('getZoho called')
    
    let currentUrl = `https://books.zoho.com/api/v3/invoices?organization_id=789644281`
   



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


var createZohoNew = async (req, res) => {
    console.log('Create Zoho Called')
    try {
        //var quoteData = req.body
        

        /* fs.readFile('../Coming-soon-backend/src/config/zohoconfigs/accesstoken.txt', (err, inputD) => {
            if (err) throw err;
               console.log(inputD.toString());
         })

         fs.writeFile('../Coming-soon-backend/src/config/zohoconfigs/accesstoken.txt', 'Simply Easy Learning!', function(err) {
            console.log("Data written successfully!");
            console.log("Let's read newly written data");
         
            // Read the newly written file and print all of its content on the console
            fs.readFile('../Coming-soon-backend/src/config/zohoconfigs/accesstoken.txt', function (err, data) {
               console.log("Asynchronous read: " + data.toString());
            });
         }); */

        let result = await readFile('../Coming-soon-backend/src/config/zohoconfigs/accesstoken.txt', 'utf8')

        console.log('first read')
        console.log(result)


        let file = '../Coming-soon-backend/src/config/zohoconfigs/accesstoken.txt'
        let newdata = '1000.5f7ae6f29edf9b251a9409d49b748976.aa55603e9d469a03cdb38fb809de4557'
        let newre = await writeFile(file, newdata, 'utf8')

        console.log('first write')
        console.log(newre)

        let secresult = await readFile('../Coming-soon-backend/src/config/zohoconfigs/accesstoken.txt', 'utf8')

        console.log('2nd read')
        console.log(secresult)
                  



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



