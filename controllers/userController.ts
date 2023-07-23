import _ from 'lodash'
import usersModel from '@models/usersModel'
import coreEventList from '../events/coreEventList'

export interface UserCreatePayload {
  account_id: string
  name?: string
  first_name?: string
  last_name?: string
  avatar_url?: string | null
}

const create = async (userData: UserCreatePayload) => {
  let {
    account_id, name, first_name, last_name, avatar_url,
  } = userData

  name = name || _.compact([first_name, last_name]).join(' ')
  name = name.trim()
  if (!name) name = 'No Name'

  // create user account
  await usersModel.create({
    id: account_id,
    name,
    first_name,
    last_name,
    avatar_url,
  })

  // user created emit?
  await coreEventList.userCreated({ id: account_id })
}

async function setUserName({ account_id, username }: { account_id: string; username: string }) {
  const changed = await usersModel.setUserName({ id: account_id, username })
  await coreEventList.userUpdated({ id: account_id })
  return changed
}

export default {
  create,
  setUserName,
}
