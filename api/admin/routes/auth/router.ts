import express from 'express'
import checkPost from './check.post'

const app = express.Router()

app.use([
  checkPost,
])

export default app
