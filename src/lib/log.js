import log4js from 'log4js'
import logConfig from '../../config'

const configTemplate = {
    level = []
}
log4js.configure({
    appenders: {
        debug: {
            type: process.env.NODE_ENV == 'development' ? 'console' : 'file',
            filename: '/var/log/debug.log',
            category: 'debug'
        }, info :{
            type: process.env.NODE_ENV == 'development' ? 'console' : 'file',
            filename: '/var/log/info.log',
            category: 'info'
        }, warn: {
            type: process.env.NODE_ENV == 'development' ? 'console' : 'file',
            filename: '/var/log/warn.log',
            category: 'warn'
        }, error: {
            type: process.env.NODE_ENV == 'development' ? 'console' : 'file',
            filename: '/var/log/error.log',
            category: 'error'
        }, fatal: {
            type: process.env.NODE_ENV == 'development' ? 'console' : 'file',
            filename: '/var/log/fatal.log',
            category: 'fatal'
        }
    }, categories: {
        default: {
            appenders: ['debug'],
            level: 'debug'
        }, debug: {
            appenders: ['debug'],
            level: 'debug'
        }, info: {
            appenders: ['info'],
            level: 'info'
        }, warn: {
            appenders: ['warn'],
            level: 'warn'
        }, error: {
            appenders: ['error'],
            level: 'error'
        }, fatal: {
            appenders: ['fatal'],
            level: 'fatal'
        }
    }
})

export default class Log {
    constructor() {
    }
    async debug(msg) {
        log4js.getLogger('debug').debug(msg)
    }
    async info(msg) {
        log4js.getLogger('info').info(msg)
    }
    async warn(msg) {
        log4js.getLogger('warn').warn(msg)  
    }
    async error(msg) {
        log4js.getLogger('error').error(msg)
    }
    async tatal(msg) {
        log4js.getLogger('fatal').fatal(msg)
    }
}