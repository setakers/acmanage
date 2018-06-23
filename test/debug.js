var ConnPool = require('../util/ConnPool');
const UserDao = require('../dataModels/UserDao');
let userDao = new UserDao();
ConnPool.doTrans(function (conn) {
    userDao.addUser(conn,null,function (rtnval) {
        console.log('add success, rtnval : ');
        console.log(rtnval);
        userDao.shit(conn,null,function (rtnval) {
            // console.log('success');
            // console.log(rtnval);
            conn.commit(function() {
                console.log('success' + JSON.stringify(rtnval));
            });
        })
    })
})