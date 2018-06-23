const express = require('express');
const config = require('../config/config');
const LoginAuth = require('../modules/LoginAuth');
const router = express.Router();
router.post('/userinfo', (req, resp) => {
    console.log('userinfo');
    var loginAuth = new LoginAuth(req.body.userinfo);
    loginAuth.isAuthorized(function (msg) {
        if (msg.err) {
            resp.sendStatus(204);
        } else {
            var res = {
                'accessToken': null,
                'user_name':null,
                'password':null,
                'character':null,
                'gender':null,
                'email':null,
                'phone':null,
                'roles': null,
                'student_id':null,
                'teacher_id':null,
            };
            loginAuth.getAccessToken(function (token) {
                res.accessToken = token;
                loginAuth.getUserRoles(function (str1) {
                    res.roles = str1;
                    var responseJSON = JSON.stringify(res);
                    resp.header('Content-Type', 'application/json')
                        .status(200)
                        .send(responseJSON);
                });
            });

        }
    })
});

router.get('/auth', (req, res) => {
    console.log('/auth');
    LoginAuth.isVerifiedAccessToken(req.headers['authorization'], function (msg) {
        console.log('msg:' + msg);
        if (msg) res.sendStatus(200);
        else res.sendStatus(204);
    })
});

// This stuff checks if username is valid
router.get('/userquery/:username', (req, resp) => {
    console.log('/userquery/:username');
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
