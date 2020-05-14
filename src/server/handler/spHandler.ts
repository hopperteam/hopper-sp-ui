import Handler from "./handler";
import express from "express";
import * as utils from "../api/utils";

export default class SpHandler extends Handler {

    constructor() {
        super();
        this.getRouter().get("/sp/getAll", this.getAll.bind(this));
        this.getRouter().post("/sp/create", this.createSp.bind(this));
        this.getRouter().put("/sp/update", this.updateSp.bind(this));
    }

    private async getAll(req: express.Request, res: express.Response): Promise<void> {
        try {
            const data = await utils.getWithToken('/apps', req.query.token.toString());
            res.setHeader('Content-Type', 'application/json');
            res.send(data);
        } catch (error) {
            res.setHeader('Content-Type', 'application/json');
            res.send(error.response.data);
        }
    }

    private async createSp(req: express.Request, res: express.Response): Promise<void> {
        try {
            const data = await utils.postWithToken('/app', req.body, req.query.token.toString());
            res.setHeader('Content-Type', 'application/json');
            res.send(data);
        } catch (error) {
            res.setHeader('Content-Type', 'application/json');
            res.send(error.response.data);
        }
    }

    private async updateSp(req: express.Request, res: express.Response): Promise<void> {
        try {
            const data = await utils.putWithToken('/app', req.body, req.query.token.toString());
            res.setHeader('Content-Type', 'application/json');
            res.send(data);
        } catch (error) {
            res.setHeader('Content-Type', 'application/json');
            res.send(error.response.data);
        }
    }
}