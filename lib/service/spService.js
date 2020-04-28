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
    getAll: (token) => get(`/apps`, token),
    create: (body, token) => post("/app", body, token),
    update: (body, token) => put("/app", body, token)
};