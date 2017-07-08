import errorCode from '../../config/errorCode'
import Log from './log'
export default class Error extends Log{
    constructor() {
        super()
    }
    async error(ctx, next, type) {
        ctx.body = errorCode[type]
        this.log.error(`log=routes;type=${type};${ctx.path};${ctx.method};${ctx.request.query};${ctx.request.body};${ctx.request.params}`)
        next()
    }
}