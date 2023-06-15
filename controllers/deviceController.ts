import invariant from 'invariant'
import _ from 'lodash'
import deviceBrowserModel, { UserBrowser } from '@models/devices/deviceBrowserModel'
import deviceMobileModel, { Mobile } from '@models/devices/deviceMobileModel'
import deviceUserMobileModel from '@models/devices/deviceUserMobileModel'

const deviceFields: Omit<Record<keyof Mobile, boolean>, keyof ObjectTimestamps> = {
  id: true,
  model: true,
  system_name: true,
  device_name: true,
  device_key: true,
  system_version: true,
  manufacturer: true,
  time_zone: true,
  languages: true,
  language: true,
  country: true,
  language_tag: true,
  brand: true,
}
const deviceKeys = Object.keys(deviceFields)

export type UserMobileSyncObject = Pick<Mobile, 'id' | 'device_key' | 'device_name' | 'system_name' | 'system_version' | 'model'
  | 'manufacturer' | 'language' | 'language_tag' | 'country' | 'time_zone' | 'languages' | 'brand'>
async function syncMobile({ user_id, device }: { user_id: string } & {
  device: UserMobileSyncObject
}) {
  const { id } = device || {}
  if (!id) {
    console.error('device data is invalid for sync')
    return null
  }

  // prevent saving unused field
  device = _.pick(device, deviceKeys) as UserMobileSyncObject

  const deviceExists = await deviceMobileModel.get({ id })
  if (deviceExists) {
    // todo check if equal before update
    await deviceMobileModel.update({ ...deviceExists, ...device })
  } else {
    await deviceMobileModel.create(device)
  }

  const userMobile = await deviceUserMobileModel.get({ mobile_id: id, user_id })
  if (!userMobile) {
    // link to user
    await deviceUserMobileModel.create({ user_id, mobile_id: id })
  }
}

async function syncBrowser(
  { user_id, device }: Pick<UserBrowser, 'user_id'> & { device: Pick<UserBrowser, 'id' | 'time_zone' | 'language' | 'languages'> },
) {
  const { id } = device || {}
  if (!id) {
    console.error('browser data is invalid for sync')
    return null
  }

  const deviceExists = await deviceBrowserModel.getUserDevice({
    user_id, id,
  })
  if (deviceExists) {
    await deviceBrowserModel.update({
      ...deviceExists, ...device,
    })
  } else {
    await deviceBrowserModel.create({
      user_id,
      ...device,
    })
  }
}

export default {
  syncBrowser,
  syncMobile,
}
