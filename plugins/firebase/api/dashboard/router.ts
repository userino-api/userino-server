import { Router } from 'express'
import projectRouter from './project/router'

const router = Router()

router.use('/project', projectRouter)

export default router
