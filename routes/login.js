const express = require('express');
const config = require('../config/config');
const LoginAuth = require('../modules/LoginAuth');
const router = express.Router();

router.post('/userinfo', (req, resp) => {
    var loginAuth = new LoginAuth(req.body.userinfo);
    loginAuth.isAuthorized(function (msg) {
        if (msg.err) {
            resp.sendStatus(204);
        } else {
            var res = {'accessToken': null, 'roles': null};
            loginAuth.getAccessToken(function (str) {
                res.accessToken = str;
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
    LoginAuth.isVerifiedAccessToken(req.headers['authorization'], function (msg) {
        if (!msg.err) res.sendStatus(200);
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
