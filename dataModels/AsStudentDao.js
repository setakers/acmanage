var DaoUtil = require('../util/DaoUtil');


var AsStudentDao = function () {
    this.getStudentIdByUserId = function (user_id, callback) {
        var conn = DaoUtil.getConnection();
        conn.query('SELECT student_id from student where user_id = ' + user_id, function (error, results, fields) {
            if (error) throw error;
            callback(results);
        });
        DaoUtil.release(conn);
    }
    this.getUserIdByStudentId = function (student_id, callback) {
        var conn = DaoUtil.getConnection();
        conn.query('SELECT user_id from student where student_id = '+student_id, function (error, results, fields) {
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

module.exports = AsStudentDao;