const CrossDao = require('../dataModels/CrossDao');
const UserDao = require('../dataModels/UserDao');

var crossDao = new CrossDao();
var userDao = new UserDao();
userDao.getRoleByUsername('admin', function (res) {
    console.log(res);
});
crossDao.findAllStudentsByCourseId(1, function (students) {
    console.log(JSON.stringify(Array.from(students)));
});