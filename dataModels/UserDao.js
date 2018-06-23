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

    this.isValidUsername = function (user_name, callback) {
        // console.log('UserDao.isValidUsername');
        if (typeof user_name !== 'string') {
            callback(error());
        }
        var conn = DaoUtil.getConnection();
        conn.query('SELECT * from user where user_name = \'' + user_name + '\'', function (err, results, fields) {
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
    this.isValidUsernameAndPassword = function (user_name, password, callback) {
        if (typeof user_name !== 'string' || typeof password !== 'string') {
            callback(error());
        }
        var conn = DaoUtil.getConnection();
        conn.query('SELECT * from user where user_name = \'' + user_name + '\' and password = \'' + password + '\'', function (err, results, fields) {
            if (err) {
                console.log('DaoUtil.getConnection().query error!');
                callback(error());
            } else {
                var res = hasUser(results);
                console.log('res : ' + res);
                callback(res);
            }
        });
        DaoUtil.release(conn);
    };
    this.getRoleByUsername = function (user_name, callback) {
        var conn = DaoUtil.getConnection();
        conn.query('SELECT * from user where user_name = \'' + user_name + '\'', function (err, results, fields) {
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

    this.getUserByUserName = function (user_name, callback) {
        var conn = DaoUtil.getConnection();
        conn.query('SELECT * from user where user_name = \'' + user_name + '\'', function (err, results, fields) {
            if (err) {
                callback(error());
            } else {
                callback(results);
            }
            // console.log(results);
        });
    }
    this.getUserByUserId = function (user_id, callback) {
        var conn = DaoUtil.getConnection();
        conn.query('SELECT * from user where user_id = \'' + user_id + '\'', function (err, results, fields) {
            if (err) {
                callback(error());
            } else {
                callback(results);
            }
            // console.log(results);
        });
    }
};

function error() {
    console.log("数据库出错!");
    return {err: 1, msg: "数据库出错"};
}

module.exports = UserDao;