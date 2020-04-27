const {Handler} = require("./handler");
const {getAll, create, approve} = require("./addresserService")

class AddresserHandler extends Handler {

    constructor() {
        super();
        this.getRouter().get("/addresser/getAll", this.getAll.bind(this));
        this.getRouter().post("/addresser/create", this.createAddresser.bind(this));
        this.getRouter().get("/addresser/approve", this.approveAddresser.bind(this));
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

    async createAddresser(req, res) {
        try {
            const data = await create(req.body, req.query.token);
            res.setHeader('Content-Type', 'application/json');
            res.send(data);
        } catch (error) {
            res.setHeader('Content-Type', 'application/json');
            res.send(error.response.data);
        }
    }

    async approveAddresser(req, res) {
        try {
            if(req.query.status.toString().localeCompare("success") == 0){
                const body = {
                    systemId: req.query.internalId,
                    id: req.query.id
                };
                const data = await approve(body, req.query.token);
                if(data.status.toString().localeCompare("success") == 0){
                    res.redirect("/");
                } else{
                    res.setHeader('Content-Type', 'application/json');
                    res.send({status: data.status});
                }
            } else{
                res.setHeader('Content-Type', 'application/json');
                res.send({status: req.query.status});
            }
        } catch (error) {
            res.setHeader('Content-Type', 'application/json');
            res.send(error);
        }
    }
}

module.exports = {
    AddresserHandler
}