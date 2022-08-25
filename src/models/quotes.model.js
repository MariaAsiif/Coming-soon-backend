var mongoose = require('mongoose');
const {employees} = require("./index");
var Schema = mongoose.Schema;
var quotes = new Schema({
        quoteName: {
            type: String,
            required: true
        },
        quoteColor: {
            type: String
        },
        quoteDate: {
            type: Date
        },
        addedby: {
            type: String,
            ref: 'users'
        },
        
        lastModifiedBy: {
            type: String,
            ref: 'users'
        },
        active: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'},
        usePushEach: true
    }
);

module.exports = mongoose.model('quotes', quotes);