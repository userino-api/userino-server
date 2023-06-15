import express from 'express'
import idDelete from './@.delete'
import idGet from './@.get'
import contactsGet from './contacts.get'
import devices from './devices.get'
import emailGet from './email.get'

const app = express.Router()

app.use([
  idGet,
  contactsGet,
  emailGet,
  devices,
  idDelete,
])

export default app
