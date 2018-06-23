var mysql = require('mysql');




var DaoUtil = function () {
};
// DaoUtil.
DaoUtil.getConnection = function () {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'clhclh19971123',
        database: 'setakers'
    });
    return connection;
};
DaoUtil.release = function (connection) {
    connection.end();
};
module.exports = DaoUtil;