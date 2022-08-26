/**
 * Created by Jamshaid
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var Float = require('mongoose-float').loadType(mongoose, 2);
var timestamps = require('mongoose-timestamp');

const feedbacksSchema = new Schema({
  userEmail: {
    type: String,
  },
  feedbackDescription: {
    type: String,
    required: true,
  },
  userName: {
    type: String
  },
  imageUrl: {
    type: String,
  }
});

feedbacksSchema.plugin(timestamps);
const feedbacksModel = mongoose.model("feedbacks", feedbacksSchema);

module.exports = feedbacksModel;
