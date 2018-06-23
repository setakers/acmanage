var MajorDao = function () {
    this.getMajorByMajorId = function (conn,major_id, callback) {
        conn.query('SELECT * from major where major_id = ' + major_id, function (err, results, fields) {
            if (err){
                console.error(error)
                conn.rollback(function () {})
            }else {
                callback(results);
            }
        });
    }
};

function error() {
    console.log("数据库出错!");
    return {err: 1, msg: "数据库出错"};
}

module.exports = MajorDao;