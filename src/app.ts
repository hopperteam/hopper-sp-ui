import express from "express";
import {Config} from "./config";
import bodyParser from "body-parser";
import path from "path";
import mongoose from "mongoose";
import NotificationHandler from "./server/handler/notificationHandler";
import SpHandler from "./server/handler/spHandler";
import SubscriberHandler from "./server/handler/subscriberHandler";
import UserHandler from "./server/handler/userHandler";
import cookieParser from "cookie-parser";

class SPServer {
    private readonly server: express.Application;

    constructor() {
        this.server = express();

        if(Config.loadConfig()){
            process.exit();
        }

        // Use body parser
        this.server.use(bodyParser.json());

        // Use cookie parser
        this.server.use(cookieParser());
    }

    public async start(): Promise<void> {
        // Connect database
        mongoose.connect(Config.instance.mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        }, (err: any) => {
            if (err) {
                console.log("Can not connect to database!");
                console.log(err.message);
            } else {
                console.log("Successfully connected to database!");
            }
        });

        // Serve public folder
        this.server.use(express.static(
            path.resolve(`${__dirname}/public`)));

        // Allow front-end access to node_modules folder
        this.server.use("/scripts", express.static(path.resolve(`${__dirname}/../node_modules/`)));

        // Use custom routers
        this.server.use(new NotificationHandler().getRouter());
        this.server.use(new SpHandler().getRouter());
        this.server.use(new SubscriberHandler().getRouter());
        this.server.use(new UserHandler().getRouter());

        // Redirect all traffic to index.html (even wrong ones to show error)
        this.server.use((req: express.Request, res: express.Response) => {
            res.sendFile(path.resolve(`${__dirname}/public/index.html`))
        });

        // Listen for HTTP requests
        this.server.listen(Config.instance.port, err => {
            if (err) {
                return console.error(err);
            }
            return console.log(`server is listening on ${Config.instance.port}`);
        });
    }
}

const app = new SPServer();
app.start();