import { Kafka } from 'kafkajs'
import settings from '../../config/settings'

const kafka = new Kafka({
  clientId: 'auth-server',
  brokers: settings.kafka.brokers,
})

export default kafka
