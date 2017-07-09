'use strict'
require('babel-core/register')({
	presets: ['latest'],
})
require('babel-polyfill')

process.env.NODE_ENV = process.env.NODE_ENV || 'development'
const serverConfig = require('./config').default.server
const http = require('http')
const app = require('./src/bin/app')
const server = http.createServer(app.callback())
server.listen(serverConfig.port)
server.on('listening', () => {
	console.log(`🌐  listening on port 💻  ${serverConfig.port} in development mode`)
})
module.exports = app