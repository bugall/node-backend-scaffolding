import Router from 'koa-router'
import UserController from './user.controller'
const userController = new UserController()
const router = Router()

/**
 * @description 获取用户信息
 * @param  {Number} id 用户的id
 * @return {Json} data 用户的信息
 */
router.get('/:id', userController.getUserById)

/**
 * @description 注册一个用户
 * @param  {String} username 账号名(不超过20个字符)
 * @param  {String} password 密码(不超过32个字符)
 * @return {Json} userId 用户的id
 */
router.post('/', userController.createUser)

export default router

