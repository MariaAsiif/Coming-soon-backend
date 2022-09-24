
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var store = new Schema({
    storeName: {
        type: String
    }, 
    storeOwner: {
        type: String,
        ref: 'users'
    },
    products: [
        {
            type: String,
            ref: 'products'
        }
    ],
    storeStartDate: {
        type: Date
    },
    storeEndDate: {
        type: Date
    }, 
    active: {
        type: Boolean,
        default: true
    },
    addedby: {
        type: String,
        ref: 'users'
    }
    ,
    lastModifiedBy: {
        type: String,
        ref: 'users'
    }
},
{
    timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt'},
    usePushEach: true
}
)


module.exports = mongoose.model('stores', store);