import accountController from '@controllers/accountController'
import organisationAdminModel from '../models/organisationAdminModel'

interface CreatePayload {
  project_id: string
  name?: string
  owner_app_user_id: string
}

const create = async (params:CreatePayload): Promise<{ account_id: string }> => {
  let {
    project_id, name, owner_app_user_id,
  } = params

  // create user account
  const accountInfo = await accountController.create({
    project_id,
    user: {
      type: 'organisation',
      name,
    },
  })

  await organisationAdminModel.create({
    organisation_id: accountInfo.account_id,
    app_user_id: owner_app_user_id,
  })

  return accountInfo
}

export default {
  create,
}
