
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var doctorReservation = new Schema({
    startTime: {
        type: Date
    },
    endTime: {
        type: Date
    },
    status:{
        type: String,
        enum: ['reserved', "ongoing", "completed"]
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


module.exports = mongoose.model('doctorReservations', doctorReservation);