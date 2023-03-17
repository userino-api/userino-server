/**
 * this config file should be for production.
 * If there any need to specify something for development, put it into settings.development.ts
 */

import colors from 'colors'
import _ from 'lodash'
import dev from './settings.development'

const {
  NODE_ENV, PORT, ADMIN_PORT, DASHBOARD_PORT, PG, KAFKA_HOSTS,
  REDIS_HOST,
} = process.env || {}

const env = NODE_ENV || 'development'
const isProduction = env === 'production'
let envColored = isProduction ? colors.green(env) : colors.cyan(env)
console.log('CONFIG ENV: ', envColored)

export type Config = typeof config

let kafkaHosts: string[] = ['0.0.0.0:9093', '0.0.0.0:9094', '0.0.0.0:9095']
if (KAFKA_HOSTS) kafkaHosts = KAFKA_HOSTS.split(',')

let config = {
  env,
  ports: {
    user: PORT || 7301,
    dashboard: DASHBOARD_PORT || 7302,
    admin: ADMIN_PORT || 7303,
  },

  pgConnectionString: PG || '',

  password: {
    bcryptSaltRounds: 12,
  },

  kafka: {
    brokers: kafkaHosts,
  },

  client: {
    ignoreTransactions: false, // should be always falsy
  },

  redis: {
    url: REDIS_HOST || 'redis://localhost:6379',
  },

  sms: {
    max_tries_per_long_period: 9, // 5 hours currently
    max_tries_in_a_row: 5, // within +/- 5 minutes
  },

  licence: {
    // app_id: 'f464eb49-5f79-4a23-aa0d-91849e9c46a5',
    // key: 'aa6ba5fe-0c31-447a-9301-24233b4477b4',

    app_id: '2e962f38-5634-4af3-9ea3-1ff56b674af6',
    key: '4610a706-4b68-4197-bc55-67b98861e25f',

    // server: LICENCE_SERVER || 'ws://localhost:10000',
    // privateKey: LICENCE_PRIVATE_KEY as string,
    // privateKeyPassphrase: LICENCE_PRIVATE_KEY_PASSPHRASE as string,
  },
}

if (!isProduction) {
  config = _.merge(config, dev)
}

try {
  const local = require('./settings.local')
  console.log(colors.red('local config used'))
  console.log(colors.cyan(local))
  config = _.merge(config, local)
} catch (e) {

}

export default config
