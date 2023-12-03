import { createServer, createIPRateLimitMiddleWare, createRequestLogger } from '@zvs001/express'
import bodyParser from 'body-parser'
import redisClient from '@libs/redis'
import getDeviceInfoFromRequest from '../../utils/getDeviceInfoFromRequest'

const isTest = process.env.NODE_ENV === 'test'

function createAppServer() {
  const app = createServer()

  app.use(bodyParser.json())

  if (!isTest) {
    app.use(createRequestLogger({
      getDeviceInfo(req, res) {
        const deviceInfo = getDeviceInfoFromRequest(req)
        return deviceInfo?.device_type || ''
      },
      getUserInfo(req, res) {
        if (req.session && req.session.user_id) {
          const { session } = req
          // we don't have name in session for now
          return `[user_id:${session.user_id}]`
        }
        return ''
      },
    }))
  }

  app.use([
    createIPRateLimitMiddleWare({
      serviceName: 'userino',
      redisClient,
    }),
  ])

  return app
}

export default createAppServer
