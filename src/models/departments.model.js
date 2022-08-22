var mongoose = require('mongoose');
const {employees} = require("./index");
var Schema = mongoose.Schema;
var departments = new Schema({
        departmentName: {
            type: String,
            required: true
        },
        employees: [{
            type: employees
        }],
        description: [{
            type: String
        }],
        addedby: {
            type: String,
            ref: 'users'
        },
        departmentHead: {
            type: String,
            ref: 'users'
        },
        lastModifiedBy: {
            type: String,
            ref: 'users'
        },
    },
    {
        timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'},
        usePushEach: true
    }
);

module.exports = mongoose.model('departments', departments);