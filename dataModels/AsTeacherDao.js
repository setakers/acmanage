var AsTeacherDao = function () {
    this.getAsTeacherByUserId = function (conn,user_id, callback) {
        conn.query('SELECT * from as_teacher where user_id = \'' + user_id + '\'', function (err, results, fields) {
            if (err) {
                console.error(error);
                conn.rollback(function () {})
            } else {
                callback(results);
            }
        });
        DaoUtil.release(conn);
    }
    this.getAsTeacherByTeacherId = function (conn,teacher_id, callback) {
        conn.query('SELECT * from as_teacher where teacher_id = \'' + teacher_id + '\'', function (err, results, fields) {
            if (err) {
                console.error(error);
                conn.rollback(function () {})
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