import { Router } from 'express'
import get from './@.get'
import statusPost from './status.post'

const app = Router()

app.use([
  get,
  statusPost,
])

export default app
