
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var businessServiceProviderSchema = new Schema({
  email: {
    type: String
  },
  businessName: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  content: {
    type: String
  },
  address: {
    type: String
  },
  contactNumber: {
    type: String
  },
  website: {
    type: String
  },
  linkAddress: {
    type: String
  },
  socialLink: {
    type: String
  }
});

module.exports = mongoose.model('businessServiceProviders', businessServiceProviderSchema)