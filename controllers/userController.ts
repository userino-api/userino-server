import _ from 'lodash'
import userModel, { User } from '@models/userModel'
import coreEventList from '../events/coreEventList'

export interface UserCreatePayload {
  account_id: string
  name?: string
  first_name?: string
  last_name?: string
  avatar_url?: string | null
  type?: User['type']
}

const create = async (userData: UserCreatePayload) => {
  let {
    account_id, name, first_name, last_name, avatar_url, type,
  } = userData

  name = name || _.compact([first_name, last_name]).join(' ')
  name = name.trim()
  if (!name) name = 'No Name'

  // create user account
  await userModel.create({
    id: account_id,
    name,
    first_name,
    last_name,
    avatar_url,
    type,
  })

  // user created emit?
  await coreEventList.userCreated({ id: account_id })
}

async function setUserName({ account_id, username, id }: { account_id: string; username: string; id: string }) {
  const changed = await userModel.setUserName({ id: account_id, username })
  await coreEventList.userUpdated({ app_user_id: id, account_id })
  return changed
}

async function setName({ account_id, name, id }: { account_id: string; name: string; id: string }) {
  const changed = await userModel.setName({ id: account_id, name })
  await coreEventList.userUpdated({ app_user_id: id, account_id })
  return changed
}

async function setAvatar({
  id, account_id, asset_id, avatar_url,
}: { id: string; account_id: string; asset_id: string; avatar_url: string}) {
  const changed = await userModel.setAsset({ id: account_id, asset_id })
  if (avatar_url) {
    await userModel.setAvatarUrl({ id: account_id, avatar_url })
  }

  // always must be the last one
  await coreEventList.userUpdated({ app_user_id: id, account_id })

  return changed
}

export default {
  create,
  setUserName,
  setName,
  setAvatar,
}
