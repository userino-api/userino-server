import express from 'express'
import idDelete from './@.delete'
import idGet from './@.get'
import assetPost from './asset.post'
import contactsGet from './contacts.get'
import devices from './devices.get'
import emailGet from './email.get'
import localization from './localization.get'

const app = express.Router()

app.use([
  idGet,
  contactsGet,
  emailGet,
  devices,
  idDelete,
  localization,
  assetPost,
])

export default app
