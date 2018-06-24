var OpenCourseDao = function () {
    this.addOpenCourse = function (conn, open_course, callback) {
        conn.query('insert into open_course(teacher_id, course_name, credit, introduction, classroom_id, state) values (?,?,?,?,?,?)', [open_course['teacher_id'], open_course['course_name'], open_course['credit'], open_course['introduction'], open_course['classroom_id'], open_course['state']], function (error, results, fields) {
            if (error) {
                console.error(error);
                conn.rollback(function () {
                })
            }
            callback(results);
        });
    }
    this.updateOpenCourse = function (conn, open_course, callback) {
        conn.query('update open_course set state = ? where open_id = ?', [open_course['state'], open_course['open_id']], function (error, results, fields) {
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

module.exports = OpenCourseDao;