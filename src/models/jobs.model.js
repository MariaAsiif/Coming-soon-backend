
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.set('debug', true);



jobsSchema = new Schema({

    job_title: {
        type: String
    },
   
    salary: {
        type: String
    },
    description: {
        type: String
    },
    job_image_url: {
        type: String,
        default: '/uploads/dp/default.png'
    },
    jobtype: {
        type: String,
        enum: ["onsite", "remote", "hybrid"]
    },

    jobstatus: {
        type: String,
        enum: ["active", "pending", "completed"]
    },
    expiryDate: {
        type: Date
    },
    employer: {
        type: String
    },
    applicants: [{
        type: String,
        ref: "users"
    }],

    jobawarded: {
        type: Boolean,
        default: false
    },
    physicalLocation: {
        type: String
    },
    //GeoJSON: coordinates data must be in longitude then latitude order as supported by GeoJSON
    location: {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
        },
        coordinates: {
            type: [Number]
        }
    }
},
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
        usePushEach: true
    });

//2d Sphere index is maintained to run Geo JSON Based Queries
jobsSchema.index({ "location": "2dsphere" });
jobsSchema.on('index', function (err) {
    if (err) {
        console.error('Job index error: %s', err);
    } else {
        console.info('Job indexing complete');
    }
});
module.exports = mongoose.model('jobs', jobsSchema);
