import Handler from "./handler";
import express from "express";
import * as utils from "../api/utils";

export default class SubscriberHandler extends Handler {

    constructor() {
        super();
        this.getRouter().get("/subscriber/getAll", this.getAll.bind(this));
        this.getRouter().post("/subscriber/create", this.createSubscriber.bind(this));
        this.getRouter().get("/subscriber/approve", this.approveSubscriber.bind(this));
    }

    private async getAll(req: express.Request, res: express.Response): Promise<void> {
        try {
            const data = await utils.getWithToken('/subscribers', req.query.token.toString());
            res.setHeader('Content-Type', 'application/json');
            res.send(data);
        } catch (error) {
            res.setHeader('Content-Type', 'application/json');
            res.send(error.response.data);
        }
    }

    private async createSubscriber(req: express.Request, res: express.Response): Promise<void> {
        try {
            const data = await utils.postWithToken('/subscriber', req.body, req.query.token.toString());
            res.setHeader('Content-Type', 'application/json');
            res.send(data);
        } catch (error) {
            res.setHeader('Content-Type', 'application/json');
            res.send(error.response.data);
        }
    }

    private async approveSubscriber(req: express.Request, res: express.Response): Promise<void> {
        try {
            if(!req.query.status.toString().localeCompare("success")){
                const body = {
                    systemId: req.query.internalId,
                    id: req.query.id
                };
                const data = await utils.putWithToken( '/subscriber',body, req.query.token.toString());
                if(!data.status.toString().localeCompare("success")){
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