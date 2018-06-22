var DaoUtil = require('../util/DaoUtil');


var StudentDao = function () {

};

function error() {
    console.log("数据库出错!");
    return {err: 1, msg: "数据库出错"};
}

module.exports = StudentDao;