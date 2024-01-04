import admin from 'firebase-admin'
import LogicError from '@libs/LogicError'
import firebaseAppConfigModel from '../models/firebaseAppConfigModel'

export type FirebaseAppClient = ReturnType<typeof admin.initializeApp>

// todo how we can invalidate this app? when config is updated
// todo implement config versioning and use version as key too
const connectedApps: Record<string, FirebaseAppClient> = {}

export const getInitializedFirebaseApp = async ({ project_id }: { project_id: string}): Promise<FirebaseAppClient> => {
  if (connectedApps[project_id]) {
    const firebaseApp = connectedApps[project_id]
    return firebaseApp
  }
  const firebaseAppConfig = await firebaseAppConfigModel.get({ project_id })
  if (!firebaseAppConfig?.config) {
    throw new LogicError({ message: 'No configuration for firebase', httpStatus: 412 })
  }

  const serviceAccount = typeof firebaseAppConfig.config === 'string' ? JSON.parse(firebaseAppConfig.config) : firebaseAppConfig.config
  const firebaseApp = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  }, project_id)
  connectedApps[project_id] = firebaseApp

  return firebaseApp
}

export default {
  getInitializedFirebaseApp,
}
