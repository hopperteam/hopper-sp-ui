import Handler from "./handler";
import * as express from "express";
import * as utils from "../utils";
import Subscriber from "../types/subscriber";
import App from "../types/app";
import querystring from "querystring";
import * as subscriberAPI from "../api/subscriberAPI";
import {Config} from "../../config";

export default class SubscriberHandler extends Handler {

    constructor() {
        super();
        this.getRouter().get("/subscribers", this.getAll.bind(this));
        this.getRouter().post("/subscriber", this.create.bind(this));
        this.getRouter().get("/subscriber", this.approve.bind(this));
    }

    private async getAll(req: express.Request, res: express.Response): Promise<void> {
        try {
            const subscriber = await Subscriber.find({userId: req.query.token}).populate("app");
            res.json(subscriber);
        } catch (e) {
            utils.handleError(e, res, 400);
        }
    }

    private async create(req: express.Request, res: express. Response): Promise<void> {
        try {
            const app = await App.findOne({id: req.body.appId, userId: req.query.token});
            if (!app)
                throw new Error("Could not find app");
            const subscriptionRequest = await subscriberAPI.createSubscriber(req.body, req.query.token.toString(),
                Config.instance.passphrase, Config.instance.callbackUrl, app);

            const query = querystring.stringify({
                "id": app.id,
                "content": subscriptionRequest
            });
            res.json({
                "status": "success",
                "redirect": Config.instance.redirectUrl + "?" + query
            });

        } catch (e) {
            utils.handleError(e, res);
        }
    }

    private async approve(req: express.Request, res: express. Response): Promise<void> {
        try {
            if(!req.query.status.toString().localeCompare("success")){
                const subscriber = await Subscriber.findOne({_id: req.query.internalId, userId: req.query.token});
                if(!subscriber)
                    throw new Error("Could not find subscriber");
                subscriber.id = req.query.id;
                await subscriber.updateOne(subscriber);
                res.redirect("/");
            } else{
                console.log(req.query.status);
                console.log(req.query.error);
                res.redirect("/subscribe");
            }
        } catch (e) {
            utils.handleError(e, res, 400);
        }
    }
}
