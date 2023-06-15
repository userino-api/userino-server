import express from 'express'
import list from './list.get'
import save from './save.post'

const app = express.Router()

// auth required

app.use([
  save,
  list,
])

export default app
