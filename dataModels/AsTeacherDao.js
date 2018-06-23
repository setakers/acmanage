var DaoUtil = require('../util/DaoUtil');


var AsTeacherDao = function () {
    this.getAsTeacherByUserId = function (user_id, callback) {
        var conn = DaoUtil.getConnection();
        conn.query('SELECT * from as_teacher where user_id = \'' + user_id + '\'', function (err, results, fields) {
            if (err) {
                callback(error());
            } else {
                callback(results);
            }
        });
        DaoUtil.release(conn);
    }
    this.getAsTeacherByTeacherId = function (teacher_id, callback) {
        var conn = DaoUtil.getConnection();
        conn.query('SELECT * from as_teacher where teacher_id = \'' + teacher_id + '\'', function (err, results, fields) {
            if (err) {
                callback(error());
            } else {
                callback(results);
            }
        });
        DaoUtil.release(conn);
    }
};

function error() {
    console.log("数据库出错!");
    return {err: 1, msg: "数据库出错"};
}

module.exports = AsTeacherDao;