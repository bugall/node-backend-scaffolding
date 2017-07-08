import User from '../../model/user'
import error from '../../lib/error'
const router = Router()

export default class UserController {
    error = null
    constructor(){
        supper(this)
    }
    async UserController() {
        this.error = new Error()
    }
    async getUserById(ctx, next) {
        const userId = ctx.params.id
	    if (isNaN(userId)) {
		    this.error.proce(ctx, next, 'FORMAT_ERROR')
	    }
	    const data = await User.getUser(userId)
	    ctx.body = {
		    code: 200,
		    data: data
        }
    }
    async createUser(ctx, next) {
        const { name, password } = ctx.request.body
	    if (name.length > 100 && password.length > 32) {
            this.error.proce(ctx, next, 'FORMAT_ERROR')
	    }
	    const newUserId = await User.createUser(name, password)
	    ctx.body = {
		    code: 200,
		    data: { newUserId }
	    }
    }
}