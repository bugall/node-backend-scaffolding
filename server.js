'use strict'
process.env.NODE_ENV = process.env.NODE_ENV || 'development'
const serverConfig = require('./config').default.server
const http = require('http')
const app = require('./src/bin/app')
const server = http.createServer(app.callback())
server.listen(serverConfig.port)
server.on('listening', () => {
	console.log(`🌐  listening on port 💻  ${serverConfig.port} in ${process.env.NODE_ENV} mode`)
})
module.exports = app
