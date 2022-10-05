
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var appointment = new Schema({
    customer: {
        type: String,
        ref: 'customers'
    },
    status: {
        type: String,
        enum: ["scheduled", "pending", "ongoing", "newPatient", "cancelled", "completed"]
    },
    appointmentRequest: {
        type: String,
        ref: 'appointmentRequests'
    },
    appointmentDateTime: {
        type: Date
    },
    doctor: {
        type: String,
        ref: 'individualServiceProviders'
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


module.exports = mongoose.model('appointments', appointment);