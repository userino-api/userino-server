import logger from '@zvs001/express/src/lib/logger'
import pg from 'pg'
import pgErrorLogger from 'pg-error-logger'
import config from '../config/settings'

const { pgConnectionString } = config

interface ClientExtended extends pg.Client {
  beginTransaction: () => Promise<pg.QueryResult>
  commit: () => Promise<pg.QueryResult>
  rollback: () => Promise<pg.QueryResult>
  transaction: (cb) => Promise<any>
  isUnitTestTransaction: boolean
}

const client = new pg.Client({
  connectionString: pgConnectionString,
  statement_timeout: 100000,
}) as ClientExtended

// client.connect((err) => {
//   if (err) {
//     logger.error('postgres connection failed', err)
//   } else {
//     logger.log('postgres connected successfully')
//   }
// })

// looks like it is calling on every sql
// client.on('drain', () => logger.error('DB event: drain!'))

client.on('error', err => {
  logger.error('database error: ', err)
})

client.on('notice', msg => console.warn('DB event: notice!', msg))

client.on('end', () => {
  // logger.error('DB event: end')
  process.exit(0) // 0 - because we call client.end() in migration, etc. kubernetes container will be restarted anyway.
})

client.beginTransaction = () => client.query('BEGIN TRANSACTION')
client.rollback = () => client.query('ROLLBACK')
client.commit = () => client.query('COMMIT')
client.isUnitTestTransaction = false

pgErrorLogger.patchQuery(client)

export default client
module.exports = client
