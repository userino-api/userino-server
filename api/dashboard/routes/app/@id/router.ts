import express from 'express'
import idDelete from './@.delete'
import idGet from './@.get'
import appClientRouter from './app-client/router'
import issueRouter from './issue/router'
import users from './users.get'

const app = express.Router()

app.use([
  idGet,
  users,
  // idDelete, // tmp disable for api safety
])

app.use('/app-client', appClientRouter)
app.use('/issue', issueRouter)

export default app
