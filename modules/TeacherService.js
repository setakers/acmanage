// The Auth module handles the userinfo and generates a JWT
const jwt = require('jsonwebtoken');
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
const ConnPool = require("../util/ConnPool");

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
var TeacherService = function () {
    this.getTeachCoursesByTeacherId = function (teacher_id, callback) {
        var tableData = [];
        ConnPool.doTrans(function (conn) {
            teachDao.getTeachByTeacherId(conn, teacher_id, function (teaches) {
                if(teaches.length === 0)
                    callback(tableData)
                else{
                    teaches.forEach(function (teach, idx) {
                        var tmp = {
                            'course_id': null,
                            'course_name': null,
                            'credit': null,
                            'introduction': null,
                            'total_students': null,
                            'unmarked_stu': null,
                        };
                        var course_id = teach['course_id'];
                        tmp['course_id'] = course_id;
                        courseDao.getCourseByCourseId(conn, course_id, function (course) {
                            tmp['course_name'] = course[0]['course_name'];
                            tmp['credit'] = course[0]['credit'];
                            tmp['introduction'] = course[0]['introduction'];
                            attendDao.getAttendsByCourseId(conn, course_id, function (attends) {
                                tmp['total_students'] = attends.length;
                                tmp['unmarked_students'] = 0;
                                tableData.push(tmp);
                                if (tableData.length === teaches.length) {
                                    conn.commit(function () {
                                        callback(tableData);
                                    })
                                }
                            })
                        })

                    })
                }
            })
        })
    }

    this.getTeacherInfoByTeacherId = function (teacher_id, callback) {
        var info = {
            'college': null,
            'num_of_courses': null
        };
        ConnPool.doTrans(function (conn) {
            asTeacherDao.getAsTeacherByTeacherId(conn,teacher_id, function (as_teacher) {
                var user_id = as_teacher[0]['user_id'];
                belongToDao.getBelongToByUserId(conn,user_id, function (belong_to) {
                    var college_id = belong_to[0]['college_id'];
                    collegeDao.getCollegeByCollegeId(conn,college_id, function (college) {
                        info.college = college[0]['college_name'];
                        teachDao.getTeachByTeacherId(conn,teacher_id, function (teaches) {
                            info.num_of_courses = teaches.length;
                            console.log(info);
                            conn.commit(function () {
                                callback(info);
                            })
                        })
                    })
                })
            })
        })
    }
};


module.exports = TeacherService;