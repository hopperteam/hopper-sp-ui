const express = require("express");

class Handler {

    constructor() {
        this.router = express.Router();
    }

    getRouter(){
        return this.router;
    }
}

module.exports = {
    Handler
};