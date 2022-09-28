/**
 * Created by Jamshaid
 */

//import mongoose and models
var mongoose = require('mongoose');

const Symptom = mongoose.model('symptoms')

//bluebird for promises
const promise = require('bluebird');

//helper functions
logger = require("./logger");

module.exports = {

    createSymptom: async (data) => {
        console.log("createSymptom HelperFunction is called");
        const symptom = new Symptom(data)
        await symptom.save()
        return symptom
        
    },
    getSymptomsWithFullDetails: async (sortProperty, sortOrder = -1, offset = 0, limit = 20, query) => {
        console.log("getSymptoms Model Function called")

        const symptoms = await Symptom.find(query.critarion)
       
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const symptomssize = symptoms.length

        return {
            symptoms: symptoms,
            count: symptomssize,
            offset: offset,
            limit: limit
        };
        
    },

    getSymptomsList: async (sortProperty, sortOrder = -1, offset = 0, limit = 20, query) => {
        console.log("getSymptoms Model Function called")

        const symptoms = await Symptom.find(query.critarion).select(query.fields/* '_id SymptomName' */)
        
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const symptomssize = symptoms.length

        return {
            symptoms: symptoms,
            count: symptomssize,
            offset: offset,
            limit: limit
        };
        
    },

    updateSymptom: async (data) => {
        console.log("updateSymptom HelperFunction is called");
        const result = await promise.all([Symptom.findOneAndUpdate({_id: data.symptomid}, data, {new: true})])

        return result; 
                
    },

    

    removeSymptom: async (data) => {
        console.log("removeSymptom HelperFunction is called");

        const symptom = await Symptom.findById(data.id);
        if(symptom == null){
             var error = "Symptom does not exists."
             return error
        }
        symptom.lastModifiedBy = data.lastModifiedBy
        symptom.active = false
        await symptom.save()
        return symptom;
        

    },

    findSymptomById: async (query) => {
        console.log("findSymptomById HelperFunction is called");
        
        const symptom = await Symptom.findOne(query.critarion)
        
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        
        return symptom;
        

    },

    

};
