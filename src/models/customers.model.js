
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var customer = new Schema({
    dob: {
        type: Date
      },
      user: {
        type: String,
        required: true,
        ref: 'users'
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
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
        usePushEach: true
    }
)


module.exports = mongoose.model('customers', customer);