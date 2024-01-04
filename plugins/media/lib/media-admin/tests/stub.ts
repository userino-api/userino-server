import { faker } from '@faker-js/faker'
import sinon from 'sinon'
import AssetsApi from '../api/assets'
import ClientApi from '../api/client'

sinon.stub(ClientApi.prototype, 'createClientToken').returns(Promise.resolve({ token: 'test-token' }))
sinon.stub(AssetsApi.prototype, 'getAsset').returns(Promise.resolve({ id: 'test-id', original: { url: faker.image.avatar() } }))
