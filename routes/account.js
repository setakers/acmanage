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
//get /api/account/accounts
router.get('/accounts', (req, resp) => {
        userService.listAccount(function (user_query) {
            let responseJSON = JSON.stringify({tableData: user_query });
            resp.header('Content-Type', 'application/json')
                .status(200)
                .send(responseJSON);
        })
    }
);
//put /api/account/accounts
router.put('/accounts', (req, resp) => {
    userService.modifyAccount(req.body, function (res) {
        if (res) {
            resp.sendStatus(200);
        } else {
            resp.sendStatus(204);
        }
    })
});
//post /api/account/accounts

router.post('/accounts', (req, resp) => {
    userService.addAccount(req.body, function (res) {
        if (res) {
            resp.sendStatus(200);
        } else {
            resp.sendStatus(204);
        }
    })
});
module.exports =router