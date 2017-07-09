import bodyParser from 'koa-bodyparser'
import Koa from 'koa'
import promise from 'bluebird'
import qs from 'koa-qs'
import ResFormat from '../lib/resFormat'
const resFormat = new ResFormat()

global.Promise = promise

const app = new Koa()
import routes from '../routes'
app.use((ctx, next) => {
  return next().then(() => {
  }).catch((err) => {
    ctx.status = 500
    ctx.body = '服务器繁忙'
    resFormat.proces(ctx, err.message)
  })
})

qs(app)
app.use(bodyParser())
app.use(routes.routes(), routes.allowedMethods())
module.exports = app
