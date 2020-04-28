require('dotenv').config(); // read .env files
const express = require('express');
const {UserHandler} = require("./lib/handler/userHandler");
const {SpHandler} = require("./lib/handler/spHandler");
const {SubscriberHandler} = require("./lib/handler/subscriberHandler");
const {NotificationHandler} = require("./lib/handler/notiHandler");
const bodyParser = require('body-parser');

// Init
const app = express();

// Use port from .env
const port = process.env.PORT;
if(!port){
    console.log("Missing PORT in environment definition");
    return;
}

// Set public folder as root
app.use(express.static('public'));

// Use bodyparser
app.use(bodyParser.json());

// Allow front-end access to node_modules folder
app.use('/scripts', express.static(`${__dirname}/node_modules/`));

// Use custom routers
app.use(new UserHandler().getRouter());
app.use(new SpHandler().getRouter());
app.use(new SubscriberHandler().getRouter());
app.use(new NotificationHandler().getRouter());

// Redirect all traffic to index.html
app.use((req, res) => res.sendFile(`${__dirname}/public/index.html`));

// Listen for HTTP requests
app.listen(port, () => {
    console.log('listening on %d', port);
});
