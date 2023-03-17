import keyManager from 'constant-manager'

const errorCodes = keyManager({
  cool_down: 'cool-down', // when we send too many request at short period of time (seconds)
  too_many_requests: 'too-many-requests', // when we send too many requests for longer period of time (hours).
}, {
  prefix: 'error/',
})

export default errorCodes
