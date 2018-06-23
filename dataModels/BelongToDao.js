var DaoUtil = require('../util/DaoUtil');


var BelongToDao = function () {
    this.getBelongToByUserId = function (user_id, callback) {
        var conn = DaoUtil.getConnection();
        console.log('in belong to dao, userid = '+user_id);
        conn.query('SELECT * from belong_to where user_id = ' + user_id, function (error, results, fields) {
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

module.exports = BelongToDao;