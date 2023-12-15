import { RequestHandler } from 'express'
import appsModel, { App } from '@models/appsModel'
import config from '../../../config/settings'

function createAppMiddleware(): RequestHandler {
  return async (req, res, next) => {
    const app_id = req.headers['app'] as string
    let app: App | null = null
    if (app_id) {
      app = await appsModel.get(app_id)
    }

    if (!app && config.app.isPrimaryEnabled) {
      app = await appsModel.getPrimaryApp()
    }

    if (!app) {
      return res.sendError(403, 'No app found')
    }

    req.session = {
      ...req.session,
      app_id: app.id,
      project_id: app.project_id,
      app,
    }

    next()
  }
}

export default {
  createAppMiddleware,
}
