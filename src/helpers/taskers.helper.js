/**
 * Created by Jamshaid
 */

//import mongoose and models
var mongoose = require('mongoose');

const Tasker = mongoose.model('taskers')

//bluebird for promises
const promise = require('bluebird');

//helper functions
logger = require("./logger");

module.exports = {

    createTasker: async (data) => {
        console.log("createTasker HelperFunction is called");
        const taskers = new Tasker(data)
        await taskers.save()
        return taskers
        
    },
    getTaskersWithFullDetails: async (sortProperty, sortOrder = -1, offset = 0, limit = 20, query) => {
        console.log("getTaskers Model Function called")

        const taskerss = await Tasker.find(query.critarion)
       
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const taskersssize = taskerss.length

        return {
            taskerss: taskerss,
            count: taskersssize,
            offset: offset,
            limit: limit
        };
        
    },

    getTaskersList: async (sortProperty, sortOrder = -1, offset = 0, limit = 20, query) => {
        console.log("getTaskers Model Function called")

        const taskerss = await Tasker.find(query.critarion).select(query.fields/* '_id TaskerName' */)
        
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const taskersssize = taskerss.length

        return {
            taskerss: taskerss,
            count: taskersssize,
            offset: offset,
            limit: limit
        };
        
    },

    updateTasker: async (data) => {
        console.log("updateTasker HelperFunction is called");
        const result = await promise.all([Tasker.findOneAndUpdate({_id: data.taskersid}, data, {new: true})])
        
        return result; 
                
    },

    

    removeTasker: async (data) => {
        console.log("removeTasker HelperFunction is called");

        const taskers = await Tasker.findById(data.id);
        if(taskers == null){
             var error = "Tasker does not exists."
             return error
        }
        taskers.lastModifiedBy = data.lastModifiedBy
        taskers.active = false
        await taskers.save()
        return taskers;
        

    },

    findTaskerById: async (query) => {
        console.log("findTaskerById HelperFunction is called");
        
        const taskers = await Tasker.findOne(query.critarion)
        
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        
        return taskers;
        

    },

    

};
