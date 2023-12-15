import { checkValidator } from '@zvs001/express'
import { Router } from 'express'
import { param } from 'express-validator'
import projectModel, { Project } from '@models/projectModel'
import idRouter from './@id/router'

const router = Router()

export interface RouteLocals {
  project: Project
}

router.use('/:id',
  param('id').isUUID(),
  checkValidator,
  async (req, res, next) => {
    const { id } = req.params

    const project = await projectModel.get(id)
    if (!project) return res.sendError(404, 'App is not found')

    const locals: RouteLocals = { project }
    res.locals = locals

    next()
  },
  idRouter,
)

export default router
