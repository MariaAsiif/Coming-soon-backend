
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var assessmentsSchema = new Schema({
    industry: {
        type: String,
        ref: 'industries'
    },
    tasker: {
        type: String,
        ref: 'taskers'
    },
    assessmentResult: {
        type: String
    },
    active: {
        type: Boolean,
        default: true
    },
    addedby: {
        type: String,
        ref: 'users'
    },
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


module.exports = mongoose.model('assessments', assessmentsSchema)