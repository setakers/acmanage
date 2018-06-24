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
    this.updateUser = function (user, callback) {
        ConnPool.doTrans(function (conn) {
            userDao.updateUserNameByUserId(conn, user, function (res) {
                userDao.updateGenderByUserId(conn, user, function (res) {
                    if (user['email'] !== '') {
                        userDao.updateEmailByUserId(conn, user, function (res) {
                            if (user['phone'] !== '') {
                                userDao.updatePhoneByUserId(conn, user, function (res) {
                                    conn.commit(function () {
                                        callback(true);
                                    })
                                })
                            }else{
                                conn.commit(function () {
                                    callback(true);
                                })
                            }
                        })
                    } else {
                        if (user['phone'] !== '') {
                            userDao.updatePhoneByUserId(conn, user, function (res) {
                                conn.commit(function () {
                                    callback(true);
                                })
                            })
                        }else{
                            conn.commit(function () {
                                callback(true);
                            })
                        }
                    }
                })
            })
        })
    }
};


module.exports = UserService;