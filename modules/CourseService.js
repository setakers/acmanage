// The Auth module handles the userinfo and generates a JWT
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const getTimestamp = require('../util/getTimestamp');
const AttendDao = require('../dataModels/AttendDao');
const AsStudentDao = require('../dataModels/AsStudentDao')
const UserDao = require('../dataModels/UserDao')
const ConnPool = require("../util/ConnPool");
var attendDao = new AttendDao();
var asStudentDao = new AsStudentDao();
var userDao = new UserDao();

var CourseService = function (userinfo) {
    this.getStudentsOfCourseByCourseId = function (course_id, callback) {
        var tableData = [];
        ConnPool.doTrans(function (con) {
            attendDao.getAttendsByCourseId(con, course_id, function (attends) {
                if(attends.length === 0)
                    callback(tableData)
                else {
                    attends.forEach(function (attend, idx) {
                        var tmp = {
                            'student_id': null,
                            'student_name': null,
                            'score': null,
                        };
                        tmp.score = attend['score'];
                        tmp.student_id = attend['student_id'];
                        asStudentDao.getAsStudentByStudentId(con, attend['student_id'], function (as_student) {
                            userDao.getUserByUserId(con, as_student[0]['user_id'], function (user) {
                                tmp.student_name = user[0]['user_name'];
                                tableData.push(tmp);
                                if (tableData.length === attends.length) {
                                    con.commit(function () {
                                        callback(tableData);
                                    })
                                }
                            })
                        })
                    })// callback(tableData);})}
                }
            })
        })
    }
};


module.exports = CourseService;