import speakeasy from 'speakeasy'
import userSecretModel from '../models/userSecretModel'

// totp.options.algorithm = 'sha256'
// totp.options.encoding = 'base64'

async function getUserOTPUrl({ user_id }: { user_id: string}) {
  const userSecret = await userSecretModel.get({ user_id })
  let { secret } = userSecret || {}
  if (!secret) {
    const speakEasySecret = speakeasy.generateSecret({})
    secret = speakEasySecret.base32
    await userSecretModel.create({ user_id, secret })
  }

  // todo implement protecting from verified otp

  const url = speakeasy.otpauthURL({
    secret,
    encoding: 'base32',
    digits: 6,
    issuer: 'Octoex',
    period: 30,
    label: 'zvsx001@gmail.com',
    algorithm: 'sha256',
    type: 'totp',
  })

  return url
}

/**
 * @param token - is a code from authenticator
 */
async function verifyUser({ user_id, token }: { user_id: string; token: string }) {
  const userSecret = await userSecretModel.get({ user_id })
  if (!userSecret) return null
  const { secret } = userSecret

  const isVerified = speakeasy.totp.verify({
    secret,
    encoding: 'base64',
    algorithm: 'sha256',
    token,
  })

  return isVerified
}

export default {
  getUserOTPUrl,
  verifyUser,
}
