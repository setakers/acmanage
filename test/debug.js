const LoginAuth = require("../modules/LoginAuth");
LoginAuth.isUser('clh', function (msg) {
    console.log(msg);
})