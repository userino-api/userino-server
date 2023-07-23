import { RequestHandler } from 'express'
import { MediaApi } from '../lib/media-admin'
import mediaClientUtils from '../utils/mediaClientUtils'

export interface RouterLocals {
  mediaClient: MediaApi
}

const connectMediaAppMiddleware: RequestHandler = async (req, res, next) => {
  const { app_id } = req.session

  try {
    let mediaClient = await mediaClientUtils.getInitializedApp({ app_id })
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
