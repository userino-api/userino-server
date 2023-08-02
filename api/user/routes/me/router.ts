import { Router } from 'express'
import get from './@.get'
import name from './name.post'
import usernamePost from './username.post'

const router = Router()

router.use([
  get,
  name,
  usernamePost,
])

export default router
