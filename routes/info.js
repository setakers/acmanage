const express = require('express');
const config = require('../config/config');
const StudentService = require('../modules/StudentService');
const router = express.Router();
var studentService = new StudentService();
router.get('stu/:student_id', (req, resp) => {
        console.log(111);
        var student_id = req.params['student_id'];
        studentService.getStudentInfoByStudentId(student_id, function (info) {
            var responseJSON = JSON.stringify(info);
            resp.header('Content-Type', 'application/json')
                .status(200)
                .send(responseJSON);
        })
    }
);
module.exports = router;