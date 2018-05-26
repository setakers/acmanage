const express   = require('express');
const fs        = require('fs');
const config    = require('./config/config');
const app       = express();

// Requiring routers
// The results are stored in var route:
// eg. ./routers/hello.js will be imported as:
//      route['hello']
// or simply:
//      route.hello
var route       = {};
var routesPath  = './routes/'
var routerFiles = fs.readdirSync(routesPath);
routerFiles.map(filename => {
    if(filename.split('.').pop() === 'js') {
        filename = filename.split('.')[0];
        route[filename] = require(routesPath + filename);
    }
})

// Static
app.use(config.getStaticPath(''), express.static('public'));
// Here to route modules
app.use(config.getApiPath('hello'), route.hello);

app.use((req, res, next) => {
    next(createError(404));
});

module.exports = app;