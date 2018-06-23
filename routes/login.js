const express = require('express');
const config = require('../config/config');
const LoginAuth = require('../modules/LoginAuth');
const UserService = require('../modules/UserService');
const AsStudentService = require('../modules/AsStudentService');
const AsTeacherService = require('../modules/AsTeacherService');
const router = express.Router();
var userService = new UserService();
var asStudentService = new AsStudentService();
var asTeacherService = new AsTeacherService();
router.post('/userinfo', (req, resp) => {
    var loginAuth = new LoginAuth(req.body.userinfo);
    var send_resp = function (res, resp) {
        var responseJSON = JSON.stringify(res);
        resp.header('Content-Type', 'application/json')
            .status(200)
            .send(responseJSON);
    };
    loginAuth.isAuthorized(function (msg) {
        if (msg.err) {
            resp.sendStatus(204);
        } else {
            var res = {
                'accessToken': null,
                'user_id': null,
                'user_name': null,
                'character': null,
                'gender': null,
                'email': null,
                'phone': null,
                'student_id': null,
                'teacher_id': null,
            };
            loginAuth.getAccessToken(function (token) {
                res.accessToken = token;
                var user_name = LoginAuth.userInfoObject.user_name;
                userService.getUserByUsername(user_name, function (user) {
                    res.user_id = user[0]['user_id'];
                    res.user_name = user[0]['user_name'];
                    res.character = user[0]['character'];
                    res.gender = user[0]['gender'];
                    res.email = user[0]['email'];
                    res.phone = user[0]['phone'];
                    if (res.character === 0) {
                        asStudentService.getAsStudentByUserId(user[0]['user_id'], function (as_student) {
                            res.student_id = as_student[0]['student_id'];
                            send_resp(res, resp);
                        })
                    } else if (res.character === 1) {
                        asTeacherService.getAsTeacherByUserId(user[0]['user_id'], function (as_teacher) {
                            res.teacher_id = as_teacher[0]['teacher_id'];
                            send_resp(res, resp);
                        })
                    }
                })

            });
        }
    })
});

router.get('/auth', (req, res) => {
    LoginAuth.isVerifiedAccessToken(req.headers['authorization'], function (msg) {
        if (msg) res.sendStatus(200);
        else res.sendStatus(204);
    })
});

// This stuff checks if username is valid
router.get('/userquery/:username', (req, resp) => {
    var username = req.params['username'];
    LoginAuth.isUser(username, function (msg) {
        if (!msg.err) {
            resp.sendStatus(200);
        } else {
            resp.sendStatus(204);
        }
    })
});

module.exports = router;
