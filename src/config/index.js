const dotenv = require('dotenv')

dotenv.config({})

module.exports = {
    ServerConfig: require('./server-config.js'),
    Logger: require('./logger-config.js')
}