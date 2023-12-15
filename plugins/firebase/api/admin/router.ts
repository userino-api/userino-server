import { Router } from 'express'
import dropRouter from './drop/router'
import projectRouter from './project/router'
import userRouter from './user/router'

const router = Router()

router.use('/project', projectRouter)
router.use('/user', userRouter)
router.use('/drop', dropRouter)

export default router
