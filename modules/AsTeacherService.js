// The Auth module handles the userinfo and generates a JWT
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const getTimestamp = require('../util/getTimestamp');
const AsTeacherDao= require('../dataModels/AsTeacherDao');
const ConnPool=require('../util/ConnPool');
const clone = require('../util/utils');

var asTeacherDao= new AsTeacherDao();
var AsTeacherService = function () {
    this.getAsTeacherByUserId= function (user_id, callback) {
        ConnPool.doTrans(function (conn) {
            asTeacherDao.getAsTeacherByUserId(conn,user_id,function (res) {
                conn.commit(function () {
                    callback(res);
                })
            });
        })
    }
};


module.exports = AsTeacherService ;