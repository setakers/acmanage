// The Auth module handles the userinfo and generates a JWT
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const getTimestamp = require('../util/getTimestamp');
const AttendDao=require('../dataModels/AttendDao');
var attendDao=new AttendDao();
var AttendService = function (userinfo) {
    this.getAttendsByCourseId = function (course_id, callback) {
        attendDao.getAttendsByCourseId(course_id,callback);
    }
};


module.exports = AttendService;