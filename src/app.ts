import express from 'express';
import {Config} from './config';
import bodyParser from 'body-parser';
import path from 'path';
import NotificationHandler from "./server/handler/notificationHandler";
import SpHandler from "./server/handler/spHandler";
import SubscriberHandler from "./server/handler/subscriberHandler";
import UserHandler from "./server/handler/userHandler";

class SPServer {
    private readonly server: express.Application;

    constructor() {
        this.server = express();

        if(Config.loadConfig()){
            process.exit();
        }

        // Use bodyparser
        this.server.use(bodyParser.json());
    }

    public async start(): Promise<void> {
        // Serve public folder
        this.server.use(express.static(
            path.resolve(`${__dirname}/public`)));

        // Allow front-end access to node_modules folder
        this.server.use('/scripts', express.static(path.resolve(`${__dirname}/../node_modules/`)));

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