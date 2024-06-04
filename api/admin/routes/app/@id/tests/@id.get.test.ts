import { expect } from 'chai'
import testUtil, { TestAdmin, TestApp, TestUser } from '../../../../../../test/helpers/testUtil'
import agent from '../../../../tests/testServer'

describe('/admin:/app/:id [GET]', () => {
  let app: TestApp
  let admin: TestAdmin

  before(async () => {
    admin = await testUtil.createAdmin()
    app = await testUtil.createApp()
  })

  it('it works', async () => {
    const { status, body } = await agent.get(`/app/${app.id}`).set('authorization', admin.authorization)

    expect(status).to.equals(200)
    expect(body).to.deep.include({
      id: app.id,
    })
  })
})
