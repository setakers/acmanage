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
router.post('/userinfo', (req, resp) => {
    let userinfo = req.body.userinfo;
    var originalString = Buffer.from(userinfo, 'base64').toString();
    var tempObject = JSON.parse(originalString);
    userService.checkPassword(tempObject, function (rs) {
        if (rs) {
            resp.sendStatus(200);
        } else {
            resp.sendStatus(204);
        }
    })
});
//PUT /api/info/changePasswd
router.put('/changePasswd', (req, resp) => {
    console.log(req.body);
    var originalString = Buffer.from(req.body['info'], 'base64').toString();
    var tempObject = JSON.parse(originalString);
    console.log(tempObject);
    userService.updatePassword(tempObject, function (res) {
        if (res) {
            resp.sendStatus(200);
        } else {
            esp.sendStatus(204);
        }
    })
});


module.exports = router;