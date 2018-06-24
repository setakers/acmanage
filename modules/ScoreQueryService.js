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

var ScoreQueryService = function () {
    this.getAllScoreQueries = function (callback) {
        var tableData = [];
        ConnPool.doTrans(function (con) {
            scoreQueryDao.getAllScoreQueries(con, function (score_queries) {
                score_queries.forEach(function (score_query, idx) {
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
                    if (score_query['deal_time'] !== null)
                        tmp['deal_time'] = score_query['deal_time'].toLocaleString();
                    courseDao.getCourseByCourseId(con, score_query['course_id'], function (course) {
                        tmp['course_name'] = course[0]['course_name'];
                        asTeacherDao.getAsTeacherByTeacherId(con, score_query['teacher_id'], function (as_teacher) {
                            userDao.getUserByUserId(con, as_teacher[0]['user_id'], function (user) {
                                tmp['teacher_name'] = user[0]['user_name'];
                                asStudentDao.getAsStudentByStudentId(con, score_query['student_id'], function (as_student) {
                                    userDao.getUserByUserId(con, as_student[0]['user_id'], function (user1) {
                                        tmp['student_name'] = user1[0]['user_name'];
                                        tableData.push(tmp);
                                        if (tableData.length === score_queries.length) {
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
        })

    }
    this.getUnhandledScoreQueries = function (callback) {
        var tableData = [];
        scoreQueryDao.getUnhandledScoreQueries(function (score_queries) {
            console.log('in getUnhandledScoreQueries, score_queries : ' + score_queries);
            if (score_queries.length === 0) {
                callback(tableData)
            }
            else {
                score_queries.forEach(function (score_query, idx) {
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
                    if (score_query['deal_time'] !== null)
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
                                        if (tableData.length >= score_queries.length ) {
                                            callback(tableData);
                                        }
                                    })
                                })
                            })
                        })
                    })
                })
            }
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
                    if(res.affectedRows!==0){
                        callback(true);
                    }else{
                        callback(false);
                    }
                })
            })
        })
    }
};


module.exports = ScoreQueryService;