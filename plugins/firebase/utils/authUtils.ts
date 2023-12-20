import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier'

function decodeFirebaseToken(decodedToken: DecodedIdToken) {
  let {
    name = '',
    picture,
    email,
    uid,
    firebase: details,
  } = decodedToken

  name = name.trim()
  if (!name) name = 'User Name'

  const { sign_in_provider } = details

  // step 2.1 => create if not exists
  const splitName = name ? name.split(' ') : []
  const first_name = splitName[0] || ''
  const last_name = splitName[1] || ''
  let avatar_url = picture || null
  if (avatar_url && sign_in_provider === 'facebook.com') avatar_url += '?type=large'

  // google is the only reliable provider here
  const is_email_verified = sign_in_provider === 'google.com'

  return {
    name,
    first_name,
    last_name,
    avatar_url,
    firebase_id: uid,
    email,
    is_email_verified,
  }
}

export default {
  decodeFirebaseToken,
}
