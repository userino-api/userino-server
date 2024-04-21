import express from 'express'
import issueModel, { Issue } from '@models/issues/issueModel'
import idRouter from './@id/router'
import list from './list.get'

const app = express.Router()

app.use([
  list,
])

export interface RouterLocals {
  issue: Issue
}

app.use<{ id: string}>('/:id', async (req, res, next) => {
  const { id } = req.params

  const issue = await issueModel.get(id)
  if (!issue) return res.sendError(404, 'Not found')

  const locals : RouterLocals = { issue }
  res.locals = locals

  next()
}, idRouter)

export default app
