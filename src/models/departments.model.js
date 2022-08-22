var mongoose = require('mongoose');
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

EmployeeSchema.on('index', function (err) {
    if (err) {
        console.error('Departments index error: %s', err);
    } else {
        console.info('Departments indexing complete');
    }
});
module.exports = mongoose.model('departments', EmployeeSchema);