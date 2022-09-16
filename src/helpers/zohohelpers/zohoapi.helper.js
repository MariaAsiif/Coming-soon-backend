
const _ = require('lodash');
let authHeader = require('./auth-header').authHeader
var axios = require('axios')
const { writeFile } = require( 'fs/promises')
let generateGrantToken = require('../../helpers/zohohelpers/zohotokens').generateGrantToken

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
            console.log('getZoho success') 
      console.log(response.data) 
           
            return response.data
            
        })
        .catch(async function (error) {
            console.log('getZoho failure')
            //console.log(error)
            console.log(error.response.status)
            if(error.response.status == 400 || error.response.status == 401){
                console.log('get new token')

                let newToken = await generateGrantToken()
console.log('after generate token' + newToken.access_token)
                let file = '../Coming-soon-backend/src/config/zohoconfigs/accesstoken.txt'
        
        let newre = await writeFile(file, newToken.access_token, 'utf8')
console.log('after write file')
              return await getZoho(module)
               console.log('after again zoho get')
            }
           // return JSON.stringify(error)
            
        })
    return result



} //end function




module.exports = {
    getZoho
};
