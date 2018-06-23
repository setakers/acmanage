var DaoUtil = require('../util/DaoUtil');


var ExamDao = function () {
    this.getExamByExamId = function (exam_id, callback) {
        var conn = DaoUtil.getConnection();
        conn.query('SELECT * from exam where exam_id = ' + exam_id, function (err, results, fields) {
            if (err) {
                callback(error());
            } else {
                callback(results);
            }
        })
    }
    this.getExamsByCourseId=function(course_id,callback){
        var conn = DaoUtil.getConnection();
        conn.query('SELECT * from exam where course_id = ' + course_id, function (err, results, fields) {
            if (err) {
                callback(error());
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