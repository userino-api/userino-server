// eslint-disable-next-line import/no-extraneous-dependencies
import serviceStartup from 'service-startup'
import client from '../libs/pg'
import testConfig from './testConfig'

before(async () => {
  await serviceStartup.start()

  if (!testConfig.isTransactionDisabled) {
    client.isUnitTestTransaction = true
    await client.beginTransaction()
  }
})

after(async () => {
  if (!testConfig.isTransactionDisabled) {
    client.isUnitTestTransaction = false
    await client.rollback()
  }
})
