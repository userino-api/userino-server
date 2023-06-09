import deviceBrowserModel, { UserBrowser } from '@models/devices/deviceBrowserModel'

async function syncBrowser({ user_id, device }: Pick<UserBrowser, 'user_id'> & { device: Pick<UserBrowser, 'id' | 'time_zone' | 'language' | 'languages'> }) {
  const {
    id, language, languages, time_zone,
  } = device || {}
  if (!id) {
    console.error('browser data is invalid for sync')
    return null
  }

  const deviceExists = await deviceBrowserModel.get({
    user_id, id,
  })
  if (deviceExists) {
    // todo do we need to update?
  } else {
    await deviceBrowserModel.create({
      user_id,
      id,
      language,
      time_zone,
      languages,
    })
  }
}

export default {
  syncBrowser,
}
