import { checkValidator } from '@zvs001/express'
import express from 'express'
import { param } from 'express-validator'
import appModel, { App } from '@models/appModel'
import idRouter from './@id/router'

const router = express.Router()

// router.use([
// ])

export interface RouterLocals {
  app: App
}

router.use<{ id: string }>('/:id', param('id').isUUID(), checkValidator, async (req, res, next) => {
  const { id } = req.params

  const app = await appModel.get(id)
  if (!app) {
    return res.sendError(404, 'App not Found')
  }

  // todo here we need to check permissions

  const locals: RouterLocals = { app }
  res.locals = locals

  next()
}, idRouter)

export default router
