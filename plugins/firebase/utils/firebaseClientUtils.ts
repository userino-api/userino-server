import admin from 'firebase-admin'
import LogicError from '@libs/LogicError'
import firebaseAppConfigModel from '../models/firebaseAppConfigModel'

export type FirebaseAppClient = ReturnType<typeof admin.initializeApp>

// todo how we can invalidate this app? when config is updated
const connectedApps: Record<string, FirebaseAppClient> = {}

export const getInitializedFirebaseApp = ({ app_id }: { app_id: string}): FirebaseAppClient => {
  if (connectedApps[app_id]) {
    const firebaseApp = connectedApps[app_id]
    return firebaseApp
  }
  const firebaseAppConfig = await firebaseAppConfigModel.get({ app_id })
  if (!firebaseAppConfig?.config) {
    throw new LogicError({ message: 'No configuration', httpStatus: 500 })
  }

  const serviceAccount = typeof firebaseAppConfig.config === 'string' ? JSON.parse(firebaseAppConfig.config) : firebaseAppConfig.config
  const firebaseApp = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  }, app_id)
  connectedApps[app_id] = firebaseApp

  return firebaseApp
}

export default {
  getInitializedFirebaseApp,
}
