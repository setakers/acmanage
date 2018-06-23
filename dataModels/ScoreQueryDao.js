

var ScoreQueryDao = function () {
    this.getAllScoreQueries = function (conn,callback) {
        conn.query('SELECT * from score_query ', function (err, results, fields) {
            if(err){
                console.error(error)
                conn.rollback(function () {})
            }else{
                callback(results);
            }
        });
    }
    this.getUnhandledScoreQueries = function (conn,callback) {
        conn.query('SELECT * from score_query where state = 2', function (err, results, fields) {
            if(err){
                console.error(error)
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

module.exports = ScoreQueryDao;