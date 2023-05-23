import { Router } from 'express'
import authMiddleWares from '@middlewares/authMiddleWares'
import idGet from './@.get'
import acceptPost from './accept.post'
import verifyPost from './verify.post'

const router = Router()

router.use([
  verifyPost,
  idGet,
])

// authenticated routes =>
router.use(authMiddleWares.checkAuthCore)
router.use([
  acceptPost,
])

export default router
