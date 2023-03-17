import { producer } from '@libs/kafka/producer'

async function eventController(params: {
    event: string
    data: Record<string, any>
  }) {
  const { event, data } = params
  console.log('[EMIT EVENT]', event, data)
  const value = JSON.stringify(data)
  await producer.send({
    topic: event,
    messages: [
      { value },
    ],
  })
}

export default {
  sendEvent: eventController,
}
