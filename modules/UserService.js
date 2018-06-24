const ConnPool = require('../util/ConnPool');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const getTimestamp = require('../util/getTimestamp');
const UserDao = require('../dataModels/UserDao');

const clone = require('../util/utils');

var userDao = new UserDao();
var UserService = function () {
    this.modifyAccount =function(new_info,callback){
        ConnPool.doTrans(function (con) {
            userDao.modifyAccount(con,new_info, function (res) {
                con.commit(function () {
                    if (res.affectedRows !== 0) {
                        callback(true);
                    } else {
                        callback(false);
                    }
                })
            })
        })
    }
    this.addAccount =function(new_account,callback){
        ConnPool.doTrans(function (con) {
            userDao.addAccount(con,new_account, function (res) {
                con.commit(function () {
                    if (res.affectedRows !== 0) {
                        callback(true);
                    } else {
                        callback(false);
                    }
                })
            })
        })
    }
    this.listAccount =function(callback){
        ConnPool.doTrans(function (con) {
            userDao.listAccount(con, function (res) {
                callback(res);
            });
        })
    }
    this.searchUser = function (keyword, callback) {
        ConnPool.doTrans(function (con) {
            userDao.searchUser(con, keyword, function (res) {
                callback(res);
            });
        })
    }
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
                            } else {
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
                        } else {
                            conn.commit(function () {
                                callback(true);
                            })
                        }
                    }
                })
            })
        })
    }

    this.checkPassword = function (user, callback) {
        ConnPool.doTrans(function (conn) {
            userDao.getUserByUserId(conn, user['user_id'], function (u) {
                if (user['password'] === u[0]['password']) {
                    conn.commit(function () {
                        callback(true);
                    })
                } else {
                    conn.commit(function () {
                        callback(false);
                    })
                }
            })
        })
    }
    this.updatePassword = function (user, callback) {
        ConnPool.doTrans(function (conn) {
            userDao.updatePasswordByUserId(conn, user, function (res) {
                // if (res) {
                callback(true);
                // } else {
                //     callback(false);
                // }
            })
        })
    }
};


module.exports = UserService;