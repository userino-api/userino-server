import { createServer, createIPRateLimitMiddleWare } from '@zvs001/express'
import bodyParser from 'body-parser'
import redisClient from '@libs/redis'
import requestLoggerMiddleware from '../expressRequestLogger'

const isTest = process.env.NODE_ENV === 'test'

function createAppServer() {
  const app = createServer()

  app.use(bodyParser.json())

  if (!isTest) app.use(requestLoggerMiddleware())

  app.use([
    createIPRateLimitMiddleWare({
      serviceName: 'userino',
      redisClient,
    }),
  ])

  return app
}

export default createAppServer
