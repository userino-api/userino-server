import { Router } from 'express'
import get from './@.get'
import asset from './asset.post'
import deleteUser from './delete.post'
import name from './name.post'
import username from './username.post'

const router = Router()

router.use([
  get,
  name,
  asset,
  username,
  deleteUser,
])

export default router
