const express = require('express');
const config = require('../config/config');
const StudentService = require('../modules/StudentService');
const TeacherService = require('../modules/TeacherService');
const UserService = require('../modules/UserService');
const router = express.Router();
var studentService = new StudentService();
var teacherService = new TeacherService();
var userService = new UserService();

//GET /api/info/stu/:student_id
router.get('/stu/:student_id', (req, resp) => {
        var student_id = req.params['student_id'];
        // console.log(student_id);
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
        var teacher_id = req.params['teacher_id'];
        teacherService.getTeacherInfoByTeacherId(teacher_id, function (info) {
            var responseJSON = JSON.stringify(info);
            resp.header('Content-Type', 'application/json')
                .status(200)
                .send(responseJSON);
        })
    }
);
//PUT /api/info/userinfo
router.put('/userinfo', (req, resp) => {
    console.log(req.body);
    userService.updateUser(req.body, function (res) {
        if (res) {
            resp.sendStatus(200);
        } else {
            resp.sendStatus(204);
        }
    })

});
//POST /api/info/userinfo
//GET /api/info/userinfo
//PUT /api/info/changePasswd
router.put('/changePasswd', (req, resp) => {
    console.log(req);
});


module.exports = router;