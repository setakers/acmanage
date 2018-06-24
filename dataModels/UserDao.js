var pool = require('../test/debug');

var UserDao = function () {
    this.findAllUsers = function (conn,callback) {
        conn.query('SELECT * from user', function (error, results, fields) {
            if (error) {
                conn.rollback(function () {

                })
            }
            callback(results);
        });
    };

    function hasUser(results) {
        if (results.length === 0) {
            return {err: 1, msg: "此用户名不存在"};
        }
        else {
            return results[0];
        }
    }

    this.isValidUsername = function (conn,user_name, callback) {
        // console.log('UserDao.isValidUsername');
        if (typeof user_name !== 'string') {
            callback(error());
        }
        conn.query('SELECT * from user where user_name = \'' + user_name + '\'', function (err, results, fields) {
            if (err) {
                conn.rollback(function () {

                })
            } else {
                var res = hasUser(results);
                callback(res);
            }
            // console.log(results);
        });
    };
    this.isValidUsernameAndPassword = function (conn,user_name, password, callback) {
        if (typeof user_name !== 'string' || typeof password !== 'string') {
            callback(error());
        }
        conn.query('SELECT * from user where user_name = \'' + user_name + '\' and password = \'' + password + '\'', function (err, results, fields) {
            if (err) {
                conn.rollback(function () {

                })
            } else {
                var res = hasUser(results);
                callback(res);
            }
        });
    };
    this.getRoleByUsername = function (conn,user_name, callback) {
        conn.query('SELECT * from user where user_name = \'' + user_name + '\'', function (err, results, fields) {
            if (err) {
                conn.rollback(function () {

                })
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

    this.getUserByUserName = function (conn,user_name, callback) {
        conn.query('SELECT * from user where user_name = \'' + user_name + '\'', function (err, results, fields) {
            if (err) {
                console.log(err);
                conn.rollback(function () {

                })
            } else {
                callback(results);
            }
            // console.log(results);
        });
    }
    this.getUserByUserId = function (conn,user_id, callback) {
        conn.query('SELECT * from user where user_id = \'' + user_id + '\'', function (err, results, fields) {
            if (err) {
                conn.rollback(function () {

                })
            } else {
                callback(results);
            }
            // console.log(results);
        });
    }

    this.updateUserNameByUserId=function (conn, user, callback) {
        conn.query('update user set user_name = ? where user_id = ?',[user['user_name'],user['user_id']], function (err, results, fields) {
            if (err) {
                conn.rollback(function () {
                    console.log(err);
                })
            } else {
                callback(results);
            }
            // console.log(results);
        });
    }
    this.updateGenderByUserId=function (conn, user, callback) {
        conn.query('update user set gender = ? where user_id = ?',[user['gender'],user['user_id']], function (err, results, fields) {
            if (err) {
                conn.rollback(function () {
                    console.log(err);
                })
            } else {
                callback(results);
            }
            // console.log(results);
        });
    }
    this.updateEmailByUserId=function (conn, user, callback) {
        conn.query('update user set email = ? where user_id = ?',[user['email'],user['user_id']], function (err, results, fields) {
            if (err) {
                conn.rollback(function () {
                    console.log(err);
                })
            } else {
                callback(results);
            }
            // console.log(results);
        });
    }
    this.updatePhoneByUserId=function (conn, user, callback) {
        conn.query('update user set phone = ? where user_id = ?',[user['phone'],user['user_id']], function (err, results, fields) {
            if (err) {
                conn.rollback(function () {
                    console.log(err);
                })
            } else {
                callback(results);
            }
            // console.log(results);
        });
    }

    // //todo: template of refactoring all dao functions!!!
    // this.addUser = function (conn, user, callback) {
    //     conn.query("INSERT INTO user values(null,'tom','111')",
    //         function (err, ret) {
    //             if (err) {
    //                 console.error(err);
    //                 conn.rollback(function () {
    //                 });
    //             } else {
    //                 callback(ret);
    //             }
    //         })
    // };
}

function error() {
    console.log("数据库出错!");
    return {err: 1, msg: "数据库出错"};
}

module.exports = UserDao;