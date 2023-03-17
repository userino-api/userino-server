import RateLimit, { Options } from 'express-rate-limit'
import RedisStore from 'rate-limit-redis'
import redisClient from '@libs/redis'
import errorCodes from '../../const/errorCodes'

function createCustomIpRateLimiter({
  key, max, timeWindowSeconds, skipFailedRequests, handler,
  errorCode = errorCodes.too_many_requests,
}: {
  key: string
  max: number
  timeWindowSeconds: number
  errorCode?: typeof errorCodes.cool_down | typeof errorCodes.too_many_requests
} & Partial<Pick<Options, 'handler' | 'skipFailedRequests'>>) {
  const handlerDefault: Options['handler'] = function handlerDefaultFn(req, res, next) {
    return res.sendError(429, 'Limit exceeded', errorCode)
  }

  const customRateLimiter = RateLimit({
    store: new RedisStore({
      prefix: `ipRT@${key}@`,
      sendCommand: (...args: string[]) => redisClient.sendCommand(args),
    }),
    // max: 100, // limit each IP to 100 requests per windowMs
    windowMs: timeWindowSeconds * 1000,
    max,
    skipFailedRequests,
    handler: handler || handlerDefault,
  })

  return customRateLimiter
}

export default createCustomIpRateLimiter
