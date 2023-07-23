import { expect } from 'chai'
import { v4 } from 'uuid'
import agent from '../../../../../../../api/dashboard/tests/testServer'
import { TestApp } from '../../../../../../../test/helpers/methods/createApp'
import testUtil from '../../../../../../../test/helpers/testUtil'
import firebaseAppConfigModel from '../../../../../models/mediaAppConfigModel'

describe('/dashboard:/app/:id/config [GET]', () => {
  let app: TestApp

  before(async () => {
    app = await testUtil.createApp()
    await firebaseAppConfigModel.create({ app_id: app.app_id, client_id: v4(), client_secret: 'yyy' })
  })

  it('works', async () => {
    const { status, body } = await agent.get(`/media/app/${app.id}/config`)
    expect(status).to.eq(200)

    expect(body).is.not.empty
  })
})
