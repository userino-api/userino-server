import express from 'express'
import authMiddleWares from '@middlewares/authMiddleWares'
import changePasswordPost from './change.post'
import resetPwdPost from './reset.post'

const app = express.Router()

app.use([
  resetPwdPost,
])

app.use(authMiddleWares.checkAuthCore)

app.use([
  changePasswordPost,
])

export default app
