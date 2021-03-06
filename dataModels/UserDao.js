var pool = require('../test/debug');

var UserDao = function () {
    this.modifyAccount = function (conn, new_info, callback) {
        conn.query('UPDATE user \n' +
            'SET user_name = ? ,`password` = ?,`character` = ? ,\n' +
            'gender = ?, email = ?, phone = ? \n' +
            'WHERE (`user_id` = ?);\n',
            [new_info['user_name'],new_info['password'], new_info['character'],
                new_info['gender'],new_info['email'],new_info['phone'],new_info['user_id'],],
            function (error, results, fields) {
                if (error) {
                    console.error(error);
                    conn.rollback(function () {
                    })
                }
                callback(results);
            });
    }
    this.addAccount = function (conn, new_account, callback) {
        conn.query('INSERT INTO `user` (`user_id`, `user_name`, `password`, '
            +'`character`, `gender`, `email`, `phone`) VALUES (?,?,?,?,?,?,?)',
            [new_account['user_id'],new_account['user_name'],new_account['password'],
                new_account['character'],new_account['gender'],new_account['email'],new_account['phone']],
            function (error, results, fields) {
            if (error) {
                console.error(error);
                conn.rollback(function () {
                })
            }
            callback(results);
        });
    }
    this.listAccount = function(conn,callback){
        conn.query(
            'select * from user',
            function(error,results,field){
                if(error){
                    console.error(error)
                    conn.rollback(function () {})
                }
                else
                    callback(results)
            })
    }
    this.searchUser = function(conn,keyword,callback){
        conn.query(
            'select user_id,user_name,`character`,gender,email,phone\n' +
            'from user\n' +
            'where user_name like "%'+keyword+'%"\n' +
            'or email like "%'+keyword+'%"\n' +
            'or phone like "%'+keyword+'%"',
            function(error,results,field){
                if(error){
                    console.error(error)
                    conn.rollback(function () {})
                }
                else
                    callback(results)
            })
    }
    this.findAllUsers = function (conn, callback) {
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

    this.isValidUsername = function (conn, user_name, callback) {
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
    this.isValidUsernameAndPassword = function (conn, user_name, password, callback) {
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
    this.getRoleByUsername = function (conn, user_name, callback) {
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

    this.getUserByUserName = function (conn, user_name, callback) {
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
    this.getUserByUserId = function (conn, user_id, callback) {
        // console.log('user_id ' + user_id);
        conn.query('SELECT * from user where user_id = \'' + user_id + '\'', function (err, results, fields) {
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

    this.updateUserNameByUserId = function (conn, user, callback) {
        conn.query('update user set user_name = ? where user_id = ?', [user['user_name'], user['user_id']], function (err, results, fields) {
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
    this.updateGenderByUserId = function (conn, user, callback) {
        conn.query('update user set gender = ? where user_id = ?', [user['gender'], user['user_id']], function (err, results, fields) {
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
    this.updateEmailByUserId = function (conn, user, callback) {
        conn.query('update user set email = ? where user_id = ?', [user['email'], user['user_id']], function (err, results, fields) {
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
    this.updatePhoneByUserId = function (conn, user, callback) {
        conn.query('update user set phone = ? where user_id = ?', [user['phone'], user['user_id']], function (err, results, fields) {
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
    this.updatePasswordByUserId = function (conn, user, callback) {
        conn.query('update user set password = ? where user_id = ?', [user['password'], user['user_id']], function (err, results, fields) {
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