const express = require('express');
const config = require('../config/config');
const router = express.Router();
const CourseService = require('../modules/CourseService')
let courseService = new CourseService();
const StudentService = require('../modules/StudentService')
let studentService = new StudentService()
//GET select/query_courses
router.get('/query_courses', (req, resp) => {
    courseService.getAllCourses(function(course_query){
        let responseJson = JSON.stringify({courses: course_query});
        resp.header('Content-Type', 'application/json')
            .status(200)
            .send(responseJson)
    })
});
//GET select/selected/:student_id`
router.get('/selected/:student_id',(req,resp)=>{
    studentService.getCoursesByStudentId(req.params['student_id'],function(course_query){
        let responseJson = JSON.stringify({selected: course_query});
        resp.header('Content-Type', 'application/json')
            .status(200)
            .send(responseJson)
    })
})
//GET select/selected_status/:student_id`


//POST /api/select/select_course`

//GET /api/select/search/:keyword

//GET /api/select/freerooms


//POST /api/select/open_course`


//GET select/open_courses_status/:teacher_id`
module.exports = router;
