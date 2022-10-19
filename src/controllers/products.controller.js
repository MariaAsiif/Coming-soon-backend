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
var multer = require('multer')
const productHelper = require('../helpers/products.helper')
const Store = mongoose.model('stores')
//helper functions
logger = require("../helpers/logger")

responseHelper = require("../helpers/response.helper")

//const notificationtexts = require("../hardCodedData").notificationtexts
const constants = require("../hardCodedData").constants

var pageSize = parseInt(config.PAGE_SIZE)
//this function has to be changed
var createProductOld = async (req, res) => {
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

var createProduct = async (req, res) => {
    console.log('createProduct called')
    var picturefiles = []
    let isErr = false
    let errorMessage = ''

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            if (file.fieldname === "pictures") {
                cb(null, './public/uploads/products')
            }
        },
        filename: (req, file, cb) => {
            if (file.fieldname === "pictures") {
                
                let picfile = Date.now() + '-' + file.originalname
                
                picturefiles.push(picfile)
                cb(null, picfile)
            }
        }
    })

    const upload = multer({
        storage: storage,
        limits: {
            fileSize: 1024 * 1024 * 5
        },
        fileFilter: (req, file, cb) => {

            let ext = path.extname(file.originalname);

            let extentions = ['.png', '.jpg', '.jpeg', '.gif']
            if (!extentions.includes(ext)) {

                errorMessage = "Only PNG, JPG, JPEC and GIF Files allowed"
                isErr = true

            }
            cb(null, true);
        }
    }).fields(
        [
            {
                name: 'pictures',
                maxCount: 3
            }
        ]
    )

    upload(req, res, async function (err) {
        console.log("upload function called");
        //console.log(err)

        if (err instanceof multer.MulterError) {


            if (err.field == "pictures" && err.code == "LIMIT_UNEXPECTED_FILE") {

                errorMessage = "Only 3 images can be uploaded";
                isErr = true
                
            } else if (err.field == "pictures" && err.code == "LIMIT_FILE_SIZE") {

                errorMessage = "File Limit is 5 MB";
                isErr = true

            }

        } else if (err) {
            
            return res.status(500).json(err)
        }

        if (isErr) {

            if (errorMessage == "File Limit is 5 MB") {
                console.log(picturefiles)
                
                try {
                    /* console.log('try called')
                    console.log(pic) */
                    let i = 1
                    for(pic of picturefiles){
                        console.log('iterations '+i)
                        i++
                    if (fs.existsSync('./public/uploads/products/' + pic)){
                        console.log('file exists')
                        console.log(pic)
                       await fs.unlinkSync('./public/uploads/products/' + pic)
                    } }
    
                } catch (err) {
                    console.log(err)
                    //return responseHelper.requestfailure(res, err)
                }
           console.log('first failure response')
                return responseHelper.requestfailure(res, errorMessage)
            } else if (errorMessage == "Only 3 images can be uploaded") {
                return responseHelper.requestfailure(res, errorMessage)
            }

            console.log('2nd failure response')
            return responseHelper.requestfailure(res, errorMessage)
        } else {

           let productData = JSON.parse(req.body.request)
            try {
                let picurls = []
                if (picturefiles.length !== 0) {

                    picturefiles.map(pic => {
                        picurls.push('/uploads/products/' + pic)
                    })
                } else {
                    let message = "Product Images not found"
                    return responseHelper.requestfailure(res, message, err)
                }

                productData.addedby = req.token_decoded.d

                productData.productImagesURLs = picurls
            let result = await productHelper.createProduct(productData)

            let store = await Store.findById(productData.store)

            store.products.push(result._id)

            await store.save()

            let message = "Product created successfully"
                return responseHelper.success(res, result, message)


            } catch (err) {

                try {
                    //fs.unlinkSync('./public/uploads/products/' + pictures)
                    picturefiles.map(pic => {
                        fs.unlinkSync('./public/uploads/products/' + pic)
                    })
                } catch (err) {
                    return responseHelper.requestfailure(res, err);

                }

                logger.error(err)
                return responseHelper.requestfailure(res, err)
            }



        }

    })

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



