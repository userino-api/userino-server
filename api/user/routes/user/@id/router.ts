import { Router } from 'express'
import get from './@.get'

const router = Router()

router.use([
  get,
])

export default router
