import { expect } from 'chai'
import agent from '../../../../../../../api/dashboard/tests/testServer'
import { TestApp } from '../../../../../../../test/helpers/methods/createApp'
import testUtil from '../../../../../../../test/helpers/testUtil'
import firebaseAppConfigModel from '../../../../../models/firebaseAppConfigModel'

describe('/dashboard:/project/:id/enable [POST]', () => {
  let app: TestApp

  before(async () => {
    app = await testUtil.createApp()
    await firebaseAppConfigModel.create({
      project_id: app.project.id,
      config: {
        type: 'service_account',
      },
    })
  })

  it('works', async () => {
    const { status, body } = await agent.post(`/firebase/project/${app.id}/enable`)
    expect(status).to.eq(200)
  })
})
