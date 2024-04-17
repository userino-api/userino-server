import express from 'express'
import idDelete from './@.delete'
import idGet from './@.get'
import appClientRouter from './app-client/router'
import users from './users.get'

const app = express.Router()

app.use([
  idGet,
  users,
  idDelete,
])

app.use('/app-client', appClientRouter)

export default app
