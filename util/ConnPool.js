var mysql = require('mysql'),
    Connection = require('mysql/lib/Connection.js');

var ConnPool = mysql.createPool({
    host: 'hdm134137468.my3w.com',
    database: 'hdm134137468_db',
    user: 'hdm134137468',
    password: 'clh971123',
    insecureAuth: true,
    debug: false,
    connectionLimit: 30
});


ConnPool.doTrans = function (callback) {
    ConnPool.getConnection(function (err, conn) {
        transAutoRelease(conn);
        conn.beginTransaction(function (err) {
            if (err) throw err;
            else {
                callback(conn);
            }
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
            // console.log('release!');
        }
    }
}

module.exports = ConnPool;
