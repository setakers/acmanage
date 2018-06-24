const OpenCourseDao = require('../dataModels/OpenCourseDao');
const ConnPool = require('../util/ConnPool');
const CourseDao = require('../dataModels/CourseDao');
var openCourseDao = new OpenCourseDao();
var courseDao = new CourseDao();
var OpenCourseService = function () {
    this.addOpenCourse = function (open_course, callback) {
        ConnPool.doTrans(function (conn) {
            openCourseDao.addOpenCourse(conn, open_course, function (res) {
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
    this.dealSelect = function (open_course, callback) {
        ConnPool.doTrans(function (conn) {
            openCourseDao.updateOpenCourse(conn, open_course, function (res) {
                if (res.affectedRows !== 0) {
                    if (open_course['state'] !== 0) {
                        courseDao.addCourse(conn, open_course, function (res) {
                            if (res.affectedRows !== 0) {
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
                            callback(true);
                        })
                    }
                    // callback(true);
                }
                else {
                    conn.commit(function () {
                        callback(false);
                    })
                }
            });
        });
    }
}


module.exports = OpenCourseService;