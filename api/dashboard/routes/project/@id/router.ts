import express from 'express'
import idDelete from './@.delete'
import idGet from './@.get'
import appCreate from './app.post'
import authRouter from './auth/router'

const app = express.Router()

app.use([
  idGet,
  idDelete,
  appCreate,
])

app.use('/auth', authRouter)

export default app
