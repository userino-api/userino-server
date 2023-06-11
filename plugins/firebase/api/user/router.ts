import { Router } from 'express'
import authMiddleWares from '@middlewares/authMiddleWares'
import connectFirebaseAppMiddleware, { RouterLocals as FirebaseMiddleWareLocals } from '../../middlewares/connectFirebaseAppMiddleware'
import fcmTokenPost from './fcm-token.post'
import loginPost from './login.post'

const router = Router()

export interface RouterLocals extends FirebaseMiddleWareLocals {
}

router.use(connectFirebaseAppMiddleware)

router.use([
  loginPost,
])

router.use(authMiddleWares.checkAuthCore)
router.use([
  fcmTokenPost,
])

export default router
