// The Auth module handles the userinfo and generates a JWT
const jwt           = require('jsonwebtoken');
const config        = require('../config/config');
const getTimestamp  = require('../util/getTimestamp');
const userDataModel = require('../dataModels/user');

var LoginAuth = function(userinfo) {
    this.userinfo = userinfo;
    this.isValidUser = false;
    this.isAuthorized = false;
    // Return an empty string if we cannot get a valid token
    this.getAccessToken = function (callback) {
        if(!this.isAuthorized) return '';
        var payload = {
            username:   userinfoObject.username,
            roles:      this.userRoles,
            iat:        getTimestamp()
        };
        if(callback) return jwt.sign(payload, config.accessKey, callback)
        else return jwt.sign(payload, config.accessKey);
    };
    this.userRoles = [];
    this.getUserRoles = () => Array.from(this.userRoles);
    var userinfoObject = this.userinfoObject
        = {username: null, password: null, timestamp: null};
    if(typeof userinfo !== 'string') return;
    var originalString = Buffer.from(userinfo, 'base64').toString();
    try {
        var tempObject = JSON.parse(originalString);
        for(prop in tempObject) {
            userinfoObject[prop] = tempObject[prop];
        }
    } catch (e) {
        console.log(e);
        return;
    }
    this.isValidUser = userDataModel.isUser(userinfoObject.username);
    if(!this.isValidUser) return;
    if(getTimestamp() - userinfoObject.timestamp < config.sessionTimeLimit) {
        this.isAuthorized = userDataModel.isAuthorized(userinfoObject.username, userinfoObject.password);
    }
    if(!this.isAuthorized) return;
    // Get user roles
    this.userRoles = userDataModel.getRole(userinfoObject.username);
}

LoginAuth.isUser = (username) => userDataModel.isUser(username);
LoginAuth.isVerifiedAccessToken = (token) => {
    if(typeof token !== 'string') return false;
    try {
        var decoded = jwt.verify(token, config.accessKey);
        if(getTimestamp() - decoded.iat > config.sessionTimeLimit) return false;
        return true;
    } catch(e) {
        return false;
    }
}
LoginAuth.getRoles = (token) => {
    try {
        var decoded = JSON.parse(jwt.verify(token, config.accessKey));
        return Array.from(decoded.roles);
    } catch(e) {
        return [];
    }
}

module.exports = LoginAuth;