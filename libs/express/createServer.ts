import express from 'express'
import './injectExpressMethods'
import ipRateLimiter from '../../middlewares/rateLimits/ipRateLimiter'
import expressGlobalMiddleWares from './expressGlobalMiddlewares'

function createServer() {
  const app = express()

  app.set('trust proxy', 1) // it changes proxy x-forwarded-for ip as client ip
  app.use(expressGlobalMiddleWares)
  app.use([
    ipRateLimiter,
  ])

  return app
}

export default createServer
