import { Router } from 'express'
import authMiddleWares from '@middlewares/authMiddleWares'
import acceptPost from './accept.post'
import verifyPost from './verify.post'

const router = Router()

router.use([
  verifyPost,
])

// authenticated routes =>
router.use(authMiddleWares.checkAuthCore)
router.use([
  acceptPost,
])

export default router
