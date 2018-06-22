var DaoUtil = require('../util/DaoUtil');


var UserDao = function () {
    this.findAllUsers = function (callback) {
        var conn = DaoUtil.getConnection();
        conn.query('SELECT * from user', function (error, results, fields) {
            if (error) throw error;
            callback(results);
        });
        DaoUtil.release(conn);
    };

    function hasUser(results) {
        if (results.length === 0) {
            return {err: 1, msg: "此用户名不存在"};
        }
        else {
            return results[0];
        }
    }

    this.isValidUsername = function (username, callback) {
        // console.log('UserDao.isValidUsername');
        if (typeof username !== 'string') {
            callback(error());
        }
        var conn = DaoUtil.getConnection();
        conn.query('SELECT * from user where user_name = \'' + username + '\'', function (err, results, fields) {
            if (err) {
                console.log('DaoUtil.getConnection().query error!');
                callback(error());
            } else {
                var res = hasUser(results);
                callback(res);
            }
            // console.log(results);
        });
        DaoUtil.release(conn);
    };
    this.isValidUsernameAndPassword = function (username, password, callback) {
        if (typeof username !== 'string' || typeof password !== 'string') {
            callback(error());
        }
        var conn = DaoUtil.getConnection();
        conn.query('SELECT * from user where user_name = \'' + username + '\' and password = \'' + password + '\'', function (err, results, fields) {
            if (err) {
                console.log('DaoUtil.getConnection().query error!');
                callback(error());
            } else {
                var res = hasUser(results);
                callback(res);
            }
        });
        DaoUtil.release(conn);
    };
    this.getRoleByUsername = function (username, callback) {
        var conn = DaoUtil.getConnection();
        conn.query('SELECT * from user where user_name = \'' + username + '\'', function (err, results, fields) {
            if (err) {
                console.log('DaoUtil.getConnection().query error!');
                callback(error());
            } else {
                if (!hasUser(results)) {
                    callback(error());
                } else {
                    var res = results[0]['character'];
                    // console.log('res character: ' + res);
                    var b = '' + res;
                    var map = {0: 'student', 1: 'teacher', 2: 'admin'};
                    var r = [];
                    for (var i of b) {
                        r.push(map[parseInt(i)]);
                    }
                    callback(r);
                }
            }
        });
    }
};

function error() {
    console.log("数据库出错!");
    return {err: 1, msg: "数据库出错"};
}

module.exports = UserDao;