// Server configurations
module.exports = {
    accessPort      : 8888,
    portWhenProxy   : 8889,
    frontendPort    : 8080,
    hostname        : 'localhost',
    getStaticPath   : path => ('' + path).replace('//', '/'),
    apiPathPattern  : /\/api/,
    getApiPath      : path => ('/api/' + path).replace('//', '/'),
};