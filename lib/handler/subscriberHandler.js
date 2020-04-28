const {Handler} = require("./handler");
const {getAll, create, approve} = require("../service/subscriberService")

class SubscriberHandler extends Handler {

    constructor() {
        super();
        this.getRouter().get("/subscriber/getAll", this.getAll.bind(this));
        this.getRouter().post("/subscriber/create", this.createSubscriber.bind(this));
        this.getRouter().get("/subscriber/approve", this.approveSubscriber.bind(this));
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

    async createSubscriber(req, res) {
        try {
            const data = await create(req.body, req.query.token);
            res.setHeader('Content-Type', 'application/json');
            res.send(data);
        } catch (error) {
            res.setHeader('Content-Type', 'application/json');
            res.send(error.response.data);
        }
    }

    async approveSubscriber(req, res) {
        try {
            if(req.query.status.toString().localeCompare("success") == 0){
                const body = {
                    systemId: req.query.internalId,
                    id: req.query.id
                };
                const data = await approve(body, req.query.token);
                if(data.status.toString().localeCompare("success") == 0){
                    console.log(data)
                    res.redirect("/");
                } else{
                    res.setHeader('Content-Type', 'application/json');
                    res.send({status: data.status});
                }
            } else{
                console.log(req.query.status)
                res.redirect("/");
            }
        } catch (error) {
            res.setHeader('Content-Type', 'application/json');
            res.send(error);
        }
    }
}

module.exports = {
    SubscriberHandler: SubscriberHandler
}