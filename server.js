'use strict'

require('babel-core/register')({
	presets: ['latest'],
})
require('babel-polyfill')

const serverConfig = require('./config').server
process.env.PORT = process.env.PORT || serverConfig.port;
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const http = require('http')
const app = require('./src/bin/app')
const server = http.createServer(app.callback())
server.listen(process.env.PORT)
server.on('listening', () => {
	console.log(`listening on port ${process.env.PORT} in development mode`)
})
module.exports = app
