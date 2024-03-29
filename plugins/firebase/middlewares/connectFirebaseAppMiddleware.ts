import { RequestHandler } from 'express'
import firebaseClientUtils, { FirebaseAppClient } from '../utils/firebaseClientUtils'

export interface RouterLocals {
  firebaseApp: FirebaseAppClient
}

const connectFirebaseAppMiddleware: RequestHandler = async (req, res, next) => {
  const { project_id } = req.session

  try {
    let firebaseApp = await firebaseClientUtils.getInitializedFirebaseApp({ project_id })
    const locals: RouterLocals = {
      ...res.locals,
      firebaseApp,
    }
    res.locals = locals

    next()
  } catch (e) {
    res.sendError(e)
  }
}

export default connectFirebaseAppMiddleware
