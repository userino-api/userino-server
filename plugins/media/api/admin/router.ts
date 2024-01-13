import { Router } from 'express'
import appRouter from './project/router'

const router = Router()

router.use('/project', appRouter)

export default router
