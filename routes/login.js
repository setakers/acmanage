const express       = require('express');
const config        = require('../config/config');
const LoginAuth     = require('../modules/LoginAuth');
const router        = express.Router();

router.post('/userinfo', (req, res) => {
    var loginAuth = new LoginAuth(req.body.userinfo);
    if(!loginAuth.isAuthorized) res.sendStatus(204);
    else {
        var responseJSON = JSON.stringify({
            accessToken:    loginAuth.getAccessToken(),
            roles:          loginAuth.getUserRoles(),
        });
        res .header('Content-Type', 'application/json')
            .status(200)
            .send(responseJSON);
    }
});

router.get('/auth', (req, res) => {
    var verified = LoginAuth.isVerifiedAccessToken(req.headers['authorization']);
    if(verified) res.sendStatus(200);
    else res.sendStatus(204);
});

// This stuff checks if username is valid
router.get('/userquery/:username', (req, res) => {
    var username = req.params['username'];
    if(LoginAuth.isUser(username)) res.sendStatus(200);
    else res.sendStatus(204);
});

module.exports = router;
