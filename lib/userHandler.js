const {Handler} = require("./handler");
const {signIn, sign} = require('./userService');

class UserHandler extends Handler {

    constructor() {
        super();
        this.getRouter().post("/user/signIn", this.signIn.bind(this));
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
}

module.exports = {
    UserHandler
};