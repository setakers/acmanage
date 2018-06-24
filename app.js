const bodyParser = require('body-parser');
const fs = require('fs');
const express = require('express');
const config = require('./config/config');
const createError = require('http-errors');
const app = express();

// Requiring routers
// The results are stored in var route:
// eg. ./routers/hello.js will be imported as:
//      route['hello']
// or simply:
//      route.hello
var route = {};
var routesPath = './routes/'
var routerFiles = fs.readdirSync(routesPath);
routerFiles.map(filename => {
    if (filename.split('.').pop() === 'js') {
        filename = filename.split('.')[0];
        route[filename] = require(routesPath + filename);
    }
});

// Body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// Static
app.use('', express.static('public'));
// Here to route modules
app.use(config.getApiPath('login'), route.login);
app.use(config.getApiPath('info'), route.info);
app.use(config.getApiPath('score'), route.score);
app.use(config.getApiPath('select'), route.select);
app.use(config.getApiPath('account'), route.account);


// Error handling
// app.use((req, res, next) => {
//     next(createError(404));
// });

module.exports = app;