var ScoreQueryDao = function () {
    this.getAllScoreQueries = function (conn, callback) {
        conn.query('SELECT * from score_query ', function (err, results, fields) {
            if (err) {
                console.error(error)
                conn.rollback(function () {
                })
            } else {
                callback(results);
            }
        });
    }
    this.getUnhandledScoreQueries = function (conn, callback) {
        conn.query('SELECT * from score_query where state = 2', function (err, results, fields) {
            if (err) {
                console.error(error)
                conn.rollback(function () {
                })
            } else {
                callback(results);
            }
        });
    }

    this.addScoreQuery = function (conn, score_query, callback) {
        conn.query('insert into score_query(teacher_id,student_id,course_id,old_score,new_score,reason,state) values(?,?,?,?,?,?,?)', [score_query['teacher_id'], score_query['student_id'], score_query['course_id'], score_query['old_score'], score_query['new_score'], score_query['reason'], score_query['state']], function (err, results, fields) {
            if (err) {
                console.error(error);
                conn.rollback(function () {
                })
            } else {
                callback(results);
            }
        });
    }

    this.updateState = function (conn, score_query, callback) {
        // console.log(score_query);
        var query = 'update score_query set state = ' + score_query['state'] + ', deal_time = NOW() where query_id = ' + score_query['query_id'] + '';
        // console.log(query);
        conn.query(query, function (err, results, fields) {
            if (err) {
                console.error(error);
                conn.rollback(function () {
                })
            } else {
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