var AttendDao = function () {
    this.getAttendsByCourseId = function (conn, course_id, callback) {
        conn.query('SELECT * from attend where course_id = ' + course_id, function (error, results, fields) {
            if (error) {
                console.error(error)
                conn.rollback(function () {
                })
            }
            callback(results);
        });
    }
    this.getAttendsByStudentId = function (conn, student_id, callback) {
        conn.query('SELECT * from attend where student_id = ' + student_id, function (error, results, fields) {
            if (error) {
                console.error(error)
                conn.rollback(function () {
                })
            }
            callback(results);
        });
    }
    this.addAttend = function (conn, attend, callback) {
        conn.query('insert into attend(course_id,student_id) values(?,?)', [attend['course_id'], attend['student_id']], function (error, results, fields) {
            if (error) {
                console.error(error);
                conn.rollback(function () {
                })
            }
            callback(results);
        });
    }
};

function error() {
    console.log("数据库出错!");
    return {err: 1, msg: "数据库出错"};
}

module.exports = AttendDao;