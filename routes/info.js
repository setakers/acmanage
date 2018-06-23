const express = require('express');
const config = require('../config/config');
const StudentService = require('../modules/StudentService');
const router = express.Router();
var studentService = new StudentService();
router.get('/stu/:student_id', (req, resp) => {
        var student_id = req.params['student_id'];
        console.log(student_id);
        studentService.getStudentInfoByStudentId(student_id, function (info) {
            var responseJSON = JSON.stringify(info);
            resp.header('Content-Type', 'application/json')
                .status(200)
                .send(responseJSON);
        })
    }
);

/*
GET /api/info/teacher/:teacher_id
PUT /api/info/userinfo
POST /api/info/userinfo
GET /api/info/userinfo
POST /api/info/changePasswd
 */
module.exports = router;