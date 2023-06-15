import { Router } from 'express'
import fcmTokens from './fcm-tokens.get'

const router = Router()

router.use([
  fcmTokens,
])

export default router
