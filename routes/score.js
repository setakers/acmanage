const express = require('express');
const config = require('../config/config');
const AttendService = require('../modules/AttendService');
const ScoreQueryService = require('../modules/ScoreQueryService')
const StudentService = require('../modules/StudentService')
const CourseService = require('../modules/CourseService')
const router = express.Router();
let attendService = new AttendService();
let scoreQueryService = new ScoreQueryService()
let studentService = new StudentService()
let courseService = new CourseService()
const TeacherService = require('../modules/TeacherService')
let teacherService = new TeacherService()
//GET /api/score/publicity
router.get('/publicity', (req, resp) => {
    scoreQueryService.getAllScoreQueries(function (score_query) {
        let responseJson = JSON.stringify({tableData: score_query});
        // console.log('in publicity, rtn data: ');
        // console.log(score_query);
        resp.header('Content-Type', 'application/json')
            .status(200)
            .send(responseJson)
    })
})
//GET /api/score/stuscore/:student_id
router.get('/stuscore/:student_id', (req, resp) => {
    studentService.getScoreInfoByStudentId(req.params['student_id'], function (course_info) {
        // console.log('in stuscore, rtn data : ' + course_info);
        let responseJson = JSON.stringify({tableData: course_info});
        resp.header('Content-Type', 'application/json')
            .status(200)
            .send(responseJson)
    })
})
//GET /api/score/queryexam/:student_id
router.get('/query_exam/:student_id', (req, resp) => {
    studentService.getExamInfoByStudentId(req.params['student_id'], function (exam_query) {
        // console.log('exam_query');
        // console.log(exam_query);
        let responseJson = JSON.stringify({tableData: exam_query})
        resp.header('Content-Type', 'application/json')
            .status(200)
            .send(responseJson)
    })
})
//GET /api/score/teach_courses/:teacher_id
router.get('/teach_courses/:teacher_id', (req, resp) => {
    teacherService.getTeachCoursesByTeacherId(req.params['teacher_id'], function (teach_cources) {
        // console.log('GET /api/score/teach_courses/:teacher_id');
        let responseJson = JSON.stringify({tableData: teach_cources})
        // console.log(responseJson);
        resp.header('Content-Type', 'application/json')
            .status(200)
            .send(responseJson)
    })
})

//GET /api/score/stu_of_course/:course_id
router.get('/stu_of_course/:course_id', (req, resp) => {
        let course_id = req.params['course_id'];
        courseService.getStudentsOfCourseByCourseId(course_id, function (attends) {
            let responseJSON = JSON.stringify({'students': Array.from(attends)});
            resp.header('Content-Type', 'application/json')
                .status(200)
                .send(responseJSON);
        })
    }
);
//PUT /api/score/input_score
router.put('/input_score', (req, resp) => {
    attendService.markScores(req.body,function (res) {
        if(res){
            resp.sendStatus(200);
        }else{
            resp.sendStatus(204);
        }
    })
})
//POST /api/score/add_query_score_change
router.post('/add_query_score_change', (req, resp) => {
    scoreQueryService.addQueryScoreChange(req.body, function (res) {
        if (res) {
            resp.header('Content-Type', 'application/json')
                .sendStatus(200)
        } else {
            resp.header('Content-Type', 'application/json')
                .sendStatus(204)
        }
    })
});
//GET /api/score/score_change_query
router.get('/score_change_query', (req, resp) => {
    scoreQueryService.getUnhandledScoreQueries(function (score_query) {
        let responseJson = JSON.stringify({tableData: score_query});
        resp.header('Content-Type', 'application/json')
            .status(200)
            .send(responseJson)
    })
})
//PUT /api/score/handle_query
router.put('/handle_query', (req, resp) => {
    // console.log(req.body);
    scoreQueryService.updateQueryScore(req.body, function (res) {
        if (res) {
            resp.sendStatus(200);
        } else {
            resp.sendStatus(204);
        }
    })
});
module.exports = router;