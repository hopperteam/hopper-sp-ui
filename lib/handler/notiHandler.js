const {Handler} = require("./handler");
const {getAll, create} = require("../service/notiService");

class NotificationHandler extends Handler {

    constructor() {
        super();
        this.getRouter().get("/notification/getAll", this.getAll.bind(this));
        this.getRouter().post("/notification/create", this.createNotification.bind(this));
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

    async createNotification(req, res) {
        try {
            const data = await create(req.body, req.query.token);
            res.setHeader('Content-Type', 'application/json');
            res.send(data);
        } catch (error) {
            res.setHeader('Content-Type', 'application/json');
            res.send(error.response.data);
        }
    }
}

module.exports = {
    NotificationHandler
};