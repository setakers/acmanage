var DaoUtil = require('../util/DaoUtil');


var CourseDao = function () {
    this.getCourseByCourseId = function (course_id, callback) {
        var conn = DaoUtil.getConnection();
        conn.query('SELECT * from course where course_id = ' + course_id, function (error, results, fields) {
            if (error) throw error;
            callback(results);
        });
        DaoUtil.release(conn);
    }
};

function error() {
    console.log("数据库出错!");
    return {err: 1, msg: "数据库出错"};
}

module.exports = CourseDao;