import { expect } from 'chai'
import agent from '../../../../../../../api/admin/tests/testServer'
import { TestApp } from '../../../../../../../test/helpers/methods/createApp'
import testUtil from '../../../../../../../test/helpers/testUtil'
import firebaseAppConfigModel from '../../../../../models/mediaAppConfigModel'

describe('/admin:/app/:id/config [GET]', () => {
  let app: TestApp

  before(async () => {
    app = await testUtil.createApp()
    await firebaseAppConfigModel.create({ app_id: app.app_id })
  })

  it('works', async () => {
    const { status, body } = await agent.get(`/media/app/${app.id}/config`)
    expect(status).to.eq(200)

    expect(body).is.not.empty
  })
})
