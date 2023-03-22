/**
 * this config file should be for production.
 * If there any need to specify something for development, put it into settings.development.ts
 */

import colors from 'colors'
import _ from 'lodash'
import dev from './settings.development'

const {
  NODE_ENV, PORT, ADMIN_PORT, DASHBOARD_PORT, PG, KAFKA_HOSTS,
  REDIS_HOST, LICENCE_SERVER, LICENCE_APP_ID, LICENCE_APP_KEY,
} = process.env || {}

const env = NODE_ENV || 'development'
const isProduction = env === 'production'
let envColored = isProduction ? colors.green(env) : colors.cyan(env)
console.log('CONFIG ENV: ', envColored)

export type Config = typeof config

let kafkaHosts: string[] = ['0.0.0.0:9093', '0.0.0.0:9094', '0.0.0.0:9095']
if (KAFKA_HOSTS) kafkaHosts = KAFKA_HOSTS.split(',')

const isLicenceEnabled = !!LICENCE_SERVER

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

  licence: isLicenceEnabled ? {
    app_id: LICENCE_APP_ID,
    key: LICENCE_APP_KEY,

    // server: LICENCE_SERVER || 'ws://localhost:10000',
    // privateKey: LICENCE_PRIVATE_KEY as string,
    // privateKeyPassphrase: LICENCE_PRIVATE_KEY_PASSPHRASE as string,
  } : null,
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
