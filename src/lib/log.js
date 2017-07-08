import log4js from 'log4js'
import logConfig from '../../config'

log4js.configure({
    appenders: [{
        type: process.env.NODE_ENV == 'development' ? 'console' : 'file',
        filename: '/var/log/debug.log',
        category: 'debug'
    }, {
        type: process.env.NODE_ENV == 'development' ? 'console' : 'file',
        filename: '/var/log/info.log',
        category: 'info'
    }, {
        type: process.env.NODE_ENV == 'development' ? 'console' : 'file',
        filename: '/var/log/warn.log',
        category: 'warn'
    }, {
        type: process.env.NODE_ENV == 'development' ? 'console' : 'file',
        filename: '/var/log/error.log',
        category: 'error'
    }, {
        type: process.env.NODE_ENV == 'development' ? 'console' : 'file',
        filename: '/var/log/fatal.log',
        category: 'fatal'
    }]
})
const debug = log4js.getLogger('debug').setLevel('debug')
const info = log4js.getLogger('info').setLevel('info')
const warn = log4js.getLogger('warn').setLevel('warn')
const error = log4js.getLogger('error').setLevel('error')
const fatal = log4js.getLogger('fatal').setLevel('fatal')

export default class Log {
    constructor(type) {
        super(this)
    }
    async debug(msg) {
        debug.debug(msg)
    }
    async info(msg) {
        info.info(msg)
    }
    async warn(msg) {
        warn.warn(msg)  
    }
    async error(msg) {
        error.error(msg)
    }
    async tatal(msg) {
        fatal.fatal(msg)
    }
}