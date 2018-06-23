
var CollegeDao = function () {
    this.getCollegeByCollegeId = function (conn,college_id, callback) {
        conn.query('SELECT * from college where college_id = ' + college_id, function (error, results, fields) {
            if (error) {
                console.error(error);
                conn.rollback(function () {})
            }else{
                callback(results);
            }
        });
    }
};

function error() {
    console.log("数据库出错!");
    return {err: 1, msg: "数据库出错"};
}

module.exports = CollegeDao;