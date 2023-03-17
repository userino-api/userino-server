import RateLimit from 'express-rate-limit'
import RedisStore from 'rate-limit-redis'
import redisClient from '@libs/redis'

const timeWindowSeconds = 60 * 60 // hour
const ipRateLimitMax = timeWindowSeconds // / 2 // 1 req per 2 second

const ipRateLimiter = RateLimit({
  store: new RedisStore({
    prefix: 'ipRL@',
    sendCommand: (...args: string[]) => redisClient.sendCommand(args),
  }),
  // max: 100, // limit each IP to 100 requests per windowMs
  windowMs: timeWindowSeconds * 1000,
  max: ipRateLimitMax,

  // skip(req, res): boolean { user must authorize to make it work
  //   // it will be counted by userRateLimiter
  //   const { user_id } = req.session || {}
  //   return !!user_id
  // },
})

export default ipRateLimiter
