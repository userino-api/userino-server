import LogicError from '@libs/LogicError'
import { MediaApi } from '../lib/media-admin'
import mediaAppConfigModel from '../models/mediaAppConfigModel'

// todo how we can invalidate this app? when config is updated
// todo implement config versioning and use version as key too
const connectedApps: Record<string, MediaApi> = {
}

export const getInitializedApp = async ({ app_id }: { app_id: string}): Promise<MediaApi> => {
  if (connectedApps[app_id]) {
    const mediaApp = connectedApps[app_id]
    return mediaApp
  }
  const mediaAppConfig = await mediaAppConfigModel.get({ app_id })
  if (!mediaAppConfig?.client_secret) {
    throw new LogicError({ message: 'No configuration', httpStatus: 500 })
  }

  const { client_id, client_secret } = mediaAppConfig
  const mediaApp = new MediaApi({})
  mediaApp.setCredentials({ client_id, client_secret })
  connectedApps[app_id] = mediaApp

  return mediaApp
}

export default {
  getInitializedApp,
}
