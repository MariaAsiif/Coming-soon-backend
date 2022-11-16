
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var individualTaskersSchema = new Schema({
    aboutMe: {
        type: String
      },
      assessmentAttempts: {
        type: String,
        ref: "assessmentAttempts"
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


module.exports = mongoose.model('individualTaskers', individualTaskersSchema)