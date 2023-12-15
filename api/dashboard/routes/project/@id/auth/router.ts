import express from 'express'
import listGet from './list.get'

const router = express.Router()

router.use([
  listGet,
])

export default router
