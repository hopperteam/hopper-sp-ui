const {Handler} = require("./handler");
const {signIn, sign} = require('./userService');
const {errorHandler} = require('./errorHandler');

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
            console.log(req.body);
            const data = await signIn(req.body);
            //res.setHeader('Content-Type', 'application/json');
            //res.send(data);
            //console.log(data);
        } catch (error) {
            //console.log(error);
        }
    }
}

module.exports = {
    UserHandler
};