var DaoUtil = require('../util/DaoUtil');


var ScoreQueryDao = function () {
    this.getAllScoreQueries = function (callback) {
        var conn = DaoUtil.getConnection();
        conn.query('SELECT * from score_query ', function (err, results, fields) {
            if(err){
                callback(error());
            }else{
                callback(results);
            }
        });
    }
    this.getUnhandledScoreQueries = function (callback) {
        var conn = DaoUtil.getConnection();
        conn.query('SELECT * from score_query where state = 2', function (err, results, fields) {
            if(err){
                callback(error());
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