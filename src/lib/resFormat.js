import errorCode from '../../config/errorCode'
import Log from './log'

export default class ResFormat extends Log{
    constructor() {
        super()
    }
    async proces(ctx, type) {
        const query = JSON.stringify(ctx.query)
        const body = JSON.stringify(ctx.request.body)
        const params = JSON.stringify(ctx.params)

        ctx.status = 200
        ctx.body = errorCode[type] || ctx.body
        this.error(`log=server;type=${type};${ctx.path};${ctx.method};${query};${body};${params}`)
    }
}