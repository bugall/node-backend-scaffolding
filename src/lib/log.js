import log4js from 'log4js'
import config from '../../config'
const logConfig = config.logConfig

log4js.configure({
  appenders: {
    debug: {
      type: logConfig.type,
      filename: '/var/log/debug.log',
      category: 'debug',
    }, info: {
      type: logConfig.type,
      filename: '/var/log/info.log',
      category: 'info',
    }, warn: {
      type: logConfig.type,
      filename: '/var/log/warn.log',
      category: 'warn',
    }, error: {
      type: logConfig.type,
      filename: '/var/log/error.log',
      category: 'error',
    }, fatal: {
      type: logConfig.type,
      filename: '/var/log/fatal.log',
      category: 'fatal',
    },
  }, categories: {
    default: {
      appenders: ['debug'],
      level: 'debug',
    }, debug: {
      appenders: ['debug'],
      level: 'debug',
    }, info: {
      appenders: ['info'],
      level: 'info',
    }, warn: {
      appenders: ['warn'],
      level: 'warn',
    }, error: {
      appenders: ['error'],
      level: 'error',
    }, fatal: {
      appenders: ['fatal'],
      level: 'fatal',
    },
  },
})
export default class {
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