require('dotenv').config();
const axios = require('axios');

// Axios Client declaration
const api = axios.create({
    baseURL: process.env.BACKENDURL,
    timeout: 5000,
});

// Generic POST request function
const post = async (url, body) => {

    const {data} = await api.post(url, body);
    return data;
};

module.exports = {
    signIn: (body) => post(`/signIn`, body),
    signUp: (body) => post('/signUp', body),
};