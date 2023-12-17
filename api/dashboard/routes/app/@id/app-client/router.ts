import express from 'express'
import create from './create.post'
import deletePost from './delete.post'
import list from './list.get'

const app = express.Router()

app.use([
  list,
  create,
  deletePost,
])

export default app
