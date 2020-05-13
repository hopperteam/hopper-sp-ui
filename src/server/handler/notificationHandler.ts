import Handler from './handler';
import express from 'express';
import * as utils from './../api/utils';

export default class NotificationHandler extends Handler {

    constructor() {
        super();
        this.getRouter().get("/notification/getAll", this.getAll.bind(this));
        this.getRouter().post("/notification/create", this.createNotification.bind(this));
    }

    private async getAll(req: express.Request, res: express.Response): Promise<void> {
        try {
            const data = await utils.getWithToken( '/notifications', req.query.token.toString());
            res.setHeader('Content-Type', 'application/json');
            res.send(data);
        } catch (error) {
            res.setHeader('Content-Type', 'application/json');
            res.send(error.response.data);
        }
    }

    private async createNotification(req: express.Request, res: express.Response): Promise<void> {
        try {
            const data = await utils.postWithToken( '/notification', req.body, req.query.token.toString());
            res.setHeader('Content-Type', 'application/json');
            res.send(data);
        } catch (error) {
            res.setHeader('Content-Type', 'application/json');
            res.send(error.response.data);
        }
    }
}