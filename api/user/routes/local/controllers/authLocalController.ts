import accountController from '@controllers/accountController'
import emailController from '@controllers/emailController'
import accountLocalModel from '@models/accountLocalModel'

async function createAccount({ email, password }: {
  email: string
  password: string
}) {
  // todo check if we can link to existing account
  const { account_id } = await accountController.create({
    email,
    user: {},
  })

  const auth_id: string = await accountLocalModel.create({
    account_id,
    email,
    password,
  })

  return auth_id
}

async function sendEmailVerification({
  user_id, account_id, app_id, email,
}: { user_id: string; account_id: string; app_id: string; email: string }) {
  await emailController.createVerification({
    user_id, account_id, app_id, email,
  })
}

export default {
  createAccount,
  sendEmailVerification,
}
