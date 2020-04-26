require('dotenv').config();
const axios = require('axios');

// Axios Client declaration
const api = axios.create({
    baseURL: process.env.BACKENDURL,
    timeout: 5000,
});

// Generic GET request function
const get = async (url, token) => {

    const {data} = await api.get(url, {
        params: {
            token: token
        }
    });

    return data;
};

module.exports = {
    getAll: (token) => get(`/apps`, token),
};