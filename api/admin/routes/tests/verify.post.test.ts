import { licenceClientCheckAuthStub } from '@octoguild-licence/client/test/stub'
import { expect } from 'chai'
import testUtil, { TestAdmin, TestApp } from '../../../../test/helpers/testUtil'
import agent from '../../tests/testServer'

describe('/admin:/verify [POST]', () => {
  let admin: TestAdmin
  let app: TestApp

  before(async () => {
    admin = await testUtil.createAdmin()

    app = await testUtil.createApp()

    licenceClientCheckAuthStub.callsFake(
      async (params, cb) => cb({ isAuthorized: true, data: { app_id: '', app_ref: app.id } }),
    )
  })

  it('it works', async () => {
    const { status, body } = await agent.post('/verify').set('authorization', admin.authorization)

    expect(status).to.equals(200)

    expect(body.app).to.deep.include({
      id: app.id,
      name: app.name,
    })
  })
})
