const ScoreQueryDao = require('../dataModels/ScoreQueryDao');
const AsTeacherDao = require('../dataModels/AsTeacherDao');
const UserDao = require('../dataModels/UserDao');
const AsStudentDao = require('../dataModels/AsStudentDao');
const CourseDao = require('../dataModels/CourseDao');
var scoreQueryDao = new ScoreQueryDao();
var asTeacherDao = new AsTeacherDao();
const ConnPool = require('../util/ConnPool');
var userDao = new UserDao();
var asStudentDao = new AsStudentDao();
var courseDao = new CourseDao();
const CrossDao  = require('../dataModels/CrossDao')
let crossDao = new CrossDao()
var ScoreQueryService = function () {
    this.getAllScoreQueries= function (callback) {
        ConnPool.doTrans(function (con) {
            crossDao.getAllScoreQueries(con,function(courses){
                con.commit(function(){
                    callback(courses)
                })
            })
        })
    }

    this.getUnhandledScoreQueries = function (callback) {
        var tableData = [];
        ConnPool.doTrans(function (conn) {
            scoreQueryDao.getUnhandledScoreQueries(conn, function (score_queries) {
                console.log('in getUnhandledScoreQueries, score_queries : ' + score_queries);
                if (score_queries.length === 0) {
                    conn.commit(function () {
                        callback(tableData)
                    })
                }
                else {
                    score_queries.forEach(function (score_query, idx) {
                        var tmp = {
                            'query_id': null,
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
                        tmp['query_id'] = score_query['query_id'];
                        tmp['old_score'] = score_query['old_score'];
                        tmp['new_score'] = score_query['new_score'];
                        tmp['reason'] = score_query['reason'];
                        tmp['state'] = score_query['state'];
                        tmp['query_time'] = score_query['query_time'].toLocaleString();
                        if (score_query['deal_time'] !== null)
                            tmp['deal_time'] = score_query['deal_time'].toLocaleString();
                        courseDao.getCourseByCourseId(conn, score_query['course_id'], function (course) {
                            tmp['course_name'] = course[0]['course_name'];
                            asTeacherDao.getAsTeacherByTeacherId(conn, score_query['teacher_id'], function (as_teacher) {
                                userDao.getUserByUserId(conn, as_teacher[0]['user_id'], function (user) {
                                    tmp['teacher_name'] = user[0]['user_name'];
                                    asStudentDao.getAsStudentByStudentId(conn, score_query['student_id'], function (as_student) {
                                        userDao.getUserByUserId(conn, as_student[0]['user_id'], function (user1) {
                                            tmp['student_name'] = user1[0]['user_name'];
                                            tableData.push(tmp);
                                            if (tableData.length === score_queries.length) {
                                                conn.commit(function () {
                                                    callback(tableData);
                                                })
                                            }
                                        })
                                    })
                                })
                            })
                        })
                    })
                }
            })
        })

    }

    this.addQueryScoreChange = function (data, callback) {
        ConnPool.doTrans(function (conn) {
            scoreQueryDao.addScoreQuery(conn, data, function (res) {
                conn.commit(function () {
                    if (res.affectedRows !== 0) {
                        callback(true);
                    } else {
                        callback(false);
                    }
                })
            })
        })
    }

    this.updateQueryScore = function (data, callback) {
        ConnPool.doTrans(function (conn) {
            scoreQueryDao.updateState(conn, data, function (res) {
                if (res.affectedRows !== 0) {
                    callback(true);
                } else {
                    callback(false);
                }
            })
        })
    }
};


module.exports = ScoreQueryService;