var BelongToDao = function () {
    this.getBelongToByUserId = function (conn,user_id, callback) {
        // console.log('in belong to dao, userid = '+user_id);
        conn.query('SELECT * from belong_to where user_id = ' + user_id, function (error, results, fields) {
            if (error){
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

module.exports = BelongToDao;