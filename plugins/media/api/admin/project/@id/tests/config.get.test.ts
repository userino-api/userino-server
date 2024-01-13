import { expect } from 'chai'
import { v4 } from 'uuid'
import agent from '../../../../../../../api/admin/tests/testServer'
import { TestApp } from '../../../../../../../test/helpers/methods/createApp'
import testUtil from '../../../../../../../test/helpers/testUtil'
import mediaAppConfigModel from '../../../../../models/mediaAppConfigModel'

describe('/admin:/project/:id/config [GET]', () => {
  let app: TestApp

  before(async () => {
    app = await testUtil.createApp()
    await mediaAppConfigModel.create({ project_id: app.project.id, client_id: v4(), client_secret: '' })
  })

  it('works', async () => {
    const { status, body } = await agent.get(`/media/project/${app.project.id}/config`)
    expect(status).to.eq(200)

    expect(body).is.not.empty
  })
})
