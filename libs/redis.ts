import { createClient } from 'redis'
import serviceStartup from 'service-startup'
import config from '../config/settings'

// const client = redis.createClient({ url: 'http://52.14.235.115' })
export const redisClient = createClient({ url: config.redis.url })
export const redisConnectPromise = redisClient.connect() // express limit crashes before services started

const prefix = '[REDIS]'
// client.on('connect', () => console.log(`${prefix} is connected successfully`))
redisClient.on('error', error => console.error(`${prefix} error`, error))

serviceStartup.addStep({
  name: 'Redis',
  onRun: async () => redisConnectPromise
  // await redis.connect()
  ,
})

export default redisClient
