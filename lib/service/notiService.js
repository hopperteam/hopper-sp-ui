const {initApi} = require("../utils");

// Axios Client declaration
const api = initApi();

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

module.exports = {
    getAll: (token) => get(`/notifications`, token),
    create: (body, token) => post("/notification", body, token)
};