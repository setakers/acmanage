// The Auth module handles the userinfo and generates a JWT
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const getTimestamp = require('../util/getTimestamp');
const AttendDao = require('../dataModels/AttendDao');
const ConnPool = require('../util/ConnPool');
var attendDao = new AttendDao();
var AttendService = function (userinfo) {
    // this.getAttendsByCourseId = function (course_id, callback) {
    //     ConnPool.doTrans(function (con) {
    //         attendDao.getAttendsByCourseId(con, course_id, function (res) {
    //             callback(res);
    //         });
    //     })
    // }
    this.markScores = function (body, callback) {
        ConnPool.doTrans(function (conn) {
            var i = 0;
            var course_id = body['course_id'];
            var scores = body['scores'];
            scores.forEach(function (score, idx) {
                score['course_id'] = course_id;
                attendDao.updateScore(conn, score, function (res) {
                    if (res.affectedRows !== 0) {
                        i++;
                        if (i >= scores.length) {
                            conn.commit(function () {
                                callback(true);
                            })
                        }
                    } else {
                        conn.commit(function () {
                            callback(false);
                        })
                    }
                })
            })
        })
    }
};


module.exports = AttendService;