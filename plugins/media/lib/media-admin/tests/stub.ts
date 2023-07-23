import sinon from 'sinon'
import ClientApi from '../api/client'

sinon.stub(ClientApi.prototype, 'createClientToken').returns(Promise.resolve({ token: 'test-token' }))
