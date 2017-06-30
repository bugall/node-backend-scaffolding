'use strict'

import Router from 'koa-router'
import user from './user'
const router = Router()

router.use('', user.routes(), user.allowedMethods())

export default router
