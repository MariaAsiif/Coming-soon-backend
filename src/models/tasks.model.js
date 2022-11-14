
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var tasksSchema = new Schema({
    job_title: {
        type: String
    },
    taskdate: {
        type: Date
    },
    details: {
        type: String
    },
    videoUrl: {
        type: String
    },
    images: [{
        type: String
    }],
    description: {
        type: String
    },
    jobtype: {
        type: String,
        enum: ["physical", "online"]
    },
    jobstatus: {
        type: String,
        enum: ["active", "schedule", "completed"]
    },
    budgetestimate: {
        type: Number
    },
    customer: {
        type: String,
        ref: 'users'
    },
    tasker: {
        type: String,
        ref: 'taskers'
    },
    tasksCategory: {
        type: String,
        ref: 'tasksCategory'
    },
    jobsBids: [{
        type: String
    }],
    jobLocation: {
        type: {
            type: String
        },
        coordinates: [{
            type: Number
        }]
    },
    active: {
        type: Boolean
    },
    jobawarded: {
        type: Boolean
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


module.exports = mongoose.model('taskss', tasksSchema);