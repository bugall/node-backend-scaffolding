'use strict'
require('babel-core/register')({
	  presets: ['latest'],
})
require('babel-polyfill')

const serverConfig = require('./config').server
process.env.PORT = process.env.PORT || serverConfig.port;

const http = require('http')
const app = require('../bin/dev')
const server = http.createServer(app.callback())
server.listen(process.env.PORT)
server.on('listening', () => {
	console.info(`${config.name}@${config.version} listening on port ${process.env.PORT} in development mode`)
})
module.exports = app
