import { expect } from 'chai'
import agent from '../../../../../../../api/admin/tests/testServer'
import { TestApp } from '../../../../../../../test/helpers/methods/createApp'
import testUtil from '../../../../../../../test/helpers/testUtil'
import firebaseAppConfigModel from '../../../../../models/firebaseAppConfigModel'

describe('/admin:/project/:id/config [GET]', () => {
  let app: TestApp

  before(async () => {
    app = await testUtil.createApp()
    await firebaseAppConfigModel.create({ project_id: app.project.id, config: {} })
  })

  it('works', async () => {
    const { status, body } = await agent.get(`/firebase/project/${app.project.id}/config`)
    expect(status).to.eq(200)

    expect(body).is.not.empty
  })
})
