import express from 'express'
import create from './create.post'
import listGet from './list.get'

const app = express.Router()

app.use([
  listGet,
  create,
])

export default app
