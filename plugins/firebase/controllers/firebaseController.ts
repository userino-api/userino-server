import accountController, { ControllerAccountCreateParams } from '@controllers/accountController'

interface CreatePayload extends Omit<ControllerAccountCreateParams, 'name' | 'role' | 'user'> {
  project_id: string
  name?: string
  first_name: string
  last_name: string
  avatar_url: string | null
}

const create = async (userData: CreatePayload): Promise<{ account_id: string }> => {
  let {
    name, first_name, last_name, avatar_url, email, phone_number, is_email_verified, project_id,
  } = userData

  // create user account
  const accountInfo = await accountController.create({
    project_id,
    email,
    is_email_verified,
    phone_number,
    user: {
      name,
      avatar_url,
      first_name,
      last_name,
    },
  })

  return accountInfo
}

export default {
  create,
}
