var AsStudentDao = function () {
    this.getAsStudentByUserId = function (conn, user_id, callback) {
        conn.query('SELECT * from as_student where user_id = ' + user_id, function (error, results, fields) {
            if (error)
            {
                console.error(error);
                conn.rollback(function () {})
            }
            callback(results);
        });
        DaoUtil.release(conn);
    }
    this.getAsStudentByStudentId = function (conn, student_id, callback) {
        conn.query('SELECT * from as_student where student_id = '+student_id, function (error, results, fields) {
            if (error)
            {
                console.error(error);
                conn.rollback(function () {})
            }
            callback(results);
        });
    }
};

function error() {
    console.log("数据库出错!");
    return {err: 1, msg: "数据库出错"};
}

module.exports = AsStudentDao;