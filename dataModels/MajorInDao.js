
var MajorInDao = function () {
    this.getMajorInByStudentId = function (conn,student_id, callback) {
        conn.query('SELECT * from major_in where student_id = ' + student_id, function (error, results, fields) {
            if (error){
                console.error(error)
                conn.rollback(function () {})
            }callback(results);
        });
    }
};

function error() {
    console.log("数据库出错!");
    return {err: 1, msg: "数据库出错"};
}

module.exports = MajorInDao;