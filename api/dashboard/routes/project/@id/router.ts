import express from 'express'
import idDelete from './@.delete'
import idGet from './@.get'
import appCreate from './app.post'
import appsGet from './apps.get'
import authRouter from './auth/router'

const app = express.Router()

app.use([
  idGet,
  appsGet,
  idDelete,
  appCreate,
])

app.use('/auth', authRouter)

export default app
