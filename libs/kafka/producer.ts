import serviceStartup from 'service-startup'
import kafka from './kafka'

export const producer = kafka.producer({ allowAutoTopicCreation: true })

const run = async () => {
  // Producing
  await producer.connect()
  // const data = await producer.send({
  //   topic: 'test-topic',
  //   messages: [
  //     { value: 'Hello KafkaJS user!' },
  //   ],
  // })
  //
  // console.log('data', data)
}

run().catch(console.error)

serviceStartup.addStep({
  name: 'Kafka Producer',
  onRun: async () => producer.connect(),
})

export default producer
