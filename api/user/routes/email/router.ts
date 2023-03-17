import express from 'express'
import authMiddleWares from '@middlewares/authMiddleWares'
import checkEmail from './check.post'
import sendPost from './send.post'
import verifyPost from './verify.post'

const app = express.Router()

app.use([
  verifyPost,
])

// auth required
app.use(authMiddleWares.checkAuthCore)

app.use([
  checkEmail,
  sendPost,
])

export default app
