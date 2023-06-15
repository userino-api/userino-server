import { Router } from 'express'
import fcmTokens from './fcm-token.post'

const router = Router()

router.use([
  fcmTokens,
])

export default router
