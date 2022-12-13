/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()
const permit = require('../../middlewares').permit

const controller = require('../../controllers').productsOfStore

router.post('/createProductsOfStore', permit(['_a']), controller.createProductsOfStore)
router.post('/getProductsOfStoresWithFullDetails', permit(['_a']), controller.getProductsOfStoresWithFullDetails)
router.post('/updateProductsOfStore', permit(['_a']), controller.updateProductsOfStore)
router.post('/removeProductsOfStore', permit(['_a']), controller.removeProductsOfStore)
router.post('/getProductsOfStoresList', permit(['_a']), controller.getProductsOfStoresList)
router.post('/findProductsOfStoreById', permit(['_a']), controller.findProductsOfStoreById)


module.exports = router
