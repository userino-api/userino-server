import express from 'express'
import idDelete from './@.delete'
import idGet from './@.get'
import contactsGet from './contacts.get'
import emailGet from './email.get'

const app = express.Router()

app.use([
  idGet,
  contactsGet,
  emailGet,
  idDelete,
])

export default app
