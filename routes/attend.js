const express = require('express');
const config = require('../config/config');
const AttendService = require('../modules/AttendService');
const router = express.Router();
var attendService = new AttendService();
router.get('stu_of_course/:course_id', (req, resp) => {
        var course_id = req.params['course_id'];
        attendService.getAttendsByCourseId(course_id, function (attends) {
            var responseJSON = JSON.stringify(Array.from(students));
            resp.header('Content-Type', 'application/json')
                .status(200)
                .send(responseJSON);
        })
    }
);