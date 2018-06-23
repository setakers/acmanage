// The Auth module handles the userinfo and generates a JWT
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const getTimestamp = require('../util/getTimestamp');
const CrossDao = require('../dataModels/CrossDao');
const ConnPool = require('../util/ConnPool');
var attendDao = new AttendDao();
var CrossService = function (userinfo) {
    this.getAttendsByCourseId = function (course_id, callback) {
        ConnPool.doTrans(function (con) {
            attendDao.getAttendsByCourseId(con, course_id, function (res) {
                callback(res);
            });
        })
    }
};


module.exports = CrossService;