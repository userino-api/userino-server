import { Router } from 'express'
import connectFirebaseAppMiddleware, { RouterLocals as FirebaseMiddleWareLocals } from '../../middlewares/connectFirebaseAppMiddleware'
import loginPost from './login.post'

const router = Router()

export interface RouterLocals extends FirebaseMiddleWareLocals {
}

router.use(connectFirebaseAppMiddleware)

router.use([
  loginPost,
])

export default router
