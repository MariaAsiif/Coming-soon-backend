

 var mongoose = require('mongoose')
 var Schema = mongoose.Schema
 
 const constants = require("../hardCodedData").constants

 mongoose.set('debug', true)

 usersSchema = new Schema({
     _id: {
       type: String
     },
     
     first_name: {
         type: String,
         required: true,
         uppercase: true
     },
     first_family_name: {
        type: String,
        uppercase: true,
        required: true
    },
    second_family_name: {
        type: String,
        uppercase: true
    },
    third_family_name: {
        type: String,
        uppercase: true
    },
     
     email: {
         type: String,
         unique: true,
         lowercase: true,
         trim: true,
         required: true
     },
     password: {
         type: String
     },
     ipAddress:{
        type: String
     },
     phoneNumber: {
        type: String,
        required: true
    },
    
     role: {
         type: String,
         enum: constants.roles,
         default: constants.roles[0]
     },
     
     country: {
         type: String,
         default: ''
     },
     
     verification_code: {
         type: String,
         default: '',
     },
     is_verified: {
         type: Boolean,
         default: false,
     },
     
     
     
 },
 {
     timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
 });
 
 usersSchema.methods.setPassword = function (password) {
     this.password = crypto.createHash('sha1').update(password).digest("hex");
 };
 
 usersSchema.methods.validPassword = function (password) {
     var hash = crypto.createHash('sha1').update(password).digest("hex");
     return this.password === hash;
 };
 
 
 
 /* usersSchema.index({ "location": "2dsphere" });
 usersSchema.on('index', function(err) {
     if (err) {
         console.error('User index error: %s', err);
     } else {
         console.info('User indexing complete');
     }
 }); */
 module.exports = mongoose.model('users', usersSchema);
 