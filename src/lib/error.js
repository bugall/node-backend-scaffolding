import errorCode from '../../config/errorCode'
import Log from './log'
export default class Error {
    log = null
    constructor() {
        super(this)
    }
    async Error() {
        this.log = new Log
    }
    async proce(ctx, next, type) {
        ctx.body = errorCode[type]
        this.log.error(`log=routes;type=${type};${ctx.path};${ctx.method};${ctx.request.query};${ctx.request.body};${ctx.request.params}`)
        next()
    }
}