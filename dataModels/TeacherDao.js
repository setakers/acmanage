var DaoUtil = require('../util/DaoUtil');


var TeacherDao = function () {

};

function error() {
    console.log("数据库出错!");
    return {err: 1, msg: "数据库出错"};
}

module.exports = TeacherDao;