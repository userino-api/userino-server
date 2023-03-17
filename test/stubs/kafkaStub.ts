import sinon from 'sinon'
import kafka from '../../libs/kafka/kafka'

const mockKafka = {
  connect: () => Promise.resolve(),
  send: () => Promise.resolve(),
}

const producerStub = sinon.stub(kafka, 'producer').returns(mockKafka as any)

export default producerStub
