
//import mongoose and models
var mongoose = require('mongoose');
var Job = mongoose.model('jobs');

//Lodash for data manipulation
const _ = require('lodash');

//bluebird for promises
const promise = require('bluebird');

//helper functions
logger = require("../helpers/logger");

const constants = require("../hardCodedData").constants;
module.exports = {

    
    createJob: async (data) => {
        console.log("createJob HelperFunction is called");
        const job = new Job(data);
        await job.save()
        return job;
        
    },

    addApplicant: async (data) => {
        console.log("addApplicant HelperFunction is called");
        var where = {_id: data.jobid};
        const job = await Job.findOne(where)

        job.applicants.push(data.userid);
        
        await job.save()
        return job;
        
    },
    
    
    

    getAllJobs: async (sortProperty, sortOrder = 1, offset = 0, limit = 10) => {
        console.log("getAllJobs HelperFunction is called");

        
        const jobs = await Job.find()        
        .populate('applicants')
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);

        const jobssize = jobs.length

        return {
            jobs: jobs,
            count: jobssize,
            offset: offset,
            limit: limit
        };

    },

    getAllJobsForPublicView: async (sortProperty, sortOrder = 1, offset = 0, limit = 10) => {
        console.log("getAllJobsForPublicView HelperFunction is called");

        var where = {jobstatus: "active"}
        const jobs = await Job.find(where)        
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);

        const jobssize = jobs.length

        return {
            jobs: jobs,
            count: jobssize,
            offset: offset,
            limit: limit
        };

    },

    

    changeJobStatus: async (data) => {
        console.log("changejobstatus HelperFunction is called");

        const job = await Job.findOne({_id: data.jobid})        

       
        job.jobstatus = data.jobstatus;
        
        return await job.save();
        //return true

    },

    updateJob: async (data) => {
        console.log("updateJob HelperFunction is called");
        
        const result = await Job.findOneAndUpdate({_id: data._id}, data, {new: true})

        return result; 
                
    },

    findJobById: async ( jobid) => {
        console.log("findJobById HelperFunction is called");
        
        const result = await Job.findById(jobid)
        .populate('applicants')
                
        return result; 
                
    },

    deleteJob: async (data) => {
        console.log("deleteJob HelperFunction is called");

        const result = await Course.findByIdAndRemove(data.jobid)        
        return result;
        

    },

    

    

};
