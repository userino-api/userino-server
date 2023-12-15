import { checkValidator } from '@zvs001/express'
import express from 'express'
import { param } from 'express-validator'
import projectModel, { Project } from '@models/projectModel'
import idRouter from './@id/router'
import createPost from './create.post'
import listGet from './list.get'

const router = express.Router()

export interface RouterLocals {
  project: Project
}

router.use([
  listGet,
  createPost,
])

router.use<{ id: string }>('/:id', param('id').isUUID(), checkValidator, async (req, res, next) => {
  const { id } = req.params

  const project = await projectModel.get(id)
  if (!project) {
    return res.sendError(404, 'App not Found')
  }

  const locals: RouterLocals = { project }
  res.locals = locals

  next()
}, idRouter)

export default router
