import User from '../../model/user'
import userLib from './user.lib.js'
import _ from 'lodash'

export default class UserController {
    constructor(){}
    async getUserById(ctx, next) {
        const userId = ctx.params.id
	    if (isNaN(userId)) {
            throw new Error('FORMAT_ERROR')
	    }
	    const data = await User.getUserById(userId)
	    ctx.body = {
		    code: 200,
		    data: data
        }
    }

    async createUser(ctx, next) {
        const { username, password } = ctx.request.body
	    if (username.length > 100 || password.length > 32) {
            throw new Error('FORMAT_ERROR')
	    }
	    const newUserInfo = await User.createUser(username, userLib.passwordEncrypt(password))
	    ctx.body = {
		    code: 200,
		    data: { userId: newUserInfo.insertId }
	    }
    }

    async checkUserPassword(ctx, next) {
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
            data: 'success'
        }
    }
}