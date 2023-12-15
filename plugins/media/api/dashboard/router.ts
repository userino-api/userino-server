import { Router } from 'express'
import appRouter from './project/router'

const router = Router()

router.use('/app', appRouter)

export default router
