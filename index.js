require('dotenv').config()

const express = require('express');

const bodyParser = require('body-parser');
const routes = require('../urbanpal/src/route/app');
const cors = require('cors');

require('./src/config/db.js');

// create express app

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

// Routes

app.use(routes);

// listen for request
app.listen(process.env.url,() =>{
    console.log('Server is listening to ', process.env.url)
})