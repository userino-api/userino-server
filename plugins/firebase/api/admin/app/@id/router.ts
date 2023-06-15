import { Router } from 'express'
import configGet from './config.get'

const router = Router()

router.use([
  configGet,
])

export default router
