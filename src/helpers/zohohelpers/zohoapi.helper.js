
const _ = require('lodash');
let authHeader = require('./auth-header').authHeader
var axios = require('axios')

const responseHelper = require('../../helpers/response.helper')

var getZoho = async (module) => {
    console.log('getZoho called')
    //console.log(await authHeader())
    let authheder = await authHeader()
    let currentUrl = `https://books.zoho.com/api/v3/${module}?organization_id=${process.env.ZOHO_SELF_CLIENT_ORGANIZATION_ID}`


    var config = {
        method: 'get',       
       url: currentUrl,
        headers: {...authheder}
    };

    console.log(config)

    let result = axios(config)
        .then(function (response) {
            console.log('success') 
      //console.log(response.data) 
           
            return response.data
            
        })
        .catch(function (error) {
            console.log('failure')
            console.log(error)
            return JSON.stringify(error)
            //return responseHelper.success(req, error, '')

            //return responseHelper.makeJson(error)
        })
    return result



} //end function




module.exports = {
    getZoho
};
