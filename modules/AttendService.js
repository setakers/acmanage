// The Auth module handles the userinfo and generates a JWT
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const getTimestamp = require('../util/getTimestamp');
const AttendDao=require('../dataModels/AttendDao');
const ConnPool=require('../util/ConnPool');
var attendDao=new AttendDao();
var AttendService = function (userinfo) {
    this.getAttendsByCourseId = function (course_id, callback) {
        ConnPool.doTrans(function (con) {
            attendDao.getAttendsByCourseId(con,course_id,function (res) {
                callback(res);
            });
        })
    }
};


module.exports = AttendService;