import { expect } from 'chai'
import { v4 } from 'uuid'
import appsModel from '@models/appsModel'
import agent from '../../../../../api/user/tests/testServer'
import mediaAppConfigModel from '../../../models/mediaAppConfigModel'
import testUtil, { TestUser } from '../../../tests/testUtils'

describe('/media/create-upload-token [POST]', () => {
  let user: TestUser

  before(async () => {
    const defaultApp = await appsModel.getPrimaryApp()
    user = await testUtil.createUser()
    await mediaAppConfigModel.create({
      project_id: defaultApp.project_id,
      client_id: v4(),
      client_secret: v4(),
    })
  })

  it('token was set', async () => {
    const { status, body } = await agent.post('/media/create-upload-token').set('authorization', user.token)
    expect(status).to.equals(200)
    expect(body).to.have.property('token')
  })
})
