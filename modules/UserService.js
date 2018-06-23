const ConnPool = require('../util/ConnPool');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const getTimestamp = require('../util/getTimestamp');
const UserDao = require('../dataModels/UserDao');

const clone = require('../util/utils');

var userDao = new UserDao();
var UserService = function () {
    this.getUserByUsername = function (user_name, callback) {
        ConnPool.doTrans(function (con) {
            userDao.getUserByUserName(con, user_name, function (res) {
                callback(res);
            });
        })
    }
};


module.exports = UserService;