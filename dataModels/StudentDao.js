var DaoUtil = require('../util/DaoUtil');


var StudentDao = function () {
    this.getStudentByStudentId = function (student_id, callback) {
        var conn = DaoUtil.getConnection();
        conn.query('SELECT * from student where student_id = ' + student_id + '', function (err, results, fields) {
            if (err) {
                console.log('DaoUtil.getConnection().query error!');
                callback(error());
            } else {
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