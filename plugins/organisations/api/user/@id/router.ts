import { Router } from 'express'
import login from './login.post'

const router = Router()

router.use([
  login,
])

export default router
