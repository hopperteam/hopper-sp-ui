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

// Generic POST request function
const post = async (url, body, token) => {

    const {data} = await api.post(url, body, {
        params: {
            token: token
        }
    });
    return data;
};

// Generic PUT request function
const put = async (url, body, token) => {

    const {data} = await api.put(url, body, {
        params: {
            token: token
        }
    });
    return data;
};

module.exports = {
    getAll: (token) => get(`/addressers`, token),
    create: (body, token) => post("/addresser", body, token),
    approve: (body, token) => put("/addresser", body, token)
};