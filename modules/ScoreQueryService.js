const ScoreQueryDao = require('../dataModels/ScoreQueryDao');
const AsTeacherDao = require('../dataModels/AsTeacherDao');
const UserDao = require('../dataModels/UserDao');
const AsStudentDao = require('../dataModels/AsStudentDao');
const CourseDao = require('../dataModels/CourseDao');
var scoreQueryDao = new ScoreQueryDao();
var asTeacherDao = new AsTeacherDao();
var userDao = new UserDao();
var asStudentDao = new AsStudentDao();
var courseDao = new CourseDao();

var ScoreQueryService = function () {
    this.getAllScoreQueries = function (callback) {
        var tableData = [];
        scoreQueryDao.getAllScoreQueries(function (score_queries) {
            score_queries.forEach(function(score_query,idx){
                var tmp = {
                    'teacher_name': null,
                    'student_name': null,
                    'course_name': null,
                    'old_score': null,
                    'new_score': null,
                    'reason': null,
                    'state': null,
                    'query_time': null,
                    'deal_time': null,
                };
                tmp['old_score'] = score_query['old_score'];
                tmp['new_score'] = score_query['new_score'];
                tmp['reason'] = score_query['reason'];
                tmp['state'] = score_query['state'];
                tmp['query_time'] = score_query['query_time'].toLocaleString();
                tmp['deal_time'] = score_query['deal_time'].toLocaleString();
                courseDao.getCourseByCourseId(score_query['course_id'], function (course) {
                    tmp['course_name'] = course[0]['course_name'];
                    asTeacherDao.getAsTeacherByTeacherId(score_query['teacher_id'], function (as_teacher) {
                        userDao.getUserByUserId(as_teacher[0]['user_id'], function (user) {
                            tmp['teacher_name'] = user[0]['user_name'];
                            asStudentDao.getAsStudentByStudentId(score_query['student_id'], function (as_student) {
                                userDao.getUserByUserId(as_student[0]['user_id'], function (user1) {
                                    tmp['student_name'] = user1[0]['user_name'];
                                    tableData.push(tmp);
                                    if(idx>=score_queries.length-1){
                                        callback(tableData);
                                    }
                                })
                            })
                        })
                    })
                })
            })
            // for (var i = 0; i < score_queries.length; i++) {
            //     console.log('i = '+i);
            //     var score_query = score_queries[i];
            //     var tmp = {
            //         'teacher_name': null,
            //         'student_name': null,
            //         'course_name': null,
            //         'old_score': null,
            //         'new_score': null,
            //         'reason': null,
            //         'state': null,
            //         'query_time': null,
            //         'deal_time': null,
            //     };
            //     tmp['old_score'] = score_query['old_score'];
            //     tmp['new_score'] = score_query['new_score'];
            //     tmp['reason'] = score_query['reason'];
            //     tmp['state'] = score_query['state'];
            //     tmp['query_time'] = score_query['query_time'];
            //     tmp['deal_time'] = score_query['deal_time'];
            //     courseDao.getCourseByCourseId(score_query['course_id'], function (course) {
            //         tmp['course_name'] = course[0]['course_name'];
            //         asTeacherDao.getAsTeacherByTeacherId(score_query['teacher_id'], function (as_teacher) {
            //             userDao.getUserByUserId(as_teacher[0]['user_id'], function (user) {
            //                 tmp['teacher_name'] = user[0]['user_name'];
            //                 asStudentDao.getAsStudentByStudentId(score_query['student_id'], function (as_student) {
            //                     userDao.getUserByUserId(as_student[0]['user_id'], function (user1) {
            //                         tmp['student_name'] = user1[0]['user_name'];
            //                         tableData.push(tmp);
            //                         // console.log('tableData = '+tableData);
            //                         console.log(i);
            //                         if (i > score_queries.length - 1) {
            //                             callback(tableData);
            //                         }
            //                     })
            //                 })
            //             })
            //         })
            //     })
            // }
        })
    }
};


module.exports = ScoreQueryService;