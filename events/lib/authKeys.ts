import keyManager from 'constant-manager'

const authKeys = keyManager({
  PING: '',

  USER_CREATED: '',
  USER_UPDATED: '',
  USER_DELETED: '',

  USER_EMAIL_VERIFICATION: '',

  APP_USER_CREATED: '',
  APP_USER_DELETED: '',
  APP_USER_AUTHORIZED: '',
  APP_USER_REQUEST: '',
}, {
  prefix: 'AUTH.',
})

export default authKeys
