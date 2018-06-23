const express = require('express');
const config = require('../config/config');
const StudentService = require('../modules/StudentService');
const TeacherService = require('../modules/TeacherService');
const router = express.Router();
var studentService = new StudentService();
var teacherService= new TeacherService();

//GET /api/info/stu/:student_id
router.get('/stu/:student_id', (req, resp) => {
        var student_id = req.params['student_id'];
        console.log(student_id);
        studentService.getStudentInfoByStudentId(student_id, function (info) {
            var responseJSON = JSON.stringify(info);
            resp.header('Content-Type', 'application/json')
                .status(200)
                .send(responseJSON)
                .end();
        })
    }
);
//GET /api/info/teacher/:teacher_id
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
//PUT /api/info/userinfo
//POST /api/info/userinfo
//GET /api/info/userinfo
//POST /api/info/changePasswd

module.exports = router;