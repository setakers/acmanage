const express = require('express');
const config = require('../config/config');
const StudentService = require('../modules/StudentService');
const TeacherService = require('../modules/TeacherService');
const router = express.Router();
var studentService = new StudentService();
var teacherService= new TeacherService();
router.get('/stu/:student_id', (req, resp) => {
        console.log(111);
        var student_id = req.params['student_id'];
        studentService.getStudentInfoByStudentId(student_id, function (info) {
            var responseJSON = JSON.stringify(info);
            resp.header('Content-Type', 'application/json')
                .status(200)
                .send(responseJSON)
                .end();
        })
    }
);
router.get('/teacher/:teacher_id', (req, resp) => {
        console.log(222);
        var teacher_id= req.params['teacher_id'];
        teacherService.getTeacherInfoByTeacherId(teacher_id, function (info) {
            var responseJSON = JSON.stringify(info);
            resp.header('Content-Type', 'application/json')
                .status(200)
                .send(responseJSON)
                .end();
        })
    }
);
module.exports = router;