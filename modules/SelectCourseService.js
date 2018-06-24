const SelectCourseDao = require('../dataModels/SelectCourseDao');
const AttendDao = require('../dataModels/AttendDao');
const ConnPool = require('../util/ConnPool');
var attendDao = new AttendDao();
var selectCourseDao = new SelectCourseDao();
var SelectCourseService = function () {
    this.addSelectCourse = function (select_course, callback) {
        ConnPool.doTrans(function (conn) {
            selectCourseDao.addSelectCourse(conn, select_course, function (res) {
                conn.commit(function () {
                    if (res.affectedRows !== 0) {
                        callback(true);
                    } else {
                        callback(false);
                    }
                })
            });
        })
    }
    this.dealSelect = function (select_course, callback) {
        if (select_course['state'] === 1) {
            // agree
            ConnPool.doTrans(function (conn) {
                selectCourseDao.updateSelectCourse(conn, select_course, function (res) {
                    if (res.affectedRows !== 0) {
                        attendDao.addAttend(conn, select_course, function (res1) {
                            if (res1.affectedRows !== 0) {
                                conn.commit(function () {
                                    callback(true);
                                })
                            } else {
                                conn.commit(function () {
                                    callback(false);
                                })
                            }
                        })
                    } else {
                        conn.commit(function () {
                            callback(false);
                        })
                    }
                });
            })
        } else {
            // disagree
            ConnPool.doTrans(function (conn) {
                selectCourseDao.updateSelectCourse(conn, select_course, function (res) {
                    conn.commit(function () {
                        if (res.affectedRows !== 0) {
                            callback(true);
                        } else {
                            callback(false);
                        }
                    })
                });
            })
        }

    }
};


module.exports = SelectCourseService;