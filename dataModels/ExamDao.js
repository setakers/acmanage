
var ExamDao = function () {
    this.getExamByExamId = function (conn,exam_id, callback) {
        conn.query('SELECT * from exam where exam_id = ' + exam_id, function (err, results, fields) {
            if (err) {
                console.error(error)
                conn.rollback(function () {})
            } else {
                callback(results);
            }
        })
    }
    this.getExamsByCourseId=function(course_id,callback){
        conn.query('SELECT * from exam where course_id = ' + course_id, function (err, results, fields) {
            if (err) {
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

module.exports = ExamDao;