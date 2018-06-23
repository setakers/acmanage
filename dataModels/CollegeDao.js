var DaoUtil = require('../util/DaoUtil');


var CollegeDao = function () {
    this.getCollegeByCollegeId = function (college_id, callback) {
        var conn = DaoUtil.getConnection();
        conn.query('SELECT * from college where college_id = ' + college_id, function (error, results, fields) {
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

module.exports = CollegeDao;