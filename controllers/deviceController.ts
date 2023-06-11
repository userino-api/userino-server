import deviceBrowserModel, { UserBrowser } from '@models/devices/deviceBrowserModel'
import deviceMobileModel, { UserMobile } from '@models/devices/deviceMobileModel'

async function syncMobile({ user_id, device }: Pick<UserMobile, 'user_id'> & {
  device: Pick<UserMobile, 'id' | 'device_key' | 'device_name' | 'system_name' | 'system_version' | 'model' | 'manufacturer' >
}) {
  const {
    id, model, system_name, device_name, device_key, system_version, manufacturer,
  } = device || {}
  if (!id) {
    console.error('browser data is invalid for sync')
    return null
  }

  const deviceExists = await deviceMobileModel.get({
    user_id, id,
  })
  if (deviceExists) {
    // todo do we need to update?
  } else {
    await deviceMobileModel.create({
      user_id,
      id,
      manufacturer,
      model,
      system_name,
      device_name,
      device_key,
      system_version,
      data: device,
    })
  }
}

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
  syncMobile,
}
