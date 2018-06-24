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
const CourseDao = require('../dataModels/CourseDao')
let courseDao = new CourseDao()
const ClassroomDao = require('../dataModels/ClassroomDao')
let classroomDao = new ClassroomDao()
const CrossDao = require('../dataModels/CrossDao')
let crossDao = new CrossDao()

var CourseService = function (userinfo) {
    this.searchCourses = function (keyword, callback) {
        ConnPool.doTrans(function (con) {
            crossDao.searchCourses(con,keyword,function(courses){
                con.commit(function(){
                    callback(courses)
                })
            })
        })
    }
    this.getAllCourses = function(callback){
        let return_value = []
        ConnPool.doTrans(function(con){
            courseDao.getCourse(con,function(courses){
                if(courses.length === 0)
                    callback(return_value)
                else{
                    courses.forEach(function(course,idx){
                        let tmp = {
                            'course_id': course['course_id'],
                            'course_name': course['course_name'],
                            'room_name': null,
                            'credit': course['credit'],
                            'introduction': course['introduction'],
                        }
                        classroomDao.getClassroomByClassroomId(con,course.classroom_id,function(classroom){
                            tmp['room_name']=classroom[0]['room_name']
                            return_value.push(tmp)
                            if(return_value.length == courses.length)
                                con.commit(function(){
                                    callback(return_value)
                                })
                        })
                    })
                }
            })
        })
    }
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