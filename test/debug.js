const CourseService = require('../modules/CourseService')

var courseService = new CourseService();
courseService.getStudentsOfCourseByCourseId(1, function (students) {
    console.log(students);
})