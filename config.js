// Server configurations
module.exports = {
    port            : 8080,
    hostname        : 'localhost',
    getStaticPath   : path => ('' + path).replace('//', '/'),
    getApiPath      : path => ('/api/' + path).replace('//', '/'),
};