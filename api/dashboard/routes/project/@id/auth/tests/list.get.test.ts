import { expect } from 'chai'
import testUtil, { TestApp } from '../../../../../../../test/helpers/testUtil'
import agent from '../../../../../tests/testServer'

describe('/dashboard:/project/:id/auth/list [GET]', () => {
  let app: TestApp

  before(async () => {
    app = await testUtil.createApp()
    await app.project.createAuthProvider()
  })

  it('it works', async () => {
    const { status, body } = await agent.get(`/project/${app.project.id}/auth/list`)

    expect(status).to.equals(200)
    expect(body).to.have.lengthOf(1)
  })
})
