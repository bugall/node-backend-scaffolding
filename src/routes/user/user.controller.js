import User from './user.model'
import userLib from './user.lib.js'
import _ from 'lodash'

export default class UserController {
  constructor() {}
  async getUserById(ctx) {
    const userId = ctx.params.id
    if (isNaN(userId)) {
      throw new Error('FORMAT_ERROR')
    }
    const data = await User.getUserById(userId)
    ctx.body = {
      code: 200,
      data: data,
    }
  }

  async createUser(ctx) {
    const { username, password } = ctx.request.body
    if (username.length >= 100 || password.length >= 32) {
      throw new Error('FORMAT_ERROR')
      console.log()
    }
    // 判断用户名是否已经被使用
    // 为了演示，这里就简单处理，常规业务这里有四种种实现方式
    // 1. 插入前查询是否存在, 并发无法保证数据一致性
    // 2. 使用事务，使用一致性读这个级别，但是这个会降低表的读性能，以为这个级读是排他锁
    // 3. 表上的用户名字段设置为唯一索引，但是这个会造成插入的性能，像阿里云的rds已经不支持这个功能
    // 4. 使用消息队列
    const userInfo = await User.getUserInfoByUsername(username)
    if (!_.isEmpty(userInfo)) {
      throw new Error('USERNAME_HAS_USED')
    }
    const newUserInfo = await User.RemoveUser(username, userLib.passwordEncrypt(password))
    ctx.body = {
      code: 200,
      data: { userId: newUserInfo.insertId },
    }
  }

  async checkUserPassword(ctx) {
    const { username, password } = ctx.request.body
    if (username.length > 100 || password.length > 32) {
      throw new Error('FORMAT_ERROR')
    }
    const usersInfo = await User.getUserInfoByUsername(username)

    if (_.isEmpty(usersInfo)) {
      throw new Error('USER_NOT_EXSIT')
    }
    if (usersInfo[0].password !== userLib.passwordEncrypt(password)) {
      throw new Error('WRONG_PASSWORD')
    }

    ctx.body = {
      code: 200,
      data: 'success',
    }
  }
}
