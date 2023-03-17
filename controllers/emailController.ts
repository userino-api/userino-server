import invariant from 'invariant'
import moment from 'moment/moment'
import accountLocalModel from '@models/accountLocalModel'
import appUserModel from '@models/appUserModel'
import emailActionModel from '@models/emailActionModel'
import userContactsModel from '@models/userContactsModel'
import coreEventList from '../events/coreEventList'

async function createVerification({
  user_id, account_id, app_id, email,
}: {
  user_id: string
  account_id: string
  app_id: string
  email: string
}) {
  const expiredAtMoment = moment().add(24, 'hours')
  const code = await emailActionModel.create({
    user_id,
    email,
    action: 'email/verify',
    expired_at: expiredAtMoment.toISOString(),
  })

  await coreEventList.emailVerification({
    user_id,
    account_id,
    app_id,
    email,
    code,
  })
}

async function verifyEmail({ code }: { code: string }) {
  const emailAction = await emailActionModel.get({ code })
  invariant(emailAction, 'emailAction is not found')

  const { user_id, email, action } = emailAction
  invariant(action === 'email/verify', 'invalid email action')

  const expireMoment = moment(emailAction.expired_at)
  if (expireMoment.isBefore(moment())) {
    throw new Error('Too Late for verification')
  }

  const appUser = await appUserModel.get(user_id)
  invariant(appUser, 'appUser must exists here')

  const changed = await accountLocalModel.verifyEmail({ email })
  await userContactsModel.setEmailVerified({ email, account_id: appUser.account_id, is_email_verified: true })

  emailActionModel.setDone({ code, is_done: true })

  return changed
}

export default {
  createVerification,
  verifyEmail,
}
