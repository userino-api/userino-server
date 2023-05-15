import { Kafka } from 'kafkajs'
import settings from '../../config/settings'

const kafka = new Kafka({
  clientId: 'userino-server',
  brokers: settings.kafka.brokers,
  ssl: settings.kafka.ssl,
  sasl: settings.kafka.sasl.username ? {
    mechanism: settings.kafka.sasl.mechanism as any,
    username: settings.kafka.sasl.username,
    password: settings.kafka.sasl.password as string,
  } : undefined,
})

export default kafka
