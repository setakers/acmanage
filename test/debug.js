const StudentService = require('../modules/StudentService');
var studentService = new StudentService();
studentService.getStudentInfoByStudentId(3, function (data) {
    console.log(data);
})