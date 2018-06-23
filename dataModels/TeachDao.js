


var TeachDao = function () {
    this.getTeachByCourseId = function (conn,course_id, callback) {
        conn.query('SELECT * from teach where course_id = \'' + course_id + '\'', function (err, results, fields) {
            if (err) {
                console.error(error)
                conn.rollback(function () {})
            } else {
                callback(results);
            }
        })
    }
    this.getTeachByTeacherId = function (conn,teacher_id, callback) {
        conn.query('SELECT * from teach where teacher_id = \'' + teacher_id+'\'', function (err, results, fields) {
            if (err)  {
                console.error(error)
                conn.rollback(function () {})
            } else {
                callback(results);
            }
        })
    }
};

function error() {
    console.log("数据库出错!");
    return {err: 1, msg: "数据库出错"};
}

module.exports = TeachDao;