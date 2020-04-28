const {initApi} = require("../utils");

// Axios Client declaration
const api = initApi();

// Generic POST request function
const post = async (url, body) => {

    const {data} = await api.post(url, body);
    return data;
};

module.exports = {
    signIn: (body) => post(`/signIn`, body),
    signUp: (body) => post('/signUp', body),
};