var mysql = require('mysql'),
    Connection = require('mysql/lib/Connection.js');

var pool = mysql.createPool({
    host: 'localhost',
    database: 'test',
    user: 'root',
    password: 'clhclh19971123',
    debug: false,
    connectionLimit: 30
});


var execPool = function () {
    pool.getConnection(function (err, conn) {
        transAutoRelease(conn);

        conn.beginTransaction(function (err) {
            if (err) throw err;
            conn.query("INSERT INTO user values(null,'tom','111')",
                function (err, ret) {
                    if (err) {
                        console.error(err);
                        conn.rollback(function () {
                        });
                    } else {
                        console.log(ret);
                        conn.query('UPDATE user set id=11111 where id=1', function (err, ret) {
                            if (err) {
                                console.error(err);
                                conn.rollback(function () {

                                });
                            } else {
                                conn.commit(function () {
                                    console.log('success' + JSON.stringify(ret));
                                });
                            }
                        });

                    }
                });
        });
    });
}

function after(fn, cb) {
    return function () {
        fn.apply(this, arguments);
        cb();
    }
}

function transAutoRelease(conn) {
    if (conn.commit == Connection.prototype.commit) {
        conn.commit = after(conn.commit, release);
    }
    if (conn.rollback == Connection.prototype.rollback) {
        conn.rollback = after(conn.rollback, release);
    }

    function release() {
        if (conn) {
            conn.release();
        }
    }
}


var intervalStartProcess = function () {
    setTimeout(function () {
        execPool();
    }, 1000);
}
intervalStartProcess();