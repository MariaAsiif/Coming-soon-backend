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

/* const DistanceMatrix = require('node-distance-matrix') */
var distance = require('google-distance-matrix')
var axios = require('axios')

//helper functions
logger = require("../helpers/logger")

responseHelper = require("../helpers/response.helper")

//const notificationtexts = require("../hardCodedData").notificationtexts
const constants = require("../hardCodedData").constants

var pageSize = parseInt(config.PAGE_SIZE)
let wwbusinesses = require('../hardCodedData/worldwidebusiness')
var populateDBWithSrvsPrvs = async (req, res) => {

    console.log("populateDBWithSrvsPrvs called")
    try {
        let allcatg = [];
        //let serviceproviders = []
        let offset = 0
        let limit = 1
        for(var i= 0; i <3453; i++){
            console.log('Iteration at start: ' + i)
            
            //if(i == 4){limit = 2}
            

            let serviceproviders = wwbusinesses.getHunderd(offset, limit)

            /* console.log('service name: ' + serviceproviders.Business)
            console.log('Latitude: ' + serviceproviders.Latitude)
            console.log('Longitude: ' + serviceproviders.Longitude)
 */
            for (var j = 0; j < serviceproviders.length; j++) {

                let spcord = []
                if (serviceproviders[j].Longitude == "") {
                    spcord.push(0)
                } else {
                    spcord.push(parseFloat(serviceproviders[j].Longitude))
                }
    
                if (serviceproviders[j].Latitude == "") {
                    spcord.push(0)
                } else {
                    spcord.push(parseFloat(serviceproviders[j].Latitude))
                }
    
    
                let bsnsSP = {
                    businessName: serviceproviders[j].Business,
                    category: serviceproviders[j].Category,
                    //content: sp.Content,
                    address: serviceproviders[j].Address,
                    contactNumber: serviceproviders[j].ContactNo,
                    website: serviceproviders[j].Website,
                    email: serviceproviders[j].Email,
                    linkAddress: serviceproviders[j].LinkAddress,
                    socialLink: serviceproviders[j].SocialLink
                }
                
                let bspobj = await businessServiceProviderHelper.createBusinessServiceProvider(bsnsSP)
    
                let newSP = {
                    serviceName: serviceproviders[j].Business,
                    serviceCountry: serviceproviders[j].Country,
                    serviceCity: serviceproviders[j].City,
                    serviceLocation: {
                        type: "Point",
                        coordinates: spcord
                    },
                    category: serviceproviders[j].Category,
                    businessServiceProvider: bspobj._id
                }
    
                await serviceHelper.createService(newSP)
    
    
            } //end for of 

            offset = limit
            limit += 1
            console.log('Iteration at end: ' + i)
            console.log(serviceproviders)
            console.log('offset in main' + offset)
        }

        //console.log(fh.length)
        /* for(sp of serviceproviders){
          if(!allcatg.includes(sp.City)){
          allcatg.push(sp.City)}
        } */

        /* for (sp of serviceproviders) {

            let spcord = []
            if (sp.Longitude == null) {
                spcord.push(0)
            } else {
                spcord.push(parseFloat(sp.Longitude))
            }

            if (sp.Latitude == null) {
                spcord.push(0)
            } else {
                spcord.push(parseFloat(sp.Latitude))
            }


            let bsnsSP = {
                businessName: sp.Business,
                category: sp.Category,
                //content: sp.Content,
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


        } //end for of  */

        //console.log(spcord)
        var message = "Service created successfully"
        return responseHelper.success(res, allcatg, message)

    }
    catch { }
} //end function

var populateDBWithDoctorsPrvs = async (req, res) => {

    console.log("populateDBWithSrvsPrvs called")
    try {
         let serviceproviders = [
            {
              "Title": "Dr.Prof. Jorge Alio",
              "Content": null,
              "Gender": "Male",
              "Category": "Doctors",
              "Contact": "34966006635",
              "Address": "C. del Cabaoal, no1",
              "City": "Alicante",
              "State": null,
              "ZIP": 3016,
              "Country": "Spain",
              "Latitude": 38.3256524,
              "Longitude": -0.5566393,
              "Email": null,
              "Website": "https://www.topdoctors.es/doctor/jorge-alio",
              "Facebook": null,
              "Twitter": null,
              "Instagram": null,
              "LinkedIn": null
            },
            {
              "Title": "Dr. ANTONIO RUIZ PEREZ",
              "Content": null,
              "Gender": "Male",
              "Category": "Doctors",
              "Contact": "34667674194",
              "Address": "C. de Andros Mellado, 108",
              "City": "Madrid",
              "State": null,
              "ZIP": 28003,
              "Country": "Spain",
              "Latitude": 40.4409177,
              "Longitude": -3.7180893,
              "Email": null,
              "Website": null,
              "Facebook": null,
              "Twitter": null,
              "Instagram": null,
              "LinkedIn": null
            },
            {
              "Title": "Dr. Joso Nieto",
              "Content": null,
              "Gender": "Male",
              "Category": "Doctors",
              "Contact": "34915237575",
              "Address": "Av. del Valle, 30",
              "City": "Madrid",
              "State": null,
              "ZIP": 28003,
              "Country": "Spain",
              "Latitude": 40.4437339,
              "Longitude": -3.7188462,
              "Email": "drnieto@blefaroplastia.es",
              "Website": "https://blefaroplastia.es/",
              "Facebook": null,
              "Twitter": null,
              "Instagram": null,
              "LinkedIn": null
            },
            {
              "Title": "Dr. Sobrino",
              "Content": null,
              "Gender": "Female",
              "Category": "Doctors",
              "Contact": "34913071094",
              "Address": "Av. de la Osa Mayor, 94",
              "City": "Madrid",
              "State": null,
              "ZIP": 28023,
              "Country": "Spain",
              "Latitude": 40.4596279,
              "Longitude": -3.788584,
              "Email": null,
              "Website": null,
              "Facebook": null,
              "Twitter": null,
              "Instagram": null,
              "LinkedIn": null
            },
            {
              "Title": "Dr. Beatriz Berenguer",
              "Content": null,
              "Gender": "Female",
              "Category": "Doctors",
              "Contact": "34680509637",
              "Address": "Hospital la luz consulta 239, C. del Maestro ongel Llorca, 8",
              "City": "Madrid",
              "State": null,
              "ZIP": 28003,
              "Country": "Spain",
              "Latitude": 40.444151,
              "Longitude": -3.7179917,
              "Email": "monica@doctoraberenguer.com",
              "Website": "http://www.doctoraberenguer.com/",
              "Facebook": "https://www.facebook.com/Dra-Berenguer-707147242975337",
              "Twitter": null,
              "Instagram": "https://www.instagram.com/dra.berenguer/",
              "LinkedIn": null
            },
            {
              "Title": "Dr.Germon C. Esparza Gomez",
              "Content": null,
              "Gender": "Male",
              "Category": "Doctors",
              "Contact": "34915702988",
              "Address": "C. de Pedro Teixeira, 3, Bajo D",
              "City": "Madrid",
              "State": null,
              "ZIP": 28020,
              "Country": "Spain",
              "Latitude": 40.455359,
              "Longitude": -3.6972596,
              "Email": null,
              "Website": null,
              "Facebook": null,
              "Twitter": null,
              "Instagram": null,
              "LinkedIn": null
            },
            {
              "Title": "Dr.Andrade",
              "Content": null,
              "Gender": "Male",
              "Category": "Doctors",
              "Contact": "34651052052",
              "Address": "Cam. de la Zarzuela, No13,",
              "City": "Madrid",
              "State": null,
              "ZIP": 28023,
              "Country": "Spain",
              "Latitude": 40.4553671,
              "Longitude": -3.6972596,
              "Email": "info@castellanaclinic.com",
              "Website": "https://castellanaclinic.com/",
              "Facebook": "http://www.facebook.com/Castellana-Cl%C3%ADnic-140188868181240",
              "Twitter": null,
              "Instagram": null,
              "LinkedIn": null
            },
            {
              "Title": "Dr.Eliot Ramirez",
              "Content": null,
              "Gender": "Male",
              "Category": "Doctors",
              "Contact": "34632767731",
              "Address": "Barcelona",
              "City": "Barcelona",
              "State": null,
              "ZIP": null,
              "Country": "Spain",
              "Latitude": 41.3928406,
              "Longitude": 2.0001026,
              "Email": "info@greennursehc.com",
              "Website": "https://www.greennursehc.com/",
              "Facebook": null,
              "Twitter": null,
              "Instagram": null,
              "LinkedIn": null
            },
            {
              "Title": "Dr. Jorge Planas",
              "Content": null,
              "Gender": "Male",
              "Category": "Doctors",
              "Contact": "34931549798",
              "Address": "Carrer de Pere II de Montcada, 16",
              "City": "Barcelona",
              "State": null,
              "ZIP": 8034,
              "Country": "Spain",
              "Latitude": 41.3996779,
              "Longitude": 2.1135146,
              "Email": "info@clinicaplanas.com",
              "Website": "https://www.topdoctors.es/doctor/jorge-planas",
              "Facebook": "https://www.facebook.com/clinicaplanas/",
              "Twitter": "https://twitter.com/clinicaplanas",
              "Instagram": null,
              "LinkedIn": "https://www.linkedin.com/company/clinica-planas"
            },
            {
              "Title": "Dr. Albert Estrada",
              "Content": null,
              "Gender": "Male",
              "Category": "Doctors",
              "Contact": "'+34644382568",
              "Address": "Barcelona",
              "City": "Barcelona",
              "State": null,
              "ZIP": null,
              "Country": "Spain",
              "Latitude": 41.3928406,
              "Longitude": 2.0001026,
              "Email": "info@uniondepacientes.org",
              "Website": "https://uniondepacientes.org/",
              "Facebook": "https://www.facebook.com/uniondepacientes",
              "Twitter": "https://twitter.com/PacientesCanna",
              "Instagram": "https://www.instagram.com/uprcbarcelona/",
              "LinkedIn": null
            }
           ]
          
          
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
         let serviceproviders = [
            {
              "Title": "Anna Obradors",
              "Content": "Anna Obradors has a degree and a master's degree in sociology from the Autonomous University of Barcelona and, since 2010, has been developing as a professional and businesswoman in the world of cannabis. Creative of Weedgest, the software for associations, she is the Founder and current Director of We'Canna Consulting, and it is she who leads each project and directs the team of professionals necessary to carry it out successfully.",
              "Gender": "Female",
              "Category": "Lawyer And Medical Marijuana - Cannabis Specialist",
              "Contact": "'+34622343476",
              "Address": "Carrer de Radas, 41",
              "City": "Barcelona",
              "State": null,
              "ZIP": 8004,
              "Country": "Spain",
              "Latitude": 41.3731709,
              "Longitude": 2.1586995,
              "Email": "anna@wecannaconsulting.com - hola@wecannaconsulting.com",
              "Website": "https://wecannaconsulting.com/",
              "Facebook": "https://www.facebook.com/weedgest/",
              "Twitter": null,
              "Instagram": null,
              "LinkedIn": null
            },
            {
              "Title": "Omar Nieto",
              "Content": "At Omar Nieto we are fully aware of the unique and differentiated needs of each client, which is why we try to offer them tailored solutions. For this reason, the legal advice developed in the legal boutique is characterized by being a developed work, of quality and with a permanent follow-up of the cases.",
              "Gender": "Male",
              "Category": "Lawyer And Medical Marijuana - Cannabis Specialist",
              "Contact": "+34 934 676 72",
              "Address": "Rambla Catalunya, 49, 1º1ª",
              "City": "Barcelona",
              "State": null,
              "ZIP": 8007,
              "Country": "Spain",
              "Latitude": 41.3904322,
              "Longitude": 2.1617224,
              "Email": "info@omarnieto.com",
              "Website": "http://www.omarnieto.com/",
              "Facebook": null,
              "Twitter": "https://twitter.com/amina42963656?lang=ga",
              "Instagram": null,
              "LinkedIn": null
            },
            {
              "Title": "Oriol Casals",
              "Content": "Criminal lawyer.Post graduate degree in Criminal and Economic Law at University Ramon Llull.\nDirector of legal projects of the Civil Observatory of drug policy.\n\nCollaborator of the Committee on Political, Legal and Social Studies of l'Ateneu Barcelonos.\n\nSecretary of the KOKOMIH Association of Mali",
              "Gender": "Male",
              "Category": "Lawyer And Medical Marijuana - Cannabis Specialist",
              "Contact": "+34 93 742 10 56",
              "Address": "Gran Vía de les Corts Catalanes, 594, penthouse 1ª, 08007 – Barcelona",
              "City": "Barcelona",
              "State": null,
              "ZIP": null,
              "Country": "Spain",
              "Latitude": 41.3864284,
              "Longitude": 2.1626687,
              "Email": "oriol@casaparaula.com",
              "Website": "https://casaparaula.com/en/team-profile/oriol-casals-2/",
              "Facebook": null,
              "Twitter": null,
              "Instagram": null,
              "LinkedIn": null
            },
            {
              "Title": "Constanza Sanchez Aviles",
              "Content": null,
              "Gender": "Female",
              "Category": "Lawyer And Medical Marijuana - Cannabis Specialist",
              "Contact": null,
              "Address": "Carrer de Sepúlveda, 65, 08015 Barcelona, Spain",
              "City": "Barcelona",
              "State": null,
              "ZIP": 8015,
              "Country": "Spain",
              "Latitude": 41.3756601,
              "Longitude": 2.1464462,
              "Email": "genisona@iceers.org",
              "Website": "https://www.iceers.org/iceers-team/",
              "Facebook": null,
              "Twitter": null,
              "Instagram": null,
              "LinkedIn": null
            },
            {
              "Title": "Soriano Fernondez Abogados",
              "Content": null,
              "Gender": "Male",
              "Category": "Lawyer And Medical Marijuana - Cannabis Specialist",
              "Contact": "'+34914718755",
              "Address": "Calle del Gral. Ricardos, 127",
              "City": "Madrid",
              "State": null,
              "ZIP": 28019,
              "Country": "Spain",
              "Latitude": 40.3909805,
              "Longitude": -3.7319092,
              "Email": "info@soferabogados.com",
              "Website": "https://soferabogados.com/",
              "Facebook": "https://www.facebook.com/syfabogados",
              "Twitter": "https://twitter.com/SFAbogados1",
              "Instagram": "https://www.instagram.com/syfabogados/",
              "LinkedIn": null
            },
            {
              "Title": "Mariano Bautista",
              "Content": "Mariano Bautista is a Partner of the Corporate / M&A department at CMS Albioana & Suorez de Lezo. He specialises in providing advice on the areas of mergers, acquisitions and the restructuring of companies.\n\nMoreover, he possesses vast experience in corporate and hotel business related issues and agreements, as well as the pharmaceutical and automotive sectors. He has been involved in and led countless domestic and international transactions and acts as an adviser to reputable North American and European multinational private equity firms in Spain.\n\nHe has been recognised in the M&A and private equity areas by publications such as IFLR and Best Lawyers.",
              "Gender": "Male",
              "Category": "Lawyer And Medical Marijuana - Cannabis Specialist",
              "Contact": "+34 91 451 92 77",
              "Address": "Paseo de Recoletos 7o9",
              "City": "Madrid",
              "State": null,
              "ZIP": 28004,
              "Country": "Spain",
              "Latitude": 40.4209658,
              "Longitude": -3.6952749,
              "Email": "mariano.bautista@cms-asl.com",
              "Website": null,
              "Facebook": null,
              "Twitter": null,
              "Instagram": null,
              "LinkedIn": null
            },
            {
              "Title": "Bernardo Soriano Guzman",
              "Content": "Co-founder and director of S&F abogados, he is in charge of the representation of the firm. Bernardo is a practicing lawyer, with a degree in law from the Complutense University of Madrid with a master's degree in Criminal Law and Criminal Procedure from the Madrid Bar Association.\nPassionate about his work, he has a long career in the cannabis industry. It provides business consulting services to companies that already work or that want to enter the cannabis sector, in addition to accompanying them in all the necessary processes to turn these projects into reality.",
              "Gender": "Male",
              "Category": "Lawyer And Medical Marijuana - Cannabis Specialist",
              "Contact": "+34 91 532 20 77",
              "Address": "Calle del Gral. Ricardos, 127, 28019 Madrid, Spain",
              "City": "Madrid",
              "State": null,
              "ZIP": 77010,
              "Country": "Spain",
              "Latitude": 40.3909805,
              "Longitude": -3.7319092,
              "Email": "info@soferabogados.com",
              "Website": "https://soferabogados.com/equipo/",
              "Facebook": null,
              "Twitter": null,
              "Instagram": null,
              "LinkedIn": null
            },
            {
              "Title": "Brotsanbert",
              "Content": null,
              "Gender": "Male",
              "Category": "Lawyer And Medical Marijuana - Cannabis Specialist",
              "Contact": "'+34966966036",
              "Address": "Plaza Alcalde Domingo Torres, 4. 1º, 1A",
              "City": "Valencia",
              "State": null,
              "ZIP": 46020,
              "Country": "Spain",
              "Latitude": 39.4819925,
              "Longitude": -0.3601694,
              "Email": "juridicopinoso@brotsanbert.com",
              "Website": "http://www.brotsanbert.com/",
              "Facebook": "https://www.facebook.com/brotsanbert/",
              "Twitter": "https://twitter.com/brotsanbert",
              "Instagram": "https://www.instagram.com/brotsanbert/",
              "LinkedIn": "https://www.linkedin.com/company/brotsanbert?trk=public_post_share-update_actor-text"
            },
            {
              "Title": "Loroño Abogados",
              "Content": null,
              "Gender": null,
              "Category": "Lawyer And Medical Marijuana - Cannabis Specialist",
              "Contact": "+34 34675 713 532",
              "Address": "Calle Colón de Larreategui, 26, 1C",
              "City": "Bilbao,Vizcaya",
              "State": null,
              "ZIP": 48009,
              "Country": "Spain",
              "Latitude": 0,
              "Longitude": 0,
              "Email": "loronoabogados@gmail.com",
              "Website": null,
              "Facebook": null,
              "Twitter": null,
              "Instagram": null,
              "LinkedIn": null
            },
            {
              "Title": "Csc Abogados Cannabis",
              "Content": null,
              "Gender": null,
              "Category": "Lawyer And Medical Marijuana - Cannabis Specialist",
              "Contact": "+34675 71 35 32",
              "Address": "Colon De Larreategui 26, 1C",
              "City": "Bilbao,Vizcaya",
              "State": null,
              "ZIP": 48009,
              "Country": "Spain",
              "Latitude": 0,
              "Longitude": 0,
              "Email": "cannabisabogados@gmail.com",
              "Website": "https://cannabisabogados.com/",
              "Facebook": "https://www.facebook.com/csc.canabis/",
              "Twitter": null,
              "Instagram": null,
              "LinkedIn": null
            },
            {
              "Title": "Romero Y Fernández",
              "Content": null,
              "Gender": null,
              "Category": "Lawyer And Medical Marijuana - Cannabis Specialist",
              "Contact": "'+34928839551",
              "Address": "Ruperto Gonzalez Negrín. Nº10, 5ºA",
              "City": "Las palmas",
              "State": null,
              "ZIP": 35500,
              "Country": "Spain",
              "Latitude": 0,
              "Longitude": 0,
              "Email": "info@romeroyfernandez.com",
              "Website": null,
              "Facebook": null,
              "Twitter": null,
              "Instagram": null,
              "LinkedIn": null
            },
            {
              "Title": "Lemat Abogados",
              "Content": null,
              "Gender": null,
              "Category": "Lawyer And Medical Marijuana - Cannabis Specialist",
              "Contact": "'+34952121586",
              "Address": "Alameda de Colón, 26 izda. 3º pta. 3ª",
              "City": "Málaga,Málaga",
              "State": null,
              "ZIP": 29001,
              "Country": "Spain",
              "Latitude": 0,
              "Longitude": 0,
              "Email": "jaen@lematabogados.com - granada@lematabogados.com",
              "Website": null,
              "Facebook": null,
              "Twitter": null,
              "Instagram": null,
              "LinkedIn": null
            }
           ]
          
          for(sp of serviceproviders){
console.log(sp)
            let spcord = []
            if(sp.Longitude == 0) {
                spcord.push(0)
            } else {
                spcord.push(parseFloat(sp.Longitude))
            }

            if(sp.Latitude == 0) {
                spcord.push(0)
            } else {
                spcord.push(parseFloat(sp.Latitude))
            }
            
//i have to create business service provider object and save and get id and provide it sp

                let bsnsSP = {
                    title: sp.Title,
                    //content: sp.Content,
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
        ///serviceData.addedby = req.token_decoded.d
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
        //var role = req.token_decoded.r

        
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

            /* let modes = ['driving', 'walking', 'bicycling', 'transit']
            let transits = ['bus', 'subway', 'train', 'tram', 'rail']


            let origins = '' + userData.location.lat + '%2C' + userData.location.lng + ''




            //make all destinations array 
            let destination = ''
            for (service of result.services) {
                let serv = service.toObject()
                destination += '' + serv.serviceLocation.coordinates[1] + '%2C' + serv.serviceLocation.coordinates[0] + '%7C'
            }

            let destinations
            destinations = destination.slice(0, -3)
            //get distances of each mode of each destination

            let distances = []

            //getting all distances

            for (var k = 0; k < modes.length; k++) {

                if (modes[k] != "transit") {
                    let response = await getDistance(origins, destinations, modes[k])

                    for (var p = 0; p < response.data.rows[0].elements.length; p++) {

                        let serv = result.services[p].toObject()
                        if (response.data.rows[0].elements[p].status == "OK") {

                            let distancerslt = {
                                serviceName: serv.serviceName,
                                distanceMode: modes[k],

                                distance: response.data.rows[0].elements[p].distance.text,
                                duration: response.data.rows[0].elements[p].duration.text
                            }

                            result.services[p]._doc.distances.push(distancerslt)

                        } else {
                            let distancerslt = {
                                serviceName: serv.serviceName,
                                distanceMode: modes[k],

                                distance: "No Route Could be Found",
                                duration: "No Route Could be Found"
                            }

                            result.services[p]._doc.distances.push(distancerslt)
                        }

                    }

                } else {

                    for (var m = 0; m < transits.length; m++) {
                        let response = await getDistance(origins, destinations, modes[k], transits[m])

                        for (var p = 0; p < response.data.rows[0].elements.length; p++) {
                            let serv = result.services[p].toObject()
                            if (response.data.rows[0].elements[p].status == "OK") {

                                let distancerslt = {
                                    serviceName: serv.serviceName,
                                    distanceMode: modes[k],
                                    transitMode: transits[m],
                                    distance: response.data.rows[0].elements[p].distance.text,
                                    duration: response.data.rows[0].elements[p].duration.text
                                }

                                result.services[p]._doc.distances.push(distancerslt)

                            } else {
                                let distancerslt = {
                                    serviceName: serv.serviceName,
                                    distanceMode: modes[k],
                                    transitMode: transits[m],
                                    distance: "No Route Could be Found",
                                    duration: "No Route Could be Found"
                                }

                                result.services[p]._doc.distances.push(distancerslt)
                            }

                        }
                    } //end distances response for
                }
            } //end for loop of modes

 */



            responseHelper.success(res, result, message)


        } //end else

    } catch (err) {

        responseHelper.requestfailure(res, err);
    }
}
let count = 1
var getDistance = async (origin, destination, mode, submode) => {
    console.log('getDistance called')
    console.log('count '+count)
    count++
    //console.log(service)
    /*console.log(origin)
    console.log(destination)
    console.log(mode) &transit_mode=${submode}
    console.log(submode) */

/* let newurl = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=40.6655101%2C-73.89188969999998&destinations=40.659569%2C-73.933783%7C40.729029%2C-73.851524%7C40.6860072%2C-73.6334271%7C40.598566%2C-73.7527626&mode=transit&transit_mode=bus&key=${process.env.G_API}` */

let currentUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&mode=${mode}&key=${process.env.G_API}`

if(mode == "transit"){
    //config.url = config.url+`&transit_mode=${submode}` 

    currentUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&mode=${mode}&transit_mode=${submode}&key=${process.env.G_API}`
}
    var config = {
        method: 'get',
       /*  url: `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&mode=${mode}&key=${process.env.G_API}`, */
       url: currentUrl,
        headers: {}
    };

    

    //console.log(config.url)

    let result = axios(config)
        .then(function (response) {
            //console.log('mode')
            //console.log(mode)
            //console.log(response.data.rows[0].elements) 
            //let resultset = []
            return response//.data.rows[0].elements
            /* if (response.data.rows[0].elements[0].status == "OK") {
                if(mode == "transit"){
                    distancerslt  = {
                        serviceName: service.serviceName,
                        distanceMode: mode,
                        transitMode: submode,
                        distance: response.data.rows[0].elements[0].distance.text,
                        duration: response.data.rows[0].elements[0].duration.text
                    }
                    return distancerslt
                }else{
                    distancerslt  = {
                        serviceName: service.serviceName,
                        distanceMode: mode,
                        distance: response.data.rows[0].elements[0].distance.text,
                        duration: response.data.rows[0].elements[0].duration.text
                    }
                    return distancerslt
                }
                
            } else {

                

                if (mode == "transit") {
                    distancerslt = {
                        serviceName: service.serviceName,
                        distanceMode: mode,
                        transitMode: submode,
                        distance: "No Route Could be Found",
                        duration: "No Route Could be Found"
                    }
                    return distancerslt
                } else {
                    distancerslt = {
                        serviceName: service.serviceName,
                        distanceMode: mode,
                        distance: "No Route Could be Found",
                        duration: "No Route Could be Found"
                    }
                    return distancerslt
                }

            } */
            

            //return resultset
        })
        .catch(function (error) {
            console.log(error);
            return error
        })
    return result



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



