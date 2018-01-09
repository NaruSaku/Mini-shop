// key.js figure out what set of credentials to return
if (process.env.NODE_ENV === 'production'){
    // we are in prduction
    module.exports = require('./prod');
} else {
    module.exports = require('./dev');
}