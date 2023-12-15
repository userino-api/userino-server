import { Router } from 'express'
import configGet from './config.get'
import configPost from './config.post'
import disablePost from './disable.post'
import enablePost from './enable.post'

const router = Router()

router.use([
  configGet,
  configPost,
  enablePost,
  disablePost,
])

export default router
