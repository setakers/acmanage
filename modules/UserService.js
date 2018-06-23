// The Auth module handles the userinfo and generates a JWT
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const getTimestamp = require('../util/getTimestamp');
const UserDao = require('../dataModels/UserDao');

const clone = require('../util/utils');

var userDao = new UserDao();
var UserService = function () {
    this.getUserByUsername = function (user_name, callback) {
        userDao.getUserByUserName(user_name, callback);
    }
};


module.exports = UserService;