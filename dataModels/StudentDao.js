

var StudentDao = function () {
    this.getStudentByStudentId = function (conn,student_id, callback) {
        conn.query('SELECT * from student where student_id = ' + student_id + '', function (err, results, fields) {
            if (err) {
                console.error(error)
                conn.rollback(function () {})
            }else {
                if (results.length === 0) {
                    console.log('查无此人');
                    callback(error());
                } else {
                    callback(results[0]);
                }
            }
        });
    }
};

function error() {
    console.log("数据库出错!");
    return {err: 1, msg: "数据库出错"};
}

module.exports = StudentDao;