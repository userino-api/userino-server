import RateLimit from 'express-rate-limit'
import RedisStore from 'rate-limit-redis'
import redisClient from '@libs/redis'

export function generateKey({ user_id, route }: { user_id: string; route: string }): string {
  return `rl:${user_id}.route.${route}`
}

function createRouteRateLimiter({
  route, max, timeWindowSeconds, skipFailedRequests,
}: {
  route: string
  max: number
  timeWindowSeconds: number
  skipFailedRequests?: boolean
}) {
  const customRateLimiter = RateLimit({
    store: new RedisStore({
      prefix: '',
      sendCommand: (...args: string[]) => redisClient.sendCommand(args),
    }),
    // max: 100, // limit each IP to 100 requests per windowMs
    windowMs: timeWindowSeconds * 1000,
    max,
    skipFailedRequests,
    keyGenerator(req: any, res): string {
      const { user_id } = req.session
      return generateKey({ user_id, route })
    },
    skip(req, res): boolean {
      // it will be counted by ipRateLimiter
      const { user_id } = req.session || {}

      return !user_id
    },
  })

  return customRateLimiter
}

export default createRouteRateLimiter
