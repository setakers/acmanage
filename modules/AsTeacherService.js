// The Auth module handles the userinfo and generates a JWT
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const getTimestamp = require('../util/getTimestamp');
const AsTeacherDao= require('../dataModels/AsTeacherDao');

const clone = require('../util/utils');

var asTeacherDao= new AsTeacherDao();
var AsStudentService = function () {
    this.getAsTeacherByUserId= function (user_id, callback) {
        asTeacherDao.getAsTeacherByUserId(user_id,callback);
    }
};


module.exports = AsStudentService ;