var mongoose = require('mongoose');
const timestamps = require("mongoose-timestamp");
var Schema = mongoose.Schema;
var employees = new Schema({
    user: {
        type: String,
        required: true,
        ref: 'users'
    },
    employeeid: {
        type: String
    },
    assignedPosition: {
        type: String
    },
    department: {
<<<<<<< HEAD
        type: String,
        ref: "departments"
=======
        type: String
>>>>>>> 52e6fc25de28f21d7c746f8615f5333a0807c40e
    },
    currentDesignation: {
        type: String,
        ref: "designations"
    },
    allDesignations: [{
        type: String,
<<<<<<< HEAD
        ref: "designations"
=======

>>>>>>> 52e6fc25de28f21d7c746f8615f5333a0807c40e
    }],
    skills: [{
        type: String,
    }],
    responsibilities: [{
        type: String,
    }],
    job: {
        type: String,
        ref: "jobs"
    },
    joiningDate: {
        type: Date
    },
    maritalStatus: {
        type: String
    },
    reportedTo: {
        type: String,
        ref: "users"
    },
    permissions: [{
        type: String,
    }],
    attachedDocuments: [{
        type: String
    }],
    currentSalary: {
        type: String
    },
    previousCompany: {
        type: String
    },
    previousSalary: {
        type: String
    },
    jobExperience: {
        type: String
    },
    reportOfPerformance: {
        type: Schema.Types.ObjectId
    }
});

employees.plugin(timestamps);
const employeeModel = mongoose.model("employees", employees);

module.exports = employeeModel;