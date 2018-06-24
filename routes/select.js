const express = require('express');
const config = require('../config/config');
const router = express.Router();
const CourseService = require('../modules/CourseService')
let courseService = new CourseService();
const StudentService = require('../modules/StudentService')
let studentService = new StudentService()
const SelectCourseService = require('../modules/SelectCourseService');
var selectCourseService = new SelectCourseService();
//GET select/query_courses
router.get('/query_courses', (req, resp) => {
    courseService.getAllCourses(function (course_query) {
        let responseJson = JSON.stringify({courses: course_query});
        resp.header('Content-Type', 'application/json')
            .status(200)
            .send(responseJson)
    })
});
//GET select/selected/:student_id`
router.get('/selected/:student_id', (req, resp) => {
    studentService.getCoursesByStudentId(req.params['student_id'], function (course_query) {
        let responseJson = JSON.stringify({selected: course_query});
        resp.header('Content-Type', 'application/json')
            .status(200)
            .send(responseJson)
    })
})
//GET select/selected_status/:student_id`
router.get('/selected_status/:student_id', (req, resp) => {
    studentService.getSelectedByStudentId(req.params['student_id'], function (course_query) {
        let responseJson = JSON.stringify({status: course_query});
        resp.header('Content-Type', 'application/json')
            .status(200)
            .send(responseJson)
    })
})

//POST /api/select/select_course`
router.post('/select_course', (req, resp) => {
    console.log(req.body);
    selectCourseService.addSelectCourse(req.body, function (res) {
        if (res) {
            resp.sendStatus(200);
        } else {
            resp.sendStatus(204);
        }
    })
});

//GET /api/select/search/:keyword
router.get('/search/:keyword', (req, resp) => {
    courseService.searchCourses(req.params['keyword'], function (course_query) {
        let responseJson = JSON.stringify({results: course_query});
        resp.header('Content-Type', 'application/json')
            .status(200)
            .send(responseJson)
    })
})
//GET /api/select/freerooms
router.get('/free_rooms', (req, resp) => {
    courseService.getFreeRooms(function (room_query) {
        let responseJson = JSON.stringify({rooms: room_query});
        resp.header('Content-Type', 'application/json')
            .status(200)
            .send(responseJson)
    })
})
//POST /api/select/open_course`


//GET select/open_courses_status/:teacher_id`
router.get('/open_courses_status/:teacher_id', (req, resp) => {
    courseService.getOpenCoursesByTeacherId(req.params['teacher_id'], function (course_query) {
        let responseJson = JSON.stringify({open_courses: course_query});
        resp.header('Content-Type', 'application/json')
            .status(200)
            .send(responseJson)
    })
})
//GET select/all_select_courses
router.get('/all_select_courses', (req, resp) => {
    courseService.getAllSelectCourses(function (select_query) {
        let responseJson = JSON.stringify({tableData: select_query});
        resp.header('Content-Type', 'application/json')
            .status(200)
            .send(responseJson)
    })
})
//PUT select/deal_select
router.put('/deal_select', (req, resp) => {
    selectCourseService.dealSelect(req.body, function (res) {
        if (res) {
            resp.sendStatus(200);
        } else {
            resp.sendStatus(204);
        }
    })
});
//GET select/all_open_course
router.get('/all_open_course', (req, resp) => {
    courseService.getAllOpenCourses(function (course_query) {
        let responseJson = JSON.stringify({tableData: course_query});
        resp.header('Content-Type', 'application/json')
            .status(200)
            .send(responseJson)
    })
})
//PUT select/deal_open_course
module.exports = router;
