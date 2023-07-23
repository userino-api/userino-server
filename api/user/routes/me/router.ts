import { Router } from 'express'
import usernamePost from './username.post'

const router = Router()

router.use([
  usernamePost,
])

export default router
