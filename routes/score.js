const express = require('express');
const config = require('../config/config');
const AttendService = require('../modules/AttendService');
const ScoreQueryService = require('../modules/ScoreQueryService')
const StudentService = require('../modules/StudentService')
const router = express.Router();
let attendService = new AttendService();
let scoreQueryService = new ScoreQueryService()
let studentService = new StudentService()

//GET /api/score/publicity
router.get('/publicity', (req,resp)=>{
    scoreQueryService.getAllScoreQueries(function(score_query){
        let responseJson = JSON.stringify({tableData:score_query})
        resp.header('Content-Type', 'application/json')
            .status(200)
            .send(responseJson)
    })
})
//GET /api/score/stuscore/:student_id
//GET /api/score/queryexam/:student_id
router.get('/queryexam/:student_id', (req,resp)=>{
    studentService.getExamInfoByStudentId(req.params['student_id'], function(exam_query){
        let responseJson = JSON.stringify({tableData: exam_query})
        resp.header('Content-Type', 'application/json')
            .status(200)
            .send(responseJson)
    })
})
//GET /api/score/teach_courses/:teacher_id
//GET /api/score/stu_of_course/:course_id
//service not finished yet************
router.get('/stu_of_course/:course_id', (req, resp) => {
        let course_id = req.params['course_id'];
        attendService.getAttendsByCourseId(course_id, function (attends) {
            let responseJSON = JSON.stringify(Array.from(attends));
            resp.header('Content-Type', 'application/json')
                .status(200)
                .send(responseJSON);
        })
    }
);
//PUT /api/score/input_score
//POST /api/score/add_query_score_change
//GET /api/score/score_change_query
//PUT /api/score/handle_query
module.exports = router;