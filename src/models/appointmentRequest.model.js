
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var appointmentRequest = new Schema({
    customer: {
        type: String,
        required: true,
        ref: 'customer'
    },
    reasonOfCurrentVisit: {
        type: String
    },
    status: {
        type: String,
        enum: ["cancelled",
            "completed",
            "pending",
            "rejected"]
    },
    medicalHistory: [{
        medicalFiles: [{
            type: String
        }],
        disease: {
            type: String,
            ref: "diseases"
        },
        positive: {
            type: Boolean,
            defualt: false
        },
        description: {
            type: String
        }
    }],
    familyDiseases: [{
        disease: {
            type: String,
            ref: "diseases"
        },
        positive: {
            type: Boolean,
            defualt: false
        },
        description: {
            type: String
        }
    }],
    surgicalHistory: {
        isSurgeyDone: {
            type: Boolean,
            default: false
        },
        operationType: [{
            operationName: {
                type: String
            },
            operationDate: {
                type: Date
            },
            operationResult: {
                type: String
            }
        }]
    },
    requestDate: {
        type: Date
    },
    socialHistory: {
        addictions: [{
            addictionName: {
                type: String
            },
            everUsed: {
                type: Boolean,
                defualt: false
            },
            howLongUsed: {
                type: String
            },
            whenStarted: {
                type: Date
            },
            whenQuited: {
                type: Date
            },
            description: {
                type: String
            },
            lastTimeUsed: {
                type: String
            }
        }],
        maritalStatus: {
            type: String,
            enum: ["single",
                "married",
                "partner",
                "widowed",
                "divorced"]
        },
        sexualOrientation: {
            type: String,
            enum: ["hetrosexual",
                "homosexual",
                "bisexual",
                "transsexual"]
        },
        everHurt: {
            type: Boolean,
            defualt: false
        },
        needCarrier: {
            type: Boolean,
            defualt: false
        },
        exercise: {
            type: Boolean,
            defualt: false
        },
        pregnant: {
            type: Boolean,
            defualt: false
        },
        breastFeeding: {
            type: Boolean,
            defualt: false
        },
        lastMenstrualDate: {
            type: Date
        },
        noOfChildrens: {
            type: String
        },
        deliveryMethod: {
            type: String
        },
        deliveryInjury: {
            type: Boolean
        }
    },
    allergies: [{
        type: String
    }],
    medicationsSuppliments: [{
        medicine: {
            type: String
        },
        dosage: {
            type: String
        },
        takingNow: {
            type: Boolean,
            defualt: false
        },
        timesOfMedicine: {
            type: String
        }
    }],
    symptoms: [{
        type: String,
        ref: "symptoms"
    }],
    consultationType: [{
        type: String,
        enum: ["audio",
            "video",
            "chat"]
    }],
    pictures: [{
        type: String
    }],
    videos: [{
        type: String
    }],
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


module.exports = mongoose.model('appointmentRequests', appointmentRequest);