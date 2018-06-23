const TeacherService = require('../modules/TeacherService');
var teacherService = new TeacherService();
teacherService.getTeachCoursesByTeacherId(1, function (data) {
    console.log(data);
})