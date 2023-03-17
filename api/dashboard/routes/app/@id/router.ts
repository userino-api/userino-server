import express from 'express'
import idDelete from './@.delete'
import idGet from './@.get'
import authRouter from './auth/router'

const app = express.Router()

app.use([
  idGet,
  idDelete,
])

app.use('/auth', authRouter)

export default app
