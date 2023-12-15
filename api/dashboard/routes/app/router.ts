import express from 'express'
import { param } from 'express-validator'
import { checkValidation } from '@libs/middleWares'
import appsModel, { App } from '@models/appsModel'
import idRouter from './@id/router'
import listGet from './list.get'

const router = express.Router()

export interface RouterLocals {
  app: App
}

router.use([
  listGet,
])

router.use<{ id: string }>('/:id', param('id').isUUID(), checkValidation, async (req, res, next) => {
  const { id } = req.params

  const app = await appsModel.get(id)
  if (!app) {
    return res.sendError(404, 'App not Found')
  }

  const locals: RouterLocals = { app }
  res.locals = locals

  next()
}, idRouter)

export default router
