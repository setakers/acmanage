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
    this.modifyCourse =function(new_course,callback){
        ConnPool.doTrans(function (con) {
            courseDao.modifyCourse(con,new_course, function (res) {
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
    this.addCourse =function(new_course,callback){
        ConnPool.doTrans(function (con) {
            courseDao.addCourse(con,new_course, function (res) {
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
    this.listCourse =function(callback){
        ConnPool.doTrans(function (con) {
            courseDao.getCourse(con, function (res) {
                callback(res);
            });
        })
    }
    this.checkValidClassroom = function(room_name,callback){
        ConnPool.doTrans(function (con) {
            classroomDao.getClassroomByRoomname(con,room_name, function (res) {
                con.commit(function () {
                    if(res.length !== 0)
                        callback(false)
                    else
                        callback(true)
                })
            })
        })
    }
    this.modifyClassroom =function(new_classroom,callback){
        ConnPool.doTrans(function (con) {
            classroomDao.modifyClassroom(con,new_classroom, function (res) {
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
    this.addClassroom =function(new_classroom,callback){
        ConnPool.doTrans(function (con) {
            classroomDao.addClassroom(con,new_classroom, function (res) {
                console.log("addddddd")
                if(res === null)
                    callback(false)
                else
                    con.commit(function () {
                        console.log("commmmmm")
                        console.log(res.affectedRows)
                        if (res.affectedRows !== 0) {
                            callback(true);
                        } else {
                            callback(false);
                        }
                    })
            })
        })
    }
    this.listClassroom =function(callback){
        ConnPool.doTrans(function (con) {
            classroomDao.listClassroom(con, function (res) {
                callback(res);
            });
        })
    }
    this.getAllOpenCourses= function (callback) {
        ConnPool.doTrans(function (con) {
            crossDao.getAllOpenCourses(con,function(courses){
                con.commit(function(){
                    callback(courses)
                })
            })
        })
    }
    this.getAllSelectCourses= function (callback) {
        ConnPool.doTrans(function (con) {
            crossDao.getAllSelectCourses(con,function(courses){
                con.commit(function(){
                    callback(courses)
                })
            })
        })
    }
    this.getOpenCoursesByTeacherId= function (teacher_id,callback) {
        ConnPool.doTrans(function (con) {
            crossDao.getOpenCoursesByTeacherId(con,teacher_id,function(courses){
                con.commit(function(){
                    callback(courses)
                })
            })
        })
    }
    this.getFreeRooms = function (callback) {
        ConnPool.doTrans(function (con) {
            crossDao.getFreeRooms(con,function(rooms){
                con.commit(function(){
                    callback(rooms)
                })
            })
        })
    }
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