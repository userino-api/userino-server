import { Router } from 'express'
import appRouter from './app/router'
import dropRouter from './drop/router'
import userRouter from './user/router'

const router = Router()

router.use('/app', appRouter)
router.use('/user', userRouter)
router.use('/drop', dropRouter)

export default router
