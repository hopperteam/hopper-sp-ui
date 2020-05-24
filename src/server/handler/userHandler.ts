import * as express from "express";
import Handler from "./handler";
import User from "../types/user";
import * as utils from "../utils";
import {Config} from "../../config";

export default class UserHandler extends Handler {

    constructor() {
        super();
        this.getRouter().get("/user", this.getUser.bind(this));
        this.getRouter().get("/logout", this.logout.bind(this));
    }

    private async getUser(req: express.Request, res: express.Response): Promise<void> {
        res.json({
            // @ts-ignore
            "firstName": req.session.user.firstName,
            // @ts-ignore
            "lastName": req.session.user.lastName,
            // @ts-ignore
            "email": req.session.user.email
        });
    }

    private async logout(req: express.Request, res: express.Response): Promise<void> {
        res.json({
            // @ts-ignore
            "redirect": Config.instance.authRedirectUrl + "?target=" + Config.instance.baseUrl,
        });
    }
}
