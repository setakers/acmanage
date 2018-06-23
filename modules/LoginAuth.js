// The Auth module handles the userinfo and generates a JWT
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const getTimestamp = require('../util/getTimestamp');
const UserDao = require('../dataModels/UserDao');
const ConnPool = require('../util/ConnPool');
var userDao = new UserDao();
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
        ConnPool.doTrans(function (con) {
            userDao.getRoleByUsername(con, LoginAuth.userInfoObject.user_name, function (roles) {
                con.commit(function (roles) {
                    callback(Array.from(roles));
                })
            })
        })
    };
    this.isAuthorized = function (callback) {
        // console.log('isAuthorized: '+LoginAuth.userInfoObject.user_name+'  ' +LoginAuth.userInfoObject.password);
        ConnPool.doTrans(function (con) {
            userDao.isValidUsernameAndPassword(con, LoginAuth.userInfoObject.user_name, LoginAuth.userInfoObject.password, function (res) {
                con.commit(function () {
                    callback(res);
                })
            });
        })
    };
    this.getAccessToken = function (callback) {
        this.isAuthorized(function (ok) {
            if (!ok) {
                callback('');
            } else {
                var payload = {'user_name': userInfoObject.user_name, 'roles': null, 'iat': getTimestamp()};
                ConnPool.doTrans(function (con) {
                    userDao.getRoleByUsername(con,userInfoObject.user_name, function (str) {
                        payload.roles = str;
                        con.commit(function () {
                            callback(jwt.sign(payload, config.accessKey));
                        })
                    });

                })
            }
        });
    };
};

// LoginAuth.isValidUsername = (username) => userDataModel.isValidUsername(username);
LoginAuth.isUser = function (user_name, callback) {
    ConnPool.doTrans(function (con) {
        userDao.isValidUsername(con, user_name, function (res) {
            con.commit(function () {
                callback(res);
            })
        });
    })
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