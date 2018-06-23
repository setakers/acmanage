// The Auth module handles the userinfo and generates a JWT
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const getTimestamp = require('../util/getTimestamp');
const AttendDao = require('../dataModels/AttendDao');
const AsStudentDao = require('../dataModels/AsStudentDao')
const UserDao = require('../dataModels/UserDao')
var attendDao = new AttendDao();
var asStudentDao = new AsStudentDao();
var userDao = new UserDao();

var CourseService = function (userinfo) {
    this.getStudentsOfCourseByCourseId = function (course_id, callback) {
        var tableData = [];
        attendDao.getAttendsByCourseId(course_id, function (attends) {
            console.log(attends)
            attends.forEach(function (attend, idx) {
                var tmp = {
                    'student_id': null,
                    'student_name': null,
                    'score': null,
                };
                tmp.score = attend['score'];
                tmp.student_id = attend['student_id'];
                asStudentDao.getAsStudentByStudentId(attend['student_id'], function (as_student) {
                    console.log(as_student)
                    userDao.getUserByUserId(as_student[0]['user_id'], function (user) {
                        console.log(user)
                        tmp.student_name = user[0]['user_name'];
                        tableData.push(tmp);
                        if (tableData.length === attends.length) {
                            callback(tableData);
                        }
                    })
                })
            })
            // callback(tableData);
        })
    }
};


module.exports = CourseService;