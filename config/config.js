// Server configurations
module.exports = {
    accessPort          : 8888,
    portWhenProxy       : 8889,
    frontendPort        : 8080,
    hostname            : 'localhost',
    // Session time limit in seconds
    sessionTimeLimit    : 3,
    // Key for encrypting app token
    accessKey           : 'SEtakers2018AccessKey',
    getStaticPath       : path => ('/#/' + path).replace('//', '/'),
    apiPathPattern      : /\/api/,
    getApiPath          : path => ('/api/' + path).replace('//', '/'),
};