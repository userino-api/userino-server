import { RequestHandler } from 'express'
import invariant from 'invariant'
import appsModel from '@models/appsModel'

function createAppMiddleware(): RequestHandler {
  return async (req, res, next) => {
    const app = await appsModel.getPrimaryApp()
    invariant(app, 'no primary app found')

    req.session = {
      ...req.session,
      app_id: app.id,
      app,
    }

    next()
  }
}

export default {
  createAppMiddleware,
}
