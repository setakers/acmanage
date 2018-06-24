const express = require('express');
const config = require('../config/config');
const router = express.Router();
const UserService = require('../modules/UserService')
let userService = new UserService();
const CourseService = require('../modules/CourseService')
let courseService = new CourseService();
router.get('/valid_classroom/:room_name', (req, resp) => {
        courseService.checkValidClassroom(req.params['room_name'],function(res) {
            if(res)
                resp.sendStatus(200);
            else
                resp.sendStatus(204);
        })
    }
);
//get /api/resource/classrooms
router.get('/classrooms', (req, resp) => {
        courseService.listClassroom(function (classroom_list) {
            let responseJSON = JSON.stringify({tableData: classroom_list});
            resp.header('Content-Type', 'application/json')
                .status(200)
                .send(responseJSON);
        })
    }
);
//put /api/resource/classrooms
router.put('/classrooms', (req, resp) => {
    courseService.modifyClassroom(req.body, function (res) {
        if (res) {
            resp.sendStatus(200);
        } else {
            resp.sendStatus(204);
        }
    })
});
//post /api/resource/classrooms
router.post('/classrooms', (req, resp) => {
    courseService.addClassroom(req.body, function (res) {
        if (res) {
            resp.sendStatus(200);
        } else {
            resp.sendStatus(204);
        }
    })
});

//get /api/resource/courses
router.get('/courses', (req, resp) => {
        courseService.listCourse(function (classroom_list) {
            let responseJSON = JSON.stringify({tableData: classroom_list});
            resp.header('Content-Type', 'application/json')
                .status(200)
                .send(responseJSON);
        })
    }
);
//put /api/resource/courses
router.put('/courses', (req, resp) => {
    courseService.modifyCourse(req.body, function (res) {
        if (res) {
            resp.sendStatus(200);
        } else {
            resp.sendStatus(204);
        }
    })
});
//post /api/resource/courses
router.post('/courses', (req, resp) => {
    courseService.addCourse(req.body, function (res) {
        if (res) {
            resp.sendStatus(200);
        } else {
            resp.sendStatus(204);
        }
    })
});
module.exports = router;
