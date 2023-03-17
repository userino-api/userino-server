import serviceStartup from 'service-startup'
import { consumer } from '../libs/kafka/consumer'

async function start() {
  await consumer.connect()
  await consumer.subscribe({ topic: 'test-topic', fromBeginning: true })
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log('received consumer message:')
      console.log({
        partition,
        offset: message.offset,
        value: message.value.toString(),
      })
    },
  })
}

serviceStartup.start().then(() => {
  start()
})
