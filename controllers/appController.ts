import invariant from 'invariant'
import appUserModel, { AppUser } from '@models/appUserModel'
import appsModel from '@models/appsModel'
import tokenModel from '@models/tokensModel'
import coreEventList from '../events/coreEventList'

async function createConnection({ app_id, account_id }: { account_id: string; app_id: string }) {
  const id = await appUserModel.create({ account_id, app_id })

  // todo user connected to app event?
  coreEventList.appUserCreated({ id, app_id, account_id })

  return id
}

const authorize = async ({ user_id }: { user_id: string }): Promise<{ token: string }> => {
  invariant(user_id, 'authorize: user_id is not valid')

  const token = await tokenModel.createToken({ user_id })

  const tokenObj = {
    token,
  }

  coreEventList.userAuthorized({ user_id })

  return tokenObj
}

async function authorizeAccount({ app_id, account_id }: { account_id: string; app_id: string }): Promise<{ token: string }> {
  let user = await appUserModel.getByAccountId({ account_id, app_id })
  let user_id: string | undefined = user?.id
  if (!user) {
    user_id = await createConnection({ app_id, account_id })
  }

  const tokens = await authorize({ user_id: user_id as string })

  return tokens
}

async function deleteConnection({ id, account_id, app_id }: Pick<AppUser, 'id' | 'account_id' | 'app_id'>) {
  await appUserModel.delete(id)

  coreEventList.appUserDeleted({ id, account_id, app_id })
}

async function deleteApp({ app_id }: { app_id: string }) {
  await appsModel.delete(app_id)
  // todo send event
}

export default {
  authorizeAccount,
  deleteConnection,
  deleteApp,
}
