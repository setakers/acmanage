
var CourseDao = function () {
    this.getCourse = function (conn,callback) {
        conn.query('SELECT * from course', function (error, results, fields) {
            if (error){
                console.error(error)
                conn.rollback(function () {})
            }
            else
                callback(results);
        });
    }
    this.getCourseByCourseId = function (conn,course_id, callback) {
        conn.query('SELECT * from course where course_id = ' + course_id, function (error, results, fields) {
            if (error) {
                console.error(error)
                conn.rollback(function () {})
            }
            else
                callback(results);
        });
    }
};

function error() {
    console.log("数据库出错!");
    return {err: 1, msg: "数据库出错"};
}

module.exports = CourseDao;