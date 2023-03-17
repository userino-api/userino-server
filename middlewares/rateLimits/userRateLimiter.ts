import RateLimit from 'express-rate-limit'
import RedisStore from 'rate-limit-redis'
import redisClient from '@libs/redis'

const timeWindowSeconds = 10 * 60 // 10 minutes
const ipRateLimitMax = timeWindowSeconds // / 2 // 1 req per 2 second

const userRateLimiter = RateLimit({
  store: new RedisStore({
    sendCommand: (...args: string[]) => redisClient.sendCommand(args),
  }),
  // max: 100, // limit each IP to 100 requests per windowMs
  windowMs: timeWindowSeconds * 1000,
  max: ipRateLimitMax,
  keyGenerator(req: any, res): string {
    const { user_id } = req.session
    return user_id as string
  },
  skip(req, res): boolean {
    // it will be counted by ipRateLimiter
    const { user_id } = req.session || {}
    return !user_id
  },
})

export default userRateLimiter
