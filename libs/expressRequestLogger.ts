import colors from 'colors'
import _ from 'lodash'
import morgan from 'morgan'
import getDeviceInfoFromRequest from '../utils/getDeviceInfoFromRequest'
import logger from './logger'

const isTest = process.env.NODE_ENV === 'test'

// !isTest &&
const middleWare = options => morgan((tokens, req, res) => {
  const { id } = req
  const method = tokens.method(req, res)
  const _url = tokens.url(req, res)

  const deviceInfo = getDeviceInfoFromRequest(req)

  if (_url === '/' || _url.indexOf('/images') === 0) return null

  let body = ''

  if (method === 'POST') {
    const _body = {}
    _.keys(req.body).forEach(key => {
      let value = req.body[key]
      if (_.isString(value)) {
        if (key === 'password') value = value.replace(/./g, '*')

        // if (value.length > 100) value = `${value.substring(0, 90)} ...`
      }

      _body[key] = value
    })

    body = JSON.stringify(_body)
    if (body.length > 10000) body = `${body.substring(0, 990)} ... l:${body.length}`
  }

  let _status: number | string = parseInt(tokens.status(req, res))

  if (_status >= 200 && _status < 300) {
    _status = colors.green(_status.toString())
  }

  if (_status >= 400 && _status) {
    _status = colors.red(_status.toString())
  }

  let _length = tokens.res(req, res, 'content-length')

  if (_length) {
    _length += ':bytes'
  }

  let _user = ''

  if (req.session && req.session.user_id) {
    const { session } = req
    _user = `[id:${session.user_id}|r:${session.role}|u:${session.username}]`
  }

  const app = [req.headers['app-version']]
  let _app = _.compact(app).join(':')
  if (_app) _app = `[app:${_app}]`

  const message = [
    colors.cyan('[API]'),
    id,
    method.length === 3 ? `${method} ` : method,
    _url,
    colors.cyan(_app),
    colors.cyan(_user),
    colors.cyan(deviceInfo.device_type || ''),
    body,
    _status,
    _length,
    `${tokens['response-time'](req, res)}ms`,
  ]

  const messageStr = _.compact(message).join(' ')

  if (!_status && !_length) {
    logger.error(messageStr)
  } else {
    logger.log('', messageStr) // to keep same as error
  }
})

export default middleWare
