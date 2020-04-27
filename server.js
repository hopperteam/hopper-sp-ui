require('dotenv').config(); // read .env files
const express = require('express');
const {UserHandler} = require("./lib/userHandler");
const {SpHandler} = require("./lib/spHandler");
const {AddresserHandler} = require("./lib/addresserHandler");
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3001;

// Set public folder as root
app.use(express.static('public'));

// Use bodyparser
app.use(bodyParser.json());

// Allow front-end access to node_modules folder
app.use('/scripts', express.static(`${__dirname}/node_modules/`));

app.use(new UserHandler().getRouter());
app.use(new SpHandler().getRouter());
app.use(new AddresserHandler().getRouter());

// Redirect all traffic to index.html
app.use((req, res) => res.sendFile(`${__dirname}/public/index.html`));

// Listen for HTTP requests on port 3001
app.listen(port, () => {
    console.log('listening on %d', port);
});
