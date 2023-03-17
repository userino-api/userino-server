import { RequestHandler } from 'express'
import admin from 'firebase-admin'
import firebaseAppConfigModel from '../models/firebaseAppConfigModel'

export interface RouterLocals {
  firebaseApp: ReturnType<typeof admin.initializeApp>
}

const connectedApps: Record<string, RouterLocals['firebaseApp']> = {}

const connectFirebaseAppMiddleware: RequestHandler = async (req, res, next) => {
  const { app_id } = req.session

  let firebaseApp: RouterLocals['firebaseApp']
  if (connectedApps[app_id]) {
    firebaseApp = connectedApps[app_id]
  } else {
    const firebaseAppConfig = await firebaseAppConfigModel.get({ app_id })
    if (!firebaseAppConfig?.config) {
      return res.sendError(500, 'No configuration')
    }

    const serviceAccount = typeof firebaseAppConfig.config === 'string' ? JSON.parse(firebaseAppConfig.config) : firebaseAppConfig.config
    firebaseApp = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    }, app_id)
  }

  const locals: RouterLocals = {
    ...res.locals,
    firebaseApp,
  }
  res.locals = locals

  next()
}

export default connectFirebaseAppMiddleware
