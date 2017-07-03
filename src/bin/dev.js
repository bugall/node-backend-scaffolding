import bodyParser from 'koa-bodyparser'
import Koa from 'koa'
import promise from 'bluebird'
import qs from 'koa-qs'
global.Promise = promise

const app = new Koa()
import routes from '../routes'


app.use((ctx, next) => {
	return next().catch((err) => {
		console.log(err.stack)
		ctx.status = 500;
		ctx.body = '服务器繁忙'
	})
})

qs(app)
app.use(bodyParser())
app.use(routes.routes(), routes.allowedMethods())
module.exports = app
