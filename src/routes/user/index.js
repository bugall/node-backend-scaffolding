import Router from 'koa-router'
import UserController from './user.controller'
const userController = new UserController()
const router = Router()

router.get('/:id', userController.getUserById)
router.post('/', userController.createUser)

export default router

