import kafka from './kafka'

export const consumer = kafka.consumer({
  groupId: 'test2',
  allowAutoTopicCreation: true,
})

const run = async () => {
  await consumer.connect()
  // Consuming
  // await consumer.connect()
  // await consumer.subscribe({ topic: 'test-topic', fromBeginning: true })
  //
  // await consumer.run({
  //   eachMessage: async ({ topic, partition, message }) => {
  //     console.log({
  //       partition,
  //       offset: message.offset,
  //       value: message.value.toString(),
  //     })
  //   },
  // })
}

run().catch(console.error)

export default consumer
