import { expect } from 'chai'
import testUtil, { TestApp, TestUser } from '../../../../../../test/helpers/testUtil'
import agent from '../../../../tests/testServer'

describe('/dashboard:/app/:id [GET]', () => {
  let app: TestApp
  let user :TestUser

  before(async () => {
    app = await testUtil.createApp()
    user = await testUtil.createUser({ app_id: app.id })
  })

  it('it works', async () => {
    const { status, body } = await agent.get(`/app/${app.id}/users`)

    expect(status).to.equals(200)
    expect(body.users).to.have.lengthOf(1)
    expect(body.users[0]).to.deep.include({
      id: user.id,
      name: user.name,
    })
    expect(body).to.deep.include({
      total: 1,
    })
  })
})
