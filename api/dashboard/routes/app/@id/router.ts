import express from 'express'
import idDelete from './@.delete'
import idGet from './@.get'
import appClientRouter from './app-client/router'

const app = express.Router()

app.use([
  idGet,
  idDelete,
])

app.use('/app-client', appClientRouter)

export default app
