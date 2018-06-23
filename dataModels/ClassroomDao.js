var DaoUtil = require('../util/DaoUtil');


var ClassroomDao = function () {
    this.getClassroomByClassroomId = function (classroom_id, callback) {
        var conn = DaoUtil.getConnection();
        conn.query('SELECT * from classroom where classroom_id = \'' + classroom_id + '\'', function (err, results, fields) {
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

module.exports = ClassroomDao;