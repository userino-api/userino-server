import express from 'express'
import loginPost from './login.post'
import passwordRouter from './password/router'
import signInPost from './signin.post'

const app = express.Router()

app.use([
  loginPost,
  signInPost,
])

app.use('/password', passwordRouter)

export default app
