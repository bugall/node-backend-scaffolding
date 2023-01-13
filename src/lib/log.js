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
    }
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
