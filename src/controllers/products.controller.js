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

const productHelper = require('../helpers/products.helper')
const Store = mongoose.model('stores')
//helper functions
logger = require("../helpers/logger")

responseHelper = require("../helpers/response.helper")

//const notificationtexts = require("../hardCodedData").notificationtexts
const constants = require("../hardCodedData").constants

var pageSize = parseInt(config.PAGE_SIZE)

var createProduct = async (req, res) => {
    console.log('createProduct')
    try {
        let productData = req.body
        productData.addedby = req.token_decoded.d

        
            let result = await productHelper.createProduct(productData)

            let store = await Store.findById(productData.store)

            store.products.push(result._id)

            await store.save()

            let message = "Product created successfully"
            return responseHelper.success(res, result, message)
        

    } catch (err) {
        logger.error(err)
        responseHelper.requestfailure(res, err)
    }
} //end function


var getProductsWithFullDetails = async (req, res) => {
    console.log("getProductsWithFullDetails called")
    var productData = req.body


    try {

        var result = await productHelper.getProductsWithFullDetails(productData.sortproperty, productData.sortorder, productData.offset, productData.limit, productData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var getProductsList = async (req, res) => {
    console.log("getProductsList called")
    var productData = req.body


    try {

        var result = await productHelper.getProductsList(productData.sortproperty, productData.sortorder, productData.offset, productData.limit, productData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var updateProduct = async (req, res) => {
    console.log("request received for updateProduct")

    var productData = req.body
    var role = req.token_decoded.r
    try {
        productData.lastModifiedBy = req.token_decoded.d
        
            var result = await productHelper.updateProduct(productData)
            var message = 'Product Updated successfully'
        

        responseHelper.success(res, result, message)
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var removeProduct = async (req, res) => {
    console.log("removeProduct called")
    try {
        var role = req.token_decoded.r

       
            var productData = req.body
            productData.lastModifiedBy = req.token_decoded.d
            var result = await productHelper.removeProduct(productData)

            var message = "Product removed successfully"

            if (result == "Product does not exists.") {
                message = "Product does not exists."
            }
            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }


}

var findProductById = async (req, res) => {
    console.log("findProductById called")
    try {
               
            var productData = req.body

            var result = await productHelper.findProductById(productData)
            console.log(result)
            var message = "Product find successfully"
            if (result == null) {
                message = "Product does not exists."
            }


            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}






module.exports = {
    createProduct,
    getProductsWithFullDetails,
    getProductsList,
    updateProduct,
    removeProduct,
    findProductById

}



