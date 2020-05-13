import Handler from "./handler";
import express from "express";
import * as utils from "../api/utils";

export default class UserHandler extends Handler {

    constructor() {
        super();
        this.getRouter().post("/user/signIn", this.signIn.bind(this));
        this.getRouter().post("/user/signUp", this.signUp.bind(this));
    }

    private async signIn(req: express.Request, res: express.Response): Promise<void> {
        try {
            const data = await utils.post('/signIn', req.body);
            res.setHeader('Content-Type', 'application/json');
            res.send(data);
        } catch (error) {
            res.setHeader('Content-Type', 'application/json');
            res.send(error.response.data);
        }
    }

    private async signUp(req: express.Request, res: express.Response): Promise<void> {
        try {
            const data = await utils.post('/signUp', req.body);
            res.setHeader('Content-Type', 'application/json');
            res.send(data);
        } catch (error) {
            res.setHeader('Content-Type', 'application/json');
            res.send(error.response.data);
        }
    }
}