'use strict'

import Router from 'koa-router'
import rootRouter from './index/index'

console.log(rootRouter)
const router = Router()

router.use('', rootRouter.routes(), rootRouter.allowedMethods())

export default router
