import { expect } from 'chai'
import { v4 } from 'uuid'
import agent from '../../../../../../../api/dashboard/tests/testServer'
import { TestApp } from '../../../../../../../test/helpers/methods/createApp'
import testUtil from '../../../../../../../test/helpers/testUtil'
import mediaAppConfigModel from '../../../../../models/mediaAppConfigModel'

describe('/dashboard:/app/:id/enable [POST]', () => {
  let app: TestApp

  before(async () => {
    app = await testUtil.createApp()
    await mediaAppConfigModel.create({
      app_id: app.id,
      client_secret: 'secret',
      client_id: v4(),
    })
  })

  it('works', async () => {
    const { status, body } = await agent.post(`/firebase/app/${app.id}/enable`)
    expect(status).to.eq(200)
  })
})
