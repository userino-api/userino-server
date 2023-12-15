import express from 'express'
import idDelete from './@.delete'
import idGet from './@.get'

const app = express.Router()

app.use([
  idGet,
  idDelete,
])

export default app
