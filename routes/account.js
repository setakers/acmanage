const express = require('express');
const config = require('../config/config');
const router = express.Router();
const UserService = require('../modules/UserService')
let userService = new UserService()
///GET api/account/query_account/:keyword
router.get('/query_account/:keyword', (req, resp) => {
        userService.searchUser(req.params['keyword'], function (user_query) {
            let responseJSON = JSON.stringify({results: user_query });
            resp.header('Content-Type', 'application/json')
                .status(200)
                .send(responseJSON);
        })
    }
);

module.exports =router;