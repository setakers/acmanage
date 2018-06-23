// The Auth module handles the userinfo and generates a JWT
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const getTimestamp = require('../util/getTimestamp');
const UserDao = require('../dataModels/UserDao');
var userDao=new UserDao();
var LoginAuth = function (userinfo) {
    this.userinfo = userinfo;
    var userInfoObject = LoginAuth.userInfoObject = {user_name: null, password: null, timestamp: null};
    if (typeof userinfo !== 'string') return;
    var originalString = Buffer.from(userinfo, 'base64').toString();
    try {
        var tempObject = JSON.parse(originalString);
        for (var prop in tempObject) {
            LoginAuth.userInfoObject[prop] = tempObject[prop];
        }
    } catch (e) {
        console.log(e);
        return;
    }
    this.getUserRoles = function (callback) {
        // userDataModel.getRoleByUsername('admin', function (roles) {
        userDao.getRoleByUsername(LoginAuth.userInfoObject.user_name, function (roles) {
            callback(Array.from(roles));
        })
    };
    this.isAuthorized = function (callback) {
        console.log('isAuthorized: '+LoginAuth.userInfoObject.user_name+'  ' +LoginAuth.userInfoObject.password);
        userDao.isValidUsernameAndPassword(LoginAuth.userInfoObject.user_name, LoginAuth.userInfoObject.password, callback);
    };
    this.getAccessToken = function (callback) {
        this.isAuthorized(function (ok) {
            if (!ok) {
                callback('');
            } else {
                var payload = {'user_name': userInfoObject.user_name, 'roles': null, 'iat': getTimestamp()};
                userDao.getRoleByUsername(userInfoObject.user_name, function (str) {
                    payload.roles = str;
                });
                callback(jwt.sign(payload, config.accessKey));
            }
        });
    };
};

// LoginAuth.isValidUsername = (username) => userDataModel.isValidUsername(username);
LoginAuth.isUser = function (user_name, callback) {
    userDao.isValidUsername(user_name, callback);
};


LoginAuth.isVerifiedAccessToken = function (token, callback) {
    if (typeof token !== 'string') {
        callback(false);
    }
    try {
        var decoded = jwt.verify(token, config.accessKey);
        if (getTimestamp() - decoded.iat > config.sessionTimeLimit) {
            callback(false);
        }
        callback(true);
    } catch (e) {
        callback(false);
    }
};
LoginAuth.getRoles = (token) => {
    try {
        var decoded = JSON.parse(jwt.verify(token, config.accessKey));
        return Array.from(decoded.roles);
    } catch (e) {
        return [];
    }
};
LoginAuth.getUsername = (token) => {
    try {
        var decoded = JSON.parse(jwt.verify(token, config.accessKey));
        return decoded.user_name;
    } catch (e) {
        return '';
    }
};

module.exports = LoginAuth;