const axios = require('axios');

// Axios Client declaration
function initApi () {
    // Use backend url from .env
    const backendUrl = process.env.BACKENDURL;
    if(!backendUrl){
        console.log("Missing BACKENDURL in environment definition");
        process.exit();
    }

    return axios.create({
        baseURL: backendUrl,
        timeout: 5000,
    });
}

module.exports = {
    initApi
};