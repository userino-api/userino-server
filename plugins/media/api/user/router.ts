import { Router } from 'express'
import authMiddleWares from '@middlewares/authMiddleWares'
import connectMediaAppMiddleware, { RouterLocals as FirebaseMiddleWareLocals } from '../../middlewares/connectMediaAppMiddleware'
import createUploadToken from './create-upload-token.post'

const router = Router()

export interface RouterLocals extends FirebaseMiddleWareLocals {
}

router.use(connectMediaAppMiddleware)

router.use(authMiddleWares.checkAuthCore)
router.use([
  createUploadToken,
])

export default router
