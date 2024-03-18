import { setupConsumer } from '@zvs001/kafka-helpers'
import serviceStartup from 'service-startup'
import kafka from '@libs/kafka/kafka'
import authKeys from '../events/lib/authKeys'
import packageJson from '../package.json'
import userDeleted from './user/userDeleted'

export const consumer = kafka.consumer({
  groupId: `${packageJson.name}.user_consumer`,
  allowAutoTopicCreation: true,
})

async function start() {
  await consumer.connect()
  await consumer.subscribe({ topic: authKeys.APP_USER_DELETED, fromBeginning: true })

  await setupConsumer<{ id: string } >(consumer, {
    eachMessage: async ({ partition, data, topic }) => {
      console.log({ topic, data })

      switch (topic) {
        case authKeys.APP_USER_DELETED:
          return userDeleted(data)

        default:
          throw new Error(`topic is not handled: ${topic}`)
      }
    },
  })
}

serviceStartup.start().then(() => {
  start()
})
