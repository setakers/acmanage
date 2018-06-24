const express = require('express');
const config = require('../config/config');
const router = express.Router();
const UserService = require('../modules/UserService')
let userService = new UserService();
const CourseService = require('../modules/CourseService')
let courseService = new CourseService();
//get /api/resource/classrooms
//post /api/resource/classrooms
//put /api/resource/classrooms

//get /api/acco/accounts
router.get('/classroom', (req, resp) => {
        courseService.listClassroom(function (classroom_list) {
            let responseJSON = JSON.stringify({tableData: classroom_list});
            resp.header('Content-Type', 'application/json')
                .status(200)
                .send(responseJSON);
        })
    }
);
//put /api/account/accounts
router.put('/classroom', (req, resp) => {
    courseService.modifyClassroom(req.body, function (res) {
        if (res) {
            resp.sendStatus(200);
        } else {
            resp.sendStatus(204);
        }
    })
});
//post /api/account/accounts
router.post('/classroom', (req, resp) => {
    courseService.addClassroom(req.body, function (res) {
        if (res) {
            resp.sendStatus(200);
        } else {
            resp.sendStatus(204);
        }
    })
});
module.exports = router;
