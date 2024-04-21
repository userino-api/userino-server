import express from 'express'
import idGet from './@.get'
import mobiles from './mobiles.get'

const app = express.Router()

app.use([
  idGet,
  mobiles,
])

export default app
