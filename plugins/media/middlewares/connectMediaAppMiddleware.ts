import { RequestHandler } from 'express'
import { MediaApi } from '../lib/media-admin'
import mediaClientUtils from '../utils/mediaClientUtils'

export interface RouterLocals {
  mediaClient: MediaApi
}

const connectMediaAppMiddleware: RequestHandler = async (req, res, next) => {
  const project_id = res.locals?.project_id || req.session?.project_id // local is for admin api

  try {
    let mediaClient = await mediaClientUtils.getInitializedApp({ project_id })
    const locals: RouterLocals = {
      ...res.locals,
      mediaClient,
    }
    res.locals = locals

    next()
  } catch (e) {
    res.sendError(e)
  }
}

export default connectMediaAppMiddleware
