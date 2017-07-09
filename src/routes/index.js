'use strict'

import Router from 'koa-router'
import user from './user'
const router = new Router()

router.use('/user', user.routes(), user.allowedMethods())

export default router
