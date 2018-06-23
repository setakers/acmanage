var DaoUtil = require('../util/DaoUtil');


var MajorInDao = function () {
    this.getMajorInByStudentId = function (student_id, callback) {
        var conn = DaoUtil.getConnection();
        conn.query('SELECT * from major_in where student_id = ' + student_id, function (error, results, fields) {
            if (error) throw error;
            callback(results);
        });
        DaoUtil.release(conn);
    }
};

function error() {
    console.log("数据库出错!");
    return {err: 1, msg: "数据库出错"};
}

module.exports = MajorInDao;