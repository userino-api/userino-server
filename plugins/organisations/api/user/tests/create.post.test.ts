import { expect } from 'chai'
import appsModel from '@models/appModel'
import agent from '../../../../../api/user/tests/testServer'
import testUtil, { TestUser } from '../../../tests/testUtils'

describe('/organisations/create [POST]', () => {
  let user: TestUser

  before(async () => {
    const defaultApp = await appsModel.getPrimaryApp()
    user = await testUtil.createUser()
  })

  it('token was set', async () => {
    const { status, body } = await agent.post('/organisations/create').set('authorization', user.token).send({ name: 'New Org' })
    expect(status).to.equals(200)
    expect(body).to.have.property('token')
  })
})
