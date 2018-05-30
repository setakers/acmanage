// This module should be able to drive the database

// TODO:
// The fake data should be replaced by a database connection
// You can implement this with either mySQL or MongoDB
var fakeData = {
    '12345678': {
        password: 'test12345678',
        role: ['student']
    },
    '87654321': {
        password: 'test87654321',
        role: ['admin']
    },
    '23456789': {
        password: 'test234566789',
        role: ['admin', 'instructor']
    },
    '98765432': {
        password: 'test98765432',
        role: ['instructor']
    }
};

var userModel = {
    // Return true or false
    isUser(username) {
        if(typeof username !== 'string') return false;
        if(username in fakeData) return true;
        else return false;
    },
    isAuthorized(username, password) {
        if(!this.isUser(username)) return false;
        if(typeof password !== 'string') return false;
        if(fakeData[username].password === password) return true;
        else return false;
    },
    // To improve the database access efficiency,
    // you can assume that this function is called only after
    // the isUser method has already been called
    getRole(username) {
        if(!this.isUser(username)) return null;
        else return fakeData[username].role;
    }
};

module.exports = userModel;