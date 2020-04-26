const {Handler} = require("./handler");
const {signIn, signUp} = require('./userService');

class UserHandler extends Handler {

    constructor() {
        super();
        this.getRouter().post("/user/signIn", this.signIn.bind(this));
        this.getRouter().post("/user/signUp", this.signUp.bind(this));
    }

    getRouter(){
        return this.router;
    }

    async signIn(req, res) {
        try {
            const data = await signIn(req.body);
            res.setHeader('Content-Type', 'application/json');
            res.send(data);
        } catch (error) {
            res.setHeader('Content-Type', 'application/json');
            res.send(error.response.data);
        }
    }

    async signUp(req, res) {
        try {
            const data = await signUp(req.body);
            res.setHeader('Content-Type', 'application/json');
            res.send(data);
        } catch (error) {
            res.setHeader('Content-Type', 'application/json');
            res.send(error.response.data);
        }
    }
}

module.exports = {
    UserHandler
};