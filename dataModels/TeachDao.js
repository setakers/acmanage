var DaoUtil = require('../util/DaoUtil');


var TeachDao = function () {
    this.getTeachByCourseId = function (course_id, callback) {
        var conn = DaoUtil.getConnection();
        conn.query('SELECT * from teach where course_id = \'' + course_id + '\'', function (err, results, fields) {
            if (err) {
                callback(error());
            } else {
                callback(results);
            }
        })
        DaoUtil.release(conn);
    }
    this.getTeachByTeacherId = function (teacher_id, callback) {
        var conn = DaoUtil.getConnection();
        conn.query('SELECT * from teach where teacher_id = \'' + teacher_id+'\'', function (err, results, fields) {
            if (err) {
                callback(error());
            } else {
                callback(results);
            }
        })
        DaoUtil.release(conn);
    }
};

function error() {
    console.log("数据库出错!");
    return {err: 1, msg: "数据库出错"};
}

module.exports = TeachDao;