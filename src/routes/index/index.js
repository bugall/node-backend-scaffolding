import Router from 'koa-router'
import User from '../../model/user'
const router = Router()

router.get('/', async (ctx) => {
	console.log(123123)
})

export default router

