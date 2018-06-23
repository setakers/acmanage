var DaoUtil = require('../util/DaoUtil');


var MajorDao = function () {
    this.getMajorByMajorId = function (major_id, callback) {
        var conn = DaoUtil.getConnection();
        conn.query('SELECT * from major where major_id = ' + major_id, function (err, results, fields) {
            if (err) {
                callback(error());
            } else {
                callback(results);
            }
        });
        DaoUtil.release(conn);
    }
};

function error() {
    console.log("数据库出错!");
    return {err: 1, msg: "数据库出错"};
}

module.exports = MajorDao;