/**
 * Created by Jamshaid
 */


//import mongoose and models
var mongoose = require('mongoose')

var config = require('dotenv').config()
//var notificationCtrl = require("./notifications.controller")

//Lodash for data manipulation
const _ = require('lodash')

//bluebird for promises
const promise = require('bluebird')

//async for async tasks
var async = require('async')


const serviceHelper = require('../helpers/service.helper')
const businessServiceProviderHelper = require('../helpers/businessserviceprovider.helper')
const individualserverproviderHelper = require('../helpers/individualserviceprovider.helper')
const IndvidualServiceProvider = mongoose.model('individualServiceProviders')

const DistanceMatrix = require('node-distance-matrix')

//helper functions
logger = require("../helpers/logger")

responseHelper = require("../helpers/response.helper")

//const notificationtexts = require("../hardCodedData").notificationtexts
const constants = require("../hardCodedData").constants

var pageSize = parseInt(config.PAGE_SIZE)

var populateDBWithSrvsPrvs = async (req, res) => {

    console.log("populateDBWithSrvsPrvs called")
    try {
        let allcatg = [];
         let serviceproviders = []
          
          /* for(sp of serviceproviders){
            if(!allcatg.includes(sp.City)){
            allcatg.push(sp.City)}
          } */
          
           for(sp of serviceproviders){

            let spcord = []
            if(sp.Longitude == null) {
                spcord.push(0)
            } else {
                spcord.push(parseFloat(sp.Longitude))
            }

            if(sp.Latitude == null) {
                spcord.push(0)
            } else {
                spcord.push(parseFloat(sp.Latitude))
            }
            

                let bsnsSP = {
                    businessName: sp.Business,
                    category: sp.Category,
                    content: sp.Content,
                    address: sp.Address,
                    contactNumber: sp.ContactNo,
                    website: sp.Website,
                    email: sp.Email,
                    linkAddress: sp.LinkAddress,
                    socialLink: sp.SocialLink
                }
            


            let bspobj = await businessServiceProviderHelper.createBusinessServiceProvider(bsnsSP)

            let newSP = {
                serviceName: sp.Business,
                serviceCountry: sp.Country,
                serviceCity: sp.City,
                serviceLocation: {
                    type: "Point",
                    coordinates: spcord                    
                },
                category: sp.Category,
                businessServiceProvider: bspobj._id
            }

            var result = await serviceHelper.createService(newSP)
            

          } //end for of 

          //console.log(spcord)
          var message = "Service created successfully"
          return responseHelper.success(res, allcatg, message)
    
    }
    catch{}
} //end function

var populateDBWithDoctorsPrvs = async (req, res) => {

    console.log("populateDBWithSrvsPrvs called")
    try {
         let serviceproviders = []
          
          
          for(sp of serviceproviders){

            let spcord = []
            if(sp.Longitude == null) {
                spcord.push(0)
            } else {
                spcord.push(parseFloat(sp.Longitude))
            }

            if(sp.Latitude == null) {
                spcord.push(0)
            } else {
                spcord.push(parseFloat(sp.Latitude))
            }
            
//i have to create business service provider object and save and get id and provide it sp

                let bsnsSP = {
                    title: sp.Title,
                    content: sp.Content,
                    gender: sp.Gender,
                    category: sp.Category,
                    contactNo: sp.Contact,
                    address: sp.Address,
                    state: sp.State,
                    zip: sp.ZIP,
                    email: sp.Email,
                    website: sp.Website,
                    facebook: sp.Facebook,
                    twitter: sp.Twitter,
                    instagram: sp.Instagram,
                    linkedin: sp.LinkedIn,
                    qualifications: []
                    
                }
            


            let docbj = await individualserverproviderHelper.createIndvidualServiceProvider(bsnsSP)

            let newSP = {
                serviceName: sp.Title,
                serviceCountry: sp.Country,
                serviceCity: sp.City,
                serviceLocation: {
                    type: "Point",
                    coordinates: spcord                    
                },
                category: sp.Category,
                isIndividual: true,
                individualServiceProvider: docbj._id
            }

            var result = await serviceHelper.createService(newSP)
            

          } //end for of

          //console.log(spcord)
          var message = "Service created successfully"
          return responseHelper.success(res, {}, message)
    
    }
    catch{}
} //end function

var populateDBWithLawyersPrvs = async (req, res) => {

    console.log("populateDBWithSrvsPrvs called")
    try {
         let serviceproviders = []
          
          for(sp of serviceproviders){

            let spcord = []
            if(sp.Longitude == null) {
                spcord.push(0)
            } else {
                spcord.push(parseFloat(sp.Longitude))
            }

            if(sp.Latitude == null) {
                spcord.push(0)
            } else {
                spcord.push(parseFloat(sp.Latitude))
            }
            
//i have to create business service provider object and save and get id and provide it sp

                let bsnsSP = {
                    title: sp.Title,
                    content: sp.Content,
                    gender: sp.Gender,
                    category: sp.Category,
                    contactNo: sp.Contact,
                    address: sp.Address,
                    state: sp.State,
                    zip: sp.ZIP,
                    email: sp.Email,
                    website: sp.Website,
                    facebook: sp.Facebook,
                    twitter: sp.Twitter,
                    instagram: sp.Instagram,
                    linkedin: sp.LinkedIn,
                    qualifications: []
                    
                }
            


            let docbj = await individualserverproviderHelper.createIndvidualServiceProvider(bsnsSP)

            let newSP = {
                serviceName: sp.Title,
                serviceCountry: sp.Country,
                serviceCity: sp.City,
                serviceLocation: {
                    type: "Point",
                    coordinates: spcord                    
                },
                category: sp.Category,
                isIndividual: true,
                individualServiceProvider: docbj._id
            }

            var result = await serviceHelper.createService(newSP)
            

          } //end for of

          //console.log(spcord)
          var message = "Service created successfully"
          return responseHelper.success(res, {}, message)
    
    }
    catch{}
} //end function

var createService = async (req, res) => {
    console.log('createService called')

    
    try {
        var serviceData = req.body
        //var role = req.token_decoded.r
        serviceData.addedby = req.token_decoded.d
        let serviceProvider
        let bspobj
        if(serviceData.isIndividual){
            console.log('Individual entry')
 //create doctors lawyers
            serviceProvider = {
                title: serviceData.title,
                content: serviceData.content,
                gender: serviceData.gender,
                category: serviceData.category,
                contactNo: serviceData.contactNo,
                address: serviceData.address,
                state: serviceData.state,
                zip: serviceData.zip,
                email: serviceData.email,
                website: serviceData.website,
                facebook: serviceData.facebook,
                twitter: serviceData.twitter,
                instagram: serviceData.instagram,
                linkedin: serviceData.linkedin,
                isIndividual: true,
                qualifications: []
                
            }

            bspobj = await individualserverproviderHelper.createIndvidualServiceProvider(serviceProvider)

        } else {
            //create businesses
            console.log('Business entry')
            serviceProvider = {
            businessName: serviceData.businessName,
            category: serviceData.category,
            content: serviceData.content,
            address: serviceData.address,
            contactNumber: serviceData.contactNumber,
            website: serviceData.website,
            email: serviceData.email,
            linkAddress: serviceData.linkAddress,
            isIndividual: false,
            socialLink: serviceData.socialLink
        }

        bspobj = await businessServiceProviderHelper.createBusinessServiceProvider(serviceProvider)
    }


    

    let newSP 
    if(serviceData.isIndividual){
        console.log('Individual Service')
        newSP = {
            serviceName: serviceData.title,
            serviceCountry: serviceData.serviceCountry,
            serviceCity: serviceData.serviceCity,
            serviceLocation: serviceData.serviceLocation,
            category: serviceData.category,
            individualServiceProvider: bspobj._id,
            isIndividual: true
        }
    }else{
        console.log('Business Service')
        newSP = {
            serviceName: serviceData.businessName,
            serviceCountry: serviceData.serviceCountry,
            serviceCity: serviceData.serviceCity,
            serviceLocation: serviceData.serviceLocation,
            category: serviceData.category,
            businessServiceProvider: bspobj._id,
            isIndividual: false
        }
    }
    
    
    

    var result = await serviceHelper.createService(newSP)

        
            var message = "Service created successfully"
            return responseHelper.success(res, result, message)
        

    } catch (err) {
        logger.error(err)
        responseHelper.requestfailure(res, err)
    }
} //end function


var getServicesWithFullDetails = async (req, res) => {
    console.log("getServicesWithFullDetails called")
    var serviceData = req.body


    try {

        var result = await serviceHelper.getServicesWithFullDetails(serviceData.sortproperty, serviceData.sortorder, serviceData.offset, serviceData.limit, serviceData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var getServicesList = async (req, res) => {
    console.log("getServicesList called")
    var serviceData = req.body


    try {

        var result = await serviceHelper.getServicesList(serviceData.sortproperty, serviceData.sortorder, serviceData.offset, serviceData.limit, serviceData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var updateService = async (req, res) => {
    console.log("request received for updateService")

    var serviceData = req.body
    var role = req.token_decoded.r
    try {
        serviceData.lastModifiedBy = req.token_decoded.d

        let serviceQuery = {
          critarion: {_id : serviceData.serviceid},          
          addedby: "_id email first_name",          
          lastModifiedBy: "_id email first_name",
          individualServiceProvider: "_id",          
          businessServiceProvider: "_id"
        }

        let fetchedService = await serviceHelper.findServiceById(serviceQuery)

        let fetchedObject
        if(fetchedService.isIndividual){
          //let query = {individualserviceproviderid: fetchedService.individualServiceProvider._id}
          serviceData.individualserviceproviderid = fetchedService.individualServiceProvider._id
          serviceData.serviceName = serviceData.title
          fetchedObject = await individualserverproviderHelper.updateIndvidualServiceProvider(serviceData)
        } else {
          serviceData.businessserviceproviderid = fetchedService.businessServiceProvider._id
          serviceData.serviceName = serviceData.businessName
          fetchedObject = await businessServiceProviderHelper.updateBusinessServiceProvider(serviceData)
        }
        
            var result = await serviceHelper.updateService(serviceData)
            var message = 'Service Updated successfully'
        

        responseHelper.success(res, result, message)
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var approveDisapproveService = async (req, res) => {
    console.log("request received for approveDisapproveService")

    var serviceData = req.body
    
    try {
        serviceData.lastModifiedBy = req.token_decoded.d

        let serviceQuery = {
            critarion: {_id : serviceData.serviceid},          
            addedby: "_id email first_name",          
            lastModifiedBy: "_id email first_name",
            individualServiceProvider: "_id",          
            businessServiceProvider: "_id"
          }

        let fetchedService = await serviceHelper.findServiceById(serviceQuery)

        let result
        let message
        if(fetchedService.isIndividual && !serviceData.isApproved){
            console.log("delete individual server")
          let indquery = {id: fetchedService.individualServiceProvider._id}
          let srvcquery = {id: serviceData.serviceid}
          
          result = await individualserverproviderHelper.removeIndvidualServiceProvider(indquery)
          result = await serviceHelper.removeService(srvcquery)

          message = "Service and Invididual Service Provider data deleted"
        } else if(fetchedService.isIndividual && serviceData.isApproved){
            console.log('approve ind srv')
            result = await serviceHelper.updateService(serviceData)
            message = "Service is approved successfully"
        }

        if(!fetchedService.isIndividual && !serviceData.isApproved){
            console.log("delete business server")

            let busnsquery = {id: fetchedService.businessServiceProvider._id}
          let srvcquery = {id: serviceData.serviceid}
          
          result = await businessServiceProviderHelper.removeBusinessServiceProvider(busnsquery)
          result = await serviceHelper.removeService(srvcquery)
          message = "Service and Business Service Provider data deleted"
          
        } else if(!fetchedService.isIndividual && serviceData.isApproved){
            console.log('approve bus srv')
            result = await serviceHelper.updateService(serviceData)
            message = "Service is approved successfully"
        }
        
            //var result = await serviceHelper.updateService(serviceData)
            
            //message = "Service is fetch successfully"

        responseHelper.success(res, result, message)
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}



var removeService = async (req, res) => {
    console.log("removeService called")
    try {
        var role = req.token_decoded.r

       
            var serviceData = req.body
            serviceData.lastModifiedBy = req.token_decoded.d
            var result = await serviceHelper.removeService(serviceData)

            var message = "Service removed successfully"

            if (result == "Service does not exists.") {
                message = "Service does not exists."
            }
            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }


}

var findServiceById = async (req, res) => {
    console.log("findServiceById called")
    try {
        var role = req.token_decoded.r

        
            var serviceData = req.body

            var result = await serviceHelper.findServiceById(serviceData)
            console.log(result)
            var message = "Service find successfully"
            if (result == null) {
                message = "Service does not exists."
            }


            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var locateAllServices = async (req, res) => {
    console.log("locateActiveCalls Calls called");
    try {

        var userData = req.body;


        userData.minDistance = userData.minDistance * 1000; //converting km to meters
        userData.maxDistance = userData.maxDistance * 1000; //converting km to meters

        var result = await serviceHelper.locateAllServices(userData.sortproperty, userData.sortorder, userData.offset, userData.limit, userData.minDistance, userData.maxDistance, userData.location, userData.query);

        if (result === null) {
            var message = 'No Services';
            responseHelper.success(res, result, message);
        } else if (result.count == 0) {
            var message = 'No Services';
            responseHelper.success(res, result, message);

        } else {
            var distance = require('google-distance-matrix')
            let modes = ['driving', 'walking', 'bicycling', 'transit']
            let transits = ['bus', 'subway', 'train', 'tram', 'rail']
            distance.key(process.env.G_API)
           
            //distance.transit_mode('bus')
            distance.units('metric')
            //distance.transit_mode('rail')

            let origins = ['' + userData.location.lat + ', ' + userData.location.lng + '']


            let destinations = []

            for (service of result.services) {
                let serv = service.toObject()
                let destination = '' + serv.serviceLocation.coordinates[1] + ', ' + serv.serviceLocation.coordinates[0] + ''

                destinations.push(destination)

            }
            let resultset = []


            for(var k = 0; k < modes.length; k++){
                distance.mode(modes[k])
                /* if(modes[k] == "transit"){
                    for(var m = 0; m< transits.length; k++){

                    } //inner for
                } //end if */

                 //callback
            } //end outer for



            /* distance.matrix(origins, destinations, function (err, distances) {
                if (err) {
                    return console.log(err);
                }
                if (!distances) {
                    return console.log('no distances');
                }
                if (distances.status == 'OK') {
                    for (var i = 0; i < origins.length; i++) {
                        for (var j = 0; j < destinations.length; j++) {
                            var origin = distances.origin_addresses[i];
                            var destination = distances.destination_addresses[j];
                            if (distances.rows[0].elements[j].status == 'OK') {
                                
                                result.services[j]._doc.distances = [{
                                    distanceMode: "driving",
                                    distance: distances.rows[i].elements[j].distance.text,
                                    duration: distances.rows[i].elements[j].duration.text
                                }]
                                
                            } else {
                                console.log(destination + ' is not reachable by land from ' + origin);

                            }
                        }
                    }
                    

                    console.log('ok')
                    console.log(result)
                    responseHelper.success(res, result, message)

                }
            })  *///callback

            responseHelper.success(res, result, message)


        } //end else

    } catch (err) {

        responseHelper.requestfailure(res, err);
    }
}

var  getDistance = async () => {

    distance.matrix(origins, destinations, function (err, distances) {
        if (err) {
            return console.log(err);
        }
        if (!distances) {
            return console.log('no distances');
        }
        if (distances.status == 'OK') {
            for (var i = 0; i < origins.length; i++) {
                for (var j = 0; j < destinations.length; j++) {
                    var origin = distances.origin_addresses[i];
                    var destination = distances.destination_addresses[j];
                    if (distances.rows[0].elements[j].status == 'OK') {
                        
                        result.services[j]._doc.distances = [{
                            distanceMode: modes[k],
                            distance: distances.rows[i].elements[j].distance.text,
                            duration: distances.rows[i].elements[j].duration.text
                        }]
                        
                    } else {
                        //console.log(destination + ' is not reachable by land from ' + origin);

                        result.services[j]._doc.distances = [{
                            distanceMode: modes[k],
                            distance: `Destination is not reachable by ${modes[k]}`,
                            duration: 'Not applicable'
                        }]

                    }
                }
            }
            

            console.log('ok')
            console.log(result)
            responseHelper.success(res, result, message)

        }
    })

} //end function






module.exports = {
    populateDBWithSrvsPrvs,
    populateDBWithDoctorsPrvs,
    populateDBWithLawyersPrvs,
    createService,
    getServicesWithFullDetails,
    locateAllServices,
    getServicesList,
    updateService,
    removeService,
    findServiceById,
    approveDisapproveService

}



