
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var individualServiceProviderSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  content: {
    type: String
  },
  gender: {
    type: String
  },
  category: {
    type: String
  },
  contactNo: {
    type: String
  },
  address: {
    type: String
  },
  state: {
    type: String
  },
  zip: {
    type: String
  },
  website: {
    type: String
  },
  facebook: {
    type: String
  },
  twitter: {
    type: String
  },
  instagram: {
    type: String
  },
  linkedin: {
    type: String
  },
  dpImageUrl: {
    type: String,
    required: true,
    default: '/uploads/dp/default.png'
  },
  
  qualifications: [{
    qualificationName: {
      type: String,
      required: true
    },
    institute: {
      type: String
    },
    year: {
      type: String
    },
    grade: {
      type: String
    },
    gradeType: {
      type: String
    }
  }]
})

module.exports = mongoose.model('individualServiceProviders', individualServiceProviderSchema)