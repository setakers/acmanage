// The Auth module handles the userinfo and generates a JWT
const jwt = require('jsonwebtoken');
const ConnPool=require('../util/ConnPool');
const config = require('../config/config');
const getTimestamp = require('../util/getTimestamp');
const UserDao = require('../dataModels/UserDao');
const StudentDao = require('../dataModels/StudentDao');
const AttendDao = require('../dataModels/AttendDao');
const BelongToDao = require('../dataModels/BelongToDao');
const AsStudentDao = require('../dataModels/AsStudentDao');
const CollegeDao = require('../dataModels/CollegeDao');
const MajorInDao = require('../dataModels/MajorInDao');
const MajorDao = require('../dataModels/MajorDao');
const ExamDao = require('../dataModels/ExamDao');
const TeachDao = require('../dataModels/TeachDao');
const CourseDao = require('../dataModels/CourseDao');
const AsTeacherDao = require('../dataModels/AsTeacherDao');
const ClassroomDao = require('../dataModels/ClassroomDao');
const clone = require('../util/utils');

var attendDao = new AttendDao();
var studentDao = new StudentDao();
var asStudentDao = new AsStudentDao();
var belongToDao = new BelongToDao();
var collegeDao = new CollegeDao();
var majorInDao = new MajorInDao();
var majorDao = new MajorDao();
var courseDao = new CourseDao();
var examDao = new ExamDao();
var classroomDao = new ClassroomDao();
var teachDao = new TeachDao();
var asTeacherDao = new AsTeacherDao();
var userDao = new UserDao();
const CrossDao = require('../dataModels/CrossDao')
let crossDao = new CrossDao()
var StudentService = function () {
    this.getSelectedByStudentId = function (student_id, callback) {
        var tableData = [];
        ConnPool.doTrans(function (con) {
            crossDao.getSelectedByStudentId(con,student_id,function(courses){
                con.commit(function(){
                    callback(courses)
                })
            })
        })
    }
    this.getCoursesByStudentId = function (student_id, callback) {
        var tableData = [];
        ConnPool.doTrans(function (con) {
            crossDao.getCoursesByStudentId(con,student_id,function(courses){
                con.commit(function(){
                    callback(courses)
                })
            })
        })
    }
    this.getScoreInfoByStudentId = function (student_id, callback) {
        var tableData = [];
        ConnPool.doTrans(function (con) {
            attendDao.getAttendsByStudentId(con,student_id, function (attends) {
                attends.forEach(function (attend, idx) {
                    var info = {
                        'teacher_name': null,
                        'course_name': null,
                        'score': null,
                    };
                    info.score = attend['score'];
                    var course_id = attend['course_id'];
                    courseDao.getCourseByCourseId(con,course_id, function (course) {
                        info.course_name = course[0]['course_name'];
                        teachDao.getTeachByCourseId(con,course_id, function (teach) {
                            asTeacherDao.getAsTeacherByTeacherId(con,teach[0]['teacher_id'], function (as_teacher) {
                                userDao.getUserByUserId(con,as_teacher[0]['user_id'], function (user) {
                                    info.teacher_name = user[0]['user_name'];
                                    // console.log('push! idx= ' + idx);
                                    tableData.push(info);
                                    if (attends.length === tableData.length) {
                                        // console.log('callback!');
                                        con.commit(function () {
                                            callback(tableData);
                                        })
                                    }
                                })
                            })
                        })
                    })
                })
            })
        })
    }
    this.getStudentInfoByStudentId = function (student_id, callback) {
        var info = {
            'class': null,
            'admission_date': null,
            'college': null,
            'major': null,
            'num_of_courses': null
        };
        ConnPool.doTrans(function (conn) {
            studentDao.getStudentByStudentId(conn,student_id, function (student) {
                info.class = student['class'];
                info.admission_date = student['admission_date'];
                asStudentDao.getAsStudentByStudentId(conn,student_id, function (as_student) {
                    var user_id = as_student[0]['user_id'];
                    belongToDao.getBelongToByUserId(conn,user_id, function (belong_to) {
                        var college_id = belong_to[0]['college_id'];
                        collegeDao.getCollegeByCollegeId(conn,college_id, function (college) {
                            info['college'] = college[0]['college_name'];
                            majorInDao.getMajorInByStudentId(conn,student_id, function (major_in) {
                                var major_id = major_in[0]['major_id'];
                                majorDao.getMajorByMajorId(conn,major_id, function (major) {
                                    info['major'] = major[0]['major_name'];
                                    attendDao.getAttendsByStudentId(conn,student_id, function (attends) {
                                        info['num_of_courses'] = attends.length;
                                        conn.commit(function () {
                                            callback(info);
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })

    }

    this.getExamInfoByStudentId = function (student_id, callback) {
        var tableData = [];
        ConnPool.doTrans(function (conn) {
            crossDao.getExamInfoByStudentId(conn,student_id,function(exams){
                conn.commit(function(){
                    callback(exams)
                })
            })
        })
    }
};


module.exports = StudentService;