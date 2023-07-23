import keyManager from 'constant-manager'

const userErrorCodes = keyManager({
  usernameIsTaken: 'username-is-taken',
}, {
  prefix: 'user/',
})

export default userErrorCodes
