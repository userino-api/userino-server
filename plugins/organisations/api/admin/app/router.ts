import { Router } from 'express'
import { param } from 'express-validator'
import { checkValidation } from '@libs/middleWares'
import appsModel, { App } from '@models/appModel'
import idRouter from './@id/router'

const router = Router()

export interface RouteLocals {
  app: App
}

router.use('/:id',
  param('id').isUUID(),
  checkValidation,
  async (req, res, next) => {
    const { id } = req.params

    const app = await appsModel.get(id)
    if (!app) return res.sendError(404, 'App is not found')

    const locals: RouteLocals = { app }
    res.locals = locals

    next()
  },
  idRouter,
)

export default router
