import accountModel from '@models/accountModel'
import userContactsModel from '@models/userContactsModel'
import userController, { UserCreatePayload } from './userController'

export interface ControllerAccountCreateParams {
  project_id: string
  email?: string | null
  is_email_verified?: boolean
  phone_number?: string | null
  user: Omit<UserCreatePayload, 'account_id'>
}

async function create(
  params: ControllerAccountCreateParams,
): Promise<{ account_id: string }> {
  let {
    email, phone_number, user, is_email_verified, project_id,
  } = params

  let account_id: string | null = null

  if (email) {
    const accountExists = await accountModel.getByEmail({ email, project_id })
    if (accountExists) {
      account_id = accountExists.id
    }
  }

  if (!account_id) {
    account_id = await accountModel.create({
      project_id,
      email,
      phone_number,
    })

    await userController.create({
      account_id,
      ...user,
    })

    await userContactsModel.create({
      account_id,
      email,
      is_email_verified,
    })
  } else {
    // todo refresh user params
  }

  return {
    account_id,
  }
}

export default {
  create,
}
