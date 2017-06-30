import Router from 'koa-router'
import { getUser, createUser } from '../../model/user'
const router = Router()

router.get('/:id', async function(ctx) {
	const userId = ctx.params.id
	if (isNaN(userId)) {
		throw new Error("user id format error")
	}
	const data = await getUser(userId)
	ctx.body = {
		code: 200,
		data: data
	}
})

router.post('/', async function(ctx) {
	const { name, password } = ctx.body
	if (name.length > 100 && password.length > 32) {
		throw new Error("name, password format error")
	}
	const newUserId = await createUser(name, password)
	ctx.body = {
		code: 200,
		data: { newUserId }
	}
})


export default router

