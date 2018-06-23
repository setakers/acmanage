// The Auth module handles the userinfo and generates a JWT
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const getTimestamp = require('../util/getTimestamp');
const AsStudentDao = require('../dataModels/AsStudentDao');
const ConnPool = require('../util/ConnPool');
const clone = require('../util/utils');

var asStudentDao = new AsStudentDao();
var AsStudentService = function () {
    this.getAsStudentByUserId = function (user_id, callback) {
        ConnPool.doTrans(function (conn) {
            asStudentDao.getAsStudentByUserId(conn, user_id, function (res) {
                conn.commit(function () {
                    callback(res);
                })
            });
        })
    }
};


module.exports = AsStudentService;