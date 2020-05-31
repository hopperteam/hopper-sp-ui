import * as express from "express";
import Handler from "./handler";
import {Config} from "../../config";

export default class UserHandler extends Handler {

    constructor() {
        super();
        this.getRouter().get("/user", this.getUser.bind(this));
        this.getRouter().get("/logout", this.logout.bind(this));
    }

    private async getUser(req: express.Request, res: express.Response): Promise<void> {
        res.json({
            "firstName": req.session.user.firstName,
            "lastName": req.session.user.lastName,
            "email": req.session.user.email
        });
    }

    private async logout(req: express.Request, res: express.Response): Promise<void> {
        res.json({
            "redirect": Config.instance.authRedirectUrl + "?target=" + Config.instance.baseUrl,
        });
    }
}
