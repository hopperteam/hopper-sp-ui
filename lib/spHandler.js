const {Handler} = require("./handler");
const {getAll} = require('./spService');

class SpHandler extends Handler {

    constructor() {
        super();
        this.getRouter().get("/sp/getAll", this.getAll.bind(this));
    }

    getRouter(){
        return this.router;
    }

    async getAll(req, res) {
        try {
            const data = await getAll(req.query.token);
            res.setHeader('Content-Type', 'application/json');
            res.send(data);
        } catch (error) {
            res.setHeader('Content-Type', 'application/json');
            res.send(error.response.data);
        }
    }
}

module.exports = {
    SpHandler
};